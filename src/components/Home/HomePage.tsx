'use client';

import {
  Button,
  CircularProgress,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import { FC, useState } from 'react';
import { Invite } from '@/lib/firebase/invites';

export const HomePage: FC = ({}) => {
  const [invite, setInvite] = useState<Invite>();
  const [inviteId, setInviteId] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const onInviteAccess = async () => {
    setLoading(true);
    setError('');
    try {
      const inviteReq = await fetch(`api/invites?inviteId=${inviteId}`);
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

  if (loading) {
    return <CircularProgress />;
  }

  if (invite) {
    return (
      <Stack sx={{ color: 'black' }}>
        <Typography> Bienvenido {invite.displayName}</Typography>
      </Stack>
    );
  }

  return (
    <Stack sx={{ color: 'black' }} gap={1}>
      <Typography>HOLA</Typography>
      <TextField
        slotProps={{ htmlInput: { maxLength: 10 } }}
        error={Boolean(error)}
        helperText={error}
        sx={{ maxWidth: '350px' }}
        label="Añade tu invitación"
        value={inviteId}
        placeholder="0000000000"
        onChange={(ev) => setInviteId(ev.target.value)}
      />
      <Button
        sx={{ maxWidth: '350px' }}
        variant="contained"
        disabled={!inviteId || inviteId.length !== 10}
        onClick={onInviteAccess}
      >
        Acceder
      </Button>
    </Stack>
  );
};
