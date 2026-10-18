import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
    title: 'Community Guidelines',
    description: 'How to take part in TheCyberHub forums, blog and feed, and what happens when content is reported.',
};

const RULES = [
    {
        title: 'Be respectful',
        body: 'Disagree with ideas, not people. No harassment, bullying, hate speech or personal attacks.',
    },
    {
        title: 'Stay on the right side of the law',
        body: 'Discuss and share techniques for systems you own or are authorised to test. No targeting of third parties, no live malware samples, no stolen data, leaked credentials or doxxing.',
    },
    {
        title: 'No spoilers during competitions',
        body: 'Ask for nudges, not flags. Publish full write-ups for a challenge or CTF only after it has ended.',
    },
    {
        title: 'No spam or self-promotion',
        body: 'Share your own work where it helps people, not as a drive-by link. Repeated promotional posts, referral links and copy-pasted posts will be removed.',
    },
    {
        title: 'Give credit',
        body: 'Quote and link your sources. Do not repost other people\'s work or copyrighted material as your own.',
    },
    {
        title: 'Share accurately',
        body: 'Say what you tested and what you did not. Correct yourself when you find a mistake.',
    },
];

export default function CommunityGuidelinesPage() {
    return (
        <main className="min-h-screen bg-black pt-24 pb-16 px-4">
            <div className="mx-auto max-w-3xl">
                <h1 className="text-3xl font-bold text-white">Community guidelines</h1>
                <p className="mt-3 text-gray-400">
                    TheCyberHub is a place to learn and share security knowledge. These guidelines apply to the forums,
                    blog, feed and comments.
                </p>

                <ol className="mt-8 space-y-6">
                    {RULES.map((rule, index) => (
                        <li key={rule.title} className="flex gap-4">
                            <span className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full bg-orange-500/10 text-sm font-semibold text-orange-400">
                                {index + 1}
                            </span>
                            <div>
                                <h2 className="font-semibold text-white">{rule.title}</h2>
                                <p className="mt-1 text-sm text-gray-400">{rule.body}</p>
                            </div>
                        </li>
                    ))}
                </ol>

                <section className="mt-12 rounded-xl border border-white/10 bg-white/[0.02] p-6">
                    <h2 className="text-lg font-semibold text-white">Reporting and moderation</h2>
                    <p className="mt-2 text-sm text-gray-400">
                        Use the Report button on a post, reply or comment. A moderator reviews each report and can
                        dismiss it, hide the content or remove it. If your content is hidden or removed you get a
                        notification. Content that many established members report may be hidden automatically until a
                        moderator has looked at it. You cannot report your own content.
                    </p>
                    <p className="mt-3 text-sm text-gray-400">
                        Moderator decisions are recorded so they can be reviewed.{' '}
                        <Link href="/forums" className="text-orange-400 hover:underline">
                            Back to the forums
                        </Link>
                    </p>
                </section>
            </div>
        </main>
    );
}
