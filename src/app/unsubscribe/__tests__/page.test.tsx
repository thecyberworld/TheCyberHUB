import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { describe, it, expect, vi, beforeEach } from 'vitest'

let token: string | null = 'tok'
vi.mock('next/navigation', () => ({ useSearchParams: () => ({ get: () => token }) }))

const api = vi.hoisted(() => ({ previewUnsubscribe: vi.fn(), applyUnsubscribe: vi.fn() }))
vi.mock('@/lib/api/notifications', () => api)

import UnsubscribePage from '../page'

beforeEach(() => {
    vi.clearAllMocks()
    token = 'tok'
    api.previewUnsubscribe.mockResolvedValue({ scope: 'digest', email: 'a***@example.com' })
    api.applyUnsubscribe.mockResolvedValue({ scope: 'digest', message: 'You are unsubscribed from the weekly digest' })
})

describe('UnsubscribePage', () => {
    it('shows what the link does, and changes nothing until the button is pressed', async () => {
        render(<UnsubscribePage />)
        expect(await screen.findByText('Stop the weekly digest')).toBeInTheDocument()
        expect(screen.getByText(/a\*\*\*@example\.com/)).toBeInTheDocument()
        expect(api.applyUnsubscribe).not.toHaveBeenCalled()

        fireEvent.click(screen.getByRole('button', { name: 'Unsubscribe' }))
        expect(await screen.findByText('You are unsubscribed')).toBeInTheDocument()
        expect(api.applyUnsubscribe).toHaveBeenCalledWith('tok')
    })

    it('describes the all-email scope plainly', async () => {
        api.previewUnsubscribe.mockResolvedValue({ scope: 'email', email: 'a***@example.com' })
        render(<UnsubscribePage />)
        expect(await screen.findByText('Stop all emails')).toBeInTheDocument()
        expect(screen.getByText(/except security notices/i)).toBeInTheDocument()
    })

    it('explains an expired link and points to the settings', async () => {
        api.previewUnsubscribe.mockRejectedValue(new Error('This unsubscribe link is invalid or has expired'))
        render(<UnsubscribePage />)
        expect(await screen.findByText(/invalid or has expired/)).toBeInTheDocument()
        expect(screen.getByRole('link', { name: /email settings/i })).toHaveAttribute('href', '/profile?tab=notifications')
    })

    it('does not call the API without a token', async () => {
        token = null
        render(<UnsubscribePage />)
        expect(await screen.findByText(/missing its token/i)).toBeInTheDocument()
        expect(api.previewUnsubscribe).not.toHaveBeenCalled()
    })

    it('lets the member retry when applying fails', async () => {
        api.applyUnsubscribe.mockRejectedValueOnce(new Error('Try later'))
        render(<UnsubscribePage />)
        fireEvent.click(await screen.findByRole('button', { name: 'Unsubscribe' }))
        expect(await screen.findByRole('alert')).toHaveTextContent('Try later')
        fireEvent.click(screen.getByRole('button', { name: 'Unsubscribe' }))
        await waitFor(() => expect(screen.getByText('You are unsubscribed')).toBeInTheDocument())
    })
})
