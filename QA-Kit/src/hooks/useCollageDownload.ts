import { useState, type RefObject } from 'react';
import useAuth from '@hooks/useAuth';
import useEvidence from '@hooks/useEvidence';
import translationEN from '@locales/en';
import type { ImageFormat } from '@type/Evidence.type';
import { saveErrorMessage } from '@utils/bugStore';
import { exportCollage, saveBlob } from '@utils/exportCollage';
import { fillTemplate } from '@utils/text';

/**
 * Downloads the collage preview as PNG/JPG, or as a video when a slot has one. Pass the ref of the preview element.
 * When signed in, a download also saves the bug to history, so a report can't be downloaded and forgotten.
 *
 * @example
 * const { format, setFormat, busy, error, download } = useCollageDownload(previewRef);
 *
 * Used in: CollagePanel
 */
export default function useCollageDownload(previewRef: RefObject<HTMLDivElement | null>) {
    const { state, ticketId, saveBug } = useEvidence();
    const { user } = useAuth();
    const [format, setFormat] = useState<ImageFormat>('png');
    const [busy, setBusy] = useState(false);
    const [error, setError] = useState('');

    async function download() {
        setError('');
        const saves = Boolean(user) && !state.bugId;
        if (saves && !state.title.trim()) {
            setError(translationEN.downloadNeedsTitle);
            return;
        }
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
            if (saves) {
                // Saved after the file is made, because saving swaps the preview files for the uploaded copies.
                await saveBug()
                    .catch((e: unknown) => setError(fillTemplate(translationEN.downloadedNotSaved, { reason: saveErrorMessage(e) })));
            }
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