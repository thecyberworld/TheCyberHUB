import React from 'react';
import {
    Award, Bell, Briefcase, Calendar, CheckCircle2, FileCheck2, FileX2, Flag, Heart,
    MessageSquare, Repeat2, ShieldAlert, ThumbsUp, Trophy, UserPlus, AtSign, Route, Reply,
} from 'lucide-react';

interface Meta { label: string; icon: React.ComponentType<{ className?: string }>; color: string }

/** Keyed by the types the API really creates; anything unknown falls back to `system` */
export const NOTIFICATION_META: Record<string, Meta> = {
    reply: { label: 'Replies', icon: Reply, color: 'text-green-400' },
    comment: { label: 'Comments', icon: MessageSquare, color: 'text-green-400' },
    mention: { label: 'Mentions', icon: AtSign, color: 'text-purple-400' },
    like: { label: 'Likes', icon: Heart, color: 'text-pink-400' },
    reshare: { label: 'Reshares', icon: Repeat2, color: 'text-blue-400' },
    follow: { label: 'Follows', icon: UserPlus, color: 'text-blue-400' },
    badge: { label: 'Badges', icon: Award, color: 'text-orange-400' },
    'challenge-solved': { label: 'Challenges', icon: Trophy, color: 'text-yellow-400' },
    'weekly-challenge': { label: 'Weekly challenge', icon: Flag, color: 'text-orange-400' },
    'event-reminder': { label: 'Events', icon: Calendar, color: 'text-blue-400' },
    'answer-accepted': { label: 'Accepted answers', icon: CheckCircle2, color: 'text-green-400' },
    'contribution-approved': { label: 'Contributions', icon: FileCheck2, color: 'text-green-400' },
    'contribution-rejected': { label: 'Contributions', icon: FileX2, color: 'text-red-400' },
    'path-completed': { label: 'Learning paths', icon: Route, color: 'text-yellow-400' },
    'job-match': { label: 'Job matches', icon: Briefcase, color: 'text-yellow-400' },
    'writeup-vote': { label: 'Writeup votes', icon: ThumbsUp, color: 'text-orange-400' },
    moderation: { label: 'Moderation', icon: ShieldAlert, color: 'text-red-400' },
    system: { label: 'System', icon: Bell, color: 'text-gray-400' },
};

export function metaFor(type: string): Meta {
    return NOTIFICATION_META[type] ?? NOTIFICATION_META.system;
}

export function NotificationIcon({ type, className = 'w-4 h-4' }: { type: string; className?: string }) {
    const { icon: Icon, color } = metaFor(type);
    return <Icon className={`${className} ${color}`} aria-hidden="true" />;
}

/** Filter chips on the page: a handful of groups instead of eighteen raw types */
export const NOTIFICATION_GROUPS: { id: string; label: string; types: string[] }[] = [
    { id: 'conversations', label: 'Conversations', types: ['reply', 'comment', 'mention', 'answer-accepted'] },
    { id: 'social', label: 'Social', types: ['like', 'reshare', 'follow', 'writeup-vote'] },
    { id: 'achievements', label: 'Achievements', types: ['badge', 'challenge-solved', 'weekly-challenge', 'path-completed'] },
    { id: 'events', label: 'Events', types: ['event-reminder'] },
    { id: 'account', label: 'Account', types: ['system', 'moderation', 'contribution-approved', 'contribution-rejected', 'job-match'] },
];

/** Only app-relative links are followed; a notification must never send a member off-site */
export function safeLink(link?: string): string | null {
    if (!link) return null;
    return link.startsWith('/') && !link.startsWith('//') ? link : null;
}
