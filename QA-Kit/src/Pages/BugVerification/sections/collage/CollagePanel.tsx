import { useRef } from 'react';
import ErrorMessage from '@components/feedback/ErrorMessage';
import Hint from '@components/feedback/Hint';
import useEvidence from '@hooks/useEvidence';
import translationEN from '@locales/en';
import CollagePreview from '@pages/BugVerification/sections/collage/CollagePreview';
import CollageToolbar from '@pages/BugVerification/sections/collage/CollageToolbar';
import useCollageDownload from '@hooks/useCollageDownload';
import { fillTemplate } from '@utils/text';

export default function CollagePanel() {
    const { state } = useEvidence();
    const previewRef = useRef<HTMLDivElement>(null);
    const { format, setFormat, busy, error, download } = useCollageDownload(previewRef);
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
                    format={format}
                    busy={busy}
                    onFormatChange={setFormat}
                    onDownload={download}
                    onPlayAll={() => eachVideo((v) => {
                        v.currentTime = 0;
                        void v.play();
                    })}
                    onPauseAll={() => eachVideo((v) => v.pause())}
                />
            </div>

            <CollagePreview ref={previewRef} />
            <ErrorMessage message={error} />
            {state.bugId && <Hint strong>{fillTemplate(translationEN.savedAs, { ticket: state.bugId })}</Hint>}
        </section>
    );
}