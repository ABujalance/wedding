'use client';
import { FC } from 'react';
import { Sticker } from './Sticker';
import locationIcon from '@/assets/stickers/location.png';

interface LocationStickerProps {
  href: string;
  size?: number;
}

export const LocationSticker: FC<LocationStickerProps> = ({
  href,
  size = 70,
}) => {
  return (
    <Sticker
      icon={locationIcon}
      href={href}
      size={size}
      rotation={5}
      alt="Location"
    />
  );
};
