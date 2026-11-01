import Button from '@components/button/Button';
import Card from '@components/card/Card';
import ErrorMessage from '@components/feedback/ErrorMessage';
import { SplitIcon } from '@components/icon/icons';
import AccountBar from '@components/layout/AccountBar';
import AppHeader from '@components/layout/AppHeader';
import PageLayout from '@components/layout/PageLayout';
import useAuth from '@hooks/useAuth';
import translationEN from '@locales/en';

/** Shown instead of the app until the person signs in with Google. */
export default function SignInPage() {
    const { signIn, error } = useAuth();

    return (
        <PageLayout header={<AppHeader title={translationEN.brandname} icon={<SplitIcon size={20} />} actions={<AccountBar />} />}>
            <Card title={translationEN.signInTitle} className="card--narrow">
                <p className="card__text">{translationEN.signInHint}</p>
                <div className="row">
                    <Button onClick={() => void signIn()}>{translationEN.signInWithGoogle}</Button>
                </div>
                <ErrorMessage message={error} />
            </Card>
        </PageLayout>
    );
}