'use client';
import { Stack, Typography, Box } from '@mui/material';
import { FC } from 'react';
import timeline from '@/assets/images/timeline.png';

export const TimelineSection: FC = () => {
  return (
    <Stack gap={2} alignItems="center">
      <Typography variant="h2" fontWeight={800}>
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
