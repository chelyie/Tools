import { DEFAULT_LABELS, DEFAULT_RATIO, MAX_SLOTS } from '@constant/evidence.constant';
import translationEN from '@locales/en';
import type { EvidenceState, Mark, Slot } from '@type/Evidence.type';
import { slotLetter } from '@utils/slot';
import { fillTemplate } from '@utils/text';
import { todayStamp } from '@utils/ticket';

export type EvidenceAction =
    | { type: 'title'; title: string }
    | { type: 'slotPatch'; id: number; patch: Partial<Slot> }
    | { type: 'slotAdd' }
    | { type: 'slotRemove'; id: number }
    | { type: 'markAdd'; slotId: number; color: string }
    | { type: 'markPatch'; slotId: number; markId: number; patch: Partial<Mark> }
    | { type: 'markRemove'; slotId: number; markId: number }
    | { type: 'reset'; ticketNo: number }
    | { type: 'newDay'; ticketNo: number };

/** Fields that return a slot to its empty, no-file state. */
export const EMPTY_MEDIA: Partial<Slot> = { url: '', kind: '', fileName: '', ratio: DEFAULT_RATIO, marks: [] };

function emptySlot(id: number, label: string): Slot {
    return { id, label, url: '', kind: '', fileName: '', ratio: DEFAULT_RATIO, marks: [] };
}

export function nextMarkId(marks: Mark[]): number {
    return Math.max(0, ...marks.map((m) => m.id)) + 1;
}

export function createState(ticketNo: number): EvidenceState {
    return {
        title: '',
        ticketNo,
        ticketDay: todayStamp(),
        slots: DEFAULT_LABELS.map((label, i) => emptySlot(i + 1, label))
    };
}

function mapSlot(state: EvidenceState, id: number, fn: (s: Slot) => Slot): EvidenceState {
    return { ...state,
        slots: state.slots.map((s) => (s.id === id
            ? fn(s)
            : s)) };
}

export function evidenceReducer(state: EvidenceState, action: EvidenceAction): EvidenceState {
    switch (action.type) {
    case 'title':
        return { ...state, title: action.title };
    case 'slotPatch':
        return mapSlot(state, action.id, (s) => ({ ...s, ...action.patch }));
    case 'slotAdd': {
        if (state.slots.length >= MAX_SLOTS) return state;
        const id = Math.max(...state.slots.map((s) => s.id)) + 1;
        const label = fillTemplate(translationEN.newSlotLabel, { letter: slotLetter(state.slots.length) });
        return { ...state, slots: [...state.slots, emptySlot(id, label)] };
    }
    case 'slotRemove':
        return state.slots.length > 1
            ? { ...state, slots: state.slots.filter((s) => s.id !== action.id) }
            : state;
    case 'markAdd':
        return mapSlot(state, action.slotId, (s) => {
            const num = Math.max(0, ...s.marks.map((m) => m.num)) + 1;
            const offset = (s.marks.length % 5) * 4; // stagger so new boxes don't stack exactly
            const mark: Mark = { id: nextMarkId(s.marks), num, x: 30 + offset, y: 30 + offset, w: 30, h: 24, color: action.color };
            return { ...s, marks: [...s.marks, mark] };
        });
    case 'markPatch':
        return mapSlot(state, action.slotId, (s) => ({
            ...s,
            marks: s.marks.map((m) => (m.id === action.markId
                ? { ...m, ...action.patch }
                : m))
        }));
    case 'markRemove':
        return mapSlot(state, action.slotId, (s) => ({ ...s, marks: s.marks.filter((m) => m.id !== action.markId) }));
    case 'reset':
        return createState(action.ticketNo);
    case 'newDay':
        return { ...state, ticketNo: action.ticketNo, ticketDay: todayStamp() };
    }
}