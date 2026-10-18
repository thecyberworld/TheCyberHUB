import React from 'react'
import { renderHook, act, waitFor } from '@testing-library/react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { describe, it, expect, vi, beforeEach } from 'vitest'

vi.mock('@/context/AuthContext', () => ({ useAuth: () => ({ user: { id: 'u1' } }) }))
const addToast = vi.fn()
vi.mock('@/context/ToastContext', () => ({ useToast: () => ({ addToast }) }))

const api = vi.hoisted(() => ({ getNotifications: vi.fn(), getNotificationPreferences: vi.fn(), updateNotificationPreferences: vi.fn() }))
vi.mock('@/lib/api/notifications', () => api)

import { useNotificationList, useNotificationPreferences, useUpdateNotificationPreferences } from '../useNotifications'

const prefs = () => ({
    email: { replies: true },
    inApp: { likes: true },
    quietHours: { enabled: false, start: '22:00', end: '08:00', timezone: 'UTC' },
    emailDigest: { enabled: true, frequency: 'weekly' },
})

let qc: QueryClient
const wrapper = ({ children }: { children: React.ReactNode }) => <QueryClientProvider client={qc}>{children}</QueryClientProvider>
const KEY = ['notifications', 'preferences', 'u1']

beforeEach(() => {
    vi.clearAllMocks()
    qc = new QueryClient({ defaultOptions: { queries: { retry: false, gcTime: Infinity }, mutations: { retry: false } } })
})

describe('useNotificationList', () => {
    it('pages by number and stops at the last page', async () => {
        api.getNotifications
            .mockResolvedValueOnce({ data: [{ _id: '1' }], pagination: { page: 1, totalPages: 2 } })
            .mockResolvedValueOnce({ data: [{ _id: '2' }], pagination: { page: 2, totalPages: 2 } })
        const { result } = renderHook(() => useNotificationList({ unread: true, type: null }), { wrapper })
        await waitFor(() => expect(result.current.data?.pages).toHaveLength(1))
        expect(api.getNotifications).toHaveBeenLastCalledWith({ page: 1, limit: 20, unread: true, type: null })
        expect(result.current.hasNextPage).toBe(true)
        await act(async () => { await result.current.fetchNextPage() })
        expect(api.getNotifications).toHaveBeenLastCalledWith({ page: 2, limit: 20, unread: true, type: null })
        await waitFor(() => expect(result.current.hasNextPage).toBe(false))
    })
})

describe('useUpdateNotificationPreferences', () => {
    it('flips the switch at once and keeps the server answer', async () => {
        api.getNotificationPreferences.mockResolvedValue(prefs())
        let release!: (v: unknown) => void
        api.updateNotificationPreferences.mockReturnValue(new Promise((r) => { release = r }))
        const read = renderHook(() => useNotificationPreferences(), { wrapper })
        await waitFor(() => expect(read.result.current.data).toBeDefined())
        const { result } = renderHook(() => useUpdateNotificationPreferences(), { wrapper })

        act(() => { result.current.mutate({ inApp: { likes: false } }) })
        await waitFor(() => expect((qc.getQueryData(KEY) as ReturnType<typeof prefs>).inApp.likes).toBe(false))

        const saved = { ...prefs(), inApp: { likes: false } }
        await act(async () => { release(saved) })
        await waitFor(() => expect(qc.getQueryData(KEY)).toEqual(saved))
    })

    it('flips it back and tells the member when the server refuses', async () => {
        api.getNotificationPreferences.mockResolvedValue(prefs())
        let fail!: (e: Error) => void
        api.updateNotificationPreferences.mockReturnValue(new Promise((_r, rej) => { fail = rej }))
        const read = renderHook(() => useNotificationPreferences(), { wrapper })
        await waitFor(() => expect(read.result.current.data).toBeDefined())
        const { result } = renderHook(() => useUpdateNotificationPreferences(), { wrapper })

        act(() => { result.current.mutate({ emailDigest: { enabled: false } }) })
        await waitFor(() => expect((qc.getQueryData(KEY) as ReturnType<typeof prefs>).emailDigest.enabled).toBe(false))
        await act(async () => { fail(new Error('Nope')) })
        await waitFor(() => expect((qc.getQueryData(KEY) as ReturnType<typeof prefs>).emailDigest.enabled).toBe(true))
        expect(addToast).toHaveBeenCalledWith(expect.objectContaining({ variant: 'error', message: 'Nope' }))
    })
})
