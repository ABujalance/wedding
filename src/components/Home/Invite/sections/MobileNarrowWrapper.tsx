'use client';
import { Box } from '@mui/material';
import { FC, ReactNode } from 'react';

export const MobileNarrowWrapper: FC<{ children: ReactNode }> = ({
  children,
}) => {
  return (
    <Box
      sx={{
        // Only xs/sm: reduce effective horizontal padding to 16px relative to parent card (20% padding)
        mx: { xs: 'calc(16px - 20%)', sm: 'calc(16px - 20%)', md: 0 },
        px: { xs: '16px', sm: '16px', md: 0 },
      }}
    >
      {children}
    </Box>
  );
};
