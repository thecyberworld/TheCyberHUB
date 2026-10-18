import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { describe, it, expect, vi, beforeEach } from 'vitest'

const push = vi.fn()
const replace = vi.fn()
vi.mock('next/navigation', () => ({ useRouter: () => ({ push, replace }) }))
const useAuth = vi.fn()
vi.mock('@/context/AuthContext', () => ({ useAuth: () => useAuth() }))

const hooks = vi.hoisted(() => ({ useOnboardingOptions: vi.fn(), useOnboarding: vi.fn(), useUpdateOnboarding: vi.fn() }))
vi.mock('@/hooks/queries', () => hooks)
vi.mock('@/components/onboarding/SuggestedFollows', () => ({ default: () => <div data-testid="suggestions" /> }))
const trackEvent = vi.hoisted(() => vi.fn())
vi.mock('@/lib/analytics', () => ({ trackEvent }))

import WelcomePage from '../page'

const options = {
    interests: [
        { slug: 'web', label: 'Web security', group: 'challenges' },
        { slug: 'crypto', label: 'Cryptography', group: 'challenges' },
        { slug: 'malware', label: 'Malware analysis', group: 'community' },
    ],
    experienceLevels: [{ slug: 'beginner', label: 'Just starting out' }, { slug: 'advanced', label: 'Experienced' }],
    goals: [{ slug: 'ctf', label: 'Compete in CTFs' }],
    maxInterests: 8,
}
const state = (over = {}) => ({
    state: { step: 0, completedAt: null, skippedAt: null, checklistDismissedAt: null },
    needsOnboarding: true, interests: [], experienceLevel: null, goal: null, ...over,
})

const mutate = vi.fn((_payload: unknown, opts?: { onSuccess?: () => void }) => opts?.onSuccess?.())

beforeEach(() => {
    vi.clearAllMocks()
    useAuth.mockReturnValue({ user: { id: 'u1' }, loading: false })
    hooks.useOnboardingOptions.mockReturnValue({ data: options, isLoading: false, isError: false, refetch: vi.fn() })
    hooks.useOnboarding.mockReturnValue({ data: state(), isLoading: false })
    hooks.useUpdateOnboarding.mockReturnValue({ mutate, isPending: false })
})

describe('WelcomePage', () => {
    it('needs an interest before moving on, then saves the picks', () => {
        render(<WelcomePage />)
        expect(screen.getByRole('heading', { name: /what do you want to learn/i })).toBeInTheDocument()
        const next = screen.getByRole('button', { name: /continue/i })
        expect(next).toBeDisabled()

        fireEvent.click(screen.getByRole('checkbox', { name: 'Web security' }))
        fireEvent.click(screen.getByRole('checkbox', { name: 'Malware analysis' }))
        fireEvent.click(screen.getByRole('button', { name: /continue/i }))
        expect(mutate).toHaveBeenLastCalledWith({ step: 1, interests: ['web', 'malware'] }, expect.any(Object))
        expect(screen.getByRole('heading', { name: /how much experience/i })).toBeInTheDocument()
    })

    it('saves the level and goal, then shows who to follow and the forum shortcuts for the topics picked', () => {
        hooks.useOnboarding.mockReturnValue({ data: state({ interests: ['malware'] }), isLoading: false })
        render(<WelcomePage />)
        fireEvent.click(screen.getByRole('button', { name: /continue/i }))
        fireEvent.click(screen.getByRole('radio', { name: 'Just starting out' }))
        fireEvent.click(screen.getByRole('radio', { name: 'Compete in CTFs' }))
        fireEvent.click(screen.getByRole('button', { name: /continue/i }))
        expect(mutate).toHaveBeenLastCalledWith({ step: 2, experienceLevel: 'beginner', goal: 'ctf' }, expect.any(Object))

        expect(screen.getByTestId('suggestions')).toBeInTheDocument()
        expect(screen.getByRole('link', { name: 'Malware analysis' })).toHaveAttribute('href', '/forums?category=malware')
    })

    it('finishes to the dashboard and counts it', async () => {
        hooks.useOnboarding.mockReturnValue({ data: state({ interests: ['web'], experienceLevel: 'beginner', state: { step: 2, completedAt: null, skippedAt: null, checklistDismissedAt: null } }), isLoading: false })
        render(<WelcomePage />)
        fireEvent.click(await screen.findByRole('button', { name: 'Finish' }))
        expect(mutate).toHaveBeenLastCalledWith({ completed: true }, expect.any(Object))
        await waitFor(() => expect(push).toHaveBeenCalledWith('/dashboard?welcome=1'))
        expect(trackEvent).toHaveBeenCalledWith('onboarding_complete', expect.any(Object))
    })

    it('can be skipped from any step', () => {
        render(<WelcomePage />)
        fireEvent.click(screen.getByRole('button', { name: /skip for now/i }))
        expect(mutate).toHaveBeenLastCalledWith({ skipped: true }, expect.any(Object))
        expect(push).toHaveBeenCalledWith('/dashboard')
    })

    it('resumes at the step the member reached', () => {
        hooks.useOnboarding.mockReturnValue({ data: state({ interests: ['web'], state: { step: 1, completedAt: null, skippedAt: null, checklistDismissedAt: null } }), isLoading: false })
        render(<WelcomePage />)
        expect(screen.getByRole('heading', { name: /how much experience/i })).toBeInTheDocument()
    })

    it('sends a visitor to sign in first', () => {
        useAuth.mockReturnValue({ user: null, loading: false })
        render(<WelcomePage />)
        expect(replace).toHaveBeenCalledWith('/auth?redirect=/welcome')
    })

    it('offers a way out when the choices cannot load', () => {
        hooks.useOnboardingOptions.mockReturnValue({ data: undefined, isLoading: false, isError: true, refetch: vi.fn() })
        render(<WelcomePage />)
        expect(screen.getByRole('link', { name: /skip to the dashboard/i })).toHaveAttribute('href', '/dashboard')
    })
})
