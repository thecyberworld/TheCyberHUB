import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getMyStreak, checkInToday } from '@/lib/api/gamification';
import { useAuth } from '@/context/AuthContext';

/** The signed-in user's streak. One shared cache entry, so the dashboard and profile make one request. */
export function useStreak() {
    const { user } = useAuth();
    return useQuery({
        queryKey: ['streak', user?.id ?? null],
        queryFn: getMyStreak,
        select: (res) => res.data,
        enabled: !!user,
        staleTime: 5 * 60 * 1000,
        retry: 1,
    });
}

export function useCheckin() {
    const qc = useQueryClient();
    return useMutation({
        mutationFn: checkInToday,
        onSuccess: () => {
            qc.invalidateQueries({ queryKey: ['streak'] });
            qc.invalidateQueries({ queryKey: ['badges'] });
        },
    });
}
