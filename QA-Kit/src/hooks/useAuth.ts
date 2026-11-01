import { useContext } from 'react';
import { AuthContext, type AuthContextValue } from '@context/auth.context';

/**
 * Who is signed in with Google, plus signIn / signOut. Works in any component inside <AuthProvider>.
 *
 * @example
 * const { user, signOut } = useAuth();
 *
 * Used in: AuthGate, SignIn page, AccountBar, EvidenceProvider, SavedBugs page
 */
export default function useAuth(): AuthContextValue {
    const context = useContext(AuthContext);
    if (!context) throw new Error('useAuth must be used inside AuthProvider');
    return context;
}