import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Card from '@components/card/Card';
import ErrorMessage from '@components/feedback/ErrorMessage';
import Hint from '@components/feedback/Hint';
import { SplitIcon } from '@components/icon/icons';
import AccountBar from '@components/layout/AccountBar';
import AppHeader from '@components/layout/AppHeader';
import PageLayout from '@components/layout/PageLayout';
import translationEN from '@locales/en';
import type { SavedBug } from '@type/Evidence.type';
import { listBugs } from '@utils/bugStore';
import { formatTicket } from '@utils/ticket';
import { fillTemplate } from '@utils/text';

export default function SavedBugsPage() {
    const [bugs, setBugs] = useState<SavedBug[] | null>(null);
    const [error, setError] = useState('');

    useEffect(() => {
        let active = true;
        listBugs()
            .then((list) => {
                if (active) setBugs(list);
            })
            .catch((e: unknown) => {
                if (!active) return;
                setError((e as { code?: string }).code === 'permission-denied'
                    ? translationEN.notOnTeamList
                    : translationEN.loadFailed);
                setBugs([]);
            });
        return () => {
            active = false;
        };
    }, []);

    const header = (
        <AppHeader
            title={translationEN.savedBugs}
            icon={<SplitIcon size={20} />}
            actions={(
                <>
                    <Link to="/" className="btn btn--outline">{translationEN.backToBug}</Link>
                    <AccountBar />
                </>
            )}
        />
    );

    return (
        <PageLayout header={header}>
            <Card className="card--narrow">
                {bugs === null && <Hint>{translationEN.loading}</Hint>}
                {bugs?.length === 0 && !error && <Hint>{translationEN.noSavedBugs}</Hint>}
                <ErrorMessage message={error} />
                <ul className="saved-list">
                    {bugs?.map((bug) => {
                        const cover = bug.slots.find((s) => s.kind === 'image');
                        return (
                            <li key={bug.bugId} className="saved-item">
                                {cover
                                    ? <img src={cover.url} alt="" className="saved-item__thumb" />
                                    : <span className="saved-item__thumb" aria-hidden="true" />}
                                <div className="saved-item__text">
                                    <strong>{bug.title}</strong>
                                    <Hint truncate>
                                        {formatTicket(bug.ticketNo, bug.ticketDay)}
                                        {' · '}
                                        {fillTemplate(translationEN.savedBy, { email: bug.ownerEmail })}
                                        {' · '}
                                        {new Date(bug.updatedAt)
                                            .toLocaleString()}
                                    </Hint>
                                </div>
                                <Link to={`/bugs/${encodeURIComponent(bug.bugId)}`} className="btn btn--outline">{translationEN.viewBug}</Link>
                            </li>
                        );
                    })}
                </ul>
            </Card>
        </PageLayout>
    );
}