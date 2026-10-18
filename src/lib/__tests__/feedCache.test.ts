import { describe, it, expect } from 'vitest'
import { bump, mapFeedCache, removeFromFeedCache } from '../feedCache'
import type { FeedPost } from '@/types/feed'

const post = (id: string, over: Partial<FeedPost> = {}): FeedPost => ({
    _id: id,
    type: 'post',
    author: { _id: `a-${id}`, name: 'A', username: 'a' },
    likeCount: 1,
    commentCount: 0,
    bookmarkCount: 0,
    reshareCount: 0,
    createdAt: '2026-10-18T00:00:00Z',
    viewer: { liked: false, bookmarked: false, isOwner: false, followingAuthor: false, canModerate: false },
    ...over,
})

const infinite = (...posts: FeedPost[]) => ({ pages: [{ data: posts, pagination: {} }, { data: [post('z')], pagination: {} }], pageParams: [null, 'c'] })

describe('mapFeedCache', () => {
    it('patches the matching post in every page and leaves the rest alone', () => {
        const before = infinite(post('1'), post('2'))
        const after = mapFeedCache(before, (p) => p._id === '2', bump('likeCount', 1)) as ReturnType<typeof infinite>
        expect(after.pages[0].data[1].likeCount).toBe(2)
        expect(after.pages[0].data[0]).toBe(before.pages[0].data[0])
        expect(after.pages[1].data[0]).toBe(before.pages[1].data[0])
        expect(before.pages[0].data[1].likeCount).toBe(1)
    })

    it('patches the root and the descendants of a thread', () => {
        const thread = { success: true, root: post('1'), descendants: [post('2'), post('3')] }
        const after = mapFeedCache(thread, (p) => ['1', '3'].includes(p._id), bump('commentCount', 2)) as typeof thread
        expect(after.root.commentCount).toBe(2)
        expect(after.descendants.map((p) => p.commentCount)).toEqual([0, 2])
    })

    it('matches by author to update every card of a person', () => {
        const before = infinite(post('1', { author: { _id: 'x', name: 'X', username: 'x' } }), post('2', { author: { _id: 'x', name: 'X', username: 'x' } }), post('3'))
        const after = mapFeedCache(before, (p) => p.author?._id === 'x', (p) => ({ ...p, viewer: { ...p.viewer, followingAuthor: true } })) as ReturnType<typeof infinite>
        expect(after.pages[0].data.map((p) => p.viewer.followingAuthor)).toEqual([true, true, false])
    })

    it('does not treat comments cached under the same key as posts', () => {
        const comments = { pages: [{ data: [{ _id: '1', content: 'hi', viewer: { isOwner: false, canModerate: false }, replies: [] }] }], pageParams: [1] }
        expect(mapFeedCache(comments, () => true, bump('likeCount', 1))).toEqual(comments)
    })

    it('passes through anything else', () => {
        expect(mapFeedCache(undefined, () => true, (p) => p)).toBeUndefined()
        expect(mapFeedCache([1, 2], () => true, (p) => p)).toEqual([1, 2])
        expect(mapFeedCache({ data: [] }, () => true, (p) => p)).toEqual({ data: [] })
    })
})

describe('removeFromFeedCache', () => {
    it('drops the post from lists and from the rest of a thread', () => {
        const list = removeFromFeedCache(infinite(post('1'), post('2')), '1') as ReturnType<typeof infinite>
        expect(list.pages[0].data.map((p) => p._id)).toEqual(['2'])

        const thread = removeFromFeedCache({ root: post('1'), descendants: [post('2'), post('3')] }, '2') as { root: FeedPost; descendants: FeedPost[] }
        expect(thread.descendants.map((p) => p._id)).toEqual(['3'])
        expect(thread.root._id).toBe('1')
    })
})

describe('bump', () => {
    it('never goes below zero', () => {
        expect(bump('likeCount', -5)(post('1')).likeCount).toBe(0)
    })
})
