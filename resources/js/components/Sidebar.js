import { Link, usePage } from "@inertiajs/inertia-react";

import SidebarContent from "./SidebarContent";

import logo from "../assets/images/logo-dark.svg";
import logoLightPng from "../../../public/images/logo-light-skote.png";
import logoLightSvg from "../assets/images/logo-light.svg";
import logoDarkSvg from "../assets/images/logo-dark-full.svg";

const Sidebar = () => {
    const {auth: {user}, greeting} = usePage().props;

    return (
        <>
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

                <div id={'sidebar-greeting'} className={'row justify-content-center'}>
                    <div className="col-auto">
                        <h6>{greeting} {user.last_name}</h6>
                        <hr className={'mb-0'}/>
                    </div>
                </div>

                <div data-simplebar className="h-100"><SidebarContent/></div>
                <div className="sidebar-background"></div>
            </div>
        </>
    );
};

export default Sidebar;
