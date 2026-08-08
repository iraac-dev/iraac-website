import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "IRAAC",
  description: "IRAAC public website, MobLink prototype and staff admin dashboard.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" data-scroll-behavior="smooth">
      <body>{children}</body>
    </html>
  );
}
