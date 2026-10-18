import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, it, expect, vi } from 'vitest'
import { ModerationActionDialog } from '../ModerationActionDialog'

describe('ModerationActionDialog', () => {
    it('renders nothing without an action', () => {
        render(<ModerationActionDialog action={null} subject="1 item" onConfirm={vi.fn()} onCancel={vi.fn()} />)
        expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
    })

    it('states what will happen and passes the trimmed note on confirm', async () => {
        const user = userEvent.setup()
        const onConfirm = vi.fn()
        render(<ModerationActionDialog action="remove" subject="3 items" onConfirm={onConfirm} onCancel={vi.fn()} />)
        expect(screen.getByRole('dialog')).toHaveTextContent('3 items')
        await user.type(screen.getByLabelText(/note/i), '  clear spam  ')
        await user.click(screen.getByRole('button', { name: 'Remove' }))
        expect(onConfirm).toHaveBeenCalledWith('clear spam')
    })

    it('cancels with Escape', async () => {
        const user = userEvent.setup()
        const onCancel = vi.fn()
        render(<ModerationActionDialog action="hide" subject="1 item" onConfirm={vi.fn()} onCancel={onCancel} />)
        await user.keyboard('{Escape}')
        expect(onCancel).toHaveBeenCalled()
    })

    it('cannot be dismissed or confirmed again while busy', async () => {
        const user = userEvent.setup()
        const onConfirm = vi.fn()
        const onCancel = vi.fn()
        render(<ModerationActionDialog action="hide" subject="1 item" busy onConfirm={onConfirm} onCancel={onCancel} />)
        expect(screen.getByRole('button', { name: 'Hide' })).toBeDisabled()
        await user.keyboard('{Escape}')
        expect(onCancel).not.toHaveBeenCalled()
    })
})
