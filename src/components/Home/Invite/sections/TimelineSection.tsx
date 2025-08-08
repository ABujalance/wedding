'use client';
import { Stack, Typography, Box } from '@mui/material';
import { FC } from 'react';
import timeline from '@/assets/images/timeline.png';

export const TimelineSection: FC = () => {
  return (
    <Stack gap={2} alignItems="center">
      <Typography
        sx={{ typography: { xs: 'h6', md: 'h5', lg: 'h4' } }}
        component="h2"
      >
        Horario
      </Typography>
      <Box
        component="img"
        src={timeline.src}
        alt="Timeline"
        sx={{ width: '100%', maxWidth: 900, borderRadius: 2 }}
      />
    </Stack>
  );
};
