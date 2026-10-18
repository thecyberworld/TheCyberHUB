"use client";

import React, { createContext, useContext, useEffect, useRef, useState, useCallback, ReactNode } from 'react';
import { useQueryClient, type InfiniteData, type QueryClient } from '@tanstack/react-query';
import { io, Socket } from 'socket.io-client';
import { useAuth } from './AuthContext';
import { useToast } from './ToastContext';
import { API_URL } from '@/lib/api';
import * as api from '@/lib/api/notifications';
import type { NotificationData, NotificationPage } from '@/types/notifications';

export type { NotificationData } from '@/types/notifications';

/** Every list the notifications page has open lives under this key */
export const NOTIFICATION_LISTS = ['notifications', 'list'] as const;

/** At most this many pop-ups in a burst; the rest become one summary toast */
const TOAST_BURST = 2;
const TOAST_WINDOW_MS = 6000;

interface NotificationContextValue {
    socket: Socket | null;
    connected: boolean;
    /** The most recent notifications, for the bell menu */
    notifications: NotificationData[];
    unreadCount: number;
    markAsRead: (id: string) => Promise<void>;
    markAllAsRead: () => Promise<void>;
    deleteNotification: (id: string) => Promise<void>;
    deleteAll: () => Promise<void>;
}

const NotificationContext = createContext<NotificationContextValue>({
    socket: null,
    connected: false,
    notifications: [],
    unreadCount: 0,
    markAsRead: async () => { },
    markAllAsRead: async () => { },
    deleteNotification: async () => { },
    deleteAll: async () => { },
});

export const useNotificationSocket = () => useContext(NotificationContext);

type Lists = InfiniteData<NotificationPage> | undefined;

function patchLists(qc: QueryClient, fn: (items: NotificationData[]) => NotificationData[]) {
    qc.setQueriesData<Lists>({ queryKey: NOTIFICATION_LISTS }, (old) =>
        old && { ...old, pages: old.pages.map((p) => ({ ...p, data: fn(p.data) })) });
}

