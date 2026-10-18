import { describe, it, expect } from 'vitest'
import { NOTIFICATION_GROUPS, NOTIFICATION_META, metaFor, safeLink } from '../notificationMeta'
import { NOTIFICATION_TYPES } from '@/types/notifications'

describe('notification meta', () => {
    it('knows an icon for every type the API can create', () => {
        for (const type of NOTIFICATION_TYPES) expect(NOTIFICATION_META[type], type).toBeDefined()
    })

    it('puts every type in exactly one filter group', () => {
        const grouped = NOTIFICATION_GROUPS.flatMap((g) => g.types)
        expect([...grouped].sort()).toEqual([...NOTIFICATION_TYPES].sort())
    })

    it('falls back to the system look for an unknown type', () => {
        expect(metaFor('from-the-future')).toBe(NOTIFICATION_META.system)
    })
})

describe('safeLink', () => {
    it('keeps links inside the app', () => {
        expect(safeLink('/feed/post/1#comment-2')).toBe('/feed/post/1#comment-2')
    })
    it('refuses anything that would leave the site', () => {
        expect(safeLink('https://evil.example')).toBeNull()
        expect(safeLink('//evil.example')).toBeNull()
        expect(safeLink('javascript:alert(1)')).toBeNull()
        expect(safeLink(undefined)).toBeNull()
    })
})
