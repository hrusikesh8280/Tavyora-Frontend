import type { MetadataRoute } from "next";
import { site } from "../lib/site";
export default function robots(): MetadataRoute.Robots {
  // Existing production pages are crawlable; removed prototype URLs return 404.
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: `${site.url}/sitemap.xml`,
  };
}
