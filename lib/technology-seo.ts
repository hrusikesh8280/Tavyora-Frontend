import type { Metadata } from "next";
import { site, organization } from "./site";
const title = "Technology Consultancy & Software Development — Tavyora";
const description =
  "Bring Tavyora your product or technical problem. Product design, web and mobile development, backend systems, AI workflows and focused software or UX audits.";
const url = `${site.url}/technology`;
export const technologyMetadata: Metadata = {
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
        url: `${site.url}/social/tavyora-technology.png`,
        width: 1200,
        height: 630,
        alt: "Tavyora Technology — Bring the problem, not a perfect brief.",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: [`${site.url}/social/tavyora-technology.png`],
  },
};
export const technologyStructuredData = {
  "@context": "https://schema.org",
  "@graph": [
    organization,
    {
      "@type": "Service",
      "@id": `${url}#service`,
      name: "Technology consultancy and software development",
      url,
      description,
      serviceType:
        "Technology consultancy, product design and software development",
      provider: { "@id": `${site.url}/#organization` },
    },
    {
      "@type": "BreadcrumbList",
      "@id": `${url}#breadcrumb`,
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Home",
          item: `${site.url}/`,
        },
        { "@type": "ListItem", position: 2, name: "Technology", item: url },
      ],
    },
  ],
};
