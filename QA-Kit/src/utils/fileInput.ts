import type { ChangeEvent, DragEvent } from 'react';

/** Returns the picked file and resets the input so the same file can be picked again. */
export function takeInputFile(e: ChangeEvent<HTMLInputElement>): File | undefined {
    const file = e.target.files?.[0];
    e.target.value = '';
    return file;
}

/** Drag-and-drop handlers that pass the first dropped file to `onFile`. */
export function fileDropHandlers(onFile: (file: File | undefined) => void) {
    return {
        onDragOver(e: DragEvent<HTMLElement>) {
            e.preventDefault();
        },
        onDrop(e: DragEvent<HTMLElement>) {
            e.preventDefault();
            onFile(e.dataTransfer.files[0]);
        }
    };
}