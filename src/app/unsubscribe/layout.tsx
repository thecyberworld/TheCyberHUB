import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Unsubscribe | TheCyberHub',
    description: 'Stop the emails you no longer want from TheCyberHub.',
    robots: { index: false, follow: false },
};

export default function UnsubscribeLayout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
