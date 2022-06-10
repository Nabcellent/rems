import React from 'react';

export const sidebarLinks = can => {
    return [
        {
            title: 'Menu',
            menu: [
                {
                    authorized: true,
                    startIcon: <i className="bx bxs-dashboard"/>,
                    title: 'Dashboard',
                    subMenu: [
                        { authorized: true, link: route('dashboard.default'), title: 'Default' },
                        { authorized: true, link: route('dashboard.analytics'), title: 'Analytics' }
                    ]
                }
            ]
        },
        {
            title: 'Entities',
            menu: [
                {
                    authorized: can.access.leases,
                    startIcon: <i className="bx bxs-detail"/>, title: 'Leases', subMenu: [
                        { authorized: true, link: route('dashboard.leases.index'), title: 'list' },
                        { authorized: can.create.lease, link: '/leases', title: 'create' }
                    ]
                },
                {
                    authorized: can.access.units,
                    startIcon: <i className="bx bxs-home"/>, title: 'Units', subMenu: [
                        { authorized: true, link: route('dashboard.units.index'), title: 'list' },
                        { authorized: can.create.unit, link: '/units', title: 'create' }
                    ]
                },
                {
                    authorized: can.access.properties,
                    startIcon: <i className="bx bxs-home-circle"/>, title: 'Properties', subMenu: [
                        { authorized: true, link: route('dashboard.properties.index'), title: 'list' },
                        { authorized: can.create.property, link: '/estates', title: 'create' }
                    ]
                },
                {
                    authorized: can.access.estates,
                    startIcon: <i className="bx bxs-building-house"/>, title: 'Estates', subMenu: [
                        { authorized: true, link: route('dashboard.estates.index'), title: 'list' },
                        { authorized: can.create.estate, link: '/estates', title: 'create' }
                    ]
                },
            ]
        },
        {
            title: 'Apps',
            menu: [
                {
                    startIcon: <i className="bx bxs-user-detail"/>, title: 'Contacts', subMenu: [
                        { link: '/contacts', title: 'list' },
                        { link: '/notify', title: 'Notify' }
                    ]
                },
                {
                    authorized: can.access.transactions,
                    startIcon: <i className="bx bx-transfer"/>,
                    title: 'Transactions',
                    link: route('dashboard.transactions.index')
                },
                {
                    authorized: can.access.payments,
                    startIcon: <i className="bx bxs-coin-stack"/>, title: 'Payments', subMenu: [
                        { authorized: true, link: route('dashboard.payments.index'), title: 'list' },
                        { authorized: true, link: '/notify', title: 'plans' }
                    ]
                },
                {
                    authorized: can.access.notices,
                    startIcon: <i className="bx bxs-notification"/>, title: 'Notices', subMenu: [
                        { authorized: true, link: route('dashboard.notices.index'), title: 'list' },
                        { authorized: true, link: route('dashboard.notices.create'), title: 'create' }
                    ]
                }
            ]
        },
        {
            title: 'System',
            menu: [
                {
                    authorized: can.access.tickets,
                    startIcon: <i className="bx bxs-hand"/>,
                    title: 'Tickets',
                    link: route('dashboard.tickets.index')
                },
                {
                    authorized: can.access.services,
                    startIcon: <i className="bi bi-tools"/>, title: 'Services', subMenu: [
                        { authorized: true, link: route('dashboard.services.index'), title: 'List Services' },
                        {
                            authorized: true,
                            link: route('dashboard.service-providers.index'),
                            title: 'List Service Providers'
                        },
                        {
                            authorized: can.create.service,
                            link: route('dashboard.services.create'),
                            title: 'Create Service'
                        },
                        {
                            authorized: can.create.service_provider,
                            link: route('dashboard.service-providers.create'),
                            title: 'Create Service Provider'
                        }
                    ]
                },
                {
                    authorized: can.access.users,
                    startIcon: <i className="bx bxs-user-account"/>, title: 'Users', subMenu: [
                        { authorized: true, link: route('dashboard.users.index'), title: 'list' },
                        { authorized: can.create.user, link: route('dashboard.users.create'), title: 'Create' }
                    ]
                },
                {
                    authorized: true,
                    startIcon: <i className="bx bx-user-circle"/>, title: 'Profile', link: route('dashboard.profile')
                },
                {
                    authorized: true,
                    startIcon: <i className="bx bx-cog"/>, title: 'Settings', link: route('dashboard.users.settings')
                },
                {
                    authorized: can.access.settings,
                    startIcon: <i className="bx bx-cog"/>, title: 'Settings', link: route('dashboard.settings')
                },
            ]
        }
    ];
};
