import Button from '@components/button/Button';
import Hint from '@components/feedback/Hint';
import useAuth from '@hooks/useAuth';
import translationEN from '@locales/en';

/**
 * Signed-in email and a Sign out button. Renders nothing when nobody is signed in.
 *
 * @example
 * <AppHeader title="Saved bugs" actions={<AccountBar />} />
 *
 * Used in: BugVerification page, SavedBugs page
 */
export default function AccountBar() {
    const { user, signOut } = useAuth();
    if (!user) return null;

    return (
        <div className="row row--center">
            <Hint truncate>{user.email}</Hint>
            <Button variant="link" onClick={() => void signOut()}>{translationEN.signOut}</Button>
        </div>
    );
}