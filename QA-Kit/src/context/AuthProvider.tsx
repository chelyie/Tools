import {
    useCallback, useEffect, useMemo, useState, type ReactNode
} from 'react';
import {
    GoogleAuthProvider, onAuthStateChanged, signInWithPopup, signOut as firebaseSignOut, type User
} from 'firebase/auth';
import { getFirebaseAuth, isFirebaseConfigured } from '@config/firebase';
import { AuthContext } from '@context/auth.context';
import translationEN from '@locales/en';

const IGNORED_CODES = ['auth/popup-closed-by-user', 'auth/cancelled-popup-request'];

export default function AuthProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(isFirebaseConfigured);
    const [error, setError] = useState('');

    useEffect(() => {
        if (!isFirebaseConfigured) return undefined;
        return onAuthStateChanged(getFirebaseAuth(), (next) => {
            setUser(next);
            setLoading(false);
        });
    }, []);

    const signIn = useCallback(async() => {
        setError('');
        try {
            await signInWithPopup(getFirebaseAuth(), new GoogleAuthProvider());
        }
        catch (e) {
            const code = (e as { code?: string }).code ?? '';
            if (!IGNORED_CODES.includes(code)) setError(translationEN.signInFailed);
        }
    }, []);

    const signOut = useCallback(() => firebaseSignOut(getFirebaseAuth()), []);

    const value = useMemo(
        () => ({ configured: isFirebaseConfigured, user, loading, error, signIn, signOut }),
        [user, loading, error, signIn, signOut]
    );

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}