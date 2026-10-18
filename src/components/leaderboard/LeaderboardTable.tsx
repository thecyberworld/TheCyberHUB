'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowDown, ArrowUp, Minus } from 'lucide-react';
import type { LeaderboardEntry } from '@/types/gamification';

interface LeaderboardTableProps {
    entries: LeaderboardEntry[];
    /** Highlighted row */
    currentUsername?: string | null;
    caption?: string;
}

function RankChange({ delta }: { delta: number | null }) {
    if (delta === null || delta === undefined) return null;
    if (delta === 0) return <Minus className="w-3 h-3 text-gray-500" aria-label="Rank unchanged" />;
    const up = delta > 0;
    const Icon = up ? ArrowUp : ArrowDown;
    return (
        <span className={`inline-flex items-center text-xs ${up ? 'text-green-400' : 'text-red-400'}`}>
            <Icon className="w-3 h-3" aria-hidden="true" />
            <span className="sr-only">{up ? 'Up' : 'Down'} </span>
            {Math.abs(delta)}
        </span>
    );
}

function Avatar({ entry }: { entry: LeaderboardEntry }) {
    return (
        <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-xs font-bold text-gray-300 shrink-0 overflow-hidden">
            {entry.avatar ? (
                <Image src={entry.avatar} alt="" width={32} height={32} className="w-full h-full object-cover" unoptimized />
            ) : (
                entry.username.charAt(0).toUpperCase()
            )}
        </div>
    );
}

const rankStyle = (rank: number) =>
    rank === 1 ? 'bg-yellow-500/20 text-yellow-400'
        : rank === 2 ? 'bg-gray-400/20 text-gray-300'
            : rank === 3 ? 'bg-orange-600/20 text-orange-400'
                : 'bg-white/5 text-gray-500';

export default function LeaderboardTable({ entries, currentUsername, caption = 'Leaderboard' }: LeaderboardTableProps) {
    return (
        <div className="overflow-x-auto rounded-2xl border border-white/10 bg-white/[0.02]">
            <table className="w-full text-left">
                <caption className="sr-only">{caption}</caption>
                <thead>
                    <tr className="border-b border-white/10 text-xs font-semibold uppercase tracking-wider text-gray-500">
                        <th scope="col" className="px-4 py-3 w-16">Rank</th>
                        <th scope="col" className="px-4 py-3">Player</th>
                        <th scope="col" className="px-4 py-3 text-right hidden sm:table-cell">Solves</th>
                        <th scope="col" className="px-4 py-3 text-right">Points</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                    {entries.map((entry) => {
                        const isMe = !!currentUsername && entry.username === currentUsername;
                        return (
                            <tr key={entry.userId} aria-current={isMe ? 'true' : undefined} className={`transition-colors hover:bg-white/[0.04] ${isMe ? 'bg-orange-500/10' : ''}`}>
                                <td className="px-4 py-3">
                                    <span className={`inline-flex w-8 h-8 items-center justify-center rounded-lg text-sm font-bold ${rankStyle(entry.rank)}`}>
                                        {entry.rank}
                                    </span>
                                </td>
                                <td className="px-4 py-3">
                                    <div className="flex items-center gap-3 min-w-0">
                                        <Avatar entry={entry} />
                                        <div className="min-w-0">
                                            <Link href={`/user/${entry.username}`} className="block truncate font-medium text-white hover:text-orange-400 transition-colors">
                                                {entry.name || entry.username}
                                            </Link>
                                            <p className="truncate text-xs text-gray-500">@{entry.username}</p>
                                        </div>
                                        <RankChange delta={entry.delta} />
                                    </div>
                                </td>
                                <td className="px-4 py-3 text-right text-gray-400 hidden sm:table-cell">{entry.solves}</td>
                                <td className="px-4 py-3 text-right font-semibold text-orange-400">{entry.points}</td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    );
}
