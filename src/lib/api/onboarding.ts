import { fetchApi } from '@/lib/api';
import type { OnboardingOptions, OnboardingState, OnboardingUpdate, SuggestedMember } from '@/types/onboarding';

export async function getOnboardingOptions(): Promise<OnboardingOptions> {
    const res = await fetchApi('/api/onboarding/options', { requireAuth: false });
    return res.data;
}

export async function getOnboarding(): Promise<OnboardingState> {
    const res = await fetchApi('/api/onboarding');
    return res.data;
}

export async function updateOnboarding(update: OnboardingUpdate): Promise<OnboardingState> {
    const res = await fetchApi('/api/onboarding', { method: 'PATCH', body: JSON.stringify(update) });
    return res.data;
}

/** Sent with the token when there is one, so the caller never gets themselves or people they follow */
export async function getSuggestions(limit = 8): Promise<SuggestedMember[]> {
    const res = await fetchApi(`/api/users/suggestions?limit=${limit}`);
    return res.data;
}
