import { useState, type RefObject } from 'react';
import useEvidence from '@hooks/useEvidence';
import translationEN from '@locales/en';
import type { ImageFormat } from '@type/Evidence.type';
import { exportCollage, saveBlob } from '@utils/exportCollage';

/**
 * Downloads the collage preview as PNG/JPG, or as a video when a slot has one. Pass the ref of the preview element.
 *
 * @example
 * const { format, setFormat, busy, error, download } = useCollageDownload(previewRef);
 *
 * Used in: CollagePanel
 */
export default function useCollageDownload(previewRef: RefObject<HTMLDivElement | null>) {
    const { state, ticketId } = useEvidence();
    const [format, setFormat] = useState<ImageFormat>('png');
    const [busy, setBusy] = useState(false);
    const [error, setError] = useState('');

    async function download() {
        setError('');
        setBusy(true);
        try {
            const { blob, ext } = await exportCollage({
                ticket: ticketId,
                title: state.title.trim(),
                slots: state.slots,
                preview: previewRef.current,
                format
            });
            saveBlob(blob, `${ticketId}.${ext}`);
        }
        catch (e) {
            setError(e instanceof Error && e.message
                ? e.message
                : translationEN.downloadFailed);
        }
        finally {
            setBusy(false);
        }
    }

    return { format, setFormat, busy, error, download };
}