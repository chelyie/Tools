import { useEffect, useId, type ReactNode } from 'react';

interface ModalProps {
    title: string;
    onClose: () => void;
    children?: ReactNode; // the message
    actions: ReactNode; // the buttons
}

/**
 * Centred popup with a dark backdrop. Closes with Escape or a click on the backdrop.
 *
 * @example
 * <Modal title="Save?" onClose={close} actions={<Button onClick={save}>Save</Button>}>Are you sure?</Modal>
 *
 * Used in: CollagePanel
 */
export default function Modal({ title, onClose, children, actions }: ModalProps) {
    const titleId = useId();

    useEffect(() => {
        function onKey(e: KeyboardEvent) {
            if (e.key === 'Escape') onClose();
        }
        document.addEventListener('keydown', onKey);
        return () => document.removeEventListener('keydown', onKey);
    }, [onClose]);

    return (
        <div className="modal" onPointerDown={(e) => e.target === e.currentTarget && onClose()}>
            <div className="modal__box" role="dialog" aria-modal="true" aria-labelledby={titleId}>
                <h2 className="modal__title" id={titleId}>{title}</h2>
                {children && <p className="modal__text">{children}</p>}
                <div className="modal__actions">{actions}</div>
            </div>
        </div>
    );
}