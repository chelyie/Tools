import {
    useCallback, useEffect, useMemo, useReducer, useRef, type ReactNode
} from 'react';
import { DEFAULT_RATIO, MARK_COLORS } from '@constant/evidence.constant';
import { EvidenceContext } from '@context/evidence.context';
import { createState, EMPTY_MEDIA, evidenceReducer, nextMarkId } from '@context/evidence.reducer';
import { isFirebaseConfigured } from '@config/firebase';
import useAuth from '@hooks/useAuth';
import translationEN from '@locales/en';
import type { Mark, SavedBug, Slot } from '@type/Evidence.type';
import { claimTicket, peekTicket, saveBugDoc } from '@utils/bugStore';
import { uploadMedia } from '@utils/cloudinaryUpload';
import { getMediaKind, measureMedia, revokeUrl } from '@utils/evidenceFiles';
import { fillTemplate } from '@utils/text';
import { formatTicket, readSequence, todayStamp } from '@utils/ticket';

function revokeSlotUrl(slots: Slot[], id: number) {
    const slot = slots.find((s) => s.id === id);
    if (slot) revokeUrl(slot.url);
}

export default function EvidenceProvider({ children }: { children: ReactNode }) {
    const { user } = useAuth();
    const uid = user?.uid;
    const [state, dispatch] = useReducer(evidenceReducer, undefined, () => createState(readSequence(false)));

    // Files picked for each slot, kept until they are uploaded on save.
    const filesRef = useRef(new Map<number, File>());

    // Callbacks read the latest state here so they can stay stable and release object URLs.
    const stateRef = useRef(state);
    useEffect(() => {
        stateRef.current = state;
    });
    useEffect(() => () => {
        stateRef.current.slots.forEach((s) => revokeUrl(s.url));
    }, []);

    // Signed in: the ticket number is shared with the team, so show the next free one for the day.
    const refreshTicket = useCallback(async(day: string) => {
        if (!isFirebaseConfigured || !uid) return;
        try {
            dispatch({ type: 'ticket', day, ticketNo: await peekTicket(day) });
        }
        catch {
            /* keep the local number */
        }
    }, [uid]);

    useEffect(() => {
        void refreshTicket(stateRef.current.ticketDay);
    }, [refreshTicket]);

    // The day can change while the page stays open: restart the numbering at 1 for the new day.
    useEffect(() => {
        function check() {
            if (stateRef.current.ticketDay !== todayStamp() && !stateRef.current.bugId) {
                dispatch({ type: 'newDay', ticketNo: readSequence(false) });
                void refreshTicket(todayStamp());
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
    }, [refreshTicket]);

    const setTitle = useCallback((title: string) => dispatch({ type: 'title', title }), []);

    const setSlotLabel = useCallback((id: number, label: string) => dispatch({ type: 'slotPatch', id, patch: { label } }), []);

    const setSlotFile = useCallback((id: number, file: File | undefined) => {
        if (!file) return null;
        const kind = getMediaKind(file);
        if (!kind) return fillTemplate(translationEN.notMediaFile, { name: file.name });
        revokeSlotUrl(stateRef.current.slots, id);
        const url = URL.createObjectURL(file);
        filesRef.current.set(id, file);
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
        filesRef.current.delete(id);
        dispatch({ type: 'slotPatch', id, patch: EMPTY_MEDIA });
    }, []);

    const addSlot = useCallback(() => dispatch({ type: 'slotAdd' }), []);

    const removeSlot = useCallback((id: number) => {
        revokeSlotUrl(stateRef.current.slots, id);
        filesRef.current.delete(id);
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
        filesRef.current.clear();
        dispatch({ type: 'reset', ticketNo: readSequence(true, stateRef.current.ticketNo) });
        void refreshTicket(todayStamp());
    }, [refreshTicket]);

    const loadBug = useCallback((bug: SavedBug) => {
        stateRef.current.slots.forEach((s) => revokeUrl(s.url));
        filesRef.current.clear();
        const mine = bug.ownerUid === uid;
        dispatch({
            type: 'load',
            state: {
                title: bug.title,
                ticketNo: bug.ticketNo,
                ticketDay: mine
                    ? bug.ticketDay
                    : todayStamp(),
                bugId: mine
                    ? bug.bugId
                    : null,
                slots: bug.slots
            }
        });
        if (!mine) void refreshTicket(todayStamp());
    }, [uid, refreshTicket]);

    const saveBug = useCallback(async() => {
        if (!user) throw new Error(translationEN.notOnTeamList);
        const start = stateRef.current;
        if (!start.title.trim()) throw new Error(translationEN.saveNeedsTitle);

        // 1. Upload the files that are still on this computer, then point the slots at the uploaded copies.
        const slots = await Promise.all(start.slots.map(async(slot) => {
            const file = filesRef.current.get(slot.id);
            if (!file || !slot.kind || !slot.url.startsWith('blob:')) return slot;
            return { ...slot, url: await uploadMedia(file, slot.kind) };
        }));
        slots.forEach((slot) => {
            const before = stateRef.current.slots.find((s) => s.id === slot.id);
            if (!before || before.url === slot.url || !before.url.startsWith('blob:')) return;
            revokeUrl(before.url);
            filesRef.current.delete(slot.id);
            dispatch({ type: 'slotPatch', id: slot.id, patch: { url: slot.url } });
        });

        // 2. A new bug takes the next shared ticket number for the day.
        let { bugId, ticketNo } = start;
        if (!bugId) {
            ticketNo = await claimTicket(start.ticketDay);
            bugId = formatTicket(ticketNo, start.ticketDay);
        }

        // 3. Save it for the team.
        await saveBugDoc(
            { uid: user.uid, email: user.email ?? '' },
            { bugId, title: start.title.trim(), ticketNo, ticketDay: start.ticketDay, slots }
        );
        dispatch({ type: 'saved', bugId, ticketNo });
        return bugId;
    }, [user]);

    const ticketId = formatTicket(state.ticketNo, state.ticketDay);

    const value = useMemo(
        () => ({
            state, ticketId, setTitle, setSlotLabel, setSlotFile, clearSlot, addSlot, removeSlot, addMark, updateMark, removeMark, newBug, saveBug, loadBug
        }),
        [state, ticketId, setTitle, setSlotLabel, setSlotFile, clearSlot, addSlot, removeSlot, addMark, updateMark, removeMark, newBug, saveBug, loadBug]
    );

    return <EvidenceContext.Provider value={value}>{children}</EvidenceContext.Provider>;
}