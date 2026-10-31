import Button from '@components/button/Button';
import Card from '@components/card/Card';
import Hint from '@components/feedback/Hint';
import { PlusIcon } from '@components/icon/icons';
import { MAX_SLOTS } from '@constant/evidence.constant';
import useEvidence from '@hooks/useEvidence';
import translationEN from '@locales/en';
import SlotEditor from '@pages/BugVerification/sections/slot/SlotEditor';
import { fillTemplate } from '@utils/text';

export default function SlotsSection() {
    const { state, addSlot } = useEvidence();
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