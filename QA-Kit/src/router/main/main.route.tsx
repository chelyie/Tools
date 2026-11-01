import { Navigate, type RouteObject } from 'react-router-dom';
import BugVerificationPage from '@pages/BugVerification';
import SavedBugsPage from '@pages/SavedBugs';
import SavedBugDetail from '@pages/SavedBugs/SavedBugDetail';
import AuthGate from '@router/AuthGate';

export const mainRoutes: RouteObject[] = [
    {
        element: <AuthGate />,
        children: [
            { path: '/', element: <BugVerificationPage /> },
            { path: '/bugs', element: <SavedBugsPage /> },
            { path: '/bugs/:bugId', element: <SavedBugDetail /> }
        ]
    },
    { path: '*', element: <Navigate to="/" replace /> }
];