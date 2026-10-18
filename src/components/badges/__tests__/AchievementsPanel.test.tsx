import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect, vi, beforeEach } from 'vitest'

const useUserBadges = vi.fn()
vi.mock('@/hooks/queries/useBadges', () => ({ useUserBadges: (u: unknown) => useUserBadges(u) }))

import AchievementsPanel from '../AchievementsPanel'

const earned = (code: string, name: string) => ({
    code, name, description: `${name} desc`, icon: 'flag', color: '#22C55E', rarity: 'common', earnedAt: '2026-10-01T00:00:00Z', points: 10,
})

describe('AchievementsPanel', () => {
    beforeEach(() => useUserBadges.mockReset())

    it('shows a loading state', () => {
        useUserBadges.mockReturnValue({ isLoading: true })
        render(<AchievementsPanel username="alice" />)
        expect(screen.getByRole('status', { name: /loading achievements/i })).toBeInTheDocument()
    })

    it('shows an error with retry', () => {
        const refetch = vi.fn()
        useUserBadges.mockReturnValue({ isLoading: false, isError: true, refetch })
        render(<AchievementsPanel username="alice" />)
        fireEvent.click(screen.getByRole('button', { name: /try again/i }))
        expect(refetch).toHaveBeenCalled()
    })

    it('shows the empty text', () => {
        useUserBadges.mockReturnValue({ isLoading: false, isError: false, data: { earned: [], progress: [] } })
        render(<AchievementsPanel username="alice" emptyText="Nothing yet" />)
        expect(screen.getByText('Nothing yet')).toBeInTheDocument()
    })

    it('copes with a reply that has no lists', () => {
        useUserBadges.mockReturnValue({ isLoading: false, isError: false, data: [] })
        render(<AchievementsPanel username="alice" emptyText="Nothing yet" showProgress />)
        expect(screen.getByText('Nothing yet')).toBeInTheDocument()
    })

    it('lists earned badges up to the limit and counts the rest', () => {
        useUserBadges.mockReturnValue({
            isLoading: false, isError: false,
            data: { earned: [earned('A', 'Alpha'), earned('B', 'Bravo'), earned('C', 'Charlie')], progress: [] },
        })
        render(<AchievementsPanel username="alice" limit={2} />)
        expect(screen.getByText('Alpha')).toBeInTheDocument()
        expect(screen.getByText('Bravo')).toBeInTheDocument()
        expect(screen.queryByText('Charlie')).not.toBeInTheDocument()
        expect(screen.getByRole('link', { name: /1 more · all badges/i })).toHaveAttribute('href', '/badges')
    })

    it('shows next-up progress only when asked', () => {
        const data = {
            earned: [earned('A', 'Alpha')],
            progress: [{ code: 'P', name: 'Problem Solver', description: '', rarity: 'uncommon', current: 4, threshold: 10, percentage: 40, completed: false }],
        }
        useUserBadges.mockReturnValue({ isLoading: false, isError: false, data })
        const { rerender } = render(<AchievementsPanel username="alice" />)
        expect(screen.queryByText('Problem Solver')).not.toBeInTheDocument()
        rerender(<AchievementsPanel username="alice" showProgress />)
        expect(screen.getByText('Problem Solver')).toBeInTheDocument()
        expect(screen.getByText('4 / 10')).toBeInTheDocument()
    })
})
