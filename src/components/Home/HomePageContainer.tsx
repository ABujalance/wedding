'use client';

import BackgroundImage from '@/assets/images/background.webp';
import { LoadingCurtains } from '@/components/LoadingCurtains/LoadingCurtains';
import { Box, useMediaQuery } from '@mui/material';
import { FC } from 'react';
import { HomePage } from './HomePage';

export const HomePageContainer: FC = ({}) => {
  const is900Px = useMediaQuery('(min-width: 900px)');
  const is1500Px = useMediaQuery('(min-width: 1500px)');

  return (
    <LoadingCurtains>
      <Box
        sx={{
          color: '#8B4513',
          background: `url(${BackgroundImage.src}) center `,
          backgroundPositionY: is1500Px ? -500 : is900Px ? -300 : 'center',
          backgroundPositionX: is1500Px ? 0 : is900Px ? -300 : 'center',
        }}
      >
        <HomePage />
      </Box>
    </LoadingCurtains>
  );
};
