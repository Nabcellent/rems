import React from "react";
import PropTypes from "prop-types";
import { Link } from "@inertiajs/inertia-react";

//i18n
import SidebarContent from "./SidebarContent";

import logo from "../assets/images/logo.svg";
import logoLightPng from "../assets/images/logo-light.png";
import logoLightSvg from "../assets/images/logo-light.svg";
import logoDarkSvg from "../assets/images/logo-dark.svg";

const Sidebar = ({type}) => {
    return (
        <React.Fragment>
            <div className="vertical-menu">
                <div className="navbar-brand-box">
                    <Link href="/" className="logo logo-dark">
                        <span className="logo-sm"><img src={logo} alt="" height="22"/></span>
                        <span className="logo-lg"><img src={logoDarkSvg} alt="" height="20"/></span>
                    </Link>

                    <Link href="/" className="logo logo-light">
                        <span className="logo-sm">
                             <img src={logoLightSvg} alt="" height="22"/>
                        </span>
                        <span className="logo-lg">
                            <img src={logoLightPng} alt="" height="19"/>
                        </span>
                    </Link>
                </div>

                <div data-simplebar className="h-100">
                    {type !== "condensed" ? <SidebarContent/> : <SidebarContent/>}
                </div>
                <div className="sidebar-background"></div>
            </div>
        </React.Fragment>
    );
};

Sidebar.propTypes = {
    type: PropTypes.string,
};

export default Sidebar;
