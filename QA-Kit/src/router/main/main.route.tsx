import { Navigate, type RouteObject } from 'react-router-dom';
import BugVerificationPage from '@pages/BugVerification';
import SavedBugsPage from '@pages/SavedBugs';
import SavedBugDetail from '@pages/SavedBugs/SavedBugDetail';
import EvidenceProvider from '@evidence/EvidenceProvider';
import AuthGate from '@router/AuthGate';
import type { EvidenceKind } from '@type/Evidence.type';

/**
 * Each report page gets its own provider. The key makes React start fresh when you switch pages;
 * without it both pages share one component position and would keep each other's slots and ticket number.
 */
function reportPage(kind: EvidenceKind) {
    return (
        <EvidenceProvider key={kind} kind={kind}>
            <BugVerificationPage kind={kind} />
        </EvidenceProvider>
    );
}

export const mainRoutes: RouteObject[] = [
    {
        element: <AuthGate />,
        children: [
            { path: '/', element: reportPage('bug') },
            { path: '/fixed', element: reportPage('fixed') },
            { path: '/bugs', element: <SavedBugsPage /> },
            { path: '/bugs/:bugId', element: <SavedBugDetail /> }
        ]
    },
    { path: '*', element: <Navigate to="/" replace /> }
];