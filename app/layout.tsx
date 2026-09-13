import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "IRAAC",
  description: "IRAAC is an Aboriginal Community Organisation working with and for community through Local Decision Making, community programs and stronger governance.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" data-scroll-behavior="smooth">
      <body>{children}</body>
    </html>
  );
}
