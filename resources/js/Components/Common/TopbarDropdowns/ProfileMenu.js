import { useState } from 'react';
import { Dropdown, DropdownItem, DropdownMenu, DropdownToggle } from 'reactstrap';
import PropTypes from 'prop-types';
import { Link } from '@inertiajs/inertia-react';

import user1 from "../../../assets/images/users/avatar-1.jpg";

const ProfileMenu = () => {
    const [menu, setMenu] = useState(false);
    const [name, setName] = useState("Admin");

    const toggle = () => setMenu(!menu);

    return (
        <Dropdown isOpen={menu} toggle={toggle} className="d-inline-block">
            <DropdownToggle className="btn header-item" id="page-header-user-dropdown" tag="button">
                <img className="rounded-circle header-profile-user" src={user1} alt="Header Avatar"/>{" "}
                <span className="d-none d-xl-inline-block ms-1">
                    {name}
                </span>
                <i className="mdi mdi-chevron-down d-none d-xl-inline-block"/>
            </DropdownToggle>
            <DropdownMenu className="dropdown-menu-end">
                <DropdownItem tag="a" href="/profile">
                    <i className="bx bx-user font-size-16 align-middle ms-1"/>
                    Profile
                </DropdownItem>
                <DropdownItem tag="a" href="/crypto-wallet">
                    <i className="bx bx-wallet font-size-16 align-middle me-1"/>
                    My Wallet
                </DropdownItem>
                <DropdownItem tag="a" href="#">
                    <span className="badge bg-success float-end">11</span>
                    <i className="bx bx-wrench font-size-17 align-middle me-1"/>
                    Settings
                </DropdownItem>
                <DropdownItem tag="a" href="auth-lock-screen">
                    <i className="bx bx-lock-open font-size-16 align-middle me-1"/>
                    {("Lock screen")}
                </DropdownItem>
                <div className="dropdown-divider"/>
                <Link href={route('logout')} method="post" className="dropdown-item">
                    <i className="bx bx-power-off font-size-16 align-middle me-1 text-danger"/>
                    <span>Logout</span>
                </Link>
            </DropdownMenu>
        </Dropdown>
    );
};

ProfileMenu.propTypes = {
    success: PropTypes.string
};

export default ProfileMenu;
