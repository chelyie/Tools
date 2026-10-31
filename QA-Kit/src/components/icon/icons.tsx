import type { ReactNode } from 'react';

/**
 * Line icons that follow the text color. Set `size`, `stroke` or `strokeWidth` if needed.
 *
 * @example
 * <PlusIcon size={16} />
 *
 * Used in: BugVerification page, SlotsSection, SlotEditor, HighlightToolbar, CollageToolbar, CollageShot
 */
export interface IconProps {
    size?: number;
    stroke?: string;
    strokeWidth?: number;
}

function Icon({ size = 18, stroke = 'currentColor', strokeWidth = 2, children }: IconProps & { children: ReactNode }) {
    return (
        <svg
            width={size}
            height={size}
            viewBox="0 0 24 24"
            fill="none"
            stroke={stroke}
            strokeWidth={strokeWidth}
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
        >
            {children}
        </svg>
    );
}

export function SplitIcon(props: IconProps) {
    return <Icon {...props}><rect x="3" y="3" width="8" height="18" rx="1.5" /><rect x="13" y="3" width="8" height="18" rx="1.5" /></Icon>;
}

export function PlusIcon(props: IconProps) {
    return <Icon strokeWidth={2.4} {...props}><path d="M12 5v14M5 12h14" /></Icon>;
}

export function UploadIcon(props: IconProps) {
    return <Icon strokeWidth={1.8} {...props}><path d="M12 16V4M7 9l5-5 5 5M4 16v3a1 1 0 001 1h14a1 1 0 001-1v-3" /></Icon>;
}

export function TrashIcon(props: IconProps) {
    return <Icon {...props}><path d="M3 6h18M8 6V4h8v2M6 6l1 14h10l1-14" /></Icon>;
}

export function DownloadIcon(props: IconProps) {
    return <Icon strokeWidth={2.2} {...props}><path d="M12 4v12M7 11l5 5 5-5M4 20h16" /></Icon>;
}

export function XIcon(props: IconProps) {
    return <Icon {...props}><path d="M6 6l12 12M18 6L6 18" /></Icon>;
}