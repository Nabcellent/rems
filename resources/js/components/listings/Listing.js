import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";

import { Carousel } from "react-bootstrap";

const Listing = ({ imgSources, status, price, location, bedrooms, amenities }) => {
    return (
        <Grid container spacing={2} mt={'2rem'} justifyContent="center" alignItems="center" borderRadius={'4px'} pb={2} boxShadow={2}>
            <Grid item xs={12} md={6}>
                <Carousel fade>
                    {imgSources.map((imgSource, i) => (
                        <Carousel.Item key={i}>
                            <Box component={'img'} src={imgSource} display={'block'} width={'100%'} height={'330px'} borderRadius={'4px'} sx={{ objectFit: 'cover' }} />
                        </Carousel.Item>
                    ))}
                </Carousel>
            </Grid>
            <Grid item xs={12} md={6}>
                <Grid container spacing={1} columnSpacing={0}>
                    <Grid item xs={6}><Typography variant="body1" fontWeight={600} fontSize={'1.1rem'}>STATUS</Typography></Grid>
                    <Grid item xs={6}><Typography>{status.toUpperCase()}</Typography></Grid>

                    <Grid item xs={6}><Typography variant="body1" fontWeight={600} fontSize={'1.1rem'}>PRICE</Typography></Grid>
                    <Grid item xs={6}><Typography>{new Intl.NumberFormat('en-US', { style: 'currency', currency: 'KSH' }).format(price)}</Typography></Grid>

                    <Grid item xs={6}><Typography variant="body1" fontWeight={600} fontSize={'1.1rem'}>LOCATION</Typography></Grid>
                    <Grid item xs={6}><Typography>{location.toUpperCase()}</Typography></Grid>

                    <Grid item xs={6}><Typography variant="body1" fontWeight={600} fontSize={'1.1rem'}>BEDROOMS</Typography></Grid>
                    <Grid item xs={6}><Typography>{bedrooms}</Typography></Grid>

                    <Grid item xs={6}><Typography variant="body1" fontWeight={600} fontSize={'1.1rem'}>AMENITIES</Typography></Grid>
                    <Grid item xs={6}>
                        <List sx={{ m: 0, p: 0 }}>
                            {amenities.map((amenity, i) => (
                                <ListItem key={i} disableGutters disablePadding><ListItemText primary={amenity.toUpperCase()} /></ListItem>
                            ))}
                        </List >
                    </Grid>
                </Grid>
            </Grid>

            {/* In details -> floor size... */}
        </Grid>
    );
}

export default Listing;