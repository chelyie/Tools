import { useState, type RefObject } from 'react';
import useAuth from '@hooks/useAuth';
import useEvidence from '@hooks/useEvidence';
import translationEN from '@locales/en';
import type { ImageFormat } from '@type/Evidence.type';
import { saveErrorMessage } from '@utils/bugStore';
import { exportCollage, saveBlob } from '@utils/exportCollage';
import { fillTemplate } from '@utils/text';

/**
 * Saves the collage preview to history and/or downloads it as PNG/JPG (a video when a slot has one).
 * Pass the ref of the preview element. When signed in, saving resets the page for the next report.
 *
 * @example
 * const { format, setFormat, busy, error, notice, canSave, run } = useCollageDownload(previewRef);
 * await run(true); // save and download;  run(false) saves only
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
    const canSave = Boolean(user) && !state.bugId;

    async function run(download: boolean) {
        setError('');
        setNotice('');
        setBusy(true);
        try {
            if (download || !canSave) {
                const { blob, ext } = await exportCollage({ ticket: ticketId, slots: state.slots, preview: previewRef.current, format });
                saveBlob(blob, `${ticketId}.${ext}`);
            }
            if (canSave) {
                // Saved after the file is made, because saving swaps the preview files for the uploaded copies.
                try {
                    const bugId = await saveBug();
                    newBug();
                    setNotice(fillTemplate(download
                        ? translationEN.savedAs
                        : translationEN.savedOnly, { ticket: bugId }));
                }
                catch (e) {
                    setError(download
                        ? fillTemplate(translationEN.downloadedNotSaved, { reason: saveErrorMessage(e) })
                        : saveErrorMessage(e));
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

    return { format, setFormat, busy, error, notice, canSave, run };
}