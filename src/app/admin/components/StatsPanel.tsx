'use client';
import {
  Box,
  Card,
  CardContent,
  Grid,
  List,
  ListItem,
  ListItemText,
  Typography,
} from '@mui/material';
import { FC, useEffect, useState } from 'react';

interface Stats {
  totalGuests: number;
  confirmedGuests: number;
  pendingGuests: number;
  busCounts: Record<string, number>;
  dishCounts: Record<string, number>;
  allergies: Array<{ name: string; allergies: string }>;
  songsReported: Array<{ name: string; song: string }>;
  songCounts: Record<string, number>;
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
                Platos Elegidos (Solo Confirmados)
              </Typography>
              {Object.entries(stats.dishCounts).length > 0 ? (
                Object.entries(stats.dishCounts).map(([dish, count]) => (
                  <Box key={dish} sx={{ mb: 1 }}>
                    <Typography variant="body2">
                      {dish === 'marisco' ? 'Marisco' : 'Carne'}:{' '}
                      <strong>{count}</strong>
                    </Typography>
                  </Box>
                ))
              ) : (
                <Typography variant="body2" color="text.secondary">
                  No hay platos seleccionados aún
                </Typography>
              )}
              <Box sx={{ mt: 2, pt: 2, borderTop: '1px solid #eee' }}>
                <Typography variant="caption" color="text.secondary">
                  Total de platos:{' '}
                  {Object.values(stats.dishCounts).reduce(
                    (sum, count) => sum + count,
                    0,
                  )}
                </Typography>
              </Box>
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

        {/* Canciones reportadas */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Canciones Sugeridas ({stats.songsReported.length})
              </Typography>
              <List dense>
                {stats.songsReported.map((item, index) => (
                  <ListItem key={index}>
                    <ListItemText primary={item.name} secondary={item.song} />
                  </ListItem>
                ))}
              </List>
              <Box sx={{ mt: 2, pt: 2, borderTop: '1px solid #eee' }}>
                <Typography variant="caption" color="text.secondary">
                  Canciones sugeridas y número de veces:
                </Typography>
                <List dense>
                  {Object.entries(stats.songCounts).map(([song, count]) => (
                    <ListItem key={song}>
                      <ListItemText
                        primary={song}
                        secondary={`Veces sugerida: ${count}`}
                      />
                    </ListItem>
                  ))}
                </List>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};
