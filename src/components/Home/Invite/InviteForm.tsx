import { ShiningText } from '@/components/Text/ShiningText';
import { Invite } from '@/lib/firebase/invites';
import { CircularProgress, Stack, useMediaQuery } from '@mui/material';
import { FC, useState } from 'react';
import { InviteInput } from './InviteInput';
import { InviteScreen } from './InviteScreen';

export const InviteForm: FC = () => {
  const [invite, setInvite] = useState<Invite>();
  const [inviteId, setInviteId] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const is900Px = useMediaQuery('(min-width: 900px)');

  if (loading) {
    return <CircularProgress />;
  }

  if (invite) {
    return <InviteScreen invite={invite} />;
  }

  const onInviteAccess = async () => {
    setLoading(true);
    setError('');
    try {
      const inviteReq = await fetch(`api/invites/${inviteId}`);
      const invite = (await inviteReq.json()) as Invite | null;
      if (!invite) {
        setError('El número introducido no existe, inténtalo de nuevo');
        return;
      }
      setInvite(invite);
    } catch {
      setError(
        'Ha habido un error con tu solicitud. Asegurate que tu número es correcto',
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <Stack alignItems="center" gap={3}>
      <ShiningText
        variant={is900Px ? 'h1' : 'h2'}
        textAlign="center"
        sx={{ color: '#BD9E24' }}
        fontFamily='"Parisienne", serif'
      >
        Alberto
        <br />y<br />
        Verónica
      </ShiningText>
      <ShiningText
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
