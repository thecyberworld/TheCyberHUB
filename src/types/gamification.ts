export type LeaderboardPeriod = 'all' | 'monthly' | 'weekly';

export const LEADERBOARD_PERIODS: { value: LeaderboardPeriod; label: string }[] = [
    { value: 'weekly', label: 'This week' },
    { value: 'monthly', label: 'This month' },
    { value: 'all', label: 'All time' },
];

export const CHALLENGE_CATEGORIES = ['web', 'crypto', 'pwn', 'reverse', 'forensics', 'misc', 'osint'] as const;
export type ChallengeCategory = (typeof CHALLENGE_CATEGORIES)[number];

export interface LeaderboardEntry {
    rank: number;
    userId: string;
    username: string;
    name: string | null;
    avatar: string | null;
    points: number;
    solves: number;
    /** Rank change since last week; null until weekly snapshots exist */
    delta: number | null;
}

export interface LeaderboardMe {
    rank: number | null;
    points: number;
    solves: number;
    /** False when the account is private, inactive or excluded: they see their place, others do not */
    visible?: boolean;
}

export interface LeaderboardPage {
    success: boolean;
    data: LeaderboardEntry[];
    meta: {
        period: LeaderboardPeriod;
        category: ChallengeCategory | null;
        generatedAt: string;
        windowStart: string | null;
        me: LeaderboardMe | null;
    };
    pagination: { hasMore: boolean; nextCursor: string | null };
}

export interface LeaderboardQuery {
    period?: LeaderboardPeriod;
    category?: ChallengeCategory | null;
    limit?: number;
}

export type BadgeRarity = 'common' | 'uncommon' | 'rare' | 'epic' | 'legendary';

export interface BadgeProgress {
    current: number;
    threshold: number;
    percentage: number;
    completed: boolean;
}

export interface CatalogBadge {
    code: string;
    name: string;
    description: string;
    icon: string;
    color: string;
    rarity: BadgeRarity;
    category: string;
    points: number;
    earnedBy: number;
    /** Only present for a signed-in viewer */
    earned?: boolean;
    earnedAt?: string | null;
    progress?: BadgeProgress | null;
}

export interface EarnedBadge {
    code: string;
    name: string;
    description: string;
    icon: string;
    color: string;
    rarity: BadgeRarity;
    earnedAt: string;
    points: number;
}

export interface UserBadges {
    earned: EarnedBadge[];
    progress: Array<{ code: string; name: string; description: string; rarity: BadgeRarity } & BadgeProgress>;
}

export interface NewBadge {
    code: string;
    name: string;
    description: string;
    icon: string;
    color: string;
    rarity: BadgeRarity;
    points: number;
}

export type StreakStatus = 'active' | 'at_risk' | 'broken' | 'none';

export interface ActivityEntry {
    date: string;
    actions: string[];
    xpEarned: number;
}

export interface StreakData {
    currentStreak: number;
    longestStreak: number;
    totalActiveDays: number;
    lastActiveDate: string | null;
    totalXpFromEngagement: number;
    checkedInToday: boolean;
    status: StreakStatus;
    /** When the streak dies if nothing happens; null once it is over */
    streakEndsAt: string | null;
    activityLog: ActivityEntry[];
}

export interface CheckInResult extends Omit<StreakData, 'activityLog'> {
    xpAwarded: number;
    isNewDay: boolean;
    newBadges: NewBadge[];
}

export type DailyDifficulty = 'easy' | 'medium' | 'hard';

export interface DailyChallengeData {
    _id: string;
    date: string;
    question: string;
    options: string[];
    difficulty: DailyDifficulty;
    category: string;
    xpReward: number;
    totalAttempts: number;
    successRate: number | null;
    hasSubmitted: boolean;
    /** Only after the signed-in user has answered */
    correctIndex?: number;
    explanation?: string;
    userSubmission?: { selectedIndex: number; isCorrect: boolean; xpEarned: number };
}

export interface DailySubmitResult {
    isCorrect: boolean;
    correctIndex: number;
    explanation: string;
    xpEarned: number;
    selectedIndex: number;
    newBadges: NewBadge[];
}

export interface DailyHistory {
    submissions: Array<{
        _id: string;
        date: string;
        selectedIndex: number;
        isCorrect: boolean;
        xpEarned: number;
        challenge: { question: string; category: string; difficulty: DailyDifficulty; date: string; xpReward: number } | null;
    }>;
    stats: { total: number; correct: number; totalXp: number; accuracy: number | null };
}
