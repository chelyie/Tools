import type { InputHTMLAttributes, ReactNode } from 'react';
import { classMerge } from '@utils/classMerge';

interface InputFieldProps extends InputHTMLAttributes<HTMLInputElement> {
    label: ReactNode;
    groupClassName?: string; // layout modifiers for the label wrapper
}

/**
 * Text or number input with a label above it. Accepts every normal <input> prop.
 *
 * @example
 * <InputField label="Bug title" value={title} onChange={(e) => setTitle(e.target.value)} />
 *
 * Used in: BugDetailsSection, SlotEditor, SelectedMarkControls
 */
export default function InputField({ label, groupClassName, className, type = 'text', ...rest }: InputFieldProps) {
    return (
        <label className={classMerge('field-group', groupClassName)}>
            {label}
            <input className={classMerge('field', className)} type={type} {...rest} />
        </label>
    );
}