/** Roles that can moderate content, matching the backend's forum moderation check. */
const MODERATOR_ROLES = ['moderator', 'admin', 'owner'];

export function isModeratorRole(role?: string | null): boolean {
    return !!role && MODERATOR_ROLES.includes(role);
}
