import { render, screen, act, waitFor } from '@testing-library/react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'

const addToast = vi.fn()
vi.mock('../ToastContext', () => ({ useToast: () => ({ addToast }) }))
vi.mock('../AuthContext', () => ({ useAuth: () => ({ token: 'tkn', user: { id: 'u1' } }) }))

const handlers: Record<string, (data?: unknown) => void> = {}
const fakeSocket = {
    on: (event: string, fn: (data?: unknown) => void) => { handlers[event] = fn },
    off: vi.fn(),
    disconnect: vi.fn(),
}
vi.mock('socket.io-client', () => ({ io: () => fakeSocket }))

const api = vi.hoisted(() => ({
    getNotifications: vi.fn(),
    getUnreadCount: vi.fn(),
    markNotificationRead: vi.fn(),
    markAllNotificationsRead: vi.fn(),
    deleteNotification: vi.fn(),
    deleteAllNotifications: vi.fn(),
}))
vi.mock('@/lib/api/notifications', () => api)
vi.mock('@/lib/api', () => ({ API_URL: 'http://api.test' }))

import { NotificationProvider, useNotificationSocket } from '../NotificationProvider'

const note = (id: string, read = false) => ({ _id: id, type: 'reply', title: `T${id}`, message: `M${id}`, read, createdAt: new Date().toISOString() })

function Probe() {
    const { notifications, unreadCount, markAsRead, deleteNotification } = useNotificationSocket()
    return (
        <div>
            <span data-testid="count">{unreadCount}</span>
            <span data-testid="ids">{notifications.map((n) => n._id).join(',')}</span>
            <button onClick={() => markAsRead('1')}>read1</button>
            <button onClick={() => deleteNotification('2')}>delete2</button>
        </div>
    )
}

const renderProvider = () => {
    const qc = new QueryClient({ defaultOptions: { queries: { retry: false } } })
    return render(<QueryClientProvider client={qc}><NotificationProvider><Probe /></NotificationProvider></QueryClientProvider>)
}

beforeEach(() => {
    vi.clearAllMocks()
    api.getNotifications.mockResolvedValue({ success: true, data: [note('1'), note('2', true)], pagination: {} })
    api.getUnreadCount.mockResolvedValue({ count: 1, byType: {} })
    api.markNotificationRead.mockResolvedValue({})
    api.deleteNotification.mockResolvedValue({})
})
afterEach(() => { vi.useRealTimers() })

describe('NotificationProvider', () => {
    it('loads the recent notifications and the real unread count', async () => {
        renderProvider()
        await waitFor(() => expect(screen.getByTestId('ids')).toHaveTextContent('1,2'))
        expect(screen.getByTestId('count')).toHaveTextContent('1')
    })

    it('counts a notification once however often it is marked read', async () => {
        renderProvider()
        await waitFor(() => expect(screen.getByTestId('count')).toHaveTextContent('1'))
        await act(async () => { screen.getByText('read1').click() })
        expect(screen.getByTestId('count')).toHaveTextContent('0')
        await act(async () => { screen.getByText('read1').click() })
        expect(screen.getByTestId('count')).toHaveTextContent('0')
        expect(api.markNotificationRead).toHaveBeenCalledTimes(1)
    })

    it('does not touch the unread count when a read notification is deleted', async () => {
        renderProvider()
        await waitFor(() => expect(screen.getByTestId('ids')).toHaveTextContent('1,2'))
        await act(async () => { screen.getByText('delete2').click() })
        expect(screen.getByTestId('ids')).toHaveTextContent('1')
        expect(screen.getByTestId('count')).toHaveTextContent('1')
    })

    it('puts a notification back and says so when the delete fails', async () => {
        api.deleteNotification.mockRejectedValue(new Error('no'))
        renderProvider()
        await waitFor(() => expect(screen.getByTestId('ids')).toHaveTextContent('1,2'))
        await act(async () => { screen.getByText('delete2').click() })
        await waitFor(() => expect(screen.getByTestId('ids')).toHaveTextContent('1,2'))
        expect(addToast).toHaveBeenCalledWith(expect.objectContaining({ variant: 'error' }))
    })

    it('adds a live notification once and counts it', async () => {
        renderProvider()
        await waitFor(() => expect(screen.getByTestId('ids')).toHaveTextContent('1,2'))
        act(() => { handlers.newNotification(note('3')); handlers.newNotification(note('3')) })
        expect(screen.getByTestId('ids')).toHaveTextContent('3,1,2')
    })

    it('shows a couple of pop-ups for a burst, then one summary', async () => {
        renderProvider()
        await waitFor(() => expect(handlers.newNotification).toBeDefined())
        vi.useFakeTimers()
        act(() => { for (const id of ['a', 'b', 'c', 'd', 'e']) handlers.newNotification(note(id)) })
        expect(addToast).toHaveBeenCalledTimes(2)
        act(() => { vi.advanceTimersByTime(6100) })
        expect(addToast).toHaveBeenCalledTimes(3)
        expect(addToast).toHaveBeenLastCalledWith(expect.objectContaining({ message: '3 more updates waiting for you.' }))
    })
})
