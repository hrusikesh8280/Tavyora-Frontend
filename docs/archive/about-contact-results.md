# About + Contact local-review results

## Scope and outcome
Added only `/about` and `/contact`. Home, Technology and Wellbeing remain locked; their changes are limited to shared navigation/footer integration. No new photography, other routes, backend or deployment.

## Checks
- Full ESLint: pass, no errors or warnings on final checked source.
- TypeScript (`tsc --noEmit`): pass.
- Next.js production build: pass; About and Contact prerendered as static pages.
- Targeted Playwright production suite: 7 passed, 2 intentionally skipped duplicate navigation checks, 54 seconds. `docs/about-contact-tests.json` retains this run.
- New-route checks at 1440×900, 768×900 and 390×900: semantic headings, indexable metadata/canonicals, no overflow, keyboard, touch selection, validation/error focus, review/edit, encoded email drafts, clipboard failure fallback, reduced motion and no POST submissions.
- Additional overflow checks: 1280, 1024, 430, 360 and 320 widths. Reflow at 720×450 represents the CSS viewport available from 1440×900 at 200% browser zoom; this is not an OS/browser UI zoom measurement.
- Basic regression: real navigation between all five pages; correct logo, header and footer destinations; sitemap contains five production pages.
- Axe: zero violations on About/Contact and draft-review states across the three representative widths. This does not certify WCAG compliance.
- Screenshots reviewed for desktop/tablet/mobile editorial composition.

The available Bun executable requires an unavailable musl loader in this environment. The installed Node equivalents of lint, typecheck, build and Playwright were run. Bun commands are retained for local Mac use. Dependencies were reused; no new dependency or lockfile change was needed.

## One Lighthouse run per route
Simulated mobile lab runs against production server. No repeated Lighthouse optimisation cycle.

| Route | Performance | Accessibility | Best Practices | SEO | LCP | CLS | Transfer |
|---|---:|---:|---:|---:|---:|---:|---:|
| /about | 85 | 100 | 100 | 100 | 2.870 s | 0 | 252,229 bytes |
| /contact | 87 | 100 | 100 | 100 | 2.701 s | 0 | 254,626 bytes |

Source summary: `docs/about-contact-lighthouse.json`. Raw HTML/JSON reports are retained in the working repository under `docs/lighthouse-about-contact/` (excluded from the compact source handoff). These runs preceded the final About selector correction that restricted diagram sizing to direct-child SVGs and restored normal link-arrow dimensions at tablet widths. Lighthouse was not rerun afterwards, respecting the one-run limit. Performance is below the requested 90 gate and LCP is above 2.5 seconds. No claim about real-user INP or field Core Web Vitals is made.

## Corrections during QA
The initial build caught an unscoped CSS-module state selector; it was scoped to the local enquiry component. A broad About diagram selector enlarged nested link arrows and caused tablet overflow; it was restricted to direct-child diagrams. The validation test selector was narrowed to the form error summary to avoid matching Next.js's route announcer. The final bounded suite passed after these corrections.

An exploratory CSS `zoom: 2` stress check produced overflow; CSS zoom does not trigger browser-zoom media-query behaviour. The supported automated check uses the equivalent reduced viewport. Actual browser-menu zoom and real-device Safari/Android remain manual review items.

## Remaining limitations
- No backend or verified email delivery. Mailto handling and draft-length limits vary; copyable/selectable enquiry text is provided.
- No production analytics, stored form submissions, spam/rate controls or server validation because there is no submission endpoint. These must be designed before a real backend is enabled.
- No new portraits or photos; existing Wellbeing temporary imagery still requires authentic-photo replacement before final marketing approval.
- Reused factual brand social image, with unique page text metadata.
- Native screen-reader, real-device and browser-menu zoom review remains pending.
- Historical production test expectations were updated for the new routes, but the broad historical suite was not rerun. Only the bounded suite and basic core navigation regression were run.
- Privacy, Terms and custom 404 are intentionally deferred. The framework's existing not-found behaviour remains untouched.
- No deployment approval. No DNS, Zoho, Search Console or integrations changed.
