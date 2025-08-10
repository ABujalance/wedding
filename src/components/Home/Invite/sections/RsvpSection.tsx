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
  FormControl,
  InputLabel,
  Select,
  FormHelperText,
} from '@mui/material';
import { FC, useCallback, useEffect, useState } from 'react';
import { SectionSeparator } from '@/components/Home/Invite/components/SectionSeparator';
import { BusInfo } from '@/components/Home/Invite/BusInfo/BusInfo';

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
  const [validationErrors, setValidationErrors] = useState<
    Record<string, boolean>
  >({});
  const inviteId = invite.id;

  const submitAll = useCallback(async () => {
    // Validar que todos los huéspedes confirmados tengan plato seleccionado
    const errors: Record<string, boolean> = {};
    guests.forEach((guest) => {
      if (guest.confirmed && !guest.isChild && !guest.dish) {
        errors[guest.id] = true;
      }
    });

    if (Object.keys(errors).length > 0) {
      setValidationErrors(errors);
      return;
    }

    setValidationErrors({});
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
            song: g.song,
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
    // Limpiar error de validación cuando se selecciona un plato
    if (patch.dish) {
      setValidationErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[id];
        return newErrors;
      });
    }
  };

  return (
    <Stack gap={4} sx={{ width: '100%', maxWidth: '100%' }} id="rsvp-section">
      <SectionSeparator title="Confirmación" />

      {/* Información de buses */}
      <BusInfo guests={guests} />

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
                    <FormControl
                      sx={{ minWidth: 220, mt: 1 }}
                      error={validationErrors[g.id]}
                    >
                      <InputLabel id={`dish-label-${g.id}`}>
                        Plato principal
                      </InputLabel>
                      <Select
                        labelId={`dish-label-${g.id}`}
                        value={g.dish || ''}
                        label="Plato principal"
                        onChange={(e) =>
                          updateGuest(g.id, { dish: e.target.value as Dish })
                        }
                        displayEmpty
                      >
                        <MenuItem value="marisco">
                          Arroz con gambón austral (Marisco)
                        </MenuItem>
                        <MenuItem value="carne">
                          Arroz de rabo de toro (Carne)
                        </MenuItem>
                      </Select>
                      {validationErrors[g.id] && (
                        <FormHelperText>
                          Por favor selecciona un plato
                        </FormHelperText>
                      )}
                    </FormControl>
                  )}

                  <TextField
                    label="Alergias o intolerancias"
                    value={g.allergies || ''}
                    onChange={(e) =>
                      updateGuest(g.id, { allergies: e.target.value })
                    }
                    sx={{ minWidth: 220, mt: 1 }}
                  />

                  <TextField
                    label="Canción que no puede faltar"
                    placeholder="Canción - Artista"
                    value={g.song || ''}
                    onChange={(e) =>
                      updateGuest(g.id, { song: e.target.value })
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

      {/* Fecha límite con diseño más visible pero sutil */}
      <Box
        sx={{
          background: 'linear-gradient(135deg, #FFF3CD, #FCE4B6)',
          border: '2px solid #F0AD4E',
          borderRadius: 3,
          p: 3,
          textAlign: 'center',
          width: '100%',
          maxWidth: '100%',
          boxSizing: 'border-box',
          boxShadow: '0 4px 16px rgba(240, 173, 78, 0.2)',
          position: 'relative',
        }}
      >
        <Typography
          sx={{
            typography: { xs: 'body1', md: 'h6' },
            fontWeight: 600,
            color: '#8A6914',
            mb: 0.5,
          }}
        >
          ⚠️ Fecha límite para confirmar
        </Typography>
        <Typography
          sx={{
            typography: { xs: 'h6', md: 'h5' },
            fontWeight: 700,
            color: '#D58512',
          }}
        >
          14 de noviembre de 2025
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
