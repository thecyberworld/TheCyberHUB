/**
 * Markdown preview helper used by blog write/edit and event edit pages.
 * The renderer lives in `lib/markdown.ts` (shared with the forums); output should still go
 * through DOMPurify before it reaches the DOM.
 */
export { renderMarkdownToHtml } from '@/lib/markdown';
