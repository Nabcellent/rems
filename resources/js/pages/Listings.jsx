// mui
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import Box from "@mui/material/Box";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";

// components
import SearchBox from "@/components/listings/SearchBox";
import Listing from "@/components/listings/Listing";
import Guest from "@/layouts/Guest";

// inertia
import { Head } from "@inertiajs/inertia-react";

import { useState, useEffect } from "react";
import MultipleSelect from "@/components/listings/MultipleSelect";
import {
    Button,
    Card,
    Checkbox,
    Chip,
    Grid,
    ListItemText,
    OutlinedInput,
    Slider,
    TextField,
} from "@mui/material";

const Listings = ({ listings }) => {
    console.log(listings);

    const ITEM_HEIGHT = 48;
    const ITEM_PADDING_TOP = 8;
    const MenuProps = {
        PaperProps: {
            style: {
                maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
                width: 250,
            },
        },
    };

    const [filteredListings, setFilteredListings] = useState(listings);

    const [purpose, setPurpose] = useState([]);
    const [bedrooms, setBedrooms] = useState([]);
    const [city, setCity] = useState([]);
    const [location, setLocation] = useState([]);
    const [amenities, setAmenities] = useState([]);
    const [priceRange, setPriceRange] = useState([20000, 400000]);
    const [keyword, setKeyword] = useState("");

    const [order, setOrder] = useState(1);

    const handleChangePurpose = (event) => {
        const {
            target: { value },
        } = event;
        setPurpose(typeof value === "string" ? value.split(",") : value);
    };

    const handleChangeBedrooms = (event) => {
        const {
            target: { value },
        } = event;
        setBedrooms(typeof value === "string" ? value.split(",") : value);
    };

    const handleChangeCity = (event) => {
        const {
            target: { value },
        } = event;
        setCity(typeof value === "string" ? value.split(",") : value);
    };

    const handleChangeLocation = (event) => {
        const {
            target: { value },
        } = event;
        setLocation(typeof value === "string" ? value.split(",") : value);
    };

    const handleChangeAmenities = (event) => {
        const {
            target: { value },
        } = event;
        setAmenities(typeof value === "string" ? value.split(",") : value);
    };

    const submitSearch = (e) => {
        e.preventDefault();
        // setFilteredListings(
        //     filteredListings.filter((listing) => purpose.length == 2 ? listing.units?.find(
        //         (unit) => unit.purpose == purpose[0] || unit.purpose == purpose[1]
        //     ).purpose == "RENT")
        // )
        console.log(
            purpose,
            bedrooms,
            city,
            location,
            amenities,
            priceRange,
            keyword
        );
    };

    useEffect(() => {
        if (order == 1) {
            setFilteredListings(
                filteredListings.sort((a, b) => {
                    let da = new Date(a.created_at),
                        db = new Date(b.created_at);
                    return da - db;
                })
            );
        } else if (order == 2) {
            setFilteredListings(
                filteredListings.sort(
                    (a, b) =>
                        b.units?.reduce((prev, curr) => {
                            prev.price < curr.price ? prev : curr;
                        }).price -
                        a.units?.reduce((prev, curr) => {
                            prev.price < curr.price ? prev : curr;
                        }).price
                )
            );
        } else {
            setFilteredListings(
                filteredListings.sort(
                    (a, b) =>
                        a.units?.reduce((prev, curr) => {
                            prev.price < curr.price ? prev : curr;
                        }).price -
                        b.units?.reduce((prev, curr) => {
                            prev.price < curr.price ? prev : curr;
                        }).price
                )
            );
        }
    }, [order]);

    return (
        <Guest>
            <Head>
                <title>Listings</title>
            </Head>

            {/* Search Box */}
            <Card
                variant="outlined"
                sx={{ background: "#f1f1f1", mt: 1, p: 3 }}
                component={"form"}
                onSubmit={submitSearch}
            >
                <Grid container spacing={2} alignItems={"center"}>
                    <Grid item xs={12} md={6} lg={4}>
                        {/* <MultipleSelect
                            choices={["For Sale", "For Rent"]}
                            field={"Purpose"}
                        /> */}
                        <FormControl sx={{ width: "100%" }}>
                            <InputLabel id={"Purpose"}>Purpose</InputLabel>
                            <Select
                                labelId={"Purpose"}
                                multiple
                                value={purpose}
                                onChange={handleChangePurpose}
                                input={<OutlinedInput label="Purpose" />}
                                renderValue={(selected) => (
                                    <Box
                                        sx={{
                                            display: "flex",
                                            flexWrap: "wrap",
                                            gap: 0.5,
                                        }}
                                    >
                                        {selected.map((value, i) => (
                                            <Chip key={i} label={value} />
                                        ))}
                                    </Box>
                                )}
                                MenuProps={MenuProps}
                            >
                                {["SALE", "RENT"].map((choice, i) => (
                                    <MenuItem key={i} value={choice}>
                                        <Checkbox
                                            checked={
                                                purpose.indexOf(choice) > -1
                                            }
                                        />
                                        <ListItemText primary={choice} />
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={12} md={6} lg={4}>
                        {/* <MultipleSelect
                            choices={["1", "2", "3", "4", "5+"]}
                            field={"Bedrooms"}
                        /> */}
                        <FormControl sx={{ width: "100%" }}>
                            <InputLabel id={"Bedrooms"}>Bedrooms</InputLabel>
                            <Select
                                labelId={"Bedrooms"}
                                multiple
                                value={bedrooms}
                                onChange={handleChangeBedrooms}
                                input={<OutlinedInput label="Bedrooms" />}
                                renderValue={(selected) => (
                                    <Box
                                        sx={{
                                            display: "flex",
                                            flexWrap: "wrap",
                                            gap: 0.5,
                                        }}
                                    >
                                        {selected.map((value, i) => (
                                            <Chip key={i} label={value} />
                                        ))}
                                    </Box>
                                )}
                                MenuProps={MenuProps}
                            >
                                {["1", "2", "3", "4", "5+"].map((choice, i) => (
                                    <MenuItem key={i} value={choice}>
                                        <Checkbox
                                            checked={
                                                bedrooms.indexOf(choice) > -1
                                            }
                                        />
                                        <ListItemText primary={choice} />
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={12} md={6} lg={4}>
                        {/* <MultipleSelect
                            choices={[
                                "Nairobi",
                                "Mombasa",
                                "Kisumu",
                                "Eldoret",
                                "Naivasha",
                                "Nakuru",
                                "Meru",
                                "Kiambu",
                            ]}
                            field={"City"}
                        /> */}
                        <FormControl sx={{ width: "100%" }}>
                            <InputLabel id={"City"}>City</InputLabel>
                            <Select
                                labelId={"City"}
                                multiple
                                value={city}
                                onChange={handleChangeCity}
                                input={<OutlinedInput label="City" />}
                                renderValue={(selected) => (
                                    <Box
                                        sx={{
                                            display: "flex",
                                            flexWrap: "wrap",
                                            gap: 0.5,
                                        }}
                                    >
                                        {selected.map((value, i) => (
                                            <Chip key={i} label={value} />
                                        ))}
                                    </Box>
                                )}
                                MenuProps={MenuProps}
                            >
                                {[
                                    "Nairobi",
                                    "Mombasa",
                                    "Kisumu",
                                    "Eldoret",
                                    "Naivasha",
                                    "Nakuru",
                                    "Meru",
                                    "Kiambu",
                                ].map((choice, i) => (
                                    <MenuItem key={i} value={choice}>
                                        <Checkbox
                                            checked={city.indexOf(choice) > -1}
                                        />
                                        <ListItemText primary={choice} />
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={12} md={6} lg={4}>
                        {/* <MultipleSelect
                            choices={[
                                "Kileleshwa",
                                "Kilimani",
                                "Lavington",
                                "Madaraka",
                                "Runda",
                                "South C",
                                "South B",
                                "Parklands",
                            ]}
                            field={"Location"}
                        /> */}
                        <FormControl sx={{ width: "100%" }}>
                            <InputLabel id={"Location"}>Location</InputLabel>
                            <Select
                                labelId={"Location"}
                                multiple
                                value={location}
                                onChange={handleChangeLocation}
                                input={<OutlinedInput label={"Location"} />}
                                renderValue={(selected) => (
                                    <Box
                                        sx={{
                                            display: "flex",
                                            flexWrap: "wrap",
                                            gap: 0.5,
                                        }}
                                    >
                                        {selected.map((value, i) => (
                                            <Chip key={i} label={value} />
                                        ))}
                                    </Box>
                                )}
                                MenuProps={MenuProps}
                            >
                                {[
                                    "Kileleshwa",
                                    "Kilimani",
                                    "Lavington",
                                    "Madaraka",
                                    "Runda",
                                    "South C",
                                    "South B",
                                    "Parklands",
                                ].map((choice, i) => (
                                    <MenuItem key={i} value={choice}>
                                        <Checkbox
                                            checked={
                                                location.indexOf(choice) > -1
                                            }
                                        />
                                        <ListItemText primary={choice} />
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={12} md={6} lg={4}>
                        {/* <MultipleSelect
                            choices={[
                                "Swimming Pool",
                                "Gym",
                                "Play Area",
                                "Garage",
                            ]}
                            field={"Amenities"}
                        /> */}
                        <FormControl sx={{ width: "100%" }}>
                            <InputLabel id={"Amenities"}>Amenities</InputLabel>
                            <Select
                                labelId={"Amenities"}
                                multiple
                                value={amenities}
                                onChange={handleChangeAmenities}
                                input={<OutlinedInput label={"Amenities"} />}
                                renderValue={(selected) => (
                                    <Box
                                        sx={{
                                            display: "flex",
                                            flexWrap: "wrap",
                                            gap: 0.5,
                                        }}
                                    >
                                        {selected.map((value, i) => (
                                            <Chip key={i} label={value} />
                                        ))}
                                    </Box>
                                )}
                                MenuProps={MenuProps}
                            >
                                {[
                                    "Swimming Pool",
                                    "Gym",
                                    "Play Area",
                                    "Garage",
                                ].map((choice, i) => (
                                    <MenuItem key={i} value={choice}>
                                        <Checkbox
                                            checked={
                                                amenities.indexOf(choice) > -1
                                            }
                                        />
                                        <ListItemText primary={choice} />
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs>
                        <TextField
                            label="Keyword"
                            variant="outlined"
                            value={keyword}
                            onChange={(e) => setKeyword(e.target.value)}
                            sx={{ width: "100%" }}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <Typography gutterBottom textAlign={"center"}>
                            Price Range
                        </Typography>
                        <Slider
                            getAriaLabel={() => "Price range"}
                            value={priceRange}
                            onChange={(e, newRange) => setPriceRange(newRange)}
                            valueLabelDisplay="auto"
                            getAriaValueText={(val) => `KSH ${val}`}
                            step={10000}
                            min={0}
                            max={10000000}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <Button variant="outlined" fullWidth type="submit">
                            Search
                        </Button>
                    </Grid>
                </Grid>
            </Card>

            <Divider variant="middle" sx={{ my: 2 }} />

            {/* Header */}
            <Box
                display={"flex"}
                justifyContent={"space-around"}
                alignItems={"center"}
            >
                <Typography variant="h5">Listings Found</Typography>
                <FormControl sx={{ width: 300 }}>
                    <InputLabel id="order-by">Order By</InputLabel>
                    <Select
                        labelId="order-by"
                        value={order}
                        label="Order"
                        onChange={(e) => setOrder(e.target.value)}
                    >
                        <MenuItem value={1}>Most recent</MenuItem>
                        <MenuItem value={2}>Price: Low to High</MenuItem>
                        <MenuItem value={3}>Price: High to Low</MenuItem>
                    </Select>
                </FormControl>
            </Box>

            <Divider variant="middle" sx={{ my: 2 }} />

            {/* Listings */}
            {filteredListings.map((listing) => (
                <Listing
                    key={listing.id}
                    id={listing.id}
                    imgSource={
                        listing.image
                            ? listing.image
                            : "https://www.salonlfc.com/wp-content/uploads/2018/01/image-not-found-scaled-1150x647.png"
                    }
                    purpose={
                        purpose.length != 1
                            ? "RENT and SALE"
                            : listing.units.find(
                                  (unit) => unit.purpose == purpose[0] // pull from searchbox here SALE or RENT
                              )?.purpose
                    }
                    price={
                        // listing.units.find(
                        //     (unit) => unit.purpose == "SALE" // pull from searchbox here SALE or RENT
                        // )?.price
                        purpose
                            ? Math.min.apply(
                                  Math,
                                  listing.units
                                      ?.filter((unit) => unit.purpose == "RENT")
                                      .map((unit) => unit.price)
                              )
                            : Math.min.apply(
                                  Math,
                                  listing.units?.map((unit) => unit.price)
                              )
                    }
                    location={listing.address}
                    bedrooms={4} // need it?
                    amenities={amenities}
                />
            ))}
        </Guest>
    );
};

export default Listings;
