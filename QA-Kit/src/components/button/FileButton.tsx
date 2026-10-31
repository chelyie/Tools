import type { ReactNode } from 'react';
import type { ButtonVariant } from '@components/button/Button';
import { classMerge } from '@utils/classMerge';
import { takeInputFile } from '@utils/fileInput';

interface FileButtonProps {
    children: ReactNode;
    onFile: (file: File | undefined) => void;
    accept?: string;
    label?: string; // accessible name for the hidden input
    variant?: ButtonVariant;
}

/**
 * Button that opens the file picker and hands back the chosen file.
 *
 * @example
 * <FileButton accept="image/*" onFile={(file) => upload(file)}>Replace file</FileButton>
 *
 * Used in: SlotFileActions
 */
export default function FileButton({ children, onFile, accept, label, variant = 'outline' }: FileButtonProps) {
    return (
        <label className={classMerge('btn', `btn--${variant}`, 'file-replace')}>
            <input type="file" accept={accept} aria-label={label} onChange={(e) => onFile(takeInputFile(e))} />
            {children}
        </label>
    );
}