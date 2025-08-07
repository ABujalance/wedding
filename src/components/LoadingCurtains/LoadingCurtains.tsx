'use client';

import TartanImage from '@/assets/images/tartan-pattern.jpeg';
import { Box } from '@mui/material';
import { FC, ReactNode, useEffect, useState } from 'react';

interface LoadingCurtainsProps {
  children: ReactNode;
}

export const LoadingCurtains: FC<LoadingCurtainsProps> = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    const checkImagesLoaded = () => {
      // Get all images in the document
      const images = document.querySelectorAll('img');
      const imagePromises = Array.from(images).map((img) => {
        if (img.complete) {
          return Promise.resolve();
        }
        return new Promise((resolve, reject) => {
          img.onload = resolve;
          img.onerror = reject;
        });
      });

      // Also check for CSS background images
      const elementsWithBgImages = document.querySelectorAll(
        '[style*="background"]',
      );
      const bgImagePromises = Array.from(elementsWithBgImages).map(
        (element) => {
          const style = window.getComputedStyle(element);
          const bgImage = style.backgroundImage;

          if (bgImage && bgImage !== 'none') {
            const imageUrl = bgImage.slice(4, -1).replace(/"/g, '');
            if (imageUrl.startsWith('http') || imageUrl.startsWith('/')) {
              return new Promise((resolve, reject) => {
                const img = new Image();
                img.onload = resolve;
                img.onerror = reject;
                img.src = imageUrl;
              });
            }
          }
          return Promise.resolve();
        },
      );

      return Promise.all([...imagePromises, ...bgImagePromises]);
    };

    // Wait a minimum time to ensure the curtains are visible
    const minLoadTime = new Promise((resolve) => setTimeout(resolve, 1500));

    // Wait for both minimum time and images to load
    Promise.all([minLoadTime, checkImagesLoaded()])
      .then(() => {
        setIsAnimating(true);
        // Wait for animation to complete before removing curtains
        setTimeout(() => {
          setIsLoading(false);
        }, 2000); // 2 seconds for opening animation
      })
      .catch(() => {
        // If images fail to load, still proceed after minimum time
        setTimeout(() => {
          setIsAnimating(true);
          setTimeout(() => {
            setIsLoading(false);
          }, 2000);
        }, 3000);
      });
  }, []);

  if (!isLoading) {
    return <>{children}</>;
  }

  return (
    <>
      {/* Left door container */}
      <Box
        sx={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '50vw',
          height: '100vh',
          overflow: 'hidden',
          zIndex: 9999,
        }}
      >
        {/* Left door */}
        <Box
          sx={{
            width: '100%',
            height: '100%',
            backgroundImage: `url(${TartanImage.src})`,
            backgroundSize: '200px 200px',
            backgroundPosition: 'top left',
            backgroundRepeat: 'repeat',
            transformOrigin: 'left center',
            transform: isAnimating
              ? 'perspective(1000px) rotateY(-120deg)'
              : 'perspective(1000px) rotateY(0deg)',
            transition: 'transform 1.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
            boxShadow: isAnimating
              ? '10px 0 30px rgba(0,0,0,0.3)'
              : '0 0 0 rgba(0,0,0,0)',
          }}
        />
      </Box>

      {/* Right door container */}
      <Box
        sx={{
          position: 'fixed',
          top: 0,
          right: 0,
          width: '50vw',
          height: '100vh',
          overflow: 'hidden',
          zIndex: 9999,
        }}
      >
        {/* Right door */}
        <Box
          sx={{
            width: '100%',
            height: '100%',
            backgroundImage: `url(${TartanImage.src})`,
            backgroundSize: '200px 200px',
            backgroundPosition: 'top right',
            backgroundRepeat: 'repeat',
            transformOrigin: 'right center',
            transform: isAnimating
              ? 'perspective(1000px) rotateY(120deg)'
              : 'perspective(1000px) rotateY(0deg)',
            transition: 'transform 1.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
            boxShadow: isAnimating
              ? '-10px 0 30px rgba(0,0,0,0.3)'
              : '0 0 0 rgba(0,0,0,0)',
          }}
        />
      </Box>

      {/* Content (visible immediately when doors start opening) */}
      <Box
        sx={{
          opacity: isAnimating ? 1 : 0,
          transition: 'opacity 0.5s ease-in-out',
          transitionDelay: isAnimating ? '0s' : '0s',
        }}
      >
        {children}
      </Box>
    </>
  );
};
