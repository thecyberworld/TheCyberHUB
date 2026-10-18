export type ModerationContentType = 'blog' | 'discussion' | 'feedPost' | 'reply' | 'comment';
export type ModerationAction = 'dismiss' | 'hide' | 'remove' | 'restore';
export type FlagStatus = 'pending' | 'reviewed' | 'resolved' | 'dismissed';

export interface ModerationContentSnapshot {
    exists: boolean;
    title?: string | null;
    excerpt?: string;
    link?: string;
    author?: { _id: string; username: string; role?: string } | null;
    isHidden?: boolean;
    isDeleted?: boolean;
    hiddenReason?: 'auto' | 'moderator' | 'removed' | null;
}

/** One reported piece of content with all its open reports grouped */
export interface ModerationQueueEntry {
    contentType: ModerationContentType;
    contentId: string;
    reportCount: number;
    reasons: { reason: string; count: number }[];
    firstReportedAt: string;
    lastReportedAt: string;
    status: FlagStatus;
    content: ModerationContentSnapshot;
}

export interface ModerationStats {
    flagsByStatus: Partial<Record<FlagStatus, number>>;
    pendingByType: Record<string, number>;
    pendingByReason: Record<string, number>;
    oldestPendingAt: string | null;
    actionsLast7Days: Record<string, number>;
}

export interface BulkResult {
    ok: boolean;
    contentType: ModerationContentType;
    contentId: string;
    error?: string;
}

export const REASON_LABELS: Record<string, string> = {
    spam: 'Spam',
    harassment: 'Harassment',
    hate_speech: 'Hate speech',
    misinformation: 'Misinformation',
    inappropriate: 'Inappropriate',
    copyright: 'Copyright',
    other: 'Other',
};

export const CONTENT_TYPE_LABELS: Record<ModerationContentType, string> = {
    blog: 'Blog post',
    discussion: 'Discussion',
    feedPost: 'Feed post',
    reply: 'Forum reply',
    comment: 'Blog comment',
};

export const ACTION_COPY: Record<ModerationAction, { label: string; title: string; effect: string }> = {
    dismiss: {
        label: 'Dismiss',
        title: 'Dismiss reports',
        effect: 'The reports were unfounded. Nothing happens to the content (content hidden automatically comes back).',
    },
    hide: {
        label: 'Hide',
        title: 'Hide content',
        effect: 'The content disappears for everyone but moderators and its author is notified. You can restore it later.',
    },
    remove: {
        label: 'Remove',
        title: 'Remove content',
        effect: 'The content is removed and its author is notified. It is kept for the record and can be restored.',
    },
    restore: {
        label: 'Restore',
        title: 'Restore content',
        effect: 'The content becomes visible again.',
    },
};

export type SanctionAction = 'warn' | 'mute' | 'unmute' | 'ban' | 'unban';

export const MUTE_DURATIONS = [
    { value: '1h', label: '1 hour' },
    { value: '24h', label: '24 hours' },
    { value: '7d', label: '7 days' },
] as const;

export const BAN_DURATIONS = [
    { value: '1d', label: '1 day' },
    { value: '7d', label: '7 days' },
    { value: '30d', label: '30 days' },
    { value: 'permanent', label: 'Permanent' },
] as const;

export const SANCTION_COPY: Record<SanctionAction, { label: string; title: string; effect: string; reasonRequired: boolean }> = {
    warn: {
        label: 'Warn',
        title: 'Warn user',
        effect: 'The user is notified. Repeated violations can lead to a mute or a ban.',
        reasonRequired: true,
    },
    mute: {
        label: 'Mute',
        title: 'Mute user',
        effect: 'The user can read and vote but cannot post, reply, comment or edit until the mute ends.',
        reasonRequired: true,
    },
    unmute: {
        label: 'Lift mute',
        title: 'Lift mute',
        effect: 'The user can post again straight away.',
        reasonRequired: false,
    },
    ban: {
        label: 'Ban',
        title: 'Ban user',
        effect: 'The user is signed out everywhere and cannot sign in until the ban ends or you lift it.',
        reasonRequired: true,
    },
    unban: {
        label: 'Lift ban',
        title: 'Lift ban',
        effect: 'The user can sign in again.',
        reasonRequired: false,
    },
};

export interface UserSanctionRecord {
    _id: string;
    type: 'warn' | 'mute' | 'ban';
    reason: string;
    createdAt: string;
    expiresAt: string | null;
    revokedAt: string | null;
    revokedReason: 'lifted' | 'superseded' | 'expired' | null;
    isInEffect: boolean;
    issuedBy?: { _id: string; username: string } | null;
}

export interface UserModerationHistory {
    user: {
        _id: string;
        username: string;
        role: string;
        avatar?: string;
        createdAt?: string;
        isBanned: boolean;
        banReason: string | null;
        banExpiresAt: string | null;
        mutedUntil: string | null;
    };
    counts: { warn: number; mute: number; ban: number };
    sanctions: UserSanctionRecord[];
}
