import { forwardRef, type ReactNode } from 'react';
import { classMerge } from '@utils/classMerge';

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
    children?: ReactNode;
}

// Base card container for content and custom HTML div properties.
const Card = forwardRef<HTMLDivElement, CardProps>(
    ({ className, children, ...props }, ref) => (
        <div
            ref={ref}
            className={classMerge(
                'tw_rounded-lg tw_border tw_bg-white tw_p-4',
                className
            )}
            {...props}
        >
            {children}
        </div>
    )
);

Card.displayName = 'Card';

export default Card;