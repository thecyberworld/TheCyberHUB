'use client';

import React from 'react';
import { LEADERBOARD_PERIODS, type LeaderboardPeriod } from '@/types/gamification';

interface PeriodTabsProps {
    value: LeaderboardPeriod;
    onChange: (period: LeaderboardPeriod) => void;
}

export default function PeriodTabs({ value, onChange }: PeriodTabsProps) {
    return (
        <div role="tablist" aria-label="Leaderboard period" className="inline-flex rounded-xl border border-white/10 bg-white/5 p-1">
            {LEADERBOARD_PERIODS.map((p) => {
                const selected = p.value === value;
                return (
                    <button
                        key={p.value}
                        role="tab"
                        type="button"
                        aria-selected={selected}
                        onClick={() => onChange(p.value)}
                        className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${selected ? 'bg-orange-500 text-white' : 'text-gray-400 hover:text-white'}`}
                    >
                        {p.label}
                    </button>
                );
            })}
        </div>
    );
}
