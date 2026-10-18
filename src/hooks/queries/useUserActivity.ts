import { useQuery } from '@tanstack/react-query';
import { fetchApi } from '@/lib/api';

export interface ActivityDay { date: string; points: number; count: number }
export interface UserActivity { since: string; days: ActivityDay[]; activeDays: number; totalPoints: number }

/** Points earned per day over the last 12 months, from `GET /api/users/:username/activity` */
export function useUserActivity(username: string | undefined) {
    return useQuery<UserActivity, Error>({
        queryKey: ['users', 'activity', username],
        queryFn: async () => (await fetchApi(`/api/users/${encodeURIComponent(username as string)}/activity`)).data,
        enabled: !!username,
        staleTime: 5 * 60_000,
    });
}

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

/** The last `months` calendar months (UTC), oldest first, with the points earned in each */
export function pointsByMonth(days: ActivityDay[], months = 6, now = new Date()): { name: string; points: number }[] {
    const out: { key: string; name: string; points: number }[] = [];
    for (let i = months - 1; i >= 0; i--) {
        const d = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth() - i, 1));
        out.push({ key: `${d.getUTCFullYear()}-${String(d.getUTCMonth() + 1).padStart(2, '0')}`, name: MONTHS[d.getUTCMonth()], points: 0 });
    }
    for (const day of days) {
        const bucket = out.find((m) => day.date.startsWith(m.key));
        if (bucket) bucket.points += day.points;
    }
    return out.map(({ name, points }) => ({ name, points }));
}
