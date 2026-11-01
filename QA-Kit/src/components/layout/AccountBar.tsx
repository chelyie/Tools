import Button from '@components/button/Button';
import Hint from '@components/feedback/Hint';
import useAuth from '@hooks/useAuth';
import translationEN from '@locales/en';

/**
 * Signed in: the email and a Sign out button. Signed out: a Sign in button. Renders nothing when Firebase isn't set up.
 *
 * @example
 * <AppHeader title="Saved bugs" actions={<AccountBar />} />
 *
 * Used in: BugVerification page, SavedBugs page, SignIn page
 */
export default function AccountBar() {
    const { configured, user, signIn, signOut } = useAuth();
    if (!configured) return null;
    if (!user) return <Button variant="outline" onClick={() => void signIn()}>{translationEN.signIn}</Button>;

    return (
        <div className="row row--center">
            <Hint truncate>{user.email}</Hint>
            <Button variant="link" onClick={() => void signOut()}>{translationEN.signOut}</Button>
        </div>
    );
}