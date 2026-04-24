import { MetadataRoute } from "next";
import { getSiteUrl } from "@/lib/site";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: ["/", "/sitemap.xml"],
      disallow: ["/.next/", "/api/"],
    },
    sitemap: getSiteUrl("/sitemap.xml"),
  };
}
