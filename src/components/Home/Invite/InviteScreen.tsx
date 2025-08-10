import { Invite } from '@/lib/firebase/invites';
import { FC, useEffect, useState } from 'react';
import { InviteComponent } from './InviteComponent';
import { InviteSkeleton } from './InviteSkeleton';
import { Guest } from '@/lib/firebase/guest';
import { useGoogleReCaptcha } from 'react-google-recaptcha-v3';

type InviteScreenProps = {
  invite: Invite;
};

export const InviteScreen: FC<InviteScreenProps> = ({ invite }) => {
  const { executeRecaptcha } = useGoogleReCaptcha();
  const [guests, setGuests] = useState<Guest[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchGuestData = async () => {
      try {
        if (!executeRecaptcha) {
          console.error('reCAPTCHA not available');
          setGuests([]);
          setLoading(false);
          return;
        }

        const token = await executeRecaptcha('fetch_guests');

        const response = await fetch(`api/invites/${invite.id}/guests`, {
          headers: {
            'Content-Type': 'application/json',
            'recaptcha-token': token,
          },
        });
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
  }, [invite.id, executeRecaptcha]);

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
