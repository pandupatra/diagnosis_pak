import {
  grayColor,
  hexToRgb,
  primaryColor,
  successColor,
  warningColor,
  whiteColor,
} from './styles';

import { createTheme } from '@mui/material';
import { Poppins } from 'next/font/google';

const poppins = Poppins({
  weight: ['300', '400', '500', '600', '700'],
  style: ["normal", "italic"],
  subsets: ['latin', 'latin-ext'],
});

// Create a theme instance.
const theme = createTheme({
  palette: {
    primary: {
      light: primaryColor[0],
      main: "#D4A373",
      dark: primaryColor[2],
      contrastText: whiteColor,
    },
    success: {
      light: successColor[0],
      main: successColor[1],
      dark: successColor[2],
      contrastText: whiteColor,
    },
    warning: {
      light: warningColor[0],
      main: warningColor[1],
      dark: warningColor[2],
      contrastText: whiteColor,
    },
    background: {
      paper: whiteColor,
      default: grayColor[10],
    },
    navbar: {
      background: grayColor[12],
    },
  },
  overrides: {
    MuiInputAdornment: {
      root: {
        color: grayColor[7],
      },
    },
    MuiButton: {
      root: {
        color: grayColor[7],
      },
      containedPrimary: {
        color: whiteColor,
        '&.Mui-selected': {
          backgroundColor: '#7a1e89',
        },
      },
    },
    MuiInput: {
      root: {
        color: grayColor[7],
      },
    },
    MuiPaper: {
      root: {
        boxShadow: "none",
      },
    },
    MuiAppBar: {
      colorPrimary: {
        color: grayColor[2],
        backgroundColor: whiteColor,
      },
    },
    MuiDrawer: {
      paper: {
        overflowX: 'hidden',
      },
    },
    MuiStepIcon: {
      root: {
        '&$completed': {
          color: successColor[1],
        },
      },
    },
    MuiTableRow: {
      root: {
        '&$selected, &$selected$hover': {
          backgroundColor: 'rgba(' + hexToRgb(primaryColor[0]) + ', 0.2)',
        },
      },
    },
  },
  typography: {
    fontFamily: poppins.style.fontFamily
  }
});

export default theme;
