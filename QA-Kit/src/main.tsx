import { createRoot } from 'react-dom/client';
import '@assets/css/index.css';
import EvidenceProvider from '@context/EvidenceProvider';
import AppRouter from '@router/AppRouter';

const element = document.getElementById('root');

if (element) {
    createRoot(element)
        .render(
            <EvidenceProvider>
                <AppRouter />
            </EvidenceProvider>
        );
}