'use client';
import bilboDrawing from '@/assets/images/Mascotas/Bilbo-dibujo.png';
import bilboPhoto from '@/assets/images/Mascotas/Bilbo.jpeg';
import fuDrawing from '@/assets/images/Mascotas/Fu-dibujo.png';
import fuPhoto from '@/assets/images/Mascotas/Fu.jpeg';
import namiDrawing from '@/assets/images/Mascotas/Nami-dibujo.png';
import namiPhoto from '@/assets/images/Mascotas/Nami.jpeg';
import { Box, Card, CardContent, Stack, Typography } from '@mui/material';
import Image from 'next/image';
import { FC } from 'react';

const pets = [
  {
    name: 'Fu (Monsieur Fu)',
    photo: fuPhoto.src,
    drawing: fuDrawing.src,
    behavior: 'Bueno',
    gender: 'M',
    info: 'Duis aute irure dolor in reprehenderit in voluptate.',
  },
  {
    name: 'Bilbo',
    photo: bilboPhoto.src,
    drawing: bilboDrawing.src,
    behavior: 'Regular',
    gender: 'M',
    info: 'Duis aute irure dolor in reprehenderit in voluptate.',
  },
  {
    name: 'Nami',
    photo: namiPhoto.src,
    drawing: namiDrawing.src,
    behavior: 'Buena',
    gender: 'H',
    info: 'Duis aute irure dolor in reprehenderit in voluptate.',
  },
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
        gap={3}
        alignItems="center"
        width="100%"
        sx={{ maxWidth: '800px', mx: 'auto' }}
      >
        {pets.map((pet, idx) => (
          <Card
            key={pet.name}
            sx={{
              width: { xs: '100%', md: '500px' },
              maxWidth: '100%',
              border: '2px dashed #b8860b',
              borderRadius: 2,
              boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
              transform: {
                xs: 'rotate(0deg)',
                md: idx % 2 === 0 ? 'rotate(-1.5deg)' : 'rotate(2deg)',
              },
              alignSelf: {
                xs: 'center',
                md: idx % 2 === 0 ? 'flex-start' : 'flex-end',
              },
              background: 'linear-gradient(135deg, #fffaf0, #fffef8)',
            }}
          >
            <CardContent sx={{ p: 2 }}>
              {/* Layout tipo carnet: foto arriba izquierda + información */}
              <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
                {/* Foto cuadrada arriba izquierda */}
                <Box
                  sx={{
                    width: 160,
                    height: 160,
                    borderRadius: 1,
                    overflow: 'hidden',
                    border: '2px solid #b8860b',
                    flexShrink: 0,
                  }}
                >
                  <Image
                    src={pet.photo}
                    alt={`Foto de ${pet.name}`}
                    width={160}
                    height={160}
                    style={{
                      objectFit: 'cover',
                      objectPosition: 'center',
                    }}
                  />
                </Box>

                {/* Información del carnet */}
                <Box sx={{ flex: 1, minWidth: 0 }}>
                  <Typography
                    variant="h6"
                    sx={{
                      typography: { xs: 'subtitle1', md: 'h6' },
                      fontWeight: 'bold',
                      mb: 0.5,
                    }}
                  >
                    {pet.name}
                  </Typography>
                  <Typography variant="body2" sx={{ mb: 0.3 }}>
                    <strong>Comportamiento:</strong>{' '}
                    {pet.name === 'Bilbo' ? (
                      <Box component="span" sx={{ position: 'relative' }}>
                        <Box
                          component="span"
                          sx={{
                            textDecoration: 'line-through',
                            color: '#666',
                            opacity: 0.7,
                          }}
                        >
                          Malo
                        </Box>
                        <Box
                          component="span"
                          sx={{
                            ml: 0.5,
                            color: '#2e7d32',
                            fontWeight: 'bold',
                            fontStyle: 'italic',
                          }}
                        >
                          Bueno
                        </Box>
                      </Box>
                    ) : (
                      pet.behavior
                    )}
                  </Typography>
                  <Typography variant="body2" sx={{ mb: 0.3 }}>
                    <strong>Sexo:</strong> {pet.gender}
                  </Typography>
                </Box>
              </Box>

              {/* Información adicional */}
              <Box sx={{ mb: 2 }}>
                <Typography variant="body2" sx={{ mb: 1 }}>
                  <strong>Sobre mí:</strong> {pet.info}
                </Typography>
              </Box>

              {/* Dibujo abajo */}
              <Box sx={{ textAlign: 'center' }}>
                <Image
                  src={pet.drawing}
                  alt={`Dibujo de ${pet.name}`}
                  width={240}
                  height={240}
                  style={{
                    objectFit: 'contain',
                  }}
                />
              </Box>
            </CardContent>
          </Card>
        ))}
      </Stack>
    </Stack>
  );
};
