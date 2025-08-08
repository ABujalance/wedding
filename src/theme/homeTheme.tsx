import { createTheme } from '@mui/material';

export const homeTheme = createTheme({
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
