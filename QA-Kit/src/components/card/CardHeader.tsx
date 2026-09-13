import { forwardRef, type ReactNode } from 'react';
import { classMerge } from '@utils/classMerge';

export interface CardHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
    children?: ReactNode;
}

// Optional header section displayed at the top of a card.
const CardHeader = forwardRef<HTMLDivElement, CardHeaderProps>(
    ({ className, children, ...props }, ref) => (
        <div
            ref={ref}
            className={classMerge('tw_mb-4', className)}
            {...props}
        >
            {children}
        </div>
    )
);

CardHeader.displayName = 'CardHeader';

export default CardHeader;