import { useRef, type PointerEvent } from 'react';
import Button from '@components/button/Button';
import Card from '@components/card/Card';
import ErrorMessage from '@components/feedback/ErrorMessage';
import useAuth from '@hooks/useAuth';
import translationEN from '@locales/en';

/** Shown instead of the app until the person signs in with Google: a centred card on a soft pink background. */
export default function SignInPage() {
    const { signIn, error } = useAuth();
    const pageRef = useRef<HTMLDivElement>(null);

    // The glows read --x / --y and trail behind the cursor through a CSS transition.
    function follow(e: PointerEvent<HTMLDivElement>) {
        const page = pageRef.current;
        if (!page) return;
        const box = page.getBoundingClientRect();
        page.style.setProperty('--x', `${e.clientX - box.left}px`);
        page.style.setProperty('--y', `${e.clientY - box.top}px`);
    }

    return (
        <div className="auth" ref={pageRef} onPointerMove={follow}>
            <div className="auth__glow auth__glow--pink" aria-hidden="true" />
            <div className="auth__glow auth__glow--lilac" aria-hidden="true" />
            <Card title={translationEN.signInTitle} className="auth__card">
                <p className="card__text">{translationEN.signInHint}</p>
                <div className="row">
                    <Button onClick={() => void signIn()}>{translationEN.signInWithGoogle}</Button>
                </div>
                <ErrorMessage message={error} />
            </Card>
        </div>
    );
}