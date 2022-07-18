import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import CardActionArea from "@mui/material/CardActionArea";
import Grid from "@mui/material/Grid";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import { Inertia } from "@inertiajs/inertia";
import { Purpose } from '@/utils/enums';
import { currencyFormat } from '@/utils/helpers';

const Listing = ({ unit }) => {
    return (
        <Grid
            component={CardActionArea}
            onClick={() => Inertia.get(`/listings/${unit.id}`)}
            container
            spacing={2}
            mt={"2rem"}
            justifyContent="center"
            alignItems="center"
            borderRadius={"4px"}
            pb={2}
            boxShadow={2}
        >
            <Grid item xs={12} md={6}>
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
                    height={"330px"}
                    borderRadius={"4px"}
                    sx={{ objectFit: "cover" }}
                />
            </Grid>
            <Grid item xs={12} md={6}>
                <Grid container spacing={1} columnSpacing={0}>
                    <Grid item xs={6}>
                        <Typography
                            variant="body1"
                            fontWeight={600}
                            fontSize={"1.1rem"}
                        >
                            ESTATE
                        </Typography>
                    </Grid>
                    <Grid item xs={6}><Typography>{unit.estate.name}</Typography></Grid>
                    <Grid item xs={6}>
                        <Typography
                            variant="body1"
                            fontWeight={600}
                            fontSize={"1.1rem"}
                        >
                            PURPOSE
                        </Typography>
                    </Grid>
                    <Grid item xs={6}>
                        <Typography>
                            {`FOR ${unit.purpose === Purpose.EITHER ? 'RENT OR SALE' : unit.purpose}`}
                        </Typography>
                    </Grid>

                    {[Purpose.EITHER, Purpose.SALE].includes(unit.purpose) && (
                        <>
                            <Grid item xs={6}>
                                <Typography
                                    variant="body1"
                                    fontWeight={600}
                                    fontSize={"1.1rem"}>
                                    PRICE
                                </Typography>
                            </Grid>
                            <Grid item xs={6}>
                                <Typography>{currencyFormat(unit.price)}</Typography>
                            </Grid>
                        </>
                    )}

                    {[Purpose.EITHER, Purpose.RENT].includes(unit.purpose) && (
                        <>
                            <Grid item xs={6}>
                                <Typography
                                    variant="body1"
                                    fontWeight={600}
                                    fontSize={"1.1rem"}
                                >
                                    RENT AMOUNT
                                </Typography>
                            </Grid>
                            <Grid item xs={6}>
                                <Typography>{currencyFormat(unit.rent_amount)}</Typography>
                            </Grid>
                        </>
                    )}

                    <Grid item xs={6}>
                        <Typography
                            variant="body1"
                            fontWeight={600}
                            fontSize={"1.1rem"}
                        >
                            LOCATION
                        </Typography>
                    </Grid>
                    <Grid item xs={6}>
                        <Typography>{unit.estate.address.toUpperCase()}</Typography>
                    </Grid>

                    <Grid item xs={6}>
                        <Typography
                            variant="body1"
                            fontWeight={600}
                            fontSize={"1.1rem"}
                        >
                            BEDROOMS
                        </Typography>
                    </Grid>
                    <Grid item xs={6}>
                        <Typography>{unit.bedroom_count}</Typography>
                    </Grid>

                    {Boolean(unit.amenities.length) && (
                      <>
                          <Grid item xs={6}>
                              <Typography
                                  variant="body1"
                                  fontWeight={600}
                                  fontSize={"1.1rem"}
                              >
                                  AMENITIES
                              </Typography>
                          </Grid>
                          <Grid item xs={6}>
                              <List sx={{ m: 0, p: 0 }}>
                                  {unit.amenities.map((amenity, i) => (
                                      <ListItem key={i} disableGutters disablePadding>
                                          <ListItemText primary={amenity.title.toUpperCase()}/>
                                      </ListItem>
                                  ))}
                              </List>
                          </Grid>
                      </>
                    )}
                </Grid>
            </Grid>

            {/* In details -> floor size... */}
        </Grid>
    );
};

export default Listing;
