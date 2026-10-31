import type { ReactNode } from 'react';
import Hint from '@components/feedback/Hint';
import { fileDropHandlers, takeInputFile } from '@utils/fileInput';

interface DropZoneProps {
    title: ReactNode;
    onFile: (file: File | undefined) => void;
    hint?: ReactNode;
    icon?: ReactNode;
    accept?: string;
    label?: string; // accessible name for the file input
}

/**
 * Empty upload area: click to pick a file, or drag one onto it.
 *
 * @example
 * <DropZone title="Drop a file" hint="PNG or MP4" accept="image/*" onFile={upload} />
 *
 * Used in: SlotEditor
 */
export default function DropZone({ title, onFile, hint, icon, accept, label }: DropZoneProps) {
    return (
        <label className="drop" {...fileDropHandlers(onFile)}>
            <input type="file" accept={accept} aria-label={label} onChange={(e) => onFile(takeInputFile(e))} />
            <div className="drop__empty">
                {icon}
                <span className="drop__title">{title}</span>
                {hint && <Hint>{hint}</Hint>}
            </div>
        </label>
    );
}