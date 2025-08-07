'use client';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Grid,
  List,
  ListItem,
  ListItemText,
  Chip,
  Stack,
} from '@mui/material';
import { FC, useEffect, useState } from 'react';

interface Stats {
  totalGuests: number;
  confirmedGuests: number;
  pendingGuests: number;
  busCounts: Record<string, number>;
  dishCounts: Record<string, number>;
  allergies: Array<{ name: string; allergies: string }>;
  recentlyUpdated: Array<{
    id: string;
    name: string;
    lastUpdate: string;
    confirmed: boolean;
  }>;
}

interface StatsPanelProps {
  adminTokenId: string;
}

export const StatsPanel: FC<StatsPanelProps> = ({ adminTokenId }) => {
  const [stats, setStats] = useState<Stats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await fetch('/api/admin/stats', {
          headers: {
            'x-admin-token': adminTokenId,
          },
        });

        if (response.ok) {
          const data = await response.json();
          setStats(data);
        } else {
          console.error('Error fetching stats');
        }
      } catch (error) {
        console.error('Error fetching stats:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, [adminTokenId]);

  if (loading) {
    return <Typography>Cargando estadísticas...</Typography>;
  }

  if (!stats) {
    return <Typography>Error cargando estadísticas</Typography>;
  }

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Typography variant="h4" gutterBottom>
        Información Útil
      </Typography>

      <Grid container spacing={3}>
        {/* Confirmaciones */}
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Confirmaciones
              </Typography>
              <Typography variant="h4" color="primary">
                {stats.confirmedGuests}/{stats.totalGuests}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {stats.pendingGuests} pendientes
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        {/* Buses */}
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Distribución de Buses
              </Typography>
              {Object.entries(stats.busCounts).map(([origin, count]) => (
                <Box key={origin} sx={{ mb: 1 }}>
                  <Typography variant="body2">
                    {origin}: <strong>{count}</strong>
                  </Typography>
                </Box>
              ))}
            </CardContent>
          </Card>
        </Grid>

        {/* Platos */}
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Platos Elegidos
              </Typography>
              {Object.entries(stats.dishCounts).map(([dish, count]) => (
                <Box key={dish} sx={{ mb: 1 }}>
                  <Typography variant="body2">
                    {dish === 'marisco' ? 'Marisco' : 'Carne'}:{' '}
                    <strong>{count}</strong>
                  </Typography>
                </Box>
              ))}
            </CardContent>
          </Card>
        </Grid>

        {/* Alergias */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Alergias Reportadas ({stats.allergies.length})
              </Typography>
              <List dense>
                {stats.allergies.map((item, index) => (
                  <ListItem key={index}>
                    <ListItemText
                      primary={item.name}
                      secondary={item.allergies}
                    />
                  </ListItem>
                ))}
              </List>
            </CardContent>
          </Card>
        </Grid>

        {/* Últimas actualizaciones */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Últimas Actualizaciones
              </Typography>
              <List dense>
                {stats.recentlyUpdated.map((guest) => (
                  <ListItem key={guest.id}>
                    <ListItemText
                      primary={
                        <Stack direction="row" spacing={1} alignItems="center">
                          <Typography variant="body2">{guest.name}</Typography>
                          <Chip
                            size="small"
                            label={guest.confirmed ? 'Confirmado' : 'Pendiente'}
                            color={guest.confirmed ? 'success' : 'default'}
                          />
                        </Stack>
                      }
                      secondary={new Date(guest.lastUpdate).toLocaleString()}
                    />
                  </ListItem>
                ))}
              </List>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};
