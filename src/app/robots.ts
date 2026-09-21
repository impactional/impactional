import type { MetadataRoute } from "next";

import { siteUrl } from "@/content/site";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/", disallow: "/design-system" },
    host: siteUrl,
    sitemap: `${siteUrl}/sitemap.xml`,
  };
}
