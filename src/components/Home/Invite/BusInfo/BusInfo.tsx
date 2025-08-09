import { BusOrigin, Guest } from '@/lib/firebase/guest';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import DirectionsBusIcon from '@mui/icons-material/DirectionsBus';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import {
  Box,
  Card,
  CardContent,
  Grid2,
  Stack,
  Typography,
} from '@mui/material';
import { FC } from 'react';

type BusInfoProps = { guests: Guest[] };

const initialBusPlaces: Record<BusOrigin, number> = {
  Huelva: 0,
  Lucena: 0,
  Sevilla: 0,
};

const busDetails: Record<
  BusOrigin,
  {
    departureTime: string;
    returnTimes: string[];
    pickupLocation: string;
  }
> = {
  Sevilla: {
    departureTime: '11:15',
    returnTimes: ['20:00', '23:30'],
    pickupLocation: 'Por determinar',
  },
  Lucena: {
    departureTime: '10:00',
    returnTimes: ['23:30'],
    pickupLocation: 'Por determinar',
  },
  Huelva: {
    departureTime: '10:30',
    returnTimes: ['23:30'],
    pickupLocation: 'Por determinar',
  },
};

export const BusInfo: FC<BusInfoProps> = ({ guests }) => {
  const busPlaces = getBusPlacesMap(guests);
  const totalBuses = Object.values(busPlaces).reduce(
    (acc, place) => acc + place,
    0,
  );

  if (totalBuses === 0) {
    return null;
  }

  return (
    <Stack gap={3}>
      <Grid2 container spacing={3} justifyContent="center">
        {Object.entries(busPlaces).map(([origin, count]) => {
          if (count === 0) return null;

          const busInfo = busDetails[origin as BusOrigin];

          return (
            <Grid2 size={{ xs: 12, sm: 6, lg: 6 }} key={origin}>
              <Box
                sx={{
                  height: '100%',
                  minHeight: 320,
                  maxWidth: 300,
                  margin: '0 auto',
                  position: 'relative',
                  // Sombra del ticket completo SIN máscara
                  '&::before': {
                    content: '""',
                    position: 'absolute',
                    top: 4,
                    left: 4,
                    right: -4,
                    bottom: -4,
                    background: 'rgba(0, 0, 0, 0.12)',
                    borderRadius: 2,
                    zIndex: 0,
                    display: { xs: 'none', sm: 'block' },
                    // Máscara para la sombra
                    mask: `
                      radial-gradient(circle 18px at 0px 80%, transparent 17px, black 18px),
                      radial-gradient(circle 18px at 100% 80%, transparent 17px, black 18px),
                      radial-gradient(circle 1.5px at 5% 80%, transparent 1px, black 1.5px),
                      radial-gradient(circle 1.5px at 7% 80%, transparent 1px, black 1.5px),
                      radial-gradient(circle 1.5px at 9% 80%, transparent 1px, black 1.5px),
                      radial-gradient(circle 1.5px at 11% 80%, transparent 1px, black 1.5px),
                      radial-gradient(circle 1.5px at 13% 80%, transparent 1px, black 1.5px),
                      radial-gradient(circle 1.5px at 15% 80%, transparent 1px, black 1.5px),
                      radial-gradient(circle 1.5px at 17% 80%, transparent 1px, black 1.5px),
                      radial-gradient(circle 1.5px at 19% 80%, transparent 1px, black 1.5px),
                      radial-gradient(circle 1.5px at 21% 80%, transparent 1px, black 1.5px),
                      radial-gradient(circle 1.5px at 23% 80%, transparent 1px, black 1.5px),
                      radial-gradient(circle 1.5px at 25% 80%, transparent 1px, black 1.5px),
                      radial-gradient(circle 1.5px at 27% 80%, transparent 1px, black 1.5px),
                      radial-gradient(circle 1.5px at 29% 80%, transparent 1px, black 1.5px),
                      radial-gradient(circle 1.5px at 31% 80%, transparent 1px, black 1.5px),
                      radial-gradient(circle 1.5px at 33% 80%, transparent 1px, black 1.5px),
                      radial-gradient(circle 1.5px at 35% 80%, transparent 1px, black 1.5px),
                      radial-gradient(circle 1.5px at 37% 80%, transparent 1px, black 1.5px),
                      radial-gradient(circle 1.5px at 39% 80%, transparent 1px, black 1.5px),
                      radial-gradient(circle 1.5px at 41% 80%, transparent 1px, black 1.5px),
                      radial-gradient(circle 1.5px at 43% 80%, transparent 1px, black 1.5px),
                      radial-gradient(circle 1.5px at 45% 80%, transparent 1px, black 1.5px),
                      radial-gradient(circle 1.5px at 47% 80%, transparent 1px, black 1.5px),
                      radial-gradient(circle 1.5px at 49% 80%, transparent 1px, black 1.5px),
                      radial-gradient(circle 1.5px at 51% 80%, transparent 1px, black 1.5px),
                      radial-gradient(circle 1.5px at 53% 80%, transparent 1px, black 1.5px),
                      radial-gradient(circle 1.5px at 55% 80%, transparent 1px, black 1.5px),
                      radial-gradient(circle 1.5px at 57% 80%, transparent 1px, black 1.5px),
                      radial-gradient(circle 1.5px at 59% 80%, transparent 1px, black 1.5px),
                      radial-gradient(circle 1.5px at 61% 80%, transparent 1px, black 1.5px),
                      radial-gradient(circle 1.5px at 63% 80%, transparent 1px, black 1.5px),
                      radial-gradient(circle 1.5px at 65% 80%, transparent 1px, black 1.5px),
                      radial-gradient(circle 1.5px at 67% 80%, transparent 1px, black 1.5px),
                      radial-gradient(circle 1.5px at 69% 80%, transparent 1px, black 1.5px),
                      radial-gradient(circle 1.5px at 71% 80%, transparent 1px, black 1.5px),
                      radial-gradient(circle 1.5px at 73% 80%, transparent 1px, black 1.5px),
                      radial-gradient(circle 1.5px at 75% 80%, transparent 1px, black 1.5px),
                      radial-gradient(circle 1.5px at 77% 80%, transparent 1px, black 1.5px),
                      radial-gradient(circle 1.5px at 79% 80%, transparent 1px, black 1.5px),
                      radial-gradient(circle 1.5px at 81% 80%, transparent 1px, black 1.5px),
                      radial-gradient(circle 1.5px at 83% 80%, transparent 1px, black 1.5px),
                      radial-gradient(circle 1.5px at 85% 80%, transparent 1px, black 1.5px),
                      radial-gradient(circle 1.5px at 87% 80%, transparent 1px, black 1.5px),
                      radial-gradient(circle 1.5px at 89% 80%, transparent 1px, black 1.5px),
                      radial-gradient(circle 1.5px at 91% 80%, transparent 1px, black 1.5px),
                      radial-gradient(circle 1.5px at 93% 80%, transparent 1px, black 1.5px),
                      radial-gradient(circle 1.5px at 95% 80%, transparent 1px, black 1.5px),
                      linear-gradient(black, black)
                    `,
                    WebkitMask: `
                      radial-gradient(circle 18px at 0px 80%, transparent 17px, black 18px),
                      radial-gradient(circle 18px at 100% 80%, transparent 17px, black 18px),
                      radial-gradient(circle 1.5px at 5% 80%, transparent 1px, black 1.5px),
                      radial-gradient(circle 1.5px at 7% 80%, transparent 1px, black 1.5px),
                      radial-gradient(circle 1.5px at 9% 80%, transparent 1px, black 1.5px),
                      radial-gradient(circle 1.5px at 11% 80%, transparent 1px, black 1.5px),
                      radial-gradient(circle 1.5px at 13% 80%, transparent 1px, black 1.5px),
                      radial-gradient(circle 1.5px at 15% 80%, transparent 1px, black 1.5px),
                      radial-gradient(circle 1.5px at 17% 80%, transparent 1px, black 1.5px),
                      radial-gradient(circle 1.5px at 19% 80%, transparent 1px, black 1.5px),
                      radial-gradient(circle 1.5px at 21% 80%, transparent 1px, black 1.5px),
                      radial-gradient(circle 1.5px at 23% 80%, transparent 1px, black 1.5px),
                      radial-gradient(circle 1.5px at 25% 80%, transparent 1px, black 1.5px),
                      radial-gradient(circle 1.5px at 27% 80%, transparent 1px, black 1.5px),
                      radial-gradient(circle 1.5px at 29% 80%, transparent 1px, black 1.5px),
                      radial-gradient(circle 1.5px at 31% 80%, transparent 1px, black 1.5px),
                      radial-gradient(circle 1.5px at 33% 80%, transparent 1px, black 1.5px),
                      radial-gradient(circle 1.5px at 35% 80%, transparent 1px, black 1.5px),
                      radial-gradient(circle 1.5px at 37% 80%, transparent 1px, black 1.5px),
                      radial-gradient(circle 1.5px at 39% 80%, transparent 1px, black 1.5px),
                      radial-gradient(circle 1.5px at 41% 80%, transparent 1px, black 1.5px),
                      radial-gradient(circle 1.5px at 43% 80%, transparent 1px, black 1.5px),
                      radial-gradient(circle 1.5px at 45% 80%, transparent 1px, black 1.5px),
                      radial-gradient(circle 1.5px at 47% 80%, transparent 1px, black 1.5px),
                      radial-gradient(circle 1.5px at 49% 80%, transparent 1px, black 1.5px),
                      radial-gradient(circle 1.5px at 51% 80%, transparent 1px, black 1.5px),
                      radial-gradient(circle 1.5px at 53% 80%, transparent 1px, black 1.5px),
                      radial-gradient(circle 1.5px at 55% 80%, transparent 1px, black 1.5px),
                      radial-gradient(circle 1.5px at 57% 80%, transparent 1px, black 1.5px),
                      radial-gradient(circle 1.5px at 59% 80%, transparent 1px, black 1.5px),
                      radial-gradient(circle 1.5px at 61% 80%, transparent 1px, black 1.5px),
                      radial-gradient(circle 1.5px at 63% 80%, transparent 1px, black 1.5px),
                      radial-gradient(circle 1.5px at 65% 80%, transparent 1px, black 1.5px),
                      radial-gradient(circle 1.5px at 67% 80%, transparent 1px, black 1.5px),
                      radial-gradient(circle 1.5px at 69% 80%, transparent 1px, black 1.5px),
                      radial-gradient(circle 1.5px at 71% 80%, transparent 1px, black 1.5px),
                      radial-gradient(circle 1.5px at 73% 80%, transparent 1px, black 1.5px),
                      radial-gradient(circle 1.5px at 75% 80%, transparent 1px, black 1.5px),
                      radial-gradient(circle 1.5px at 77% 80%, transparent 1px, black 1.5px),
                      radial-gradient(circle 1.5px at 79% 80%, transparent 1px, black 1.5px),
                      radial-gradient(circle 1.5px at 81% 80%, transparent 1px, black 1.5px),
                      radial-gradient(circle 1.5px at 83% 80%, transparent 1px, black 1.5px),
                      radial-gradient(circle 1.5px at 85% 80%, transparent 1px, black 1.5px),
                      radial-gradient(circle 1.5px at 87% 80%, transparent 1px, black 1.5px),
                      radial-gradient(circle 1.5px at 89% 80%, transparent 1px, black 1.5px),
                      radial-gradient(circle 1.5px at 91% 80%, transparent 1px, black 1.5px),
                      radial-gradient(circle 1.5px at 93% 80%, transparent 1px, black 1.5px),
                      radial-gradient(circle 1.5px at 95% 80%, transparent 1px, black 1.5px),
                      linear-gradient(black, black)
                    `,
                    maskComposite: 'intersect',
                    WebkitMaskComposite: 'source-in',
                  },
                }}
              >
                <Card
                  sx={{
                    height: '100%',
                    background: '#F4E4BC',
                    color: '#3E2723',
                    borderRadius: 2,
                    position: 'relative',
                    fontFamily: '"Limelight", serif',
                    display: 'flex',
                    flexDirection: 'column',
                    zIndex: 1,
                    // Sombra en móvil combinada con máscara, sombra de pseudo-elemento en desktop
                    boxShadow: {
                      xs: '0 12px 24px rgba(0, 0, 0, 0.15), 0 6px 12px rgba(0, 0, 0, 0.1)',
                      sm: 'none',
                    },
                    // Máscara con círculos laterales y puntos centrales para crear agujeros
                    mask: `
                      radial-gradient(circle 18px at 0px 80%, transparent 17px, black 18px),
                      radial-gradient(circle 18px at 100% 80%, transparent 17px, black 18px),
                      radial-gradient(circle 1.5px at 5% 80%, transparent 1px, black 1.5px),
                      radial-gradient(circle 1.5px at 7% 80%, transparent 1px, black 1.5px),
                      radial-gradient(circle 1.5px at 9% 80%, transparent 1px, black 1.5px),
                      radial-gradient(circle 1.5px at 11% 80%, transparent 1px, black 1.5px),
                      radial-gradient(circle 1.5px at 13% 80%, transparent 1px, black 1.5px),
                      radial-gradient(circle 1.5px at 15% 80%, transparent 1px, black 1.5px),
                      radial-gradient(circle 1.5px at 17% 80%, transparent 1px, black 1.5px),
                      radial-gradient(circle 1.5px at 19% 80%, transparent 1px, black 1.5px),
                      radial-gradient(circle 1.5px at 21% 80%, transparent 1px, black 1.5px),
                      radial-gradient(circle 1.5px at 23% 80%, transparent 1px, black 1.5px),
                      radial-gradient(circle 1.5px at 25% 80%, transparent 1px, black 1.5px),
                      radial-gradient(circle 1.5px at 27% 80%, transparent 1px, black 1.5px),
                      radial-gradient(circle 1.5px at 29% 80%, transparent 1px, black 1.5px),
                      radial-gradient(circle 1.5px at 31% 80%, transparent 1px, black 1.5px),
                      radial-gradient(circle 1.5px at 33% 80%, transparent 1px, black 1.5px),
                      radial-gradient(circle 1.5px at 35% 80%, transparent 1px, black 1.5px),
                      radial-gradient(circle 1.5px at 37% 80%, transparent 1px, black 1.5px),
                      radial-gradient(circle 1.5px at 39% 80%, transparent 1px, black 1.5px),
                      radial-gradient(circle 1.5px at 41% 80%, transparent 1px, black 1.5px),
                      radial-gradient(circle 1.5px at 43% 80%, transparent 1px, black 1.5px),
                      radial-gradient(circle 1.5px at 45% 80%, transparent 1px, black 1.5px),
                      radial-gradient(circle 1.5px at 47% 80%, transparent 1px, black 1.5px),
                      radial-gradient(circle 1.5px at 49% 80%, transparent 1px, black 1.5px),
                      radial-gradient(circle 1.5px at 51% 80%, transparent 1px, black 1.5px),
                      radial-gradient(circle 1.5px at 53% 80%, transparent 1px, black 1.5px),
                      radial-gradient(circle 1.5px at 55% 80%, transparent 1px, black 1.5px),
                      radial-gradient(circle 1.5px at 57% 80%, transparent 1px, black 1.5px),
                      radial-gradient(circle 1.5px at 59% 80%, transparent 1px, black 1.5px),
                      radial-gradient(circle 1.5px at 61% 80%, transparent 1px, black 1.5px),
                      radial-gradient(circle 1.5px at 63% 80%, transparent 1px, black 1.5px),
                      radial-gradient(circle 1.5px at 65% 80%, transparent 1px, black 1.5px),
                      radial-gradient(circle 1.5px at 67% 80%, transparent 1px, black 1.5px),
                      radial-gradient(circle 1.5px at 69% 80%, transparent 1px, black 1.5px),
                      radial-gradient(circle 1.5px at 71% 80%, transparent 1px, black 1.5px),
                      radial-gradient(circle 1.5px at 73% 80%, transparent 1px, black 1.5px),
                      radial-gradient(circle 1.5px at 75% 80%, transparent 1px, black 1.5px),
                      radial-gradient(circle 1.5px at 77% 80%, transparent 1px, black 1.5px),
                      radial-gradient(circle 1.5px at 79% 80%, transparent 1px, black 1.5px),
                      radial-gradient(circle 1.5px at 81% 80%, transparent 1px, black 1.5px),
                      radial-gradient(circle 1.5px at 83% 80%, transparent 1px, black 1.5px),
                      radial-gradient(circle 1.5px at 85% 80%, transparent 1px, black 1.5px),
                      radial-gradient(circle 1.5px at 87% 80%, transparent 1px, black 1.5px),
                      radial-gradient(circle 1.5px at 89% 80%, transparent 1px, black 1.5px),
                      radial-gradient(circle 1.5px at 91% 80%, transparent 1px, black 1.5px),
                      radial-gradient(circle 1.5px at 93% 80%, transparent 1px, black 1.5px),
                      radial-gradient(circle 1.5px at 95% 80%, transparent 1px, black 1.5px),
                      linear-gradient(black, black)
                    `,
                    WebkitMask: `
                      radial-gradient(circle 18px at 0px 80%, transparent 17px, black 18px),
                      radial-gradient(circle 18px at 100% 80%, transparent 17px, black 18px),
                      radial-gradient(circle 1.5px at 5% 80%, transparent 1px, black 1.5px),
                      radial-gradient(circle 1.5px at 7% 80%, transparent 1px, black 1.5px),
                      radial-gradient(circle 1.5px at 9% 80%, transparent 1px, black 1.5px),
                      radial-gradient(circle 1.5px at 11% 80%, transparent 1px, black 1.5px),
                      radial-gradient(circle 1.5px at 13% 80%, transparent 1px, black 1.5px),
                      radial-gradient(circle 1.5px at 15% 80%, transparent 1px, black 1.5px),
                      radial-gradient(circle 1.5px at 17% 80%, transparent 1px, black 1.5px),
                      radial-gradient(circle 1.5px at 19% 80%, transparent 1px, black 1.5px),
                      radial-gradient(circle 1.5px at 21% 80%, transparent 1px, black 1.5px),
                      radial-gradient(circle 1.5px at 23% 80%, transparent 1px, black 1.5px),
                      radial-gradient(circle 1.5px at 25% 80%, transparent 1px, black 1.5px),
                      radial-gradient(circle 1.5px at 27% 80%, transparent 1px, black 1.5px),
                      radial-gradient(circle 1.5px at 29% 80%, transparent 1px, black 1.5px),
                      radial-gradient(circle 1.5px at 31% 80%, transparent 1px, black 1.5px),
                      radial-gradient(circle 1.5px at 33% 80%, transparent 1px, black 1.5px),
                      radial-gradient(circle 1.5px at 35% 80%, transparent 1px, black 1.5px),
                      radial-gradient(circle 1.5px at 37% 80%, transparent 1px, black 1.5px),
                      radial-gradient(circle 1.5px at 39% 80%, transparent 1px, black 1.5px),
                      radial-gradient(circle 1.5px at 41% 80%, transparent 1px, black 1.5px),
                      radial-gradient(circle 1.5px at 43% 80%, transparent 1px, black 1.5px),
                      radial-gradient(circle 1.5px at 45% 80%, transparent 1px, black 1.5px),
                      radial-gradient(circle 1.5px at 47% 80%, transparent 1px, black 1.5px),
                      radial-gradient(circle 1.5px at 49% 80%, transparent 1px, black 1.5px),
                      radial-gradient(circle 1.5px at 51% 80%, transparent 1px, black 1.5px),
                      radial-gradient(circle 1.5px at 53% 80%, transparent 1px, black 1.5px),
                      radial-gradient(circle 1.5px at 55% 80%, transparent 1px, black 1.5px),
                      radial-gradient(circle 1.5px at 57% 80%, transparent 1px, black 1.5px),
                      radial-gradient(circle 1.5px at 59% 80%, transparent 1px, black 1.5px),
                      radial-gradient(circle 1.5px at 61% 80%, transparent 1px, black 1.5px),
                      radial-gradient(circle 1.5px at 63% 80%, transparent 1px, black 1.5px),
                      radial-gradient(circle 1.5px at 65% 80%, transparent 1px, black 1.5px),
                      radial-gradient(circle 1.5px at 67% 80%, transparent 1px, black 1.5px),
                      radial-gradient(circle 1.5px at 69% 80%, transparent 1px, black 1.5px),
                      radial-gradient(circle 1.5px at 71% 80%, transparent 1px, black 1.5px),
                      radial-gradient(circle 1.5px at 73% 80%, transparent 1px, black 1.5px),
                      radial-gradient(circle 1.5px at 75% 80%, transparent 1px, black 1.5px),
                      radial-gradient(circle 1.5px at 77% 80%, transparent 1px, black 1.5px),
                      radial-gradient(circle 1.5px at 79% 80%, transparent 1px, black 1.5px),
                      radial-gradient(circle 1.5px at 81% 80%, transparent 1px, black 1.5px),
                      radial-gradient(circle 1.5px at 83% 80%, transparent 1px, black 1.5px),
                      radial-gradient(circle 1.5px at 85% 80%, transparent 1px, black 1.5px),
                      radial-gradient(circle 1.5px at 87% 80%, transparent 1px, black 1.5px),
                      radial-gradient(circle 1.5px at 89% 80%, transparent 1px, black 1.5px),
                      radial-gradient(circle 1.5px at 91% 80%, transparent 1px, black 1.5px),
                      radial-gradient(circle 1.5px at 93% 80%, transparent 1px, black 1.5px),
                      radial-gradient(circle 1.5px at 95% 80%, transparent 1px, black 1.5px),
                      linear-gradient(black, black)
                    `,
                    maskComposite: 'intersect',
                    WebkitMaskComposite: 'source-in',
                  }}
                >
                  <CardContent
                    sx={{
                      p: 0,
                      fontFamily: '"Limelight", serif',
                      flex: 1,
                      display: 'flex',
                      flexDirection: 'column',
                      height: '100%',
                      position: 'relative',
                      zIndex: 1,
                    }}
                  >
                    {/* PARTE SUPERIOR DEL TICKET - Información del viaje */}
                    <Box
                      sx={{
                        flex: '0 0 80%',
                        display: 'flex',
                        flexDirection: 'column',
                      }}
                    >
                      {/* Header del ticket */}
                      <Box
                        sx={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: 1,
                          backgroundColor: '#3E2723',
                          p: 2,
                          borderRadius: '8px 8px 0 0',
                        }}
                      >
                        <DirectionsBusIcon
                          sx={{ fontSize: 20, color: 'white' }}
                        />
                        <Typography
                          variant="body1"
                          fontWeight={400}
                          sx={{
                            fontFamily: '"Limelight", serif',
                            color: 'white',
                            fontSize: '1rem',
                          }}
                        >
                          BILLETE DE AUTOBÚS
                        </Typography>
                      </Box>

                      {/* Origen y Destino */}
                      <Box sx={{ mb: 2, px: 3, pt: 2 }}>
                        <Box sx={{ mb: 1 }}>
                          <Typography
                            variant="caption"
                            sx={{
                              color: '#5D4037',
                              fontFamily: '"Limelight", serif',
                              letterSpacing: 1,
                              fontSize: '0.7rem',
                            }}
                          >
                            ORIGEN
                          </Typography>
                          <Typography
                            variant="body1"
                            fontWeight={400}
                            sx={{
                              fontFamily: '"Limelight", serif',
                              color: '#3E2723',
                              fontSize: '1.1rem',
                            }}
                          >
                            {origin}
                          </Typography>
                        </Box>
                        <Box sx={{ mb: 1 }}>
                          <Typography
                            variant="caption"
                            sx={{
                              color: '#5D4037',
                              fontFamily: '"Limelight", serif',
                              letterSpacing: 1,
                              fontSize: '0.7rem',
                            }}
                          >
                            DESTINO
                          </Typography>
                          <Typography
                            variant="body1"
                            fontWeight={400}
                            sx={{
                              fontFamily: '"Limelight", serif',
                              color: '#3E2723',
                              fontSize: '1.1rem',
                            }}
                          >
                            Hacienda
                          </Typography>
                        </Box>
                      </Box>

                      {/* Información de horarios */}
                      <Box sx={{ flex: 1, px: 3, pb: 2 }}>
                        <Box
                          sx={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: 1,
                            mb: 1,
                          }}
                        >
                          <AccessTimeIcon
                            sx={{ fontSize: 14, color: '#5D4037' }}
                          />
                          <Typography
                            variant="body2"
                            fontWeight={400}
                            sx={{
                              fontFamily: '"Limelight", serif',
                              color: '#3E2723',
                              fontSize: '0.85rem',
                            }}
                          >
                            Salida: {busInfo.departureTime}
                          </Typography>
                        </Box>
                        <Box
                          sx={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: 1,
                            mb: 1,
                          }}
                        >
                          <AccessTimeIcon
                            sx={{ fontSize: 14, color: '#5D4037' }}
                          />
                          <Typography
                            variant="body2"
                            fontWeight={400}
                            sx={{
                              fontFamily: '"Limelight", serif',
                              color: '#3E2723',
                              fontSize: '0.85rem',
                            }}
                          >
                            Vuelta: {busInfo.returnTimes.join(' y ')}
                          </Typography>
                        </Box>
                        <Box
                          sx={{ display: 'flex', alignItems: 'center', gap: 1 }}
                        >
                          <LocationOnIcon
                            sx={{ fontSize: 14, color: '#5D4037' }}
                          />
                          <Typography
                            variant="body2"
                            sx={{
                              fontFamily: '"Limelight", serif',
                              color: '#3E2723',
                              fontSize: '0.85rem',
                            }}
                          >
                            {busInfo.pickupLocation}
                          </Typography>
                        </Box>
                      </Box>
                    </Box>

                    {/* PARTE INFERIOR DEL TICKET - Solo número de plazas */}
                    <Box
                      sx={{
                        flex: '0 0 20%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: 2,
                        px: 3,
                        py: 2,
                      }}
                    >
                      <Box
                        sx={{
                          display: 'flex',
                          flexDirection: 'column',
                          alignItems: 'center',
                          textAlign: 'center',
                        }}
                      >
                        <Typography
                          variant="caption"
                          sx={{
                            fontFamily: '"Limelight", serif',
                            color: '#5D4037',
                            fontSize: '0.8rem',
                            lineHeight: 1.1,
                            fontWeight: 400,
                          }}
                        >
                          PLAZAS
                        </Typography>
                        <Typography
                          variant="caption"
                          sx={{
                            fontFamily: '"Limelight", serif',
                            color: '#5D4037',
                            fontSize: '0.8rem',
                            lineHeight: 1.1,
                            fontWeight: 400,
                          }}
                        >
                          RESERVADAS
                        </Typography>
                      </Box>
                      <Typography
                        variant="h1"
                        sx={{
                          fontFamily: '"Limelight", serif',
                          color: '#3E2723',
                          fontWeight: 400,
                          fontSize: '3rem',
                          lineHeight: 1,
                        }}
                      >
                        {count}
                      </Typography>
                    </Box>
                  </CardContent>
                </Card>
              </Box>
            </Grid2>
          );
        })}
      </Grid2>
    </Stack>
  );
};

const getBusPlacesMap = (guests: Guest[]) => {
  const busPlacesMap: Record<BusOrigin, number> = { ...initialBusPlaces };
  guests.forEach((guest) => {
    const { busOrigin } = guest;
    if (busOrigin) {
      busPlacesMap[busOrigin] = busPlacesMap[busOrigin] + 1;
    }
  });
  return busPlacesMap;
};
