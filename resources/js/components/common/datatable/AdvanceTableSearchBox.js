import { memo, useState } from 'react';
import { FormControl } from 'react-bootstrap';
import { useAsyncDebounce } from 'react-table';
import 'regenerator-runtime/runtime.js';

const AdvanceTableSearchBox = ({
    globalFilter = null,
    setGlobalFilter = null,
    placeholder = 'Search...'
}) => {
    const [value, setValue] = useState(globalFilter);

    const onChange = useAsyncDebounce(value => {
        setGlobalFilter(value || undefined);
    }, 200);

    return (
        <div className="search-box me-2 mb-2 d-inline-block">
            <div className="position-relative">
                <FormControl size={'sm'} value={value || ''} id="search" placeholder={placeholder} type="search"
                             className="shadow-none" onChange={({ target: { value } }) => {
                    setValue(value);
                    onChange(value);
                }}/>
                <i className="bx bx-search-alt search-icon"/>
            </div>
        </div>
    );
};

export default memo(AdvanceTableSearchBox);
