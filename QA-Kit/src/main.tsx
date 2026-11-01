import { createRoot } from 'react-dom/client';
import '@assets/css/index.css';
import AuthProvider from '@context/AuthProvider';
import EvidenceProvider from '@context/EvidenceProvider';
import AppRouter from '@router/AppRouter';

const element = document.getElementById('root');

if (element) {
    createRoot(element)
        .render(
            <AuthProvider>
                <EvidenceProvider>
                    <AppRouter />
                </EvidenceProvider>
            </AuthProvider>
        );
}