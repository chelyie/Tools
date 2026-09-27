import type { ButtonHTMLAttributes } from 'react';

export type ButtonVariant = 'primary' | 'ghost' | 'outline' | 'text';
export type ButtonSize = 'sm' | 'md';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    //Visual style of the button
    variant?: ButtonVariant;

    //Compact (sm) or default (md) sizing
    size?: ButtonSize;

    //Full width of its container
    fullWidth?: boolean;

    //Button label / content
    children?: React.ReactNode;
}