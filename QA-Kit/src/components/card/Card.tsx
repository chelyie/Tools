import { CardProps } from '@type/Card.type';
import { classMerge } from '@utils/classMerge';
import { CARD_STYLE, CARD_RADIUS, CARD_PADDING } from '@constant/cardstyle.constant';
import { useState } from 'react';

export default function Card({
    className,
    title,
    subtitle,
    children,
    footer,
    interactive = false,
    dashed = false,
    style,
    ...props
}: CardProps) {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <div
            className={classMerge(
                'tw_flex tw_flex-col',
                interactive && 'tw_cursor-pointer tw_transition-transform tw_duration-150',
                className
            )}
            style={{
                borderRadius: CARD_RADIUS,
                padding: CARD_PADDING,
                ...(dashed ? CARD_STYLE.DASHED : CARD_STYLE.DEFAULT),
                ...(interactive && isHovered && CARD_STYLE.INTERACTIVE_HOVER),
                ...style
            }}
            onMouseEnter={() => interactive && setIsHovered(true)}
            onMouseLeave={() => interactive && setIsHovered(false)}
            {...props}
        >
            <div className="tw_flex tw_flex-col tw_items-center tw_justify-center tw_flex-1 tw_text-center">
                {title && (
                    <h3
                        className={classMerge(
                            'tw_font-semibold tw_text-base tw_text-ink dark:tw_text-ink-light',
                            Boolean(subtitle) && 'tw_mb-1'
                        )}
                    >
                        {title}
                    </h3>
                )}

                {subtitle && (
                    <p className="tw_text-sm tw_text-ink-soft dark:tw_text-ink-lightsoft">
                        {subtitle}
                    </p>
                )}

                {children && <div className="tw_w-full">{children}</div>}
            </div>

            {footer && (
                <div className="tw_flex tw_gap-2 tw_mt-4 tw_pt-4 tw_border-t tw_border-border dark:tw_border-border-dark">
                    {footer}
                </div>
            )}
        </div>
    );
}