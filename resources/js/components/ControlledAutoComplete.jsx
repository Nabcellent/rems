import { Autocomplete } from '@mui/material';
import PropTypes from 'prop-types';

const ControlledAutoComplete = ({
    options = [],
    renderInput,
    getOptionLabel,
    onChange,
    name,
    value,
    disabled = false,
    required
}) => {
    return (
        <Autocomplete name={name} disabled={disabled}
                      value={value}
                      getOptionLabel={getOptionLabel}
                      options={options}
                      isOptionEqualToValue={(option, value) => value === undefined || value === "" || option.id === value.id}
                      onChange={onChange}
                      renderInput={renderInput}/>
    );
};

ControlledAutoComplete.propTypes = {
    options: PropTypes.array.isRequired,
    renderInput: PropTypes.func.isRequired
};

export default ControlledAutoComplete;
