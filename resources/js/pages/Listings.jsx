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

import { useEffect, useState } from "react";
import { IconButton, TextField, } from "@mui/material";
import pluralize from 'pluralize';
import ReactPaginate from 'react-paginate';
import { NavigateBefore, NavigateNext } from '@mui/icons-material';
import Flex from '@/components/common/Flex';

const Listings = ({ listings }) => {
    console.log(listings);

    const [filteredListings, setFilteredListings] = useState(listings);
    const [order, setOrder] = useState('');

    // We start with an empty list of items.
    const [currentItems, setCurrentItems] = useState(null);
    const [pageCount, setPageCount] = useState(0);
    // Here we use item offsets; we could also use page offsets following the API or data you're working with.
    const [itemOffset, setItemOffset] = useState(0);
    const [itemsPerPage, setItemsPerPage] = useState(10);

    // Invoke when user click to request another page.
    const handlePageClick = (event) => {
        const newOffset = (event.selected * itemsPerPage) % filteredListings.length;
        console.log(
            `User requested page number ${event.selected}, which is offset ${newOffset}`
        );
        setItemOffset(newOffset);
    };

    useEffect(() => {
        // Fetch items from another resources.
        const endOffset = itemOffset + itemsPerPage;
        console.log(`Loading items from ${itemOffset} to ${endOffset}`);
        setCurrentItems(filteredListings.slice(itemOffset, endOffset));
        setPageCount(Math.ceil(filteredListings.length / itemsPerPage));
    }, [filteredListings, itemOffset, itemsPerPage]);

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

            {currentItems && currentItems.map(listing => <Listing key={listing.id} unit={listing}/>)}
            {/* Listings */}
            {/*{filteredListings.map((listing) => <Listing key={listing.id} unit={listing}/>)}*/}

            <Flex justifyContent={'center'} className={'mt-4'}>
                <ReactPaginate
                    breakLabel="..."
                    containerClassName={'pagination'}
                    pageClassName={'py-2 px-3 d-flex align-items-center'}
                    // pageLinkClassName={'page-link'}
                    activeClassName={'active text-primary fw-bolder'}
                    breakClassName={'p-2'}
                    previousLabel={<IconButton size={'medium'}><NavigateBefore fontSize={'medium'}/></IconButton>}
                    nextLabel={<IconButton size={'medium'}><NavigateNext fontSize={'medium'}/></IconButton>}
                    disabledClassName={'Mui-disabled'}

                    pageRangeDisplayed={5}
                    pageCount={pageCount}
                    onPageChange={handlePageClick}
                    renderOnZeroPageCount={null}
                />
            </Flex>
        </Guest>
    );
};

export default Listings;
