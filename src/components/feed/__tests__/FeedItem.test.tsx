import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect, vi, beforeEach } from 'vitest'

const useAuth = vi.fn()
vi.mock('@/context/AuthContext', () => ({ useAuth: () => useAuth() }))
const addToast = vi.fn()
vi.mock('@/context/ToastContext', () => ({ useToast: () => ({ addToast }) }))

const mutations = {
    like: { mutate: vi.fn(), isPending: false },
    bookmark: { mutate: vi.fn(), isPending: false },
    follow: { mutate: vi.fn(), isPending: false },
    remove: { mutate: vi.fn(), isPending: false },
    pin: { mutate: vi.fn(), isPending: false },
}
vi.mock('@/hooks/queries/useFeed', () => ({
    useToggleLike: () => mutations.like,
    useToggleBookmark: () => mutations.bookmark,
    useFollowAuthor: () => mutations.follow,
    useDeletePost: () => mutations.remove,
    usePinPost: () => mutations.pin,
}))
vi.mock('../FeedComments', () => ({ default: () => <div data-testid="comments" /> }))
vi.mock('@/components/ui/ReportContentButton', () => ({ ReportContentButton: () => <button>Report</button> }))

import FeedItem from '../FeedItem'
import type { FeedPost } from '@/types/feed'

const viewer = { liked: false, bookmarked: false, isOwner: false, followingAuthor: false, canModerate: false }
const post = (over: Partial<FeedPost> = {}): FeedPost => ({
    _id: 'p1',
    type: 'post',
    author: { _id: 'a1', name: 'Ada', username: 'ada' },
    content: 'Solved my first #pwn challenge',
    likeCount: 2,
    commentCount: 3,
    bookmarkCount: 0,
    reshareCount: 1,
    createdAt: new Date().toISOString(),
    viewer,
    ...over,
})

beforeEach(() => {
    vi.clearAllMocks()
    useAuth.mockReturnValue({ user: { id: 'me', role: 'user', name: 'Me', avatar: null } })
})

