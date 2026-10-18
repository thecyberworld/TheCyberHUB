import { render, screen } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'

vi.mock('@/context/AuthContext', () => ({ useAuth: () => ({ user: { id: 'viewer', role: 'user' } }) }))
vi.mock('@/context/ToastContext', () => ({ useToast: () => ({ addToast: vi.fn() }) }))
vi.mock('@/lib/api', () => ({ fetchApi: vi.fn() }))
vi.mock('../MarkdownContent', () => ({ default: ({ content }: { content: string }) => <div>{content}</div> }))
vi.mock('../VoteButtons', () => ({ default: () => <div data-testid="votes" /> }))
vi.mock('../ReplyForm', () => ({ default: () => <div /> }))

import ReplyThread from '../ReplyThread'
import type { Reply } from '@/types/forum'

const base = (over: Partial<Reply>): Reply => ({
    _id: 'r1',
    discussion: 'd1',
    content: 'hello world',
    author: { _id: 'a1', username: 'alice' },
    upvotes: 0,
    downvotes: 0,
    isAccepted: false,
    depth: 0,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    ...over,
} as Reply)

const renderReply = (reply: Reply) =>
    render(
        <ReplyThread
            reply={reply}
            discussionId="d1"
            discussionAuthorId="a9"
            currentUserId="viewer"
            userRole="user"
            onVote={vi.fn()}
            onAccept={vi.fn()}
            onReply={vi.fn()}
        />
    )

describe('ReplyThread moderation states', () => {
    it('shows the reply and a report button to other members', () => {
        renderReply(base({}))
        expect(screen.getByText('hello world')).toBeInTheDocument()
        expect(screen.getByRole('button', { name: /report/i })).toBeInTheDocument()
    })

    it('replaces a hidden reply with a placeholder and keeps the replies under it', () => {
        const hidden = base({
            isHidden: true,
            author: null as unknown as Reply['author'],
            content: '[removed by a moderator]',
            children: [base({ _id: 'r2', content: 'still here', author: { _id: 'a2', username: 'bob' } })],
        })
        renderReply(hidden)
        expect(screen.getByText('This reply was removed by a moderator.')).toBeInTheDocument()
        expect(screen.queryByText('[removed by a moderator]')).not.toBeInTheDocument()
        expect(screen.getByText('still here')).toBeInTheDocument()
    })
})
