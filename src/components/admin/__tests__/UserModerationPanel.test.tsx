import { render, screen, waitFor, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, it, expect, vi, beforeEach } from 'vitest'

const mocks = vi.hoisted(() => ({
    viewer: { id: 'mod1', role: 'moderator' } as { id: string; role: string },
    fetchApi: vi.fn(),
    addToast: vi.fn(),
}))

vi.mock('@/context/AuthContext', () => ({ useAuth: () => ({ user: mocks.viewer }) }))
vi.mock('@/context/ToastContext', () => ({ useToast: () => ({ addToast: mocks.addToast }) }))
vi.mock('@/lib/api', () => ({ fetchApi: mocks.fetchApi }))

import { UserModerationPanel } from '../UserModerationPanel'

const history = (over: Record<string, unknown> = {}, userOver: Record<string, unknown> = {}) => ({
    data: {
        user: { _id: 'u1', username: 'alice', role: 'user', isBanned: false, banReason: null, banExpiresAt: null, mutedUntil: null, ...userOver },
        counts: { warn: 1, mute: 0, ban: 0 },
        sanctions: [
            { _id: 's1', type: 'warn', reason: 'Spamming links', createdAt: '2026-10-01T10:00:00.000Z', expiresAt: null, revokedAt: null, revokedReason: null, isInEffect: false, issuedBy: { _id: 'm', username: 'mod_bob' } },
        ],
        ...over,
    },
})

describe('UserModerationPanel', () => {
    beforeEach(() => {
        mocks.viewer = { id: 'mod1', role: 'moderator' }
        mocks.fetchApi.mockReset()
        mocks.addToast.mockReset()
    })

    it('loads and shows the user, their standing and history', async () => {
        mocks.fetchApi.mockResolvedValue(history())
        render(<UserModerationPanel userId="u1" onClose={vi.fn()} />)
        expect(await screen.findByText('Spamming links')).toBeInTheDocument()
        expect(mocks.fetchApi).toHaveBeenCalledWith('/api/moderation/users/u1/history')
        expect(screen.getByText('In good standing')).toBeInTheDocument()
        expect(screen.getByText(/by @mod_bob/)).toBeInTheDocument()
        expect(screen.getByRole('button', { name: /^warn/i })).toBeInTheDocument()
    })

    it('hides the actions for someone of an equal or higher role', async () => {
        mocks.fetchApi.mockResolvedValue(history({}, { role: 'moderator' }))
        render(<UserModerationPanel userId="u1" onClose={vi.fn()} />)
        expect(await screen.findByText(/cannot sanction someone of an equal or higher role/i)).toBeInTheDocument()
        expect(screen.queryByRole('button', { name: /^ban/i })).not.toBeInTheDocument()
    })

    it('offers lift buttons when the user is muted and banned', async () => {
        mocks.fetchApi.mockResolvedValue(history({}, { isBanned: true, banReason: 'Malware links', mutedUntil: '2099-01-01T00:00:00.000Z' }))
        render(<UserModerationPanel userId="u1" onClose={vi.fn()} />)
        expect(await screen.findByRole('button', { name: 'Lift mute' })).toBeInTheDocument()
        expect(screen.getByRole('button', { name: 'Lift ban' })).toBeInTheDocument()
        expect(screen.getByText(/Ban reason: Malware links/)).toBeInTheDocument()
    })

    it('mutes with a reason and duration, then reloads', async () => {
        mocks.fetchApi.mockImplementation(async (url: string, init?: { method?: string }) =>
            init?.method === 'POST' ? { success: true } : history())
        const user = userEvent.setup()
        const onChanged = vi.fn()
        render(<UserModerationPanel userId="u1" onClose={vi.fn()} onChanged={onChanged} />)
        await user.click(await screen.findByRole('button', { name: /^mute/i }))

        const dialog = screen.getAllByRole('dialog').at(-1)!
        await user.selectOptions(within(dialog).getByLabelText('Duration'), '24h')
        await user.type(within(dialog).getByLabelText(/reason/i), 'Heated argument')
        await user.click(within(dialog).getByRole('button', { name: 'Mute' }))

        await waitFor(() => {
            const call = mocks.fetchApi.mock.calls.find(([u]) => u === '/api/moderation/users/u1/mute')
            expect(call).toBeTruthy()
            expect(JSON.parse(call![1].body)).toEqual({ reason: 'Heated argument', duration: '24h' })
        })
        await waitFor(() => expect(onChanged).toHaveBeenCalled())
        expect(mocks.addToast).toHaveBeenCalledWith(expect.objectContaining({ variant: 'success' }))
    })

    it('keeps the dialog open and shows the API error when the decision is refused', async () => {
        mocks.fetchApi.mockImplementation(async (_url: string, init?: { method?: string }) => {
            if (init?.method === 'POST') throw new Error('This account is already banned')
            return history()
        })
        const user = userEvent.setup()
        render(<UserModerationPanel userId="u1" onClose={vi.fn()} />)
        await user.click(await screen.findByRole('button', { name: /^ban/i }))
        const dialog = screen.getAllByRole('dialog').at(-1)!
        await user.type(within(dialog).getByLabelText(/reason/i), 'Malware links')
        await user.click(within(dialog).getByRole('button', { name: 'Ban' }))
        expect(await within(dialog).findByRole('alert')).toHaveTextContent('already banned')
    })

    it('shows a retryable error when the history cannot be loaded', async () => {
        mocks.fetchApi.mockRejectedValueOnce(new Error('Server unavailable')).mockResolvedValue(history())
        const user = userEvent.setup()
        render(<UserModerationPanel userId="u1" onClose={vi.fn()} />)
        expect(await screen.findByRole('alert')).toHaveTextContent('Server unavailable')
        await user.click(screen.getByRole('button', { name: 'Retry' }))
        expect(await screen.findByText('Spamming links')).toBeInTheDocument()
    })
})
