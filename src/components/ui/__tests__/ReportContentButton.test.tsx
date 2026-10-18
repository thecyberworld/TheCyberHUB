import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, it, expect, vi, beforeEach } from 'vitest'

const mocks = vi.hoisted(() => ({
    user: { id: 'u1', role: 'user' } as { id: string; role: string } | null,
    fetchApi: vi.fn(),
    addToast: vi.fn(),
}))

vi.mock('@/context/AuthContext', () => ({ useAuth: () => ({ user: mocks.user }) }))
vi.mock('@/context/ToastContext', () => ({ useToast: () => ({ addToast: mocks.addToast }) }))
vi.mock('@/lib/api', () => ({ fetchApi: mocks.fetchApi }))

import { ReportContentButton } from '../ReportContentButton'

describe('ReportContentButton', () => {
    beforeEach(() => {
        mocks.user = { id: 'u1', role: 'user' }
        mocks.fetchApi.mockReset()
        mocks.addToast.mockReset()
    })

    it('renders nothing for signed-out visitors', () => {
        mocks.user = null
        const { container } = render(<ReportContentButton contentType="reply" contentId="r1" />)
        expect(container).toBeEmptyDOMElement()
    })

    it('renders nothing on your own content', () => {
        const { container } = render(<ReportContentButton contentType="reply" contentId="r1" authorId="u1" />)
        expect(container).toBeEmptyDOMElement()
    })

    it('opens an accessible dialog and closes on Escape', async () => {
        const user = userEvent.setup()
        render(<ReportContentButton contentType="reply" contentId="r1" authorId="u2" />)
        await user.click(screen.getByRole('button', { name: /report/i }))
        expect(screen.getByRole('dialog')).toBeInTheDocument()
        await user.keyboard('{Escape}')
        await waitFor(() => expect(screen.queryByRole('dialog')).not.toBeInTheDocument())
    })

    it('needs a reason before it can submit', async () => {
        const user = userEvent.setup()
        render(<ReportContentButton contentType="blog" contentId="b1" />)
        await user.click(screen.getByRole('button', { name: /report/i }))
        expect(screen.getByRole('button', { name: /submit report/i })).toBeDisabled()
    })

    it('sends the report and confirms', async () => {
        mocks.fetchApi.mockResolvedValue({ success: true })
        const user = userEvent.setup()
        render(<ReportContentButton contentType="discussion" contentId="d1" />)
        await user.click(screen.getByRole('button', { name: /report/i }))
        await user.click(screen.getByLabelText('Spam'))
        await user.type(screen.getByLabelText(/additional details/i), '  looks like an ad  ')
        await user.click(screen.getByRole('button', { name: /submit report/i }))

        await waitFor(() => expect(mocks.fetchApi).toHaveBeenCalledTimes(1))
        const [url, init] = mocks.fetchApi.mock.calls[0]
        expect(url).toBe('/api/moderation/flag')
        expect(init.method).toBe('POST')
        expect(JSON.parse(init.body)).toEqual({
            contentType: 'discussion',
            contentId: 'd1',
            reason: 'spam',
            details: 'looks like an ad',
        })
        expect(await screen.findByText('Report submitted', { selector: '[role="dialog"] *' })).toBeInTheDocument()
        expect(mocks.addToast).toHaveBeenCalledWith(expect.objectContaining({ variant: 'success' }))
    })

    it('shows the API error inside the dialog and stays open', async () => {
        mocks.fetchApi.mockRejectedValue(new Error('You have already reported this content'))
        const user = userEvent.setup()
        render(<ReportContentButton contentType="reply" contentId="r1" />)
        await user.click(screen.getByRole('button', { name: /report/i }))
        await user.click(screen.getByLabelText('Harassment or bullying'))
        await user.click(screen.getByRole('button', { name: /submit report/i }))

        expect(await screen.findByRole('alert')).toHaveTextContent('You have already reported this content')
        expect(screen.getByRole('dialog')).toBeInTheDocument()
    })
})
