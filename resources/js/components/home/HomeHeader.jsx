import Container from '@mui/material/Container';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';

import FollowTheSignsIcon from '@mui/icons-material/FollowTheSigns';
import ContactSupportIcon from '@mui/icons-material/ContactSupport';
import Logo from '@/components/Logo';
import { Link } from '@inertiajs/inertia-react';

const HomeHeader = () => {
    return (
        <AppBar position="fixed">
            <Container maxWidth={'xl'}>
                <Toolbar disableGutters sx={{ display: "flex", justifyContent: "space-between", alignItems: 'center' }}>
                    <Logo/>

                    <Box>
                        <Link href={route("login")}>
                            <Button variant={'contained'} color={'white'} endIcon={<FollowTheSignsIcon/>}>
                                Sign In
                            </Button>
                        </Link>

                        <Button variant={'contained'} endIcon={<ContactSupportIcon/>} color={'white'}
                                sx={{ ml: { xs: 1, sm: 2, md: 3 } }}>Contact Us</Button>
                    </Box>
                </Toolbar>
            </Container>
        </AppBar>
    );
};

export default HomeHeader;
