'use client';

import React from 'react';
import Link from 'next/link';
import { Award } from 'lucide-react';
import { useUserBadges } from '@/hooks/queries/useBadges';
import { Skeleton } from '@/components/ui/skeleton';
import BadgeCard from './BadgeCard';

interface AchievementsPanelProps {
    username: string | undefined;
    /** How many earned badges to show; the rest are behind the "all badges" link */
    limit?: number;
    /** Also show the badges closest to unlocking (own profile and dashboard) */
    showProgress?: boolean;
    /** Wording for the empty state */
    emptyText?: string;
}

/** Earned badges for one user, reading the same endpoint everywhere (profile, public profile, dashboard). */
export default function AchievementsPanel({ username, limit = 8, showProgress = false, emptyText = 'No badges yet.' }: AchievementsPanelProps) {
    const { data, isLoading, isError, refetch } = useUserBadges(username);

    if (isLoading) {
        return (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3" role="status" aria-label="Loading achievements">
                {Array.from({ length: 4 }).map((_, i) => <Skeleton key={i} className="h-16 rounded-xl" />)}
            </div>
        );
    }

    if (isError || !data) {
        return (
            <div role="alert" className="text-center py-6">
                <p className="text-sm text-gray-400 mb-3">Achievements could not be loaded.</p>
                <button onClick={() => refetch()} className="px-3 py-1.5 bg-orange-500 hover:bg-orange-600 text-white rounded-lg text-sm font-medium transition-colors">
                    Try again
                </button>
            </div>
        );
    }

    const shown = data.earned.slice(0, limit);
    const hidden = data.earned.length - shown.length;
    const next = showProgress ? data.progress.slice(0, 2) : [];

    return (
        <div className="space-y-4">
            {shown.length === 0 ? (
                <div className="text-center py-6">
                    <Award className="w-10 h-10 text-gray-600 mx-auto mb-2" aria-hidden="true" />
                    <p className="text-gray-400 text-sm">{emptyText}</p>
                </div>
            ) : (
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 list-none p-0">
                    {shown.map((b) => (
                        <BadgeCard key={b.code} compact badge={{ ...b, earned: true }} />
                    ))}
                </ul>
            )}

            {next.length > 0 && (
                <div>
                    <h4 className="text-xs font-medium uppercase tracking-wider text-gray-500 mb-2">Next up</h4>
                    <ul className="space-y-2 list-none p-0">
                        {next.map((p) => (
                            <li key={p.code} className="flex items-center justify-between gap-3 text-sm">
                                <span className="text-gray-300 truncate">{p.name}</span>
                                <span className="text-xs text-gray-500 shrink-0">{p.current} / {p.threshold}</span>
                            </li>
                        ))}
                    </ul>
                </div>
            )}

            <div className="text-right">
                <Link href="/badges" className="text-sm text-orange-400 hover:text-orange-300">
                    {hidden > 0 ? `${hidden} more · ` : ''}All badges
                </Link>
            </div>
        </div>
    );
}
