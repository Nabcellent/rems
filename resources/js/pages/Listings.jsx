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

import { useState } from "react";

const amenities = ["swimming pool", "gym", "garage"];

const Listings = ({ listings }) => {
    console.log(listings);
    const [order, setOrder] = useState(1);
    return (
        <Guest>
            <Head>
                <title>Listings</title>
            </Head>
            {/* Search Box */}
            <SearchBox />

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
            {listings.map((listing, i) => (
                <Listing
                    key={i}
                    id={listing.estate.id}
                    imgSource={
                        listing.estate.image
                            ? listing.estate.image
                            : "https://www.salonlfc.com/wp-content/uploads/2018/01/image-not-found-scaled-1150x647.png"
                    }
                    status={"for sale"}
                    price={100000}
                    location={listing.estate.address}
                    bedrooms={4}
                    amenities={amenities}
                />
            ))}
        </Guest>
    );
};

export default Listings;
