import type { ButtonHTMLAttributes, ReactNode } from 'react';
import { classMerge } from '@utils/classMerge';

export type ButtonVariant = 'primary' | 'outline' | 'danger' | 'link' | 'dashed';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: ButtonVariant;
    icon?: ReactNode; // shown before the text
    children?: ReactNode;
}

/**
 * Standard button. Pick a look with `variant` and put an icon before the text with `icon`.
 *
 * @example
 * <Button variant="outline" icon={<PlusIcon size={14} />} onClick={save}>Save</Button>
 *
 * Used in: BugVerification page header, SlotsSection, CollageToolbar, HighlightToolbar, SelectedMarkControls, SlotFileActions
 */
export default function Button({ variant = 'primary', icon, className, children, ...rest }: ButtonProps) {
    return (
        <button type="button" className={classMerge('btn', `btn--${variant}`, className)} {...rest}>
            {icon}
            {children}
        </button>
    );
}