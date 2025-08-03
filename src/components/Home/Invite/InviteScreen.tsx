import { Invite } from '@/lib/firebase/invites';
import { CircularProgress } from '@mui/material';
import { FC, Suspense } from 'react';
import { InviteComponent } from './InviteComponent';
import { Guest } from '@/lib/firebase/guest';

type InviteScreenProps = {
  invite: Invite;
};

const fetchGuestData = async (inviteId: string) => {
  const response = await fetch(`api/invites/${inviteId}/guests`);
  const guests = (await response.json()) as Guest[];
  return guests;
};

export const InviteScreen: FC<InviteScreenProps> = ({ invite }) => {
  const guestsPromise = fetchGuestData(invite.id);
  return (
    <Suspense fallback={<CircularProgress />}>
      <InviteComponent invite={invite} guestsPromise={guestsPromise} />
    </Suspense>
  );
};
