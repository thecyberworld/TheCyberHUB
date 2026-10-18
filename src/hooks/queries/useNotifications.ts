import { useInfiniteQuery, useMutation, useQuery, useQueryClient, type InfiniteData } from '@tanstack/react-query';
import { useAuth } from '@/context/AuthContext';
import { useToast } from '@/context/ToastContext';
import * as api from '@/lib/api/notifications';
import type { NotificationPage, NotificationPreferences, NotificationPreferencesUpdate } from '@/types/notifications';

export interface NotificationFilter {
    unread: boolean;
    /** One API type, or null for every type */
    type: string | null;
}

const LISTS = ['notifications', 'list'] as const;
const PREFS = ['notifications', 'preferences'] as const;

/** The notifications page: server-side filters, and "load more" instead of a cut-off at 20 */
export function useNotificationList(filter: NotificationFilter) {
    const { user } = useAuth();
    return useInfiniteQuery<NotificationPage, Error, InfiniteData<NotificationPage>, unknown[], number>({
        queryKey: [...LISTS, user?.id ?? null, filter.unread, filter.type],
        queryFn: ({ pageParam }) => api.getNotifications({ page: pageParam, limit: 20, unread: filter.unread, type: filter.type }),
        initialPageParam: 1,
        getNextPageParam: (last) => (last.pagination.page < last.pagination.totalPages ? last.pagination.page + 1 : undefined),
        enabled: !!user,
        staleTime: 30_000,
    });
}

export function useNotificationPreferences(enabled = true) {
    const { user } = useAuth();
    return useQuery<NotificationPreferences, Error>({
        queryKey: [...PREFS, user?.id ?? null],
        queryFn: api.getNotificationPreferences,
        enabled: enabled && !!user,
        staleTime: 5 * 60_000,
    });
}

function merge(prefs: NotificationPreferences, update: NotificationPreferencesUpdate): NotificationPreferences {
    return {
        ...prefs,
        email: { ...prefs.email, ...update.email },
        inApp: { ...prefs.inApp, ...update.inApp },
        quietHours: { ...prefs.quietHours, ...update.quietHours },
        emailDigest: { ...prefs.emailDigest, ...update.emailDigest },
    };
}

/** A switch flips at once; if the server refuses, it flips back and says so */
export function useUpdateNotificationPreferences() {
    const qc = useQueryClient();
    const { user } = useAuth();
    const { addToast } = useToast();
    const key = [...PREFS, user?.id ?? null];
    return useMutation({
        mutationKey: [...PREFS],
        mutationFn: (update: NotificationPreferencesUpdate) => api.updateNotificationPreferences(update),
        onMutate: async (update) => {
            await qc.cancelQueries({ queryKey: key });
            const previous = qc.getQueryData<NotificationPreferences>(key);
            if (previous) qc.setQueryData(key, merge(previous, update));
            return { previous };
        },
        onError: (err, _update, ctx) => {
            if (ctx?.previous) qc.setQueryData(key, ctx.previous);
            addToast({ variant: 'error', message: err instanceof Error ? err.message : 'Could not save your preferences.' });
        },
        onSuccess: (saved) => {
            // With several switches in flight, only the last answer is the whole truth
            if (qc.isMutating({ mutationKey: [...PREFS] }) <= 1) qc.setQueryData(key, saved);
        },
    });
}
