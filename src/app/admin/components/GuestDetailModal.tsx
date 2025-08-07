'use client';
import { Guest } from '@/lib/firebase/guest';
import {
  Box,
  Typography,
  Card,
  CardContent,
  Grid,
  Chip,
  Stack,
  Divider,
} from '@mui/material';
import { FC } from 'react';

interface GuestDetailModalProps {
  guest: Guest;
  adminTokenId: string;
  onClose: () => void;
}

export const GuestDetailModal: FC<GuestDetailModalProps> = ({ guest }) => {
  return (
    <Box sx={{ p: 2 }}>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Información Personal
              </Typography>
              <Stack spacing={2}>
                <Box>
                  <Typography variant="subtitle2" color="text.secondary">
                    Nombre Completo
                  </Typography>
                  <Typography variant="body1">{guest.fullName}</Typography>
                </Box>

                <Box>
                  <Typography variant="subtitle2" color="text.secondary">
                    Tipo de Invitado
                  </Typography>
                  <Chip
                    label={guest.isChild ? 'Niño' : 'Adulto'}
                    color={guest.isChild ? 'secondary' : 'primary'}
                    size="small"
                  />
                </Box>

                <Box>
                  <Typography variant="subtitle2" color="text.secondary">
                    Estado de Confirmación
                  </Typography>
                  <Chip
                    label={guest.confirmed ? 'Confirmado' : 'Pendiente'}
                    color={guest.confirmed ? 'success' : 'warning'}
                    size="small"
                  />
                </Box>
              </Stack>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Preferencias
              </Typography>
              <Stack spacing={2}>
                {guest.dish && (
                  <Box>
                    <Typography variant="subtitle2" color="text.secondary">
                      Plato Elegido
                    </Typography>
                    <Chip
                      label={guest.dish === 'marisco' ? 'Marisco' : 'Carne'}
                      color="info"
                      size="small"
                    />
                  </Box>
                )}

                {guest.busOrigin && (
                  <Box>
                    <Typography variant="subtitle2" color="text.secondary">
                      Bus desde
                    </Typography>
                    <Typography variant="body1">{guest.busOrigin}</Typography>
                  </Box>
                )}

                {guest.allergies && (
                  <Box>
                    <Typography variant="subtitle2" color="text.secondary">
                      Alergias
                    </Typography>
                    <Typography variant="body1" color="error">
                      {guest.allergies}
                    </Typography>
                  </Box>
                )}
              </Stack>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Información del Sistema
              </Typography>
              <Divider sx={{ my: 2 }} />
              <Grid container spacing={2}>
                <Grid item xs={12} md={4}>
                  <Typography variant="subtitle2" color="text.secondary">
                    ID del Invitado
                  </Typography>
                  <Typography variant="body2" fontFamily="monospace">
                    {guest.id}
                  </Typography>
                </Grid>
                <Grid item xs={12} md={4}>
                  <Typography variant="subtitle2" color="text.secondary">
                    ID de la Invitación
                  </Typography>
                  <Typography variant="body2" fontFamily="monospace">
                    {guest.inviteId}
                  </Typography>
                </Grid>
                <Grid item xs={12} md={4}>
                  <Typography variant="subtitle2" color="text.secondary">
                    Última Actualización
                  </Typography>
                  <Typography variant="body2">
                    {guest.lastUpdate.toLocaleString()}
                  </Typography>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};
