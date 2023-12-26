import { createTheme } from '@mui/material/styles';

const theme = createTheme({
    palette: {
        primary: {
            main: '#102C57',
        },
        secondary: {
            main: '#1A1A1A',
        },
        error: {
            main: '#D32F2F',
        },
        success: {
            main: '#388E3C',
        },
    },
    typography: {
        fontFamily: 'Roboto, sans-serif',
        fontWeightLight: 300,
        fontWeightRegular: 400,
        fontWeightMedium: 500,
        fontWeightBold: 700,
    },
    spacing: 8,
    shape: {
        borderRadius: 8,
    },
});

export default theme;
