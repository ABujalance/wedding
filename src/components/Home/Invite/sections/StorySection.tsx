'use client';
import { Stack, Typography } from '@mui/material';
import { FC } from 'react';
import { PetsSection } from '@/components/Home/Invite/sections/PetsSection';
import { SectionSeparator } from '../components/SectionSeparator';

export const StorySection: FC = () => {
  return (
    <Stack gap={3} alignItems="center" textAlign="center">
      <SectionSeparator title="Nuestra historia" />
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
