'use client';
import { IconButton, Tooltip } from '@mui/material';
import LogoutIcon from '@mui/icons-material/Logout';
import { FC } from 'react';
import { clearStoredInviteId } from '@/util/inviteStorage';

export const LogoutButton: FC = () => {
  const handleLogout = () => {
    if (typeof window === 'undefined') return;
    // Limpiar localStorage
    clearStoredInviteId();
    // Recargar la página
    window.location.reload();
  };

  return (
    <Tooltip title="Salir y volver al inicio" placement="right">
      <IconButton
        onClick={handleLogout}
        sx={{
          position: 'fixed',
          top: 16,
          left: 16,
          zIndex: 1000,
          backgroundColor: 'rgba(139, 69, 19, 0.8)',
          color: 'white',
          border: '2px solid rgba(255, 255, 255, 0.3)',
          backdropFilter: 'blur(10px)',
          '&:hover': {
            backgroundColor: 'rgba(139, 69, 19, 0.9)',
            transform: 'scale(1.05)',
          },
          transition: 'all 0.2s ease-in-out',
          width: 48,
          height: 48,
        }}
      >
        <LogoutIcon />
      </IconButton>
    </Tooltip>
  );
};
