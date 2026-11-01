import { SLOTS_PER_ROW } from '@constant/evidence.constant';
import translationEN from '@locales/en';
import type { ImageFormat, Slot } from '@type/Evidence.type';
import { inkFor, layoutRatio, slotDisplayLabel, toRows } from '@utils/slot';
import { fillTemplate } from '@utils/text';

const WIDTH = 1800;
const OUTER = 32; // page margin around the card, like the preview
const PAD = 48; // padding inside the card
const INNER = OUTER + PAD;
const GAP = 24;
const CAPTION_H = 56;
const FONT = '\'Inter\', system-ui, sans-serif';
const MAX_RECORD_MS = 60_000;
const VIDEO_TYPES = ['video/mp4;codecs=avc1', 'video/webm;codecs=vp9', 'video/webm'];

interface Drawable {
    el: CanvasImageSource;
    w: number;
    h: number;
}
type Source = Drawable | null;

interface ExportOptions {
    ticket: string;
    title: string;
    slots: Slot[];
    preview: HTMLElement | null;
    format: ImageFormat; // used when there is no video
}

function loadImage(url: string): Promise<Source> {
    return new Promise((resolve) => {
        const img = new Image();
        img.crossOrigin = 'anonymous'; // saved files come from Cloudinary; keeps the canvas exportable
        img.onload = () => resolve({ el: img, w: img.naturalWidth, h: img.naturalHeight });
        img.onerror = () => resolve(null);
        img.src = url;
    });
}

function drawContain(ctx: CanvasRenderingContext2D, src: NonNullable<Source>, x: number, y: number, w: number, h: number) {
    const scale = Math.min(w / src.w, h / src.h);
    const dw = src.w * scale;
    const dh = src.h * scale;
    ctx.drawImage(src.el, x + (w - dw) / 2, y + (h - dh) / 2, dw, dh);
}

/**
 * Draws the collage card (ticket, title, labelled slots, highlight boxes) and exports it:
 * a PNG/JPG when every slot is a picture, a video when any slot is a video.
 */
