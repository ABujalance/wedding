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
    <Stack gap={2} alignItems="center" sx={{ width: '100%' }}>
      <Typography variant="h5" component="h2">
        Información adicional
      </Typography>
      <Stack
        direction={{ xs: 'column', md: 'row' }}
        gap={2}
        sx={{ width: '100%' }}
        alignItems="stretch"
        justifyContent="center"
      >
        {items.map((it) => (
          <Card
            key={it.title}
            sx={{
              width: { xs: '100%', sm: '100%', md: 'auto' },
              flex: { md: 1 },
              minWidth: { md: 260 },
              alignSelf: 'stretch',
              maxWidth: '100%',
            }}
          >
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
