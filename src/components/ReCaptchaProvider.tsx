'use client';

import { GoogleReCaptchaProvider } from 'react-google-recaptcha-v3';
import { FC, ReactNode } from 'react';

interface ReCaptchaProviderProps {
  children: ReactNode;
}

export const ReCaptchaProvider: FC<ReCaptchaProviderProps> = ({ children }) => {
  const reCaptchaSiteKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY;

  if (!reCaptchaSiteKey) {
    console.warn('reCAPTCHA site key not found');
    return <>{children}</>;
  }

  return (
    <GoogleReCaptchaProvider
      reCaptchaKey={reCaptchaSiteKey}
      scriptProps={{
        async: false,
        defer: false,
        appendTo: 'head',
        nonce: undefined,
      }}
    >
      {children}
    </GoogleReCaptchaProvider>
  );
};
