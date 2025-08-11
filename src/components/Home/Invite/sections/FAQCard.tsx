'use client';
import { Card, CardContent, Typography, Box, Stack, Button } from '@mui/material';
import { FC, useState } from 'react';
import Image, { StaticImageData } from 'next/image';

export interface FAQCardData {
  title: string;
  content: string;
  image: StaticImageData | string;
  imageAlt: string;
}

interface FAQCardProps {
  data: FAQCardData;
}

// Componente simple para el spoiler
const SpoilerButton: FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isRevealed, setIsRevealed] = useState(false);

  return (
    <Box sx={{ my: 2 }}>
      {!isRevealed ? (
        <Button
          variant="outlined"
          onClick={() => setIsRevealed(true)}
          sx={{
            borderStyle: 'dashed',
            borderWidth: 2,
            padding: 2,
            width: '100%',
            color: '#666',
            borderColor: '#ccc',
            '&:hover': {
              borderColor: '#999',
              backgroundColor: '#f5f5f5',
            },
          }}
        >
          🔒 Haz clic para revelar información
        </Button>
      ) : (
        <Box
          sx={{
            backgroundColor: '#e8f5e8',
            border: '2px solid #4caf50',
            borderRadius: 1,
            padding: 2,
          }}
        >
          <Typography variant="caption" sx={{ color: '#2e7d32', fontWeight: 'bold', display: 'block', mb: 1 }}>
            🔓 Información revelada
          </Typography>
          <Box sx={{ fontFamily: 'monospace', fontSize: '0.9em' }}>
            {children}
          </Box>
        </Box>
      )}
    </Box>
  );
};

export const FAQCard: FC<FAQCardProps> = ({ data }) => {
  // Función para renderizar contenido con spoiler
  const renderContent = () => {
    if (data.title === 'Regalos') {
      return (
        <Box>
          <Typography variant="body2" sx={{ mb: 2 }}>
            Sabemos que algunos de vosotros queréis contribuir con un detalle. Sin embargo, lo más importante para nosotros es que todos estéis allí y pasemos un buen rato juntos. Esta boda es un momento de celebración y no querríamos que faltase nadie.
          </Typography>
          <Typography variant="body2" sx={{ mb: 2 }}>
            Si aún sabiendo esto queréis hacernos un regalo:
          </Typography>
          <SpoilerButton>
            <strong>Cuenta bancaria:</strong><br/>
            ES29 2100 7282 3602 0048 6756
          </SpoilerButton>
        </Box>
      );
    }

    // Para otros contenidos, renderizar normalmente con HTML
    return (
      <Typography
        variant="body2"
        sx={{
          lineHeight: 1.6,
          fontWeight: 400,
          color: '#555',
          '& a': {
            color: '#2196f3',
            textDecoration: 'none',
            fontWeight: 600,
            '&:hover': {
              textDecoration: 'underline',
              color: '#1976d2',
            },
            '&[href*="wa.me"]': {
              color: '#25d366',
              '&:hover': {
                color: '#128c7e',
              },
            },
          },
        }}
        dangerouslySetInnerHTML={{ __html: data.content }}
      />
    );
  };

  return (
    <Card
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
      <CardContent sx={{ p: 3, pt: 0 }}>
        <Stack direction="column" gap={2} alignItems="flex-start">
          <Box>
            <Stack
              direction="row"
              justifyContent="space-between"
              alignItems="center"
            >
              <Box
                sx={{
                  maxWidth: '20%',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'flex-start',
                  pt: 0.5, // Pequeño padding top para alinear con el texto
                }}
              >
                <Image
                  src={data.image}
                  alt={data.imageAlt}
                  width={80}
                  height={80}
                  style={{
                    width: '100%',
                    height: 'auto',
                    maxWidth: '80px',
                    objectFit: 'contain',
                  }}
                />
              </Box>
              <Typography
                variant="h6"
                sx={{
                  fontWeight: 600,
                  mb: 1,
                  lineHeight: 1.3,
                  margin: 0,
                }}
              >
                {data.title}
              </Typography>

              {/* Contenido a la derecha - 70% del ancho */}
            </Stack>
            
            {/* Renderizar contenido usando la función */}
            {renderContent()}
            
          </Box>
        </Stack>
      </CardContent>
    </Card>
  );
};
