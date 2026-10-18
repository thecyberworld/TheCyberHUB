import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Welcome | TheCyberHub',
    description: 'Tell us what you want to learn and find people to follow.',
    robots: { index: false, follow: false },
};

export default function WelcomeLayout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
