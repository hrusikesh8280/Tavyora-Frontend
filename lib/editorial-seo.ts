import type { Metadata } from "next";
import { site, organization } from "./site";
const pages = {
  about: {
    title: "About Tavyora — Different Disciplines, Shared Attention",
    description:
      "Meet Tavyora, an independent India-based business working in technology and practitioner-led online yoga. Two distinct disciplines, a shared standard of attention.",
  },
  contact: {
    title: "Start a Conversation — Tavyora",
    description:
      "Talk with Tavyora about a technology project or online yoga. Prepare an enquiry, review your email draft and continue in your own email app.",
  },
};
export function editorialMetadata(page: keyof typeof pages): Metadata {
  const { title, description } = pages[page];
  const url = `${site.url}/${page}`;
  return {
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
          url: `${site.url}/social/tavyora-home.png`,
          width: 1200,
          height: 630,
          alt: "Tavyora — Useful systems. Thoughtful practice.",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [`${site.url}/social/tavyora-home.png`],
    },
  };
}
export function editorialSchema(page: keyof typeof pages) {
  const url = `${site.url}/${page}`;
  return {
    "@context": "https://schema.org",
    "@graph": [
      organization,
      {
        "@type": page === "about" ? "AboutPage" : "ContactPage",
        "@id": `${url}#page`,
        url,
        name: pages[page].title,
        description: pages[page].description,
        about: { "@id": `${site.url}/#organization` },
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
          {
            "@type": "ListItem",
            position: 2,
            name: page === "about" ? "About" : "Contact",
            item: url,
          },
        ],
      },
    ],
  };
}
