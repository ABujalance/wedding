import { Guest } from '@/lib/firebase/guest';
import { Invite } from '@/lib/firebase/invites';
import { Stack } from '@mui/material';
import { FC, use } from 'react';
import { BusInfo } from './BusInfo/BusInfo';
import { InviteHeader } from '@/components/Home/Invite/sections/InviteHeader';
import { PhotoCarousel } from '@/components/Home/Invite/sections/PhotoCarousel';
import { StorySection } from '@/components/Home/Invite/sections/StorySection';
import { EventInfoSection } from '@/components/Home/Invite/sections/EventInfoSection';
import { RsvpSection } from '@/components/Home/Invite/sections/RsvpSection';
import { AdditionalInfoCards } from '@/components/Home/Invite/sections/AdditionalInfoCards';
import { ConfirmButtonSection } from '@/components/Home/Invite/sections/ConfirmButtonSection';
import fachada from '@/assets/images/hacienda/Fachada.jpg';
import hacienda from '@/assets/images/hacienda/hacienda.jpeg';

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
    <Stack gap={6}>
      <InviteHeader displayName={invite.displayName} />

      <PhotoCarousel
        images={[
          { src: fachada.src, alt: 'Fachada Hacienda' },
          { src: hacienda.src, alt: 'Hacienda' },
        ]}
      />

      <EventInfoSection />

      <StorySection />

      <BusInfo guests={guests} />

      <RsvpSection invite={invite} initialGuests={guests} />

      <AdditionalInfoCards />

      <ConfirmButtonSection />
    </Stack>
  );
};
