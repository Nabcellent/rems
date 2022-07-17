import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Slider from "@mui/material/Slider";
import Typography from "@mui/material/Typography";

import { useState } from "react";
import MultipleSelect from "./MultipleSelect";

const SearchBox = () => {
    const [priceRange, setPriceRange] = useState([20000, 400000]);
    const [keyword, setKeyword] = useState("");

    return (
        <Card
            variant="outlined"
            sx={{ background: "#f1f1f1", mt: 1, p: 3 }}
            component={"form"}
        >
            <Grid container spacing={2} alignItems={"center"}>
                <Grid item xs={12} md={6} lg={4}>
                    <MultipleSelect
                        choices={["For Sale", "For Rent"]}
                        field={"Purpose"}
                    />
                </Grid>
                <Grid item xs={12} md={6} lg={4}>
                    <MultipleSelect
                        choices={["1", "2", "3", "4", "5+"]}
                        field={"Bedrooms"}
                    />
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
                    <MultipleSelect
                        choices={[
                            "Swimming Pool",
                            "Gym",
                            "Play Area",
                            "Garage",
                        ]}
                        field={"Amenities"}
                    />
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
    );
};

export default SearchBox;
