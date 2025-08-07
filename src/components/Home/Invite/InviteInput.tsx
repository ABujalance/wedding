import {
  Button,
  Stack,
  TextField,
  InputAdornment,
  useMediaQuery,
} from '@mui/material';
import { FC } from 'react';
import EditIcon from '@mui/icons-material/Edit';

interface InviteInputProps {
  inviteId: string;
  error: string;
  loading: boolean;
  onInviteIdChange: (inviteId: string) => void;
  onInviteAccess: () => void;
}

export const InviteInput: FC<InviteInputProps> = ({
  inviteId,
  error,
  loading,
  onInviteIdChange,
  onInviteAccess,
}) => {
  const is600Px = useMediaQuery('(min-width: 600px)');
  const is900Px = useMediaQuery('(min-width: 900px)');

  return (
    <Stack alignItems="center" gap={6} width="100%">
      <TextField
        slotProps={{
          htmlInput: { maxLength: 10 },
          input: {
            startAdornment: (
              <InputAdornment position="start">
                <EditIcon
                  sx={{
                    color: 'rgba(139, 69, 19, 0.6)',
                    fontSize: is900Px ? '2rem' : is600Px ? '1.6rem' : '1.4rem',
                    mr: is900Px ? 2 : 1.5,
                  }}
                />
              </InputAdornment>
            ),
          },
        }}
        error={Boolean(error)}
        helperText={error}
        variant="standard"
        sx={{
          width: '100%',
          maxWidth: '600px',
          '& .MuiInputLabel-root': {
            fontFamily: '"Berkshire Swash", serif',
            color: 'rgba(139, 69, 19, 0.7)',
            fontSize: is900Px ? '1.6rem' : is600Px ? '1.3rem' : '1.1rem',
            '&.Mui-focused': {
              color: '#8B4513',
            },
          },
          '& .MuiInputBase-input': {
            fontFamily: '"Berkshire Swash", serif',
            color: '#654321',
            fontSize: is900Px ? '1.8rem' : is600Px ? '1.5rem' : '1.3rem',
            textAlign: 'center',
            letterSpacing: is900Px ? '3px' : is600Px ? '2px' : '1.5px',
            fontWeight: 600,
            background:
              'linear-gradient(to right, transparent 0%, rgba(255,255,255,0.1) 20%, rgba(255,255,255,0.2) 50%, rgba(255,255,255,0.1) 80%, transparent 100%)',
            borderRadius: '6px 6px 0 0',
            padding: is900Px
              ? '16px 24px'
              : is600Px
              ? '12px 20px'
              : '10px 16px',
            height: is900Px ? '2rem' : is600Px ? '1.5rem' : '1.2rem',
          },
          '& .MuiFormHelperText-root': {
            fontFamily: '"Berkshire Swash", serif',
            color: '#8B4513',
            textAlign: 'center',
            fontSize: is900Px ? '1.1rem' : is600Px ? '1rem' : '0.9rem',
            marginTop: is900Px ? '12px' : '8px',
          },
          '& .MuiInput-underline': {
            '&:before': {
              borderBottom: '3px dotted rgba(139, 69, 19, 0.4)',
              content: '""',
            },
            '&:hover:before': {
              borderBottom: '3px dotted rgba(139, 69, 19, 0.7)',
            },
            '&:after': {
              borderBottom: '4px solid #8B4513',
            },
          },
          '& .MuiInputAdornment-root': {
            marginTop: '0 !important',
          },
        }}
        label="Código de invitación"
        value={inviteId}
        placeholder="_ _ _ _ _ _ _ _ _ _"
        onChange={(ev) => onInviteIdChange(ev.target.value)}
        disabled={loading}
      />
      <Button
        sx={{
          maxWidth: is900Px ? '450px' : is600Px ? '400px' : '350px',
          width: '100%',
          height: is900Px ? '72px' : is600Px ? '64px' : '56px',
          fontFamily: '"Berkshire Swash", serif',
          fontSize: is900Px ? '1.6rem' : is600Px ? '1.4rem' : '1.2rem',
          fontWeight: 600,
          borderRadius: is900Px ? '12px' : '10px',
          backgroundColor: 'white',
          color: '#654321',
          border: '3px solid white',
          textTransform: 'none',
          letterSpacing: is900Px ? '1px' : '0.5px',
          boxShadow: '0 6px 16px rgba(0, 0, 0, 0.3)',
          transition: 'all 0.3s ease',
          '&:hover': {
            backgroundColor: 'rgba(255, 255, 255, 0.9)',
            transform: 'translateY(-3px)',
            boxShadow: '0 8px 20px rgba(0, 0, 0, 0.4)',
          },
          '&:active': {
            transform: 'translateY(0px)',
            boxShadow: '0 3px 10px rgba(0, 0, 0, 0.3)',
          },
          '&.Mui-disabled': {
            backgroundColor: 'rgba(255, 255, 255, 0.6)', // Más opaco para mejor visibilidad
            color: 'rgba(101, 67, 33, 0.6)', // Color más visible, usando el brown original
            border: '3px solid rgba(255, 255, 255, 0.6)', // Borde más visible
            boxShadow: '0 3px 8px rgba(0, 0, 0, 0.2)', // Mantener algo de sombra
          },
        }}
        variant="contained"
        disabled={!inviteId || inviteId.length !== 10 || loading}
        onClick={onInviteAccess}
      >
        Acceder
      </Button>
    </Stack>
  );
};
