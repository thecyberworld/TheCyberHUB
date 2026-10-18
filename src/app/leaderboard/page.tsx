"use client"

import React, { Suspense, useCallback } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { Trophy } from 'lucide-react';
import Footer from '@/components/Footer';
import Navbar from '@/components/Navbar';
import LeaderboardView from '@/components/leaderboard/LeaderboardView';
import { boardQuery, parseBoardParams } from '@/lib/leaderboardParams';
import type { ChallengeCategory, LeaderboardPeriod } from '@/types/gamification';

function LeaderboardContent() {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const { period, category } = parseBoardParams(searchParams);

    // Period and category live in the URL so a board can be linked to
    const update = useCallback((next: { period?: LeaderboardPeriod; category?: ChallengeCategory | null }) => {
        const qs = boardQuery(searchParams, next);
        router.replace(qs ? `${pathname}?${qs}` : pathname, { scroll: false });
    }, [router, pathname, searchParams]);

    return (
        <LeaderboardView
            period={period}
            onPeriodChange={(p) => update({ period: p })}
            category={category}
            onCategoryChange={(c) => update({ category: c })}
            podium
        />
    );
}

export default function LeaderboardPage() {
    return (
        <div className="min-h-screen bg-black flex flex-col">
            <Navbar />

            <main className="flex-grow pt-32 pb-16 px-4 sm:px-6">
                <div className="max-w-4xl mx-auto">
                    <div className="text-center mb-10 relative z-10">
                        <div className="inline-flex items-center gap-2 px-4 py-2 mb-6 rounded-full border border-white/10 bg-white/5">
                            <Trophy className="w-4 h-4 text-orange-500" aria-hidden="true" />
                            <span className="text-sm text-gray-400 font-medium tracking-wide">Global Rankings</span>
                        </div>
                        <h1 className="text-4xl sm:text-6xl font-extrabold text-white mb-4 tracking-tight">
                            Hall of <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-yellow-500">Fame</span>
                        </h1>
                        <p className="text-gray-400 text-lg max-w-xl mx-auto">
                            The top players on TheCyberHub. Solve challenges and the daily question to climb.
                        </p>
                    </div>

                    <Suspense fallback={null}>
                        <LeaderboardContent />
                    </Suspense>
                </div>
            </main>

            <Footer />
        </div>
    );
}
