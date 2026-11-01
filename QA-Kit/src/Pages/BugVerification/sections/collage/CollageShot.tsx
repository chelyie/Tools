import IconButton from '@components/button/IconButton';
import { XIcon } from '@components/icon/icons';
import MarkOverlay from '@components/media/MarkOverlay';
import MediaView from '@components/media/MediaView';
import translationEN from '@locales/en';
import { classMerge } from '@utils/classMerge';
import { layoutRatio, slotDisplayLabel } from '@utils/slot';
import { fillTemplate } from '@utils/text';
import type { CollageShotProps } from '@type/BugVerification.type';

/** One labelled file in the collage preview. */
export default function CollageShot({ slot, index, onRemove }: CollageShotProps) {
    const label = slotDisplayLabel(slot, index);
    const ratio = layoutRatio(slot);

    return (
        <figure className="shot" style={{ flex: `${ratio} 1 0` }}>
            <figcaption>
                <span className={classMerge('shot__label', !slot.label.trim() && 'is-empty')}>{label}</span>
            </figcaption>
            <div className="frame" style={{ aspectRatio: ratio }}>
                {slot.kind === ''
                    ? <span className="shot__empty">{fillTemplate(translationEN.noFileYet, { label })}</span>
                    : (
                        <>
                            <MediaView url={slot.url} kind={slot.kind} alt={label} controls />
                            <MarkOverlay marks={slot.marks} />
                            <IconButton className="shot__remove" label={fillTemplate(translationEN.removeFileFrom, { label })} onClick={onRemove}>
                                <XIcon size={16} strokeWidth={2.6} />
                            </IconButton>
                        </>
                    )}
            </div>
        </figure>
    );
}