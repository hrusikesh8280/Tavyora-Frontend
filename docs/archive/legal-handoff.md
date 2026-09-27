# Legal / 404 handoff

Local review only. Source archive: Tavyora_Legal_404_Source.zip, root folder tavyora.

## Routes

Production content and sitemap: /, /technology, /wellbeing, /about, /contact, /privacy, /terms.
Not-found test: /this-page-does-not-exist (404, noindex, not in sitemap).

## Changes

Privacy explains the voluntary enquiry fields, browser-only draft, visitor-sent email, technical infrastructure caveat, current absence of analytics/ads, purposes, third-party email handling, proportional retention, choices and notice changes.

Terms cover website information, separate engagement agreements, nonmedical yoga information, owned/third-party IP, responsible use, external services, availability, non-excludable rights, revisions and contact.

Shared footer adds Privacy and Terms; primary navigation is untouched. Not-found draws a single lost-route trace for 1.2 seconds, then stays still; reduced motion shows final geometry immediately.

## Verification and limits

See docs/qa.md, legal-tests-initial.json, legal-tests.json and legal-lighthouse.json. Lint, typecheck and production build passed using Node equivalents because Bun's supplied runtime could not execute in this environment. 13 effective Playwright checks passed after a focus-reset test correction. Axe found zero violations across the three pages and three widths. Lighthouse one run each: Privacy93, Terms91 performance; both A/BP/SEO100 and CLS0. Privacy LCP2.653s is above target; Terms2.213s. No field INP measurement. Native zoom, real-device and screen-reader manual review remain.

Owner/legal review is required before launch; see docs/legal-review.md. No assertion of legal compliance or legal approval. No new backend, analytics, deployment or blog. Existing temporary human imagery remains subject to prior replacement/marketing approval. No new image assets were added.

Raw reports and test screenshots are excluded from the clean source archive; compact QA results and reproducible test scripts are included. Existing prototype source remains preserved, unlinked from production and excluded from sitemap; this phase does not remove or restore prototype routes.
