import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Slider from "@mui/material/Slider";

import { useEffect, useState } from "react";
import MultipleSelect from "./MultipleSelect";
import { getFilteredListings } from '@/utils/helpers';
import { Purpose, UnitType } from '@/utils/enums';
import { usePage } from '@inertiajs/inertia-react';
import { FormControlLabel, Switch } from '@mui/material';
import Flex from '@/components/common/Flex';

const SearchBox = ({ listings, setFilteredListings }) => {
    const { amenities, counties, priceRanges } = usePage().props;

    const [filters, setFilters] = useState(undefined);
    const [priceRange, setPriceRange] = useState([200000, 700000]);
    const [rentAmountRange, setRentAmountRange] = useState([20000, 70000]);
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
                    <MultipleSelect onChange={value => updateFilters({ type: value })}
                                    choices={Object.values(UnitType)} field={"Type"}/>
                </Grid>
                <Grid item xs={12} md={6} lg={4}>
                    <MultipleSelect onChange={value => updateFilters({ bedrooms: value })}
                                    choices={["1", "1+", "2", "2+", "3", "3+", "4", "4+", "5", "5+"]}
                                    field={"Bedrooms"}/>
                </Grid>
                <Grid item xs={12} md={6} lg={4}>
                    <MultipleSelect
                        onChange={value => updateFilters({ counties: value })}
                        choices={counties}
                        field={"County"}
                    />
                </Grid>
                <Grid item xs={12} md={6} lg={4}>
                    <MultipleSelect choices={amenities.map(a => a.title)}
                                    onChange={value => updateFilters({ amenities: value })} field={"Amenities"}/>
                </Grid>
                <Grid item xs>
                    <TextField
                        label="Keywords"
                        variant="outlined"
                        value={keyword}
                        onChange={({ target: { value } }) => {
                            setKeyword(value);
                            setTimeout(() => updateFilters({ keywords: value }), 500);
                        }}
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
                            min={priceRanges.min_price} max={priceRanges.max_price}
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
                            min={priceRanges.min_rent_amount}
                            max={priceRanges.max_rent_amount}
                    />
                </Grid>
            </Grid>
        </Card>
    );
};

export default SearchBox;
