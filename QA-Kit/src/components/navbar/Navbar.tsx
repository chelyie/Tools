import {HTMLAttributesDivElement} from '@type/index.type';
import {classMerge} from '@utils/classMerge';

export interface NavbarProps extends HTMLAttributesDivElement {
    //Content in the left side of the navbar
    leftContent?: React.ReactNode;

    //Content in the right side of the navbar
    rightContent?: React.ReactNode;
}

export default function Navbar ({
    className,
    leftContent,
    rightContent,  
    ...props
}: NavbarProps) {
    return (
        <div
            className={classMerge(
                'tw_w-full tw_h-16 tw_flex tw_items-center tw_justify-between tw_px-4 tw_bg-gray-800',
                className
            )}
            {...props}
        >
            <div className="tw_flex tw_gap-4 tw_items-center">
                {leftContent}
            </div>
            <div className="tw_flex tw_gap-4">
                {rightContent}
            </div>
        </div>
    );
}