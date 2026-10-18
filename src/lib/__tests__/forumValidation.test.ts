import { describe, it, expect } from 'vitest';
import { discussionSchema, replySchema, voteSchema, FORUM_CATEGORY_SLUGS } from '../validations';
import { CATEGORY_INFO } from '@/types/forum';
import { isModeratorRole } from '../roles';

const valid = {
    title: 'How do I start with web exploitation?',
    content: 'I know some networking basics and want a path into web exploitation.',
    category: 'general' as const,
};

describe('forum schemas match the API contract', () => {
    it('accepts a valid discussion and every category the UI offers', () => {
        expect(discussionSchema.safeParse(valid).success).toBe(true);
        for (const category of Object.keys(CATEGORY_INFO)) {
            expect(discussionSchema.safeParse({ ...valid, category }).success).toBe(true);
        }
        expect([...FORUM_CATEGORY_SLUGS].sort()).toEqual(Object.keys(CATEGORY_INFO).sort());
    });

    it('enforces the backend limits', () => {
        expect(discussionSchema.safeParse({ ...valid, title: 'Too short' }).success).toBe(false);
        expect(discussionSchema.safeParse({ ...valid, content: 'Too short to be useful' }).success).toBe(false);
        expect(discussionSchema.safeParse({ ...valid, content: 'x'.repeat(10001) }).success).toBe(false);
        expect(discussionSchema.safeParse({ ...valid, category: 'help' }).success).toBe(false);
        expect(discussionSchema.safeParse({ ...valid, tags: ['a', 'b', 'c', 'd', 'e', 'f'] }).success).toBe(false);
    });

    it('uses content, not body', () => {
        const { content, ...rest } = valid;
        expect(discussionSchema.safeParse({ ...rest, body: content }).success).toBe(false);
    });

    it('validates replies and votes', () => {
        expect(replySchema.safeParse({ content: 'ok then' }).success).toBe(true);
        expect(replySchema.safeParse({ content: 'hi' }).success).toBe(false);
        expect(replySchema.safeParse({ content: 'x'.repeat(5001) }).success).toBe(false);
        expect(replySchema.safeParse({ content: 'fine', parentId: 'nope' }).success).toBe(false);
        expect(voteSchema.safeParse({ value: 1 }).success).toBe(true);
        expect(voteSchema.safeParse({ value: -1 }).success).toBe(true);
        expect(voteSchema.safeParse({ value: 2 }).success).toBe(false);
    });
});

describe('isModeratorRole', () => {
    it('includes owner, admin and moderator only', () => {
        expect(['owner', 'admin', 'moderator'].every(isModeratorRole)).toBe(true);
        expect(isModeratorRole('user')).toBe(false);
        expect(isModeratorRole(undefined)).toBe(false);
    });
});
