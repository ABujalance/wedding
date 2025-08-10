'use client';
import { Card, CardContent, Typography, Box, Stack } from '@mui/material';
import { FC, useEffect, useRef } from 'react';
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
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleSpoilerClick = (event: Event) => {
      const target = event.target as HTMLElement;
      if (target.classList.contains('spoiler')) {
        target.classList.toggle('revealed');
      }
    };

    const contentElement = contentRef.current;
    if (contentElement) {
      const spoilers = contentElement.querySelectorAll('.spoiler');
      spoilers.forEach((spoiler) => {
        spoiler.addEventListener('click', handleSpoilerClick);
      });

      return () => {
        spoilers.forEach((spoiler) => {
          spoiler.removeEventListener('click', handleSpoilerClick);
        });
      };
    }
  }, [data.content]);

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
            <Typography
              ref={contentRef}
              variant="body2"
              sx={{
                color: '#666',
                lineHeight: 1.5,
                '& strong': {
                  fontWeight: 600,
                  color: '#333',
                },
                '& .spoiler': {
                  backgroundColor: '#f5f5f5',
                  border: '1px dashed #ccc',
                  borderRadius: 1,
                  padding: 1,
                  marginTop: 1,
                  cursor: 'pointer',
                  transition: 'background-color 0.2s',
                  position: 'relative',
                  '&:hover': {
                    backgroundColor: '#eeeeee',
                  },
                  '&::before': {
                    content: '"🔒 pulsa para revelar"',
                    fontSize: '0.75em',
                    color: '#888',
                    fontStyle: 'italic',
                  },
                  '&.revealed::before': {
                    content: '"🔓 Información revelada"',
                  },
                },
                '& .spoiler-content': {
                  display: 'none',
                  marginTop: 1,
                  padding: 1,
                  backgroundColor: '#fff',
                  border: '1px solid #ddd',
                  borderRadius: 1,
                  fontFamily: 'monospace',
                  fontSize: '0.9em',
                },
                '& .spoiler.revealed .spoiler-content': {
                  display: 'block',
                },
                '& a': {
                  color: '#2196f3',
                  textDecoration: 'none',
                  fontWeight: 600,
                  '&:hover': {
                    textDecoration: 'underline',
                    color: '#1976d2',
                  },
                  '&[href^="tel:"]': {
                    color: '#4caf50',
                    '&:hover': {
                      color: '#388e3c',
                    },
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
          </Box>
        </Stack>
      </CardContent>
    </Card>
  );
};
