import {
    DEFAULT_RATIO, MARK_COLORS, MAX_RATIO, MIN_RATIO, SLOT_LETTERS
} from '@constant/evidence.constant';
import translationEN from '@locales/en';
import type { Slot, SlotPosition } from '@type/Evidence.type';
import { fillTemplate } from '@utils/text';

export function slotLetter(index: number): string {
    return SLOT_LETTERS[index % SLOT_LETTERS.length];
}

/** The label shown for a slot, falling back to "Slot A", "Slot B", ... */
export function slotDisplayLabel(slot: Slot, index: number): string {
    return slot.label.trim() || fillTemplate(translationEN.slotFallback, { letter: slotLetter(index) });
}

/** Shape used to lay a slot out: its own ratio, kept within sensible limits. */
export function layoutRatio(slot: Slot): number {
    const ratio = slot.kind === ''
        ? DEFAULT_RATIO
        : slot.ratio;
    return Math.min(Math.max(ratio, MIN_RATIO), MAX_RATIO);
}

/** A landscape file is wide enough that it needs the full width of the collage to show its details. */
export function isLandscape(slot: Slot): boolean {
    return slot.kind !== '' && slot.ratio > 1;
}

/**
 * Splits slots into rows of up to `size`, keeping each slot's index.
 * A landscape file always gets a row to itself, so the next file sits below it at full size.
 */
export function toRows(slots: Slot[], size: number): SlotPosition[][] {
    const rows: SlotPosition[][] = [];
    let open = false; // whether the last row can still take another slot
    slots.forEach((slot, index) => {
        if (isLandscape(slot)) {
            rows.push([{ slot, index }]);
            open = false;
            return;
        }
        if (!open || rows[rows.length - 1].length >= size) {
            rows.push([]);
            open = true;
        }
        rows[rows.length - 1].push({ slot, index });
    });
    return rows;
}

/** Text color that stays readable on top of a highlight color. */
export function inkFor(color: string): string {
    return MARK_COLORS.find((c) => c.color === color)?.ink ?? '#fff';
}