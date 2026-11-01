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
 * When signed in, a download also saves the bug to history and then resets the page for the next report,
 * so a report can't be downloaded and forgotten.
 *
 * @example
 * const { format, setFormat, busy, error, notice, download } = useCollageDownload(previewRef);
 *
 * Used in: CollagePanel
 */
export default function useCollageDownload(previewRef: RefObject<HTMLDivElement | null>) {
    const { state, ticketId, saveBug, newBug } = useEvidence();
    const { user } = useAuth();
    const [format, setFormat] = useState<ImageFormat>('png');
    const [busy, setBusy] = useState(false);
    const [error, setError] = useState('');
    const [notice, setNotice] = useState('');

    async function download() {
        setError('');
        setNotice('');
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
                try {
                    const bugId = await saveBug();
                    newBug();
                    setNotice(fillTemplate(translationEN.savedAs, { ticket: bugId }));
                }
                catch (e) {
                    setError(fillTemplate(translationEN.downloadedNotSaved, { reason: saveErrorMessage(e) }));
                }
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

    return { format, setFormat, busy, error, notice, download };
}