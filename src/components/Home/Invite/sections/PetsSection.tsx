'use client';
import { Stack, Typography, Card, CardContent, CardMedia } from '@mui/material';
import { FC } from 'react';
import bilbo from '@/assets/images/Mascotas/Bilbo-dibujo.png';
import fu from '@/assets/images/Mascotas/Fu-dibujo.png';
import nami from '@/assets/images/Mascotas/Nami-dibujo.png';

const pets = [
  { name: 'Fu (Monsieur Fu)', img: fu.src, status: 'Bueno' },
  { name: 'Bilbo', img: bilbo.src, status: 'Regular' },
  { name: 'Nami', img: nami.src, status: 'Buena' },
];

export const PetsSection: FC = () => {
  return (
    <Stack gap={2} alignItems="center" sx={{ width: '100%' }}>
      <Typography
        variant="h5"
        component="h2"
        sx={{ typography: { xs: 'h6', md: 'h5', lg: 'h4' } }}
      >
        Invitados de honor
      </Typography>
      <Stack
        direction={{ xs: 'column', sm: 'row' }}
        gap={2}
        alignItems="stretch"
        width="100%"
        justifyContent="center"
      >
        {pets.map((p, idx) => (
          <Card
            key={p.name}
            sx={{
              width: { xs: '100%', sm: 260 },
              maxWidth: '100%',
              alignSelf: 'stretch',
              border: '2px dashed #b8860b',
              borderRadius: 2,
              boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
              transform: {
                xs: 'rotate(0deg)',
                sm: idx % 2 ? 'rotate(2deg)' : 'rotate(-1.5deg)',
              },
              background: 'linear-gradient(135deg, #fffaf0, #fffef8)',
            }}
          >
            <CardMedia
              component="img"
              height="200"
              image={p.img}
              alt={p.name}
              sx={{ objectFit: 'contain', p: 1 }}
            />
            <CardContent>
              <Typography
                variant="h6"
                textAlign="center"
                sx={{ typography: { xs: 'subtitle1', md: 'h6' } }}
              >
                {p.name}
              </Typography>
              <Typography variant="body2" textAlign="center">
                {p.status}
              </Typography>
              <Typography
                variant="caption"
                display="block"
                textAlign="center"
                sx={{ mt: 0.5, opacity: 0.8 }}
              >
                Lista de papá Noel
              </Typography>
            </CardContent>
          </Card>
        ))}
      </Stack>
    </Stack>
  );
};
