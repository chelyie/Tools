import {useEffect, useRef} from 'react';

const CURSOR_POSITION_KEY = 'qa-kit-cursor-position';

export default function CursorGlow() {
    const glowRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        try {
            const savedPosition = localStorage.getItem(CURSOR_POSITION_KEY);
            if (savedPosition) {
                const {x, y} = JSON.parse(savedPosition) as {x: number; y: number};
                if (Number.isFinite(x) && Number.isFinite(y)) {
                    const safeX = Math.min(Math.max(x, 0), window.innerWidth);
                    const safeY = Math.min(Math.max(y, 0), window.innerHeight);
                    glowRef.current?.style.setProperty('--cursor-x', `${safeX}px`);
                    glowRef.current?.style.setProperty('--cursor-y', `${safeY}px`);
                }
            }
        } catch {
        }

        const handleMouseMove = (e: MouseEvent) => {
            glowRef.current?.style.setProperty('--cursor-x', `${e.clientX}px`);
            glowRef.current?.style.setProperty('--cursor-y', `${e.clientY}px`);
            try {
                localStorage.setItem(
                    CURSOR_POSITION_KEY,
                    JSON.stringify({x: e.clientX, y: e.clientY})
                );
            } catch {
            }
        };
        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);

    return (
        <div
            ref={glowRef}
            className="cursor-glow"
            aria-hidden="true"
            style={{'--cursor-x': '50vw', '--cursor-y': '50vh'} as React.CSSProperties}
        />
    );
}