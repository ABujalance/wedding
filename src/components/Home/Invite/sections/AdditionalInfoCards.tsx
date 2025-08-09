'use client';
import { Card, CardContent, Stack, Typography, Accordion, AccordionSummary, AccordionDetails, Box } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { FC, useState } from 'react';

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
  const [hasBeenExpanded, setHasBeenExpanded] = useState(false);

  const handleAccordionChange = (event: React.SyntheticEvent, isExpanded: boolean) => {
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
                ...(hasBeenExpanded ? {} : {
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
                })
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
              Preguntas comunes
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
          {/* Contenido expandido con las tarjetas originales */}
          <Stack
            direction={{ xs: 'column', md: 'row' }}
            gap={3}
            sx={{ width: '100%' }}
            alignItems="stretch"
            justifyContent="center"
          >
            {items.map((item) => (
              <Card
                key={item.title}
                sx={{
                  width: { xs: '100%', sm: '100%', md: 'auto' },
                  flex: { md: 1 },
                  minWidth: { md: 260 },
                  alignSelf: 'stretch',
                  maxWidth: '100%',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
                  borderRadius: 2,
                  '&:hover': {
                    boxShadow: '0 4px 16px rgba(0,0,0,0.12)',
                    transform: 'translateY(-2px)',
                  },
                  transition: 'all 0.3s ease',
                }}
              >
                <CardContent>
                  <Typography 
                    variant="h6" 
                    sx={{ 
                      fontWeight: 600,
                      mb: 1,
                    }}
                  >
                    {item.title}
                  </Typography>
                  <Typography variant="body2" sx={{ color: '#666' }}>
                    {item.text}
                  </Typography>
                </CardContent>
              </Card>
            ))}
          </Stack>
        </AccordionDetails>
      </Accordion>
    </Stack>
  );
};