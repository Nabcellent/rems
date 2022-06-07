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
        MuiRadio: {
            defaultProps: {
                size: 'small'
            }
        },
        MuiAvatar: {
            styleOverrides: {
                root: {
                    backgroundColor: '#990000',
                }
            }
        },
        MuiTextField: {
            defaultProps: {
                size: 'small'
            }
        },
        MuiOutlinedInput: {
            styleOverrides: {
                root: {
                    borderRadius: '.375rem',
                    boxShadow: '0 .125rem .25rem rgba(0,0,0,.075)!important'
                }
            }
        },
        MuiButton: {
            styleOverrides: {
                root: {
                    padding: '2px 10px',
                    borderRadius: '2.5rem'
                }
            }
        },
        MuiPaper: {
            styleOverrides: {
                root: {
                    position: 'relative',
                }
            }
        }
    }
});
