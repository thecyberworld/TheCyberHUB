import React from 'react'
import { renderHook, act, waitFor } from '@testing-library/react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { describe, it, expect, vi, beforeEach } from 'vitest'

vi.mock('@/context/AuthContext', () => ({ useAuth: () => ({ user: { id: 'me' } }) }))
const addToast = vi.fn()
vi.mock('@/context/ToastContext', () => ({ useToast: () => ({ addToast }) }))

const api = vi.hoisted(() => ({
    toggleLike: vi.fn(),
    toggleBookmark: vi.fn(),
    deletePost: vi.fn(),
    followUser: vi.fn(),
    addComment: vi.fn(),
    deleteComment: vi.fn(),
    resharePost: vi.fn(),
    getFeed: vi.fn(),
}))
vi.mock('@/lib/api/feed', () => api)

import {
    useAddComment, useDeleteComment, useDeletePost, useFeed, useFollowAuthor, useReshare, useToggleLike,
} from '../useFeed'
import type { FeedPost } from '@/types/feed'

const viewer = { liked: false, bookmarked: false, isOwner: false, followingAuthor: false, canModerate: false }
const post = (id: string, over: Partial<FeedPost> = {}): FeedPost => ({
    _id: id,
    type: 'post',
    author: { _id: 'a1', name: 'Ada', username: 'ada' },
    likeCount: 1,
    commentCount: 2,
    bookmarkCount: 0,
    reshareCount: 0,
    createdAt: '2026-10-18T00:00:00Z',
    viewer,
    ...over,
})

const LIST_KEY = ['feed', 'list', 'all', null, 'me']
const seed = (qc: QueryClient, ...posts: FeedPost[]) =>
    qc.setQueryData(LIST_KEY, { pages: [{ success: true, data: posts, pagination: { hasMore: false, nextCursor: null, count: posts.length } }], pageParams: [null] })
const cached = (qc: QueryClient) => (qc.getQueryData(LIST_KEY) as { pages: { data: FeedPost[] }[] }).pages[0].data

let qc: QueryClient
const wrapper = ({ children }: { children: React.ReactNode }) => <QueryClientProvider client={qc}>{children}</QueryClientProvider>

beforeEach(() => {
    vi.clearAllMocks()
    qc = new QueryClient({ defaultOptions: { queries: { retry: false, gcTime: Infinity }, mutations: { retry: false } } })
})

describe('useFeed', () => {
    it('pages with the cursor from the server and stops when there is no more', async () => {
        api.getFeed
            .mockResolvedValueOnce({ success: true, data: [post('1')], pagination: { hasMore: true, nextCursor: 'c1', count: 1 } })
            .mockResolvedValueOnce({ success: true, data: [post('2')], pagination: { hasMore: false, nextCursor: null, count: 1 } })
        const { result } = renderHook(() => useFeed('post', 'xss'), { wrapper })
        await waitFor(() => expect(result.current.data?.pages).toHaveLength(1))
        expect(api.getFeed).toHaveBeenLastCalledWith({ type: 'post', hashtag: 'xss', cursor: null })
        expect(result.current.hasNextPage).toBe(true)

        await act(async () => { await result.current.fetchNextPage() })
        expect(api.getFeed).toHaveBeenLastCalledWith({ type: 'post', hashtag: 'xss', cursor: 'c1' })
        await waitFor(() => expect(result.current.hasNextPage).toBe(false))
    })
})

describe('useToggleLike', () => {
    it('shows the like at once and settles on what the server says', async () => {
        seed(qc, post('1'))
        let release!: (v: unknown) => void
        api.toggleLike.mockReturnValue(new Promise((r) => { release = r }))
        const { result } = renderHook(() => useToggleLike(), { wrapper })

        act(() => { result.current.mutate(cached(qc)[0]) })
        await waitFor(() => expect(cached(qc)[0].viewer.liked).toBe(true))
        expect(cached(qc)[0].likeCount).toBe(2)

        await act(async () => { release({ success: true, data: { liked: true, likeCount: 5 } }) })
        await waitFor(() => expect(cached(qc)[0].likeCount).toBe(5))
    })

    it('puts everything back and tells the member when the server refuses', async () => {
        seed(qc, post('1'))
        api.toggleLike.mockRejectedValue(new Error('Post not found'))
        const { result } = renderHook(() => useToggleLike(), { wrapper })

        await act(async () => { result.current.mutate(cached(qc)[0]) })
        await waitFor(() => expect(addToast).toHaveBeenCalledWith(expect.objectContaining({ variant: 'error', message: 'Post not found' })))
        expect(cached(qc)[0].viewer.liked).toBe(false)
        expect(cached(qc)[0].likeCount).toBe(1)
    })
})

describe('useFollowAuthor', () => {
    it('updates every card by that author and rolls back on failure', async () => {
        seed(qc, post('1'), post('2'), post('3', { author: { _id: 'a2', name: 'Bob', username: 'bob' } }))
        let fail!: (e: Error) => void
        api.followUser.mockReturnValue(new Promise((_r, rej) => { fail = rej }))
        const { result } = renderHook(() => useFollowAuthor(), { wrapper })

        let pending!: Promise<unknown>
        act(() => { pending = result.current.mutateAsync({ authorId: 'a1', username: 'ada', follow: true }).catch(() => { }) })
        await waitFor(() => expect(cached(qc).map((p) => p.viewer.followingAuthor)).toEqual([true, true, false]))
        await act(async () => { fail(new Error('nope')); await pending })
        await waitFor(() => expect(cached(qc).map((p) => p.viewer.followingAuthor)).toEqual([false, false, false]))
        expect(addToast).toHaveBeenCalledWith(expect.objectContaining({ variant: 'error' }))
    })
})

describe('comments', () => {
    it('counts a new comment on the post', async () => {
        seed(qc, post('1'))
        api.addComment.mockResolvedValue({ success: true, data: {} })
        const { result } = renderHook(() => useAddComment('1'), { wrapper })
        await act(async () => { await result.current.mutateAsync({ content: 'hi' }) })
        expect(api.addComment).toHaveBeenCalledWith('1', 'hi', undefined)
        expect(cached(qc)[0].commentCount).toBe(3)
    })

    it('takes the replies off the count together with the comment', async () => {
        seed(qc, post('1', { commentCount: 4 }))
        api.deleteComment.mockResolvedValue({})
        const { result } = renderHook(() => useDeleteComment('1'), { wrapper })
        await act(async () => { await result.current.mutateAsync({ id: 'c1', removed: 3 }) })
        expect(cached(qc)[0].commentCount).toBe(1)
    })
})

describe('useDeletePost', () => {
    it('removes the post from the list', async () => {
        seed(qc, post('1'), post('2'))
        api.deletePost.mockResolvedValue({})
        const { result } = renderHook(() => useDeletePost(), { wrapper })
        await act(async () => { await result.current.mutateAsync('1') })
        expect(cached(qc).map((p) => p._id)).toEqual(['2'])
    })
})

describe('useReshare', () => {
    it('counts the reshare on the original when you reshare a reshare', async () => {
        const original = post('o', { reshareCount: 1 })
        seed(qc, original, post('r', { originalPost: original }))
        api.resharePost.mockResolvedValue({ success: true, data: post('new') })
        const { result } = renderHook(() => useReshare(), { wrapper })
        await act(async () => { await result.current.mutateAsync({ post: cached(qc)[1], comment: '' }) })
        expect(cached(qc)[0].reshareCount).toBe(2)
    })
})
