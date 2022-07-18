import './bootstrap';
import React from 'react';
import { createRoot } from 'react-dom/client';
import { createInertiaApp } from '@inertiajs/inertia-react';
import { InertiaProgress } from '@inertiajs/progress';
import { ThemeProvider } from '@mui/material/styles';
import { theme } from '@/theme';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';

import '../css/app.css';
import '../css/style.css';

const appName = window.document.getElementsByTagName('title')[0]?.innerText || 'REMS';

createInertiaApp({
    title: title => `${title && title + ' |'} ${appName}`,
    resolve: name => resolvePageComponent(`./pages/${name}.jsx`, import.meta.glob('./pages/**/*.jsx')),
    setup: ({ el, App, props }) => {
        window.can = props.initialPage.props.can;

        const { color, isDarkMode } = props.initialPage.props.theme;

        return createRoot(el).render(
            <ThemeProvider theme={theme(color, isDarkMode)}><App {...props} /></ThemeProvider>
        );
    }
});

InertiaProgress.init({ color: '#4B5563', showSpinner: true });
