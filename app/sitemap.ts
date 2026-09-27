import type { MetadataRoute } from "next";
import { site } from "../lib/site";

// Add a route only when its substantive production page is implemented for this production release.
// Experiments and reserved future routes must never be listed here.
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: `${site.url}/` },
    { url: `${site.url}/technology` },
    { url: `${site.url}/wellbeing` },
    { url: `${site.url}/about` },
    { url: `${site.url}/contact` },
    { url: `${site.url}/privacy` },
    { url: `${site.url}/terms` },
  ];
}
