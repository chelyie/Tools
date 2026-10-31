import Button from '@components/button/Button';
import FileButton from '@components/button/FileButton';
import Hint from '@components/feedback/Hint';
import { ACCEPT_MEDIA } from '@constant/evidence.constant';
import translationEN from '@locales/en';
import type { SlotFileActionsProps } from '@type/BugVerification.type';

/** File name plus replace and clear buttons. */
export default function SlotFileActions({ slot, onFile, onClear }: SlotFileActionsProps) {
    const kindText = slot.kind === 'video'
        ? translationEN.mediaVideo
        : translationEN.mediaImage;

    return (
        <>
            <Hint truncate>{slot.fileName} · {kindText}</Hint>
            <div className="slot-actions">
                <FileButton accept={ACCEPT_MEDIA} label={translationEN.replaceFile} onFile={onFile}>
                    {translationEN.replaceFile}
                </FileButton>
                <Button variant="danger" onClick={onClear}>
                    {translationEN.clearFile}
                </Button>
            </div>
        </>
    );
}