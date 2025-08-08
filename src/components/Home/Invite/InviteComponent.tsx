import { Guest } from '@/lib/firebase/guest';
import { Invite } from '@/lib/firebase/invites';
import { Box, Stack } from '@mui/material';
import { FC, use } from 'react';
import { BusInfo } from './BusInfo/BusInfo';
import { InviteHeader } from '@/components/Home/Invite/sections/InviteHeader';
import { PhotoCarousel } from '@/components/Home/Invite/sections/PhotoCarousel';
import { StorySection } from '@/components/Home/Invite/sections/StorySection';
import { EventInfoSection } from '@/components/Home/Invite/sections/EventInfoSection';
import { RsvpSection } from '@/components/Home/Invite/sections/RsvpSection';
import { AdditionalInfoCards } from '@/components/Home/Invite/sections/AdditionalInfoCards';
import { ConfirmButtonSection } from '@/components/Home/Invite/sections/ConfirmButtonSection';
import nosotros1 from '@/assets/images/nosotros/046d1872-f2c0-4054-aafb-6b4e82573914.jpeg';
import nosotros2 from '@/assets/images/nosotros/0a892ce7-8701-4586-936e-0d411ce6933d.jpeg';
import nosotros3 from '@/assets/images/nosotros/0bda12f4-45c6-4a36-afe6-df189ae55314.jpeg';
import nosotros4 from '@/assets/images/nosotros/1728dc70-9c8e-40c9-bea9-923140700474.jpeg';
import nosotros5 from '@/assets/images/nosotros/19086984-19e6-44f9-9afd-094206101a3f.jpeg';
import nosotros6 from '@/assets/images/nosotros/5339e869-73bd-4fc5-a36b-a67909f466ed.jpeg';
import nosotros7 from '@/assets/images/nosotros/57beb074-3fef-4dd2-9bf0-b705bef32721.jpeg';
import nosotros8 from '@/assets/images/nosotros/6a8717f3-33fc-4839-8e94-ff92fa44c17c.jpeg';
import nosotros9 from '@/assets/images/nosotros/6e2843c0-1cc7-4c06-8ccc-0d154ef78d42.jpeg';
import nosotros10 from '@/assets/images/nosotros/9f6b0b17-9a18-4d3d-9a05-4a6908d37f35.jpeg';
import nosotros11 from '@/assets/images/nosotros/9f96e0e0-63ce-42cd-a07e-2b6b6cf23ec2.jpeg';
import nosotros12 from '@/assets/images/nosotros/c431618b-9f3d-4a45-a50f-4336340b840a.jpeg';
import nosotros13 from '@/assets/images/nosotros/ebcb7da7-9805-4e71-ba81-68632b56f96e.jpeg';

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
      <Box paddingX="15%">
        <PhotoCarousel
          images={[
            { src: nosotros1.src, alt: 'Foto de la pareja 1' },
            { src: nosotros2.src, alt: 'Foto de la pareja 2' },
            { src: nosotros3.src, alt: 'Foto de la pareja 3' },
            { src: nosotros4.src, alt: 'Foto de la pareja 4' },
            { src: nosotros5.src, alt: 'Foto de la pareja 5' },
            { src: nosotros6.src, alt: 'Foto de la pareja 6' },
            { src: nosotros7.src, alt: 'Foto de la pareja 7' },
            { src: nosotros8.src, alt: 'Foto de la pareja 8' },
            { src: nosotros9.src, alt: 'Foto de la pareja 9' },
            { src: nosotros10.src, alt: 'Foto de la pareja 10' },
            { src: nosotros11.src, alt: 'Foto de la pareja 11' },
            { src: nosotros12.src, alt: 'Foto de la pareja 12' },
            { src: nosotros13.src, alt: 'Foto de la pareja 13' },
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
        <BusInfo guests={guests} />
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
    </Stack>
  );
};
