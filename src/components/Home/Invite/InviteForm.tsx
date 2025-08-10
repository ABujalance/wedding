'use client';

import { ShiningText } from '@/components/Text/ShiningText';
import { Invite } from '@/lib/firebase/invites';
import { Stack, useMediaQuery } from '@mui/material';
import { FC, useEffect, useState } from 'react';
import { InviteInput } from './InviteInput';
import { InviteScreen } from './InviteScreen';
import { HomeThemeWrapper } from '../HomeThemeWrapper';
import { getStoredInviteId, setStoredInviteId } from '@/util/inviteStorage';

export const InviteForm: FC = () => {
  const existingInviteId = getStoredInviteId();
  const [invite, setInvite] = useState<Invite>();
  const [inviteId, setInviteId] = useState(existingInviteId || '');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const inviteAccess = async (inviteId: string) => {
    setLoading(true);
    try {
      const inviteReq = await fetch(`api/invites/${inviteId}`);
      if (!inviteReq.ok) {
        throw new Error('Error al acceder a la invitación');
      }
      const invite = (await inviteReq.json()) as Invite | null;
      if (!invite) {
        setError('El número introducido no existe, inténtalo de nuevo');
        return;
      }
      setError('');
      setInvite(invite);
      setStoredInviteId(inviteId);
    } catch {
      setError(
        'Ha habido un error con tu solicitud. Asegurate que tu número es correcto',
      );
    } finally {
      setLoading(false);
    }
  };

  const is1500Px = useMediaQuery('(min-width: 1500px)');
  const is900Px = useMediaQuery('(min-width: 900px)');
  const is600Px = useMediaQuery('(min-width: 600px)');

  useEffect(() => {
    if (existingInviteId) {
      inviteAccess(existingInviteId);
    }
  }, [existingInviteId]);

  if (invite) {
    return (
      <HomeThemeWrapper>
        <InviteScreen invite={invite} />
      </HomeThemeWrapper>
    );
  }

  const onInviteAccess = async () => {
    if (!inviteId) return;
    await inviteAccess(inviteId);
  };

  return (
    <Stack alignItems="center" gap={3} paddingX="15%">
      <ShiningText
        variant={is1500Px ? 'h1' : is900Px ? 'h2' : is600Px ? 'h3' : 'h4'}
        textAlign="center"
        sx={{ color: '#BD9E24' }}
        fontFamily='"Parisienne", serif'
      >
        Alberto
        <br />y<br />
        Verónica
      </ShiningText>
      <ShiningText
        variant={is1500Px ? 'h3' : is900Px ? 'h4' : 'body1'}
        textAlign="center"
        sx={{ color: '#BD9E24' }}
        fontFamily='"Parisienne", serif'
      >
        6 de Diciembre de 2025
      </ShiningText>
      <InviteInput
        inviteId={inviteId}
        error={error}
        loading={loading}
        onInviteIdChange={setInviteId}
        onInviteAccess={onInviteAccess}
      />
    </Stack>
  );
};
