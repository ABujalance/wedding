import { Stack, Typography } from '@mui/material';
import { FC } from 'react';

export const NumberBox: FC<{
  number: string;
  label: string;
  fontFamily?: string;
  color?: string;
}> = ({ number, label, fontFamily = '"Inconsolata", serif', color }) => {
  return (
    <Stack gap={1}>
      <Typography
        fontFamily={fontFamily}
        fontWeight={200}
        variant="h3"
        textAlign="center"
        sx={{ color: color }}
      >
        {number}
      </Typography>
      <Typography
        fontWeight={200}
        textAlign="center"
        fontFamily={fontFamily}
        variant="h6"
        sx={{ color: color }}
      >
        {label}
      </Typography>
    </Stack>
  );
};
