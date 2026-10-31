import type { MediaKind } from '@type/Evidence.type';

export function getMediaKind(file: File): MediaKind | null {
    if (file.type.startsWith('image/')) return 'image';
    if (file.type.startsWith('video/')) return 'video';
    return null;
}

export function revokeUrl(url: string) {
    if (!url) return;
    try {
        URL.revokeObjectURL(url);
    }
    catch {
        /* already released */
    }
}

/** Width / height of an uploaded file, or null when it can't be read. */
export function measureMedia(url: string, kind: MediaKind): Promise<number | null> {
    return new Promise((resolve) => {
        if (kind === 'image') {
            const img = new Image();
            img.onload = () => resolve(img.naturalHeight
                ? img.naturalWidth / img.naturalHeight
                : null);
            img.onerror = () => resolve(null);
            img.src = url;
        }
        else {
            const video = document.createElement('video');
            video.preload = 'metadata';
            video.onloadedmetadata = () => resolve(video.videoHeight
                ? video.videoWidth / video.videoHeight
                : null);
            video.onerror = () => resolve(null);
            video.src = url;
        }
    });
}