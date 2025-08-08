import { Button, Stack, Typography } from '@mui/material';
import { FC } from 'react';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';

export const calendarLink =
  'https://calendar.google.com/calendar/u/0/r/eventedit?text=Boda+Verónica+y+Alberto&dates=20251206T110000Z/20251206T225959Z&&location=A-4%2C%20KM%20564%2C%2041720%20Los%20Palacios%20y%20Villafranca%2C%20Sevilla&sf=true&output=xml';

export const SaveTheDateInfo: FC = () => {
  return (
    <Stack gap={1} alignContent="center" justifyContent="center">
      <Typography textAlign="center" variant="h5">
        6 de Diciembre de 2025
      </Typography>
      <Typography textAlign="center" variant="h5">
        12:00
      </Typography>
      <Button
        variant="outlined"
        sx={{
          borderColor: 'white',
          color: 'white',
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          textTransform: 'none',
        }}
        href="https://maps.app.goo.gl/aWzHhykqJQne9iMVA"
        target="_blank"
      >
        <Stack direction="row" gap={1}>
          <LocationOnIcon sx={{ color: '#FF2F23' }} />
          <Typography textAlign="center" noWrap>
            Hacienda los Frailes de San Alberto
          </Typography>
        </Stack>
      </Button>
      <Button
        href={calendarLink}
        target="_blank"
        variant="outlined"
        sx={{
          borderColor: 'white',
          color: 'white',
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
        }}
      >
        <Stack direction="row" gap={1}>
          <CalendarTodayIcon />
          <Typography textAlign="center" noWrap>
            Save the date
          </Typography>
        </Stack>
      </Button>
    </Stack>
  );
};
