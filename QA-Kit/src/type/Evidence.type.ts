export type MediaKind = 'image' | 'video';
export type ImageFormat = 'png' | 'jpg';

/** A numbered highlight box; x, y, w, h are percentages of the media frame. */
export interface Mark {
    id: number;
    num: number;
    x: number;
    y: number;
    w: number;
    h: number;
    color: string;
}

export interface Slot {
    id: number;
    label: string;
    url: string;
    kind: MediaKind | '';
    fileName: string;
    ratio: number; // width / height of the uploaded media
    marks: Mark[];
}

/** A slot together with its position in the list. */
export interface SlotPosition {
    slot: Slot;
    index: number;
}

export interface MarkColor {
    color: string;
    ink: string;
    name: string;
}

export interface EvidenceState {
    title: string;
    ticketNo: number;
    ticketDay: string; // the day the ticket number belongs to (YYYYMMDD)
    bugId: string | null; // the saved bug this edits; null until it is saved
    slots: Slot[];
}

/** A bug saved in Firestore; slot urls point at the uploaded files. */
export interface SavedBug {
    bugId: string;
    ownerUid: string;
    ownerEmail: string;
    title: string;
    ticketNo: number;
    ticketDay: string;
    slots: Slot[];
    updatedAt: number;
}