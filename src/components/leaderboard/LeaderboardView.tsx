'use client';

import React from 'react';
import Link from 'next/link';
import { Loader2, Trophy } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { useLeaderboard } from '@/hooks/queries/useLeaderboard';
import { Skeleton } from '@/components/ui/skeleton';
import { EmptyState } from '@/components/ui/EmptyState';
import type { ChallengeCategory, LeaderboardPeriod } from '@/types/gamification';
import PeriodTabs from './PeriodTabs';
import CategoryChips from './CategoryChips';
import MyRankBar from './MyRankBar';
import LeaderboardTable from './LeaderboardTable';
import Podium from './Podium';

interface LeaderboardViewProps {
    period: LeaderboardPeriod;
    onPeriodChange: (period: LeaderboardPeriod) => void;
    category: ChallengeCategory | null;
    onCategoryChange: (category: ChallengeCategory | null) => void;
    /** Rows per request */
    limit?: number;
    /** Show the first three as a podium above the table */
    podium?: boolean;
    /** Keep a hidden tab from fetching */
    enabled?: boolean;
}

/**
 * The leaderboard as every page shows it: filters, your own rank, the table, load more, and
 * proper loading, error and empty states. State for period and category lives with the caller,
 * so a page can put them in the URL.
 */
export default function LeaderboardView({
    period,
    onPeriodChange,
    category,
    onCategoryChange,
    limit = 25,
    podium = false,
    enabled = true,
}: LeaderboardViewProps) {
    const { user } = useAuth();
    const board = useLeaderboard({ period, category, limit }, { enabled });
    const { entries, me, isLoading, isError, refetch, hasNextPage, isFetchingNextPage, fetchNextPage, isFetchNextPageError } = board;

    const showPodium = podium && entries.length >= 3;
    const tableEntries = showPodium ? entries.slice(3) : entries;

    return (
        <section aria-label="Leaderboard" className="space-y-5">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <PeriodTabs value={period} onChange={onPeriodChange} />
            </div>
            <CategoryChips value={category} onChange={onCategoryChange} />

            <MyRankBar me={me} signedIn={!!user} period={period} />

            <div aria-live="polite" aria-busy={isLoading}>
                {isLoading ? (
                    <div className="space-y-2" role="status" aria-label="Loading leaderboard">
                        {Array.from({ length: 10 }).map((_, i) => (
                            <Skeleton key={i} className="h-14 w-full rounded-xl" />
                        ))}
                    </div>
                ) : isError && entries.length === 0 ? (
                    <div role="alert" className="rounded-2xl border border-red-500/20 bg-red-500/5 p-8 text-center">
                        <p className="text-gray-300 mb-4">The leaderboard could not be loaded.</p>
                        <button onClick={() => refetch()} className="px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white rounded-lg text-sm font-medium transition-colors">
                            Try again
                        </button>
                    </div>
                ) : entries.length === 0 ? (
                    period === 'all' && !category ? (
                        <EmptyState
                            icon={Trophy}
                            title="No one is on the board yet"
                            description="Solve a challenge and be the first."
                            actionLabel="View challenges"
                            actionHref="/challenges"
                        />
                    ) : (
                        <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-10 text-center">
                            <Trophy className="w-10 h-10 text-gray-600 mx-auto mb-3" aria-hidden="true" />
                            <p className="text-white font-medium mb-1">
                                No points {period === 'weekly' ? 'this week' : period === 'monthly' ? 'this month' : 'in this category'} yet.
                            </p>
                            <p className="text-sm text-gray-400 mb-4">Be the first on the board, or look at all time.</p>
                            <div className="flex justify-center gap-4 text-sm">
                                <Link href="/challenges" className="text-orange-400 hover:text-orange-300 font-medium">Solve a challenge</Link>
                                {(period !== 'all' || category) && (
                                    <button type="button" onClick={() => { onPeriodChange('all'); onCategoryChange(null); }} className="text-gray-300 hover:text-white">
                                        Show all time
                                    </button>
                                )}
                            </div>
                        </div>
                    )
                ) : (
                    <>
                        {showPodium && <Podium entries={entries.slice(0, 3)} />}
                        {tableEntries.length > 0 && (
                            <LeaderboardTable
                                entries={tableEntries}
                                currentUsername={user?.username}
                                caption={`Leaderboard, ${period === 'all' ? 'all time' : period}${category ? `, ${category}` : ''}`}
                            />
                        )}
                        {(hasNextPage || isFetchNextPageError) && (
                            <div className="mt-4 flex flex-col items-center gap-2">
                                {isFetchNextPageError && <p role="alert" className="text-sm text-red-400">Could not load more.</p>}
                                <button
                                    type="button"
                                    onClick={() => fetchNextPage()}
                                    disabled={isFetchingNextPage}
                                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl border border-white/10 bg-white/5 text-sm font-medium text-white hover:bg-white/10 disabled:opacity-60 transition-colors"
                                >
                                    {isFetchingNextPage && <Loader2 className="w-4 h-4 animate-spin" aria-hidden="true" />}
                                    {isFetchNextPageError ? 'Try again' : 'Load more'}
                                </button>
                            </div>
                        )}
                    </>
                )}
            </div>
        </section>
    );
}
