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
import HomeFooter from '@/components/home/HomeFooter';

// images
import bannerImg from '../assets/images/home/banner_img.svg';
import managerImg from '../assets/images/home/house_manager.svg';
import ownerImg from '../assets/images/home/house_owner.svg';
import searchImg from '../assets/images/home/house_search.svg';
import serviceImg from '../assets/images/home/house_service.svg';
import tenantImg from '../assets/images/home/house_tenant.svg';
import HomeHeader from '@/components/home/HomeHeader';
import { Inertia } from '@inertiajs/inertia';

const Home = ({registerUrls}) => {
    console.log(registerUrls);

    return (
        <>
            <Head><title>Welcome</title></Head>

            {/* Header */}
            <HomeHeader />

            <Container>
                {/* Banner */}
                <Grid container spacing={3} mt={3} sx={{
                    py: {
                        xs: 6,
                        md: 20
                    }
                }} justifyContent="center" alignItems="center">
                    <Grid item xs={12} md={6}>
                        <Typography variant='h1' fontSize={{ xs: '1.75rem', md: '2.25rem' }} fontWeight={800} color={'#192734'} mb={'1rem'} letterSpacing={'-0.025em'}>Your safe and reliable online system for the management of properties</Typography>
                        <Typography variant='h6' fontSize={'1.25rem'} fontWeight={400} color={'#74808B'}>REMS is a modern web-based real estate management system. Whether you are a tenant, owner, property manager, service provider or just searching for a house, REMS is the system to use.</Typography>
                    </Grid>
                    <Grid item xs={12} md={6} textAlign='center'>
                        <Box component={'img'} width={'100%'} src={bannerImg} alt={'banner'} />
                    </Grid>
                </Grid>

                <Divider variant='middle' sx={{ my: { xs: 5, lg: 10 } }} />

                {/* Content */}
                <SectionBox
                    tint={true}
                    image={ownerImg}
                    title={'Become an Owner'}
                    desc={'Register your properties here and manage them easily at your comfort. You can also manage any issues related as well as the occupants if any.'}
                    onBtnClick={() => Inertia.get(registerUrls.owner)}
                />
                <SectionBox
                    image={managerImg}
                    title={'Become a Property Manager'}
                    desc={'Register here if you want to manage property and estates. This involves ensuring the property is well-maintained and habitable by managing issues raised.'}
                    onBtnClick={() => Inertia.get(registerUrls.manager)}
                />
                <SectionBox
                    tint={true}
                    image={tenantImg}
                    title={'Become a Tenant'}
                    desc={'Apply here to become a tenant. On registration, an applicant waits for an approval from the owner. Managed ment of rental payments is also done on the system.'}
                    onBtnClick={() => Inertia.get(registerUrls.tenant)}
                />
                <SectionBox
                    image={serviceImg}
                    title={'Become a Service Provider'}
                    desc={'Service providers such as electrians, plumbers, carpenters, painters, laundry services and house managers can register from here and offer their services to residents.'}
                    onBtnClick={() => Inertia.get(registerUrls.provider)}
                />
                <SectionBox
                    tint={true}
                    image={searchImg}
                    title={'Property Listings'}
                    desc={'Find your desired property here. Filter your selection based on your preferences to find your most suitable next home.'}
                />


            </Container>
            {/* Footer */}
            <HomeFooter />
        </>
    );
}

export default Home;
