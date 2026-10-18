"use client"

import React, { Suspense, useCallback } from 'react';
import Link from 'next/link';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { Trophy, ArrowLeft } from 'lucide-react';
import Footer from '@/components/Footer';
import LeaderboardView from '@/components/leaderboard/LeaderboardView';
import { boardQuery, parseBoardParams } from '@/lib/leaderboardParams';
import type { ChallengeCategory, LeaderboardPeriod } from '@/types/gamification';

function CTFLeaderboardContent() {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const { period, category } = parseBoardParams(searchParams);

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

export default function CTFLeaderboardPage() {
    return (
        <div className="min-h-screen bg-black">
            <section className="relative pt-32 pb-12 px-4 sm:px-6">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-orange-500/10 rounded-full blur-[120px] pointer-events-none" />
                <div className="relative max-w-4xl mx-auto">
                    <Link href="/ctf" className="inline-flex items-center gap-2 text-gray-400 hover:text-white mb-8 transition-colors">
                        <ArrowLeft className="w-4 h-4" aria-hidden="true" /> Back to Challenges
                    </Link>

                    <div className="text-center mb-10">
                        <div className="inline-flex items-center gap-2 px-4 py-2 mb-6 rounded-full border border-yellow-500/20 bg-yellow-500/10">
                            <Trophy className="w-4 h-4 text-yellow-500" aria-hidden="true" />
                            <span className="text-sm text-yellow-400 font-medium">CTF Leaderboard</span>
                        </div>
                        <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4">
                            Top <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-500">Hackers</span>
                        </h1>
                        <p className="text-gray-400 max-w-lg mx-auto">
                            The best cybersecurity minds competing on TheCyberHub CTF challenges. Same rankings as the main leaderboard.
                        </p>
                    </div>

                    <Suspense fallback={null}>
                        <CTFLeaderboardContent />
                    </Suspense>
                </div>
            </section>

            <Footer />
        </div>
    );
}
