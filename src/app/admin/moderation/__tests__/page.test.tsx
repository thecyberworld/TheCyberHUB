import { render, screen, waitFor, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, it, expect, vi, beforeEach } from 'vitest'

const mocks = vi.hoisted(() => ({
    user: { id: 'm1', role: 'moderator' } as { id: string; role: string } | null,
    fetchApi: vi.fn(),
    addToast: vi.fn(),
    push: vi.fn(),
    router: {} as { push: unknown },
}))
mocks.router = { push: mocks.push }

vi.mock('next/navigation', () => ({ useRouter: () => mocks.router }))
vi.mock('next/link', () => ({ default: ({ href, children, ...rest }: { href: string; children: React.ReactNode }) => <a href={href} {...rest}>{children}</a> }))
vi.mock('@/context/AuthContext', () => ({ useAuth: () => ({ user: mocks.user, loading: false }) }))
vi.mock('@/context/ToastContext', () => ({ useToast: () => ({ addToast: mocks.addToast }) }))
vi.mock('@/lib/api', () => ({ fetchApi: mocks.fetchApi }))

import AdminModerationPage from '../page'

const item = (id: string, title: string) => ({
    contentType: 'discussion',
    contentId: id,
    reportCount: 2,
    reasons: [{ reason: 'spam', count: 2 }],
    firstReportedAt: '2026-10-01T10:00:00.000Z',
    lastReportedAt: '2026-10-02T10:00:00.000Z',
    status: 'pending',
    content: { exists: true, title, excerpt: 'text', link: `/forums/${id}`, author: { _id: 'a', username: 'u' }, isHidden: false, isDeleted: false },
})

const stats = { flagsByStatus: { pending: 2 }, pendingByType: {}, pendingByReason: {}, oldestPendingAt: null, actionsLast7Days: {} }
const pagination = { page: 1, limit: 20, total: 2, totalPages: 1 }

function route(overrides: Record<string, unknown> = {}) {
    mocks.fetchApi.mockImplementation(async (url: string) => {
        if (url in overrides) {
            const v = overrides[url]
            if (v instanceof Error) throw v
            return v
        }
        if (url.startsWith('/api/moderation/stats')) return { data: stats }
        if (url.startsWith('/api/moderation/queue/items')) return { data: [item('d1', 'First post'), item('d2', 'Second post')], pagination }
        return { success: true, data: {} }
    })
}

describe('AdminModerationPage', () => {
    beforeEach(() => {
        mocks.user = { id: 'm1', role: 'moderator' }
        mocks.fetchApi.mockReset()
        mocks.addToast.mockReset()
        mocks.push.mockReset()
    })

    it('sends non-moderators away without loading the queue', async () => {
        mocks.user = { id: 'u1', role: 'user' }
        route()
        render(<AdminModerationPage />)
        await waitFor(() => expect(mocks.push).toHaveBeenCalledWith('/admin'))
        expect(mocks.fetchApi).not.toHaveBeenCalled()
    })

    it('lists grouped items from the queue endpoint', async () => {
        route()
        render(<AdminModerationPage />)
        expect(await screen.findByRole('heading', { name: 'First post' })).toBeInTheDocument()
        expect(screen.getByRole('heading', { name: 'Second post' })).toBeInTheDocument()
        expect(mocks.fetchApi.mock.calls.some(([u]) => String(u).startsWith('/api/moderation/queue/items?status=pending'))).toBe(true)
    })

    it('shows the empty state', async () => {
        route({})
        mocks.fetchApi.mockImplementation(async (url: string) =>
            url.startsWith('/api/moderation/stats') ? { data: stats } : { data: [], pagination: { ...pagination, total: 0 } }
        )
        render(<AdminModerationPage />)
        expect(await screen.findByText('Queue is clear')).toBeInTheDocument()
    })

    it('shows an error with a working Retry', async () => {
        let fail = true
        mocks.fetchApi.mockImplementation(async (url: string) => {
            if (url.startsWith('/api/moderation/stats')) return { data: stats }
            if (fail) throw new Error('Server unavailable')
            return { data: [item('d1', 'First post')], pagination }
        })
        const user = userEvent.setup()
        render(<AdminModerationPage />)
        expect(await screen.findByRole('alert')).toHaveTextContent('Server unavailable')
        fail = false
        await user.click(screen.getByRole('button', { name: 'Retry' }))
        expect(await screen.findByRole('heading', { name: 'First post' })).toBeInTheDocument()
    })

    it('applies one decision with a note through the review endpoint', async () => {
        route()
        const user = userEvent.setup()
        render(<AdminModerationPage />)
        await screen.findByRole('heading', { name: 'First post' })
        const row = screen.getAllByTestId('queue-item')[0]
        await user.click(within(row).getByRole('button', { name: /^hide/i }))
        await user.type(screen.getByLabelText(/note/i), 'spam')
        await user.click(within(screen.getByRole('dialog')).getByRole('button', { name: 'Hide' }))

        await waitFor(() => {
            const call = mocks.fetchApi.mock.calls.find(([u]) => u === '/api/moderation/items/review')
            expect(call).toBeTruthy()
            expect(JSON.parse(call![1].body)).toEqual({ contentType: 'discussion', contentId: 'd1', action: 'hide', note: 'spam' })
        })
        expect(mocks.addToast).toHaveBeenCalledWith(expect.objectContaining({ variant: 'success' }))
    })

    it('bulk dismisses the selection and reports partial failures', async () => {
        route({
            '/api/moderation/items/bulk': {
                data: [
                    { ok: true, contentType: 'discussion', contentId: 'd1' },
                    { ok: false, contentType: 'discussion', contentId: 'd2', error: 'You cannot moderate this author' },
                ],
                summary: { total: 2, succeeded: 1 },
            },
        })
        const user = userEvent.setup()
        render(<AdminModerationPage />)
        await screen.findByRole('heading', { name: 'First post' })
        await user.click(screen.getByRole('checkbox', { name: /select all on this page/i }))
        expect(screen.getByText('2 selected')).toBeInTheDocument()
        await user.click(screen.getByRole('button', { name: /dismiss selected/i }))
        await user.click(within(screen.getByRole('dialog')).getByRole('button', { name: 'Dismiss' }))

        await waitFor(() => {
            const call = mocks.fetchApi.mock.calls.find(([u]) => u === '/api/moderation/items/bulk')
            expect(call).toBeTruthy()
            expect(JSON.parse(call![1].body)).toEqual({
                items: [
                    { contentType: 'discussion', contentId: 'd1' },
                    { contentType: 'discussion', contentId: 'd2' },
                ],
                action: 'dismiss',
            })
        })
        await waitFor(() =>
            expect(mocks.addToast).toHaveBeenCalledWith(expect.objectContaining({ variant: 'error', title: '1 of 2 failed', message: 'You cannot moderate this author' }))
        )
    })
})
