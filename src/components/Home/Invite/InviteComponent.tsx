import { Guest } from '@/lib/firebase/guest';
import { Invite } from '@/lib/firebase/invites';
import { Box, Stack } from '@mui/material';
import { FC } from 'react';
import { InviteHeader } from '@/components/Home/Invite/sections/InviteHeader';
import { PhotoCarousel } from '@/components/Home/Invite/sections/PhotoCarousel';
import { StorySection } from '@/components/Home/Invite/sections/StorySection';
import { EventInfoSection } from '@/components/Home/Invite/sections/EventInfoSection';
import { RsvpSection } from '@/components/Home/Invite/sections/RsvpSection';
import { AdditionalInfoCards } from '@/components/Home/Invite/sections/AdditionalInfoCards';
import { ConfirmButtonSection } from '@/components/Home/Invite/sections/ConfirmButtonSection';
import { FloatingRsvpButton } from '@/components/Home/Invite/components/FloatingRsvpButton';
import nosotros1 from '@/assets/images/nosotros/1.jpeg';
import nosotros2 from '@/assets/images/nosotros/2.jpeg';
import nosotros3 from '@/assets/images/nosotros/3.jpeg';
import nosotros4 from '@/assets/images/nosotros/4.jpeg';
import nosotros5 from '@/assets/images/nosotros/5.jpeg';
import nosotros6 from '@/assets/images/nosotros/6.jpeg';
import nosotros7 from '@/assets/images/nosotros/7.jpeg';
import nosotros8 from '@/assets/images/nosotros/8.jpeg';
import nosotros9 from '@/assets/images/nosotros/9.jpeg';
import nosotros10 from '@/assets/images/nosotros/10.jpeg';
import nosotros11 from '@/assets/images/nosotros/11.jpeg';
import nosotros12 from '@/assets/images/nosotros/12.jpeg';
import nosotros13 from '@/assets/images/nosotros/13.jpeg';
import nosotros14 from '@/assets/images/nosotros/14.jpeg';

type InviteComponentProps = {
  invite: Invite;
  guests: Guest[];
};

export const InviteComponent: FC<InviteComponentProps> = ({
  invite,
  guests,
}) => {
  return (
    <Stack gap={6}>
      <InviteHeader displayName={invite.displayName} />
      <Box paddingX="15%">
        <PhotoCarousel
          images={[
            { src: nosotros1.src, alt: 'Boda prima Araceli' },
            { src: nosotros2.src, alt: 'Disney World 2024' },
            { src: nosotros3.src, alt: 'Boda Rafa y Caro' },
            { src: nosotros4.src, alt: 'De viaje familiar!' },
            { src: nosotros5.src, alt: 'Pedida en Disney' },
            { src: nosotros6.src, alt: 'Que bien nos sacaron!' },
            {
              src: nosotros7.src,
              alt: 'Hay una silueta con tupé entre nosotros',
            },
            { src: nosotros8.src, alt: 'DLP 2025. Thunder Mesa cerrada :(' },
            { src: nosotros9.src, alt: 'Disfrutando la navidad' },
            { src: nosotros10.src, alt: 'En la sierra con Nami!' },
            { src: nosotros11.src, alt: 'De comunión' },
            { src: nosotros12.src, alt: 'Crucero por los Fiordos!' },
            { src: nosotros13.src, alt: 'DLP 2025' },
            { src: nosotros14.src, alt: 'Japón 2023 ⛩️' },
          ]}
        />
      </Box>
      <Box paddingX={{ lg: '15%', sm: '11%' }}>
        <EventInfoSection />
      </Box>

      <Box paddingX={{ lg: '15%' }}>
        <StorySection />
      </Box>

      <Box paddingX={{ lg: '15%' }}>
        <RsvpSection invite={invite} initialGuests={guests} />
      </Box>

      <Box paddingX={{ lg: '15%' }}>
        <AdditionalInfoCards />
      </Box>

      <Box paddingX={{ lg: '15%' }}>
        <ConfirmButtonSection />
      </Box>

      {/* Botón flotante para ir al formulario */}
      <FloatingRsvpButton />
    </Stack>
  );
};
