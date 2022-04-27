import PropTypes from "prop-types";
import React, { Component } from "react";

//Simple bar
import SimpleBar from "simplebar-react";

// MetisMenu
import MetisMenu from "metismenujs";
import { Link } from "@inertiajs/inertia-react";

//i18n

class SidebarContent extends Component {
    constructor(props) {
        super(props);
        this.refDiv = React.createRef();
    }

    componentDidMount() {
        this.initMenu();
    }

    // eslint-disable-next-line no-unused-vars
    componentDidUpdate(prevProps, prevState, ss) {
        if (this.props.type !== prevProps.type) {
            this.initMenu();
        }
    }

    initMenu() {
        new MetisMenu("#side-menu");

        let matchingMenuItem = null;
        const ul = document.getElementById("side-menu");
        const items = ul.getElementsByTagName("a");

        for (let i = 0; i < items.length; ++i) {
            if (this.props.location?.pathname === items[i].pathname) {
                matchingMenuItem = items[i];
                break;
            }
        }
        if (matchingMenuItem) {
            this.activateParentDropdown(matchingMenuItem);
        }
    }

    // componentDidUpdate() {}

    scrollElement = item => {
        setTimeout(() => {
            if (this.refDiv.current !== null) {
                if (item) {
                    const currentPosition = item.offsetTop;
                    if (currentPosition > window.innerHeight) {
                        if (this.refDiv.current)
                            this.refDiv.current.getScrollElement().scrollTop =
                                currentPosition - 300;
                    }
                }
            }
        }, 300);
    };

    activateParentDropdown = item => {
        item.classList.add("active");
        const parent = item.parentElement;

        const parent2El = parent.childNodes[1];
        if (parent2El && parent2El.id !== "side-menu") {
            parent2El.classList.add("mm-show");
        }

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
            this.scrollElement(item);
            return false;
        }
        this.scrollElement(item);
        return false;
    };

    render() {
        return (
            <React.Fragment>
                <SimpleBar className="h-100" ref={this.refDiv}>
                    <div id="sidebar-menu">
                        <ul className="metismenu list-unstyled" id="side-menu">
                            <li className="menu-title">{("Menu")}</li>
                            <li>
                                <Link href="/#">
                                    <i className="bx bx-home-circle" />
                                    <span className="badge rounded-pill bg-info float-end">02</span>
                                    <span>{("Dashboards")}</span>
                                </Link>
                                <ul className="sub-menu" aria-expanded="false">
                                    <li><Link href="/dashboard">{("Default")}</Link></li>
                                    <li><Link href="/dashboard/analytics">{("Analytics")}</Link></li>
                                </ul>
                            </li>

                            <li className="menu-title">{("Apps")}</li>

                            <li>
                                <Link href="/calendar" className="">
                                    <i className="bx bx-calendar" />
                                    <span>{("Calendar")}</span>
                                </Link>
                            </li>

                            <li>
                                <Link href="/#" className="has-arrow">
                                    <i className="bx bxs-user-detail" />
                                    <span>{("Contacts")}</span>
                                </Link>
                                <ul className="sub-menu" aria-expanded="false">
                                    <li><Link href="/contacts">{("User List")}</Link></li>
                                    <li><Link href="/contacts-profile">Profile</Link></li>
                                </ul>
                            </li>

                            <li>
                                <Link href="/#" className="has-arrow">
                                    <i className="bx bxs-detail" />
                                    <span>Leases</span>
                                </Link>
                                <ul className="sub-menu" aria-expanded="false">
                                    <li><Link href="/list">List</Link></li>
                                    <li><Link href="/leases/leaseId">Details</Link></li>
                                </ul>
                            </li>

                            <li className="menu-title">System</li>

                            <li>
                                <Link href="/settings" className="">
                                    <i className="bx bx-cog" />
                                    <span>Settings</span>
                                </Link>
                            </li>
                        </ul>
                    </div>
                </SimpleBar>
            </React.Fragment>
        );
    }
}

SidebarContent.propTypes = {
    location: PropTypes.object,
    t: PropTypes.any,
    type: PropTypes.string,
};

export default SidebarContent;
