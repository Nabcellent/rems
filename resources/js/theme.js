import { createTheme, ThemeProvider, styled } from '@mui/material/styles';

export const theme = createTheme({
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
