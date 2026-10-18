import { fetchApi } from '@/lib/api';
import type {
    CatalogBadge,
    CheckInResult,
    DailyChallengeData,
    DailyHistory,
    DailySubmitResult,
    LeaderboardPage,
    LeaderboardQuery,
    StreakData,
    UserBadges,
} from '@/types/gamification';

export function leaderboardPath(query: LeaderboardQuery & { cursor?: string | null }): string {
    const params = new URLSearchParams();
    // `all` is the server default, so it is left off the URL
    if (query.period && query.period !== 'all') params.set('period', query.period);
    if (query.category) params.set('category', query.category);
    if (query.limit) params.set('limit', String(query.limit));
    if (query.cursor) params.set('cursor', query.cursor);
    const qs = params.toString();
    return `/api/leaderboard${qs ? `?${qs}` : ''}`;
}

/** Public. The token (if any) is sent so the response carries the viewer's own rank in `meta.me`. */
export async function getLeaderboard(query: LeaderboardQuery & { cursor?: string | null }): Promise<LeaderboardPage> {
    return fetchApi(leaderboardPath(query));
}

export async function getBadgeCatalog(): Promise<{ success: boolean; data: CatalogBadge[] }> {
    return fetchApi('/api/badges');
}

export async function getUserBadges(username: string): Promise<{ success: boolean; data: UserBadges }> {
    return fetchApi(`/api/users/${encodeURIComponent(username)}/badges`, { requireAuth: false });
}

export async function getMyStreak(): Promise<{ success: boolean; data: StreakData }> {
    return fetchApi('/api/streak/me');
}

export async function checkInToday(): Promise<{ success: boolean; data: CheckInResult }> {
    return fetchApi('/api/streak/checkin', { method: 'POST', body: JSON.stringify({ action: 'login' }) });
}

export async function getTodayChallenge(): Promise<{ success: boolean; data: DailyChallengeData | null }> {
    return fetchApi('/api/daily-challenge/today');
}

export async function submitDailyAnswer(selectedIndex: number): Promise<{ success: boolean; data: DailySubmitResult }> {
    return fetchApi('/api/daily-challenge/submit', { method: 'POST', body: JSON.stringify({ selectedIndex }) });
}

export async function getDailyHistory(limit = 30): Promise<{ success: boolean; data: DailyHistory }> {
    return fetchApi(`/api/daily-challenge/history?limit=${limit}`);
}
