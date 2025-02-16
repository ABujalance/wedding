import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Alberto y Verónica",
  description: "¡Nos casamos!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
