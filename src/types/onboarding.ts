export interface InterestOption { slug: string; label: string; group: 'challenges' | 'community' }
export interface ChoiceOption { slug: string; label: string }

export interface OnboardingOptions {
    interests: InterestOption[];
    experienceLevels: ChoiceOption[];
    goals: ChoiceOption[];
    maxInterests: number;
}

export type ChecklistKey = 'profile' | 'solve' | 'post' | 'discuss' | 'follow';

export interface ChecklistItem { key: ChecklistKey; done: boolean; href: string }

export interface OnboardingState {
    state: { step: number; completedAt: string | null; skippedAt: string | null; checklistDismissedAt: string | null };
    needsOnboarding: boolean;
    interests: string[];
    experienceLevel: string | null;
    goal: string | null;
    checklist: ChecklistItem[];
    progress: { done: number; total: number };
    next: {
        challenge: { slug: string; title: string; category: string; difficulty: string } | null;
        event: { slug: string; title: string; startDate: string } | null;
    };
}

export interface OnboardingUpdate {
    step?: number;
    interests?: string[];
    experienceLevel?: string | null;
    goal?: string | null;
    completed?: true;
    skipped?: true;
    dismissedChecklist?: true;
}

export interface SuggestedMember {
    id: string;
    username: string;
    name: string;
    avatar: string | null;
    bio: string | null;
    followerCount: number;
    isStaff: boolean;
    reason: string;
    sharedInterests: string[];
}
