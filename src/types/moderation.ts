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
