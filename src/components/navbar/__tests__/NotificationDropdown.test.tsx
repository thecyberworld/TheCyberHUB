import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import { NotificationDropdown } from '../NotificationDropdown'

const items = [
    { _id: 'a', type: 'reply', title: 't', message: 'replied to you', read: false, createdAt: new Date().toISOString(), link: '/feed/post/1' },
    { _id: 'b', type: 'system', title: 't', message: 'Welcome aboard', read: true, createdAt: new Date().toISOString() },
]

const setup = (unread = 1) => {
    const markAsRead = vi.fn()
    const markAllAsRead = vi.fn()
    render(<NotificationDropdown notifications={items} unreadCount={unread} markAsRead={markAsRead} markAllAsRead={markAllAsRead} />)
    return { markAsRead, markAllAsRead }
}

describe('NotificationDropdown', () => {
    it('opens with a click or tap, which hover alone cannot do on a phone', () => {
        setup()
        const bell = screen.getByRole('button', { name: /notifications, 1 unread/i })
        expect(bell).toHaveAttribute('aria-expanded', 'false')
        fireEvent.click(bell)
        expect(bell).toHaveAttribute('aria-expanded', 'true')
        expect(screen.getByText('replied to you')).toBeInTheDocument()
        fireEvent.click(bell)
        expect(screen.queryByText('replied to you')).toBeNull()
    })

    it('closes on Escape and hands focus back to the bell', () => {
        setup()
        const bell = screen.getByRole('button', { name: /notifications/i })
        fireEvent.click(bell)
        fireEvent.keyDown(document, { key: 'Escape' })
        expect(screen.queryByText('replied to you')).toBeNull()
        expect(bell).toHaveFocus()
    })

    it('closes when something outside is pressed', () => {
        setup()
        fireEvent.click(screen.getByRole('button', { name: /notifications/i }))
        fireEvent.pointerDown(document.body)
        expect(screen.queryByText('replied to you')).toBeNull()
    })

    it('marks one read as it is opened, and all read from the header', () => {
        const { markAsRead, markAllAsRead } = setup()
        fireEvent.click(screen.getByRole('button', { name: /notifications/i }))
        fireEvent.click(screen.getByRole('link', { name: /replied to you/ }))
        expect(markAsRead).toHaveBeenCalledWith('a')

        fireEvent.click(screen.getByRole('button', { name: /notifications/i }))
        fireEvent.click(screen.getByRole('button', { name: /mark all read/i }))
        expect(markAllAsRead).toHaveBeenCalled()
    })

    it('shows the badge only when something is unread', () => {
        setup(0)
        expect(screen.getByRole('button', { name: 'Notifications' })).toBeInTheDocument()
    })
})
