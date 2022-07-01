import { createTheme } from '@mui/material/styles';

export const theme = (themeColor, isDarkMode) => {
    document.documentElement.classList[isDarkMode ? 'add' : 'remove']('dark');
    document.documentElement.classList.add(themeColor.key);

    return createTheme({
        palette: {
            primary: {
                main: themeColor.value
            }
        },
        typography: {
            fontFamily: `${['"Varela Round"', 'cursive'].join(',')}!important`,
        },
        components: {
            MuiMenuItem: {
                styleOverrides: {
                    root: {
                        fontSize: '10pt'
                    }
                }
            },
            MuiIconButton: {
                defaultProps: {
                    size: 'small'
                }
            },
            MuiSvgIcon: {
                defaultProps: {
                    fontSize: 'small'
                },
                styleOverrides: {
                    fontSizeSmall: {
                        width: '.8em',
                        height: '.8em',
                    }
                }
            },
            MuiChip: {
                defaultProps: {
                    size: 'small'
                }
            },
            MuiRadio: {
                defaultProps: {
                    size: 'small'
                },
                styleOverrides: {
                    root: {
                        paddingTop: 0,
                        paddingBottom: 0,
                    }
                }
            },
            MuiAvatar: {
                styleOverrides: {
                    root: {
                        backgroundColor: themeColor.value,
                    }
                }
            },
            MuiFormControl: {
                defaultProps: {
                    size: 'small',
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
                        borderRadius: '2.5rem',
                        fontSize: '9pt'
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
};
