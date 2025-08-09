'use client';
import { Fab, Zoom, Typography } from '@mui/material';
import EditNoteIcon from '@mui/icons-material/EditNote';
import { FC, useEffect, useState } from 'react';

export const FloatingRsvpButton: FC = () => {
  const [visible, setVisible] = useState(true);
  const [hasScrolled, setHasScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;

      // Si el usuario ha hecho scroll manualmente (más de 100px), ocultar el botón
      if (scrollTop > 100 && !hasScrolled) {
        setHasScrolled(true);
        setVisible(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [hasScrolled]);

  const scrollToRsvp = () => {
    const rsvpSection = document.getElementById('rsvp-section');
    if (rsvpSection) {
      // Scroll suave y relativamente rápido pero no instantáneo
      rsvpSection.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });

      // Ocultar el botón después del click
      setTimeout(() => {
        setVisible(false);
      }, 800);
    }
  };

  return (
    <Zoom in={visible}>
      <Fab
        variant="extended"
        color="primary"
        aria-label="ir a confirmación"
        onClick={scrollToRsvp}
        sx={{
          position: 'fixed',
          bottom: 32,
          right: 32,
          zIndex: 1000,
          backgroundColor: '#BD9E24',
          boxShadow: '0 8px 24px rgba(189, 158, 36, 0.4)',
          '&:hover': {
            backgroundColor: '#9A7D1E',
            boxShadow: '0 12px 32px rgba(189, 158, 36, 0.6)',
            transform: 'scale(1.05)',
          },
          transition: 'all 0.3s ease',
          fontFamily: '"Caveat", cursive',
          fontSize: '1.1rem',
          fontWeight: 600,
          textTransform: 'none',
          px: 3,
        }}
      >
        <EditNoteIcon sx={{ color: 'white', mr: 1 }} />
        <Typography
          sx={{
            color: 'white',
            fontFamily: '"Caveat", cursive',
            fontSize: '1.1rem',
            fontWeight: 600,
          }}
        >
          Confirmar asistencia
        </Typography>
      </Fab>
    </Zoom>
  );
};
