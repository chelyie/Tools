import { Navigate, type RouteObject } from 'react-router-dom';
import BugVerificationPage from '@pages/BugVerification';

export const mainRoutes: RouteObject[] = [
    { path: '/', element: <BugVerificationPage /> },
    { path: '*', element: <Navigate to="/" replace /> }
];