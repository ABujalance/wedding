'use client';
import { Box } from '@mui/material';
import { FC, useEffect, useMemo, useRef, useState } from 'react';

interface PhotoCarouselProps {
  images: { src: string; alt: string }[];
}

function shuffle<T>(arr: T[]): T[] {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

export const PhotoCarousel: FC<PhotoCarouselProps> = ({ images }) => {
  const [index, setIndex] = useState(0);
  const timeoutRef = useRef<number | undefined>(undefined);
  const randomized = useMemo(() => shuffle([...images]), [images]);

  useEffect(() => {
    timeoutRef.current = window.setTimeout(() => {
      setIndex((prev) => (prev + 1) % randomized.length);
    }, 3500);
    return () => clearTimeout(timeoutRef.current);
  }, [index, randomized.length]);

  return (
    <Box
      sx={{
        position: 'relative',
        width: '100%',
        height: { xs: 240, sm: 320, md: 420 },
        overflow: 'hidden',
        borderRadius: 2,
      }}
    >
      {/* Image slides */}
      {randomized.map((img, i) => (
        <Box
          key={img.src}
          component="img"
          src={img.src}
          alt={img.alt}
          sx={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            opacity: i === index ? 1 : 0,
            transition: 'opacity 800ms ease-in-out',
            filter: 'contrast(1.03) saturate(1.03)',
          }}
        />
      ))}
    </Box>
  );
};
