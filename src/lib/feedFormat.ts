import type { FeedPost } from '@/types/feed';

/** "just now", "5m", "3h", "2d", then a short date. */
export function timeAgo(dateStr: string, now: number = Date.now()): string {
    const diff = now - new Date(dateStr).getTime();
    const mins = Math.floor(diff / 60000);
    if (mins < 1) return 'just now';
    if (mins < 60) return `${mins}m`;
    const hours = Math.floor(mins / 60);
    if (hours < 24) return `${hours}h`;
    const days = Math.floor(hours / 24);
    if (days < 7) return `${days}d`;
    return new Date(dateStr).toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
}

/** Where an activity card leads, or null when there is nowhere to go. */
export function eventHref(post: Pick<FeedPost, 'eventType' | 'eventData'>): string | null {
    const data = post.eventData;
    if (!data) return null;
    const slug = data.targetSlug ? encodeURIComponent(data.targetSlug) : null;
    const id = data.targetId ? encodeURIComponent(data.targetId) : null;

    switch (post.eventType) {
        case 'challenge_solved':
            return slug ? `/challenges/${slug}` : '/challenges';
        case 'blog_published':
            return slug ? `/blog/${slug}` : id ? `/blog/${id}` : '/blog';
        case 'forum_post':
            return id ? `/forums/${id}` : '/forums';
        case 'event_joined':
            return slug ? `/events/${slug}` : '/events';
        case 'badge_earned':
            return '/badges';
        case 'daily_challenge_completed':
        case 'streak_milestone':
            return '/dashboard';
        default:
            return null;
    }
}
