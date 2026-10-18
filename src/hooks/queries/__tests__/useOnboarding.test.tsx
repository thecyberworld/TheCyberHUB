import React from 'react'
import { renderHook, act, waitFor } from '@testing-library/react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { describe, it, expect, vi, beforeEach } from 'vitest'

const refreshUser = vi.fn()
vi.mock('@/context/AuthContext', () => ({ useAuth: () => ({ user: { id: 'u1' }, refreshUser }) }))
const addToast = vi.fn()
vi.mock('@/context/ToastContext', () => ({ useToast: () => ({ addToast }) }))
const api = vi.hoisted(() => ({ getOnboarding: vi.fn(), getOnboardingOptions: vi.fn(), updateOnboarding: vi.fn(), getSuggestions: vi.fn() }))
vi.mock('@/lib/api/onboarding', () => api)

import { useOnboarding, useUpdateOnboarding, useFollowSuggestions } from '../useOnboarding'

let qc: QueryClient
const wrapper = ({ children }: { children: React.ReactNode }) => <QueryClientProvider client={qc}>{children}</QueryClientProvider>

beforeEach(() => {
    vi.clearAllMocks()
    qc = new QueryClient({ defaultOptions: { queries: { retry: false }, mutations: { retry: false } } })
})

describe('useOnboarding', () => {
    it('loads the state for the signed-in member', async () => {
        api.getOnboarding.mockResolvedValue({ progress: { done: 1, total: 5 } })
        const { result } = renderHook(() => useOnboarding(), { wrapper })
        await waitFor(() => expect(result.current.data).toEqual({ progress: { done: 1, total: 5 } }))
    })

    it('does not load when told not to', () => {
        renderHook(() => useOnboarding(false), { wrapper })
        expect(api.getOnboarding).not.toHaveBeenCalled()
    })
})

describe('useUpdateOnboarding', () => {
    it('puts the new state in the cache and refreshes the user when onboarding ends', async () => {
        const state = { progress: { done: 2, total: 5 } }
        api.updateOnboarding.mockResolvedValue(state)
        qc.setQueryData(['onboarding', 'state', 'u1'], { progress: { done: 0, total: 5 } })
        const { result } = renderHook(() => useUpdateOnboarding(), { wrapper })

        await act(async () => { await result.current.mutateAsync({ completed: true }) })
        expect(qc.getQueryData(['onboarding', 'state', 'u1'])).toEqual(state)
        expect(refreshUser).toHaveBeenCalled()
    })

    it('leaves the user alone for a plain step save', async () => {
        api.updateOnboarding.mockResolvedValue({})
        const { result } = renderHook(() => useUpdateOnboarding(), { wrapper })
        await act(async () => { await result.current.mutateAsync({ step: 1 }) })
        expect(refreshUser).not.toHaveBeenCalled()
    })

    it('tells the member when saving fails', async () => {
        api.updateOnboarding.mockRejectedValue(new Error('Nothing to update'))
        const { result } = renderHook(() => useUpdateOnboarding(), { wrapper })
        await act(async () => { await result.current.mutateAsync({ step: 1 }).catch(() => { }) })
        expect(addToast).toHaveBeenCalledWith(expect.objectContaining({ variant: 'error', message: 'Nothing to update' }))
    })
})

describe('useFollowSuggestions', () => {
    it('asks for the requested number', async () => {
        api.getSuggestions.mockResolvedValue([])
        renderHook(() => useFollowSuggestions(3), { wrapper })
        await waitFor(() => expect(api.getSuggestions).toHaveBeenCalledWith(3))
    })
})
