import { createRoot } from 'react-dom/client';
import '@assets/css/index.css';
import AuthProvider from '@auth/AuthProvider';
import AppRouter from '@router/AppRouter';

const element = document.getElementById('root');

if (element) {
    createRoot(element)
        .render(
            <AuthProvider>
                <AppRouter />
            </AuthProvider>
        );
}