import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import App from './App';

import { StudentProvider } from './context/StudentContext';
import { ThemeProvider } from './context/ThemeContext';

import './index.css';

createRoot(
    document.getElementById('root')
).render(

    <StrictMode>

        <ThemeProvider>

            <StudentProvider>

                <App />

            </StudentProvider>

        </ThemeProvider>

    </StrictMode>
);
