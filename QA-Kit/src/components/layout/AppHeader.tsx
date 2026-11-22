import type { ReactNode } from 'react';

interface AppHeaderProps {
    title?: ReactNode;
    nav?: ReactNode; // shown on the left, next to the title
    actions?: ReactNode; // shown on the right
}

/**
 * Top bar of a page: logo and title on the left, `actions` (buttons) on the right.
 *
 * @example
 * <AppHeader title="Bug Verification" actions={<Button>New bug</Button>} />
 *
 * Used in: BugVerification page
 */
export default function AppHeader({ title, nav, actions }: AppHeaderProps) {
    return (
        <header className="app-header">
            <div className="app-header__brand">
                <img className="app-header__logo" src="/logo.png" alt="QA Kit logo" />
                {title && (
                    <div>
                        <div className="app-header__name">{title}</div>
                    </div>
                )}
                {nav && <nav className="app-header__nav">{nav}</nav>}
            </div>
            {actions && <div className="app-header__actions">{actions}</div>}
        </header>
    );
}