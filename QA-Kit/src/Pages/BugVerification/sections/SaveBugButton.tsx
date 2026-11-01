import { useState } from 'react';
import Button from '@components/button/Button';
import ErrorMessage from '@components/feedback/ErrorMessage';
import Hint from '@components/feedback/Hint';
import useEvidence from '@hooks/useEvidence';
import translationEN from '@locales/en';
import { fillTemplate } from '@utils/text';

function readableError(e: unknown): string {
    if ((e as { code?: string }).code === 'permission-denied') return translationEN.notOnTeamList;
    return e instanceof Error && e.message
        ? e.message
        : translationEN.saveFailed;
}

/** Uploads the files and saves the bug for the team, then says which ticket it was saved as. */
export default function SaveBugButton() {
    const { saveBug } = useEvidence();
    const [busy, setBusy] = useState(false);
    const [saved, setSaved] = useState('');
    const [error, setError] = useState('');

    async function save() {
        setBusy(true);
        setSaved('');
        setError('');
        try {
            setSaved(fillTemplate(translationEN.savedAs, { ticket: await saveBug() }));
        }
        catch (e) {
            setError(readableError(e));
        }
        setBusy(false);
    }

    return (
        <>
            {saved && <Hint strong>{saved}</Hint>}
            <ErrorMessage message={error} />
            <Button variant="outline" onClick={() => void save()} disabled={busy}>
                {busy
                    ? translationEN.saving
                    : translationEN.saveBug}
            </Button>
        </>
    );
}