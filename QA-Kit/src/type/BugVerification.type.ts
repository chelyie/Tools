import type { Ref } from 'react';
import type { ImageFormat, Mark, Slot } from '@type/Evidence.type';

/* Props for the sections of the Bug Verification page (src/Pages/BugVerification/sections). */

// ---- slot/ ----

export interface SlotEditorProps {
    slot: Slot;
    index: number;
}

export interface SlotMediaFrameProps {
    slot: Slot;
    alt: string;
    selectedId: number | null;
    onSelect: (id: number | null) => void;
    onFile: (file: File | undefined) => void; // dropping a file replaces the current one
}

export interface HighlightToolbarProps {
    color: string;
    onAdd: () => void;
    onColorChange: (color: string) => void;
}

export interface SelectedMarkControlsProps {
    mark: Mark;
    onChange: (patch: Partial<Mark>) => void;
    onRemove: () => void;
}

export interface SlotFileActionsProps {
    slot: Slot;
    onFile: (file: File | undefined) => void;
    onClear: () => void;
}

// ---- collage/ ----

export interface CollagePreviewProps {
    ref: Ref<HTMLDivElement>;
}

export interface CollageShotProps {
    slot: Slot;
    index: number;
    onRemove: () => void;
}

export interface CollageToolbarProps {
    hasVideo: boolean;
    format: ImageFormat;
    busy: boolean;
    onFormatChange: (format: ImageFormat) => void;
    onDownload: () => void;
    onPlayAll: () => void;
    onPauseAll: () => void;
}