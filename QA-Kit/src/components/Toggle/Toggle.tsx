import {ToggleProps} from '@type/Toggle.type';
import {TOGGLE_STYLE} from '@constant/togglestyle.constant';
import {classMerge} from '@utils/classMerge';

export default function Toggle({options, value, onChange, className}: ToggleProps) {
    return (
        <div
            className={classMerge('tw_inline-flex', className)}
            style={TOGGLE_STYLE.WRAPPER}
        >
            {options.map((option) => {
                const isActive = option.value === value;
                return (
                    <button
                        key={option.value}
                        type="button"
                        aria-pressed={isActive}
                        onClick={() => onChange(option.value)}
                        style={{
                            ...TOGGLE_STYLE.BUTTON,
                            ...(isActive && TOGGLE_STYLE.BUTTON_ACTIVE)
                        }}
                    >
                        {option.label}
                    </button>
                );
            })}
        </div>
    );
}