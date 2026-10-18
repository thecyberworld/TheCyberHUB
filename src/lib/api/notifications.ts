import { fetchApi } from '@/lib/api';
import type {
    NotificationPage,
    NotificationPreferences,
    NotificationPreferencesUpdate,
    UnreadCount,
    UnsubscribeScope,
} from '@/types/notifications';

export interface NotificationQuery {
    page?: number;
    limit?: number;
    type?: string | null;
    unread?: boolean;
}

export function notificationsPath(query: NotificationQuery): string {
    const params = new URLSearchParams();
    params.set('page', String(query.page ?? 1));
    params.set('limit', String(query.limit ?? 20));
    if (query.type) params.set('type', query.type);
    if (query.unread) params.set('unread', 'true');
    return `/api/notifications?${params.toString()}`;
}

export function getNotifications(query: NotificationQuery): Promise<NotificationPage> {
    return fetchApi(notificationsPath(query));
}

export async function getUnreadCount(): Promise<UnreadCount> {
    const res = await fetchApi('/api/notifications/unread-count');
    return res.data;
}

export function markNotificationRead(id: string): Promise<unknown> {
    return fetchApi(`/api/notifications/${encodeURIComponent(id)}/read`, { method: 'PATCH' });
}

export function markAllNotificationsRead(): Promise<unknown> {
    return fetchApi('/api/notifications/read-all', { method: 'PATCH' });
}

export function deleteNotification(id: string): Promise<unknown> {
    return fetchApi(`/api/notifications/${encodeURIComponent(id)}`, { method: 'DELETE' });
}

export function deleteAllNotifications(): Promise<unknown> {
    return fetchApi('/api/notifications', { method: 'DELETE' });
}

export async function getNotificationPreferences(): Promise<NotificationPreferences> {
    const res = await fetchApi('/api/notifications/preferences');
    return res.data;
}

export async function updateNotificationPreferences(update: NotificationPreferencesUpdate): Promise<NotificationPreferences> {
    const res = await fetchApi('/api/notifications/preferences', { method: 'PATCH', body: JSON.stringify(update) });
    return res.data;
}

/** The link in an email carries the token; no login is involved */
export async function previewUnsubscribe(token: string): Promise<{ scope: UnsubscribeScope; email: string }> {
    const res = await fetchApi(`/api/notifications/unsubscribe?token=${encodeURIComponent(token)}`, { requireAuth: false });
    return res.data;
}

export async function applyUnsubscribe(token: string): Promise<{ scope: UnsubscribeScope; message: string }> {
    const res = await fetchApi(`/api/notifications/unsubscribe?token=${encodeURIComponent(token)}`, { method: 'POST', requireAuth: false });
    return { scope: res.data.scope, message: res.message };
}
