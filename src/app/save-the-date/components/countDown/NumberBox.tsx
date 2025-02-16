import { Stack, Typography } from "@mui/material";
import { FC } from "react";

export const NumberBox: FC<{ number: string; label: string }> = ({
  number,
  label,
}) => {
  return (
    <Stack gap={1}>
      <Typography
        fontFamily='"Inconsolata", serif'
        fontWeight={200}
        variant="h3"
        textAlign="center"
      >
        {number}
      </Typography>
      <Typography
        fontWeight={200}
        textAlign="center"
        fontFamily='"Inconsolata", serif'
        variant="h6"
      >
        {label}
      </Typography>
    </Stack>
  );
};
