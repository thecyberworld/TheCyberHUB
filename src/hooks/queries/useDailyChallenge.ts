import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getTodayChallenge, submitDailyAnswer, getDailyHistory } from '@/lib/api/gamification';
import { useAuth } from '@/context/AuthContext';

/** Today's question. Public, but the answer only comes back once the signed-in user has submitted. */
export function useDailyChallenge() {
    const { user } = useAuth();
    return useQuery({
        queryKey: ['dailyChallenge', user?.id ?? null],
        queryFn: getTodayChallenge,
        select: (res) => res.data,
        staleTime: 5 * 60 * 1000,
        retry: 1,
    });
}

export function useSubmitDailyChallenge() {
    const qc = useQueryClient();
    return useMutation({
        mutationFn: (selectedIndex: number) => submitDailyAnswer(selectedIndex),
        onSuccess: () => {
            qc.invalidateQueries({ queryKey: ['dailyChallenge'] });
            qc.invalidateQueries({ queryKey: ['dailyHistory'] });
            qc.invalidateQueries({ queryKey: ['streak'] });
            qc.invalidateQueries({ queryKey: ['leaderboard'] });
            qc.invalidateQueries({ queryKey: ['badges'] });
        },
    });
}

export function useDailyHistory(limit = 30, options: { enabled?: boolean } = {}) {
    const { user } = useAuth();
    return useQuery({
        queryKey: ['dailyHistory', user?.id ?? null, limit],
        queryFn: () => getDailyHistory(limit),
        select: (res) => res.data,
        enabled: !!user && (options.enabled ?? true),
        staleTime: 60 * 1000,
        retry: 1,
    });
}
