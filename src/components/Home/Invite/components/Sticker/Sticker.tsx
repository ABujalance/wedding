'use client';
import { FC } from 'react';
import { Box } from '@mui/material';
import Image, { StaticImageData } from 'next/image';

interface StickerProps {
  icon: StaticImageData | string;
  href?: string;
  size?: number;
  rotation?: number;
  alt?: string;
}

export const Sticker: FC<StickerProps> = ({
  icon,
  href,
  size = 70,
  rotation = 0,
  alt = 'Sticker',
}) => {
  const Component = href ? 'a' : 'div';

  return (
    <Box
      component={Component}
      href={href}
      target={href ? '_blank' : undefined}
      rel={href ? 'noopener noreferrer' : undefined}
      sx={{
        position: 'relative',
        display: 'inline-block',
        cursor: href ? 'pointer' : 'default',
        textDecoration: 'none',
        transform: `rotate(${rotation}deg)`,
        transition: 'all 0.3s ease',

        // Animación de pulso solo en móvil
        '@media (max-width: 768px)': {
          animation: 'stickerPulse 2.5s infinite',
          '@keyframes stickerPulse': {
            '0%': {
              transform: `rotate(${rotation}deg) scale(1)`,
            },
            '50%': {
              transform: `rotate(${rotation}deg) scale(1.1)`,
            },
            '100%': {
              transform: `rotate(${rotation}deg) scale(1)`,
            },
          },
        },

        '&:hover': {
          // Solo efecto hover en desktop
          '@media (min-width: 769px)': {
            transform: `rotate(${rotation}deg) scale(1.3)`,
          },
        },
      }}
    >
      <Image
        src={icon}
        alt={alt}
        width={size}
        height={size}
        style={{
          display: 'block',
          filter: 'drop-shadow(rgba(0, 0, 0, 0.3) 2px 6px 2px)',
        }}
      />
    </Box>
  );
};
