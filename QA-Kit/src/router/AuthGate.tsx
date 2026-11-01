import { Outlet } from 'react-router-dom';
import Hint from '@components/feedback/Hint';
import AppHeader from '@components/layout/AppHeader';
import PageLayout from '@components/layout/PageLayout';
import useAuth from '@hooks/useAuth';
import translationEN from '@locales/en';
import SignInPage from '@pages/SignIn';

/** Lets signed-in people through; without Firebase set up the app stays open and just can't save. */
export default function AuthGate() {
    const { configured, user, loading } = useAuth();

    if (!configured) return <Outlet />;
    if (loading) {
        return (
            <PageLayout header={<AppHeader title={translationEN.brandname} />}>
                <Hint>{translationEN.loading}</Hint>
            </PageLayout>
        );
    }
    return user
        ? <Outlet />
        : <SignInPage />;
}