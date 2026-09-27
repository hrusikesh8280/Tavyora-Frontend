# Production SEO

Seven indexable content routes: /, /technology, /wellbeing, /about, /contact, /privacy, /terms. Each declares a unique title/description, canonical and social metadata. metadataBase is https://tavyora.com. Essential copy is static/server-rendered. Sitemap contains exactly these seven URLs. Robots allows crawling; unknown routes and removed prototypes return branded HTTP404/noindex. No prototype files remain under app/.

Root metadata is conservative noindex; each production page explicitly opts into index/follow. Tests verify this override. Do not change it by bulk search/replace.

Factual schema only: Organization, WebSite (homepage), Service, BreadcrumbList, AboutPage/ContactPage where present. No Person identity, ratings, reviews, prices, clients, awards or download counts. Legal pages have no extra schema. Public email hello@tavyora.com.

No Search Console submission or deployment performed. At authorised launch verify real-host status/canonicals/robots/sitemap and social images. Archive contains historical phase-specific SEO notes; this file supersedes their old route counts.
