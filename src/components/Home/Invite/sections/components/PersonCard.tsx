'use client';
import { Box, Card, CardContent, Typography } from '@mui/material';
import Image, { StaticImageData } from 'next/image';
import { FC } from 'react';

interface PersonCardProps {
  photo: StaticImageData;
  title: string;
  message: string;
  borderColor: string;
  altText: string;
}

export const PersonCard: FC<PersonCardProps> = ({
  photo,
  title,
  message,
  borderColor,
  altText,
}) => {
  return (
    <Card
      sx={{
        flex: { xs: 'none', md: 1 },
        borderRadius: 4,
        boxShadow: '0 12px 32px rgba(0,0,0,0.15)',
        border: `3px solid ${borderColor}`,
        overflow: 'hidden',
        position: 'relative',
      }}
    >
      {/* Foto de la persona (header) */}
      <Box
        sx={{
          width: '100%',
          height: { xs: 200, md: 220 },
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <Image
          src={photo}
          alt={altText}
          fill
          style={{
            objectFit: 'cover',
            objectPosition: 'center center',
          }}
        />
      </Box>

      {/* Contenido de la carta */}
      <CardContent sx={{ pt: 1, pb: 3, px: 3 }}>
        <Typography
          variant="h6"
          sx={{
            fontWeight: 800,
            textAlign: 'center',
            color: borderColor,
          }}
        >
          {title}
        </Typography>
        <Typography
          sx={{
            fontSize: { xs: '18px', md: '20px', lg: '22px' },
            lineHeight: 1.6,
            color: '#3e2723',
            textAlign: 'center',
            fontFamily: '"Caveat", cursive',
            mt: 1,
          }}
        >
          &ldquo;{message}&rdquo;
        </Typography>
      </CardContent>
    </Card>
  );
};
