import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, it, expect, vi } from 'vitest'
import { UserSanctionDialog } from '../UserSanctionDialog'

describe('UserSanctionDialog', () => {
    it('renders nothing without an action', () => {
        render(<UserSanctionDialog action={null} subject="@alice" onConfirm={vi.fn()} onCancel={vi.fn()} />)
        expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
    })

    it('requires a reason of at least 3 characters for a ban and sends reason with duration', async () => {
        const user = userEvent.setup()
        const onConfirm = vi.fn()
        render(<UserSanctionDialog action="ban" subject="@alice" onConfirm={onConfirm} onCancel={vi.fn()} />)

        const confirm = screen.getByRole('button', { name: 'Ban' })
        expect(confirm).toBeDisabled()
        await user.type(screen.getByLabelText(/reason/i), 'ab')
        expect(confirm).toBeDisabled()
        await user.type(screen.getByLabelText(/reason/i), 'c ')
        expect(confirm).toBeEnabled()

        await user.selectOptions(screen.getByLabelText('Duration'), '7d')
        await user.click(confirm)
        expect(onConfirm).toHaveBeenCalledWith({ reason: 'abc', duration: '7d' })
    })

    it('defaults a ban to the first duration and offers only the mute durations for a mute', async () => {
        const user = userEvent.setup()
        const onConfirm = vi.fn()
        const { unmount } = render(<UserSanctionDialog action="mute" subject="@alice" onConfirm={onConfirm} onCancel={vi.fn()} />)
        expect(screen.getAllByRole('option').map(o => (o as HTMLOptionElement).value)).toEqual(['1h', '24h', '7d'])
        await user.type(screen.getByLabelText(/reason/i), 'cool down')
        await user.click(screen.getByRole('button', { name: 'Mute' }))
        expect(onConfirm).toHaveBeenCalledWith({ reason: 'cool down', duration: '1h' })
        unmount()

        render(<UserSanctionDialog action="ban" subject="@alice" onConfirm={vi.fn()} onCancel={vi.fn()} />)
        expect(screen.getAllByRole('option').map(o => (o as HTMLOptionElement).value)).toEqual(['1d', '7d', '30d', 'permanent'])
    })

    it('lifting needs no reason and has no duration', async () => {
        const user = userEvent.setup()
        const onConfirm = vi.fn()
        render(<UserSanctionDialog action="unban" subject="@alice" onConfirm={onConfirm} onCancel={vi.fn()} />)
        expect(screen.queryByLabelText('Duration')).not.toBeInTheDocument()
        await user.click(screen.getByRole('button', { name: 'Lift ban' }))
        expect(onConfirm).toHaveBeenCalledWith({ reason: '', duration: undefined })
    })

    it('shows an API error and cannot be dismissed while busy', async () => {
        const user = userEvent.setup()
        const onCancel = vi.fn()
        render(<UserSanctionDialog action="warn" subject="@alice" busy error="You cannot sanction someone of an equal or higher role" onConfirm={vi.fn()} onCancel={onCancel} />)
        expect(screen.getByRole('alert')).toHaveTextContent('equal or higher role')
        await user.keyboard('{Escape}')
        expect(onCancel).not.toHaveBeenCalled()
    })
})
