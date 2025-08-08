'use client';
import { Button, Stack, Typography } from '@mui/material';
import { FC, useEffect, useState } from 'react';

export const ConfirmButtonSection: FC = () => {
  const [status, setStatus] = useState<'idle' | 'ok' | 'error'>('idle');

  useEffect(() => {
    const handler = (e: Event) => {
      const detail = (e as CustomEvent).detail as { ok: boolean };
      setStatus(detail?.ok ? 'ok' : 'error');
    };
    window.addEventListener('rsvp-submit-status', handler as EventListener);
    return () =>
      window.removeEventListener(
        'rsvp-submit-status',
        handler as EventListener,
      );
  }, []);

  const fireSubmit = () => {
    setStatus('idle');
    window.dispatchEvent(new Event('submit-rsvp'));
  };

  return (
    <Stack alignItems="center" gap={2}>
      {status === 'ok' && (
        <Typography
          role="status"
          aria-live="polite"
          variant="subtitle1"
          sx={{
            color: '#1B5E20', // dark green
            textAlign: 'center',
            letterSpacing: 0.2,
          }}
        >
          Confirmación enviada correctamente
        </Typography>
      )}
      {status === 'error' && (
        <Typography
          role="status"
          aria-live="polite"
          variant="subtitle1"
          sx={{
            color: '#7F1D1D', // dark red
            textAlign: 'center',
            letterSpacing: 0.2,
          }}
        >
          Ha ocurrido un error. Inténtalo de nuevo más tarde
        </Typography>
      )}
      <Button variant="contained" color="primary" onClick={fireSubmit}>
        Enviar confirmación
      </Button>
    </Stack>
  );
};
