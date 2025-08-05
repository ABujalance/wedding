'use client';

import BackgroundImage from '@/assets/images/background.webp';
import { Box } from '@mui/material';
import { FC } from 'react';
import { HomePage } from './HomePage';

export const HomePageContainer: FC = ({}) => {
  return (
    <Box
      sx={{
        color: 'black',
        background: `url(${BackgroundImage.src}) center / cover`,
        backgroundSize: 'cover',
      }}
      height="100vh"
      width="100vw"
    >
      <HomePage />
    </Box>
  );
};
