'use client';

import React, { useMemo } from 'react';
import { Flame, Trophy, Calendar, Zap, Loader2, CheckCircle } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { useToast } from '@/context/ToastContext';
import { useStreak, useCheckin } from '@/hooks/queries/useStreak';
import type { ActivityEntry, StreakStatus } from '@/types/gamification';

const HEAT_COLORS = [
    'bg-white/[0.03]', // no activity
    'bg-orange-500/20', // light
    'bg-orange-500/50', // medium
    'bg-orange-500', // heavy
];

const WEEKS = 12;

/** Activity per UTC day for the last 12 weeks, oldest first (the server keys days in UTC). */
export function buildHeatmap(activityLog: ActivityEntry[], now: Date = new Date()) {
    const byDay = new Map<string, number>();
    for (const e of activityLog) byDay.set(e.date, e.actions.length);

    const days: { date: string; level: number; count: number }[] = [];
    for (let i = WEEKS * 7 - 1; i >= 0; i--) {
        const d = new Date(now);
        d.setUTCDate(d.getUTCDate() - i);
        const date = d.toISOString().slice(0, 10);
        const count = byDay.get(date) ?? 0;
        const level = count === 0 ? 0 : count === 1 ? 1 : count <= 3 ? 2 : 3;
        days.push({ date, level, count });
    }
    return days;
}

/** One line that says what the streak needs from the user right now. */
export function streakMessage(status: StreakStatus, checkedInToday: boolean, endsAt: string | null): string {
    if (checkedInToday) return "You're checked in for today.";
    switch (status) {
        case 'at_risk': {
            const when = endsAt
                ? new Date(endsAt).toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' })
                : null;
            return when ? `Check in before ${when} to keep your streak alive.` : 'Check in today to keep your streak alive.';
        }
        case 'broken':
            return 'Your streak ended. Check in to start a new one.';
        case 'active':
            return 'Keep your streak alive!';
        default:
            return 'Check in to start your streak.';
    }
}

