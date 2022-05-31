import PropTypes from "prop-types";
import React, { useEffect, useRef } from "react";

//Simple bar
import SimpleBar from "simplebar-react";

// MetisMenu
import MetisMenu from "metismenujs";
import { Link } from "@inertiajs/inertia-react";
import { Badge } from 'react-bootstrap';

function usePrevious(value) {
    const ref = useRef();
    useEffect(() => {
        ref.current = value;
    });
    return ref.current;
}

const Section = ({ title, menu }) => {
    return (
        <>
            <li className="menu-title">{title}</li>

            {
                menu.map((item, i) => (
                    <li key={`menu-${i}`}>
                        <Link href={item.link} className={item.subMenu && 'has-arrow'}>
                            {item.startIcon}<span>{item.title}</span>{item.endIcon}
                        </Link>
                        {
                            item.subMenu &&
                            <ul className="sub-menu" aria-expanded="false">
                                {
                                    item.subMenu.map((subMenu, i) => (
                                        <li key={`sub-menu-${i}`}><Link href={subMenu.link}>{subMenu.title}</Link></li>
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
const SidebarContent = ({ type, location }) => {
    const refDiv = useRef();
    const prevType = usePrevious(type);

    const scrollElement = item => {
        setTimeout(() => {
            if (refDiv.current !== null) {
                if (item) {
                    const currentPosition = item.offsetTop;
                    if (currentPosition > window.innerHeight) {
                        if (refDiv.current) refDiv.current.getScrollElement().scrollTop = currentPosition - 300;
                    }
                }
            }
        }, 300);
    };

    const activateParentDropdown = item => {
        item.classList.add("active");
        const parent = item.parentElement;

        const parent2El = parent.childNodes[1];

        if (parent2El && parent2El.id !== "side-menu") parent2El.classList.add("mm-show");

        if (parent) {
            parent.classList.add("mm-active");
            const parent2 = parent.parentElement;

            if (parent2) {
                parent2.classList.add("mm-show"); // ul tag

                const parent3 = parent2.parentElement; // li tag

                if (parent3) {
                    parent3.classList.add("mm-active"); // li
                    parent3.childNodes[0].classList.add("mm-active"); //a

                    const parent4 = parent3.parentElement; // ul

                    if (parent4) {
                        parent4.classList.add("mm-show"); // ul
                        const parent5 = parent4.parentElement;
                        if (parent5) {
                            parent5.classList.add("mm-show"); // li
                            parent5.childNodes[0].classList.add("mm-active"); // a tag
                        }
                    }
                }
            }
            scrollElement(item);
            return false;
        }
        scrollElement(item);
        return false;
    };

    const initMenu = () => {
        new MetisMenu("#side-menu");

        let matchingMenuItem = null;
        const ul = document.getElementById("side-menu");
        const items = ul.getElementsByTagName("a");

        for (let i = 0; i < items.length; ++i) {
            if (location?.pathname === items[i].pathname) {
                matchingMenuItem = items[i];
                break;
            }
        }

        if (matchingMenuItem) activateParentDropdown(matchingMenuItem);
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
                    endIcon: <Badge pill className={`small`}>02</Badge>,
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
                        { link: '/payments', title: 'list' },
                        { link: '/notify', title: 'Plans' }
                    ]
                }
            ]
        },
        {
            title: 'System',
            menu: [
                {
                    startIcon: <i className="bx bxs-user-account"/>, title: 'Users', subMenu: [
                        { link: route('dashboard.users.index'), title: 'list' },
                        { link: '/grid', title: 'Grid' }
                    ]
                },
                { startIcon: <i className="bx bx-cog"/>, title: 'Settings', link: '/settings' },
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
