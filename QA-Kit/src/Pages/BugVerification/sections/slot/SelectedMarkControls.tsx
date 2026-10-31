import Button from '@components/button/Button';
import InputField from '@components/form/InputField';
import translationEN from '@locales/en';
import type { SelectedMarkControlsProps } from '@type/BugVerification.type';

/** Number and delete controls for the highlight box being edited. */
export default function SelectedMarkControls({ mark, onChange, onRemove }: SelectedMarkControlsProps) {
    return (
        <div className="row row--between row--center">
            <InputField
                label={translationEN.markNumber}
                groupClassName="field-group--inline"
                className="field--num"
                type="number"
                min={1}
                max={99}
                value={mark.num}
                onChange={(e) => onChange({ num: Math.max(1, Number(e.target.value) || 1) })}
            />
            <Button variant="danger" onClick={onRemove}>
                {translationEN.removeHighlight}
            </Button>
        </div>
    );
}