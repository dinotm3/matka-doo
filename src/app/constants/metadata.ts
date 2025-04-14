import type { Metadata } from "next";
import { BASE_URL, CONST } from "./constants";

export const metadata: Metadata = {
    title: CONST.TITLE,
    description: CONST.DESCRIPTION,
    keywords: ["knjigovodstvo", "računovodstvo", "Zagreb", "knjigovodstvene usluge", "financijske usluge", "accounting", "matka", "matka doo", "matka d.o.o."],
    robots: "index, follow",
    authors: [{ name: CONST.NAME, url: BASE_URL }],
    icons: {
      icon: "/favicon.ico",
    },
    openGraph: {
      title: CONST.TITLE,
      description: CONST.DESCRIPTION,
      url: BASE_URL,
      siteName: CONST.NAME,
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
      title: CONST.NAME,
      description: CONST.DESCRIPTION,
      images: ["/og-image.jpg"],
    },
  };