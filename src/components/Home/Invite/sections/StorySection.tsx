'use client';
import { Stack, Typography, Box } from '@mui/material';
import { FC } from 'react';
import { PetsSection } from '@/components/Home/Invite/sections/PetsSection';
import { SectionSeparator } from '../components/SectionSeparator';
import { PersonCard } from './components/PersonCard';
import novioPhoto from '@/assets/images/nosotros/Alberto.jpg';
import noviaPhoto from '@/assets/images/nosotros/vero.jpg';

export const StorySection: FC = () => {
  return (
    <Stack gap={5} alignItems="center" textAlign="center">
      <SectionSeparator title="Nuestra historia" />

      {/* Texto sobre nosotros */}
      <Typography
        maxWidth={800}
        fontFamily='"Caveat", cursive'
        variant="h4"
        sx={{
          textAlign: 'center',
        }}
      >
        ¡Hola! Estamos muy emocionados de poder compartir este gran día con
        todos vosotros. Para nosotros es muy importante poder estar con toda la
        gente a la que queremos en un solo lugar y esperamos que para vosotros
        también sea un día especial. A ambos nos encanta la navidad y queremos
        que este día sea una gran comida familiar de navidad para todos, ¡con
        fiesta incluida!
      </Typography>

      {/* Tarjetas del novio y la novia */}
      <Box
        sx={{
          width: '100%',
          maxWidth: '800px',
          display: 'flex',
          flexDirection: { xs: 'column', md: 'row' },
          gap: 4,
        }}
      >
        <PersonCard
          photo={novioPhoto}
          title="El Novio"
          message="¡Hola! Soy Alberto, y después de tantos años juntos, por fin me caso con la mujer de mi vida. Estoy emocionadísimo de compartir este momento con todos vosotros. ¡Va a ser épico!"
          borderColor="#8b4513"
          altText="El novio"
        />

        <PersonCard
          photo={noviaPhoto}
          title="La Novia"
          message="¡Hola a todos! Soy Verónica y soy una malisima persona que solo quiere ir a Disney y no quiere a Alberto. Niney?"
          borderColor="#9c27b0"
          altText="La novia"
        />
      </Box>

      <PetsSection />
    </Stack>
  );
};
