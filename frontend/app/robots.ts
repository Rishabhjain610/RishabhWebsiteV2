import type { MetadataRoute } from "next";

const SITE_URL = "https://rishabhjain.dpdns.org";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/admin", "/.next", "/private"],
      },
      { userAgent: "Googlebot", allow: "/", crawlDelay: 0 },
      { userAgent: "Bingbot", allow: "/", crawlDelay: 1 },
      { userAgent: "YandexBot", allow: "/" },
      { userAgent: "DuckDuckBot", allow: "/" },
      {
        userAgent: "Pinterestbot",
        allow: ["/images/", "/sponsors/", "/domains/"],
      },
      { userAgent: "Twitterbot", allow: "/" },
      { userAgent: "facebookexternalhit", allow: "/" },
      { userAgent: "LinkedInBot", allow: "/" },

      // block known bad bots
      { userAgent: "AhrefsBot", disallow: ["/"] },
      { userAgent: "SemrushBot", disallow: ["/"] },
      { userAgent: "DotBot", disallow: ["/"] },
    ],
    sitemap: [`${SITE_URL}/sitemap.xml`],
  };
}