export const NotificationProvider = ({ children }: { children: ReactNode }) => {
    const { token, user } = useAuth();
    const { addToast } = useToast();
    const qc = useQueryClient();
    const userId = user?.id;
    const addToastRef = useRef(addToast);
    const [socket, setSocket] = useState<Socket | null>(null);
    const [connected, setConnected] = useState(false);
    const [notifications, setNotifications] = useState<NotificationData[]>([]);
    const [unreadCount, setUnreadCount] = useState(0);
    const notificationsRef = useRef<NotificationData[]>([]);
    const burst = useRef<{ shown: number; extra: number; timer: ReturnType<typeof setTimeout> | null }>({ shown: 0, extra: 0, timer: null });

    useEffect(() => { addToastRef.current = addToast; }, [addToast]);
    useEffect(() => { notificationsRef.current = notifications; }, [notifications]);

    const refreshCount = useCallback(async () => {
        try {
            setUnreadCount((await api.getUnreadCount()).count);
        } catch {
            // The badge is a convenience; the next event corrects it
        }
    }, []);

    const fetchNotifications = useCallback(async () => {
        if (!token) return;
        try {
            const [page] = await Promise.all([api.getNotifications({ limit: 20 }), refreshCount()]);
            if (page.success) setNotifications(page.data);
        } catch {
            // Non-critical
        }
    }, [token, refreshCount]);

    const markAsRead = useCallback(async (id: string) => {
        const target = notificationsRef.current.find((n) => n._id === id);
        if (target?.read) return;
        setNotifications((prev) => prev.map((n) => (n._id === id ? { ...n, read: true } : n)));
        patchLists(qc, (items) => items.map((n) => (n._id === id ? { ...n, read: true } : n)));
        if (target) setUnreadCount((c) => Math.max(0, c - 1));
        try {
            await api.markNotificationRead(id);
        } catch {
            setNotifications((prev) => prev.map((n) => (n._id === id ? { ...n, read: false } : n)));
            patchLists(qc, (items) => items.map((n) => (n._id === id ? { ...n, read: false } : n)));
            refreshCount();
            addToastRef.current({ variant: 'error', message: 'Could not mark it as read.' });
        }
    }, [qc, refreshCount]);

    const markAllAsRead = useCallback(async () => {
        try {
            await api.markAllNotificationsRead();
            setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
            patchLists(qc, (items) => items.map((n) => ({ ...n, read: true })));
            setUnreadCount(0);
        } catch {
            addToastRef.current({ variant: 'error', message: 'Could not mark everything as read.' });
        }
    }, [qc]);

    const deleteNotification = useCallback(async (id: string) => {
        const before = notificationsRef.current;
        const target = before.find((n) => n._id === id);
        setNotifications((prev) => prev.filter((n) => n._id !== id));
        patchLists(qc, (items) => items.filter((n) => n._id !== id));
        if (target && !target.read) setUnreadCount((c) => Math.max(0, c - 1));
        try {
            await api.deleteNotification(id);
            // The rest of the list may have more to show now
            qc.invalidateQueries({ queryKey: NOTIFICATION_LISTS });
            refreshCount();
        } catch {
            if (target) setNotifications(before);
            qc.invalidateQueries({ queryKey: NOTIFICATION_LISTS });
            refreshCount();
            addToastRef.current({ variant: 'error', message: 'Could not delete the notification.' });
        }
    }, [qc, refreshCount]);

    const deleteAll = useCallback(async () => {
        try {
            await api.deleteAllNotifications();
            setNotifications([]);
            setUnreadCount(0);
            qc.invalidateQueries({ queryKey: NOTIFICATION_LISTS });
        } catch {
            addToastRef.current({ variant: 'error', message: 'Could not clear your notifications.' });
        }
    }, [qc]);

    useEffect(() => {
        const state = burst.current;
        if (!token || !userId) {
            setNotifications([]);
            setUnreadCount(0);
            return;
        }

        const newSocket = io(API_URL, {
            auth: { token },
            transports: ['websocket', 'polling'],
            reconnection: true,
            reconnectionAttempts: 10,
            reconnectionDelay: 1000,
            reconnectionDelayMax: 30000,
            timeout: 20000,
        });

        fetchNotifications();

        const onConnect = () => setConnected(true);
        const onDisconnect = () => setConnected(false);

        // A burst of arrivals must not bury the page under pop-ups
        const announce = (data: NotificationData) => {
            if (state.shown < TOAST_BURST) {
                state.shown += 1;
                addToastRef.current({
                    title: data.title || 'New notification',
                    message: data.message || 'You have a new update.',
                    variant: 'info',
                });
            } else {
                state.extra += 1;
            }
            if (!state.timer) {
                state.timer = setTimeout(() => {
                    if (state.extra > 0) {
                        addToastRef.current({
                            title: 'New notifications',
                            message: `${state.extra} more ${state.extra === 1 ? 'update' : 'updates'} waiting for you.`,
                            variant: 'info',
                        });
                    }
                    state.shown = 0;
                    state.extra = 0;
                    state.timer = null;
                }, TOAST_WINDOW_MS);
            }
        };

        const onNewNotification = (data: NotificationData) => {
            setNotifications((prev) => (prev.some((n) => n._id === data._id) ? prev : [data, ...prev].slice(0, 50)));
            setUnreadCount((c) => c + 1);
            qc.invalidateQueries({ queryKey: NOTIFICATION_LISTS });
            announce(data);
        };

        newSocket.on('connect', onConnect);
        newSocket.on('disconnect', onDisconnect);
        newSocket.on('connect_error', onDisconnect);
        newSocket.on('newNotification', onNewNotification);
        setSocket(newSocket);

        return () => {
            newSocket.off('connect', onConnect);
            newSocket.off('disconnect', onDisconnect);
            newSocket.off('connect_error', onDisconnect);
            newSocket.off('newNotification', onNewNotification);
            newSocket.disconnect();
            if (state.timer) clearTimeout(state.timer);
            state.timer = null;
            state.shown = 0;
            state.extra = 0;
            setSocket(null);
            setConnected(false);
        };
    }, [token, userId, qc, fetchNotifications]);

    return (
        <NotificationContext.Provider value={{
            socket,
            connected,
            notifications,
            unreadCount,
            markAsRead,
            markAllAsRead,
            deleteNotification,
            deleteAll,
        }}>
            {children}
        </NotificationContext.Provider>
    );
};
