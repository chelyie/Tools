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
    const { state, saveBug } = useEvidence();
    const [busy, setBusy] = useState(false);
    const [error, setError] = useState('');

    async function save() {
        setBusy(true);
        setError('');
        try {
            await saveBug();
        }
        catch (e) {
            setError(readableError(e));
        }
        setBusy(false);
    }

    return (
        <>
            {state.bugId && <Hint strong>{fillTemplate(translationEN.savedAs, { ticket: state.bugId })}</Hint>}
            <ErrorMessage message={error} />
            <Button variant="outline" onClick={() => void save()} disabled={busy || Boolean(state.bugId)}>
                {busy
                    ? translationEN.saving
                    : state.bugId
                        ? translationEN.savedDone
                        : translationEN.saveBug}
            </Button>
        </>
    );
}