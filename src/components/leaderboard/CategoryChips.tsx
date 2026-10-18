'use client';

import React from 'react';
import { CHALLENGE_CATEGORIES, type ChallengeCategory } from '@/types/gamification';

interface CategoryChipsProps {
    value: ChallengeCategory | null;
    onChange: (category: ChallengeCategory | null) => void;
}

const label = (c: string) => c.charAt(0).toUpperCase() + c.slice(1);

export default function CategoryChips({ value, onChange }: CategoryChipsProps) {
    const chip = (selected: boolean) =>
        `px-3 py-1.5 rounded-full text-xs font-medium border transition-colors ${selected ? 'bg-orange-500/20 border-orange-500/50 text-orange-300' : 'bg-white/5 border-white/10 text-gray-400 hover:text-white'}`;

    return (
        <div role="group" aria-label="Challenge category" className="flex flex-wrap gap-2">
            <button type="button" aria-pressed={value === null} onClick={() => onChange(null)} className={chip(value === null)}>
                All categories
            </button>
            {CHALLENGE_CATEGORIES.map((c) => (
                <button key={c} type="button" aria-pressed={value === c} onClick={() => onChange(c)} className={chip(value === c)}>
                    {label(c)}
                </button>
            ))}
        </div>
    );
}
