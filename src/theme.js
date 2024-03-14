import { createTheme } from '@mui/material/styles';
import { green, purple } from '@mui/material/colors';

const theme = createTheme({
  palette: {
    primary: {
      main: purple[500],
    },
    secondary: {
      main: green[500],
    },
  },
  typography: {
    fontFamily: 'Madimi One, sans-serif',
    h4: {
      fontWeight: 600,
    },
  },
});

export default theme;
