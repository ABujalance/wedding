'use client';
import { Stack, Typography, Box, Card, CardContent } from '@mui/material';
import { FC } from 'react';
import { PetsSection } from '@/components/Home/Invite/sections/PetsSection';
import { SectionSeparator } from '../components/SectionSeparator';
import Image from 'next/image';
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
        Empezamos esta aventura hace muchos años y ahora queremos celebrarlo con
        vosotros. Estamos deseando compartir este día tan especial con las
        personas que más queremos. ¡Será una fiesta increíble!
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
        {/* Tarjeta del novio */}
        <Card
          sx={{
            flex: { xs: 'none', md: 1 },
            borderRadius: 4,
            boxShadow: '0 12px 32px rgba(0,0,0,0.15)',
            border: '3px solid #8b4513',
            overflow: 'hidden',
            position: 'relative',
          }}
        >
          {/* Foto del novio (header) */}
          <Box
            sx={{
              width: '100%',
              height: { xs: 200, md: 220 },
              position: 'relative',
              overflow: 'hidden',
            }}
          >
            <Image
              src={novioPhoto}
              alt="El novio"
              fill
              style={{
                objectFit: 'cover',
                objectPosition: 'center center',
              }}
            />
          </Box>

          {/* Título solapado */}
          <Box
            sx={{
              position: 'absolute',
              top: { xs: 160, md: 180 },
              left: '50%',
              transform: 'translateX(-50%)',
              backgroundColor: 'rgba(0,0,0,0.6)',
              color: 'white',
              px: 3,
              py: 1.5,
              borderRadius: 3,
              boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
              zIndex: 2,
            }}
          >
            <Typography
              variant="h6"
              sx={{
                fontWeight: 'bold',
                textAlign: 'center',
                color: 'white',
              }}
            >
              El Novio
            </Typography>
          </Box>

          {/* Contenido de la carta */}
          <CardContent sx={{ pt: 4, pb: 3, px: 3 }}>
            <Typography
              sx={{
                fontSize: { xs: '16px', md: '18px' },
                lineHeight: 1.6,
                color: '#3e2723',
                fontStyle: 'italic',
                textAlign: 'center',
                fontFamily: '"Caveat", cursive',
                mt: 1,
              }}
            >
              &ldquo;¡Hola! Soy Alberto, y después de tantos años juntos, por
              fin me caso con la mujer de mi vida. Estoy emocionadísimo de
              compartir este momento con todos vosotros. ¡Va a ser épico!&rdquo;
            </Typography>
          </CardContent>
        </Card>

        {/* Tarjeta de la novia */}
        <Card
          sx={{
            flex: { xs: 'none', md: 1 },
            borderRadius: 4,
            boxShadow: '0 12px 32px rgba(0,0,0,0.15)',
            border: '3px solid #9c27b0',
            overflow: 'hidden',
            position: 'relative',
          }}
        >
          {/* Foto de la novia (header) */}
          <Box
            sx={{
              width: '100%',
              height: { xs: 200, md: 220 },
              position: 'relative',
              overflow: 'hidden',
            }}
          >
            <Image
              src={noviaPhoto}
              alt="La novia"
              fill
              style={{
                objectFit: 'cover',
                objectPosition: 'center center',
              }}
            />
          </Box>

          {/* Título solapado */}
          <Box
            sx={{
              position: 'absolute',
              top: { xs: 160, md: 180 },
              left: '50%',
              transform: 'translateX(-50%)',
              backgroundColor: 'rgba(0,0,0,0.6)',
              color: 'white',
              px: 3,
              py: 1.5,
              borderRadius: 3,
              boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
              zIndex: 2,
            }}
          >
            <Typography
              variant="h6"
              sx={{
                color: 'white',
                fontWeight: 'bold',
                textAlign: 'center',
              }}
            >
              La Novia
            </Typography>
          </Box>

          {/* Contenido de la carta */}
          <CardContent sx={{ pt: 4, pb: 3, px: 3 }}>
            <Typography
              sx={{
                fontSize: { xs: '16px', md: '18px' },
                lineHeight: 1.6,
                color: '#3e2723',
                fontStyle: 'italic',
                textAlign: 'center',
                fontFamily: '"Caveat", cursive',
                mt: 1,
              }}
            >
              &ldquo;¡Hola a todos! Soy Verónica y soy una malisima persona que
              solo quiere ir a Disney y no quiere a Alberto. Niney?&rdquo;
            </Typography>
          </CardContent>
        </Card>
      </Box>

      <PetsSection />
    </Stack>
  );
};
