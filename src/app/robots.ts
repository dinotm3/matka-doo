import { MetadataRoute } from "next";
import { BASE_URL } from "./constants/constants";

export const dynamic = "force-static";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/", "/_next/", "/static/"],
      },
    ],
    sitemap: `${BASE_URL}/sitemap.xml`,
  };
}
