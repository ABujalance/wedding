'use client';
import { ShiningText } from '@/components/Text/ShiningText';
import { Stack } from '@mui/material';
import { FC } from 'react';

export const InviteHeader: FC<{ displayName: string }> = ({ displayName }) => {
  return (
    <Stack alignItems="center" textAlign="center" gap={1} paddingX="15%">
      <ShiningText
        variant="h1"
        component="h1"
        sx={{ color: '#BD9E24' }}
        fontFamily='"Parisienne", serif'
      >
        Invitación de {displayName}
      </ShiningText>
    </Stack>
  );
};
