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

/** The first picture or video on the clipboard (a copied screenshot or file), or undefined when it holds only text. */
export function pastedFile(data: DataTransfer | null): File | undefined {
    if (!data) return undefined;
    const files = Array.from(data.files);
    const items = Array.from(data.items)
        .filter((i) => i.kind === 'file')
        .map((i) => i.getAsFile())
        .filter((f): f is File => f !== null);
    return [...files, ...items].find((f) => f.type.startsWith('image/') || f.type.startsWith('video/'));
}