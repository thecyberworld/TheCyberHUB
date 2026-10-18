import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useAuth } from '@/context/AuthContext';
import { useToast } from '@/context/ToastContext';
import * as api from '@/lib/api/onboarding';
import type { OnboardingUpdate } from '@/types/onboarding';

const ONBOARDING = ['onboarding'] as const;

export function useOnboardingOptions() {
    return useQuery({
        queryKey: [...ONBOARDING, 'options'],
        queryFn: api.getOnboardingOptions,
        staleTime: Infinity,
    });
}

/** The checklist and next steps. Derived from real activity on the server, so refetched when the member acts. */
export function useOnboarding(enabled = true) {
    const { user } = useAuth();
    return useQuery({
        queryKey: [...ONBOARDING, 'state', user?.id ?? null],
        queryFn: api.getOnboarding,
        enabled: enabled && !!user,
        staleTime: 30_000,
    });
}

export function useUpdateOnboarding() {
    const qc = useQueryClient();
    const { refreshUser } = useAuth();
    const { addToast } = useToast();
    return useMutation({
        mutationFn: (update: OnboardingUpdate) => api.updateOnboarding(update),
        onSuccess: (state, update) => {
            qc.setQueriesData({ queryKey: [...ONBOARDING, 'state'] }, state);
            // The signed-in user carries onboarding.completedAt/skippedAt; keep it in step
            if (update.completed || update.skipped || update.interests) void refreshUser();
        },
        onError: (err) => {
            addToast({ variant: 'error', message: err instanceof Error ? err.message : 'Could not save that. Please try again.' });
        },
    });
}

export function useFollowSuggestions(limit = 8, enabled = true) {
    const { user } = useAuth();
    return useQuery({
        queryKey: ['follow', 'suggestions', limit, user?.id ?? null],
        queryFn: () => api.getSuggestions(limit),
        enabled,
        staleTime: 5 * 60_000,
    });
}
