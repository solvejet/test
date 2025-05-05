// src/app/robots.ts
import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  const baseUrl = process.env["NEXT_PUBLIC_BASE_URL"] || "https://solvejet.net";

  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/api/", "/admin/", "/internal/"],
    },
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
