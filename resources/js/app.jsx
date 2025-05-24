import './bootstrap';
import '../css/app.css';
import React from 'react';
import { createRoot } from 'react-dom/client';
import { createInertiaApp } from '@inertiajs/react';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';
import { ZiggyVue } from '../../vendor/tightenco/ziggy/dist/vue.m';
import { Ziggy } from './ziggy';
import { DarkModeProvider } from '@/Providers/DarkModeProvider';

const appName = import.meta.env.VITE_APP_NAME || 'Laravel';

createInertiaApp({
    title: (title) => `${title} - ${appName}`,
    resolve: (name) => resolvePageComponent(`./Pages/${name}.jsx`, import.meta.glob('./Pages/**/*.jsx')),
    setup({ el, App, props }) {
        const root = createRoot(el);

        root.render(
            <DarkModeProvider>
                <App {...props} />
            </DarkModeProvider>
        );
    },
    progress: {
        color: '#4B5563',
        showSpinner: true,
    },
    onError: (error) => {
        console.error('Inertia Error:', error);
    },
}); 