'use client';

import BackgroundImage from '@/assets/images/paper.png';
import WreathImage from '@/assets/images/wreath-opaque.png';
import { Box, Stack } from '@mui/material';
import Image from 'next/image';
import { FC } from 'react';
import { InviteForm } from './Invite/InviteForm';
import { useBreakpoints } from '@/hooks/useBreakpoints';

export const HomePage: FC = ({}) => {
  const { isXl, isL, isM } = useBreakpoints();

  return (
    <Stack
      sx={{
        width: '100%',
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Stack
        marginBottom="50px"
        marginTop={isXl ? '250px' : isL ? '350px' : isM ? '200px' : '150px'}
        borderRadius="16px"
        sx={{
          width: isXl ? '1200px' : isL ? '800px' : isM ? '550px' : '350px',
          background: `url(${BackgroundImage.src}) `,
          position: 'relative',
          overflow: 'visible',
        }}
      >
        <Box
          sx={{
            position: 'absolute',
            width: '120%',
            top: isXl ? '-300px' : isL ? '-200px' : isM ? '-110px' : '-80px',
            left: '50%',
            transform: 'translateX(-50%)',
          }}
        >
          <Image
            src={WreathImage.src}
            alt="Wreath"
            width="0"
            height="0"
            sizes="100vw"
            style={{ height: 'auto', width: '100%', position: 'relative' }}
          />
        </Box>
        <Box
          padding="20px"
          paddingTop={isXl ? '300px' : isL ? '200px' : isM ? '170px' : '125px'}
          minHeight="50vh"
          paddingX="20%"
        >
          <InviteForm />
        </Box>
      </Stack>
    </Stack>
  );
};
