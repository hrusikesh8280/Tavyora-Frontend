import type { Metadata } from "next";

export const site = {
  name: "Tavyora",
  url: "https://tavyora.com",
  email: "hello@tavyora.com",
  title: "Tavyora — Technology Consultancy & Online Yoga",
  description:
    "Tavyora designs and builds software, web and mobile products, and intelligent workflows, alongside practitioner-led one-to-one and small-group online yoga.",
} as const;

export const homepageMetadata: Metadata = {
  title: site.title,
  description: site.description,
  alternates: { canonical: `${site.url}/` },
  robots: { index: true, follow: true },
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: `${site.url}/`,
    siteName: site.name,
    title: site.title,
    description: site.description,
    images: [
      {
        url: `${site.url}/social/tavyora-home.png`,
        width: 1200,
        height: 630,
        alt: "Tavyora — Useful systems. Thoughtful practice. Technology and online yoga.",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: site.title,
    description: site.description,
    images: [
      {
        url: `${site.url}/social/tavyora-home.png`,
        alt: "Tavyora — Useful systems. Thoughtful practice.",
      },
    ],
  },
};

// Only business facts supplied by the owner. No products, ratings or unverified profiles.
export const organization = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": `${site.url}/#organization`,
  name: site.name,
  legalName: site.name,
  url: `${site.url}/`,
  email: site.email,
  description:
    "An independent business offering technology consultancy, software and product development, and practitioner-led online yoga.",
  address: { "@type": "PostalAddress", addressCountry: "IN" },
};

export const homepageStructuredData = {
  "@context": "https://schema.org",
  "@graph": [
    organization,
    {
      "@type": "WebSite",
      "@id": `${site.url}/#website`,
      url: `${site.url}/`,
      name: site.name,
      publisher: { "@id": `${site.url}/#organization` },
    },
  ],
};
