import Button from '@components/button/Button';
import { PlusIcon, SplitIcon } from '@components/icon/icons';
import AppHeader from '@components/layout/AppHeader';
import PageLayout from '@components/layout/PageLayout';
import useEvidence from '@hooks/useEvidence';
import translationEN from '@locales/en';
import BugDetailsSection from '@pages/BugVerification/sections/BugDetailsSection';
import CollagePanel from '@pages/BugVerification/sections/collage/CollagePanel';
import SlotsSection from '@pages/BugVerification/sections/SlotsSection';

export default function BugVerificationPage() {
    const { newBug } = useEvidence();

    const header = (
        <AppHeader
            title={translationEN.brandname}
            icon={<SplitIcon size={20} />}
            actions={<Button icon={<PlusIcon size={16} />} onClick={newBug}>{translationEN.newBug}</Button>}
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