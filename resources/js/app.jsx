import Auth from '@/layouts/Auth';
import React from 'react';
import { createRoot } from 'react-dom/client';
import { createInertiaApp } from '@inertiajs/inertia-react';
import { InertiaProgress } from '@inertiajs/progress';
import 'boxicons/css/boxicons.min.css';
import { ThemeProvider } from '@mui/material/styles';
import { theme } from '@/theme';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';

import './bootstrap';
import '../css/app.css';

const appName = window.document.getElementsByTagName('title')[0]?.innerText || 'REMS';

createInertiaApp({
    title: (title) => `${title && title + ' |'} ${appName}`,
    resolve: (name) => {
        // const page = require(`./pages/${name}`).default;
        const page = resolvePageComponent(`./Pages/${name}`, import.meta.glob('./Pages/**/*')).default;

        if (page.layout === undefined && name.startsWith('auth/')) page.layout = page => <Auth children={page}/>;

        return page;
    },
    setup: ({ el, App, props }) => {
        const { color, isDarkMode } = props.initialPage.props.theme;

        return createRoot(el).render(
            <ThemeProvider theme={theme(color, isDarkMode)}><App {...props} /></ThemeProvider>
        );
    }
});

InertiaProgress.init({ color: '#4B5563', showSpinner: true });
