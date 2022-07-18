import Container from '@mui/material/Container';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';

import FollowTheSignsIcon from '@mui/icons-material/FollowTheSigns';
import ContactSupportIcon from '@mui/icons-material/ContactSupport';
import Logo from '@/components/Logo';
import { Link, usePage } from '@inertiajs/inertia-react';
import { DashboardCustomize, Roofing } from '@mui/icons-material';
import { IconButton, Tooltip } from '@mui/material';

const HomeHeader = () => {
    const { auth } = usePage().props;

    return (
        <AppBar position="fixed">
            <Container maxWidth={'xl'}>
                <Toolbar disableGutters sx={{ display: "flex", justifyContent: "space-between", alignItems: 'center' }}>
                    <Logo/>

                    <Box>
                        {auth.user ? (
                            <>
                                <Link href={route('listings')} color={'white'} className={'me-2'}>
                                    <Button variant={'contained'} color={'white'} endIcon={<Roofing/>}>
                                        Listings
                                    </Button>
                                </Link>
                                <Link href={route('dashboard.default')} color={'white'}>
                                    <Button variant={'contained'} color={'white'} endIcon={<DashboardCustomize/>}>
                                        Dashboard
                                    </Button>
                                </Link>
                            </>
                        ) : (
                            <Link href={route("login")}>
                                <Button variant={'contained'} color={'white'} endIcon={<FollowTheSignsIcon/>}>
                                    Sign In
                                </Button>
                            </Link>
                        )}

                        <Tooltip title={'Contact Us'}>
                            <IconButton color={'white'} size={'medium'} sx={{ ml: { xs: 1, sm: 2, md: 3 } }}>
                                <ContactSupportIcon/>
                            </IconButton>
                        </Tooltip>
                    </Box>
                </Toolbar>
            </Container>
        </AppBar>
    );
};

export default HomeHeader;
