import type { Metadata } from "next";
import { Inter, Instrument_Serif, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-geist",
  display: "swap",
});

const mono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
  display: "swap",
});

const instrument = Instrument_Serif({
  subsets: ["latin"],
  weight: ["400"],
  style: ["normal", "italic"],
  variable: "--font-instrument",
  display: "swap",
});

export const metadata: Metadata = {
  title: "SolvIT — Soluciones para tu hogar en Buenos Aires",
  description:
    "Marketplace de servicios para el hogar en CABA. Publicá tu problema, técnicos verificados compiten por tomarlo. Sin presupuestos al voleo, sin perder la mañana.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="es"
      className={`${inter.variable} ${mono.variable} ${instrument.variable}`}
    >
      <body className="min-h-screen antialiased">{children}</body>
    </html>
  );
}
