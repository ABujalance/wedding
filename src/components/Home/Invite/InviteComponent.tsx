import { Guest } from '@/lib/firebase/guest';
import { Invite } from '@/lib/firebase/invites';
import { List, ListItem, Stack, Typography } from '@mui/material';
import { FC, use } from 'react';
import { BusInfo } from './BusInfo/BusInfo';

type InviteComponentProps = {
  invite: Invite;
  guestsPromise: Promise<Guest[]>;
};

export const InviteComponent: FC<InviteComponentProps> = ({
  invite,
  guestsPromise,
}) => {
  const guests = use(guestsPromise);
  return (
    <Stack sx={{ color: 'black' }} gap={2}>
      <Stack gap={1}>
        <Typography variant="h4">{invite.id}</Typography>
        <Typography variant="h3"> Bienvenido {invite.displayName}</Typography>
        <Typography>{guests.length} invitaciones</Typography>
        <List>
          {guests.map((guest) => (
            <ListItem key={guest.id}>{guest.fullName}</ListItem>
          ))}
        </List>
      </Stack>
      <BusInfo guests={guests} />
    </Stack>
  );
};
