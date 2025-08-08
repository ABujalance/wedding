'use client';
import { Card, CardContent, Stack, Typography } from '@mui/material';
import { FC } from 'react';

const items = [
  { title: 'Parking', text: 'Habrá aparcamiento de sobra disponible.' },
  {
    title: 'Álbum compartido',
    text: 'Pronto dejaremos aquí el enlace a la app para subir fotos.',
  },
  {
    title: 'Regalos',
    text: 'Dejaremos aquí la cuenta bancaria con un mensajito bonito.',
  },
];

export const AdditionalInfoCards: FC = () => {
  return (
    <Stack gap={2} alignItems="center">
      <Typography sx={{ typography: { xs: 'h6', md: 'h5' } }} component="h2">
        Información adicional
      </Typography>
      <Stack
        direction={{ xs: 'column', md: 'row' }}
        gap={2}
        sx={{ width: '100%' }}
        justifyContent="center"
      >
        {items.map((it) => (
          <Card key={it.title} sx={{ flex: 1, minWidth: 260 }}>
            <CardContent>
              <Typography variant="h6">{it.title}</Typography>
              <Typography variant="body2">{it.text}</Typography>
            </CardContent>
          </Card>
        ))}
      </Stack>
    </Stack>
  );
};
