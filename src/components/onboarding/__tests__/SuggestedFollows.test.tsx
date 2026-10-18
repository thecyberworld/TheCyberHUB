import React from 'react'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { describe, it, expect, vi, beforeEach } from 'vitest'

const useAuth = vi.fn()
vi.mock('@/context/AuthContext', () => ({ useAuth: () => useAuth() }))
const addToast = vi.fn()
vi.mock('@/context/ToastContext', () => ({ useToast: () => ({ addToast }) }))
const hooks = vi.hoisted(() => ({ useFollowSuggestions: vi.fn() }))
vi.mock('@/hooks/queries', () => hooks)
const followUser = vi.hoisted(() => vi.fn())
vi.mock('@/lib/api/feed', () => ({ followUser }))

import SuggestedFollows from '../SuggestedFollows'

const members = [
    { id: '1', username: 'ada', name: 'Ada', avatar: null, bio: null, followerCount: 3, isStaff: false, reason: 'Into web security too', sharedInterests: ['web'] },
    { id: '2', username: 'team', name: 'The Team', avatar: null, bio: null, followerCount: 9, isStaff: true, reason: 'Community team', sharedInterests: [] },
]

const renderIt = (props = {}) => render(
    <QueryClientProvider client={new QueryClient()}><SuggestedFollows title="Who to follow" {...props} /></QueryClientProvider>,
)

beforeEach(() => {
    vi.clearAllMocks()
    useAuth.mockReturnValue({ user: { id: 'me' } })
    hooks.useFollowSuggestions.mockReturnValue({ data: members, isLoading: false, isError: false, refetch: vi.fn() })
    followUser.mockResolvedValue({})
})

describe('SuggestedFollows', () => {
    it('shows each person with the reason they are suggested', () => {
        renderIt()
        expect(screen.getByText('@ada · Into web security too')).toBeInTheDocument()
        expect(screen.getByRole('link', { name: /the team/i })).toHaveAttribute('href', '/user/team')
    })

    it('renders nothing for a visitor', () => {
        useAuth.mockReturnValue({ user: null })
        const { container } = renderIt()
        expect(container).toBeEmptyDOMElement()
    })

    it('follows at once, and unfollows on a second press', async () => {
        const onFollowed = vi.fn()
        renderIt({ onFollowed })
        fireEvent.click(screen.getByRole('button', { name: 'Follow Ada' }))
        expect(screen.getByRole('button', { name: 'Unfollow Ada' })).toHaveAttribute('aria-pressed', 'true')
        await waitFor(() => expect(followUser).toHaveBeenCalledWith('ada', true))
        await waitFor(() => expect(onFollowed).toHaveBeenCalledWith(1))

        fireEvent.click(screen.getByRole('button', { name: 'Unfollow Ada' }))
        await waitFor(() => expect(followUser).toHaveBeenLastCalledWith('ada', false))
    })

    it('puts the button back and says so when the follow fails', async () => {
        followUser.mockRejectedValue(new Error('Nope'))
        renderIt()
        fireEvent.click(screen.getByRole('button', { name: 'Follow Ada' }))
        await waitFor(() => expect(addToast).toHaveBeenCalledWith(expect.objectContaining({ variant: 'error', message: 'Nope' })))
        expect(screen.getByRole('button', { name: 'Follow Ada' })).toHaveAttribute('aria-pressed', 'false')
    })

    it('offers a retry when the suggestions cannot load, and a calm line when there are none', () => {
        const refetch = vi.fn()
        hooks.useFollowSuggestions.mockReturnValue({ data: undefined, isLoading: false, isError: true, refetch })
        const { unmount } = renderIt()
        fireEvent.click(screen.getByRole('button', { name: /try again/i }))
        expect(refetch).toHaveBeenCalled()
        unmount()

        hooks.useFollowSuggestions.mockReturnValue({ data: [], isLoading: false, isError: false, refetch })
        renderIt()
        expect(screen.getByText(/no suggestions right now/i)).toBeInTheDocument()
    })
})
