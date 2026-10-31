import Button from '@components/button/Button';
import ColorSwatches from '@components/form/ColorSwatches';
import { PlusIcon } from '@components/icon/icons';
import { MARK_COLORS } from '@constant/evidence.constant';
import translationEN from '@locales/en';
import type { HighlightToolbarProps } from '@type/BugVerification.type';

export default function HighlightToolbar({ color, onAdd, onColorChange }: HighlightToolbarProps) {
    return (
        <div className="toolbar">
            <Button variant="outline" icon={<PlusIcon size={14} />} onClick={onAdd}>
                {translationEN.addHighlight}
            </Button>
            <ColorSwatches label={translationEN.markColor} colors={MARK_COLORS} value={color} onChange={onColorChange} />
        </div>
    );
}