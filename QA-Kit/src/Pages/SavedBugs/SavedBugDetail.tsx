import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import ErrorMessage from '@components/feedback/ErrorMessage';
import Hint from '@components/feedback/Hint';
import { SplitIcon } from '@components/icon/icons';
import AccountBar from '@components/layout/AccountBar';
import AppHeader from '@components/layout/AppHeader';
import PageLayout from '@components/layout/PageLayout';
import translationEN from '@locales/en';
import SavedCollage from '@pages/SavedBugs/SavedCollage';
import type { SavedBug } from '@type/Evidence.type';
import { getBug } from '@utils/bugStore';
import { fillTemplate } from '@utils/text';

/** One saved bug, read-only. */
export default function SavedBugDetail() {
    const { bugId = '' } = useParams();
    const [bug, setBug] = useState<SavedBug | null | undefined>(undefined);
    const [error, setError] = useState('');

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
                        <SavedCollage bug={bug} />
                    </>
                )}
            </div>
        </PageLayout>
    );
}