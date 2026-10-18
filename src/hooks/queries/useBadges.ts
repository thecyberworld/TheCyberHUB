import { useQuery } from '@tanstack/react-query';
import { getBadgeCatalog, getUserBadges } from '@/lib/api/gamification';
import { useAuth } from '@/context/AuthContext';

/** Every badge. Signed in, each entry also says whether it is earned and how far along you are. */
export function useBadgeCatalog() {
    const { user } = useAuth();
    return useQuery({
        queryKey: ['badges', 'catalog', user?.id ?? null],
        queryFn: getBadgeCatalog,
        select: (res) => res.data,
        staleTime: 5 * 60 * 1000,
        retry: 1,
    });
}

/** Badges earned by one user (profile, public profile, dashboard) plus their closest unearned ones. */
export function useUserBadges(username: string | undefined) {
    return useQuery({
        queryKey: ['badges', 'user', username],
        queryFn: () => getUserBadges(username as string),
        select: (res) => res.data,
        enabled: !!username,
        staleTime: 5 * 60 * 1000,
        retry: 1,
    });
}
