'use client';

import BackgroundImage from '@/assets/images/paper.png';
import WreathImage from '@/assets/images/wreath-opaque.png';
import { Box, Stack, useMediaQuery } from '@mui/material';
import Image from 'next/image';
import { FC } from 'react';
import { InviteForm } from './Invite/InviteForm';

export const HomePage: FC = ({}) => {
  const is600Px = useMediaQuery('(min-width: 600px)');
  const is900Px = useMediaQuery('(min-width: 900px)');
  const is1500Px = useMediaQuery('(min-width: 1500px)');

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
        marginTop={
          is1500Px ? '400px' : is900Px ? '350px' : is600Px ? '200px' : '150px'
        }
        borderRadius="16px"
        sx={{
          width: is1500Px
            ? '1200px'
            : is900Px
            ? '800px'
            : is600Px
            ? '550px'
            : '350px',
          background: `url(${BackgroundImage.src}) `,
          position: 'relative',
          overflow: 'visible',
        }}
      >
        <Box
          sx={{
            position: 'absolute',
            width: '120%',
            top: is1500Px
              ? '-300px'
              : is900Px
              ? '-200px'
              : is600Px
              ? '-110px'
              : '-80px',
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
          paddingTop={
            is1500Px ? '350px' : is900Px ? '200px' : is600Px ? '170px' : '125px'
          }
          minHeight="100vh"
          paddingX="20%"
        >
          <InviteForm />
        </Box>
      </Stack>
    </Stack>
  );
};
