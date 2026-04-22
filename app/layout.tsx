import type { Metadata } from "next";
import { Playfair_Display, DM_Sans } from "next/font/google";
import "./globals.css";

const display = Playfair_Display({ subsets: ["latin"], variable: "--font-display", display: "swap" });
const sans = DM_Sans({ subsets: ["latin"], variable: "--font-sans", display: "swap" });

export const metadata: Metadata = {
  title: "Ohhi — Café & bar, Malmö",
  description: "Ohhi. Café & bar. Beijerskajen 2, Malmö. Opening June 2025.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${display.variable} ${sans.variable}`}>
      <body className="font-sans bg-cream text-charcoal">{children}</body>
    </html>
  );
}
