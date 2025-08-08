'use client';
import { Stack, Typography } from '@mui/material';
import { FC } from 'react';
import { PetsSection } from '@/components/Home/Invite/sections/PetsSection';

export const StorySection: FC = () => {
  return (
    <Stack gap={3} alignItems="center" textAlign="center">
      <Typography
        sx={{ typography: { xs: 'h6', md: 'h5', lg: 'h4' } }}
        component="h2"
      >
        Nuestra historia
      </Typography>
      <Typography maxWidth={800}>
        Empezamos esta aventura hace muchos años y ahora queremos celebrarlo con
        vosotros.
      </Typography>
      <Typography maxWidth={800}>
        Sobre el novio. (Foto próximamente)
      </Typography>
      <Typography maxWidth={800}>
        Sobre la novia. (Foto próximamente)
      </Typography>
      <PetsSection />
    </Stack>
  );
};
