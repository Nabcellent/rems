import Guest from '@/layouts/Guest';
import React from 'react';
import { createRoot } from 'react-dom/client';
import { createInertiaApp } from '@inertiajs/inertia-react';
import { InertiaProgress } from '@inertiajs/progress';
import 'boxicons/css/boxicons.min.css';

import('./bootstrap');

const appName = window.document.getElementsByTagName('title')[0]?.innerText || 'REMS';

createInertiaApp({
    title: (title) => `${title && title + ' |'} ${appName}`,
    resolve: (name) => {
        const page = require(`./pages/${name}`).default;

        if (page.layout === undefined && name.startsWith('auth/')) page.layout = page => <Guest children={page}/>;

        return page;
    },
    setup: ({ el, App, props }) => createRoot(el).render(<App {...props}/>)
});

InertiaProgress.init({ color: '#4B5563' });
