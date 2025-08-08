'use client';
import { Stack, Typography, Button, Grid2 as Grid, Box } from '@mui/material';
import { FC } from 'react';
import fachada from '@/assets/images/hacienda/Fachada.jpg';
import hacienda from '@/assets/images/hacienda/hacienda.jpeg';

export const LocationSection: FC = () => {
  const mapsUrl = 'https://maps.app.goo.gl/aWzHhykqJQne9iMVA';
  return (
    <Stack gap={2} alignItems="center">
      <Typography variant="h4" component="h2">
        Lugar
      </Typography>
      <Typography variant="body1" textAlign="center">
        Hacienda Los Frailes de San Alberto
      </Typography>
      <Button variant="outlined" href={mapsUrl} target="_blank" rel="noopener">
        Ver en Google Maps
      </Button>
      <Grid container spacing={2} sx={{ width: '100%', maxWidth: 900 }}>
        <Grid size={{ xs: 12, sm: 6 }}>
          <Box
            component="img"
            src={fachada.src}
            alt="Fachada Hacienda"
            sx={{
              width: '100%',
              borderRadius: 2,
              objectFit: 'cover',
              height: 220,
            }}
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 6 }}>
          <Box
            component="img"
            src={hacienda.src}
            alt="Hacienda"
            sx={{
              width: '100%',
              borderRadius: 2,
              objectFit: 'cover',
              height: 220,
            }}
          />
        </Grid>
      </Grid>
    </Stack>
  );
};
