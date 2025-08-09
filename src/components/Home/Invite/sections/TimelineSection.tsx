'use client';
import timeline from '@/assets/images/timeline.png';
import { Box, Stack } from '@mui/material';
import { FC } from 'react';
import { SectionSeparator } from '../components/SectionSeparator';

export const TimelineSection: FC = () => {
  return (
    <Stack gap={2} alignItems="center">
      <SectionSeparator title="Horario" />
      <Box
        component="img"
        src={timeline.src}
        alt="Timeline"
        sx={{ width: '100%', maxWidth: 900, borderRadius: 2 }}
      />
    </Stack>
  );
};
