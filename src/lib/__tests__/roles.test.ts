import { describe, it, expect } from 'vitest'
import { canSanctionUser, isModeratorRole } from '../roles'

describe('roles', () => {
    it('knows moderator roles', () => {
        expect(isModeratorRole('moderator')).toBe(true)
        expect(isModeratorRole('user')).toBe(false)
        expect(isModeratorRole(undefined)).toBe(false)
    })

    it('lets staff sanction only lower roles, owners anyone else, nobody themselves', () => {
        const mod = { id: 'm', role: 'moderator' }
        expect(canSanctionUser(mod, { id: 'u', role: 'user' })).toBe(true)
        expect(canSanctionUser(mod, { id: 'o', role: 'moderator' })).toBe(false)
        expect(canSanctionUser(mod, { id: 'a', role: 'admin' })).toBe(false)
        expect(canSanctionUser({ id: 'a', role: 'admin' }, mod)).toBe(true)
        expect(canSanctionUser({ id: 'a', role: 'admin' }, { id: 'b', role: 'admin' })).toBe(false)
        expect(canSanctionUser({ id: 'w', role: 'owner' }, { id: 'a', role: 'admin' })).toBe(true)
        expect(canSanctionUser({ id: 'w', role: 'owner' }, { id: 'w', role: 'owner' })).toBe(false)
    })

    it('never lets a member or a signed-out visitor sanction', () => {
        expect(canSanctionUser({ id: 'x', role: 'user' }, { id: 'y', role: 'user' })).toBe(false)
        expect(canSanctionUser(null, { id: 'y', role: 'user' })).toBe(false)
        expect(canSanctionUser({ id: 'm', role: 'moderator' }, null)).toBe(false)
    })
})
