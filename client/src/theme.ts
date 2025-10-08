import { green, red } from '@mui/material/colors';
import { createTheme } from '@mui/material/styles';

export const theme = createTheme({
    palette: {
        primary: {
            main: '#9c27b0',
        },
        secondary: {
            main: '#ba68c8',
        },
        error: {
            main: red.A400,
        },
        success: {
            main: green.A700,
        },
    },
    direction: 'rtl',
});
