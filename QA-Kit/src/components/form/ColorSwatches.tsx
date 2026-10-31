interface Swatch {
    color: string;
    name: string;
}

interface ColorSwatchesProps {
    label: string; // accessible name of the group
    colors: readonly Swatch[];
    value: string;
    onChange: (color: string) => void;
}

/**
 * Row of color buttons for picking one color.
 *
 * @example
 * <ColorSwatches label="Color" colors={MARK_COLORS} value={color} onChange={setColor} />
 *
 * Used in: HighlightToolbar
 */
export default function ColorSwatches({ label, colors, value, onChange }: ColorSwatchesProps) {
    return (
        <div role="group" aria-label={label} className="swatches">
            {colors.map((c) => (
                <button
                    key={c.color}
                    type="button"
                    className="swatch"
                    style={{ background: c.color }}
                    aria-label={c.name}
                    aria-pressed={value === c.color}
                    onClick={() => onChange(c.color)}
                />
            ))}
        </div>
    );
}