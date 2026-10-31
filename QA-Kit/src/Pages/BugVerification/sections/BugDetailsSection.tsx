import Card from '@components/card/Card';
import InputField from '@components/form/InputField';
import useEvidence from '@hooks/useEvidence';
import translationEN from '@locales/en';

export default function BugDetailsSection() {
    const { state, ticketId, setTitle } = useEvidence();

    return (
        <Card title={translationEN.detailsTitle}>
            <div className="row">
                <InputField
                    label={translationEN.bugTitleLabel}
                    groupClassName="field-group--wide"
                    placeholder={translationEN.bugTitlePlaceholder}
                    value={state.title}
                    onChange={(e) => setTitle(e.target.value)}
                />
                <InputField label={translationEN.ticketLabel} className="field--readonly" readOnly value={ticketId} />
            </div>
        </Card>
    );
}