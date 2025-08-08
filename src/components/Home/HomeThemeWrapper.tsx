'use client';

import { FC, ReactNode } from 'react';
import { ThemeProvider } from '@mui/material';
import { homeTheme } from '@/theme/homeTheme';

interface HomeThemeWrapperProps {
  children: ReactNode;
}

export const HomeThemeWrapper: FC<HomeThemeWrapperProps> = ({ children }) => {
  return <ThemeProvider theme={homeTheme}>{children}</ThemeProvider>;
};