export async function exportCollage(opts: ExportOptions): Promise<{ blob: Blob; ext: string }> {
    const { ticket, title, slots, preview, format } = opts;
    // Same layout as the preview: rows of three, widths follow each file's shape so a row shares one height.
    const headH = 96;
    const cells: { x: number; y: number; w: number; frameH: number; cellH: number }[] = [];
    let cursorY = INNER + headH;
    toRows(slots, SLOTS_PER_ROW)
        .forEach((row) => {
            const ratios = row.map(({ slot }) => layoutRatio(slot));
            const frameH = (WIDTH - INNER * 2 - GAP * (row.length - 1)) / ratios.reduce((a, b) => a + b, 0);
            let cursorX = INNER;
            row.forEach(({ index }, k) => {
                const w = ratios[k] * frameH;
                cells[index] = { x: cursorX, y: cursorY, w, frameH, cellH: CAPTION_H + frameH };
                cursorX += w + GAP;
            });
            cursorY += CAPTION_H + frameH + GAP;
        });
    const height = 2 * Math.round((cursorY - GAP + INNER) / 2); // even, for video codecs

    const canvas = document.createElement('canvas');
    canvas.width = WIDTH;
    canvas.height = height;
    const context = canvas.getContext('2d');
    if (!context) throw new Error('Canvas is not available.');
    const ctx: CanvasRenderingContext2D = context; // typed non-null so draw() can use it

    const images = await Promise.all(slots.map((s) => (s.kind === 'image'
        ? loadImage(s.url)
        : null)));
    // Videos come from the preview, so the export shows exactly what the user sees.
    const videos = slots.map((s, i) =>
        s.kind === 'video'
            ? preview?.querySelectorAll('.shot')[i]?.querySelector('video') ?? null
            : null);

    function draw() {
        ctx.fillStyle = '#f3f4f7';
        ctx.fillRect(0, 0, WIDTH, height);
        ctx.fillStyle = '#fff';
        ctx.beginPath();
        ctx.roundRect(OUTER, OUTER, WIDTH - OUTER * 2, height - OUTER * 2, 32);
        ctx.fill();
        ctx.strokeStyle = '#dde0e7';
        ctx.lineWidth = 2;
        ctx.stroke();

        ctx.textBaseline = 'top';
        ctx.fillStyle = '#4a5060';
        ctx.font = `600 22px ${FONT}`;
        ctx.fillText(ticket, INNER, INNER);
        ctx.fillStyle = '#14171f';
        ctx.font = `700 40px ${FONT}`;
        ctx.fillText(title, INNER, INNER + 34, WIDTH - INNER * 2);

        slots.forEach((slot, i) => {
            const { x, y, w: cellW, frameH, cellH } = cells[i];
            const label = slotDisplayLabel(slot, i);

            // card: rounded, clipped, caption bar on top, media frame below
            ctx.save();
            ctx.beginPath();
            ctx.roundRect(x, y, cellW, cellH, 24);
            ctx.clip();
            ctx.fillStyle = '#fff';
            ctx.fillRect(x, y, cellW, cellH);
            ctx.fillStyle = '#fafafc';
            ctx.fillRect(x, y, cellW, CAPTION_H);
            ctx.fillStyle = '#dde0e7';
            ctx.fillRect(x, y + CAPTION_H - 2, cellW, 2);

            ctx.fillStyle = slot.label.trim()
                ? '#14171f'
                : '#6b7285';
            ctx.font = `700 22px ${FONT}`;
            ctx.fillText(label, x + 20, y + 16, cellW - 40);

            const fy = y + CAPTION_H;
            ctx.fillStyle = '#0e1117';
            ctx.fillRect(x, fy, cellW, frameH);

            const video = videos[i];
            const src: Source = video
                ? (video.readyState >= 2 && video.videoWidth
                    ? { el: video, w: video.videoWidth, h: video.videoHeight }
                    : null)
                : images[i];
            if (src) {
                drawContain(ctx, src, x, fy, cellW, frameH);
            }
            else {
                ctx.fillStyle = '#b9becb';
                ctx.font = `400 18px ${FONT}`;
                ctx.textAlign = 'center';
                ctx.fillText(fillTemplate(translationEN.noFileYet, { label }), x + cellW / 2, fy + frameH / 2 - 9, cellW - 24);
                ctx.textAlign = 'left';
            }

            // highlight boxes (percentages of the frame, same as the preview)
            // Line and number sizes grow with the card so highlights stay easy to see on large pictures.
            const line = Math.min(Math.max(cellW * 0.005, 4), 10);
            const badge = Math.min(Math.max(cellW * 0.04, 30), 72);
            slot.marks.forEach((m) => {
                const mx = x + (m.x / 100) * cellW;
                const my = fy + (m.y / 100) * frameH;
                ctx.strokeStyle = m.color;
                ctx.lineWidth = line;
                ctx.strokeRect(mx, my, (m.w / 100) * cellW, (m.h / 100) * frameH);
                const text = String(m.num);
                ctx.font = `700 ${Math.round(badge * 0.66)}px ${FONT}`;
                const bw = Math.max(badge, ctx.measureText(text).width + badge * 0.5);
                ctx.fillStyle = m.color;
                ctx.fillRect(mx - line / 2, my - line / 2, bw, badge);
                ctx.fillStyle = inkFor(m.color);
                ctx.textAlign = 'center';
                ctx.textBaseline = 'middle';
                ctx.fillText(text, mx - line / 2 + bw / 2, my - line / 2 + badge / 2 + 1);
                ctx.textBaseline = 'top';
                ctx.textAlign = 'left';
            });
            ctx.restore();

            ctx.strokeStyle = '#dde0e7';
            ctx.lineWidth = 2;
            ctx.beginPath();
            ctx.roundRect(x, y, cellW, cellH, 24);
            ctx.stroke();
        });
    }

    const liveVideos = videos.filter((v): v is HTMLVideoElement => !!v);
    if (liveVideos.length === 0) {
        draw();
        const mime = format === 'jpg'
            ? 'image/jpeg'
            : 'image/png';
        const blob = await new Promise<Blob | null>((resolve) => canvas.toBlob(resolve, mime, 0.92));
        if (!blob) throw new Error('Could not create the image.');
        return { blob, ext: format };
    }

    return recordVideo(canvas, draw, liveVideos);
}

/** Plays every preview video from the start and records the drawn collage while it plays. */
async function recordVideo(canvas: HTMLCanvasElement, draw: () => void, videos: HTMLVideoElement[]) {
    const mimeType = VIDEO_TYPES.find((t) => MediaRecorder.isTypeSupported(t));
    if (!mimeType) throw new Error('Video download is not supported in this browser.');

    const chunks: Blob[] = [];
    const recorder = new MediaRecorder(canvas.captureStream(30), { mimeType, videoBitsPerSecond: 8_000_000 });
    recorder.ondataavailable = (e) => {
        if (e.data.size) chunks.push(e.data);
    };
    const stopped = new Promise<void>((resolve) => {
        recorder.onstop = () => resolve();
    });

    const loops = videos.map((v) => v.loop);
    videos.forEach((v) => {
        v.loop = false; v.currentTime = 0;
    });
    await Promise.all(videos.map((v) => v.play()));

    recorder.start();
    const startedAt = performance.now();
    await new Promise<void>((resolve) => {
        function tick() {
            draw();
            const done = videos.every((v) => v.ended || v.paused);
            if (done || performance.now() - startedAt > MAX_RECORD_MS) resolve();
            else setTimeout(tick, 33); // timers keep running in background tabs, unlike requestAnimationFrame
        }
        tick();
    });
    draw();
    await new Promise((r) => setTimeout(r, 150)); // let the last frame reach the recorder
    recorder.stop();
    await stopped;

    videos.forEach((v, i) => {
        v.pause(); v.loop = loops[i]; v.currentTime = 0;
    });
    const type = mimeType.split(';')[0];
    return { blob: new Blob(chunks, { type }),
        ext: type === 'video/mp4'
            ? 'mp4'
            : 'webm' };
}

export function saveBlob(blob: Blob, fileName: string) {
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = fileName;
    a.click();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
}