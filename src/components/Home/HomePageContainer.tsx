'use client';

import BackgroundImage from '@/assets/images/background.webp';
import { LoadingCurtains } from '@/components/LoadingCurtains/LoadingCurtains';
import { Box } from '@mui/material';
import { FC } from 'react';
import { HomePage } from './HomePage';
import { useBreakpoints } from '@/hooks/useBreakpoints';

export const HomePageContainer: FC = ({}) => {
  const { isXl, isL, isM } = useBreakpoints();

  return (
    <LoadingCurtains>
      <Box
        sx={{
          background: `url(${BackgroundImage.src}) center `,
          backgroundPositionY: isXl ? -500 : isL ? -300 : isM ? -150 : -100,
          backgroundPositionX: isXl ? 0 : isL ? -300 : isM ? -100 : 'center',
        }}
      >
        <HomePage />
      </Box>
    </LoadingCurtains>
  );
};
