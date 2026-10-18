import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect, vi, beforeEach } from 'vitest'

const useAuth = vi.fn()
vi.mock('@/context/AuthContext', () => ({ useAuth: () => useAuth() }))

const hooks = vi.hoisted(() => ({
    useFeed: vi.fn(),
    useBookmarkedPosts: vi.fn(),
    useTrendingTags: vi.fn(),
    usePublicStats: vi.fn(),
}))
vi.mock('@/hooks/queries', () => hooks)

vi.mock('@/components/feed/FeedItem', () => ({
    default: ({ post }: { post: { _id: string; content: string } }) => <article>{post.content}</article>,
}))
vi.mock('@/components/feed/CreatePost', () => ({ default: () => <div data-testid="composer" /> }))
vi.mock('@/components/feed/ReshareDialog', () => ({ default: () => null }))

class FakeObserver {
    observe() {}
    disconnect() {}
    unobserve() {}
}
vi.stubGlobal('IntersectionObserver', FakeObserver)

import FeedPage from '../page'

const query = (over: Record<string, unknown> = {}) => ({
    data: { pages: [{ data: [{ _id: '1', content: 'Hello feed', type: 'post', hashtags: [], author: { name: 'A', username: 'a' } }] }] },
    isLoading: false,
    isError: false,
    hasNextPage: false,
    isFetchingNextPage: false,
    fetchNextPage: vi.fn(),
    refetch: vi.fn(),
    ...over,
})

beforeEach(() => {
    vi.clearAllMocks()
    useAuth.mockReturnValue({ user: null })
    hooks.useFeed.mockReturnValue(query())
    hooks.useBookmarkedPosts.mockReturnValue(query({ data: undefined }))
    hooks.useTrendingTags.mockReturnValue({ data: [{ tag: 'ctf', count: 4 }], isLoading: false })
    hooks.usePublicStats.mockReturnValue({ data: { members: 1200, challengesSolved: 5400 } })
})

describe('FeedPage', () => {
    it('shows the posts and the community numbers', () => {
        render(<FeedPage />)
        expect(screen.getByText('Hello feed')).toBeInTheDocument()
        expect(screen.getByText('1,200')).toBeInTheDocument()
    })

    it('offers Following and Saved only when signed in, and the composer too', () => {
        const { rerender } = render(<FeedPage />)
        expect(screen.queryByRole('tab', { name: 'Following' })).toBeNull()
        expect(screen.queryByTestId('composer')).toBeNull()

        useAuth.mockReturnValue({ user: { id: 'me' } })
        rerender(<FeedPage />)
        expect(screen.getByRole('tab', { name: 'Following' })).toBeInTheDocument()
        expect(screen.getByRole('tab', { name: 'Saved' })).toBeInTheDocument()
        expect(screen.getByTestId('composer')).toBeInTheDocument()
    })

    it('asks the feed query for the chosen tab and hashtag', () => {
        render(<FeedPage />)
        fireEvent.click(screen.getByRole('tab', { name: 'Activity' }))
        expect(hooks.useFeed).toHaveBeenLastCalledWith('event', null)
        fireEvent.click(screen.getAllByRole('button', { name: /#ctf/ })[0])
        expect(hooks.useFeed).toHaveBeenLastCalledWith('event', 'ctf')
    })

    it('explains an empty following tab', () => {
        useAuth.mockReturnValue({ user: { id: 'me' } })
        hooks.useFeed.mockReturnValue(query({ data: { pages: [{ data: [] }] } }))
        render(<FeedPage />)
        fireEvent.click(screen.getByRole('tab', { name: 'Following' }))
        expect(screen.getByText(/nothing from people you follow yet/i)).toBeInTheDocument()
    })

    it('shows an error with a retry', () => {
        const refetch = vi.fn()
        hooks.useFeed.mockReturnValue(query({ data: undefined, isError: true, refetch }))
        render(<FeedPage />)
        fireEvent.click(screen.getByRole('button', { name: /try again/i }))
        expect(refetch).toHaveBeenCalled()
    })

    it('filters the loaded posts with the search box', async () => {
        render(<FeedPage />)
        fireEvent.change(screen.getByLabelText('Filter loaded posts'), { target: { value: 'nothing like it' } })
        expect(await screen.findByText(/no matching posts/i)).toBeInTheDocument()
    })
})
