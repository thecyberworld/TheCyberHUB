"use client"

import React, { Suspense, useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { Award } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Skeleton } from '@/components/ui/skeleton';
import BadgeCard from '@/components/badges/BadgeCard';
import { useAuth } from '@/context/AuthContext';
import { useBadgeCatalog } from '@/hooks/queries/useBadges';
import type { CatalogBadge } from '@/types/gamification';

type Filter = 'all' | 'earned' | 'locked';

const CATEGORY_LABELS: Record<string, string> = {
    challenges: 'Challenges',
    streak: 'Streaks',
    community: 'Community',
    events: 'Events',
    mentorship: 'Mentorship',
    special: 'Special',
};

function BadgesContent() {
    const { user } = useAuth();
    const searchParams = useSearchParams();
    const highlight = searchParams.get('code');
    const { data: badges, isLoading, isError, refetch } = useBadgeCatalog();
    const [filter, setFilter] = useState<Filter>('all');

    // A badge notification links here with ?code=: bring that card into view
    useEffect(() => {
        if (!highlight || !badges) return;
        document.getElementById(`badge-${highlight}`)?.scrollIntoView({ block: 'center' });
    }, [highlight, badges]);

    const earnedCount = badges?.filter((b) => b.earned).length ?? 0;

    const groups = useMemo(() => {
        const visible = (badges ?? []).filter((b) => filter === 'all' || (filter === 'earned' ? b.earned : !b.earned));
        const byCategory = new Map<string, CatalogBadge[]>();
        for (const b of visible) byCategory.set(b.category, [...(byCategory.get(b.category) ?? []), b]);
        return Array.from(byCategory.entries());
    }, [badges, filter]);

    if (isLoading) {
        return (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3" role="status" aria-label="Loading badges">
                {Array.from({ length: 8 }).map((_, i) => <Skeleton key={i} className="h-40 rounded-xl" />)}
            </div>
        );
    }

    if (isError || !badges) {
        return (
            <div role="alert" className="rounded-2xl border border-red-500/20 bg-red-500/5 p-8 text-center">
                <p className="text-gray-300 mb-4">Badges could not be loaded.</p>
                <button onClick={() => refetch()} className="px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white rounded-lg text-sm font-medium transition-colors">
                    Try again
                </button>
            </div>
        );
    }

    return (
        <div className="space-y-8">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                {user ? (
                    <p className="text-gray-300"><span className="text-white font-semibold">{earnedCount}</span> of {badges.length} earned</p>
                ) : (
                    <p className="text-gray-300">
                        <Link href="/auth?redirect=/badges" className="text-orange-400 hover:text-orange-300 font-medium">Sign in</Link> to track your progress.
                    </p>
                )}
                {user && (
                    <div role="group" aria-label="Show badges" className="inline-flex rounded-xl border border-white/10 bg-white/5 p-1">
                        {(['all', 'earned', 'locked'] as Filter[]).map((f) => (
                            <button
                                key={f}
                                type="button"
                                aria-pressed={filter === f}
                                onClick={() => setFilter(f)}
                                className={`px-4 py-1.5 rounded-lg text-sm font-medium capitalize transition-colors ${filter === f ? 'bg-orange-500 text-white' : 'text-gray-400 hover:text-white'}`}
                            >
                                {f}
                            </button>
                        ))}
                    </div>
                )}
            </div>

            {groups.length === 0 ? (
                <p className="text-center text-gray-400 py-10">
                    {filter === 'earned' ? 'No badges earned yet. Solve a challenge to get your first.' : 'Nothing to show.'}
                </p>
            ) : (
                groups.map(([category, items]) => (
                    <section key={category} aria-labelledby={`cat-${category}`}>
                        <h2 id={`cat-${category}`} className="text-lg font-semibold text-white mb-3">{CATEGORY_LABELS[category] ?? category}</h2>
                        <ul className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 list-none p-0">
                            {items.map((b) => (
                                <BadgeCard key={b.code} badge={b} highlighted={b.code === highlight} />
                            ))}
                        </ul>
                    </section>
                ))
            )}
        </div>
    );
}

export default function BadgesPage() {
    return (
        <div className="min-h-screen bg-black flex flex-col">
            <Navbar />
            <main className="flex-grow pt-32 pb-16 px-4 sm:px-6">
                <div className="max-w-5xl mx-auto">
                    <div className="text-center mb-10">
                        <div className="inline-flex items-center gap-2 px-4 py-2 mb-6 rounded-full border border-white/10 bg-white/5">
                            <Award className="w-4 h-4 text-orange-500" aria-hidden="true" />
                            <span className="text-sm text-gray-400 font-medium tracking-wide">Achievements</span>
                        </div>
                        <h1 className="text-4xl sm:text-5xl font-extrabold text-white mb-3 tracking-tight">Badges</h1>
                        <p className="text-gray-400 max-w-xl mx-auto">
                            Earn badges by solving challenges, keeping a streak and helping the community.
                        </p>
                    </div>
                    <Suspense fallback={null}>
                        <BadgesContent />
                    </Suspense>
                </div>
            </main>
            <Footer />
        </div>
    );
}
