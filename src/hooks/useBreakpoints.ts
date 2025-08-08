import { useMediaQuery } from '@mui/material';

interface BreakpointState {
  isXl: boolean; // >= 1500px
  isL: boolean; // >= 900px
  isM: boolean; // >= 600px
  isS: boolean; // < 600px (default)
}

export const useBreakpoints = (): BreakpointState => {
  const isXl = useMediaQuery('(min-width: 1500px)');
  const isL = useMediaQuery('(min-width: 900px)');
  const isM = useMediaQuery('(min-width: 600px)');

  // isS es true cuando no cumple ninguno de los otros breakpoints
  const isS = !isM;

  return {
    isXl,
    isL,
    isM,
    isS,
  };
};
