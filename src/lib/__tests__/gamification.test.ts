import { describe, it, expect, vi, beforeEach } from 'vitest'

vi.mock('@/lib/api', () => ({ fetchApi: vi.fn() }))

import { fetchApi } from '@/lib/api'
import { leaderboardPath, getLeaderboard, getUserBadges } from '@/lib/api/gamification'
import { parseBoardParams, boardQuery } from '@/lib/leaderboardParams'
import { buildHeatmap, streakMessage } from '@/components/StreakWidget'
import { formatCountdown } from '@/components/DailyChallenge'

describe('leaderboardPath', () => {
    it('leaves the default period off the URL', () => {
        expect(leaderboardPath({})).toBe('/api/leaderboard')
        expect(leaderboardPath({ period: 'all' })).toBe('/api/leaderboard')
    })

    it('adds period, category, limit and cursor', () => {
        expect(leaderboardPath({ period: 'weekly', category: 'web', limit: 10, cursor: 'abc' })).toBe(
            '/api/leaderboard?period=weekly&category=web&limit=10&cursor=abc'
        )
    })

    it('ignores a null category', () => {
        expect(leaderboardPath({ period: 'monthly', category: null })).toBe('/api/leaderboard?period=monthly')
    })
})

describe('gamification api', () => {
    beforeEach(() => vi.mocked(fetchApi).mockReset())

    it('getLeaderboard requests the built path', async () => {
        vi.mocked(fetchApi).mockResolvedValue({ data: [] })
        await getLeaderboard({ period: 'weekly' })
        expect(fetchApi).toHaveBeenCalledWith('/api/leaderboard?period=weekly')
    })

    it('getUserBadges encodes the username and does not require auth', async () => {
        vi.mocked(fetchApi).mockResolvedValue({ data: { earned: [], progress: [] } })
        await getUserBadges('a b')
        expect(fetchApi).toHaveBeenCalledWith('/api/users/a%20b/badges', { requireAuth: false })
    })
})

describe('board params', () => {
    it('reads known values and ignores the rest', () => {
        expect(parseBoardParams(new URLSearchParams('period=weekly&category=web'))).toEqual({ period: 'weekly', category: 'web' })
        expect(parseBoardParams(new URLSearchParams('period=yearly&category=nope'))).toEqual({ period: 'all', category: null })
    })

    it('uses the caller default period', () => {
        expect(parseBoardParams(new URLSearchParams(''), 'weekly').period).toBe('weekly')
    })

    it('boardQuery drops defaults and keeps unrelated params', () => {
        expect(boardQuery('foo=1&period=weekly', { period: 'all' })).toBe('foo=1')
        expect(boardQuery('', { period: 'monthly', category: 'crypto' })).toBe('period=monthly&category=crypto')
        expect(boardQuery('category=web', { category: null })).toBe('')
    })
})

describe('streak widget helpers', () => {
    it('buildHeatmap covers 84 UTC days ending today and maps action counts to levels', () => {
        const now = new Date('2026-10-18T10:00:00Z')
        const days = buildHeatmap(
            [
                { date: '2026-10-18', actions: ['login'], xpEarned: 5 },
                { date: '2026-10-17', actions: ['a', 'b', 'c'], xpEarned: 5 },
                { date: '2026-10-16', actions: ['a', 'b', 'c', 'd'], xpEarned: 5 },
            ],
            now
        )
        expect(days).toHaveLength(84)
        expect(days[83]).toMatchObject({ date: '2026-10-18', level: 1 })
        expect(days[82]).toMatchObject({ date: '2026-10-17', level: 2 })
        expect(days[81]).toMatchObject({ date: '2026-10-16', level: 3 })
        expect(days[0].level).toBe(0)
    })

    it('streakMessage says what the streak needs', () => {
        expect(streakMessage('active', true, null)).toMatch(/checked in/i)
        expect(streakMessage('at_risk', false, '2026-10-18T23:59:59Z')).toMatch(/before .* to keep your streak/i)
        expect(streakMessage('at_risk', false, null)).toMatch(/today/i)
        expect(streakMessage('broken', false, null)).toMatch(/ended/i)
        expect(streakMessage('none', false, null)).toMatch(/start your streak/i)
    })
})

describe('formatCountdown', () => {
    it('counts down to midnight UTC', () => {
        expect(formatCountdown(new Date('2026-10-18T23:00:00Z'))).toBe('1h 0m 0s')
        expect(formatCountdown(new Date('2026-10-18T00:00:00Z'))).toBe('24h 0m 0s')
        expect(formatCountdown(new Date('2026-10-18T23:59:59Z'))).toBe('0h 0m 1s')
    })
})
