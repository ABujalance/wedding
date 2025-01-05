"use client";
import { WEDDING_DATE } from "@/util/constants/time";
import { Stack, Typography } from "@mui/material";
import { FC, useEffect, useState } from "react";

export const CountDown: FC = () => {
  const [remainingTime, setRemainingTime] = useState<number>(
    new Date().getTime()
  );

  const days = Math.floor(remainingTime / (1000 * 60 * 60 * 24));
  const hours = Math.floor(
    (remainingTime % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
  );
  const minutes = Math.floor((remainingTime % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((remainingTime % (1000 * 60)) / 1000);

  useEffect(() => {
    const countdownInterval = setInterval(() => {
      const currentTime = new Date().getTime();
      const weddingTime = new Date(WEDDING_DATE).getTime();

      let remainingTime = weddingTime - currentTime;

      if (remainingTime <= 0) {
        remainingTime = 0;
        clearInterval(countdownInterval);
        alert("Countdown complete!");
      }

      setRemainingTime(remainingTime);
    }, 1000);

    return () => clearInterval(countdownInterval);
  }, []);

  return (
    <Stack>
      <Typography variant="h3">CountDown</Typography>
      <Stack direction="row" gap="8px">
        <Typography variant="h3">{days} Days</Typography>
        <Typography variant="h3">
          {hours}:{minutes}:{seconds}
        </Typography>
      </Stack>
    </Stack>
  );
};
