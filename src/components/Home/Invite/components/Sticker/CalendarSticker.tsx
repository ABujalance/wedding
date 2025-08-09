'use client';
import { FC } from 'react';
import { Sticker } from './Sticker';
import calendarIcon from '@/assets/stickers/calendar-love.png';

interface CalendarStickerProps {
  href: string;
  size?: number;
}

export const CalendarSticker: FC<CalendarStickerProps> = ({
  href,
  size = 70,
}) => {
  return (
    <Sticker
      icon={calendarIcon}
      href={href}
      size={size}
      rotation={-8}
      alt="Calendar"
    />
  );
};
