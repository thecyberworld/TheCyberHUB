import { CHALLENGE_CATEGORIES, type ChallengeCategory, type LeaderboardPeriod } from '@/types/gamification';

const PERIODS: LeaderboardPeriod[] = ['all', 'monthly', 'weekly'];

/** Read ?period= and ?category= from the URL, ignoring anything that is not a known value. */
export function parseBoardParams(params: { get(name: string): string | null }, defaultPeriod: LeaderboardPeriod = 'all'): {
    period: LeaderboardPeriod;
    category: ChallengeCategory | null;
} {
    const rawPeriod = params.get('period');
    const rawCategory = params.get('category');
    return {
        period: PERIODS.includes(rawPeriod as LeaderboardPeriod) ? (rawPeriod as LeaderboardPeriod) : defaultPeriod,
        category: (CHALLENGE_CATEGORIES as readonly string[]).includes(rawCategory ?? '') ? (rawCategory as ChallengeCategory) : null,
    };
}

/** New query string for a board change; defaults are left out so URLs stay short. */
export function boardQuery(
    current: URLSearchParams | string,
    next: { period?: LeaderboardPeriod; category?: ChallengeCategory | null },
    defaultPeriod: LeaderboardPeriod = 'all'
): string {
    const params = new URLSearchParams(typeof current === 'string' ? current : current.toString());
    if (next.period !== undefined) {
        if (next.period === defaultPeriod) params.delete('period');
        else params.set('period', next.period);
    }
    if (next.category !== undefined) {
        if (next.category === null) params.delete('category');
        else params.set('category', next.category);
    }
    return params.toString();
}
