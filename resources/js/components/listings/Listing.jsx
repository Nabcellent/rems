import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import CardActionArea from "@mui/material/CardActionArea";
import Grid from "@mui/material/Grid";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import { Purpose } from '@/utils/enums';
import { currencyFormat, str as Str } from '@/utils/helpers';
import { Link } from '@inertiajs/inertia-react';
import { ListItemIcon } from '@mui/material';
import { SportsGymnastics } from '@mui/icons-material';

const ListingItem = ({ title, value, valueComponent = 'i' }) => {
    return (
        <>
            <Grid item xs={4}>
                <Typography
                    variant="body2"
                    fontWeight={600}
                    fontSize={".9rem"}
                >
                    <b>{title}</b>
                </Typography>
            </Grid>
            <Grid item xs={8}>
                <Typography component={valueComponent} fontSize={'.8rem'}>{value}</Typography>
            </Grid>
        </>
    );
};

const Listing = ({ unit }) => {
    return (
        <Link href={`/listings/${unit.estate.id}`}>
            <Grid
                component={CardActionArea}
                container
                spacing={2}
                mt={"2rem"}
                justifyContent="center"
                alignItems="center"
                borderRadius={"4px"}
                pb={2}
                boxShadow={2}
            >
                <Grid item xs={12} md={5}>
                    {/* <Carousel fade>
                    {imgSources.map((imgSource, i) => (
                        <Carousel.Item key={i}>
                            <Box component={'img'} src={imgSource} display={'block'} width={'100%'} height={'330px'} borderRadius={'4px'} sx={{ objectFit: 'cover' }} />
                        </Carousel.Item>
                    ))}
                </Carousel> */}
                    <Box
                        component={"img"}
                        src={unit.image
                            ? unit.image
                            : "https://www.salonlfc.com/wp-content/uploads/2018/01/image-not-found-scaled-1150x647.png"}
                        display={"block"}
                        width={"100%"}
                        height={"250px"}
                        borderRadius={"4px"}
                        sx={{ objectFit: "cover" }}
                    />
                </Grid>
                <Grid item xs={12} md={7}>
                    <Grid container spacing={1} columnSpacing={0}>
                        <ListingItem title={'ESTATE'} value={unit.estate.name}/>
                        <ListingItem title={'PURPOSE'}
                                     value={`FOR ${unit.purpose === Purpose.EITHER ? 'RENT OR SALE' : unit.purpose}`}/>
                        {[Purpose.EITHER, Purpose.SALE].includes(unit.purpose) && (
                            <ListingItem title={'PRICE'} value={<b>{currencyFormat(unit.price)}</b>}/>
                        )}
                        {[Purpose.EITHER, Purpose.RENT].includes(unit.purpose) && (
                            <ListingItem title={'RENT AMOUNT'} value={<b>{currencyFormat(unit.rent_amount)}</b>}/>
                        )}
                        <ListingItem title={'LOCATION'} value={unit.estate.address.toUpperCase()}/>
                        <ListingItem title={'BEDROOMS'} value={unit.bedroom_count}/>
                        <ListingItem title={'TYPE'} value={unit.type}/>

                        {Boolean(unit.amenities.length) && (
                            <>
                                <Grid item xs={12}>
                                    <div className={'border-dashed-bottom'}/>
                                </Grid>
                                <ListingItem title={'AMENITIES'} valueComponent={'div'} value={(
                                    <List sx={{ m: 0, p: 0 }}>
                                        {unit.amenities.map((amenity, i) => (
                                            <ListItem key={i} disableGutters disablePadding>
                                                <ListItemIcon><SportsGymnastics/></ListItemIcon>
                                                <ListItemText className={'m-0'} primary={<small>{Str.headline(amenity.title)}</small>}/>
                                            </ListItem>
                                        ))}
                                    </List>
                                )}/>
                            </>
                        )}
                    </Grid>
                </Grid>

                {/* In details -> floor size... */}
            </Grid>
        </Link>
    );
};

export default Listing;
