import { Invite } from '@/lib/firebase/invites';
import { FC, useEffect, useState } from 'react';
import { InviteComponent } from './InviteComponent';
import { InviteSkeleton } from './InviteSkeleton';
import { Guest } from '@/lib/firebase/guest';

type InviteScreenProps = {
  invite: Invite;
};

export const InviteScreen: FC<InviteScreenProps> = ({ invite }) => {
  const [guests, setGuests] = useState<Guest[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchGuestData = async () => {
      try {
        const response = await fetch(`api/invites/${invite.id}/guests`);
        const guestData = (await response.json()) as Guest[];
        setGuests(guestData);
      } catch (error) {
        console.error('Error fetching guests:', error);
        setGuests([]);
      } finally {
        setLoading(false);
      }
    };

    fetchGuestData();
  }, [invite.id]);

  return (
    <>
      {loading ? (
        <InviteSkeleton />
      ) : (
        <InviteComponent invite={invite} guests={guests} />
      )}
    </>
  );
};
