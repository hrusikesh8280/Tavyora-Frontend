# Prototype SEO boundary

Only descriptive metadata and noindex/nofollow are present. No sitemap, structured data, service library, production canonical URLs or Search Console integration has been implemented.

Noindex is deliberate for comparison prototypes and must be reviewed before any future production release. The root redirects to concept-a for convenience; that is not a creative-direction decision.

## Living Signal / eventual first release

Plan only `/`, `/technology`, `/wellbeing`, `/about`, `/contact`, `/privacy`, `/terms`. Contact eventually separates technology and yoga enquiries. No products/apps/case-studies/blog/insights/service-child routes until real substantive content exists.

Critical copy, all four capability groups and both yoga offerings are statically rendered HTML. Headings and anchor links are semantic. Prototype enquiry links are mailto links because the contact page is intentionally out of scope.

Later: unique titles/descriptions/canonicals/OG, appropriate Organization/WebSite/Service/BreadcrumbList JSON-LD, correct statuses, `app/sitemap.ts` and `app/robots.ts`. Those production files are not created in this phase. Do not set the prototype canonical to a future production URL.

**Indexing safety:** retain noindex on all study routes, prefer protected previews if ever shared, and exclude them from any future sitemap. Audit production routes individually so prototype noindex does not leak onto released pages.

**Lighthouse conflict:** the strict SEO=100 gate includes crawl/index eligibility. A deliberately noindexed prototype can fail the indexability audit. Do not remove noindex or disable that audit to manufacture a score. Report the actual prototype result and retain SEO=100 as a production gate after indexing is appropriate.

## Production homepage implementation

The current implementation is documented in `homepage-seo.md`. `/` now explicitly opts into index/follow and has production metadata, local social image and factual Organization JSON-LD. Experiments retain noindex; the sitemap lists the homepage only. No production child page, Search Console setup, deployment or ranking claim is included in this phase. Earlier preview-only notes apply to the preserved study routes, not the homepage.


## Current production routes

`/` and `/technology` are now implemented and indexable with unique metadata/canonicals. Sitemap has those two routes only. Earlier single-homepage/prototype notes are historical. Technology schema and internal-link choices are documented in `technology-seo.md`. No deployment or Search Console action has occurred.


## Current three-route release

`/`, `/technology` and `/wellbeing` are implemented and indexable, connected by real hrefs. Sitemap contains only these three routes; all experiments remain noindex. `wellbeing-seo.md` records current metadata, search-language research and factual structured data. No Person markup without a supplied identity.

## Approved Wellbeing refinement — current authority

See `human-rhythm.md` and `human-rhythm-results.md` for the focused pose-study refinement. Public email is hello@tavyora.com. Earlier sections describe historical phases. Global typography/palette and approved page architecture are unchanged; prototypes receive only the public-email replacement.
