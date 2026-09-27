import type { Metadata } from "next";
import { site } from "./site";
export function legalMetadata(page: "privacy" | "terms"): Metadata {
  const title =
    page === "privacy" ? "Privacy Notice | Tavyora" : "Website Terms | Tavyora";
  const description =
    page === "privacy"
      ? "How information is handled when you use the Tavyora website, prepare an enquiry or contact us by email."
      : "Terms for using the Tavyora website, making technology enquiries and reading information about online yoga.";
  return {
    title,
    description,
    alternates: { canonical: `${site.url}/${page}` },
    robots: { index: true, follow: true },
    openGraph: {
      title,
      description,
      url: `${site.url}/${page}`,
      type: "website",
      siteName: site.name,
      images: [
        {
          url: "/social/tavyora-home.png",
          width: 1200,
          height: 630,
          alt: "Tavyora",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: ["/social/tavyora-home.png"],
    },
  };
}
