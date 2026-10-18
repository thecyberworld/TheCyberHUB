import { describe, it, expect, vi, beforeEach } from 'vitest'

const fetchApi = vi.hoisted(() => vi.fn())
vi.mock('@/lib/api', () => ({ fetchApi }))

import * as api from '../notifications'

beforeEach(() => {
    fetchApi.mockReset()
    fetchApi.mockResolvedValue({ success: true, data: { scope: 'digest', count: 2 }, message: 'ok' })
})

describe('notificationsPath', () => {
    it('always sends a page and limit, and only the filters that are set', () => {
        expect(api.notificationsPath({})).toBe('/api/notifications?page=1&limit=20')
        const params = new URL(api.notificationsPath({ page: 3, limit: 10, type: 'badge', unread: true }), 'http://x').searchParams
        expect(params.get('page')).toBe('3')
        expect(params.get('type')).toBe('badge')
        expect(params.get('unread')).toBe('true')
    })

    it('leaves unread off when it is false', () => {
        expect(api.notificationsPath({ unread: false })).not.toContain('unread')
    })
})

describe('notification calls', () => {
    it('marks one read with PATCH and deletes with DELETE', async () => {
        await api.markNotificationRead('n1')
        expect(fetchApi).toHaveBeenLastCalledWith('/api/notifications/n1/read', { method: 'PATCH' })
        await api.deleteNotification('n1')
        expect(fetchApi).toHaveBeenLastCalledWith('/api/notifications/n1', { method: 'DELETE' })
        await api.deleteAllNotifications()
        expect(fetchApi).toHaveBeenLastCalledWith('/api/notifications', { method: 'DELETE' })
        await api.markAllNotificationsRead()
        expect(fetchApi).toHaveBeenLastCalledWith('/api/notifications/read-all', { method: 'PATCH' })
    })

    it('reads the count out of the response', async () => {
        await expect(api.getUnreadCount()).resolves.toEqual({ scope: 'digest', count: 2 })
    })

    it('sends only the preferences that changed', async () => {
        await api.updateNotificationPreferences({ inApp: { likes: false } })
        expect(fetchApi).toHaveBeenLastCalledWith('/api/notifications/preferences', { method: 'PATCH', body: JSON.stringify({ inApp: { likes: false } }) })
    })
})

describe('unsubscribe', () => {
    it('previews with GET and applies with POST, never sending a login', async () => {
        await api.previewUnsubscribe('a b')
        expect(fetchApi).toHaveBeenLastCalledWith('/api/notifications/unsubscribe?token=a%20b', { requireAuth: false })
        await expect(api.applyUnsubscribe('tok')).resolves.toEqual({ scope: 'digest', message: 'ok' })
        expect(fetchApi).toHaveBeenLastCalledWith('/api/notifications/unsubscribe?token=tok', { method: 'POST', requireAuth: false })
    })
})
