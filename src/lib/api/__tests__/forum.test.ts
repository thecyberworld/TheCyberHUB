import { describe, it, expect, vi, beforeEach } from 'vitest'

const mocks = vi.hoisted(() => ({ fetchApi: vi.fn() }))
vi.mock('@/lib/api', () => ({ fetchApi: mocks.fetchApi }))

import { getDiscussions } from '../forum'

describe('getDiscussions', () => {
    beforeEach(() => {
        mocks.fetchApi.mockReset()
        mocks.fetchApi.mockResolvedValue({ success: true, data: [] })
    })

    const queryOf = () => new URL(`http://x${mocks.fetchApi.mock.calls[0][0]}`).searchParams

    it('sends only the filters that are set', async () => {
        await getDiscussions({ page: 2, limit: 20, category: 'ctf-help', sort: 'hot' })
        const q = queryOf()
        expect(q.get('page')).toBe('2')
        expect(q.get('category')).toBe('ctf-help')
        expect(q.get('sortBy')).toBe('hot')
        expect(q.has('status')).toBe(false)
        expect(q.has('search')).toBe(false)
    })

    it('asks for solved threads only when requested', async () => {
        await getDiscussions({ status: 'solved', search: 'xss' })
        const q = queryOf()
        expect(q.get('status')).toBe('solved')
        expect(q.get('search')).toBe('xss')
    })

    it('lets errors reach the page so it can offer a retry', async () => {
        mocks.fetchApi.mockRejectedValue(new Error('Server unavailable'))
        await expect(getDiscussions({})).rejects.toThrow('Server unavailable')
    })
})
