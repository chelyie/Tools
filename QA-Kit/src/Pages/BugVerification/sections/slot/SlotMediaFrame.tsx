import MarkOverlay from '@components/media/MarkOverlay';
import MediaView from '@components/media/MediaView';
import { EDITOR_MAX_HEIGHT } from '@constant/evidence.constant';
import useEvidence from '@hooks/useEvidence';
import { fileDropHandlers } from '@utils/fileInput';
import { layoutRatio } from '@utils/slot';
import type { SlotMediaFrameProps } from '@type/BugVerification.type';

/** The uploaded file with its editable highlight boxes. */
export default function SlotMediaFrame({ slot, alt, selectedId, onSelect, onFile }: SlotMediaFrameProps) {
    const { updateMark } = useEvidence();
    if (slot.kind === '') return null;
    const ratio = layoutRatio(slot);

    return (
        <div
            className="frame frame--editor"
            style={{ aspectRatio: ratio, width: `min(100%, ${EDITOR_MAX_HEIGHT * ratio}px)` }}
            onPointerDown={() => onSelect(null)}
            {...fileDropHandlers(onFile)}
        >
            <MediaView url={slot.url} kind={slot.kind} alt={alt} />
            <MarkOverlay marks={slot.marks} selectedId={selectedId} onSelect={onSelect} onChange={(id, patch) => updateMark(slot.id, id, patch)} />
        </div>
    );
}