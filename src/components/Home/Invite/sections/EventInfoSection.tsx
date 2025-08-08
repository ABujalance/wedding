'use client';
import { Stack, Box } from '@mui/material';
import { FC } from 'react';
import { DateSection } from '@/components/Home/Invite/sections/DateSection';
import { LocationSection } from '@/components/Home/Invite/sections/LocationSection';
import { TimelineSection } from '@/components/Home/Invite/sections/TimelineSection';

export const EventInfoSection: FC = () => {
  return (
    <Stack gap={3} sx={{ width: '100%' }}>
      <Stack
        gap={3}
        direction={{ xs: 'column', lg: 'row' }}
        alignItems={{ xs: 'stretch', lg: 'flex-start' }}
        sx={{ width: '100%' }}
      >
        <Box sx={{ flex: 1, minWidth: 0 }}>
          <DateSection />
        </Box>
        <Box sx={{ flex: 1, minWidth: 0 }}>
          <LocationSection />
        </Box>
      </Stack>
      <TimelineSection />
    </Stack>
  );
};
