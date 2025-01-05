import { FC } from "react";

import BackgroundImage from "@/assets/images/save-the-date-back.jpg";
import { Box } from "@mui/material";
import { CountDown } from "./countDown/CountDown";

export const SaveTheDateContainer: FC = () => {
  return (
    <Box
      height="100vh"
      width="100vw"
      sx={{
        background: `url(${BackgroundImage.src}) center / cover`,
      }}
    >
      <CountDown />
    </Box>
  );
};
