import { SEQUENCE_STORAGE_KEY } from '@constant/evidence.constant';

function pad(n: number): string {
    return String(n)
        .padStart(2, '0');
}

export function todayStamp(date = new Date()): string {
    return `${date.getFullYear()}${pad(date.getMonth() + 1)}${pad(date.getDate())}`;
}

export function formatTicket(sequence: number, day = todayStamp()): string {
    return `BUG-${day}-${pad(sequence)}`;
}

/** Per-day counter kept in localStorage; `bump` moves to the next bug number. */
export function readSequence(bump: boolean, fallback = 1): number {
    const day = todayStamp();
    let n = 1;
    try {
        const raw = JSON.parse(localStorage.getItem(SEQUENCE_STORAGE_KEY) || 'null') as { day: string; n: number } | null;
        if (raw && raw.day === day) {
            n = bump
                ? raw.n + 1
                : raw.n;
        }
        localStorage.setItem(SEQUENCE_STORAGE_KEY, JSON.stringify({ day, n }));
    }
    catch {
        n = bump
            ? fallback + 1
            : 1;
    }
    return n;
}