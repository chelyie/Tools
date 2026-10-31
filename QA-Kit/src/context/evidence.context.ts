import { createContext } from 'react';
import type { EvidenceState, Mark } from '@type/Evidence.type';

export interface EvidenceContextValue {
    state: EvidenceState;
    ticketId: string;
    setTitle: (title: string) => void;
    setSlotLabel: (id: number, label: string) => void;

    /** Returns an error message when the file can't be used. */
    setSlotFile: (id: number, file: File | undefined) => string | null;
    clearSlot: (id: number) => void;
    addSlot: () => void;
    removeSlot: (id: number) => void;

    /** Returns the id of the new mark so the editor can select it. */
    addMark: (slotId: number, color?: string) => number;
    updateMark: (slotId: number, markId: number, patch: Partial<Mark>) => void;
    removeMark: (slotId: number, markId: number) => void;
    newBug: () => void;
}

export const EvidenceContext = createContext<EvidenceContextValue | undefined>(undefined);