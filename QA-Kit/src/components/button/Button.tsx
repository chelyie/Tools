import { ButtonProps } from '@type/Button.type';
import { classMerge } from '@utils/classMerge';
import { BUTTON_STYLE, BUTTON_SIZE, BUTTON_RADIUS } from '@constant/buttonstyle.constant';

export default function Button({
    className,
    variant = 'primary',
    size = 'md',
    fullWidth = false,
    disabled,
    children,
    style,
    ...props
}: ButtonProps) {
    const variantKey = variant.toUpperCase() as keyof typeof BUTTON_STYLE;
    const sizeKey = size.toUpperCase() as keyof typeof BUTTON_SIZE;

    const variantStyle = BUTTON_STYLE[variantKey];
    const sizeStyle = BUTTON_SIZE[sizeKey];

    return (
        <button
            disabled={disabled}
            className={classMerge(
                'tw_inline-flex tw_items-center tw_justify-center tw_font-semibold tw_cursor-pointer',
                'tw_transition-colors tw_duration-150',
                'disabled:tw_opacity-40 disabled:tw_cursor-not-allowed',
                fullWidth && 'tw_w-full',
                className
            )}
            style={{
                borderRadius: BUTTON_RADIUS,
                ...variantStyle,
                ...sizeStyle,
                ...style
            }}
            {...props}
        >
            {children}
        </button>
    );
}