import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect, vi, beforeEach } from 'vitest'

const useAuth = vi.fn()
vi.mock('@/context/AuthContext', () => ({ useAuth: () => useAuth() }))
const addToast = vi.fn()
vi.mock('@/context/ToastContext', () => ({ useToast: () => ({ addToast }) }))

const useStreak = vi.fn()
const useCheckin = vi.fn()
vi.mock('@/hooks/queries/useStreak', () => ({ useStreak: () => useStreak(), useCheckin: () => useCheckin() }))

const useDailyChallenge = vi.fn()
const useSubmitDailyChallenge = vi.fn()
const useDailyHistory = vi.fn()
vi.mock('@/hooks/queries/useDailyChallenge', () => ({
    useDailyChallenge: () => useDailyChallenge(),
    useSubmitDailyChallenge: () => useSubmitDailyChallenge(),
    useDailyHistory: () => useDailyHistory(),
}))

import StreakWidget from '../StreakWidget'
import DailyChallenge from '../DailyChallenge'

const streak = (over: Record<string, unknown> = {}) => ({
    currentStreak: 3, longestStreak: 5, totalActiveDays: 9, lastActiveDate: null, totalXpFromEngagement: 0,
    checkedInToday: false, status: 'at_risk', streakEndsAt: '2026-10-18T23:59:59Z', activityLog: [], ...over,
})

describe('StreakWidget', () => {
    beforeEach(() => {
        useAuth.mockReturnValue({ user: { id: 'u' } })
        addToast.mockReset()
        useCheckin.mockReturnValue({ mutate: vi.fn(), isPending: false, isError: false, data: undefined })
    })

    it('renders nothing for guests', () => {
        useAuth.mockReturnValue({ user: null })
        useStreak.mockReturnValue({ isLoading: false })
        const { container } = render(<StreakWidget />)
        expect(container).toBeEmptyDOMElement()
    })

    it('shows an error with retry', () => {
        const refetch = vi.fn()
        useStreak.mockReturnValue({ isLoading: false, isError: true, refetch })
        render(<StreakWidget />)
        fireEvent.click(screen.getByRole('button', { name: /try again/i }))
        expect(refetch).toHaveBeenCalled()
    })

    it('shows the streak numbers and checks in', () => {
        const mutate = vi.fn()
        useCheckin.mockReturnValue({ mutate, isPending: false, isError: false, data: undefined })
        useStreak.mockReturnValue({ isLoading: false, isError: false, data: streak() })
        render(<StreakWidget />)
        expect(screen.getByText('9')).toBeInTheDocument()
        fireEvent.click(screen.getByRole('button', { name: /check in/i }))
        expect(mutate).toHaveBeenCalled()
    })

    it('disables the button once checked in today', () => {
        useStreak.mockReturnValue({ isLoading: false, isError: false, data: streak({ checkedInToday: true, status: 'active' }) })
        render(<StreakWidget />)
        expect(screen.getByRole('button', { name: /done/i })).toBeDisabled()
        expect(screen.getByRole('status')).toHaveTextContent(/checked in for today/i)
    })

    it('toasts each badge unlocked by a check-in', () => {
        const mutate = vi.fn((_v, opts) => opts.onSuccess({ data: { xpAwarded: 5, newBadges: [{ name: 'Week Warrior', description: '7 days' }] } }))
        useCheckin.mockReturnValue({ mutate, isPending: false, isError: false, data: undefined })
        useStreak.mockReturnValue({ isLoading: false, isError: false, data: streak() })
        render(<StreakWidget />)
        fireEvent.click(screen.getByRole('button', { name: /check in/i }))
        expect(addToast).toHaveBeenCalledWith(expect.objectContaining({ variant: 'success', title: 'Badge unlocked' }))
    })
})

const challenge = (over: Record<string, unknown> = {}) => ({
    _id: 'c1', date: '2026-10-18', question: 'What is XSS?', options: ['A thing', 'Another thing'], difficulty: 'easy',
    category: 'web', xpReward: 10, totalAttempts: 4, successRate: 50, hasSubmitted: false, ...over,
})

