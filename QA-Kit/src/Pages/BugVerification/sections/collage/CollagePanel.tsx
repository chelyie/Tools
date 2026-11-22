import { useRef, useState } from 'react';
import Button from '@components/button/Button';
import Modal from '@components/modal/Modal';
import useEvidence from '@hooks/useEvidence';
import translationEN from '@locales/en';
import CollagePreview from '@pages/BugVerification/sections/collage/CollagePreview';
import CollageToolbar from '@pages/BugVerification/sections/collage/CollageToolbar';
import useCollageDownload from '@hooks/useCollageDownload';

export default function CollagePanel() {
    const { state } = useEvidence();
    const previewRef = useRef<HTMLDivElement>(null);
    const { format, setFormat, busy, error, notice, canSave, run } = useCollageDownload(previewRef);
    const [confirming, setConfirming] = useState(false);
    const hasVideo = state.slots.some((s) => s.kind === 'video');

    function eachVideo(fn: (video: HTMLVideoElement) => void) {
        previewRef.current?.querySelectorAll('video')
            .forEach(fn);
    }

    return (
        <section className="collage-panel" aria-label={translationEN.previewTitle}>
            <div className="row row--between row--center">
                <h2 className="card__title">{translationEN.previewTitle}</h2>
                <CollageToolbar
                    hasVideo={hasVideo}
                    saveLabel={translationEN.save}
                    format={format}
                    busy={busy}
                    onFormatChange={setFormat}
                    onDownload={() => setConfirming(true)}
                    onPlayAll={() => eachVideo((v) => {
                        v.currentTime = 0;
                        void v.play();
                    })}
                    onPauseAll={() => eachVideo((v) => v.pause())}
                />
            </div>

            {notice && <p className="notice" role="status">{notice}</p>}
            {error && <p className="notice notice--error" role="alert">{error}</p>}

            <CollagePreview ref={previewRef} />

            {confirming && (
                <Modal
                    title={canSave
                        ? translationEN.saveDialogTitle
                        : translationEN.downloadDialogTitle}
                    onClose={() => setConfirming(false)}
                    actions={(
                        <>
                            <Button variant="outline" onClick={() => setConfirming(false)}>{translationEN.cancel}</Button>
                            {canSave && (
                                <Button
                                    variant="outline"
                                    onClick={() => {
                                        setConfirming(false);
                                        void run(false);
                                    }}
                                >
                                    {translationEN.saveOnly}
                                </Button>
                            )}
                            <Button
                                onClick={() => {
                                    setConfirming(false);
                                    void run(true);
                                }}
                            >
                                {canSave
                                    ? translationEN.saveAndDownload
                                    : translationEN.download}
                            </Button>
                        </>
                    )}
                >
                    {canSave
                        ? translationEN.saveDialogText
                        : translationEN.downloadDialogText}
                </Modal>
            )}
        </section>
    );
}