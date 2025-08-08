'use client';
import { CountDown } from '@/app/save-the-date/components/countDown/CountDown';
import { Stack, Typography, Button } from '@mui/material';
import { FC } from 'react';
import { WEDDING_DATE } from '@/util/constants/time';

export const DateSection: FC = () => {
  const date = new Date(WEDDING_DATE);

  const calendarUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=Boda%20Vero%20y%20Alberto&dates=${date
    .toISOString()
    .replace(/[-:]|\.\d{3}/g, '')}/${new Date(
    date.getTime() + 6 * 60 * 60 * 1000,
  )
    .toISOString()
    .replace(
      /[-:]|\.\d{3}/g,
      '',
    )}&details=Hacienda%20San%20Rafael%20-%20https%3A%2F%2Fgoo.gl%2Fmaps%2F&location=Hacienda%20San%20Rafael`;

  return (
    <Stack gap={2} alignItems="center">
      <Typography
        sx={{ typography: { xs: 'h6', md: 'h5', lg: 'h4' } }}
        component="h2"
      >
        6 de diciembre de 2025
      </Typography>
      <Stack sx={{ transform: 'scale(0.85)', transformOrigin: 'center' }}>
        <CountDown />
      </Stack>
      <Button
        variant="outlined"
        href={calendarUrl}
        target="_blank"
        rel="noopener"
      >
        Añadir al calendario
      </Button>
    </Stack>
  );
};
