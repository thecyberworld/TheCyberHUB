import { describe, it, expect } from 'vitest'
import { eventHref, timeAgo } from '../feedFormat'

describe('timeAgo', () => {
    const now = new Date('2026-10-18T12:00:00Z').getTime()
    const ago = (ms: number) => new Date(now - ms).toISOString()

    it('is short and relative up to a week', () => {
        expect(timeAgo(ago(10_000), now)).toBe('just now')
        expect(timeAgo(ago(5 * 60_000), now)).toBe('5m')
        expect(timeAgo(ago(3 * 3_600_000), now)).toBe('3h')
        expect(timeAgo(ago(2 * 86_400_000), now)).toBe('2d')
    })

    it('falls back to a date after a week', () => {
        expect(timeAgo(ago(9 * 86_400_000), now)).toMatch(/Oct\s+9/)
    })
})

describe('eventHref', () => {
    it('sends each kind of activity to the page it is about', () => {
        expect(eventHref({ eventType: 'challenge_solved', eventData: { targetSlug: 'sql-1' } })).toBe('/challenges/sql-1')
        expect(eventHref({ eventType: 'blog_published', eventData: { targetSlug: 'my-post' } })).toBe('/blog/my-post')
        expect(eventHref({ eventType: 'forum_post', eventData: { targetId: 'abc123' } })).toBe('/forums/abc123')
        expect(eventHref({ eventType: 'event_joined', eventData: { targetSlug: 'meetup' } })).toBe('/events/meetup')
        expect(eventHref({ eventType: 'badge_earned', eventData: {} })).toBe('/badges')
        expect(eventHref({ eventType: 'streak_milestone', eventData: {} })).toBe('/dashboard')
    })

    it('falls back to the list page when the slug is missing, and encodes what it uses', () => {
        expect(eventHref({ eventType: 'challenge_solved', eventData: {} })).toBe('/challenges')
        expect(eventHref({ eventType: 'event_joined', eventData: { targetSlug: 'a/b' } })).toBe('/events/a%2Fb')
    })

    it('has nowhere to go for unknown types or missing data', () => {
        expect(eventHref({ eventType: 'mystery', eventData: {} })).toBeNull()
        expect(eventHref({ eventType: 'badge_earned' })).toBeNull()
    })
})
