import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { BASE_URL, CONST } from "../constants/constants";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: CONST.TITLE,
  description: CONST.DESCRIPTION,
  keywords: ["knjigovodstvo", "računovodstvo", "Zagreb", "knjigovodstvene usluge", "financijske usluge", "accounting", "matka", "matka doo"],
  robots: "index, follow",
  authors: [{ name: "Matka", url: "https://knjigovodstvo-matka.hr" }],
  icons: {
    icon: "/favicon.ico",
  },
  openGraph: {
    title: CONST.NAME,
    description: CONST.DESCRIPTION,
    url: BASE_URL,
    siteName: CONST.TITLE,
    images: [
      {
        url: "/og-image.jpg", // Place this in /public
        width: 1200,
        height: 630,
      },
    ],
    locale: "hr",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: CONST.TITLE,
    description: CONST.DESCRIPTION,
    images: ["/og-image.jpg"],
  },
  

};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="hr">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
