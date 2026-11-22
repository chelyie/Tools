import { useEffect } from 'react';
import Button from '@components/button/Button';
import Card from '@components/card/Card';
import Hint from '@components/feedback/Hint';
import { PlusIcon } from '@components/icon/icons';
import { MAX_SLOTS } from '@constant/evidence.constant';
import useEvidence from '@hooks/useEvidence';
import translationEN from '@locales/en';
import SlotEditor from '@pages/BugVerification/sections/slot/SlotEditor';
import { pastedFile } from '@utils/fileInput';
import { fillTemplate } from '@utils/text';

export default function SlotsSection() {
    const { state, addSlot, setSlotFile } = useEvidence();

    // Paste anywhere on the page (outside a card): the picture goes into the first empty card.
    useEffect(() => {
        function onPaste(e: ClipboardEvent) {
            if ((e.target as HTMLElement | null)?.closest('.slot')) return; // the card handles its own paste
            const file = pastedFile(e.clipboardData);
            const empty = state.slots.find((s) => s.kind === '');
            if (!file || !empty) return;
            e.preventDefault();
            setSlotFile(empty.id, file);
        }
        document.addEventListener('paste', onPaste);
        return () => document.removeEventListener('paste', onPaste);
    }, [state.slots, setSlotFile]);
    const count = state.slots.length;
    const countText = fillTemplate(count === 1
        ? translationEN.itemCountOne
        : translationEN.itemCount, { count });

    return (
        <Card title={translationEN.slotsTitle} actions={<Hint>{countText}</Hint>}>
            {state.slots.map((slot, index) => <SlotEditor key={slot.id} slot={slot} index={index} />)}
            {count < MAX_SLOTS && (
                <Button
                    variant="dashed"
                    icon={<span className="plus-badge"><PlusIcon size={16} strokeWidth={2.6} /></span>}
                    onClick={addSlot}
                    aria-label={translationEN.addComparisonLabel}
                >
                    {translationEN.addComparison}
                </Button>
            )}
        </Card>
    );
}