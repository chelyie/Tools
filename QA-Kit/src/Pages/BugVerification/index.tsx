import { Link } from 'react-router-dom';
import Button from '@components/button/Button';
import { PlusIcon, SplitIcon } from '@components/icon/icons';
import AccountBar from '@auth/AccountBar';
import AppHeader from '@components/layout/AppHeader';
import PageLayout from '@components/layout/PageLayout';
import useAuth from '@hooks/useAuth';
import useEvidence from '@hooks/useEvidence';
import translationEN from '@locales/en';
import type { EvidenceKind } from '@type/Evidence.type';
import CollagePanel from '@pages/BugVerification/sections/collage/CollagePanel';
import SlotsSection from '@pages/BugVerification/sections/slot/SlotsSection';

/** The bug report page (kind "bug") and its copy for checking a fix (kind "fixed"). Only the title and ticket ID differ. */
export default function BugVerificationPage({ kind }: { kind: EvidenceKind }) {
    const isFix = kind === 'fixed';
    const { newBug } = useEvidence();
    const { user } = useAuth();

    const header = (
        <AppHeader
            title={isFix
                ? translationEN.fixBrandname
                : translationEN.brandname}
            icon={<SplitIcon size={20} />}
            actions={(
                <>
                    <Link to={isFix
                        ? '/'
                        : '/fixed'} className="btn btn--outline"
                    >
                        {isFix
                            ? translationEN.brandname
                            : translationEN.fixBrandname}
                    </Link>
                    {user && <Link to="/bugs" className="btn btn--outline">{translationEN.savedBugs}</Link>}
                    <Button icon={<PlusIcon size={16} />} onClick={newBug}>{isFix
                        ? translationEN.newFix
                        : translationEN.newBug}
                    </Button>
                    <AccountBar />
                </>
            )}
        />
    );

    return (
        <PageLayout header={header}>
            <div className="app-inputs">
                <SlotsSection />
            </div>
            <CollagePanel />
        </PageLayout>
    );
}