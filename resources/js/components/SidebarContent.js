import PropTypes from "prop-types";
import React, { useEffect, useRef } from "react";

//Simple bar
import SimpleBar from "simplebar-react";

// MetisMenu
import MetisMenu from "metismenujs";
import { Link, usePage } from "@inertiajs/inertia-react";
import { Badge } from 'react-bootstrap';

function usePrevious(value) {
    const ref = useRef();
    useEffect(() => {
        ref.current = value;
    });
    return ref.current;
}

const Section = ({ title, menu }) => {
    const { url } = usePage();

    const isActive = link => {
        try {
            return new URL(link).pathname === url;
        } catch (err) {
            return false;
        }
    };

    return (
        <>
            <li className="menu-title">{title}</li>

            {
                menu.map((item, i) => (
                    <li key={`menu-${i}`}
                        className={item.subMenu?.find(m => isActive(m.link)) || isActive(item.link) ? 'mm-active' : ''}>
                        <Link href={item.link} className={item.subMenu && 'has-arrow'}>
                            {item.startIcon}<span>{item.title}</span>
                        </Link>
                        {
                            item.subMenu &&
                            <ul className="sub-menu" aria-expanded="false">
                                {
                                    item.subMenu.map((subMenu, i) => (
                                        <li key={`sub-menu-${i}`}>
                                            <Link href={subMenu.link}
                                                  className={isActive(subMenu.link) ? 'mm-active' : ''}>{subMenu.title}</Link>
                                        </li>
                                    ))
                                }
                            </ul>
                        }
                    </li>
                ))
            }
        </>
    );
};

//i18n
const SidebarContent = ({ type }) => {
    const refDiv = useRef();
    const prevType = usePrevious(type);

    const initMenu = () => {
        new MetisMenu("#side-menu");
    };

    useEffect(() => {
        initMenu();

        if (type !== prevType) initMenu();
    }, [type]);

    const sections = [
        {
            title: 'Menu',
            menu: [
                {
                    startIcon: <i className="bx bxs-dashboard"/>,
                    title: 'Dashboard',
                    subMenu: [
                        { link: route('dashboard.default'), title: 'Default' },
                        { link: route('dashboard.analytics'), title: 'Analytics' }
                    ]
                }
            ]
        },
        {
            title: 'Entities',
            menu: [
                {
                    startIcon: <i className="bx bxs-detail"/>, title: 'Leases', subMenu: [
                        { link: route('dashboard.leases.index'), title: 'list' },
                        { link: '/leases', title: 'create' }
                    ]
                },
                {
                    startIcon: <i className="bx bxs-home"/>, title: 'Units', subMenu: [
                        { link: route('dashboard.units.index'), title: 'list' },
                        { link: '/units', title: 'create' }
                    ]
                },
                {
                    startIcon: <i className="bx bxs-home-circle"/>, title: 'Properties', subMenu: [
                        { link: route('dashboard.properties.index'), title: 'list' },
                        { link: '/estates', title: 'create' }
                    ]
                },
                {
                    startIcon: <i className="bx bxs-building-house"/>, title: 'Estates', subMenu: [
                        { link: route('dashboard.estates.index'), title: 'list' },
                        { link: '/estates', title: 'create' }
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
                    startIcon: <i className="bx bx-transfer"/>,
                    title: 'Transactions',
                    link: route('dashboard.transactions.index')
                },
                {
                    startIcon: <i className="bx bxs-coin-stack"/>, title: 'Payments', subMenu: [
                        { link: route('dashboard.payments.index'), title: 'list' },
                        { link: '/notify', title: 'Plans' }
                    ]
                },
                {
                    startIcon: <i className="bx bxs-notification"/>, title: 'Notices', subMenu: [
                        { link: route('dashboard.notices.index'), title: 'list' },
                        { link: route('dashboard.notices.create'), title: 'create' }
                    ]
                }
            ]
        },
        {
            title: 'System',
            menu: [
                { startIcon: <i className="bx bxs-hand"/>, title: 'Tickets', link: route('dashboard.tickets.index') },
                {
                    startIcon: <i className="bi bi-tools"/>, title: 'Services', subMenu: [
                        { link: route('dashboard.services.index'), title: 'List Services' },
                        { link: route('dashboard.service-providers.index'), title: 'List Service Providers' },
                        { link: route('dashboard.services.create'), title: 'Create Service' },
                        { link: route('dashboard.service-providers.create'), title: 'Create Service Provider' }
                    ]
                },
                {
                    startIcon: <i className="bx bxs-user-account"/>, title: 'Users', subMenu: [
                        { link: route('dashboard.users.index'), title: 'list' },
                        { link: '/grid', title: 'Grid' }
                    ]
                },
                { startIcon: <i className="bx bx-cog"/>, title: 'Settings', link: route('dashboard.settings') },
            ]
        }
    ];

    return (
        <React.Fragment>
            <SimpleBar className="h-100" ref={refDiv}>
                <div id="sidebar-menu">
                    <ul className="metismenu list-unstyled" id="side-menu">
                        {
                            sections.map((section, i) => <Section key={`section-${i}`} title={section.title}
                                                                  menu={section.menu}/>)
                        }
                    </ul>
                </div>
            </SimpleBar>
        </React.Fragment>
    );
};

SidebarContent.propTypes = {
    location: PropTypes.object,
    type: PropTypes.string,
};

export default SidebarContent;
