import Hint from '@components/feedback/Hint';
import MarkOverlay from '@components/media/MarkOverlay';
import MediaView from '@components/media/MediaView';
import { SLOTS_PER_ROW } from '@constant/evidence.constant';
import translationEN from '@locales/en';
import type { SavedBug } from '@type/Evidence.type';
import { layoutRatio, slotDisplayLabel, toRows } from '@utils/slot';
import { fillTemplate } from '@utils/text';
import { formatTicket } from '@utils/ticket';

/** A saved bug laid out like the collage preview, for looking at only (nothing can be changed). */
export default function SavedCollage({ bug }: { bug: SavedBug }) {
    return (
        <div className="card card--collage">
            <div className="collage-head__text">
                <div><Hint strong>{formatTicket(bug.ticketNo, bug.ticketDay)}</Hint></div>
                {bug.title && <div className="collage-title">{bug.title}</div>}
            </div>

            <div className="collage-grid">
                {toRows(bug.slots, SLOTS_PER_ROW)
                    .map((row) => (
                        <div className="collage-row" key={row[0].slot.id}>
                            {row.map(({ slot, index }) => {
                                const label = slotDisplayLabel(slot, index);
                                const ratio = layoutRatio(slot);
                                return (
                                    <figure className="shot" key={slot.id} style={{ flex: `${ratio} 1 0` }}>
                                        <figcaption><span className="shot__label">{label}</span></figcaption>
                                        <div className="frame" style={{ aspectRatio: ratio }}>
                                            {slot.kind === ''
                                                ? <span className="shot__empty">{fillTemplate(translationEN.noFileYet, { label })}</span>
                                                : (
                                                    <>
                                                        <MediaView url={slot.url} kind={slot.kind} alt={label} controls />
                                                        <MarkOverlay marks={slot.marks} />
                                                    </>
                                                )}
                                        </div>
                                    </figure>
                                );
                            })}
                        </div>
                    ))}
            </div>
        </div>
    );
}