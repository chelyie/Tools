import { useId, type ComponentPropsWithoutRef, type ReactNode } from 'react';
import { classMerge } from '@utils/classMerge';

interface CardProps extends Omit<ComponentPropsWithoutRef<'section'>, 'title'> {
    title?: ReactNode;
    actions?: ReactNode; // e.g. a count or buttons in the header
    headingLevel?: 'h2' | 'h3' | 'h4'; // keep the heading hierarchy correct
}

/**
 * White box with an optional title and header actions. Use it to group a section of a page.
 *
 * @example
 * <Card title="1. Bug details" actions={<Hint>2 items</Hint>}>...</Card>
 *
 * Used in: BugDetailsSection, SlotsSection
 */
export default function Card({ title, actions, headingLevel: Heading = 'h2', className, children, ...rest }: CardProps) {
    const titleId = useId();

    return (
        <section
            className={classMerge('card', className)}
            aria-labelledby={title
                ? titleId
                : undefined}
            {...rest}
        >
            {(title || actions) && (
                <header className="card__header">
                    {title && <Heading id={titleId} className="card__title">{title}</Heading>}
                    {actions && <div className="card__actions">{actions}</div>}
                </header>
            )}
            {children}
        </section>
    );
}