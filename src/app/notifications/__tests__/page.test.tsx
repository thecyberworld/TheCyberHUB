import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect, vi, beforeEach } from 'vitest'

const push = vi.fn()
vi.mock('next/navigation', () => ({ useRouter: () => ({ push }) }))

const useAuth = vi.fn()
vi.mock('@/context/AuthContext', () => ({ useAuth: () => useAuth() }))

const socket = vi.hoisted(() => ({
    unreadCount: 2,
    markAsRead: vi.fn(),
    markAllAsRead: vi.fn().mockResolvedValue(undefined),
    deleteNotification: vi.fn(),
    deleteAll: vi.fn(),
}))
vi.mock('@/context/NotificationProvider', () => ({ useNotificationSocket: () => socket }))

const useNotificationList = vi.hoisted(() => vi.fn())
vi.mock('@/hooks/queries', () => ({ useNotificationList }))

import NotificationsPage from '../page'

const n = (over: Record<string, unknown> = {}) => ({
    _id: 'n1', type: 'reply', title: 'New reply', message: 'replied to your post', read: false,
    createdAt: new Date().toISOString(), link: '/feed/post/p1', actor: { name: 'Ada', username: 'ada' }, ...over,
})

const query = (items = [n(), n({ _id: 'n2', type: 'badge', message: 'You earned a badge', read: true, link: undefined, actor: undefined })], over = {}) => ({
    data: { pages: [{ data: items, pagination: { page: 1, limit: 20, total: items.length, totalPages: 1 } }] },
    isLoading: false, isError: false, hasNextPage: false, isFetchingNextPage: false,
    fetchNextPage: vi.fn(), refetch: vi.fn(), ...over,
})

beforeEach(() => {
    vi.clearAllMocks()
    useAuth.mockReturnValue({ user: { id: 'u1' }, loading: false })
    useNotificationList.mockReturnValue(query())
})

describe('NotificationsPage', () => {
    it('lists the notifications, linking those that lead somewhere', () => {
        render(<NotificationsPage />)
        expect(screen.getByRole('link', { name: /replied to your post/ })).toHaveAttribute('href', '/feed/post/p1')
        expect(screen.getByText('You earned a badge')).toBeInTheDocument()
        expect(screen.getByText('2 unread')).toBeInTheDocument()
    })

    it('marks a notification read when it is opened', () => {
        render(<NotificationsPage />)
        fireEvent.click(screen.getByRole('link', { name: /replied to your post/ }))
        expect(socket.markAsRead).toHaveBeenCalledWith('n1')
    })

    it('asks the server for unread ones when that tab is chosen', () => {
        render(<NotificationsPage />)
        expect(useNotificationList).toHaveBeenLastCalledWith({ unread: false, type: null })
        fireEvent.click(screen.getByRole('tab', { name: /unread/i }))
        expect(useNotificationList).toHaveBeenLastCalledWith({ unread: true, type: null })
    })

    it('narrows to a group of kinds', () => {
        render(<NotificationsPage />)
        fireEvent.click(screen.getByRole('button', { name: 'Achievements' }))
        expect(screen.queryByRole('link', { name: /replied to your post/ })).toBeNull()
        expect(screen.getByText('You earned a badge')).toBeInTheDocument()
    })

    it('deletes one notification', () => {
        render(<NotificationsPage />)
        fireEvent.click(screen.getAllByRole('button', { name: 'Delete this notification' })[0])
        expect(socket.deleteNotification).toHaveBeenCalledWith('n1')
    })

    it('asks before clearing everything', () => {
        render(<NotificationsPage />)
        fireEvent.click(screen.getByRole('button', { name: /clear all/i }))
        expect(socket.deleteAll).not.toHaveBeenCalled()
        fireEvent.click(screen.getAllByRole('button', { name: 'Clear all' }).at(-1) as HTMLElement)
        expect(socket.deleteAll).toHaveBeenCalled()
    })

    it('loads older notifications on request', () => {
        const fetchNextPage = vi.fn()
        useNotificationList.mockReturnValue(query(undefined, { hasNextPage: true, fetchNextPage }))
        render(<NotificationsPage />)
        fireEvent.click(screen.getByRole('button', { name: /load older/i }))
        expect(fetchNextPage).toHaveBeenCalled()
    })

    it('says so when the list fails, and retries', () => {
        const refetch = vi.fn()
        useNotificationList.mockReturnValue(query([], { isError: true, data: undefined, refetch }))
        render(<NotificationsPage />)
        fireEvent.click(screen.getByRole('button', { name: /try again/i }))
        expect(refetch).toHaveBeenCalled()
    })

    it('sends a visitor to sign in, from an effect rather than while rendering', () => {
        useAuth.mockReturnValue({ user: null, loading: false })
        render(<NotificationsPage />)
        expect(push).toHaveBeenCalledWith('/auth?redirect=/notifications')
    })
})