export default function StreakWidget() {
    const { user } = useAuth();
    const { addToast } = useToast();
    const { data: streak, isLoading, isError, refetch } = useStreak();
    const checkin = useCheckin();

    const heatmap = useMemo(() => buildHeatmap(streak?.activityLog ?? []), [streak?.activityLog]);

    if (!user) return null;

    if (isLoading) {
        return (
            <div
                role="status"
                aria-label="Loading streak"
                className="bg-white/[0.02] border border-white/10 rounded-2xl p-6 flex items-center justify-center h-48"
            >
                <Loader2 className="w-6 h-6 animate-spin text-orange-500" aria-hidden="true" />
            </div>
        );
    }

    if (isError || !streak) {
        return (
            <div role="alert" className="bg-white/[0.02] border border-white/10 rounded-2xl p-6 text-center">
                <p className="text-sm text-gray-400 mb-3">Your streak could not be loaded.</p>
                <button
                    onClick={() => refetch()}
                    className="px-3 py-1.5 bg-orange-500 hover:bg-orange-600 text-white rounded-lg text-sm font-medium transition-colors"
                >
                    Try again
                </button>
            </div>
        );
    }

    const handleCheckIn = () => {
        if (checkin.isPending || streak.checkedInToday) return;
        checkin.mutate(undefined, {
            onSuccess: (res) => {
                for (const b of res.data.newBadges ?? []) {
                    addToast({ variant: 'success', title: 'Badge unlocked', message: `${b.name}: ${b.description}` });
                }
            },
        });
    };

    const { checkedInToday, currentStreak, longestStreak, totalActiveDays, status, streakEndsAt } = streak;
    const xp = checkin.data?.data.xpAwarded ?? 0;

    return (
        <div className="bg-white/[0.02] border border-white/10 rounded-2xl p-6 relative overflow-hidden">
            <div className="flex items-center justify-between mb-5 gap-3">
                <div className="flex items-center gap-3 min-w-0">
                    <div
                        className={`w-10 h-10 shrink-0 rounded-xl flex items-center justify-center ${
                            currentStreak > 0 ? 'bg-gradient-to-br from-orange-500 to-red-500' : 'bg-white/5'
                        }`}
                    >
                        <Flame className={`w-5 h-5 ${currentStreak > 0 ? 'text-white' : 'text-gray-500'}`} aria-hidden="true" />
                    </div>
                    <div className="min-w-0">
                        <h3 className="text-white font-semibold text-sm">Daily Streak</h3>
                        <p role="status" aria-live="polite" className="text-gray-500 text-xs">
                            {streakMessage(status, checkedInToday, streakEndsAt)}
                        </p>
                    </div>
                </div>

                <button
                    onClick={handleCheckIn}
                    disabled={checkedInToday || checkin.isPending}
                    className={`shrink-0 px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 ${
                        checkedInToday
                            ? 'bg-green-500/10 text-green-400 border border-green-500/20 cursor-default'
                            : 'bg-orange-500 hover:bg-orange-600 text-white shadow-lg shadow-orange-500/20 hover:shadow-orange-500/40'
                    }`}
                >
                    {checkin.isPending ? (
                        <Loader2 className="w-4 h-4 animate-spin" aria-label="Checking in" />
                    ) : checkedInToday ? (
                        <span className="flex items-center gap-1.5">
                            <CheckCircle className="w-4 h-4" aria-hidden="true" /> Done
                        </span>
                    ) : (
                        'Check In'
                    )}
                </button>
            </div>

            {checkin.isError && (
                <p role="alert" className="text-xs text-red-400 mb-3">
                    {checkin.error instanceof Error ? checkin.error.message : 'Check-in failed. Try again.'}
                </p>
            )}
            {xp > 0 && checkedInToday && <p className="text-xs text-orange-400 mb-3">+{xp} XP for checking in</p>}

            <div className="grid grid-cols-3 gap-3 mb-5">
                <div className="bg-white/[0.03] rounded-xl p-3 text-center">
                    <div className="text-2xl font-bold text-orange-400">{currentStreak}</div>
                    <div className="text-xs text-gray-500 mt-0.5">Current</div>
                </div>
                <div className="bg-white/[0.03] rounded-xl p-3 text-center">
                    <div className="flex items-center justify-center gap-1">
                        <Trophy className="w-4 h-4 text-yellow-500" aria-hidden="true" />
                        <span className="text-2xl font-bold text-white">{longestStreak}</span>
                    </div>
                    <div className="text-xs text-gray-500 mt-0.5">Best</div>
                </div>
                <div className="bg-white/[0.03] rounded-xl p-3 text-center">
                    <div className="flex items-center justify-center gap-1">
                        <Zap className="w-4 h-4 text-blue-400" aria-hidden="true" />
                        <span className="text-2xl font-bold text-white">{totalActiveDays}</span>
                    </div>
                    <div className="text-xs text-gray-500 mt-0.5">Total Days</div>
                </div>
            </div>

            <div>
                <div className="flex items-center gap-2 mb-2">
                    <Calendar className="w-3.5 h-3.5 text-gray-500" aria-hidden="true" />
                    <span className="text-xs text-gray-500">Last 12 weeks</span>
                </div>
                <div className="grid grid-cols-12 gap-1" role="img" aria-label={`Activity on ${heatmap.filter((d) => d.level > 0).length} of the last ${WEEKS * 7} days`}>
                    {Array.from({ length: WEEKS }, (_, weekIdx) => (
                        <div key={weekIdx} className="flex flex-col gap-1">
                            {Array.from({ length: 7 }, (_, dayIdx) => {
                                const day = heatmap[weekIdx * 7 + dayIdx];
                                if (!day) return <div key={dayIdx} className="w-full aspect-square" />;
                                return (
                                    <div
                                        key={dayIdx}
                                        className={`w-full aspect-square rounded-sm ${HEAT_COLORS[day.level]} transition-colors`}
                                        title={`${day.date}: ${day.count > 0 ? `${day.count} action${day.count > 1 ? 's' : ''}` : 'No activity'}`}
                                    />
                                );
                            })}
                        </div>
                    ))}
                </div>
                <div className="flex items-center gap-1.5 mt-2 justify-end" aria-hidden="true">
                    <span className="text-[10px] text-gray-600">Less</span>
                    {HEAT_COLORS.map((c, i) => (
                        <div key={i} className={`w-2.5 h-2.5 rounded-sm ${c}`} />
                    ))}
                    <span className="text-[10px] text-gray-600">More</span>
                </div>
            </div>
        </div>
    );
}
