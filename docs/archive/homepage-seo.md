# Homepage SEO implementation

## Implemented in this phase

- Static/server-rendered `/` with one visible H1, semantic section headings, normal anchor links and equivalent meaningful mobile content.
- Title: **Tavyora — Technology Consultancy & Online Yoga**.
- Description: **Tavyora designs and builds software, web and mobile products, and intelligent workflows, alongside practitioner-led one-to-one and small-group online yoga.**
- Canonical root: `https://tavyora.com/` (Next.js normalizes the emitted root URL to `https://tavyora.com`; these identify the same resource).
- Explicit homepage robots index/follow. Root layout retains a safe noindex default for experiments; the homepage explicitly overrides it. Browser and initial-HTML tests check the resulting values.
- Open Graph website metadata, `en_IN`, site name, canonical URL, title, description and a 1200×630 local PNG.
- Twitter `summary_large_image` with title, description and the same image. No unverified social account handle.
- The social image follows the approved typography and signal geometry. It is generated once from local fonts by `scripts/generate-social.mjs`, stored at `public/social/tavyora-home.png`, and requires no runtime image service.
- One factual Organization JSON-LD object: official name/legal name Tavyora, website, email, description and country India. No ratings, awards, clients, products, contact names, full address, D-U-N-S number or social profiles are fabricated.
- `app/sitemap.ts` lists only the homepage. Future routes and all prototypes are excluded. No artificial daily lastmod.
- `app/robots.ts` allows crawling and references the absolute sitemap URL. It intentionally does not block prototype crawling; noindex requires crawlers to read the page.
- All unbuilt production pages remain genuine 404 responses. Homepage navigation avoids those routes.

## Preserved prototype safety

`/concept-a`, `/concept-b`, `/concept-c`, `/direction-living-signal` and `/direction-living-signal-v2` remain noindex. No homepage navigation, footer or sitemap entry exposes them. Keep any later public previews protected. This local build's homepage is intentionally indexable as requested; it has not been deployed.

## Reserved first-release architecture

| Route         | Purpose                                             | Current status           |
| ------------- | --------------------------------------------------- | ------------------------ |
| `/`           | Explain Tavyora and route technology/yoga enquiries | Built for local approval |
| `/technology` | Detailed problem-led consultancy and capabilities   | Not built; next phase    |
| `/wellbeing`  | Practitioner, approach and actual online offerings  | Not built                |
| `/about`      | Story and operating philosophy                      | Not built                |
| `/contact`    | Distinct technology/yoga enquiry paths              | Not built                |
| `/privacy`    | Actual data handling                                | Not built                |
| `/terms`      | Actual site/service terms                           | Not built                |

No products, apps, case studies, blog, insights, service children or yoga catalogue routes exist. Add content only when there is substantive evidence and a user need.

## Sources checked

- Google Search Central, Organization structured data: https://developers.google.com/search/docs/appearance/structured-data/organization
- Google Search Central, noindex: https://developers.google.com/search/docs/crawling-indexing/block-indexing
- Installed Next.js App Router docs for Metadata, sitemap, robots and Server/Client Components.

Google recommends using only Organization properties that actually apply. Robots.txt blocking does not replace noindex. Structured data and technical quality support understanding/crawlability; they do not guarantee indexing, rich results or ranking.

## Later launch work, not done here

Approved remaining pages, final photographs, actual privacy/terms, hosting/domain redirects, protected previews, DNS/mail preservation, Search Console verification/submission, URL inspection, structured-data validation against the public URL and real-user monitoring. Analytics/consent decisions remain separate. No `llms.txt` or meta-keywords are added.
