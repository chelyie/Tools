import type { ReactNode } from 'react';

interface AppHeaderProps {
    title: ReactNode;
    icon?: ReactNode;
    actions?: ReactNode; // shown on the right
}

/**
 * Top bar of a page: icon and title on the left, `actions` (buttons) on the right.
 *
 * @example
 * <AppHeader title="Bug Verification" icon={<SplitIcon />} actions={<Button>New bug</Button>} />
 *
 * Used in: BugVerification page
 */
export default function AppHeader({ title, icon, actions }: AppHeaderProps) {
    return (
        <header className="app-header">
            <div className="app-header__brand">
                {icon && <div className="mark" aria-hidden="true">{icon}</div>}
                <div>
                    <div className="app-header__name">{title}</div>
                </div>
            </div>
            {actions}
        </header>
    );
}