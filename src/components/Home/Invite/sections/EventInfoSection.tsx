'use client';
import { Stack, Box, Card, CardContent } from '@mui/material';
import { FC } from 'react';
import { DateSection } from '@/components/Home/Invite/sections/DateSection';
import { LocationSection } from '@/components/Home/Invite/sections/LocationSection';
import { TimelineSection } from '@/components/Home/Invite/sections/TimelineSection';

export const EventInfoSection: FC = () => {
  return (
    <Stack gap={3} sx={{ width: '100%' }}>
      {/* Tarjeta tipo Christmas con bordes festivos */}
      <Card
        sx={{
          position: 'relative',
          borderRadius: 4,
          overflow: 'hidden',
          boxShadow: '0 12px 40px rgba(0,0,0,0.15)',
          background: '#fefefe',
          // Borde festivo con patrón diagonal
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            padding: '8px',
            background: `
              repeating-linear-gradient(
                45deg,
                #dc2626 0px,
                #dc2626 12px,
                #16a34a 12px,
                #16a34a 24px,
                #fefefe 24px,
                #fefefe 36px
              )
            `,
            borderRadius: 'inherit',
            mask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
            maskComposite: 'xor',
            WebkitMask:
              'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
            WebkitMaskComposite: 'xor',
            zIndex: 0,
          },
        }}
      >
        <CardContent
          sx={{
            p: 4,
            position: 'relative',
            zIndex: 1,
            background: '#fefefe',
            borderRadius: 3,
            m: 1,
          }}
        >
          <Stack
            gap={4}
            direction={{ xs: 'column', lg: 'row' }}
            alignItems={{ xs: 'stretch', lg: 'center' }}
            sx={{ width: '100%' }}
          >
            <Box sx={{ flex: { xs: 1, lg: 0.4 }, minWidth: 0 }}>
              <DateSection />
            </Box>
            <Box
              sx={{
                flex: { xs: 1, lg: 0.6 },
                minWidth: 0,
              }}
            >
              <LocationSection />
            </Box>
          </Stack>
        </CardContent>
      </Card>

      <TimelineSection />
    </Stack>
  );
};
