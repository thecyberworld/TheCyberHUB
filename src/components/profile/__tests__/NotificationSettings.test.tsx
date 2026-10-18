import { render, screen, fireEvent, within } from '@testing-library/react'
import { describe, it, expect, vi, beforeEach } from 'vitest'

const state = vi.hoisted(() => ({ prefs: undefined as unknown, mutate: vi.fn(), refetch: vi.fn() }))
vi.mock('@/hooks/queries', () => ({
    useNotificationPreferences: () => ({ data: state.prefs, isLoading: false, isError: !state.prefs, refetch: state.refetch }),
    useUpdateNotificationPreferences: () => ({ mutate: state.mutate }),
}))

import NotificationSettings from '../NotificationSettings'

const prefs = () => ({
    email: { replies: true, mentions: true, badges: true, events: true, follows: false, contributions: true, weeklyChallenges: true, newsletter: true, jobMatches: true, securityAlerts: true },
    inApp: { replies: true, mentions: true, badges: true, events: true, follows: true, likes: true, comments: true, reshares: true, challenges: true, contributions: true, weeklyChallenges: true, jobMatches: true, securityAlerts: true },
    quietHours: { enabled: true, start: '22:00', end: '08:00', timezone: 'Europe/London' },
    emailDigest: { enabled: true, frequency: 'weekly' },
})

beforeEach(() => {
    vi.clearAllMocks()
    state.prefs = prefs()
})

describe('NotificationSettings', () => {
    it('reflects what is saved', () => {
        render(<NotificationSettings />)
        expect(screen.getByRole('switch', { name: 'New followers by email' })).toHaveAttribute('aria-checked', 'false')
        expect(screen.getByRole('switch', { name: 'New followers in the app' })).toHaveAttribute('aria-checked', 'true')
        expect(screen.getByRole('switch', { name: 'Weekly digest email' })).toHaveAttribute('aria-checked', 'true')
    })

    it('sends just the one switch that changed', () => {
        render(<NotificationSettings />)
        fireEvent.click(screen.getByRole('switch', { name: 'Likes in the app' }))
        expect(state.mutate).toHaveBeenLastCalledWith({ inApp: { likes: false } })
        fireEvent.click(screen.getByRole('switch', { name: 'Newsletter by email' }))
        expect(state.mutate).toHaveBeenLastCalledWith({ email: { newsletter: false } })
        fireEvent.click(screen.getByRole('switch', { name: 'Weekly digest email' }))
        expect(state.mutate).toHaveBeenLastCalledWith({ emailDigest: { enabled: false } })
    })

    it('only offers the channels a kind really has', () => {
        render(<NotificationSettings />)
        const likes = screen.getByRole('row', { name: /likes/i })
        expect(within(likes).queryByRole('switch', { name: /by email/ })).toBeNull()
    })

    it('saves quiet hour times and the switch', () => {
        render(<NotificationSettings />)
        fireEvent.change(screen.getByLabelText('From'), { target: { value: '23:30' } })
        expect(state.mutate).toHaveBeenLastCalledWith({ quietHours: { start: '23:30' } })
        fireEvent.click(screen.getByRole('switch', { name: 'Quiet hours' }))
        expect(state.mutate).toHaveBeenLastCalledWith({ quietHours: { enabled: false } })
    })

    it('disables the times while quiet hours are off', () => {
        state.prefs = { ...prefs(), quietHours: { enabled: false, start: '22:00', end: '08:00', timezone: 'UTC' } }
        render(<NotificationSettings />)
        expect(screen.getByLabelText('From')).toBeDisabled()
    })

    it('rejects a time zone the server would refuse, and accepts a real one', () => {
        render(<NotificationSettings />)
        const zone = screen.getByLabelText(/time zone/i)
        fireEvent.change(zone, { target: { value: 'Mars/Olympus' } })
        fireEvent.blur(zone)
        expect(screen.getByRole('alert')).toHaveTextContent(/zone name/i)
        expect(state.mutate).not.toHaveBeenCalled()

        fireEvent.change(zone, { target: { value: 'America/New_York' } })
        fireEvent.blur(zone)
        expect(state.mutate).toHaveBeenLastCalledWith({ quietHours: { timezone: 'America/New_York' } })
    })

    it('offers a retry when the settings cannot be loaded', () => {
        state.prefs = undefined
        render(<NotificationSettings />)
        fireEvent.click(screen.getByRole('button', { name: /try again/i }))
        expect(state.refetch).toHaveBeenCalled()
    })
})