describe('DailyChallenge', () => {
    beforeEach(() => {
        useAuth.mockReturnValue({ user: { id: 'u' } })
        addToast.mockReset()
        useSubmitDailyChallenge.mockReturnValue({ mutate: vi.fn(), isPending: false })
        useDailyHistory.mockReturnValue({ isLoading: false, isError: false, data: { submissions: [], stats: {} }, refetch: vi.fn() })
    })

    it('shows an error with retry', () => {
        const refetch = vi.fn()
        useDailyChallenge.mockReturnValue({ isLoading: false, isError: true, refetch })
        render(<DailyChallenge />)
        fireEvent.click(screen.getByRole('button', { name: /try again/i }))
        expect(refetch).toHaveBeenCalled()
    })

    it('says when there is no challenge today', () => {
        useDailyChallenge.mockReturnValue({ isLoading: false, isError: false, data: null })
        render(<DailyChallenge />)
        expect(screen.getByText(/no challenge available today/i)).toBeInTheDocument()
    })

    it('submits the selected option', () => {
        const mutate = vi.fn()
        useSubmitDailyChallenge.mockReturnValue({ mutate, isPending: false })
        useDailyChallenge.mockReturnValue({ isLoading: false, isError: false, data: challenge() })
        render(<DailyChallenge />)
        const submit = screen.getByRole('button', { name: /submit answer/i })
        expect(submit).toBeDisabled()
        fireEvent.click(screen.getByRole('radio', { name: /another thing/i }))
        fireEvent.click(submit)
        expect(mutate).toHaveBeenCalledWith(1, expect.any(Object))
    })

    it('toasts badges from a submit', () => {
        const mutate = vi.fn((_i, opts) => opts.onSuccess({ data: { newBadges: [{ name: 'Daily Challenger', description: '10 done' }] } }))
        useSubmitDailyChallenge.mockReturnValue({ mutate, isPending: false })
        useDailyChallenge.mockReturnValue({ isLoading: false, isError: false, data: challenge() })
        render(<DailyChallenge />)
        fireEvent.click(screen.getByRole('radio', { name: /a thing/i }))
        fireEvent.click(screen.getByRole('button', { name: /submit answer/i }))
        expect(addToast).toHaveBeenCalledWith(expect.objectContaining({ variant: 'success' }))
    })

    it('shows the result and locks the options after answering', () => {
        useDailyChallenge.mockReturnValue({
            isLoading: false, isError: false,
            data: challenge({
                hasSubmitted: true, correctIndex: 0, explanation: 'Cross-site scripting.',
                userSubmission: { selectedIndex: 1, isCorrect: false, xpEarned: 0 },
            }),
        })
        render(<DailyChallenge />)
        expect(screen.getByText('Incorrect')).toBeInTheDocument()
        expect(screen.getByText('Cross-site scripting.')).toBeInTheDocument()
        expect(screen.getAllByRole('radio').every((r) => (r as HTMLInputElement).disabled)).toBe(true)
        expect(screen.queryByRole('button', { name: /submit answer/i })).not.toBeInTheDocument()
    })

    it('invites guests to sign in instead of answering', () => {
        useAuth.mockReturnValue({ user: null })
        useDailyChallenge.mockReturnValue({ isLoading: false, isError: false, data: challenge() })
        render(<DailyChallenge />)
        expect(screen.getByRole('link', { name: /sign in to answer/i })).toHaveAttribute('href', '/auth')
        expect(screen.queryByRole('button', { name: /history/i })).not.toBeInTheDocument()
    })

    it('reads history in the submissions shape', () => {
        useDailyChallenge.mockReturnValue({ isLoading: false, isError: false, data: challenge() })
        useDailyHistory.mockReturnValue({
            isLoading: false, isError: false, refetch: vi.fn(),
            data: {
                submissions: [{ _id: 's1', date: '2026-10-17', selectedIndex: 0, isCorrect: true, xpEarned: 10, challenge: { question: 'Yesterday?', category: 'web', difficulty: 'easy', date: '2026-10-17', xpReward: 10 } }],
                stats: {},
            },
        })
        render(<DailyChallenge />)
        fireEvent.click(screen.getByRole('button', { name: /history/i }))
        expect(screen.getByText('Yesterday?')).toBeInTheDocument()
    })
})
