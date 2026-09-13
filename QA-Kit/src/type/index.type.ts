import {
    CSSProperties,
    Dispatch,
    FocusEvent,
    HTMLAttributes,
    KeyboardEvent,
    MouseEvent,
    RefObject,
    SetStateAction,
    SVGProps,
    UIEvent
} from 'react';

// HTML element prop types
export type HTMLAttributesDivElement =
    HTMLAttributes<HTMLDivElement>;

export type HTMLAttributesSpanElement =
    HTMLAttributes<HTMLSpanElement>;

// HTML element / ref types
export type DivElementNull =
    HTMLDivElement | null;

export type RefObjectDivElementNull =
    RefObject<DivElementNull>;

// Event types
export type DivMouseEvent =
    MouseEvent<HTMLDivElement>;

export type DivKeyboardEvent =
    KeyboardEvent<HTMLDivElement>;

export type DivUIEvent =
    UIEvent<HTMLDivElement>;

export type ButtonMouseEvent =
    MouseEvent<HTMLButtonElement>;

export type ButtonFocusEvent =
    FocusEvent<HTMLButtonElement>;

// React state
export type StateProps<T> =
    Dispatch<SetStateAction<T>>;

// React styles
export type ReactStyles =
    CSSProperties;

// SVG / icon types
export type IconSvgProps =
    SVGProps<SVGSVGElement>;

export type IconSvg =
    IconSvgProps & {
        color?: string;
    };