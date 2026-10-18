import { describe, it, expect, vi, beforeEach } from 'vitest'

const fetchApi = vi.hoisted(() => vi.fn())
vi.mock('@/lib/api', () => ({ fetchApi }))

import * as api from '../onboarding'

beforeEach(() => {
    fetchApi.mockReset()
    fetchApi.mockResolvedValue({ success: true, data: { ok: 1 } })
})

describe('onboarding api', () => {
    it('reads the options without a login', async () => {
        await expect(api.getOnboardingOptions()).resolves.toEqual({ ok: 1 })
        expect(fetchApi).toHaveBeenCalledWith('/api/onboarding/options', { requireAuth: false })
    })

    it('reads and patches the state', async () => {
        await api.getOnboarding()
        expect(fetchApi).toHaveBeenLastCalledWith('/api/onboarding')
        await api.updateOnboarding({ step: 1, interests: ['web'] })
        expect(fetchApi).toHaveBeenLastCalledWith('/api/onboarding', { method: 'PATCH', body: JSON.stringify({ step: 1, interests: ['web'] }) })
    })

    it('asks for as many suggestions as wanted, sending the login so followed people are left out', async () => {
        await api.getSuggestions(4)
        expect(fetchApi).toHaveBeenLastCalledWith('/api/users/suggestions?limit=4')
    })
})
