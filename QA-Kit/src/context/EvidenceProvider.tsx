import {
    useCallback, useEffect, useMemo, useReducer, useRef, type ReactNode
} from 'react';
import { DEFAULT_RATIO, MARK_COLORS } from '@constant/evidence.constant';
import { EvidenceContext } from '@context/evidence.context';
import { createState, EMPTY_MEDIA, evidenceReducer, nextMarkId } from '@context/evidence.reducer';
import translationEN from '@locales/en';
import type { Mark, Slot } from '@type/Evidence.type';
import { getMediaKind, measureMedia, revokeUrl } from '@utils/evidenceFiles';
import { fillTemplate } from '@utils/text';
import { formatTicket, readSequence, todayStamp } from '@utils/ticket';

function revokeSlotUrl(slots: Slot[], id: number) {
    const slot = slots.find((s) => s.id === id);
    if (slot) revokeUrl(slot.url);
}

export default function EvidenceProvider({ children }: { children: ReactNode }) {
    const [state, dispatch] = useReducer(evidenceReducer, undefined, () => createState(readSequence(false)));

    // Callbacks read the latest state here so they can stay stable and release object URLs.
    const stateRef = useRef(state);
    useEffect(() => {
        stateRef.current = state;
    });
    useEffect(() => () => {
        stateRef.current.slots.forEach((s) => revokeUrl(s.url));
    }, []);

    // The day can change while the page stays open: restart the numbering at 1 for the new day.
    useEffect(() => {
        function check() {
            if (stateRef.current.ticketDay !== todayStamp()) {
                dispatch({ type: 'newDay', ticketNo: readSequence(false) });
            }
        }
        const timer = window.setInterval(check, 30_000);
        window.addEventListener('focus', check);
        document.addEventListener('visibilitychange', check);
        return () => {
            window.clearInterval(timer);
            window.removeEventListener('focus', check);
            document.removeEventListener('visibilitychange', check);
        };
    }, []);

    const setTitle = useCallback((title: string) => dispatch({ type: 'title', title }), []);

    const setSlotLabel = useCallback((id: number, label: string) => dispatch({ type: 'slotPatch', id, patch: { label } }), []);

    const setSlotFile = useCallback((id: number, file: File | undefined) => {
        if (!file) return null;
        const kind = getMediaKind(file);
        if (!kind) return fillTemplate(translationEN.notMediaFile, { name: file.name });
        revokeSlotUrl(stateRef.current.slots, id);
        const url = URL.createObjectURL(file);
        dispatch({ type: 'slotPatch', id, patch: { url, kind, fileName: file.name, ratio: DEFAULT_RATIO } });
        // Match the card to the file's orientation once its size is known.
        void measureMedia(url, kind)
            .then((ratio) => {
                if (ratio) dispatch({ type: 'slotPatch', id, patch: { ratio } });
            });
        return null;
    }, []);

    const clearSlot = useCallback((id: number) => {
        revokeSlotUrl(stateRef.current.slots, id);
        dispatch({ type: 'slotPatch', id, patch: EMPTY_MEDIA });
    }, []);

    const addSlot = useCallback(() => dispatch({ type: 'slotAdd' }), []);

    const removeSlot = useCallback((id: number) => {
        revokeSlotUrl(stateRef.current.slots, id);
        dispatch({ type: 'slotRemove', id });
    }, []);

    const addMark = useCallback((slotId: number, color = MARK_COLORS[0].color) => {
        const slot = stateRef.current.slots.find((s) => s.id === slotId);
        dispatch({ type: 'markAdd', slotId, color });
        return nextMarkId(slot?.marks ?? []);
    }, []);

    const updateMark = useCallback(
        (slotId: number, markId: number, patch: Partial<Mark>) => dispatch({ type: 'markPatch', slotId, markId, patch }),
        []
    );

    const removeMark = useCallback((slotId: number, markId: number) => dispatch({ type: 'markRemove', slotId, markId }), []);

    const newBug = useCallback(() => {
        stateRef.current.slots.forEach((s) => revokeUrl(s.url));
        dispatch({ type: 'reset', ticketNo: readSequence(true, stateRef.current.ticketNo) });
    }, []);

    const ticketId = formatTicket(state.ticketNo, state.ticketDay);

    const value = useMemo(
        () => ({ state, ticketId, setTitle, setSlotLabel, setSlotFile, clearSlot, addSlot, removeSlot, addMark, updateMark, removeMark, newBug }),
        [state, ticketId, setTitle, setSlotLabel, setSlotFile, clearSlot, addSlot, removeSlot, addMark, updateMark, removeMark, newBug]
    );

    return <EvidenceContext.Provider value={value}>{children}</EvidenceContext.Provider>;
}