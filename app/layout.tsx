// path: app/layout.tsx
import 'katex/dist/katex.min.css'
import type { Metadata } from "next";
import { Nunito, Mulish } from 'next/font/google';
import { Analytics } from '@vercel/analytics/react';
import "./globals.css";
import Navbar from '@/components/Navbar';
import ChatWidget from '@/components/ChatWidget';
import ServiceWorkerRegister from '@/components/ServiceWorkerRegister';
import { getAllConcepts } from '@/lib/concepts';

const nunito = Nunito({
  subsets: ["latin"],
  variable: "--font-nunito",
  display: "swap",
});

const mulish = Mulish({
  subsets: ["latin"],
  variable: "--font-mulish",
  display: "swap",
});

// Update this once you have your real Vercel URL — it's what turns relative
// paths below into full URLs for social preview cards.
const SITE_URL = "https://hummingraph.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: "Hummingraph",
  description: "A structured reference for data science concepts",
  manifest: "/manifest.json",
  icons: {
    icon: "/logo2.svg",
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "Hummingraph",
  },
  openGraph: {
    title: "Hummingraph — A Hummingbird's map for Data Science",
    description:
      "One concept, one clean page, in 2 minutes. No 3-hour videos, no scattered notes.",
    url: SITE_URL,
    siteName: "Hummingraph",
    images: [{ url: "/og-image.png", width: 1200, height: 630 }],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Hummingraph — A Hummingbird's map for Data Science",
    description:
      "One concept, one clean page, in 2 minutes. No 3-hour videos, no scattered notes.",
    images: ["/og-image.png"],
  },
};

export const viewport = {
  themeColor: "#4A90D9",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Lightweight fields only — this list is sent to the client for the
  // navbar search bar, so we don't want to ship every field of every concept.
  const searchableConcepts = getAllConcepts().map((c) => ({
    id: c.id,
    title: c.title,
    section: c.section,
    tagline: c.tagline,
  }));

  return (
    <html
      lang="en"
      className={`${nunito.variable} ${mulish.variable} h-full antialiased`}
    >
      <body
        className="min-h-full flex flex-col"
        style={{
          backgroundColor: '#FDFBF7',
          color: '#4A4A4A',
          fontFamily: 'var(--font-mulish), sans-serif'
        }}
      >
        <Navbar concepts={searchableConcepts} />
        {children}
        <ChatWidget />
        <ServiceWorkerRegister />
        <Analytics />
      </body>
    </html>
  );
}