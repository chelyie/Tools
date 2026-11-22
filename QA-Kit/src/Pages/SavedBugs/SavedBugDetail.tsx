import { useEffect, useRef, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import CollageToolbar from '@pages/BugVerification/sections/collage/CollageToolbar';
import ErrorMessage from '@components/feedback/ErrorMessage';
import Hint from '@components/feedback/Hint';
import { SplitIcon } from '@components/icon/icons';
import AccountBar from '@auth/AccountBar';
import AppHeader from '@components/layout/AppHeader';
import PageLayout from '@components/layout/PageLayout';
import translationEN from '@locales/en';
import SavedCollage from '@pages/SavedBugs/SavedCollage';
import type { ImageFormat, SavedBug } from '@type/Evidence.type';
import { getBug } from '@utils/bugStore';
import { exportCollage, saveBlob } from '@utils/exportCollage';
import { fillTemplate } from '@utils/text';

/** One saved bug, read-only. */
export default function SavedBugDetail() {
    const { bugId = '' } = useParams();
    const [bug, setBug] = useState<SavedBug | null | undefined>(undefined);
    const [error, setError] = useState('');
    const [format, setFormat] = useState<ImageFormat>('png');
    const [busy, setBusy] = useState(false);
    const collageRef = useRef<HTMLDivElement>(null);

    /** Rebuilds the collage from the saved files so it can be downloaded again. */
    async function download() {
        if (!bug) return;
        setError('');
        setBusy(true);
        try {
            const { blob, ext } = await exportCollage({ ticket: bug.bugId, slots: bug.slots, preview: collageRef.current, format });
            saveBlob(blob, `${bug.bugId}.${ext}`);
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

    function eachVideo(fn: (video: HTMLVideoElement) => void) {
        collageRef.current?.querySelectorAll('video')
            .forEach(fn);
    }

    useEffect(() => {
        let active = true;
        getBug(bugId)
            .then((found) => {
                if (active) setBug(found);
            })
            .catch((e: unknown) => {
                if (!active) return;
                setError((e as { code?: string }).code === 'permission-denied'
                    ? translationEN.notOnTeamList
                    : translationEN.loadFailed);
                setBug(null);
            });
        return () => {
            active = false;
        };
    }, [bugId]);

    const header = (
        <AppHeader
            title={bugId}
            icon={<SplitIcon size={20} />}
            actions={(
                <>
                    <Link to="/bugs" className="btn btn--outline">{translationEN.backToList}</Link>
                    <AccountBar />
                </>
            )}
        />
    );

    return (
        <PageLayout header={header}>
            <div className="saved-view">
                {bug === undefined && <Hint>{translationEN.loading}</Hint>}
                {bug === null && !error && <Hint>{translationEN.bugNotFound}</Hint>}
                <ErrorMessage message={error} />
                {bug && (
                    <>
                        <Hint>
                            {fillTemplate(translationEN.savedBy, { email: bug.ownerEmail })}
                            {' · '}
                            {new Date(bug.updatedAt)
                                .toLocaleString()}
                        </Hint>
                        <div className="row row--end">
                            <CollageToolbar
                                hasVideo={bug.slots.some((s) => s.kind === 'video')}
                                saveLabel={translationEN.downloadAgain}
                                format={format}
                                busy={busy}
                                onFormatChange={setFormat}
                                onDownload={() => void download()}
                                onPlayAll={() => eachVideo((v) => {
                                    v.currentTime = 0;
                                    void v.play();
                                })}
                                onPauseAll={() => eachVideo((v) => v.pause())}
                            />
                        </div>
                        <SavedCollage bug={bug} ref={collageRef} />
                    </>
                )}
            </div>
        </PageLayout>
    );
}