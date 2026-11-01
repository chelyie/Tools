import { createContext } from 'react';
import type { User } from 'firebase/auth';

export interface AuthContextValue {
    /** False when Firebase isn't set up; the app then works without sign-in or saving. */
    configured: boolean;
    user: User | null;
    loading: boolean;
    error: string;
    signIn: () => Promise<void>;
    signOut: () => Promise<void>;
}

export const AuthContext = createContext<AuthContextValue | undefined>(undefined);