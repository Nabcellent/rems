import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Slider from "@mui/material/Slider";
import Typography from "@mui/material/Typography";

import { useEffect, useState } from "react";
import MultipleSelect from "./MultipleSelect";
import { getFilteredListings } from '@/utils/helpers';
import { Purpose } from '@/utils/enums';
import { usePage } from '@inertiajs/inertia-react';
import { Box, FormControlLabel, Switch } from '@mui/material';
import Flex from '@/components/common/Flex';

const SearchBox = ({ listings, setFilteredListings }) => {
    const { amenities } = usePage().props;

    const [filters, setFilters] = useState(undefined);
    const [priceRange, setPriceRange] = useState([20000, 400000]);
    const [rentAmountRange, setRentAmountRange] = useState([20000, 400000]);
    const [keyword, setKeyword] = useState("");
    const [canFilterPrice, setCanFilterPrice] = useState(false);
    const [canFilterRentAmount, setCanFilterRentAmount] = useState(false);

    const updateFilters = filter => setFilters({ ...filters, ...filter });

    useEffect(() => {
        setFilteredListings(getFilteredListings(listings, filters));
    }, [filters]);

    return (
        <Card
            variant="outlined"
            sx={{ background: "#f1f1f1", mt: 3, mb: 1, p: 3 }}
        >
            <Grid container spacing={2} alignItems={"center"}>
                <Grid item xs={12} md={6} lg={4}>
                    <MultipleSelect onChange={value => updateFilters({ purpose: value })}
                                    choices={Object.values(Purpose)} field={"Purpose"}/>
                </Grid>
                <Grid item xs={12} md={6} lg={4}>
                    <MultipleSelect onChange={value => updateFilters({ bedrooms: value })}
                                    choices={["1", "2", "3", "4", "5+"]} field={"Bedrooms"}/>
                </Grid>
                <Grid item xs={12} md={6} lg={4}>
                    <MultipleSelect
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
                    />
                </Grid>
                <Grid item xs={12} md={6} lg={4}>
                    <MultipleSelect
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
                    />
                </Grid>
                <Grid item xs={12} md={6} lg={4}>
                    <MultipleSelect choices={amenities.map(a => a.title)}
                                    onChange={value => updateFilters({ amenities: value })} field={"Amenities"}/>
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
                <Grid item xs={12} md={6}>
                    <Flex justifyContent={'center'}>
                        <FormControlLabel label="Price Range"
                                          control={<Switch checked={canFilterPrice}
                                                           onChange={() => {
                                                               setCanFilterPrice(!canFilterPrice);
                                                               updateFilters({ priceRange: undefined });
                                                           }}/>}/>
                    </Flex>
                    <Slider disabled={!canFilterPrice}
                            getAriaLabel={() => "Price range"}
                            value={priceRange}
                            onChange={(e, newRange) => {
                                setPriceRange(newRange);
                                setTimeout(() => updateFilters({ priceRange: newRange }), 500);
                            }}
                            valueLabelDisplay="auto"
                            getAriaValueText={(val) => `KSH ${val}`}
                            step={10000}
                            min={100000} max={10000000}
                    />
                </Grid>
                <Grid item xs={12} md={6}>
                    <Flex justifyContent={'center'}>
                        <FormControlLabel label="Rent Amount Range"
                                          control={<Switch checked={canFilterRentAmount}
                                                           onChange={() => {
                                                               setCanFilterRentAmount(!canFilterRentAmount);
                                                               updateFilters({ rentAmountRange: undefined });
                                                           }}/>}/>
                    </Flex>

                    <Slider disabled={!canFilterRentAmount}
                            getAriaLabel={() => "Rent Amount range"}
                            value={rentAmountRange}
                            onChange={(e, newRange) => {
                                setRentAmountRange(newRange);

                                setTimeout(() => updateFilters({ rentAmountRange: newRange }), 500);
                            }}
                            valueLabelDisplay="auto"
                            getAriaValueText={(val) => `KSH ${val}`}
                            step={1000}
                            min={1000}
                            max={300000}
                    />
                </Grid>
            </Grid>
        </Card>
    );
};

export default SearchBox;
