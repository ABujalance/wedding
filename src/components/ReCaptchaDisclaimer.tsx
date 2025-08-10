'use client';

import { Box, Typography } from '@mui/material';
import { FC } from 'react';

export const ReCaptchaDisclaimer: FC = () => {
  return (
    <Box
      sx={{
        textAlign: 'center',
        py: 3,
        px: 2,
        backgroundColor: 'transparent',
        borderTop: '1px solid rgba(0,0,0,0.1)',
        mt: 'auto',
      }}
    >
      <Typography
        variant="caption"
        sx={{
          color: '#999',
          fontSize: '0.75rem',
          lineHeight: 1.4,
          '& a': {
            color: '#999',
            textDecoration: 'underline',
            '&:hover': {
              color: '#666',
            },
          },
        }}
      >
        This site is protected by reCAPTCHA and the Google{' '}
        <a
          href="https://policies.google.com/privacy"
          target="_blank"
          rel="noopener noreferrer"
        >
          Privacy Policy
        </a>{' '}
        and{' '}
        <a
          href="https://policies.google.com/terms"
          target="_blank"
          rel="noopener noreferrer"
        >
          Terms of Service
        </a>{' '}
        apply.
      </Typography>
    </Box>
  );
};
