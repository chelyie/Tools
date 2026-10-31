import type { ButtonHTMLAttributes, ReactNode } from 'react';

interface IconButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    label: string; // icon-only buttons need an accessible name
    children: ReactNode;
}

/**
 * Button that shows only an icon. `label` is required so screen readers can name it.
 *
 * @example
 * <IconButton label="Delete" onClick={remove}><TrashIcon /></IconButton>
 *
 * Used in: SlotEditor (remove slot), CollageShot (remove file)
 */
export default function IconButton({ label, className = 'icon-btn', children, ...rest }: IconButtonProps) {
    return (
        <button type="button" className={className} aria-label={label} {...rest}>
            {children}
        </button>
    );
}