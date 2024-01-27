import { createTheme } from '@mui/material/styles';
import { PaletteColor, PaletteColorOptions } from '@mui/material/styles/createPalette';

declare module '@mui/material/styles' {
    interface Palette {
        assistantMessage?: PaletteColor;
        userMessage?: PaletteColor;
    }

    interface PaletteOptions {
        assistantMessage?: PaletteColorOptions;
        userMessage?: PaletteColorOptions;
    }
}

const theme = createTheme({
    palette: {
        primary: {
            main: '#1D262A',
        },
        secondary: {
            main: '#4A90E2',
            light: '#6EB0D9',
            dark: '#0A88D6',
        },
        error: {
            main: '#D32F2F',
        },
        success: {
            main: '#388E3C',
        },
        assistantMessage: {
            main: '#6abaee',
        },
        userMessage: {
            main: '#CADEEA',
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
    breakpoints: {
        values: {
            xs: 0,
            sm: 600,
            md: 960,
            lg: 1280,
            xl: 1920,
        },
    },
});

export default theme;
