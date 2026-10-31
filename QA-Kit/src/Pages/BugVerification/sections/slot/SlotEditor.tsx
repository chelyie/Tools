import { useState } from 'react';
import IconButton from '@components/button/IconButton';
import ErrorMessage from '@components/feedback/ErrorMessage';
import Hint from '@components/feedback/Hint';
import DropZone from '@components/file/DropZone';
import InputField from '@components/form/InputField';
import { TrashIcon, UploadIcon } from '@components/icon/icons';
import { ACCEPT_MEDIA, LOCKED_SLOTS, MARK_COLORS } from '@constant/evidence.constant';
import useEvidence from '@hooks/useEvidence';
import translationEN from '@locales/en';
import HighlightToolbar from '@pages/BugVerification/sections/slot/HighlightToolbar';
import SelectedMarkControls from '@pages/BugVerification/sections/slot/SelectedMarkControls';
import SlotFileActions from '@pages/BugVerification/sections/slot/SlotFileActions';
import SlotMediaFrame from '@pages/BugVerification/sections/slot/SlotMediaFrame';
import { slotDisplayLabel, slotLetter } from '@utils/slot';
import { fillTemplate } from '@utils/text';
import type { SlotEditorProps } from '@type/BugVerification.type';

/** Label, upload and highlight editing for one comparison slot. */
export default function SlotEditor({ slot, index }: SlotEditorProps) {
    const { setSlotLabel, setSlotFile, clearSlot, removeSlot, addMark, updateMark, removeMark } = useEvidence();
    const [error, setError] = useState('');
    const [selectedId, setSelectedId] = useState<number | null>(null);
    const [color, setColor] = useState(MARK_COLORS[0].color);
    const letter = slotLetter(index);
    const hasMedia = slot.kind !== '';
    const canRemove = index >= LOCKED_SLOTS; // only the Bug card stays in place
    const selected = slot.marks.find((m) => m.id === selectedId) ?? null;

    function acceptFile(file: File | undefined) {
        setError(setSlotFile(slot.id, file) ?? '');
    }

    function pickColor(c: string) {
        setColor(c);
        if (selected) updateMark(slot.id, selected.id, { color: c });
    }

    function clearFile() {
        clearSlot(slot.id);
        setSelectedId(null);
    }

    function deleteSelected(markId: number) {
        removeMark(slot.id, markId);
        setSelectedId(null);
    }

    return (
        <div className="slot">
            <div className="row row--center row--end">
                <InputField
                    label={translationEN.slotLabel}
                    groupClassName="field-group--grow field-group--small"
                    placeholder={translationEN.slotLabelPlaceholder}
                    value={slot.label}
                    onChange={(e) => setSlotLabel(slot.id, e.target.value)}
                />
                {canRemove && (
                    <IconButton label={fillTemplate(translationEN.removeSlot, { letter })} onClick={() => removeSlot(slot.id)}>
                        <TrashIcon size={18} />
                    </IconButton>
                )}
            </div>

            {hasMedia
                ? (
                    <SlotMediaFrame
                        slot={slot}
                        alt={slotDisplayLabel(slot, index)}
                        selectedId={selectedId}
                        onSelect={setSelectedId}
                        onFile={acceptFile}
                    />
                )
                : (
                    <DropZone
                        title={translationEN.dropTitle}
                        hint={translationEN.dropHint}
                        icon={<UploadIcon size={28} stroke="#2F5BEA" />}
                        accept={ACCEPT_MEDIA}
                        label={fillTemplate(translationEN.uploadForSlot, { letter })}
                        onFile={acceptFile}
                    />
                )}

            <ErrorMessage message={error} />

            {hasMedia && (
                <>
                    <HighlightToolbar
                        color={selected?.color ?? color}
                        onAdd={() => setSelectedId(addMark(slot.id, color))}
                        onColorChange={pickColor}
                    />
                    {selected
                        ? (
                            <SelectedMarkControls
                                mark={selected}
                                onChange={(patch) => updateMark(slot.id, selected.id, patch)}
                                onRemove={() => deleteSelected(selected.id)}
                            />
                        )
                        : slot.marks.length > 0 && <Hint>{translationEN.highlightHelp}</Hint>}
                    <SlotFileActions slot={slot} onFile={acceptFile} onClear={clearFile} />
                </>
            )}
        </div>
    );
}