import {
    Box,
    Checkbox,
    Chip,
    InputLabel,
    ListItemText,
    MenuItem,
    OutlinedInput,
    Select,
    FormControl
} from "@mui/material";
import { useState } from "react";

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

const MultipleSelect = ({ choices, field, onChange }) => {
    const [choiceName, setChoiceName] = useState([]);

    return (
        <FormControl sx={{ width: "100%" }}>
            <InputLabel id={field}>{field}</InputLabel>
            <Select name={'purpose'}
                    labelId={field}
                    multiple
                    value={choiceName}
                    onChange={e => {
                        setChoiceName(e.target.value)
                        onChange(e.target.value)
                    }}
                    input={<OutlinedInput label={field}/>}
                    renderValue={(selected) => (
                        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                            {selected.map((value, i) => (
                                <Chip key={i} label={value}/> // on delete?
                            ))}
                        </Box>
                    )}
                    MenuProps={MenuProps}>
                {choices.map((choice, i) => (
                    <MenuItem key={i} value={choice}>
                        <Checkbox checked={choiceName.indexOf(choice) > -1}/>
                        <ListItemText primary={choice}/>
                    </MenuItem>
                ))}
            </Select>
        </FormControl>
    );
};

export default MultipleSelect;
