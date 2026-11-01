import { Outlet } from 'react-router-dom';
import useAuth from '@hooks/useAuth';
import translationEN from '@locales/en';
import SignInPage from '@pages/SignIn';

/** Lets signed-in people through; without Firebase set up the app stays open and just can't save. */
export default function AuthGate() {
    const { configured, user, loading } = useAuth();

    if (!configured) return <Outlet />;
    if (loading) return <div className="auth"><p className="card__text">{translationEN.loading}</p></div>;
    return user
        ? <Outlet />
        : <SignInPage />;
}