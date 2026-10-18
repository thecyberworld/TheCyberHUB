import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect, vi, beforeEach } from 'vitest'

const useAuth = vi.fn()
vi.mock('@/context/AuthContext', () => ({ useAuth: () => useAuth() }))

const useLeaderboard = vi.fn()
vi.mock('@/hooks/queries/useLeaderboard', () => ({ useLeaderboard: (...a: unknown[]) => useLeaderboard(...a) }))

import LeaderboardView from '../LeaderboardView'
import type { LeaderboardEntry } from '@/types/gamification'

const entry = (rank: number, username: string, points = 100 - rank): LeaderboardEntry => ({
    rank, userId: `u${rank}`, username, name: null, avatar: null, points, solves: rank, delta: null,
})

const board = (over: Record<string, unknown> = {}) => ({
    entries: [], me: null, isLoading: false, isError: false, refetch: vi.fn(),
    hasNextPage: false, isFetchingNextPage: false, fetchNextPage: vi.fn(), isFetchNextPageError: false, ...over,
})

const setup = (props: Partial<React.ComponentProps<typeof LeaderboardView>> = {}) => {
    const onPeriodChange = vi.fn()
    const onCategoryChange = vi.fn()
    render(<LeaderboardView period="all" category={null} onPeriodChange={onPeriodChange} onCategoryChange={onCategoryChange} {...props} />)
    return { onPeriodChange, onCategoryChange }
}

describe('LeaderboardView', () => {
    beforeEach(() => {
        useAuth.mockReturnValue({ user: null })
        useLeaderboard.mockReset()
    })

    it('shows a loading state', () => {
        useLeaderboard.mockReturnValue(board({ isLoading: true }))
        setup()
        expect(screen.getByRole('status', { name: /loading leaderboard/i })).toBeInTheDocument()
    })

    it('shows an error with a retry that refetches', () => {
        const refetch = vi.fn()
        useLeaderboard.mockReturnValue(board({ isError: true, refetch }))
        setup()
        fireEvent.click(screen.getByRole('button', { name: /try again/i }))
        expect(refetch).toHaveBeenCalled()
    })

    it('explains an empty weekly board and offers all time', () => {
        useLeaderboard.mockReturnValue(board())
        const { onPeriodChange, onCategoryChange } = setup({ period: 'weekly' })
        expect(screen.getByText(/no points this week yet/i)).toBeInTheDocument()
        fireEvent.click(screen.getByRole('button', { name: /show all time/i }))
        expect(onPeriodChange).toHaveBeenCalledWith('all')
        expect(onCategoryChange).toHaveBeenCalledWith(null)
    })

    it('renders rows, highlights nothing for guests and offers sign in', () => {
        useLeaderboard.mockReturnValue(board({ entries: [entry(1, 'alice'), entry(2, 'bob')] }))
        setup()
        expect(screen.getByText('alice')).toBeInTheDocument()
        expect(screen.getByText('bob')).toBeInTheDocument()
        expect(screen.getByRole('link', { name: /sign in/i })).toBeInTheDocument()
    })

    it('shows the viewer rank even when off the loaded page', () => {
        useAuth.mockReturnValue({ user: { id: 'me', username: 'me' } })
        useLeaderboard.mockReturnValue(board({ entries: [entry(1, 'alice')], me: { rank: 42, points: 7, solves: 1 } }))
        setup()
        expect(screen.getByText(/your rank: #42/i)).toBeInTheDocument()
    })

    it('says so when the signed-in viewer has no points yet', () => {
        useAuth.mockReturnValue({ user: { id: 'me', username: 'me' } })
        useLeaderboard.mockReturnValue(board({ entries: [entry(1, 'alice')], me: { rank: null, points: 0, solves: 0 } }))
        setup()
        expect(screen.getByText(/you have no points overall yet/i)).toBeInTheDocument()
    })

    it('loads more when there is another page', () => {
        const fetchNextPage = vi.fn()
        useLeaderboard.mockReturnValue(board({ entries: [entry(1, 'alice')], hasNextPage: true, fetchNextPage }))
        setup()
        fireEvent.click(screen.getByRole('button', { name: /load more/i }))
        expect(fetchNextPage).toHaveBeenCalled()
    })

    it('reports a failed load-more and lets the user retry', () => {
        const fetchNextPage = vi.fn()
        useLeaderboard.mockReturnValue(board({ entries: [entry(1, 'alice')], hasNextPage: true, isFetchNextPageError: true, fetchNextPage }))
        setup()
        expect(screen.getByText(/could not load more/i)).toBeInTheDocument()
        fireEvent.click(screen.getByRole('button', { name: /try again/i }))
        expect(fetchNextPage).toHaveBeenCalled()
    })

    it('changes period from the tabs', () => {
        useLeaderboard.mockReturnValue(board({ entries: [entry(1, 'alice')] }))
        const { onPeriodChange } = setup()
        fireEvent.click(screen.getByRole('tab', { name: /this week/i }))
        expect(onPeriodChange).toHaveBeenCalledWith('weekly')
    })

    it('puts the top three on the podium and the rest in the table', () => {
        useLeaderboard.mockReturnValue(board({ entries: [entry(1, 'a'), entry(2, 'b'), entry(3, 'c'), entry(4, 'dave')] }))
        setup({ podium: true })
        const table = screen.getByRole('table')
        expect(table).toHaveTextContent('dave')
        expect(table).not.toHaveTextContent(/\bc\b/)
    })
})
