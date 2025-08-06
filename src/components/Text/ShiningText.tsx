'use client';

import { Typography, TypographyProps, SxProps, Theme } from '@mui/material';
import { FC, useEffect, useState } from 'react';

// This component was 100% vibe coded just to test something. I guess it works, but it could be improved a lot.

interface ShiningTextProps extends Omit<TypographyProps, 'sx'> {
  children: React.ReactNode;
  backgroundSize?: number; // Size of the shine effect in pixels
  angle?: number; // Angle of the shine gradient (-40deg default)
  intensity?: number; // Controls how much scroll/tilt affects the animation (0-1)
  scrollSpeed?: number; // Speed multiplier for scroll-based animation (default: 2)
  shineWidth?: number; // Width of the shine effect (1-20, default: 12)
  shineBlur?: number; // Blur/softness of the shine edges (1-30, default: 15)
  baseColor?: string; // Base color for the text (default: currentColor)
  shineColor?: string; // Color of the shine effect (default: white)
  sx?: SxProps<Theme>;
}

export const ShiningText: FC<ShiningTextProps> = ({
  children,
  backgroundSize = 400, // Aumentado para cubrir mejor textos largos
  angle = -40,
  intensity = 1,
  scrollSpeed = 2, // Velocidad moderada por defecto
  shineWidth = 12, // Grosor del brillo (un poco más ancho)
  shineBlur = 15, // Suavizado de los bordes del brillo
  baseColor = 'currentColor',
  shineColor = '#ffffff',
  sx,
  ...typographyProps
}) => {
  const [scrollY, setScrollY] = useState(0);
  const [deviceTilt, setDeviceTilt] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    const handleOrientation = (event: DeviceOrientationEvent) => {
      // Use gamma (left-right tilt) for horizontal movement effect
      // Normalize the value to work similar to scroll
      if (event.gamma !== null) {
        // gamma ranges from -90 to 90, we'll map it to scroll-like values
        const normalizedTilt = (event.gamma + 90) * 10; // Convert to 0-1800 range
        setDeviceTilt(normalizedTilt);
      }
    };

    // Add scroll listener
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Initial call

    // Add device orientation listener for mobile
    if (window.DeviceOrientationEvent) {
      window.addEventListener('deviceorientation', handleOrientation, {
        passive: true,
      });
    }

    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (window.DeviceOrientationEvent) {
        window.removeEventListener('deviceorientation', handleOrientation);
      }
    };
  }, []);

  // Calculate background position based on scroll and device tilt
  const getBackgroundPosition = () => {
    // Combine scroll and device tilt for the animation
    const combinedPosition = scrollY + deviceTilt;
    const totalWidth = backgroundSize * 3; // Wider background for full coverage
    const scrollProgress = combinedPosition * intensity * scrollSpeed;
    const position = -backgroundSize + (scrollProgress % totalWidth);
    return `${position}px 0`;
  };

  const shineKeyframes = `
    /* Keyframes removed since we're only using scroll/tilt-based positioning */
  `;

  return (
    <>
      <style>{shineKeyframes}</style>
      <div style={{ position: 'relative', display: 'inline-block' }}>
        {/* Base text */}
        <Typography
          {...typographyProps}
          sx={{
            color: baseColor,
            fontWeight: 'bold',
            position: 'relative',
            ...(sx || {}),
          }}
        >
          {children}
        </Typography>

        {/* Shine overlay - Primary gold shine */}
        <Typography
          {...typographyProps}
          sx={{
            color: 'transparent',
            fontWeight: 'bold',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: `linear-gradient(${angle}deg, 
              transparent ${50 - shineWidth / 2 - shineBlur / 2}%, 
              transparent ${50 - shineWidth / 2}%, 
              ${shineColor} 50%, 
              transparent ${50 + shineWidth / 2}%, 
              transparent ${50 + shineWidth / 2 + shineBlur / 2}%)`,
            backgroundSize: `${backgroundSize}px 100%`,
            backgroundRepeat: 'no-repeat',
            backgroundClip: 'text',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            pointerEvents: 'none',
            zIndex: 3,

            // Animation based on scroll and device tilt
            backgroundPosition: getBackgroundPosition(),
            transition: 'background-position 0.1s ease-out',
          }}
        >
          {children}
        </Typography>

        {/* Secondary gold reflection - warmer tone */}
        <Typography
          {...typographyProps}
          sx={{
            color: 'transparent',
            fontWeight: 'bold',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: `linear-gradient(${angle + 15}deg, 
              transparent 35%, 
              #FFB000 45%, 
              #FFC700 55%, 
              transparent 65%)`,
            backgroundSize: `${backgroundSize * 0.7}px 100%`,
            backgroundRepeat: 'no-repeat',
            backgroundClip: 'text',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            pointerEvents: 'none',
            zIndex: 2,
            opacity: 0.6,

            // Different animation timing for irregular effect
            backgroundPosition: `${
              ((scrollY + deviceTilt) * intensity * scrollSpeed * 0.7) %
              (backgroundSize * 2)
            }px 0`,
            transition: 'background-position 0.15s ease-out',
          }}
        >
          {children}
        </Typography>

        {/* Accent sparkle - bright highlights */}
        <Typography
          {...typographyProps}
          sx={{
            color: 'transparent',
            fontWeight: 'bold',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: `linear-gradient(${angle - 20}deg, 
              transparent 40%, 
              #FFFF99 48%, 
              #FFFFFF 50%, 
              #FFFF99 52%, 
              transparent 60%)`,
            backgroundSize: `${backgroundSize * 1.2}px 100%`,
            backgroundRepeat: 'no-repeat',
            backgroundClip: 'text',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            pointerEvents: 'none',
            zIndex: 2,
            opacity: 0.4,

            // Fastest animation for sparkle effect
            backgroundPosition: `${
              ((scrollY + deviceTilt) * intensity * scrollSpeed * 1.5) %
              (backgroundSize * 2.5)
            }px 0`,
            transition: 'background-position 0.08s ease-out',
          }}
        >
          {children}
        </Typography>

        {/* Shadow/depth effect - dark tones for 3D effect */}
        <Typography
          {...typographyProps}
          sx={{
            color: 'transparent',
            fontWeight: 'bold',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: `linear-gradient(${angle + 30}deg, 
              transparent 30%, 
              #B8860B 40%, 
              #8B4513 50%, 
              #654321 60%, 
              transparent 70%)`,
            backgroundSize: `${backgroundSize * 0.8}px 100%`,
            backgroundRepeat: 'no-repeat',
            backgroundClip: 'text',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            pointerEvents: 'none',
            zIndex: 1,
            opacity: 0.3,

            // Slower, opposite direction for depth
            backgroundPosition: `${
              backgroundSize -
              (((scrollY + deviceTilt) * intensity * scrollSpeed * 0.5) %
                (backgroundSize * 3))
            }px 0`,
            transition: 'background-position 0.2s ease-out',
          }}
        >
          {children}
        </Typography>
      </div>
    </>
  );
};
