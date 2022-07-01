import logo from "../assets/images/logo-dark.svg";
import { Link } from "@inertiajs/inertia-react";
import NotificationDropdown from '@/components/common/topbar-dropdowns/NotificationDropdown';
import ProfileMenu from '@/components/common/topbar-dropdowns/ProfileMenu';
import { useEffect, useState } from 'react';

const Header = ({ toggleMenuCallback, isSearch }) => {
    const [canSearch, setCanSearch] = useState(false);

    const toggleMenu = () => toggleMenuCallback();

    const toggleFullscreen = () => {
        if (
            !document.fullscreenElement &&
            /* alternative standard method */ !document.mozFullScreenElement &&
            !document.webkitFullscreenElement
        ) {
            // current working methods
            if (document.documentElement.requestFullscreen) {
                document.documentElement.requestFullscreen();
            } else if (document.documentElement.mozRequestFullScreen) {
                document.documentElement.mozRequestFullScreen();
            } else if (document.documentElement.webkitRequestFullscreen) {
                document.documentElement.webkitRequestFullscreen(
                    Element.ALLOW_KEYBOARD_INPUT
                );
            }
        } else {
            if (document.cancelFullScreen) {
                document.cancelFullScreen();
            } else if (document.mozCancelFullScreen) {
                document.mozCancelFullScreen();
            } else if (document.webkitCancelFullScreen) {
                document.webkitCancelFullScreen();
            }
        }
    };

    useEffect(() => {
        setCanSearch(isSearch);
    }, [isSearch]);

    return (
        <header id="page-topbar">
            <div className="navbar-header">
                <div className="d-flex">
                    <div className="navbar-brand-box d-lg-none d-md-block">
                        <Link href="/" className="logo logo-dark">
                            <span className="logo-sm">
                                <img src={logo} alt="" height="22"/>
                            </span>
                        </Link>
                    </div>

                    <button type="button" onClick={toggleMenu} className="btn btn-sm px-3 font-size-16 header-item"
                            id="vertical-menu-btn">
                        <i className="fa fa-fw fa-bars"></i>
                    </button>

                    <form className="app-search d-none d-lg-block">
                        <div className="position-relative">
                            <input type="text" className="form-control" placeholder={`Search...`}/>
                            <span className="bx bx-search-alt"></span>
                        </div>
                    </form>
                </div>

                <div className="d-flex">
                    <div className="dropdown d-inline-block d-lg-none ms-2">
                        <button
                            onClick={() => setCanSearch(!canSearch)}
                            type="button"
                            className="btn header-item noti-icon"
                            id="page-header-search-dropdown"
                        >
                            <i className="mdi mdi-magnify"></i>
                        </button>
                        <div className={
                            canSearch
                                ? "dropdown-menu dropdown-menu-lg dropdown-menu-end p-0 show"
                                : "dropdown-menu dropdown-menu-lg dropdown-menu-end p-0"
                        } aria-labelledby="page-header-search-dropdown">
                            <form className="p-3">
                                <div className="form-group m-0">
                                    <div className="input-group">
                                        <input
                                            type="text"
                                            className="form-control"
                                            placeholder="Search ..."
                                            aria-label="Recipient's username"
                                        />
                                        <div className="input-group-append">
                                            <button className="btn btn-primary" type="submit">
                                                <i className="mdi mdi-magnify"></i>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>

                    <div className="dropdown d-none d-lg-inline-block ms-1">
                        <button
                            type="button"
                            onClick={toggleFullscreen}
                            className="btn header-item noti-icon"
                            data-toggle="fullscreen"
                        >
                            <i className="bx bx-fullscreen"></i>
                        </button>
                    </div>

                    <NotificationDropdown/>
                    <ProfileMenu/>
                </div>
            </div>
        </header>
    );
};

export default Header;
