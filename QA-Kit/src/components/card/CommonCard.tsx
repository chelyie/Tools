import { forwardRef, type ReactNode } from 'react';
import Card, { type CardProps } from './Card';
import CardHeader, { type CardHeaderProps } from './CardHeader';

export interface CommonCardProps extends CardProps {
    // Optional properties passed to the card header.
    cardHeaderProps?: CardHeaderProps;
    children?: ReactNode;
}

// Reusable card that combines the base card and optional header components.
const CommonCard = forwardRef<HTMLDivElement, CommonCardProps>(({
    cardHeaderProps,
    children,
    ...props
}, ref) => {
    return (
        <Card
            ref={ref}
            {...props}
        >
            {cardHeaderProps && <CardHeader {...cardHeaderProps} />}
            {children}
        </Card>
    );
});

CommonCard.displayName = 'CommonCard';

export default CommonCard;