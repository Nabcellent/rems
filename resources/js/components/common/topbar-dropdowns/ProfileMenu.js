import { Dropdown } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { Link, usePage } from '@inertiajs/inertia-react';

import user1 from "../../../assets/images/users/avatar-1.jpg";

const ProfileMenu = () => {
    const { auth: { user } } = usePage().props;

    return (
        <Dropdown className="d-inline-block">
            <Dropdown.Toggle className="text-dark border-0 bg-transparent header-item" id="page-header-user-dropdown">
                <img className="rounded-circle header-profile-user" src={user1} alt="Header Avatar"/>{" "}
                <span className="d-none d-xl-inline-block ms-1">{user.last_name}</span>
                <i className="mdi mdi-chevron-down d-none d-xl-inline-block"/>
            </Dropdown.Toggle>
            <Dropdown.Menu className="dropdown-menu-end">
                <Dropdown.Item tag="a" as={Link} href={route("dashboard.profile")}>
                    <i className="bx bx-user font-size-16 align-middle ms-1"/>
                    Profile
                </Dropdown.Item>
                <Dropdown.Item as={Link} href={route('dashboard.wallet')}>
                    <i className="bx bx-wallet font-size-16 align-middle me-1"/>
                    My Wallet
                </Dropdown.Item>
                <Dropdown.Item tag="a" href={route("dashboard.users.settings")}>
                    <span className="badge bg-success float-end">11</span>
                    <i className="bx bx-wrench font-size-17 align-middle me-1"/>
                    Settings
                </Dropdown.Item>
                <Dropdown.Item tag="a" href="auth-lock-screen">
                    <i className="bx bx-lock-open font-size-16 align-middle me-1"/>
                    {("Lock screen")}
                </Dropdown.Item>
                <div className="dropdown-divider"/>
                <Link href={route('logout')} method="post" as={'button'} className="dropdown-item">
                    <i className="bx bx-power-off font-size-16 align-middle me-1 text-danger"/>
                    <span>Logout</span>
                </Link>
            </Dropdown.Menu>
        </Dropdown>
    );
};

ProfileMenu.propTypes = {
    success: PropTypes.string
};

export default ProfileMenu;
