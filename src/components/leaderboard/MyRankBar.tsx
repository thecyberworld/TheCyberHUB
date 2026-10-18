'use client';

import React from 'react';
import Link from 'next/link';
import { Trophy } from 'lucide-react';
import type { LeaderboardMe, LeaderboardPeriod } from '@/types/gamification';

interface MyRankBarProps {
    me: LeaderboardMe | null;
    signedIn: boolean;
    period: LeaderboardPeriod;
}

const periodWord: Record<LeaderboardPeriod, string> = { all: 'overall', monthly: 'this month', weekly: 'this week' };

/** The viewer's own place, shown even when they are not on the loaded page. */
export default function MyRankBar({ me, signedIn, period }: MyRankBarProps) {
    if (!signedIn) {
        return (
            <div className="flex items-center justify-between gap-3 rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-gray-300">
                <span>Sign in to see where you stand.</span>
                <Link href="/auth?redirect=/leaderboard" className="text-orange-400 hover:text-orange-300 font-medium">
                    Sign in
                </Link>
            </div>
        );
    }

    if (!me || me.rank === null) {
        return (
            <div className="flex items-center justify-between gap-3 rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-gray-300">
                <span>You have no points {periodWord[period]} yet.</span>
                <Link href="/challenges" className="text-orange-400 hover:text-orange-300 font-medium">
                    Solve a challenge
                </Link>
            </div>
        );
    }

    return (
        <div role="status" className="flex flex-wrap items-center gap-x-4 gap-y-1 rounded-xl border border-orange-500/20 bg-orange-500/10 px-4 py-3">
            <Trophy className="w-5 h-5 text-orange-400" aria-hidden="true" />
            <span className="text-white font-medium">Your rank: #{me.rank}</span>
            <span className="text-gray-300 text-sm">{me.points} pts</span>
            <span className="text-gray-400 text-sm">{me.solves} solves</span>
            {me.visible === false && (
                <span className="text-xs text-gray-400">Only you can see this: your profile is private or hidden from the boards.</span>
            )}
        </div>
    );
}
