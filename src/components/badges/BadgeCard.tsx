import React from 'react';
import { Lock } from 'lucide-react';
import type { BadgeProgress, BadgeRarity } from '@/types/gamification';
import BadgeIcon from './BadgeIcon';

export interface BadgeCardData {
    code: string;
    name: string;
    description: string;
    icon: string;
    color: string;
    rarity: BadgeRarity;
    points?: number;
    earned?: boolean;
    earnedAt?: string | null;
    progress?: BadgeProgress | null;
    earnedBy?: number;
}

export const RARITY_STYLES: Record<BadgeRarity, { label: string; ring: string; text: string }> = {
    common: { label: 'Common', ring: 'border-gray-500/30', text: 'text-gray-400' },
    uncommon: { label: 'Uncommon', ring: 'border-green-500/30', text: 'text-green-400' },
    rare: { label: 'Rare', ring: 'border-blue-500/40', text: 'text-blue-400' },
    epic: { label: 'Epic', ring: 'border-purple-500/40', text: 'text-purple-400' },
    legendary: { label: 'Legendary', ring: 'border-yellow-500/50', text: 'text-yellow-400' },
};

interface BadgeCardProps {
    badge: BadgeCardData;
    highlighted?: boolean;
    compact?: boolean;
}

export default function BadgeCard({ badge, highlighted = false, compact = false }: BadgeCardProps) {
    const locked = badge.earned === false;
    const rarity = RARITY_STYLES[badge.rarity] ?? RARITY_STYLES.common;
    const progress = locked ? badge.progress : null;

    return (
        <li
            id={`badge-${badge.code}`}
            data-testid={`badge-${badge.code}`}
            className={`relative flex ${compact ? 'items-center gap-3 p-3' : 'flex-col items-center gap-2 p-4 text-center'} rounded-xl border bg-white/[0.03] transition-colors ${rarity.ring} ${locked ? 'opacity-70' : ''} ${highlighted ? 'ring-2 ring-orange-500' : ''}`}
        >
            <div
                className={`${compact ? 'w-10 h-10' : 'w-14 h-14'} shrink-0 rounded-full bg-black/40 flex items-center justify-center relative`}
            >
                <BadgeIcon
                    icon={badge.icon}
                    className={compact ? 'w-5 h-5' : 'w-7 h-7'}
                    style={{ color: locked ? '#6b7280' : badge.color }}
                />
                {locked && <Lock className="w-3.5 h-3.5 text-gray-400 absolute -bottom-0.5 -right-0.5 bg-black rounded-full p-0.5" aria-hidden="true" />}
            </div>

            <div className={compact ? 'min-w-0' : ''}>
                <h3 className={`font-semibold ${locked ? 'text-gray-400' : 'text-white'} ${compact ? 'text-sm truncate' : ''}`}>
                    {badge.name}
                    {locked && <span className="sr-only"> (locked)</span>}
                </h3>
                <p className={`text-xs text-gray-400 ${compact ? 'truncate' : 'mt-0.5'}`}>{badge.description}</p>
                {!compact && (
                    <p className="mt-1 text-xs">
                        <span className={rarity.text}>{rarity.label}</span>
                        {!!badge.points && <span className="text-gray-500"> · +{badge.points} pts</span>}
                    </p>
                )}
                {progress && (
                    <div className="mt-2 w-full">
                        <div
                            role="progressbar"
                            aria-label={`${badge.name} progress`}
                            aria-valuemin={0}
                            aria-valuemax={progress.threshold}
                            aria-valuenow={Math.min(progress.current, progress.threshold)}
                            className="h-1.5 rounded-full bg-white/10 overflow-hidden"
                        >
                            <div className="h-full bg-orange-500" style={{ width: `${progress.percentage}%` }} />
                        </div>
                        <p className="mt-1 text-[11px] text-gray-500">{progress.current} / {progress.threshold}</p>
                    </div>
                )}
                {badge.earned && badge.earnedAt && (
                    <p className="mt-1 text-[11px] text-gray-500">Earned {new Date(badge.earnedAt).toLocaleDateString()}</p>
                )}
                {!compact && typeof badge.earnedBy === 'number' && (
                    <p className="mt-1 text-[11px] text-gray-600">{badge.earnedBy} {badge.earnedBy === 1 ? 'member has' : 'members have'} this</p>
                )}
            </div>
        </li>
    );
}
