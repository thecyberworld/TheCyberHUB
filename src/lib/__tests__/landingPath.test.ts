import { describe, it, expect } from 'vitest'
import { landingPath, needsWelcome } from '../landingPath'

const NOW = Date.parse('2026-10-18T12:00:00Z')
const fresh = { createdAt: '2026-10-18T11:00:00Z', onboarding: { completedAt: null, skippedAt: null } }

describe('needsWelcome', () => {
    it('is true for a new account that has neither finished nor skipped', () => {
        expect(needsWelcome(fresh, NOW)).toBe(true)
    })
    it('is false once finished or skipped', () => {
        expect(needsWelcome({ ...fresh, onboarding: { completedAt: '2026-10-18T11:30:00Z', skippedAt: null } }, NOW)).toBe(false)
        expect(needsWelcome({ ...fresh, onboarding: { completedAt: null, skippedAt: '2026-10-18T11:30:00Z' } }, NOW)).toBe(false)
    })
    it('never forces an older member through it', () => {
        expect(needsWelcome({ ...fresh, createdAt: '2026-09-01T00:00:00Z' }, NOW)).toBe(false)
    })
    it('is false when the API did not say (an older server, or no user)', () => {
        expect(needsWelcome({ createdAt: fresh.createdAt }, NOW)).toBe(false)
        expect(needsWelcome(null, NOW)).toBe(false)
    })
})

describe('landingPath', () => {
    it('lets a valid ?redirect= win over the welcome flow', () => {
        expect(landingPath(fresh, '/challenges/xss')).toBe('/challenges/xss')
    })
    it('ignores an unsafe redirect and carries on', () => {
        expect(landingPath(fresh, 'https://evil.example')).toBe('/welcome')
        expect(landingPath(fresh, '//evil.example', '/profile')).toBe('/welcome')
    })
    it('sends a finished member to the fallback', () => {
        expect(landingPath({ ...fresh, onboarding: { completedAt: 'x', skippedAt: null } }, null)).toBe('/profile')
        expect(landingPath(null, null, '/dashboard')).toBe('/dashboard')
    })
})
