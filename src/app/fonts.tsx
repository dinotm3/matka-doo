import { Inter } from "next/font/google";
import { Geist, Geist_Mono } from "next/font/google";
import { Public_Sans } from "next/font/google";
import { IBM_Plex_Sans } from "next/font/google";
import { Work_Sans } from "next/font/google";
import { DM_Sans } from "next/font/google";
import { Lato } from "next/font/google";
import { Manrope } from "next/font/google";

export const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

export const ibm_sans = IBM_Plex_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-sans",
  display: "swap",
});

export const public_sans = Public_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

export const work_sans = Work_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

export const dm_sans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

export const lato = Lato({
  weight: ["300"],
  variable: "--font-sans",
  display: "swap",
});

export const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});
