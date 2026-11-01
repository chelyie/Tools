import { Link } from 'react-router-dom';
import Button from '@components/button/Button';
import { PlusIcon, SplitIcon } from '@components/icon/icons';
import AccountBar from '@components/layout/AccountBar';
import AppHeader from '@components/layout/AppHeader';
import PageLayout from '@components/layout/PageLayout';
import useAuth from '@hooks/useAuth';
import useEvidence from '@hooks/useEvidence';
import translationEN from '@locales/en';
import BugDetailsSection from '@pages/BugVerification/sections/BugDetailsSection';
import CollagePanel from '@pages/BugVerification/sections/collage/CollagePanel';
import SaveBugButton from '@pages/BugVerification/sections/SaveBugButton';
import SlotsSection from '@pages/BugVerification/sections/SlotsSection';

export default function BugVerificationPage() {
    const { newBug } = useEvidence();
    const { user } = useAuth();

    const header = (
        <AppHeader
            title={translationEN.brandname}
            icon={<SplitIcon size={20} />}
            actions={(
                <>
                    {user && (
                        <>
                            <Link to="/bugs" className="btn btn--outline">{translationEN.savedBugs}</Link>
                            <SaveBugButton />
                        </>
                    )}
                    <Button icon={<PlusIcon size={16} />} onClick={newBug}>{translationEN.newBug}</Button>
                    <AccountBar />
                </>
            )}
        />
    );

    return (
        <PageLayout header={header}>
            <div className="app-inputs">
                <BugDetailsSection />
                <SlotsSection />
            </div>
            <CollagePanel />
        </PageLayout>
    );
}