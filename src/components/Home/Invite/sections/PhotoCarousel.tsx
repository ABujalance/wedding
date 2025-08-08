'use client';
import {
  Box,
  Typography,
  Card,
  Modal,
  Backdrop,
  IconButton,
} from '@mui/material';
import Image from 'next/image';
import { FC, useMemo, useState } from 'react';
import CloseIcon from '@mui/icons-material/Close';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

interface PhotoCarouselProps {
  images: { src: string; alt: string }[];
}

interface PolaroidPhoto {
  src: string;
  alt: string;
  caption: string;
}

function shuffle<T>(arr: T[]): T[] {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

export const PhotoCarousel: FC<PhotoCarouselProps> = ({ images }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [modalImage, setModalImage] = useState<{
    src: string;
    alt: string;
  } | null>(null);

  // Convertir las imágenes a polaroids usando el alt como caption
  const polaroids: PolaroidPhoto[] = useMemo(() => {
    return images.map((img) => ({
      src: img.src,
      alt: img.alt,
      caption: img.alt,
    }));
  }, [images]);

  const randomized = useMemo(() => shuffle([...polaroids]), [polaroids]);

  const handlePolaroidClick = (clickedIndex: number) => {
    setCurrentIndex(clickedIndex);
  };

  const goToPrevious = () => {
    setCurrentIndex(
      (prev) => (prev - 1 + randomized.length) % randomized.length,
    );
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % randomized.length);
  };

  const handleImageClick = (src: string, alt: string) => {
    setModalImage({ src, alt });
  };

  const handleCloseModal = () => {
    setModalImage(null);
  };

  // Obtener índices de fotos visibles (anterior, actual, siguiente)
  const getVisiblePhotos = () => {
    const total = randomized.length;
    const prevIndex = (currentIndex - 1 + total) % total;
    const nextIndex = (currentIndex + 1) % total;

    return [
      { index: prevIndex, position: 'prev' },
      { index: currentIndex, position: 'current' },
      { index: nextIndex, position: 'next' },
    ];
  };

  const getPolaroidStyle = (position: string) => {
    switch (position) {
      case 'prev':
        return {
          left: { xs: '0%', md: '15%' },
          zIndex: 1,
          transform: {
            xs: 'rotate(-8deg) scale(0.75)',
            md: 'rotate(-8deg) scale(0.85)',
          },
          opacity: 0.7,
        };
      case 'current':
        return {
          left: '50%',
          transform: 'translateX(-50%) rotate(0deg) scale(1)',
          zIndex: 3,
          opacity: 1,
        };
      case 'next':
        return {
          right: { xs: '0%', md: '15%' },
          zIndex: 2,
          transform: {
            xs: 'rotate(8deg) scale(0.75)',
            md: 'rotate(8deg) scale(0.85)',
          },
          opacity: 0.7,
        };
      default:
        return {};
    }
  };

  const visiblePhotos = getVisiblePhotos();

  return (
    <Box
      sx={{
        position: 'relative',
        width: '100%',
        height: { xs: 320, md: 480 },
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        overflow: 'visible', // Cambiado para que las flechas no se corten
        margin: 0,
      }}
    >
      {visiblePhotos.map(({ index, position }) => {
        const photo = randomized[index];

        return (
          <Card
            key={`${photo.src}-${position}`}
            sx={{
              position: 'absolute',
              width: 'auto',
              minWidth: { xs: 200, md: 280 },
              maxWidth: { xs: 280, md: 400 },
              height: { xs: 280, md: 420 },
              cursor: 'pointer',
              transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
              boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
              backgroundColor: 'white',
              padding: { xs: 1, md: 1.5 },
              display: 'flex',
              flexDirection: 'column',
              '&:hover':
                position !== 'current'
                  ? {
                      transform:
                        position === 'prev'
                          ? 'rotate(-8deg) scale(0.9)'
                          : position === 'next'
                          ? 'rotate(8deg) scale(0.9)'
                          : undefined,
                    }
                  : {},
              ...getPolaroidStyle(position),
            }}
            onClick={() => {
              if (position === 'current') {
                handleImageClick(photo.src, photo.alt);
              } else {
                handlePolaroidClick(index);
              }
            }}
          >
            {/* Foto */}
            <Box
              sx={{
                flex: 1,
                minHeight: { xs: 220, md: 340 },
                position: 'relative',
                backgroundColor: 'transparent',
                overflow: 'hidden',
                marginBottom: { xs: 1, md: 1.5 },
              }}
            >
              <Image
                src={photo.src}
                alt={photo.alt}
                fill
                style={{
                  objectFit: 'contain',
                  filter: 'contrast(1.03) saturate(1.03)',
                }}
                sizes="(max-width: 768px) 400px, 600px"
              />
            </Box>

            {/* Texto de la polaroid */}
            <Box
              sx={{
                height: { xs: 40, md: 50 },
                flexShrink: 0,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: 'white',
              }}
            >
              <Typography
                variant="body1"
                sx={{
                  fontFamily: '"Parisienne", serif',
                  color: '#000',
                  fontSize: { xs: '18px', md: '24px' },
                  textAlign: 'center',
                  lineHeight: 1.2,
                }}
              >
                {photo.caption}
              </Typography>
            </Box>
          </Card>
        );
      })}

      {/* Flechas de navegación para móvil */}
      <IconButton
        onClick={goToPrevious}
        sx={{
          position: 'absolute',
          left: { xs: -25, md: -100 }, // Más hacia afuera
          bottom: { xs: 50, md: 0 }, // Bajado más para mejor posición
          backgroundColor: 'rgba(255, 255, 255, 0.9)',
          color: '#8B4513',
          width: { xs: 50, md: 0 },
          height: { xs: 50, md: 0 },
          borderRadius: '50%',
          boxShadow: '0 4px 12px rgba(0,0,0,0.2)',
          border: '2px solid #D2B48C',
          zIndex: 10,
          display: { xs: 'flex', md: 'none' },
          '&:hover': {
            backgroundColor: 'rgba(255, 255, 255, 1)',
            transform: 'scale(1.1)',
          },
        }}
      >
        <ArrowBackIosIcon sx={{ fontSize: 24, ml: 0.5 }} />
      </IconButton>

      <IconButton
        onClick={goToNext}
        sx={{
          position: 'absolute',
          right: { xs: -25, md: -100 }, // Más hacia afuera
          bottom: { xs: 50, md: 0 }, // Bajado más para mejor posición
          backgroundColor: 'rgba(255, 255, 255, 0.9)',
          color: '#8B4513',
          width: { xs: 50, md: 0 },
          height: { xs: 50, md: 0 },
          borderRadius: '50%',
          boxShadow: '0 4px 12px rgba(0,0,0,0.2)',
          border: '2px solid #D2B48C',
          zIndex: 10,
          display: { xs: 'flex', md: 'none' },
          '&:hover': {
            backgroundColor: 'rgba(255, 255, 255, 1)',
            transform: 'scale(1.1)',
          },
        }}
      >
        <ArrowForwardIosIcon sx={{ fontSize: 24 }} />
      </IconButton>

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
    </Box>
  );
};
