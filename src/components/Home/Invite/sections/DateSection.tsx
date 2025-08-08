'use client';
import { CountDown } from '@/app/save-the-date/components/countDown/CountDown';
import { calendarLink } from '@/app/save-the-date/components/saveTheDateInfo/SaveTheDateInfo';
import { Button, Stack, Typography } from '@mui/material';
import { FC } from 'react';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';

export const DateSection: FC = () => {
  return (
    <Stack gap={2} alignItems="center">
      <Typography variant="h5" textAlign="center" fontWeight={800}>
        6 de diciembre de 2025
      </Typography>
      <Stack sx={{ transform: 'scale(0.7)', transformOrigin: 'center' }}>
        <CountDown />
      </Stack>
      <Button
        variant="contained"
        href={calendarLink}
        target="_blank"
        rel="noopener"
        sx={{
          backgroundColor: '#BD9E24',
          color: 'white',
          '&:hover': {
            backgroundColor: '#9a7e1c',
          },
          textTransform: 'none',
          px: 3,
          py: 1.5,
          borderRadius: 2,
          boxShadow: '0 4px 12px rgba(189, 158, 36, 0.3)',
        }}
        startIcon={<CalendarTodayIcon />}
      >
        Añadir al calendario
      </Button>
    </Stack>
  );
};
