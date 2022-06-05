import { Head } from '@inertiajs/inertia-react';

// mui 
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Divider from '@mui/material/Divider';

// custom componentes
import SectionBox from '@/components/home/SectionBox';

// images
import bannerImg from '../assets/images/home/banner_img.svg';
import managerImg from '../assets/images/home/house_manager.svg';
import ownerImg from '../assets/images/home/house_owner.svg';
import searchImg from '../assets/images/home/house_search.svg';
import serviceImg from '../assets/images/home/house_service.svg';


const Home = () => {
    return (
        <>
            <Head><title>Welcome</title></Head>
            {/* Header */}
            <Box>
                <AppBar position="static">
                    <Toolbar />
                </AppBar>
            </Box>

            <Container>
                {/* Banner */}
                <Grid container spacing={3} mt={3} justifyContent="center" alignItems="center">
                    <Grid item xs={12} md={6}>
                        <Typography variant='h1' fontSize={'2.25rem'} fontWeight={800} color={'#192734'} mb={'1rem'} letterSpacing={'-0.025em'}>Your safe and reliable online system for the management of properties</Typography>
                        <Typography variant='h6' fontSize={'1.25rem'} fontWeight={400} color={'#74808B'}>REMS is a modern web-based real estate management system. Whether you are a tenant, owner, service provider or just searching for a house, REMS is the system to use.</Typography>
                    </Grid>
                    <Grid item xs={12} md={6} textAlign='center'>
                        <Box component={'img'} maxHeight={'60vh'} src={bannerImg} alt={'banner'} />
                    </Grid>
                </Grid>

                <Divider variant='middle' sx={{ my: 10 }} />

                {/* Content */}
                <SectionBox
                    tint={true}
                    imgRight={true}
                    image={searchImg}
                    title={'Property Listings'}
                    desc={'Find your desired property here. Filter your selection based on your preferences to find your most suitable next home.'}
                />


            </Container>
            {/* Footer */}
        </>
    );
}

export default Home;