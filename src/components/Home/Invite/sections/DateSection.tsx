'use client';
import { CountDown } from '@/app/save-the-date/components/countDown/CountDown';
import { calendarLink } from '@/app/save-the-date/components/saveTheDateInfo/SaveTheDateInfo';
import { Stack, Typography } from '@mui/material';
import { FC } from 'react';
import { CalendarSticker } from '../components/Sticker';

export const DateSection: FC = () => {
  return (
    <Stack gap={2} alignItems="center">
      <Typography
        variant="h4"
        textAlign="center"
        fontWeight={800}
        sx={{
          fontFamily: '"Caveat", cursive',
          color: '#000000',
        }}
      >
        6 de diciembre de 2025
      </Typography>
      <Stack
        sx={{
          transform: 'scale(0.7)',
          transformOrigin: 'center',
          color: 'black',
        }}
      >
        <CountDown fontFamily='"Caveat", cursive' color="black" />
      </Stack>
      <CalendarSticker href={calendarLink} />
    </Stack>
  );
};
