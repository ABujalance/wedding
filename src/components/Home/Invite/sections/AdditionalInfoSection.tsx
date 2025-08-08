'use client';
import { Stack, Typography, Link } from '@mui/material';
import { FC } from 'react';

export const AdditionalInfoSection: FC = () => {
  return (
    <Stack gap={2} alignItems="center">
      <Typography sx={{ typography: { xs: 'h6', md: 'h5' } }} component="h2">
        Información adicional
      </Typography>
      <Typography>Parking: habrá aparcamiento de sobra disponible.</Typography>
      <Typography>
        Álbum compartido:{' '}
        <Link href="#" underline="hover">
          (pendiente de enlazar la app)
        </Link>
      </Typography>
      <Typography>
        Regalos:{' '}
        <Link href="#" underline="hover">
          (dejaré aquí la cuenta bancaria con un mensajito bonito)
        </Link>
      </Typography>
    </Stack>
  );
};
