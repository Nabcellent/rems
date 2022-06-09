import PropTypes from "prop-types";
import React, { useEffect, useRef, useState } from "react";

//Simple bar
import SimpleBar from "simplebar-react";

// MetisMenu
import MetisMenu from "metismenujs";
import { Link, usePage } from "@inertiajs/inertia-react";
import { sidebarLinks } from '@/constants/sidebar-links';

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
                menu.map((item, i) => item?.authorized && (
                    <li key={`menu-${i}`}
                        className={item.subMenu?.find(m => isActive(m.link)) || isActive(item.link) ? 'mm-active' : ''}>
                        <Link href={item.link} className={item.subMenu && 'has-arrow'}>
                            {item.startIcon}<span>{item.title}</span>
                        </Link>
                        {
                            item.subMenu &&
                            <ul className="sub-menu" aria-expanded="false">
                                {
                                    item.subMenu.map((subMenu, i) => subMenu?.authorized && (
                                        <li key={`sub-menu-${i}`}>
                                            <Link href={subMenu.link}
                                                  className={isActive(subMenu.link) ? 'mm-active' : ''}>
                                                {subMenu.title}
                                            </Link>
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
    const { can } = usePage().props;
    const [links, setLinks] = useState(null);

    const initMenu = () => new MetisMenu("#side-menu");

    useEffect(() => {
        initMenu();

        if (type !== prevType) initMenu();

        setLinks(sidebarLinks(can));
    }, [type]);

    return (
        <React.Fragment>
            <SimpleBar className="h-100" ref={refDiv}>
                <div id="sidebar-menu">
                    <ul className="metismenu list-unstyled" id="side-menu">
                        {
                            links && links.map((section, i) => (
                                <Section key={`section-${i}`} title={section.title} menu={section.menu}/>
                            ))
                        }
                    </ul>
                </div>
            </SimpleBar>
        </React.Fragment>
    );
};

Section.propTypes = {
    title: PropTypes.string.isRequired,
    menu: PropTypes.arrayOf(PropTypes.shape({
        title: PropTypes.string.isRequired,
        startIcon: PropTypes.node,
        authorized: PropTypes.bool,
        subMenu: PropTypes.arrayOf(PropTypes.shape({
            title: PropTypes.string.isRequired,
            link: PropTypes.string.isRequired,
            authorized: PropTypes.bool,
        }))
    }))
};

SidebarContent.propTypes = {
    location: PropTypes.object,
    type: PropTypes.string,
};

export default SidebarContent;
