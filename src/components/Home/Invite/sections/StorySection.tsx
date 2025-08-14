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
        ¡Hola! Cada vez queda menos para el gran día. Estamos muy felices de
        poder compartir el inicio de esta nueva etapa con nuestras personas más
        queridas. Para nosotros la navidad es una época muy especial y queremos
        que esta sea inolvidable para todos. <br />
        <strong>¡Os esperamos!</strong>
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
          message="¡Hola! Soy Alberto y estoy deseando poder veros a todos en la boda. Para mí el hecho del matrimonio no significa tanto como poder compartir mi amor por Verónica con todos vosotros. Espero que este día sea para vosotros al menos un pequeño porcentaje de lo que lo es para mi un día cualquiera a su lado."
          borderColor="#9FA58D"
          altText="El novio"
          imagePosition="0% 60%"
          imageScale={1.1}
        />

        <PersonCard
          photo={noviaPhoto}
          title="La Novia"
          message="¡Hola! Soy Verónica y después de tantos años soñando con este día, por fin está aquí. Con Alberto he encontrado mi hogar, mi risa constante y mi mejor amigo. Gracias por acompañarnos en el inicio de nuestra historia para siempre. Happy ever after!"
          borderColor="#9C4B47"
          altText="La novia"
          imagePosition="55% 50%"
          imageScale={1.5}
        />
      </Box>

      <PetsSection />
    </Stack>
  );
};
