# Production homepage — validation results

Validated 24 September 2026. Approved design checkpoint: `living-signal-approved-v1` (`4a74c87`). Production branch: `production/homepage`. This is the homepage-only local review build; it has not been deployed.

## Completed technical gates

| Check                              | Result                                                             |
| ---------------------------------- | ------------------------------------------------------------------ |
| `bun install --frozen-lockfile`    | Pass; existing lockfile resolves without changes                   |
| `bun run lint`                     | Pass; zero diagnostics                                             |
| `bun run typecheck`                | Pass; strict TypeScript                                            |
| `bun run test:e2e`                 | 81 passed, 6 intentionally skipped duplicate checks; zero failures |
| `bun run build`                    | Pass; `/`, prototypes, robots and sitemap statically prerendered   |
| `bun run test:lighthouse:homepage` | Pass; all configured category assertions                           |

The full Playwright run took approximately 2.5 minutes. It includes 45 preserved-study checks and 36 homepage checks. The six skips avoid repeating the same shared HTTP/sitemap verification across six additional viewport projects; that test passed at 1440px. They are not unresolved failures.

## Browser and accessibility coverage

Homepage projects: **1440, 1280, 1024, 768, 430, 390, 360** CSS pixels. Desktop heights 900px; mobile heights 844px. Chromium 153, Bun 1.4.2 and Node 24.19.0 in this environment.

- Seven homepage axe scans: **zero violations**, using WCAG 2 A/AA, 2.1 AA and 2.2 AA rule tags. Nine additional preserved-study axe scans also passed.
- One visible H1, logical visible heading levels, named main/navigation/footer, skip link, visible focus and accessible control names verified.
- Normal keyboard traversal, skip-link focus on main, Enter activation, focus-driven technology selection, all four routing geometries and interrupted selection passed.
- Primary CTAs, real in-page anchors, email destinations and navigation passed. No production link leads to an unbuilt page.
- Normal scroll morph, manual pause and OS reduced motion passed; the static pair remains understandable without animation.
- No horizontal overflow at the seven target widths or additional 320px reflow. Navigation/problem controls meet the tested 44px minimum height.
- 200% equivalent layout reflow passed at 720 CSS pixels for a 1440px display. Native browser zoom shortcuts do not alter the headless runner, so this is explicitly an equivalent reflow simulation, not a browser-menu zoom certification.
- Critical copy, capabilities and current yoga offerings verified with JavaScript disabled.
- No page exceptions or browser console errors recorded by homepage content tests.
- Desktop hero/complete composition, mobile hero/new principles/closing, transition states and the social preview PNG were visually inspected.

An earlier assertion expected a literal trailing slash on the canonical. Next.js normalizes the root URL; the assertion now accepts the equivalent root form. No product code change or indexing workaround was needed.

## Production Lighthouse — three simulated-mobile runs

| Run | Performance | Accessibility | Best Practices | SEO | LCP | TBT | CLS |
|---|---:|---:|---:|---:|---:|---:|---:|---:|
| 1 | 97 | 100 | 100 | 100 | 2.466 s | 120 ms | 0 |
| 2 | 97 | 100 | 100 | 100 | 2.431 s | 100 ms | 0 |
| 3 | 97 | 100 | 100 | 100 | 2.412 s | 90 ms | 0 |

Every measured LCP is within the <=2.5 s target, though the margin is modest and should be checked on actual devices/hosting. Initial audited transfer: **230,416 bytes, about 225 KiB**. The earlier V2 prototype recorded about 224 KiB. Homepage copy/metadata and the extra section add little transfer; no new runtime dependency was introduced. The 48 KiB social image is not loaded as a homepage hero asset.

The historical V2 run reported 1.8 s LCP and Performance 99–100. The fuller homepage measured 2.41–2.47 s here; these are not a controlled same-session A/B comparison. Do not claim an LCP improvement over that prototype result. The homepage meets the requested lab gates. Field LCP/INP/CLS remain unmeasured. Lab TBT is not INP.

SEO=100 now follows the approved production purpose: the homepage is explicitly indexable. Prototypes stay noindex and remain excluded from the sitemap; their lower historical SEO score was intentional.

## Metadata and preservation

- HTTP 200 at `/`, production title/description, root canonical, Open Graph/Twitter PNG and factual Organization JSON-LD passed browser and initial-HTML checks.
- Social PNG exists at 1200×630. Sitemap contains exactly the canonical homepage URL. Robots permits crawling and names the sitemap.
- All five prototype URLs still return pages with noindex metadata. Their route/component sources, shared components and global styles have no source diff from the approved checkpoint.
- `/technology`, `/wellbeing`, `/about`, `/contact`, `/privacy`, `/terms` and excluded future content routes return 404. No stub or thin content pages were created.
- Organization JSON-LD syntax/content were checked locally. Public Google Rich Results/URL Inspection tests and indexing checks have not been performed because nothing was deployed.

## Temporary assets and known limits

The existing AI-generated yoga still life is retained with the visible “ILLUSTRATIVE IMAGE / AI-GENERATED” caption. It is not a photograph of the practitioner or an actual venue. Authentic practitioner photography and permissions remain a later owner input. See `imagery.md`.

Actual browser-menu 200% zoom, VoiceOver/TalkBack, Safari/Firefox and physical average-Android testing remain manual prelaunch work. Automated axe/reflow tests do not establish complete WCAG conformance. Enquiry links open a mail client; they do not test message delivery or booking. There is no analytics, form, backend, database or persisted preference.

No deployment, domain/DNS work, Zoho Mail change or Search Console configuration occurred. The remaining six first-release pages and actual privacy/service terms are not built. Stop here for local homepage approval; `/technology` is the next separate phase.
