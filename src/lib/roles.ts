/** Roles that can moderate content, matching the backend's forum moderation check. */
const MODERATOR_ROLES = ['moderator', 'admin', 'owner'];

export function isModeratorRole(role?: string | null): boolean {
    return !!role && MODERATOR_ROLES.includes(role);
}

const ROLE_RANK: Record<string, number> = { user: 0, moderator: 1, admin: 2, owner: 3 };

/**
 * Whether the viewer may warn, mute or ban the target: a strictly higher role, owners over anyone
 * else, never yourself. The API enforces the same rule; this only hides buttons that would fail.
 */
export function canSanctionUser(
    viewer: { id?: string; role?: string | null } | null | undefined,
    target: { id?: string; role?: string | null } | null | undefined,
): boolean {
    if (!viewer || !target || !isModeratorRole(viewer.role)) return false;
    if (viewer.id && target.id && viewer.id === target.id) return false;
    if (viewer.role === 'owner') return true;
    return (ROLE_RANK[target.role ?? 'user'] ?? 0) < (ROLE_RANK[viewer.role ?? 'user'] ?? 0);
}
