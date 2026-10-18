import React from 'react';
import { Award, Brain, Coins, Crown, Flag, Flame, Gem, Globe, Key, MessageSquare, PenLine, Puzzle, Skull, Star, Sword, Target, ThumbsUp, Trophy, Zap } from 'lucide-react';

const ICONS: Record<string, React.ElementType> = {
    flag: Flag,
    puzzle: Puzzle,
    target: Target,
    skull: Skull,
    sword: Sword,
    globe: Globe,
    key: Key,
    star: Star,
    coins: Coins,
    gem: Gem,
    zap: Zap,
    brain: Brain,
    flame: Flame,
    crown: Crown,
    'message-square': MessageSquare,
    'pen-line': PenLine,
    'thumbs-up': ThumbsUp,
    trophy: Trophy,
};

export default function BadgeIcon({ icon, className, style }: { icon: string; className?: string; style?: React.CSSProperties }) {
    const Icon = ICONS[icon] ?? Award;
    return <Icon className={className} style={style} aria-hidden="true" />;
}
