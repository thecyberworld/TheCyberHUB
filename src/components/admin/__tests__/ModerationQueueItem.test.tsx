import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, it, expect, vi } from 'vitest'
import { ModerationQueueItem, availableActions } from '../ModerationQueueItem'
import type { ModerationQueueEntry } from '@/types/moderation'

const entry = (over: Partial<ModerationQueueEntry> = {}, content: Partial<ModerationQueueEntry['content']> = {}): ModerationQueueEntry => ({
    contentType: 'reply',
    contentId: 'r1',
    reportCount: 3,
    reasons: [{ reason: 'spam', count: 2 }, { reason: 'harassment', count: 1 }],
    firstReportedAt: '2026-10-01T10:00:00.000Z',
    lastReportedAt: '2026-10-02T10:00:00.000Z',
    status: 'pending',
    content: {
        exists: true,
        title: 'Buy cheap keys',
        excerpt: 'click here now',
        link: '/forums/d1#reply-r1',
        author: { _id: 'a1', username: 'spammer', role: 'user' },
        isHidden: false,
        isDeleted: false,
        ...content,
    },
    ...over,
})

describe('availableActions', () => {
    it('offers dismiss, hide and remove for visible pending content', () => {
        expect(availableActions(entry())).toEqual(['dismiss', 'hide', 'remove'])
    })

    it('offers restore instead of hide for concealed pending content', () => {
        expect(availableActions(entry({}, { isHidden: true }))).toEqual(['dismiss', 'restore', 'remove'])
    })

    it('only allows dismiss when the content is gone', () => {
        expect(availableActions(entry({}, { exists: false }))).toEqual(['dismiss'])
    })

    it('only allows restore on closed items that are still concealed', () => {
        expect(availableActions(entry({ status: 'resolved' }, { isDeleted: true }))).toEqual(['restore'])
        expect(availableActions(entry({ status: 'dismissed' }))).toEqual([])
    })
})

describe('ModerationQueueItem', () => {
    it('shows grouped reports, reasons, author and a link in context', () => {
        render(<ul><ModerationQueueItem entry={entry()} selected={false} onSelect={vi.fn()} onAction={vi.fn()} /></ul>)
        expect(screen.getByText('3 reports')).toBeInTheDocument()
        expect(screen.getByText('Spam ×2')).toBeInTheDocument()
        expect(screen.getByText('Harassment')).toBeInTheDocument()
        expect(screen.getByText('@spammer')).toBeInTheDocument()
        expect(screen.getByRole('link', { name: /open in context/i })).toHaveAttribute('href', '/forums/d1#reply-r1')
    })

    it('reports the chosen action and selection', async () => {
        const user = userEvent.setup()
        const onAction = vi.fn()
        const onSelect = vi.fn()
        render(<ul><ModerationQueueItem entry={entry()} selected={false} onSelect={onSelect} onAction={onAction} /></ul>)
        await user.click(screen.getByRole('button', { name: /^hide/i }))
        expect(onAction).toHaveBeenCalledWith('hide')
        await user.click(screen.getByRole('checkbox', { name: /select buy cheap keys/i }))
        expect(onSelect).toHaveBeenCalledWith(true)
    })

    it('says so when the content no longer exists and offers no link', () => {
        render(<ul><ModerationQueueItem entry={entry({}, { exists: false })} selected={false} onSelect={vi.fn()} onAction={vi.fn()} /></ul>)
        expect(screen.getByText('This content no longer exists.')).toBeInTheDocument()
        expect(screen.queryByRole('link')).not.toBeInTheDocument()
    })

    it('flags content that was hidden automatically', () => {
        render(<ul><ModerationQueueItem entry={entry({}, { isHidden: true, hiddenReason: 'auto' })} selected={false} onSelect={vi.fn()} onAction={vi.fn()} /></ul>)
        expect(screen.getByText('Hidden automatically')).toBeInTheDocument()
    })
})
