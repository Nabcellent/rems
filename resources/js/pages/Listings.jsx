// mui
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import Box from "@mui/material/Box";
import MenuItem from "@mui/material/MenuItem";

// components
import SearchBox from "@/components/listings/SearchBox";
import Listing from "@/components/listings/Listing";
import Guest from "@/layouts/Guest";

// inertia
import { Head } from "@inertiajs/inertia-react";

import { useState } from "react";
import { TextField, } from "@mui/material";
import pluralize from 'pluralize';

const Listings = ({ listings }) => {
    console.log(listings);

    const [filteredListings, setFilteredListings] = useState(listings);
    const [order, setOrder] = useState('');

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
                <Typography
                    variant="h5">{filteredListings.length} {pluralize('Listings', filteredListings.length)} Found</Typography>
                <TextField label={'Order By'} value={order} select sx={{ width: 300 }}
                           onChange={({ target: { value } }) => {
                               setOrder(value);

                               if (value === 'latest') setFilteredListings(_.orderBy(filteredListings, 'id', 'desc'));
                               if (value === 'price-desc') setFilteredListings(_.orderBy(filteredListings, 'price', 'desc'));
                               if (value === 'price-asc') setFilteredListings(_.orderBy(filteredListings, 'price'));
                           }}>
                    <MenuItem value={'latest'}>Most recent</MenuItem>
                    <MenuItem value={'price-asc'}>Price: Low to High</MenuItem>
                    <MenuItem value={'price-desc'}>Price: High to Low</MenuItem>
                </TextField>
            </Box>

            <Divider variant="middle" sx={{ my: 2 }}/>

            {/* Listings */}
            {filteredListings.map((listing) => <Listing key={listing.id} unit={listing}/>)}
        </Guest>
    );
};

export default Listings;
