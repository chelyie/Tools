import type { ReactNode } from 'react';

interface PageLayoutProps {
    header: ReactNode;
    children: ReactNode;
}

/**
 * Outer frame of a page: the header on top, the page content below. Start every new page with it.
 *
 * @example
 * <PageLayout header={<AppHeader title="My page" />}>...sections...</PageLayout>
 *
 * Used in: BugVerification page
 */
export default function PageLayout({ header, children }: PageLayoutProps) {
    return (
        <div className="app">
            {header}
            <main className="app-main">{children}</main>
        </div>
    );
}