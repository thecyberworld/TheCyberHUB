import { describe, it, expect } from 'vitest'
import { pointsByMonth } from '../useUserActivity'

describe('pointsByMonth', () => {
    const now = new Date(Date.UTC(2026, 9, 18)) // October 2026

    it('lists the last six months, oldest first, with zeros where nothing happened', () => {
        const months = pointsByMonth([], 6, now)
        expect(months.map((m) => m.name)).toEqual(['May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct'])
        expect(months.every((m) => m.points === 0)).toBe(true)
    })

    it('adds up the days of each month and ignores older ones', () => {
        const months = pointsByMonth([
            { date: '2026-10-01', points: 50, count: 1 },
            { date: '2026-10-17', points: 25, count: 2 },
            { date: '2026-08-09', points: 100, count: 1 },
            { date: '2025-10-30', points: 999, count: 1 },
        ], 6, now)
        expect(months.find((m) => m.name === 'Oct')?.points).toBe(75)
        expect(months.find((m) => m.name === 'Aug')?.points).toBe(100)
        expect(months.reduce((n, m) => n + m.points, 0)).toBe(175)
    })

    it('crosses a year boundary', () => {
        const months = pointsByMonth([{ date: '2025-12-31', points: 10, count: 1 }], 3, new Date(Date.UTC(2026, 1, 5)))
        expect(months.map((m) => m.name)).toEqual(['Dec', 'Jan', 'Feb'])
        expect(months[0].points).toBe(10)
    })
})
