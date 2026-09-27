import {HTMLAttributesDivElement} from '@type/index.type';

export interface CardProps extends Omit<HTMLAttributesDivElement, 'title'> {
    //Optional icon shown above the title (e.g. an emoji or <Icon />)
    icon?: React.ReactNode;

    //Card title
    title?: React.ReactNode;

    //Small muted text under the title
    subtitle?: React.ReactNode;

    //Main body content
    children?: React.ReactNode;

    //Footer area — actions, buttons, links
    footer?: React.ReactNode;

    //Makes the whole card clickable (hover lift + pointer cursor)
    interactive?: boolean;

    //Dashed border style, for empty/upload-style slots
    dashed?: boolean;
}