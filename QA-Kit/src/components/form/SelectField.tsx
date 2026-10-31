interface SelectOption<T extends string> {
    value: T;
    label: string;
}

interface SelectFieldProps<T extends string> {
    label: string; // accessible name
    value: T;
    options: readonly SelectOption<T>[];
    onChange: (value: T) => void;
}

/**
 * Dropdown built from a list of { value, label } options.
 *
 * @example
 * <SelectField label="Format" value={format} options={IMAGE_FORMATS} onChange={setFormat} />
 *
 * Used in: CollageToolbar
 */
export default function SelectField<T extends string>({ label, value, options, onChange }: SelectFieldProps<T>) {
    return (
        <select className="field field--select" aria-label={label} value={value} onChange={(e) => onChange(e.target.value as T)}>
            {options.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
        </select>
    );
}