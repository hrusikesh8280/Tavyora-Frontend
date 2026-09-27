import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Tavyora",
  description:
    "Technology consultancy, software development and practitioner-led online yoga.",
  metadataBase: new URL("https://tavyora.com"),
  // Conservative fallback for unmatched routes; every production content page opts in explicitly.
  robots: { index: false, follow: false },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" data-scroll-behavior="smooth">
      <body>{children}</body>
    </html>
  );
}
