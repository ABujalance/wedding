'use client';
import { Card, CardContent, Typography, Box, Stack } from '@mui/material';
import { FC } from 'react';
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

export const FAQCard: FC<FAQCardProps> = ({ data }) => {
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
      <CardContent sx={{ p: 3 }}>
        <Stack direction="row" gap={2} alignItems="flex-start">
          {/* Imagen a la izquierda - 30% del ancho */}
          <Box
            sx={{
              flex: '0 0 30%',
              maxWidth: '30%',
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

          {/* Contenido a la derecha - 70% del ancho */}
          <Box sx={{ flex: '1 1 70%' }}>
            <Typography
              variant="h6"
              sx={{
                fontWeight: 600,
                mb: 1,
                lineHeight: 1.3,
              }}
            >
              {data.title}
            </Typography>
            <Typography
              variant="body2"
              sx={{
                color: '#666',
                lineHeight: 1.5,
              }}
            >
              {data.content}
            </Typography>
          </Box>
        </Stack>
      </CardContent>
    </Card>
  );
};
