import {
    collection, doc, getDoc, getDocs, limit, orderBy, query, runTransaction, serverTimestamp, setDoc, type Timestamp
} from 'firebase/firestore';
import { getFirebaseDb } from '@config/firebase';
import type { SavedBug, Slot } from '@type/Evidence.type';

const LIST_LIMIT = 50;

interface Owner {
    uid: string;
    email: string;
}

export type BugInput = Pick<SavedBug, 'bugId' | 'title' | 'ticketNo' | 'ticketDay' | 'slots'>;

/** The next ticket number for the day, without using it. */
export async function peekTicket(day: string): Promise<number> {
    const snap = await getDoc(doc(getFirebaseDb(), 'counters', day));
    return (snap.exists()
        ? Number(snap.data().n) || 0
        : 0) + 1;
}

/** Takes the next ticket number for the day; two people can never get the same one. */
export function claimTicket(day: string): Promise<number> {
    const db = getFirebaseDb();
    const ref = doc(db, 'counters', day);
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
        title: bug.title,
        ticketNo: bug.ticketNo,
        ticketDay: bug.ticketDay,
        slots: bug.slots,
        updatedAt: serverTimestamp()
    });
}

export async function listBugs(): Promise<SavedBug[]> {
    const snap = await getDocs(query(collection(getFirebaseDb(), 'bugs'), orderBy('updatedAt', 'desc'), limit(LIST_LIMIT)));
    return snap.docs.map((d) => {
        const data = d.data();
        const updated = data.updatedAt as Timestamp | null;
        return {
            bugId: d.id,
            ownerUid: String(data.ownerUid ?? ''),
            ownerEmail: String(data.ownerEmail ?? ''),
            title: String(data.title ?? ''),
            ticketNo: Number(data.ticketNo) || 1,
            ticketDay: String(data.ticketDay ?? ''),
            slots: (data.slots ?? []) as Slot[],
            updatedAt: updated?.toMillis() ?? Date.now()
        };
    });
}