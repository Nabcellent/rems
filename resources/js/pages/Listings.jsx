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
import pluralize from 'pluralize';

const Listings = ({ listings }) => {
    console.log(listings);

    const [filteredListings, setFilteredListings] = useState(listings);
    const [order, setOrder] = useState(1);

/*    useEffect(() => {
        // setFilteredListings()
    }, [filteredListings])*/

    return (
        <Guest>
            <Head>
                <title>Listings</title>
            </Head>

            {/* Search Box */}
            <SearchBox setFilteredListings={setFilteredListings} listings={listings}/>

            <Divider variant="middle" sx={{ my: 2 }}/>

            {/* Header */}
            <Box
                display={"flex"}
                justifyContent={"space-around"}
                alignItems={"center"}
            >
                <Typography variant="h5">{filteredListings.length} {pluralize('Listings', filteredListings.length)} Found</Typography>
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

            <Divider variant="middle" sx={{ my: 2 }}/>

            {/* Listings */}
            {filteredListings.map((listing) => <Listing key={listing.id} unit={listing}/>)}
        </Guest>
    );
};

export default Listings;