describe('FeedItem', () => {
    it('links the author to the public profile', () => {
        render(<FeedItem post={post()} />)
        expect(screen.getByRole('link', { name: 'Ada' })).toHaveAttribute('href', '/user/ada')
    })

    it('shows the like and save state from the viewer, as pressed buttons', () => {
        render(<FeedItem post={post({ viewer: { ...viewer, liked: true, bookmarked: true } })} />)
        expect(screen.getByRole('button', { name: 'Unlike' })).toHaveAttribute('aria-pressed', 'true')
        expect(screen.getByRole('button', { name: 'Remove from saved' })).toHaveAttribute('aria-pressed', 'true')
    })

    it('likes and saves through the mutations', () => {
        const p = post()
        render(<FeedItem post={p} />)
        fireEvent.click(screen.getByRole('button', { name: 'Like' }))
        fireEvent.click(screen.getByRole('button', { name: 'Save' }))
        expect(mutations.like.mutate).toHaveBeenCalledWith(p)
        expect(mutations.bookmark.mutate).toHaveBeenCalledWith(p)
    })

    it('asks guests to log in instead of calling the server', () => {
        useAuth.mockReturnValue({ user: null })
        render(<FeedItem post={post()} />)
        fireEvent.click(screen.getByRole('button', { name: 'Like' }))
        expect(mutations.like.mutate).not.toHaveBeenCalled()
        expect(addToast).toHaveBeenCalledWith(expect.objectContaining({ variant: 'info', message: expect.stringMatching(/log in/i) }))
    })

    it('follows and unfollows the author', () => {
        const { rerender } = render(<FeedItem post={post()} />)
        fireEvent.click(screen.getByRole('button', { name: /^follow$/i }))
        expect(mutations.follow.mutate).toHaveBeenCalledWith({ authorId: 'a1', username: 'ada', follow: true })

        rerender(<FeedItem post={post({ viewer: { ...viewer, followingAuthor: true } })} />)
        fireEvent.click(screen.getByRole('button', { name: /following/i }))
        expect(mutations.follow.mutate).toHaveBeenLastCalledWith({ authorId: 'a1', username: 'ada', follow: false })
    })

    it('has no follow or report button on your own post', () => {
        render(<FeedItem post={post({ viewer: { ...viewer, isOwner: true } })} />)
        expect(screen.queryByRole('button', { name: /follow/i })).toBeNull()
        expect(screen.queryByRole('button', { name: 'Report' })).toBeNull()
    })

    it('shows a placeholder when the reshared post is gone', () => {
        render(<FeedItem post={post({ originalPost: null, originalUnavailable: true, content: undefined, reshareComment: 'look' })} />)
        expect(screen.getByText(/no longer available/i)).toBeInTheDocument()
        expect(screen.getByText('reshared')).toBeInTheDocument()
    })

    it('shows the reshared post inside, linking to it', () => {
        const original = post({ _id: 'o1', content: 'The original', author: { _id: 'a2', name: 'Bob', username: 'bob' } })
        render(<FeedItem post={post({ originalPost: original, content: undefined })} />)
        expect(screen.getByRole('link', { name: /the original/i })).toHaveAttribute('href', '/feed/post/o1')
    })

    it('leads a thread to its page', () => {
        render(<FeedItem post={post({ isThreadRoot: true, threadCount: 3 })} />)
        expect(screen.getByRole('link', { name: /show thread \(3 more posts\)/i })).toHaveAttribute('href', '/feed/post/p1')
    })

    it('opens the comments on demand', () => {
        render(<FeedItem post={post()} />)
        expect(screen.queryByTestId('comments')).toBeNull()
        fireEvent.click(screen.getByRole('button', { name: /comment/i }))
        expect(screen.getByTestId('comments')).toBeInTheDocument()
    })

    it('pins from the menu only for moderators', async () => {
        useAuth.mockReturnValue({ user: { id: 'mod', role: 'moderator' } })
        render(<FeedItem post={post()} />)
        fireEvent.keyDown(screen.getByRole('button', { name: 'Post options' }), { key: 'Enter' })
        expect(await screen.findByRole('menuitem', { name: /pin to top/i })).toBeInTheDocument()
    })

    it('does not offer pinning to regular members', async () => {
        render(<FeedItem post={post()} />)
        fireEvent.keyDown(screen.getByRole('button', { name: 'Post options' }), { key: 'Enter' })
        expect(await screen.findByRole('menuitem', { name: /copy link/i })).toBeInTheDocument()
        expect(screen.queryByRole('menuitem', { name: /pin/i })).toBeNull()
    })

    it('asks before deleting, then deletes', async () => {
        render(<FeedItem post={post({ viewer: { ...viewer, isOwner: true } })} />)
        fireEvent.keyDown(screen.getByRole('button', { name: 'Post options' }), { key: 'Enter' })
        fireEvent.click(await screen.findByRole('menuitem', { name: /delete/i }))
        expect(mutations.remove.mutate).not.toHaveBeenCalled()
        fireEvent.click(await screen.findByRole('button', { name: 'Delete' }))
        expect(mutations.remove.mutate).toHaveBeenCalledWith('p1', expect.any(Object))
    })

    describe('activity cards', () => {
        const event = (over: Partial<FeedPost> = {}) =>
            post({
                type: 'event',
                eventType: 'challenge_solved',
                eventData: { description: 'Solved "Warmup"', targetSlug: 'warmup', value: 50 },
                content: undefined,
                ...over,
            })

        it('links to the challenge and shows the XP', () => {
            render(<FeedItem post={event()} />)
            expect(screen.getByRole('link', { name: /solved "warmup"/i })).toHaveAttribute('href', '/challenges/warmup')
            expect(screen.getByText('+50 XP')).toBeInTheDocument()
        })

        it('has no like or comment buttons', () => {
            render(<FeedItem post={event()} />)
            expect(screen.queryByRole('button', { name: 'Like' })).toBeNull()
        })

        it('lets a moderator remove an activity card', () => {
            render(<FeedItem post={event({ viewer: { ...viewer, canModerate: true } })} />)
            expect(screen.getByRole('button', { name: /remove this activity/i })).toBeInTheDocument()
        })
    })
})
