import type { ComponentPropsWithoutRef } from 'react';
import type { MediaKind } from '@type/Evidence.type';

interface MediaViewProps {
    url: string;
    kind: MediaKind;
    alt: string;
    controls?: boolean;
    className?: string;
    videoProps?: Omit<ComponentPropsWithoutRef<'video'>, 'src' | 'controls' | 'className'>;
}

/**
 * Shows an uploaded image or video from its URL.
 *
 * @example
 * <MediaView url={slot.url} kind={slot.kind} alt="Bug screenshot" controls />
 *
 * Used in: SlotMediaFrame, CollageShot
 */
export default function MediaView({ url, kind, alt, controls = false, className, videoProps }: MediaViewProps) {
    if (kind === 'video') {
        return <video src={url} crossOrigin="anonymous" muted playsInline preload="metadata" controls={controls} className={className} {...videoProps} />;
    }

    return <img src={url} crossOrigin="anonymous" alt={alt} className={className} />;
}