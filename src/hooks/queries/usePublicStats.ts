import { useQuery } from '@tanstack/react-query';
import { fetchApi } from '@/lib/api';

export interface PublicStats {
    members: number;
    challenges: number;
    upcomingEvents: number;
    challengesSolved: number;
}

/** Community totals for the feed sidebar, the landing page and onboarding. Cached on the server too. */
export function usePublicStats() {
    return useQuery({
        queryKey: ['stats', 'public'],
        queryFn: () => fetchApi('/api/stats/public', { requireAuth: false }) as Promise<{ success: boolean; data: PublicStats }>,
        select: (res) => res.data,
        staleTime: 10 * 60 * 1000,
        retry: 1,
    });
}
