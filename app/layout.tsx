import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Kash Quiz",
  description: "Kash quiz in ORO-inspired style",
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
