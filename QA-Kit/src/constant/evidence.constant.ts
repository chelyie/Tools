import type { ImageFormat, MarkColor } from '@type/Evidence.type';

export const MAX_SLOTS = 12;
/** The bug always comes first and cannot be removed; the other cards can be added or deleted. */
export const DEFAULT_LABELS = ['Bug', 'Development build'] as const;
export const LOCKED_SLOTS = 1;
export const SLOTS_PER_ROW = 3;
export const DEFAULT_RATIO = 1.6;
export const MIN_RATIO = 0.3;
export const MAX_RATIO = 2.5;
export const SLOT_LETTERS = 'ABCDEFGHIJKL'.split('');
export const SEQUENCE_STORAGE_KEY = 'qa-bug-seq';
export const ACCEPT_MEDIA = 'image/*,video/*';
export const EDITOR_MAX_HEIGHT = 420; // keeps tall pictures from filling the screen
export const MIN_MARK_SIZE = 4;

export const IMAGE_FORMATS: { value: ImageFormat; label: string }[] = [
    { value: 'png', label: 'PNG' },
    { value: 'jpg', label: 'JPG' }
];

export const MARK_COLORS: MarkColor[] = [
    { color: '#E5242B', ink: '#fff', name: 'Red' },
    { color: '#F97316', ink: '#14171F', name: 'Orange' },
    { color: '#FACC15', ink: '#14171F', name: 'Yellow' },
    { color: '#22C55E', ink: '#14171F', name: 'Green' },
    { color: '#2F5BEA', ink: '#fff', name: 'Blue' },
    { color: '#A855F7', ink: '#fff', name: 'Purple' },
    { color: '#EC4899', ink: '#14171F', name: 'Pink' },
    { color: '#14171F', ink: '#fff', name: 'Black' }
];