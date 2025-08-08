'use client';
import { Stack, Typography, Button, Box } from '@mui/material';
import { FC } from 'react';
import fachada from '@/assets/images/hacienda/Fachada.jpg';
import hacienda from '@/assets/images/hacienda/hacienda.jpeg';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import Image from 'next/image';

export const LocationSection: FC = () => {
  const mapsUrl = 'https://maps.app.goo.gl/aWzHhykqJQne9iMVA';
  return (
    <Stack gap={3} alignItems="center">
      <Typography variant="h5" textAlign="center" sx={{ fontWeight: 800 }}>
        Hacienda Los Frailes de San Alberto
      </Typography>
      <Button
        variant="contained"
        href={mapsUrl}
        target="_blank"
        rel="noopener"
        sx={{
          backgroundColor: '#BD9E24',
          color: 'white',
          '&:hover': {
            backgroundColor: '#9a7e1c',
          },
          textTransform: 'none',
          px: 3,
          py: 1.5,
          borderRadius: 2,
          boxShadow: '0 4px 12px rgba(189, 158, 36, 0.3)',
        }}
        startIcon={<LocationOnIcon />}
      >
        Ver en Google Maps
      </Button>

      {/* Contenedor de fotos superpuestas */}
      <Box
        sx={{
          position: 'relative',
          width: '100%',
          maxWidth: 400,
          height: 240,
          mx: 'auto',
        }}
      >
        {/* Primera foto - atrás y a la izquierda */}
        <Box
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            zIndex: 1,
            transform: 'rotate(-3deg)',
            transformOrigin: 'center',
            boxShadow: '0 12px 24px rgba(0,0,0,0.2)',
            border: '6px solid white',
            borderRadius: 2,
            overflow: 'hidden',
            width: 200,
            height: 150,
          }}
        >
          <Image
            src={fachada.src}
            alt="Fachada Hacienda"
            fill
            style={{
              objectFit: 'cover',
            }}
          />
        </Box>

        {/* Segunda foto - delante y a la derecha */}
        <Box
          sx={{
            position: 'absolute',
            top: 40,
            right: 0,
            zIndex: 2,
            transform: 'rotate(2deg)',
            transformOrigin: 'center',
            boxShadow: '0 16px 32px rgba(0,0,0,0.25)',
            border: '6px solid white',
            borderRadius: 2,
            overflow: 'hidden',
            width: 220,
            height: 165,
          }}
        >
          <Image
            src={hacienda.src}
            alt="Hacienda"
            fill
            style={{
              objectFit: 'cover',
            }}
          />
        </Box>
      </Box>
    </Stack>
  );
};
