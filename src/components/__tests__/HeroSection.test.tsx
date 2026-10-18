import { render, screen } from '@testing-library/react'
import { describe, it, expect, vi, beforeEach } from 'vitest'

const useAuth = vi.fn()
vi.mock('@/context/AuthContext', () => ({ useAuth: () => useAuth() }))
const hooks = vi.hoisted(() => ({ usePublicStats: vi.fn() }))
vi.mock('@/hooks/queries', () => hooks)

import HeroSection from '../HeroSection'

beforeEach(() => {
    useAuth.mockReturnValue({ user: null })
    hooks.usePublicStats.mockReturnValue({ data: { members: 1500, challenges: 42, upcomingEvents: 2, challengesSolved: 900 } })
})

describe('HeroSection', () => {
    it('shows the live numbers', () => {
        render(<HeroSection />)
        expect(screen.getByText('1,500')).toBeInTheDocument()
        expect(screen.getByText('42')).toBeInTheDocument()
        expect(screen.getByText('Security Tools')).toBeInTheDocument()
        expect(screen.queryByText('10K+')).toBeNull()
    })

    it('leaves out a tile whose number is still small instead of showing it', () => {
        hooks.usePublicStats.mockReturnValue({ data: { members: 12, challenges: 3, upcomingEvents: 0, challengesSolved: 1 } })
        render(<HeroSection />)
        expect(screen.queryByText('Community Members')).toBeNull()
        expect(screen.queryByText('CTF Challenges')).toBeNull()
        expect(screen.getByText('Security Tools')).toBeInTheDocument()
    })

    it('shows only the fixed tile while the numbers load', () => {
        hooks.usePublicStats.mockReturnValue({ data: undefined })
        render(<HeroSection />)
        expect(screen.getAllByText(/Security Tools|CTF Challenges|Community/)).toHaveLength(1)
    })

    it('points a signed-in member at the dashboard and the feed', () => {
        useAuth.mockReturnValue({ user: { id: 'u1' } })
        render(<HeroSection />)
        expect(screen.getByRole('link', { name: /go to dashboard/i })).toHaveAttribute('href', '/dashboard')
        expect(screen.getByRole('link', { name: /open the feed/i })).toHaveAttribute('href', '/feed')
    })

    it('invites a visitor to join', () => {
        render(<HeroSection />)
        expect(screen.getByRole('link', { name: /create free account/i })).toHaveAttribute('href', '/auth?tab=register')
    })
})
