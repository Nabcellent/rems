import Guest from '@/layouts/Guest';
import Map from '@/components/Map';

import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import List from '@mui/material/Typography';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemIcon from '@mui/material/ListItemIcon';

import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt';
import { Head } from '@inertiajs/inertia-react';
import { Carousel } from "react-bootstrap";

const images = [
    "https://images.unsplash.com/photo-1570129477492-45c003edd2be?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8aG91c2V8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60",
    "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8N3x8aG91c2V8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60",
    "https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/brewster-mcleod-architects-1486154143.jpg?crop=1.00xw:1.00xh;0,0&resize=980:*"
];

const SingleListing = ({ googleMapsKey, estate }) => {
    const oc = false;

    return (
        <Guest>
            <Head><title>{estate.name}</title></Head>
            <Typography variant={"h4"} textAlign={'center'} my={3}>{estate.name.toUpperCase()}</Typography>

            <Carousel fade>
                {/* Pull images table here and list all images in carousel */}
                {images.map((img, i) => (
                    <Carousel.Item key={i}>
                        <Box component={'img'} src={img} display={'block'} width={'100%'} height={{ xs: 300, md: 400 }} borderRadius={'4px'} sx={{ objectFit: 'cover' }} />
                    </Carousel.Item>
                ))}
            </Carousel>

            <Typography variant="h5" mt={2}>Amenities</Typography>
            <List dense="true" component={Grid} container rowSpacing={0}>
                {/* Pull amenities table here and list all amenities */}
                <ListItem disablePadding disableGutters component={Grid} item xs={6} md={4}>
                    <ListItemIcon><ArrowRightAltIcon fontSize='small' /></ListItemIcon>
                    <ListItemText primary="Swimming Pool" />
                </ListItem>
                <ListItem disablePadding disableGutters component={Grid} item xs={6} md={4}>
                    <ListItemIcon><ArrowRightAltIcon fontSize='small' /></ListItemIcon>
                    <ListItemText primary="Garage" />
                </ListItem>
                <ListItem disablePadding disableGutters component={Grid} item xs={6} md={4}>
                    <ListItemIcon><ArrowRightAltIcon fontSize='small' /></ListItemIcon>
                    <ListItemText primary="Gym" />
                </ListItem>
            </List>

            <Typography variant="h5" mt={2}>Description</Typography>
            <Typography variant="body1">{estate.description}</Typography>
            <br />
            <Typography variant="body2"><strong>ADDRESS:</strong> {estate.address}</Typography>
            <Typography variant="body2"><strong>SERVICE CHARGE:</strong> {new Intl.NumberFormat('en-US', { style: 'currency', currency: 'KSH' }).format(estate.service_charge)}</Typography>

            <Typography variant="h6" mt={2} textAlign={'center'}>Availability</Typography>
            {/* Pull units table here and show available and unavailable units */}
            <Grid container spacing={1} justifyContent={'flex-start'} alignItems={'center'}>
                <Grid item xs={12} md={6}>
                    <Stack direction={'row'} spacing={1} mt={1} justifyContent={{ xs: 'center', md: 'flex-end' }}>
                        {oc ? <Chip label='A101' /> : <Chip label='A101' variant='outlined' onClick={() => console.log(estate)} />}
                        <Chip label='A102' variant='outlined' onClick={() => console.log('clicked')} />
                        <Chip label='A103' variant='outlined' onClick={() => console.log('clicked')} />
                        <Chip label='A104' variant='outlined' onClick={() => console.log('clicked')} />
                    </Stack>
                    <Stack direction={'row'} spacing={1} mt={1} justifyContent={{ xs: 'center', md: 'flex-end' }}>
                        <Chip label='A101' variant='outlined' onClick={() => console.log('clicked')} />
                        <Chip label='A102' variant='outlined' onClick={() => console.log('clicked')} />
                        <Chip label='A103' variant='outlined' onClick={() => console.log('clicked')} />
                        <Chip label='A104' variant='outlined' onClick={() => console.log('clicked')} />
                    </Stack>
                </Grid>
                <Grid item xs={12} md={6}>
                    <Box width={'100%'} height={200} border={1} borderRadius={4} display={'flex'} justifyContent={'center'} alignItems={'center'}>
                        Selected unit details here
                        {/* Or maybe a dialog?? TBD :> */}
                    </Box>
                </Grid>
            </Grid>


            <Grid container spacing={1} mt={2} justifyItems={'center'}>
                <Grid item xs={12} md={6}>
                    {/* Pull users table here and list contact details and chat info if any */}
                    <Typography variant="h5" textAlign={'center'}>Contacts</Typography>
                </Grid>
                <Grid item xs={12} md={6}>
                    <Typography variant="h5" textAlign={'center'}>Location</Typography>
                    <Map apiKey={googleMapsKey} center={{ lat: estate.latitude, lng: estate.longitude }} />
                </Grid>
            </Grid>
        </Guest>
    );
}

export default SingleListing;