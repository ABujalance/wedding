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
    info: 'quiero que mi papi me siga dando palmaditas en el lomo y caricias en la barriga. Este año quiero que Bilbo deje de molestarme y que me deje dormir tranquilo. También quiero muchos premios y juguetes para perseguir yo solito.',
    imagePosition: '50% 40%', // Posición personalizada con porcentajes
    imageScale: 2.3, // Zoom: 1.0 = normal, 1.5 = 150%, 0.8 = 80%
  },
  {
    name: 'Bilbo',
    photo: bilboPhoto.src,
    drawing: bilboDrawing.src,
    gender: 'M',
    info: 'Este año me he portado muy bien, por eso quiero pedir que os lleveis a Nami para que no me moleste tanto. También quiero más cables para moderlos',
    imagePosition: '45% 40%', // Enfoca en la cara
    imageScale: 1.75, // Zoom para enfocar más en la cara
  },
  {
    name: 'Nami',
    photo: namiPhoto.src,
    drawing: namiDrawing.src,
    behavior: 'Buena',
    gender: 'H',
    info: 'Este año he sido muy muy buena y por eso quiero que me traigais muchos juguetes nuevos, y más gatitos para jugar, y otro perrito, y más perritos. Y también premios y que me lleven a casa de la abuela a jugar con Lucky y que me lleven al campo a jugar con los otros perros y a correr y al parque a ver más perros y a la calle a ver más perros y a jugar con todos los perritos del mundo.',
    imagePosition: '45% 40%', // Posición personalizada con porcentajes
    imageScale: 2.2, // Zoom personalizado
  },
];

export const PetsSection: FC = () => {
  return (
    <Stack gap={2} alignItems="center" sx={{ width: '100%' }}>
      <Typography
        variant="h4"
        fontWeight={800}
        sx={{ textDecoration: 'underline' }}
      >
        Nuestros pequeños
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
                      objectPosition: pet.imagePosition,
                      transform: `scale(${pet.imageScale || 1})`,
                      transformOrigin: pet.imagePosition, // Usar la misma posición para el origen del transform
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
                <Typography
                  sx={{ mb: 1 }}
                  fontFamily='"Caveat", cursive'
                  color="#000000"
                >
                  <strong>Queridos reyes magos:</strong> {pet.info}
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
