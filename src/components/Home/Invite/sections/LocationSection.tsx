'use client';
import { Stack, Typography, Box, Modal, Backdrop } from '@mui/material';
import { FC, useState } from 'react';
import fachada from '@/assets/images/hacienda/Fachada.jpg';
import hacienda from '@/assets/images/hacienda/hacienda.jpeg';
import CloseIcon from '@mui/icons-material/Close';
import Image from 'next/image';
import { LocationSticker } from '../components/Sticker';

export const LocationSection: FC = () => {
  const mapsUrl = 'https://maps.app.goo.gl/aWzHhykqJQne9iMVA';
  const [modalImage, setModalImage] = useState<{
    src: string;
    alt: string;
  } | null>(null);

  const handleImageClick = (src: string, alt: string) => {
    setModalImage({ src, alt });
  };

  const handleCloseModal = () => {
    setModalImage(null);
  };
  return (
    <Stack gap={3} alignItems="center">
      <Typography
        variant="h4"
        textAlign="center"
        sx={{
          fontWeight: 800,
          fontFamily: '"Caveat", cursive',
          color: '#000000',
        }}
      >
        Hacienda Los Frailes de San Alberto
      </Typography>
      {/* Contenedor de fotos superpuestas */}
      <Box
        sx={{
          position: 'relative',
          width: '100%',
          maxWidth: 400,
          height: { xs: 140, md: 240 },
          mx: 'auto',
        }}
      >
        {/* Primera foto - atrás y a la izquierda */}
        <Box
          sx={{
            position: 'absolute',
            top: { xs: 15, md: 0 },
            left: { xs: 0, md: 0 },
            zIndex: 1,
            transform: { xs: 'rotate(-2deg)', md: 'rotate(-3deg)' },
            transformOrigin: 'center',
            boxShadow: '0 12px 24px rgba(0,0,0,0.2)',
            border: '6px solid white',
            borderRadius: 2,
            overflow: 'hidden',
            width: { xs: 120, md: 200 },
            height: { xs: 90, md: 150 },
            cursor: 'pointer',
            transition: 'transform 0.2s ease',
            '&:hover': {
              transform: {
                xs: 'rotate(-2deg) scale(1.05)',
                md: 'rotate(-3deg) scale(1.05)',
              },
            },
          }}
          onClick={() => handleImageClick(fachada.src, 'Fachada Hacienda')}
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
            top: { xs: 0, md: 40 },
            right: { xs: 0, md: 0 },
            left: { xs: 80, md: 'auto' }, // Reducido el overlap en móvil
            zIndex: 2,
            transform: { xs: 'rotate(1deg)', md: 'rotate(2deg)' },
            transformOrigin: 'center',
            boxShadow: '0 16px 32px rgba(0,0,0,0.25)',
            border: '6px solid white',
            borderRadius: 2,
            overflow: 'hidden',
            width: { xs: 140, md: 220 },
            height: { xs: 105, md: 165 },
            cursor: 'pointer',
            transition: 'transform 0.2s ease',
            '&:hover': {
              transform: {
                xs: 'rotate(1deg) scale(1.05)',
                md: 'rotate(2deg) scale(1.05)',
              },
            },
          }}
          onClick={() => handleImageClick(hacienda.src, 'Hacienda')}
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

      <LocationSticker href={mapsUrl} />

      {/* Modal para mostrar imagen en grande */}
      <Modal
        open={!!modalImage}
        onClose={handleCloseModal}
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          p: { xs: 2, md: 2 },
        }}
        BackdropComponent={Backdrop}
        BackdropProps={{
          sx: {
            backgroundColor: 'rgba(0, 0, 0, 0.9)',
          },
        }}
      >
        <Box
          sx={{
            position: 'relative',
            width: { xs: '85vw', md: '80vw' },
            height: { xs: '60vh', md: '80vh' },
            maxWidth: { xs: 'none', md: '1000px' },
            maxHeight: { xs: 'none', md: '800px' },
            outline: 'none',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          {modalImage && (
            <>
              <Box
                sx={{
                  position: 'absolute',
                  top: { xs: -25, md: -40 },
                  right: { xs: -25, md: -40 },
                  zIndex: 10,
                  backgroundColor: 'white',
                  borderRadius: '50%',
                  width: { xs: 35, md: 40 },
                  height: { xs: 35, md: 40 },
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.3)',
                }}
                onClick={handleCloseModal}
              >
                <CloseIcon
                  sx={{ color: '#333', fontSize: { xs: 18, md: 24 } }}
                />
              </Box>
              <Box
                sx={{
                  width: '100%',
                  height: '100%',
                  position: 'relative',
                  borderRadius: 2,
                  overflow: 'hidden',
                  backgroundColor: 'rgba(0, 0, 0, 0.1)',
                  boxShadow: '0 8px 32px rgba(0,0,0,0.3)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <Image
                  src={modalImage.src}
                  alt={modalImage.alt}
                  fill
                  style={{
                    objectFit: 'contain',
                  }}
                />
              </Box>
            </>
          )}
        </Box>
      </Modal>
    </Stack>
  );
};
