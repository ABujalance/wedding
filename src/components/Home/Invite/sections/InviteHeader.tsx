'use client';
import { ShiningText } from '@/components/Text/ShiningText';
import { Stack } from '@mui/material';
import { FC } from 'react';
import { useBreakpoints } from '@/hooks/useBreakpoints';

export const InviteHeader: FC<{ displayName: string }> = ({ displayName }) => {
  const { isXl, isL, isM } = useBreakpoints();
  const variant = isXl ? 'h1' : isL ? 'h2' : isM ? 'h3' : 'h4';

  return (
    <Stack alignItems="center" textAlign="center" gap={1}>
      <ShiningText
        variant={variant}
        component="h1"
        sx={{ color: '#BD9E24' }}
        fontFamily='"Parisienne", serif'
      >
        Bienvenidos {displayName}
      </ShiningText>
    </Stack>
  );
};
