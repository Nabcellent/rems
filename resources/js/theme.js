import { createTheme } from '@mui/material/styles';

export const theme = createTheme({
    palette: {
        primary: {
            main: '#990000'
        }
    },
    typography: {
        fontFamily: `${['"Varela Round"', 'cursive',].join(',')}!important`,
    },
    components: {
        MuiButton: {
            styleOverrides: {
                root: {
                    padding: '2px 10px',
                    borderRadius: '2.5rem'
                }
            }
        }
    }
});
