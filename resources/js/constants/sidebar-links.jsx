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
                    authorized: can.access.estates,
                    startIcon: <i className="bx bxs-building-house"/>, title: 'Estates', subMenu: [
                        { authorized: true, link: route('dashboard.estates.index'), title: 'List' },
                        { authorized: can.create.estate, link: route('dashboard.estates.create'), title: 'Create' }
                    ]
                },
                {
                    authorized: can.access.properties,
                    startIcon: <i className="bx bxs-home-circle"/>, title: 'Properties', subMenu: [
                        { authorized: true, link: route('dashboard.properties.index'), title: 'List' },
                        { authorized: can.create.property, link: route('dashboard.properties.create'), title: 'Create' }
                    ]
                },
                {
                    authorized: can.access.units,
                    startIcon: <i className="bx bxs-home"/>, title: 'Units', subMenu: [
                        { authorized: true, link: route('dashboard.units.index'), title: 'List' },
                        { authorized: can.create.unit, link: route('dashboard.units.create'), title: 'Create' }
                    ]
                },
                {
                    authorized: can.access.leases,
                    startIcon: <i className="bx bxs-detail"/>, title: 'Leases', subMenu: [
                        { authorized: true, link: route('dashboard.leases.index'), title: 'List' },
                        { authorized: can.create.lease, link: route('dashboard.leases.create'), title: 'Create' }
                    ]
                },

            ]
        },
        {
            title: 'Apps',
            menu: [
                {
                    startIcon: <i className="bx bxs-user-detail"/>, title: 'Contacts', subMenu: [
                        { link: '/contacts', title: 'List' },
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
                        { authorized: true, link: route('dashboard.payments.index'), title: 'List' },
                        { authorized: true, link: '/notify', title: 'Plans' }
                    ]
                },
                {
                    authorized: can.access.notices,
                    startIcon: <i className="bx bxs-notification"/>, title: 'Notices', subMenu: [
                        { authorized: true, link: route('dashboard.notices.index'), title: 'List' },
                        { authorized: true, link: route('dashboard.notices.create'), title: 'Create' }
                    ]
                }
            ]
        },
        {
            title: 'System',
            menu: [
                {
                    authorized: can.access.users,
                    startIcon: <i className="bx bxs-user-account"/>, title: 'Users', subMenu: [
                        { authorized: true, link: route('dashboard.users.index'), title: 'List' },
                        { authorized: can.create.user, link: route('dashboard.users.create'), title: 'Create' }
                    ]
                },
                {
                    authorized: can.access.tickets,
                    startIcon: <i className="bx bxs-hand"/>,
                    title: 'Tickets',
                    link: route('dashboard.tickets.index')
                },
                {
                    authorized: can.access.amenities,
                    startIcon: <i className="bx bx-dumbbell"/>,
                    title: 'Amenities',
                    subMenu: [
                        { authorized: true, link: route('dashboard.amenities.index'), title: 'List' },
                        { authorized: can.create.amenity, link: route('dashboard.amenities.create'), title: 'Create' }
                    ],
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
                    authorized: true,
                    startIcon: <i className="bx bx-user-circle"/>, title: 'Profile', link: route('dashboard.profile')
                },
                {
                    authorized: true,
                    startIcon: <i className="bx bxs-cog"/>,
                    title: can.access.settings ? 'User Settings' : 'Settings',
                    link: route('dashboard.users.settings')
                },
                {
                    authorized: can.access.settings,
                    startIcon: <i className="bx bx-cog"/>, title: 'Settings', link: route('dashboard.settings')
                },
            ]
        }
    ];
};
