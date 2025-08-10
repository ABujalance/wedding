import type { Metadata } from 'next';
import './globals.css';
import { ReCaptchaProvider } from '@/components/ReCaptchaProvider';

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
      <body>
        <ReCaptchaProvider>{children}</ReCaptchaProvider>
      </body>
    </html>
  );
}
