import type { MetadataRoute } from "next";

const BASE_URL = "https://rishabhjain.dpdns.org";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: BASE_URL,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1.0,
    },
    // SEO Fix: add section anchors as separate sitemap entries
    // if you ever add separate pages, add them here
    {
      url: `${BASE_URL}/#about`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/#projects`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/#skills`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${BASE_URL}/#contact`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.6,
    },
    {
      url: `${BASE_URL}/#projects`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.5,
    },
    {
      url: `${BASE_URL}/#works`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.5,
    },{
      url: `${BASE_URL}/#stats`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.5,
    },{
      url: `${BASE_URL}/#achievements`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.5,
    }
  ] satisfies MetadataRoute.Sitemap;
}