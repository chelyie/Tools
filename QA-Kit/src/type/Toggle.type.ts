export interface ToggleOption {
    label: string;
    value: string;
}

export interface ToggleProps {
    //Available options to switch between
    options: ToggleOption[];

    //Currently active value
    value: string;

    //Called with the newly selected value
    onChange: (value: string) => void;

    className?: string;
}