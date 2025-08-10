import type { Metadata } from 'next';
import './globals.css';
import { ReCaptchaProvider } from '@/components/ReCaptchaProvider';
import { ReCaptchaDisclaimer } from '@/components/ReCaptchaDisclaimer';

export const metadata: Metadata = {
  title: 'Alberto y Verónica',
  description: '¡Nos casamos!',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <script
          src={`https://www.google.com/recaptcha/api.js?render=${process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY}`}
          async
          defer
        />
      </head>
      <body style={{ margin: 0, padding: 0, minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
        <ReCaptchaProvider>
          <div style={{ flex: 1 }}>
            {children}
          </div>
          <ReCaptchaDisclaimer />
        </ReCaptchaProvider>
      </body>
    </html>
  );
}
