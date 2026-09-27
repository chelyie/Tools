import {HTMLAttributesDivElement} from '@type/index.type';
import {classMerge} from '@utils/classMerge';

export interface NavbarProps extends HTMLAttributesDivElement {
    //Content in the left side of the navbar
    leftContent?: React.ReactNode;

    //Content in the center of the navbar (e.g. Picture/Video pill toggle)
    centerContent?: React.ReactNode;

    //Content in the right side of the navbar
    rightContent?: React.ReactNode;
}

export default function Navbar ({
    className,
    leftContent,
    centerContent,
    rightContent,
    ...props
}: NavbarProps) {
    return (
        <div
            className={classMerge(
                'tw_sticky tw_top-0 tw_z-10 tw_w-full tw_min-h-16 tw_grid tw_grid-cols-[1fr_auto_1fr] tw_items-center tw_gap-4 tw_px-4',
                'tw_pt-[env(safe-area-inset-top,0px)]',
                'tw_bg-white dark:tw_bg-pink-900 tw_border-b tw_border-border dark:tw_border-border-dark',
                className
            )}
            {...props}
        >
            <div className="tw_flex tw_gap-4 tw_items-center tw_shrink-0">
                {leftContent}
            </div>
            {centerContent && (
                <div className="tw_flex tw_gap-4 tw_items-center tw_justify-center">
                    {centerContent}
                </div>
            )}
            <div className="tw_flex tw_gap-4 tw_items-center tw_justify-self-end tw_shrink-0">
                {rightContent}
            </div>
        </div>
    );
}