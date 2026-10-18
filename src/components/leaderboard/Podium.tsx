'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Crown, Medal } from 'lucide-react';
import type { LeaderboardEntry } from '@/types/gamification';

const STYLES = {
    1: { height: 'md:h-56 h-44', glow: 'from-amber-400 to-yellow-500', bg: 'bg-yellow-500/10 border-yellow-500/30', text: 'text-amber-400', icon: <Crown className="w-8 h-8 text-yellow-400" aria-hidden="true" /> },
    2: { height: 'md:h-44 h-36', glow: 'from-gray-300 to-gray-400', bg: 'bg-gray-400/10 border-gray-400/30', text: 'text-gray-300', icon: <Medal className="w-7 h-7 text-gray-400" aria-hidden="true" /> },
    3: { height: 'md:h-36 h-28', glow: 'from-orange-700 to-orange-800', bg: 'bg-orange-800/10 border-orange-800/30', text: 'text-orange-500', icon: <Medal className="w-6 h-6 text-orange-600" aria-hidden="true" /> },
} as const;

function Spot({ entry, position }: { entry: LeaderboardEntry; position: 1 | 2 | 3 }) {
    const s = STYLES[position];
    return (
        <li className="flex flex-col items-center justify-end w-1/3 sm:w-1/4 px-1">
            <div className="flex flex-col items-center">
                <div className="mb-2 relative">
                    <div className="absolute -top-6 left-1/2 -translate-x-1/2">{s.icon}</div>
                    <div className={`w-16 h-16 sm:w-20 sm:h-20 rounded-full border-2 ${s.bg} flex items-center justify-center bg-black/50 overflow-hidden relative z-10`}>
                        {entry.avatar ? (
                            <Image src={entry.avatar} alt="" width={80} height={80} className="w-full h-full object-cover" unoptimized />
                        ) : (
                            <span className={`text-xl sm:text-3xl font-bold ${s.text} uppercase`}>{entry.username.charAt(0)}</span>
                        )}
                    </div>
                </div>
                <div className="text-center mb-3">
                    <Link href={`/user/${entry.username}`} className="font-bold text-white hover:text-orange-400 transition-colors line-clamp-1 break-all px-2">
                        {entry.name || entry.username}
                    </Link>
                    <div className="text-xs sm:text-sm text-gray-400 font-medium">{entry.points} pts</div>
                </div>
            </div>
            <div className={`w-full ${s.height} bg-gradient-to-t ${s.glow} rounded-t-xl relative overflow-hidden border border-white/10`}>
                <div className="flex items-center justify-center h-full pt-4">
                    <span className="text-4xl sm:text-6xl font-black text-white/20" aria-label={`Rank ${position}`}>{position}</span>
                </div>
            </div>
        </li>
    );
}

export default function Podium({ entries }: { entries: LeaderboardEntry[] }) {
    const [first, second, third] = entries;
    return (
        <ol aria-label="Top three" className="flex justify-center items-end gap-2 sm:gap-4 mb-8 pt-8 px-2 sm:px-8 list-none">
            {second && <Spot entry={second} position={2} />}
            {first && <Spot entry={first} position={1} />}
            {third && <Spot entry={third} position={3} />}
        </ol>
    );
}
