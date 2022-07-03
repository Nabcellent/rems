import { useEffect, useState } from 'react';
import { TextField } from '@mui/material';
import { FormControl } from 'react-bootstrap';

export default function DebouncedInput({ value: initialValue, onChange, debounce = 500, ...props }) {
    const [value, setValue] = useState(initialValue)

    useEffect(() => {
        setValue(initialValue)
    }, [initialValue])

    useEffect(() => {
        const timeout = setTimeout(() => onChange(value), debounce)

        return () => clearTimeout(timeout)
    }, [value])

    return <FormControl size={'sm'} className={''} {...props} value={value} onChange={e => setValue(e.target.value)} />
}
