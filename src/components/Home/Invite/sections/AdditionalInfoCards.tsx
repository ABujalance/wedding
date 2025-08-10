'use client';
import {
  Stack,
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Box,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { FC, useState } from 'react';
import { FAQCard, FAQCardData } from './FAQCard';

// Importar imágenes para las FAQs
import ParkingImage from '@/assets/images/FAQ/parking.webp';
import GiftImage from '@/assets/images/FAQ/gift.png';
import PhotosImage from '@/assets/images/FAQ/photos.png';
import ContactImage from '@/assets/images/FAQ/whatsapp.webp';
// Datos de las tarjetas FAQ - Fácil de modificar y añadir más
const faqData: FAQCardData[] = [
  {
    title: 'Parking',
    content:
      'Habrá aparcamiento disponible en la Hacienda. No te preocupes por encontrar sitio, tenemos espacio para todos nuestros invitados.',
    image: ParkingImage,
    imageAlt: 'Parking',
  },
  {
    title: 'Álbum compartido',
    content:
      'Queremos guardar todos los momentos especiales de ese día y es por ello que durante la celebración estará disponible una web para que toméis y subáis vídeos y fotos. Podéis descargar ya la app para tener acceso a notificaciones especiales, pero no será necesario',
    image: PhotosImage,
    imageAlt: 'Album de fotos',
  },
  {
    title: 'Regalos',
    content: `Sabemos que algunos de vosotros queréis contribuir con un detalle. Sin embargo, lo más importante para nosotros es que todos estéis allí y pasemos un buen rato juntos. Esta boda es un momento de celebración y no querríamos que faltase nadie.<br><br>Si aún sabiendo esto queréis hacernos un regalo:
    <div class="spoiler">
      <div class="spoiler-content">
        <strong>Cuenta bancaria:</strong><br>
       ES29 2100 7282 3602 0048 6756<br>
      </div>
    </div>`,
    image: GiftImage,
    imageAlt: 'Regalos',
  },
  {
    title: 'Contacto',
    content: `Si hay algo que queráis decirnos, podéis usar los comentarios del formulario para hacerlo, es la forma más rápida para nosotros.<br><br>Sin embargo, para cualquier cosa que podáis necesitar o si preferís no usar el formulario, podéis contactarnos por WhatsApp:<br><br><strong>Verónica:</strong> <a href="https://wa.me/34661150019">661 150 019</a><br><strong>Alberto:</strong> <a href="https://wa.me/34689355643">689 355 643</a>`,
    image: ContactImage,
    imageAlt: 'Contacto',
  },
];

export const AdditionalInfoCards: FC = () => {
  const [hasBeenExpanded, setHasBeenExpanded] = useState(false);

  const handleAccordionChange = (
    event: React.SyntheticEvent,
    isExpanded: boolean,
  ) => {
    if (isExpanded && !hasBeenExpanded) {
      setHasBeenExpanded(true);
    }
  };

  return (
    <Stack gap={3} sx={{ width: '100%', mt: 4 }}>
      {/* Acordeón principal que contiene todas las preguntas */}
      <Accordion
        onChange={handleAccordionChange}
        sx={{
          boxShadow: 'none',
          border: 'none',
          '&:before': {
            display: 'none',
          },
          '&.Mui-expanded': {
            margin: 0,
          },
          backgroundColor: 'transparent',
        }}
      >
        <AccordionSummary
          expandIcon={
            <ExpandMoreIcon
              sx={{
                fontSize: 28,
                ...(hasBeenExpanded
                  ? {}
                  : {
                      animation: 'bounce 2s infinite',
                      '@keyframes bounce': {
                        '0%, 20%, 50%, 80%, 100%': {
                          transform: 'translateY(0)',
                        },
                        '40%': {
                          transform: 'translateY(-8px)',
                        },
                        '60%': {
                          transform: 'translateY(-4px)',
                        },
                      },
                    }),
              }}
            />
          }
          aria-controls="preguntas-comunes-content"
          id="preguntas-comunes-header"
          sx={{
            backgroundColor: 'transparent',
            borderRadius: 0,
            minHeight: 70,
            borderBottom: '2px dotted #ccc',
            '&.Mui-expanded': {
              borderRadius: 0,
            },
            '&:hover': {
              backgroundColor: 'rgba(0,0,0,0.02)',
            },
          }}
        >
          <Box sx={{ textAlign: 'center', width: '100%' }}>
            <Typography
              variant="h5"
              component="h2"
              sx={{
                fontWeight: 700,
                mb: 0.5,
              }}
            >
              Preguntas frecuentes
            </Typography>
            {!hasBeenExpanded && (
              <Typography
                variant="body2"
                sx={{
                  color: '#666',
                  fontStyle: 'italic',
                }}
              >
                Toca para expandir y ver la información adicional
              </Typography>
            )}
          </Box>
        </AccordionSummary>

        <AccordionDetails
          sx={{
            backgroundColor: 'transparent',
            borderRadius: 0,
            p: 3,
            pt: 2,
          }}
        >
          {/* Contenido expandido con las nuevas tarjetas FAQ */}
          <Stack
            direction={{ xs: 'column', md: 'row' }}
            gap={3}
            sx={{ width: '100%' }}
            alignItems="stretch"
            justifyContent="center"
            flexWrap={'wrap'}
          >
            {faqData.map((item, index) => (
              <FAQCard key={index} data={item} />
            ))}
          </Stack>
        </AccordionDetails>
      </Accordion>
    </Stack>
  );
};
