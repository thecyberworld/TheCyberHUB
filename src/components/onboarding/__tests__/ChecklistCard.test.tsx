import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect, vi, beforeEach } from 'vitest'

const hooks = vi.hoisted(() => ({ useOnboarding: vi.fn(), useUpdateOnboarding: vi.fn() }))
vi.mock('@/hooks/queries', () => hooks)

import ChecklistCard from '../ChecklistCard'

const data = (over: Record<string, unknown> = {}) => ({
    state: { step: 0, completedAt: null, skippedAt: null, checklistDismissedAt: null },
    checklist: [
        { key: 'profile', done: true, href: '/profile' },
        { key: 'solve', done: false, href: '/challenges?category=web' },
        { key: 'post', done: false, href: '/feed' },
        { key: 'discuss', done: false, href: '/forums' },
        { key: 'follow', done: false, href: '/feed' },
    ],
    progress: { done: 1, total: 5 },
    ...over,
})

const mutate = vi.fn()

beforeEach(() => {
    vi.clearAllMocks()
    hooks.useOnboarding.mockReturnValue({ data: data(), isLoading: false })
    hooks.useUpdateOnboarding.mockReturnValue({ mutate, isPending: false })
})

describe('ChecklistCard', () => {
    it('lists the steps, ticks the done ones and links the rest to where they are done', () => {
        render(<ChecklistCard />)
        expect(screen.getByText('1 of 5 done')).toBeInTheDocument()
        expect(screen.getByRole('progressbar', { name: /getting started progress/i })).toHaveAttribute('aria-valuenow', '1')
        expect(screen.getByRole('link', { name: /solve your first challenge/i })).toHaveAttribute('href', '/challenges?category=web')
        expect(screen.getByRole('link', { name: /set up your profile \(done\)/i })).toBeInTheDocument()
    })

    it('can be hidden for good', () => {
        render(<ChecklistCard />)
        fireEvent.click(screen.getByRole('button', { name: /hide the getting started checklist/i }))
        expect(mutate).toHaveBeenCalledWith({ dismissedChecklist: true })
    })

    it('disappears when everything is done or it was dismissed', () => {
        hooks.useOnboarding.mockReturnValue({ data: data({ progress: { done: 5, total: 5 } }), isLoading: false })
        const { container, rerender } = render(<ChecklistCard />)
        expect(container).toBeEmptyDOMElement()

        hooks.useOnboarding.mockReturnValue({ data: data({ state: { step: 0, completedAt: null, skippedAt: null, checklistDismissedAt: '2026-10-18' } }), isLoading: false })
        rerender(<ChecklistCard />)
        expect(container).toBeEmptyDOMElement()
    })

    it('shows nothing while loading', () => {
        hooks.useOnboarding.mockReturnValue({ data: undefined, isLoading: true })
        const { container } = render(<ChecklistCard />)
        expect(container).toBeEmptyDOMElement()
    })
})
