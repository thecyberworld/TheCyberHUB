import { describe, it, expect } from 'vitest'
import { feedPath } from '../feed'

describe('feedPath', () => {
    it('leaves the default type off and always sends a limit', () => {
        expect(feedPath({})).toBe('/api/feed?limit=20')
        expect(feedPath({ type: 'all' })).toBe('/api/feed?limit=20')
    })

    it('sends type, hashtag without the #, and the cursor', () => {
        const url = feedPath({ type: 'following', hashtag: '#XSS', cursor: 'abc_123', limit: 10 })
        const params = new URL(url, 'http://x').searchParams
        expect(params.get('type')).toBe('following')
        expect(params.get('hashtag')).toBe('XSS')
        expect(params.get('cursor')).toBe('abc_123')
        expect(params.get('limit')).toBe('10')
    })
})
