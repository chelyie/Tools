import Hint from '@components/feedback/Hint';
import { SLOTS_PER_ROW } from '@constant/evidence.constant';
import useEvidence from '@hooks/useEvidence';
import CollageShot from '@pages/BugVerification/sections/collage/CollageShot';
import { toRows } from '@utils/slot';
import type { CollagePreviewProps } from '@type/BugVerification.type';

/** The collage card exactly as it will be downloaded. */
export default function CollagePreview({ ref }: CollagePreviewProps) {
    const { state, ticketId, clearSlot } = useEvidence();
    const title = state.title.trim();

    return (
        <div className="card card--collage" ref={ref}>
            <div className="collage-head__text">
                <div><Hint strong>{ticketId}</Hint></div>
                {title && <div className="collage-title">{title}</div>}
            </div>

            <div className="collage-grid">
                {toRows(state.slots, SLOTS_PER_ROW)
                    .map((row) => (
                    // Widths follow each file's shape, so every card in a row gets the same height.
                        <div className="collage-row" key={row[0].slot.id}>
                            {row.map(({ slot, index }) => (
                                <CollageShot key={slot.id} slot={slot} index={index} onRemove={() => clearSlot(slot.id)} />
                            ))}
                        </div>
                    ))}
            </div>
        </div>
    );
}