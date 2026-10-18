import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect, vi, beforeEach } from 'vitest'

const useAuth = vi.fn()
vi.mock('@/context/AuthContext', () => ({ useAuth: () => useAuth() }))
let search = ''
vi.mock('next/navigation', () => ({ useSearchParams: () => new URLSearchParams(search) }))
vi.mock('@/components/Navbar', () => ({ default: () => <nav /> }))
vi.mock('@/components/Footer', () => ({ default: () => <footer /> }))
const useBadgeCatalog = vi.fn()
vi.mock('@/hooks/queries/useBadges', () => ({ useBadgeCatalog: () => useBadgeCatalog() }))

import BadgesPage from '../page'

const badge = (code: string, category: string, earned?: boolean) => ({
    code, name: code.toLowerCase(), description: 'd', icon: 'flag', color: '#fff', rarity: 'common', category, points: 0, earnedBy: 3, earned,
})

describe('BadgesPage', () => {
    beforeEach(() => {
        search = ''
        useAuth.mockReturnValue({ user: { id: 'u', username: 'me' } })
        useBadgeCatalog.mockReset()
        window.HTMLElement.prototype.scrollIntoView = vi.fn()
    })

    it('shows an error with retry', () => {
        const refetch = vi.fn()
        useBadgeCatalog.mockReturnValue({ isLoading: false, isError: true, refetch })
        render(<BadgesPage />)
        fireEvent.click(screen.getByRole('button', { name: /try again/i }))
        expect(refetch).toHaveBeenCalled()
    })

    it('groups the catalog by category and counts earned badges', () => {
        useBadgeCatalog.mockReturnValue({
            isLoading: false, isError: false,
            data: [badge('AAA', 'challenges', true), badge('BBB', 'challenges', false), badge('CCC', 'streak', false)],
        })
        render(<BadgesPage />)
        expect(screen.getByRole('heading', { name: 'Challenges' })).toBeInTheDocument()
        expect(screen.getByRole('heading', { name: 'Streaks' })).toBeInTheDocument()
        expect(screen.getByText(/of 3 earned/i)).toBeInTheDocument()
    })

    it('filters to earned and locked badges', () => {
        useBadgeCatalog.mockReturnValue({
            isLoading: false, isError: false,
            data: [badge('AAA', 'challenges', true), badge('BBB', 'challenges', false)],
        })
        render(<BadgesPage />)
        fireEvent.click(screen.getByRole('button', { name: 'earned' }))
        expect(screen.getByTestId('badge-AAA')).toBeInTheDocument()
        expect(screen.queryByTestId('badge-BBB')).not.toBeInTheDocument()
        fireEvent.click(screen.getByRole('button', { name: 'locked' }))
        expect(screen.getByTestId('badge-BBB')).toBeInTheDocument()
        expect(screen.queryByTestId('badge-AAA')).not.toBeInTheDocument()
    })

    it('scrolls to the badge named in ?code=', () => {
        search = 'code=BBB'
        useBadgeCatalog.mockReturnValue({
            isLoading: false, isError: false,
            data: [badge('AAA', 'challenges', true), badge('BBB', 'challenges', false)],
        })
        render(<BadgesPage />)
        expect(window.HTMLElement.prototype.scrollIntoView).toHaveBeenCalled()
    })

    it('invites guests to sign in and hides the filter', () => {
        useAuth.mockReturnValue({ user: null })
        useBadgeCatalog.mockReturnValue({ isLoading: false, isError: false, data: [badge('AAA', 'challenges')] })
        render(<BadgesPage />)
        expect(screen.getByRole('link', { name: /sign in/i })).toBeInTheDocument()
        expect(screen.queryByRole('group', { name: /show badges/i })).not.toBeInTheDocument()
    })
})
