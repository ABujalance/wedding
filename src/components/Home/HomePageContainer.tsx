'use client';

import BackgroundImage from '@/assets/images/background.webp';
import { LoadingCurtains } from '@/components/LoadingCurtains/LoadingCurtains';
import { Box } from '@mui/material';
import { FC } from 'react';
import { HomePage } from './HomePage';

export const HomePageContainer: FC = ({}) => {
  return (
    <LoadingCurtains>
      <Box
        sx={{
          background: {
            xs: 'none',
            md: `url(${BackgroundImage.src}) center no-repeat`,
          },
          backgroundSize: { xs: 'auto', md: 'cover' },
          backgroundAttachment: { xs: 'scroll', md: 'fixed' },
          minHeight: '100vh',
          width: '100%',
          position: 'relative',
          '&::before': {
            content: '""',
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100vw',
            height: '100vh',
            background: {
              xs: 'none',
              md: `url(${BackgroundImage.src}) center no-repeat`,
            },
            backgroundSize: { xs: 'auto', md: 'cover' },
            backgroundAttachment: { xs: 'scroll', md: 'fixed' },
            zIndex: -1,
            display: { xs: 'none', md: 'block' },
          },
        }}
      >
        <HomePage />
      </Box>
    </LoadingCurtains>
  );
};
