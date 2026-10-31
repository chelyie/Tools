import { useRef, type CSSProperties, type PointerEvent } from 'react';
import { MIN_MARK_SIZE } from '@constant/evidence.constant';
import type { Mark } from '@type/Evidence.type';
import { classMerge } from '@utils/classMerge';
import { inkFor } from '@utils/slot';

interface MarkOverlayProps {
    marks: Mark[];
    /** Pass these to make the boxes draggable and resizable. */
    selectedId?: number | null;
    onSelect?: (id: number) => void;
    onChange?: (id: number, patch: Partial<Mark>) => void;
}

interface Drag {
    mode: 'move' | 'resize';
    startX: number;
    startY: number;
    mark: Mark;
}

function clamp(value: number, min: number, max: number): number {
    return Math.min(Math.max(value, min), max);
}

function boxStyle(mark: Mark): CSSProperties {
    return { left: `${mark.x}%`, top: `${mark.y}%`, width: `${mark.w}%`, height: `${mark.h}%`, borderColor: mark.color };
}

/**
 * Numbered highlight boxes over an image or video. Read-only by default; pass `onChange` to make them draggable.
 *
 * @example
 * <MarkOverlay marks={slot.marks} selectedId={id} onSelect={setId} onChange={updateMark} />
 *
 * Used in: SlotMediaFrame (editable), CollageShot (read-only)
 */
export default function MarkOverlay({ marks, selectedId, onSelect, onChange }: MarkOverlayProps) {
    const layerRef = useRef<HTMLDivElement>(null);
    const drag = useRef<Drag | null>(null);
    const editable = !!onChange;

    function begin(e: PointerEvent, mark: Mark, mode: Drag['mode']) {
        e.stopPropagation();
        e.currentTarget.setPointerCapture(e.pointerId);
        drag.current = { mode, startX: e.clientX, startY: e.clientY, mark };
        onSelect?.(mark.id);
    }

    function move(e: PointerEvent) {
        const d = drag.current;
        const rect = layerRef.current?.getBoundingClientRect();
        if (!d || !rect || !onChange) return;
        const dx = ((e.clientX - d.startX) / rect.width) * 100;
        const dy = ((e.clientY - d.startY) / rect.height) * 100;
        if (d.mode === 'move') {
            onChange(d.mark.id, { x: clamp(d.mark.x + dx, 0, 100 - d.mark.w), y: clamp(d.mark.y + dy, 0, 100 - d.mark.h) });
        }
        else {
            onChange(d.mark.id, { w: clamp(d.mark.w + dx, MIN_MARK_SIZE, 100 - d.mark.x), h: clamp(d.mark.h + dy, MIN_MARK_SIZE, 100 - d.mark.y) });
        }
    }

    function end() {
        drag.current = null;
    }

    const dragHandlers = { onPointerMove: move, onPointerUp: end };

    return (
        <div className={classMerge('marks', editable && 'marks--editable')} ref={layerRef}>
            {marks.map((m) => (
                <div
                    key={m.id}
                    className={classMerge('mark-box', selectedId === m.id && 'is-selected')}
                    style={boxStyle(m)}
                    {...(editable && { onPointerDown: (e: PointerEvent) => begin(e, m, 'move'), ...dragHandlers })}
                >
                    <span className="mark-box__num" style={{ background: m.color, color: inkFor(m.color) }}>{m.num}</span>
                    {editable && (
                        <span
                            className="mark-box__handle"
                            style={{ background: m.color }}
                            onPointerDown={(e) => begin(e, m, 'resize')}
                            {...dragHandlers}
                        />
                    )}
                </div>
            ))}
        </div>
    );
}