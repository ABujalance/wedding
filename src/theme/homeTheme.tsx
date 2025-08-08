import { createTheme } from '@mui/material';

// Base theme with custom breakpoints matching S/M/L/XL used in the app
const base = createTheme({
  breakpoints: {
    values: {
      xs: 300, // S
      sm: 600, // M
      md: 900, // L
      lg: 1500, // XL
      xl: 1920, // Extra large desktops (fallback)
    },
  },
  typography: {
    fontFamily: '"Berkshire Swash", serif',
    allVariants: {
      color: '#8B4512',
    },
  },
  palette: {
    text: {
      primary: '#8B4512',
      secondary: '#8B4512',
    },
    primary: {
      main: '#8B4512',
    },
  },
  components: {
    MuiTypography: {
      styleOverrides: {
        root: {
          color: '#8B4512',
        },
      },
    },
    MuiListItem: {
      styleOverrides: {
        root: {
          color: '#8B4512',
        },
      },
    },
    MuiListItemText: {
      styleOverrides: {
        root: {
          color: '#8B4512',
        },
      },
    },
  },
});

// Extend with responsive typography per breakpoint (S, M, L, XL)
export const homeTheme = createTheme(base, {
  typography: {
    // Keep sizes elegant and readable without extremes
    h1: {
      fontWeight: 600,
      fontSize: 28, // xs (300px+) - S
      [base.breakpoints.up('sm')]: { fontSize: 36 }, // sm (600px+) - M
      [base.breakpoints.up('md')]: { fontSize: 48 }, // md (900px+) - L
      [base.breakpoints.up('lg')]: { fontSize: 64 }, // lg (1500px+) - XL
      [base.breakpoints.up('xl')]: { fontSize: 80 }, // xl (1920px+)
    },
    h2: {
      fontWeight: 400,
      fontSize: 32,
      [base.breakpoints.up('sm')]: { fontSize: 34 },
      [base.breakpoints.up('md')]: { fontSize: 36 },
      [base.breakpoints.up('lg')]: { fontSize: 42 },
      [base.breakpoints.up('xl')]: { fontSize: 46 },
    },
    h3: {
      fontWeight: 400,
      fontSize: 26,
      [base.breakpoints.up('sm')]: { fontSize: 28 },
      [base.breakpoints.up('md')]: { fontSize: 30 },
      [base.breakpoints.up('lg')]: { fontSize: 34 },
      [base.breakpoints.up('xl')]: { fontSize: 36 },
    },
    h4: {
      fontWeight: 400,
      fontSize: 22,
      [base.breakpoints.up('sm')]: { fontSize: 24 },
      [base.breakpoints.up('md')]: { fontSize: 26 },
      [base.breakpoints.up('lg')]: { fontSize: 30 },
      [base.breakpoints.up('xl')]: { fontSize: 32 },
    },
    h5: {
      fontWeight: 400,
      fontSize: 20,
      [base.breakpoints.up('sm')]: { fontSize: 21 },
      [base.breakpoints.up('md')]: { fontSize: 22 },
      [base.breakpoints.up('lg')]: { fontSize: 24 },
      [base.breakpoints.up('xl')]: { fontSize: 26 },
    },
    h6: {
      fontWeight: 400,
      fontSize: 18,
      [base.breakpoints.up('sm')]: { fontSize: 19 },
      [base.breakpoints.up('md')]: { fontSize: 20 },
      [base.breakpoints.up('lg')]: { fontSize: 21 },
      [base.breakpoints.up('xl')]: { fontSize: 22 },
    },
    subtitle1: {
      fontSize: 18,
      [base.breakpoints.up('sm')]: { fontSize: 18 },
      [base.breakpoints.up('md')]: { fontSize: 19 },
      [base.breakpoints.up('lg')]: { fontSize: 20 },
    },
    subtitle2: {
      fontSize: 16,
      [base.breakpoints.up('sm')]: { fontSize: 16 },
      [base.breakpoints.up('md')]: { fontSize: 17 },
      [base.breakpoints.up('lg')]: { fontSize: 18 },
    },
    body1: {
      fontSize: 16,
      [base.breakpoints.up('sm')]: { fontSize: 16 },
      [base.breakpoints.up('md')]: { fontSize: 17 },
      [base.breakpoints.up('lg')]: { fontSize: 18 },
    },
    body2: {
      fontSize: 14,
      [base.breakpoints.up('sm')]: { fontSize: 14 },
      [base.breakpoints.up('md')]: { fontSize: 15 },
      [base.breakpoints.up('lg')]: { fontSize: 16 },
    },
    button: {
      fontSize: 15,
      textTransform: 'none',
      [base.breakpoints.up('md')]: { fontSize: 16 },
      [base.breakpoints.up('lg')]: { fontSize: 16 },
    },
    caption: {
      fontSize: 12,
      [base.breakpoints.up('md')]: { fontSize: 12 },
      [base.breakpoints.up('lg')]: { fontSize: 13 },
    },
    overline: {
      fontSize: 12,
      letterSpacing: 1,
      textTransform: 'uppercase',
      [base.breakpoints.up('lg')]: { fontSize: 12 },
    },
  },
});
