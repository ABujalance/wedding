'use client';
import { WEDDING_DATE } from '@/util/constants/time';
import { Divider, Stack } from '@mui/material';
import { FC, useEffect, useState } from 'react';
import { NumberBox } from './NumberBox';

const paddedNumber = (number: number, pad: number) =>
  String(number).padStart(pad, '0');

export const CountDown: FC<{ fontFamily?: string; color?: string }> = ({
  fontFamily,
  color,
}) => {
  const [remainingTime, setRemainingTime] = useState<number>(
    new Date().getTime(),
  );

  const days = Math.floor(remainingTime / (1000 * 60 * 60 * 24));
  const hours = Math.floor(
    (remainingTime % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60),
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
        alert('Countdown complete!');
      }

      setRemainingTime(remainingTime);
    }, 1000);

    return () => clearInterval(countdownInterval);
  }, []);

  return (
    <Stack>
      <Stack
        direction="row"
        gap={2}
        justifyContent="center"
        alignContent="center"
      >
        <NumberBox
          number={paddedNumber(days, 3)}
          label="DÍAS"
          fontFamily={fontFamily}
          color={color}
        />
        <Divider
          orientation="vertical"
          flexItem
          sx={{ borderColor: color || 'white' }}
        />
        <NumberBox
          number={paddedNumber(hours, 2)}
          label="HORAS"
          fontFamily={fontFamily}
          color={color}
        />
        <Divider
          orientation="vertical"
          flexItem
          sx={{ borderColor: color || 'white' }}
        />
        <NumberBox
          number={paddedNumber(minutes, 2)}
          label="MINUTOS"
          fontFamily={fontFamily}
          color={color}
        />
        <Divider
          orientation="vertical"
          flexItem
          sx={{ borderColor: color || 'white' }}
        />
        <NumberBox
          number={paddedNumber(seconds, 2)}
          label="SEGUNDOS"
          fontFamily={fontFamily}
          color={color}
        />
      </Stack>
    </Stack>
  );
};
