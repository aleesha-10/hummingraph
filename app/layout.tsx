// path: app/layout.tsx
import 'katex/dist/katex.min.css'
import type { Metadata } from "next";
import { Nunito, Mulish } from 'next/font/google';
import "./globals.css";
import Navbar from '@/components/Navbar';

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

export const metadata: Metadata = {
  title: "Hummingraph",
  description: "A structured reference for data science concepts",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
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
        <Navbar />
        {children}
      </body>
    </html>
  );
}