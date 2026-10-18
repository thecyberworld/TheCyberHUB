import { useInfiniteQuery } from '@tanstack/react-query';
import { getLeaderboard } from '@/lib/api/gamification';
import { useAuth } from '@/context/AuthContext';
import type { LeaderboardEntry, LeaderboardQuery } from '@/types/gamification';

/**
 * One leaderboard hook for every board. Pages are cursor based ("load more"); the signed-in
 * viewer's own place comes back in `meta.me` of each page, even when they are not on it.
 *
 * `enabled: false` keeps a hidden tab from fetching.
 */
export function useLeaderboard(query: LeaderboardQuery = {}, options: { enabled?: boolean } = {}) {
    const { user } = useAuth();
    const { period = 'all', category = null, limit = 25 } = query;

    const result = useInfiniteQuery({
        queryKey: ['leaderboard', { period, category, limit, viewer: user?.id ?? null }],
        queryFn: ({ pageParam }) => getLeaderboard({ period, category, limit, cursor: pageParam }),
        initialPageParam: null as string | null,
        getNextPageParam: (last) => last.pagination.nextCursor ?? undefined,
        staleTime: 60 * 1000,
        // A failing board should show its error and a retry button, not hammer the API
        retry: 1,
        enabled: options.enabled ?? true,
    });

    const pages = result.data?.pages ?? [];
    const entries: LeaderboardEntry[] = pages.flatMap((p) => p.data);
    const me = pages.length ? pages[0].meta.me : null;
    const windowStart = pages.length ? pages[0].meta.windowStart : null;

    return { ...result, entries, me, windowStart };
}
