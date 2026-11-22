import {
    collection, doc, getDoc, getDocs, limit, orderBy, query, runTransaction, serverTimestamp, setDoc, type DocumentData, type Timestamp
} from 'firebase/firestore';
import { getFirebaseDb } from '@config/firebase';
import translationEN from '@locales/en';
import type { EvidenceKind, SavedBug, Slot } from '@type/Evidence.type';

const LIST_LIMIT = 50;

interface Owner {
    uid: string;
    email: string;
}

export type BugInput = Pick<SavedBug, 'bugId' | 'kind' | 'ticketNo' | 'ticketDay' | 'slots'>;

/** Each kind of report counts its own tickets, so BUG and FIXED numbers never collide. */
function counterId(day: string, kind: EvidenceKind): string {
    return kind === 'bug'
        ? day
        : `${kind}-${day}`;
}

/** The next ticket number for the day, without using it. */
export async function peekTicket(day: string, kind: EvidenceKind = 'bug'): Promise<number> {
    const snap = await getDoc(doc(getFirebaseDb(), 'counters', counterId(day, kind)));
    return (snap.exists()
        ? Number(snap.data().n) || 0
        : 0) + 1;
}

/** Takes the next ticket number for the day; two people can never get the same one. */
export function claimTicket(day: string, kind: EvidenceKind = 'bug'): Promise<number> {
    const db = getFirebaseDb();
    const ref = doc(db, 'counters', counterId(day, kind));
    return runTransaction(db, async(tx) => {
        const snap = await tx.get(ref);
        const n = (snap.exists()
            ? Number(snap.data().n) || 0
            : 0) + 1;
        tx.set(ref, { n });
        return n;
    });
}

export async function saveBugDoc(owner: Owner, bug: BugInput): Promise<void> {
    await setDoc(doc(getFirebaseDb(), 'bugs', bug.bugId), {
        ownerUid: owner.uid,
        ownerEmail: owner.email,
        kind: bug.kind,
        ticketNo: bug.ticketNo,
        ticketDay: bug.ticketDay,
        slots: bug.slots,
        updatedAt: serverTimestamp()
    });
}

function toSavedBug(id: string, data: DocumentData): SavedBug {
    const updated = data.updatedAt as Timestamp | null;
    return {
        bugId: id,
        kind: data.kind === 'fixed'
            ? 'fixed'
            : 'bug',
        ownerUid: String(data.ownerUid ?? ''),
        ownerEmail: String(data.ownerEmail ?? ''),
        ticketNo: Number(data.ticketNo) || 1,
        ticketDay: String(data.ticketDay ?? ''),
        slots: (data.slots ?? []) as Slot[],
        updatedAt: updated?.toMillis() ?? Date.now()
    };
}

export async function listBugs(): Promise<SavedBug[]> {
    const snap = await getDocs(query(collection(getFirebaseDb(), 'bugs'), orderBy('updatedAt', 'desc'), limit(LIST_LIMIT)));
    return snap.docs.map((d) => toSavedBug(d.id, d.data()));
}

/** One saved bug, or null when it doesn't exist. */
export async function getBug(bugId: string): Promise<SavedBug | null> {
    const snap = await getDoc(doc(getFirebaseDb(), 'bugs', bugId));
    return snap.exists()
        ? toSavedBug(snap.id, snap.data())
        : null;
}

/** A readable message for a failed save. */
export function saveErrorMessage(e: unknown): string {
    if ((e as { code?: string }).code === 'permission-denied') return translationEN.notOnTeamList;
    return e instanceof Error && e.message
        ? e.message
        : translationEN.saveFailed;
}