"use client"

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Bell, CheckCheck, Loader2, Settings, Trash2 } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { useNotificationSocket } from '@/context/NotificationProvider';
import { useNotificationList } from '@/hooks/queries';
import { NOTIFICATION_GROUPS } from '@/lib/notificationMeta';
import NotificationRow from '@/components/notifications/NotificationRow';
import { ConfirmDialog } from '@/components/ui/ConfirmDialog';

export default function NotificationsPage() {
    const { user, loading: authLoading } = useAuth();
    const router = useRouter();
    const { unreadCount, markAsRead, markAllAsRead, deleteNotification, deleteAll } = useNotificationSocket();
    const [unreadOnly, setUnreadOnly] = useState(false);
    const [group, setGroup] = useState<string | null>(null);
    const [markingAll, setMarkingAll] = useState(false);
    const [confirmClear, setConfirmClear] = useState(false);

    // The API filters by one type; a group shows several, so it is narrowed here
    const groupTypes = NOTIFICATION_GROUPS.find((g) => g.id === group)?.types ?? null;
    const { data, isLoading, isError, refetch, hasNextPage, fetchNextPage, isFetchingNextPage } =
        useNotificationList({ unread: unreadOnly, type: null });

    // A group spans several types the API cannot filter on at once, so keep loading until it has enough to show
    const loadedMatches = groupTypes ? (data?.pages.flatMap((p) => p.data).filter((n) => groupTypes.includes(n.type)).length ?? 0) : 0;
    useEffect(() => {
        if (groupTypes && loadedMatches < 10 && hasNextPage && !isFetchingNextPage) fetchNextPage();
    }, [groupTypes, loadedMatches, hasNextPage, isFetchingNextPage, fetchNextPage]);

    useEffect(() => {
        if (!authLoading && !user) router.push('/auth?redirect=/notifications');
    }, [authLoading, user, router]);

    if (authLoading || !user) {
        return (
            <div className="min-h-screen bg-black flex items-center justify-center" role="status" aria-label="Loading">
                <Loader2 className="w-8 h-8 animate-spin text-orange-500" aria-hidden="true" />
            </div>
        );
    }

    const all = data?.pages.flatMap((p) => p.data) ?? [];
    const items = groupTypes ? all.filter((n) => groupTypes.includes(n.type)) : all;
    const total = data?.pages[0]?.pagination.total ?? 0;

    const handleMarkAll = async () => {
        setMarkingAll(true);
        await markAllAsRead();
        setMarkingAll(false);
    };

    return (
        <div className="min-h-screen bg-black">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-orange-500/8 rounded-full blur-[120px] pointer-events-none" aria-hidden="true" />

            <div className="relative max-w-2xl mx-auto px-4 pt-28 pb-20">
                <div className="flex items-start justify-between gap-3 mb-6">
                    <div>
                        <h1 className="text-2xl font-bold text-white">Notifications</h1>
                        <p className="text-sm text-gray-400 mt-0.5" aria-live="polite">
                            {unreadCount > 0 ? `${unreadCount} unread` : 'You are all caught up'}
                        </p>
                    </div>
                    <div className="flex items-center gap-3 flex-wrap justify-end">
                        {unreadCount > 0 && (
                            <button
                                onClick={handleMarkAll}
                                disabled={markingAll}
                                className="flex items-center gap-1.5 text-sm text-gray-400 hover:text-white transition-colors disabled:opacity-50"
                            >
                                {markingAll ? <Loader2 className="w-4 h-4 animate-spin" aria-hidden="true" /> : <CheckCheck className="w-4 h-4" aria-hidden="true" />}
                                Mark all read
                            </button>
                        )}
                        {all.length > 0 && (
                            <button
                                onClick={() => setConfirmClear(true)}
                                className="flex items-center gap-1.5 text-sm text-gray-400 hover:text-red-400 transition-colors"
                            >
                                <Trash2 className="w-4 h-4" aria-hidden="true" />
                                Clear all
                            </button>
                        )}
                        <Link href="/profile?tab=notifications" className="flex items-center gap-1.5 text-sm text-gray-400 hover:text-white transition-colors">
                            <Settings className="w-4 h-4" aria-hidden="true" />
                            Settings
                        </Link>
                    </div>
                </div>

                <div className="flex gap-1 mb-3 border-b border-white/10" role="tablist" aria-label="Show">
                    {([['all', 'All'], ['unread', 'Unread']] as const).map(([id, label]) => {
                        const active = (id === 'unread') === unreadOnly;
                        return (
                            <button
                                key={id}
                                role="tab"
                                aria-selected={active}
                                onClick={() => setUnreadOnly(id === 'unread')}
                                className={`px-4 py-2.5 text-sm font-medium transition-colors border-b-2 -mb-px ${active ? 'border-orange-500 text-white' : 'border-transparent text-gray-400 hover:text-white'}`}
                            >
                                {label}
                                {id === 'unread' && unreadCount > 0 && (
                                    <span className="ml-2 px-1.5 py-0.5 text-xs bg-orange-500/20 text-orange-400 rounded-full">{unreadCount}</span>
                                )}
                            </button>
                        );
                    })}
                </div>

                <div className="flex gap-2 mb-4 overflow-x-auto pb-1" role="group" aria-label="Filter by kind">
                    {[{ id: null, label: 'Everything' }, ...NOTIFICATION_GROUPS].map((g) => (
                        <button
                            key={g.id ?? 'all'}
                            onClick={() => setGroup(g.id)}
                            aria-pressed={group === g.id}
                            className={`px-3 py-1 rounded-full text-xs font-medium whitespace-nowrap border transition-colors ${group === g.id ? 'bg-orange-500/20 border-orange-500/40 text-orange-300' : 'border-white/10 text-gray-400 hover:text-white hover:border-white/20'}`}
                        >
                            {g.label}
                        </button>
                    ))}
                </div>

                <div className="rounded-2xl border border-white/10 bg-white/[0.02] overflow-hidden">
                    {isLoading ? (
                        <div className="flex justify-center py-16" role="status" aria-label="Loading notifications">
                            <Loader2 className="w-6 h-6 animate-spin text-orange-500" aria-hidden="true" />
                        </div>
                    ) : isError ? (
                        <div className="text-center py-16 px-4">
                            <p className="text-gray-400 mb-3">Your notifications could not be loaded.</p>
                            <button onClick={() => refetch()} className="px-4 py-2 bg-white/10 text-white rounded-xl text-sm font-medium hover:bg-white/20 transition-colors">
                                Try again
                            </button>
                        </div>
                    ) : items.length === 0 ? (
                        <div className="flex flex-col items-center justify-center py-20 text-center px-4">
                            <div className="w-14 h-14 rounded-full bg-white/5 flex items-center justify-center mb-4">
                                <Bell className="w-7 h-7 text-gray-500" aria-hidden="true" />
                            </div>
                            <p className="text-gray-300 font-medium">
                                {unreadOnly ? 'No unread notifications' : group ? 'Nothing of this kind' : 'No notifications yet'}
                            </p>
                            <p className="text-gray-500 text-sm mt-1">
                                {unreadOnly ? "You're all caught up!" : 'Replies, mentions, badges and events show up here.'}
                            </p>
                        </div>
                    ) : (
                        <ul className="divide-y divide-white/5">
                            {items.map((n) => (
                                <NotificationRow key={n._id} notification={n} onRead={markAsRead} onDelete={deleteNotification} />
                            ))}
                        </ul>
                    )}
                </div>

                {hasNextPage && (
                    <div className="flex justify-center mt-4">
                        <button
                            onClick={() => fetchNextPage()}
                            disabled={isFetchingNextPage}
                            className="px-5 py-2 bg-white/10 text-white rounded-xl text-sm font-medium hover:bg-white/20 transition-colors disabled:opacity-50 flex items-center gap-2"
                        >
                            {isFetchingNextPage && <Loader2 className="w-4 h-4 animate-spin" aria-hidden="true" />}
                            Load older
                        </button>
                    </div>
                )}
                {!hasNextPage && total > 20 && items.length > 0 && (
                    <p className="text-center text-xs text-gray-500 mt-4">That is everything</p>
                )}
            </div>

            <ConfirmDialog
                open={confirmClear}
                onConfirm={() => { setConfirmClear(false); deleteAll(); }}
                onCancel={() => setConfirmClear(false)}
                title="Clear all notifications?"
                description="Every notification is deleted, read or not."
                confirmText="Clear all"
            />
        </div>
    );
}
