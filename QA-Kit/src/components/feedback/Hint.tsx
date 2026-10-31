import type { ReactNode } from 'react';
import { classMerge } from '@utils/classMerge';

interface HintProps {
    children: ReactNode;
    strong?: boolean;
    truncate?: boolean; // cut long text with an ellipsis
}

/**
 * Small gray helper text. `strong` makes it bolder, `truncate` cuts long text with "...".
 *
 * @example
 * <Hint truncate>{fileName}</Hint>
 *
 * Used in: SlotsSection, SlotEditor, SlotFileActions, CollagePreview, DropZone
 */
export default function Hint({ children, strong, truncate }: HintProps) {
    return <span className={classMerge('hint', strong && 'hint--strong', truncate && 'hint--truncate')}>{children}</span>;
}