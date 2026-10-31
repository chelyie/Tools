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

/** Splits slots into rows of `size`, keeping each slot's index. */
export function toRows(slots: Slot[], size: number): SlotPosition[][] {
    const rows: SlotPosition[][] = [];
    slots.forEach((slot, index) => {
        if (index % size === 0) rows.push([]);
        rows[rows.length - 1].push({ slot, index });
    });
    return rows;
}

/** Text color that stays readable on top of a highlight color. */
export function inkFor(color: string): string {
    return MARK_COLORS.find((c) => c.color === color)?.ink ?? '#fff';
}