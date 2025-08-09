'use client';
import { Box, Typography } from '@mui/material';
import { FC } from 'react';

interface SectionSeparatorProps {
  title: string;
  color?: string;
}

export const SectionSeparator: FC<SectionSeparatorProps> = ({
  title,
  color = '#BD9E24',
}) => {
  return (
    <>
      {/* Separador decorativo */}
      <Box
        sx={{
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          gap: 2,
          my: 4,
        }}
      >
        <Box
          sx={{
            flex: 1,
            height: '2px',
            background: `linear-gradient(90deg, transparent, ${color}, transparent)`,
          }}
        />
        <Box
          sx={{
            padding: '12px 24px',
            backgroundColor: color,
            borderRadius: 50,
            boxShadow: `0 4px 12px ${color}50`,
          }}
        >
          <Typography
            variant="body2"
            sx={{
              color: 'white',
              fontWeight: 600,
              letterSpacing: '2px',
              textTransform: 'uppercase',
              fontSize: '0.9rem',
            }}
          >
            {title}
          </Typography>
        </Box>
        <Box
          sx={{
            flex: 1,
            height: '2px',
            background: `linear-gradient(90deg, transparent, ${color}, transparent)`,
          }}
        />
      </Box>
    </>
  );
};
