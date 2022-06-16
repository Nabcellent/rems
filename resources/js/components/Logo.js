import Box from '@mui/material/Box';
import PropTypes from 'prop-types';
import logo from '@/assets/images/logo-dark.svg';
import logoLight from '@/assets/images/logo-light.svg';
import logoDark from '@/assets/images/logo-dark.svg';
import logoLightFull from '@/assets/images/logo-light-full.svg';
import logoDarkFull from '@/assets/images/logo-dark-full.svg';
import { Link } from '@inertiajs/inertia-react';
import React from 'react';

const Logo = ({ dark = false, width, height }) => {
    return (
        <Link href="/" className="logo logo-dark">
            <span className="logo-sm"><img src={dark ? logoDark : logoLight} alt="" height="37"/></span>
            <span className="logo-lg"><img src={dark ? logoDarkFull : logoLightFull} alt="" height="30"/></span>
        </Link>
    );
};

Logo.propTypes = {
    dark: PropTypes.bool,
    width: PropTypes.number,
    height: PropTypes.number
};

export default Logo;
