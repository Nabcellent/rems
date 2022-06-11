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
import Guest from '@/layouts/Guest';

// inertia
import { Head } from '@inertiajs/inertia-react';

import { useState } from "react";

const images = [
    "https://images.unsplash.com/photo-1570129477492-45c003edd2be?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8aG91c2V8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60",
    "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8N3x8aG91c2V8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60",
    "https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/brewster-mcleod-architects-1486154143.jpg?crop=1.00xw:1.00xh;0,0&resize=980:*"
];

const amenities = [
    "swimming pool",
    'gym',
    'garage'
];

const Listings = () => {
    const [order, setOrder] = useState(1);
    return (
        <Guest>
            <Head><title>Listings</title></Head>
            {/* Search Box */}
            <SearchBox />

            <Divider variant="middle" sx={{ my: 2 }} />

            {/* Header */}
            <Box display={'flex'} justifyContent={'space-around'} alignItems={'center'}>
                <Typography variant="h5">Listings Found</Typography>
                <FormControl sx={{ width: 300 }}>
                    <InputLabel id="order-by">Order By</InputLabel>
                    <Select
                        labelId="order-by"
                        value={order}
                        label="Order"
                        onChange={e => setOrder(e.target.value)}
                    >
                        <MenuItem value={1}>Most recent</MenuItem>
                        <MenuItem value={2}>Price: Low to High</MenuItem>
                        <MenuItem value={3}>Price: High to Low</MenuItem>
                    </Select>
                </FormControl>
            </Box>

            <Divider variant="middle" sx={{ my: 2 }} />

            {/* Listings */}
            <Listing imgSources={images} status={'for sale'} price={100000} location={'lavington'} bedrooms={4} amenities={amenities} />
            <Listing imgSources={images} status={'for sale'} price={100000} location={'lavington'} bedrooms={4} amenities={amenities} />
            <Listing imgSources={images} status={'for sale'} price={100000} location={'lavington'} bedrooms={4} amenities={amenities} />
        </Guest>
    );
}

export default Listings;