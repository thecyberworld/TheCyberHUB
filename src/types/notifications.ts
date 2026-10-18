/** Every type the API can create, as validated by `GET /api/notifications?type=` */
export const NOTIFICATION_TYPES = [
    'reply', 'mention', 'answer-accepted', 'badge', 'event-reminder', 'follow',
    'contribution-approved', 'contribution-rejected', 'weekly-challenge',
    'path-completed', 'system', 'job-match', 'writeup-vote',
    'like', 'reshare', 'comment', 'moderation', 'challenge-solved',
] as const;

export type NotificationKind = (typeof NOTIFICATION_TYPES)[number];

export interface NotificationData {
    _id: string;
    type: string;
    title: string;
    message: string;
    link?: string;
    read: boolean;
    createdAt: string;
    actor?: {
        name: string;
        username: string;
        avatar?: string;
    };
}

export interface NotificationPage {
    success: boolean;
    data: NotificationData[];
    pagination: { page: number; limit: number; total: number; totalPages: number };
}

export interface UnreadCount {
    count: number;
    byType: Record<string, number>;
}

export interface EmailPreferences {
    replies: boolean;
    mentions: boolean;
    badges: boolean;
    events: boolean;
    follows: boolean;
    contributions: boolean;
    weeklyChallenges: boolean;
    newsletter: boolean;
    jobMatches: boolean;
    securityAlerts: boolean;
}

export interface InAppPreferences {
    replies: boolean;
    mentions: boolean;
    badges: boolean;
    events: boolean;
    follows: boolean;
    likes: boolean;
    comments: boolean;
    reshares: boolean;
    challenges: boolean;
    contributions: boolean;
    weeklyChallenges: boolean;
    jobMatches: boolean;
    securityAlerts: boolean;
}

export interface QuietHours {
    enabled: boolean;
    start: string;
    end: string;
    timezone: string;
}

export interface NotificationPreferences {
    email: EmailPreferences;
    inApp: InAppPreferences;
    quietHours: QuietHours;
    emailDigest: { enabled: boolean; frequency: 'weekly' };
}

export type NotificationPreferencesUpdate = {
    email?: Partial<EmailPreferences>;
    inApp?: Partial<InAppPreferences>;
    quietHours?: Partial<QuietHours>;
    emailDigest?: { enabled: boolean };
};

export type UnsubscribeScope = 'email' | 'digest';
