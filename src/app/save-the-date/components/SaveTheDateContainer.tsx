"use client";

import { FC } from "react";

import BackgroundImage from "@/assets/images/save-the-date-back.jpg";
import { Box, Stack, Typography, useMediaQuery } from "@mui/material";
import { CountDown } from "./countDown/CountDown";
import "./save-the-date-container.css";
import { SaveTheDateInfo } from "./saveTheDateInfo/SaveTheDateInfo";

export const SaveTheDateContainer: FC = () => {
  const is900Px = useMediaQuery("(min-width: 900px)");
  const is1500Px = useMediaQuery("(min-width: 1500px)");

  return (
    <Box
      height="100vh"
      width="100vw"
      sx={{
        background: `url(${BackgroundImage.src}) center / cover`,
        backgroundPositionY: is1500Px ? -500 : is900Px ? -300 : "center",
        backgroundSize: "cover",
      }}
    >
      <Box
        sx={{
          backgroundColor: "rgba(0, 0, 0, 0.5)",
          width: "100%",
          height: "100%",
        }}
      >
        <Stack
          spacing={4}
          justifyContent="center"
          alignItems="center"
          className="content"
          padding={2}
        >
          <Typography
            variant={is900Px ? "h1" : "h2"}
            textAlign="center"
            paddingTop={8}
            fontFamily='"Parisienne", serif'
          >
            Verónica y Alberto
          </Typography>
          <Typography
            fontFamily='"Berkshire Swash", serif'
            variant={is900Px ? "h3" : "h4"}
            fontWeight={400}
            textAlign="center"
            paddingY={4}
          >
            Acompáñanos en nuestro gran día
          </Typography>
          <CountDown />

          <SaveTheDateInfo />
        </Stack>
      </Box>
    </Box>
  );
};
