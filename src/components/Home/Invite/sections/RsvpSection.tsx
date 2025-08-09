'use client';
import { Guest, Dish } from '@/lib/firebase/guest';
import { Invite } from '@/lib/firebase/invites';
import {
  Box,
  Card,
  CardContent,
  Checkbox,
  Collapse,
  FormControlLabel,
  MenuItem,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import { FC, useCallback, useEffect, useState } from 'react';

interface RsvpSectionProps {
  invite: Invite;
  initialGuests: Guest[];
}

export const RsvpSection: FC<RsvpSectionProps> = ({
  invite,
  initialGuests,
}) => {
  const [guests, setGuests] = useState<Guest[]>(initialGuests);
  const [saving, setSaving] = useState(false);
  const [notes, setNotes] = useState(invite.notes || '');
  const inviteId = invite.id;

  const submitAll = useCallback(async () => {
    setSaving(true);
    try {
      const guestsRes = await fetch(`/api/invites/${inviteId}/guests`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          guests: guests.map((g) => ({
            id: g.id,
            confirmed: g.confirmed,
            allergies: g.allergies,
            dish: g.dish,
          })),
        }),
      });
      if (!guestsRes.ok) throw new Error('Error guardando invitados');

      const notesRes = await fetch(`/api/invites/${inviteId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ notes }),
      });
      if (!notesRes.ok) throw new Error('Error guardando notas');

      window.dispatchEvent(
        new CustomEvent('rsvp-submit-status', { detail: { ok: true } }),
      );
    } catch {
      window.dispatchEvent(
        new CustomEvent('rsvp-submit-status', { detail: { ok: false } }),
      );
    } finally {
      setSaving(false);
    }
  }, [inviteId, guests, notes]);

  useEffect(() => {
    const handler = () => submitAll();
    window.addEventListener('submit-rsvp', handler as EventListener);
    return () =>
      window.removeEventListener('submit-rsvp', handler as EventListener);
  }, [submitAll]);

  const updateGuest = (id: string, patch: Partial<Guest>) => {
    setGuests((prev) =>
      prev.map((g) => (g.id === id ? { ...g, ...patch } : g)),
    );
  };

  return (
    <Stack gap={4} sx={{ width: '100%', maxWidth: '100%' }} id="rsvp-section">
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
            background:
              'linear-gradient(90deg, transparent, #BD9E24, transparent)',
          }}
        />
        <Box
          sx={{
            padding: '12px 24px',
            backgroundColor: '#BD9E24',
            borderRadius: 50,
            boxShadow: '0 4px 12px rgba(189, 158, 36, 0.3)',
          }}
        >
          <Typography
            variant="body2"
            sx={{
              color: 'white',
              fontWeight: 600,
              letterSpacing: '2px',
              textTransform: 'uppercase',
              fontFamily: '"Limelight", serif',
              fontSize: '0.9rem',
            }}
          >
            Confirmación
          </Typography>
        </Box>
        <Box
          sx={{
            flex: 1,
            height: '2px',
            background:
              'linear-gradient(90deg, transparent, #BD9E24, transparent)',
          }}
        />
      </Box>

      <Typography
        variant="h3"
        component="h2"
        textAlign="center"
        sx={{
          typography: { xs: 'h4', md: 'h3' },
          fontFamily: '"Caveat", cursive',
          color: '#BD9E24',
          fontWeight: 700,
          mb: 2,
        }}
      >
        Confirmación de asistencia
      </Typography>

      <Stack gap={2} sx={{ width: '100%' }}>
        {guests.map((g) => (
          <Card
            key={g.id}
            sx={{
              width: '100%',
              transition: 'all 300ms ease-in-out',
            }}
          >
            <CardContent sx={{ py: 2, px: 2 }}>
              {/* Header siempre visible con nombre y checkbox ocupando toda la línea */}
              <Stack
                direction="row"
                alignItems="center"
                justifyContent="space-between"
                sx={{ width: '100%' }}
              >
                <Typography variant="h6">{g.fullName}</Typography>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={!!g.confirmed}
                      onChange={(e) =>
                        updateGuest(g.id, { confirmed: e.target.checked })
                      }
                    />
                  }
                  label="Asistiré"
                />
              </Stack>

              {/* Formulario que aparece con expansión hacia abajo */}
              <Collapse
                in={!!g.confirmed}
                orientation="vertical"
                timeout={300}
                unmountOnExit
              >
                <Stack
                  direction={{ xs: 'column', sm: 'row' }}
                  gap={2}
                  alignItems="flex-start"
                  sx={{ mt: 2, width: '100%' }}
                >
                  {g.isChild ? (
                    <Typography variant="body2" sx={{ mt: 1 }}>
                      Menú infantil asignado
                    </Typography>
                  ) : (
                    <TextField
                      select
                      label="Plato principal"
                      value={g.dish || ''}
                      onChange={(e) =>
                        updateGuest(g.id, { dish: e.target.value as Dish })
                      }
                      sx={{ minWidth: 220, mt: 1 }}
                    >
                      <MenuItem value="marisco">
                        Arroz con gambón austral (Marisco)
                      </MenuItem>
                      <MenuItem value="carne">
                        Arroz de rabo de toro (Carne)
                      </MenuItem>
                    </TextField>
                  )}

                  <TextField
                    label="Alergias"
                    value={g.allergies || ''}
                    onChange={(e) =>
                      updateGuest(g.id, { allergies: e.target.value })
                    }
                    sx={{ minWidth: 220, mt: 1 }}
                  />
                </Stack>
              </Collapse>
            </CardContent>
          </Card>
        ))}
      </Stack>

      <Card sx={{ width: '100%', maxWidth: '100%' }}>
        <CardContent>
          <Stack gap={1}>
            <Typography variant="h6">Comentarios adicionales</Typography>
            <TextField
              multiline
              minRows={3}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="¿Algo que debamos saber?"
              fullWidth
            />
          </Stack>
        </CardContent>
      </Card>

      <Box
        sx={{
          bgcolor: 'rgba(189, 158, 36, 0.08)',
          border: '1px solid rgba(189, 158, 36, 0.5)',
          borderRadius: 2,
          p: { xs: 1.5, sm: 2 },
          textAlign: 'center',
          width: '100%',
          maxWidth: '100%',
          boxSizing: 'border-box',
        }}
      >
        <Typography
          sx={{
            typography: 'h6',
            fontWeight: 600,
            color: '#8B6B1A',
            wordBreak: 'break-word',
            hyphens: 'auto',
          }}
        >
          Fecha límite para confirmar: 14 de noviembre de 2025
        </Typography>
      </Box>

      {saving && (
        <Box>
          <Typography variant="body2">Guardando...</Typography>
        </Box>
      )}
    </Stack>
  );
};
