import { BusOrigin, Guest } from '@/lib/firebase/guest';
import { List, ListItem, Stack, Typography } from '@mui/material';
import { FC } from 'react';

type BusInfoProps = { guests: Guest[] };

const initialBusPlaces: Record<BusOrigin, number> = {
  Huelva: 0,
  Lucena: 0,
  Sevilla: 0,
};

export const BusInfo: FC<BusInfoProps> = ({ guests }) => {
  const busPlaces = getBusPlacesMap(guests);
  const totalBuses = Object.values(busPlaces).reduce(
    (acc, place) => acc + place,
    0,
  );

  return (
    <Stack gap={1}>
      <Typography>
        Tenéis un total de {totalBuses} plazas de bus reservadas
      </Typography>
      <List>
        {Object.entries(busPlaces).map(([key, value]) => {
          if (value > 0) {
            return (
              <ListItem key={key}>
                {value} desde {key}
              </ListItem>
            );
          }
        })}
      </List>
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
