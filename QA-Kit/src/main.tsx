import './locales/index';
import './assets/css/index.css';
import App from './App';
import { createRoot } from 'react-dom/client';

const element = document.getElementById('root');


if (element) {
    createRoot(element).render(<App />);
}