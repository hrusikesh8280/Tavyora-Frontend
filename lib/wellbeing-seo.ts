import type { Metadata } from "next";
import { site, organization } from "./site";
const title = "One-to-One & Small-Group Online Yoga — Tavyora";
const description =
  "Practitioner-led online yoga with clear instruction and considered pacing. Explore one-to-one and small-group sessions, the approach and how to enquire.";
const url = `${site.url}/wellbeing`;
export const wellbeingMetadata: Metadata = {
  title,
  description,
  alternates: { canonical: url },
  robots: { index: true, follow: true },
  openGraph: {
    type: "website",
    locale: "en_IN",
    siteName: site.name,
    url,
    title,
    description,
    images: [
      {
        url: `${site.url}/social/tavyora-wellbeing.png`,
        width: 1200,
        height: 630,
        alt: "Tavyora Wellbeing — Online yoga, with room to notice.",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: [`${site.url}/social/tavyora-wellbeing.png`],
  },
};
// No Person, qualifications, offers, courses or events: practitioner identity is not supplied.
export const wellbeingStructuredData = {
  "@context": "https://schema.org",
  "@graph": [
    organization,
    {
      "@type": "Service",
      "@id": `${url}#service`,
      name: "One-to-one and small-group online yoga",
      url,
      description,
      serviceType: "Practitioner-led online yoga instruction",
      provider: { "@id": `${site.url}/#organization` },
    },
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Home",
          item: `${site.url}/`,
        },
        { "@type": "ListItem", position: 2, name: "Wellbeing", item: url },
      ],
    },
  ],
};
