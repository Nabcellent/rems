import Guest from "@/layouts/Guest";
import Map from "@/components/Map";

import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";
import List from "@mui/material/Typography";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";

import ArrowRightAltIcon from "@mui/icons-material/ArrowRightAlt";

import PoolIcon from "@mui/icons-material/Pool";
import FitnessCenterIcon from "@mui/icons-material/FitnessCenter";
import GarageIcon from "@mui/icons-material/Garage";

import { Head } from "@inertiajs/inertia-react";
import { Carousel } from "react-bootstrap";

const images = [
    "https://images.unsplash.com/photo-1570129477492-45c003edd2be?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8aG91c2V8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60",
    "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8N3x8aG91c2V8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60",
    "https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/brewster-mcleod-architects-1486154143.jpg?crop=1.00xw:1.00xh;0,0&resize=980:*",
];

const iconDictionary = [
    { name: "Swimming Pool", icon: <PoolIcon /> },
    { name: "Gym", icon: <FitnessCenterIcon /> },
    { name: "Garage", icon: <GarageIcon /> },
];

const SingleListing = ({ googleMapsKey, estate }) => {
    const oc = false;
    console.log(estate);

    const units = [];
    for (let i = 1; i <= estate.floor_count; i++) {
        let units_on_floor = [];
        estate.units.forEach((unit) => {
            if (unit.floor == i) {
                units_on_floor.push(unit);
            }
        });
        units.push({ units_on_floor });
    }

    return (
        <Guest>
            <Head>
                <title>{estate.name}</title>
            </Head>
            <Typography variant={"h4"} textAlign={"center"} my={3}>
                {estate.name.toUpperCase()}
            </Typography>

            <Carousel fade>
                {/* Pull images table here and list all images in carousel */}
                {images.map((img, i) => (
                    <Carousel.Item key={i}>
                        <Box
                            component={"img"}
                            src={img}
                            display={"block"}
                            width={"100%"}
                            height={{ xs: 300, md: 400 }}
                            borderRadius={"4px"}
                            sx={{ objectFit: "cover" }}
                        />
                    </Carousel.Item>
                ))}
            </Carousel>

            <Typography variant="h5" mt={2} textAlign={"center"}>
                Amenities
            </Typography>
            <List
                dense="true"
                component={Grid}
                container
                spacing={2}
                justifyContent={{ xs: "none", md: "center" }}
            >
                {estate.amenities.map((amenity) => (
                    <ListItem
                        key={amenity.id}
                        disablePadding
                        disableGutters
                        component={Grid}
                        item
                        xs={6}
                        md={4}
                    >
                        <ListItemAvatar>
                            <Avatar>
                                {iconDictionary.find(
                                    (icon) => icon.name === amenity.title
                                ) ? (
                                    iconDictionary.find(
                                        (icon) => icon.name === amenity.title
                                    ).icon
                                ) : (
                                    <ArrowRightAltIcon />
                                )}
                            </Avatar>
                        </ListItemAvatar>
                        <ListItemText
                            primary={amenity.title}
                            secondary={amenity.description}
                        />
                    </ListItem>
                ))}
            </List>

            <Typography variant="h5" mt={2}>
                Description
            </Typography>
            <Typography variant="body1">{estate.description}</Typography>
            <br />
            <Typography variant="body2">
                <strong>ADDRESS:</strong> {estate.address}
            </Typography>
            <Typography variant="body2">
                <strong>SERVICE CHARGE:</strong>{" "}
                {new Intl.NumberFormat("en-US", {
                    style: "currency",
                    currency: "KSH",
                }).format(estate.service_charge)}
            </Typography>

            <Typography variant="h6" mt={2} textAlign={"center"}>
                Availability
            </Typography>
            {/* Pull units table here and show available and unavailable units */}
            <Grid
                container
                spacing={1}
                justifyContent={"flex-start"}
                alignItems={"center"}
            >
                <Grid item xs={12} md={6}>
                    {units.map((floor, i) => (
                        <Stack
                            direction={"row"}
                            spacing={1}
                            mt={1}
                            justifyContent={{ xs: "center", md: "flex-end" }}
                            key={i}
                        >
                            {floor.units_on_floor.map((unit) =>
                                oc ? (
                                    <Chip
                                        key={unit.id}
                                        label={unit.house_number}
                                    />
                                ) : (
                                    <Chip
                                        key={unit.id}
                                        label={unit.house_number}
                                        variant="outlined"
                                        onClick={() => console.log(unit)}
                                    />
                                )
                            )}
                        </Stack>
                    ))}
                </Grid>
                <Grid item xs={12} md={6}>
                    <Box
                        width={"100%"}
                        height={200}
                        border={1}
                        borderRadius={4}
                        display={"flex"}
                        justifyContent={"center"}
                        alignItems={"center"}
                    >
                        Selected unit details here
                        {/* Or maybe a dialog?? TBD :> */}
                    </Box>
                </Grid>
            </Grid>

            <Grid container spacing={1} mt={2} justifyItems={"center"}>
                <Grid item xs={12} md={6}>
                    {/* users table not correct role??????? */}
                    <Typography variant="h5" textAlign={"center"}>
                        Contacts
                    </Typography>
                    <Typography variant="body1">
                        <strong>NAME:</strong> {estate.user.full_name}
                    </Typography>
                    <Typography variant="body1">
                        <strong>EMAIL:</strong> {estate.user.email}
                    </Typography>
                    <Typography variant="body1">
                        <strong>PHONE:</strong> +{estate.user.phone}
                    </Typography>
                </Grid>
                <Grid item xs={12} md={6}>
                    <Typography variant="h5" textAlign={"center"}>
                        Location
                    </Typography>
                    <Map
                        apiKey={googleMapsKey}
                        center={{ lat: estate.latitude, lng: estate.longitude }}
                    />
                </Grid>
            </Grid>
        </Guest>
    );
};

export default SingleListing;
