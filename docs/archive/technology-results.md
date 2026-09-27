# Production Technology — validation results

Date: 2026-09-24. Scope: one bounded homepage hero refinement and `/technology` only. Locked Living Signal V2 foundation preserved.

## Technical checks

- `bun install --frozen-lockfile`: passed (Bun 1.4.2).
- `bun run lint`: passed, no diagnostics.
- `bun run typecheck`: passed, strict TypeScript.
- `bun run test:e2e`: **117 passed, 12 intentional skips**, no failures. The skips avoid repeating shared HTTP/initial-HTML checks at every viewport.
- A subsequent visual correction connected the routing gutter precisely to the selected marker. `bun run test:technology` repeated all Technology widths and bounded homepage motion checks: **36 passed, 6 intentional skips**. A geometric assertion verifies the line starts within 1.5px of the selected marker at tablet/desktop widths.
- `bun run build`: passed. Homepage, Technology, five prototypes and metadata routes statically prerendered. No other content pages created.
- Lint/typecheck ran again after the routing correction, before the focused checks and production build.
- No runtime dependencies added. No backend, analytics, deployment or DNS changes.

## Responsive and interaction evidence

Both production pages tested at 1440, 1280, 1024, 768, 430, 390 and 360 CSS pixels. Additional 320px reflow and 720px equivalent 200% desktop reflow checks pass. No horizontal overflow. Critical CTA visibility, semantic headings, no-JavaScript content, normal/reduced motion, keyboard focus/activation, real touch tap, route geometry, interruption and working anchor/email destinations pass. No page errors or console errors in content tests.

Screenshots inspected for desktop/mobile heroes, routing alignment, page rhythm and the social image. Homepage source/template, navigation, content and layout styles remain unchanged; only the isolated hero graphic and stylesheet change visually. All prototype source files are unchanged from the approved checkpoint.

## Accessibility

Axe WCAG 2/2.1/2.2 A/AA scans report **zero violations** on both production pages at all seven widths. Existing prototype scans also pass. Skip links, landmarks, one H1, logical heading order, visible keyboard focus, >=44px interaction targets, touch selection and complete static reduced-motion states are verified.

Calculated text contrast on the locked bone background: ink **12.05:1**, muted **5.69:1**, clay **5.69:1**. Decorative mineral rules do not carry unique meaning.

Axe and emulation are not WCAG certification. Actual browser-menu 200% zoom, physical midrange Android, Safari/Firefox and VoiceOver/TalkBack review remain manual prelaunch checks. Field INP and real-user Core Web Vitals have not been measured.

## Content and release limits

- Email links open the visitor's mail client. No form or automatic email sending.
- Homepage navigation remains its approved section-anchor version. Open `/technology` directly for this phase's review; no extra homepage design or navigation work was introduced.
- No technology placeholder imagery. Existing visibly labelled illustrative AI-generated homepage wellbeing still life still needs replacement with authentic practitioner imagery.
- Both production routes are index/follow with unique canonical/social metadata. Sitemap has exactly two entries. Prototypes remain noindex. Deferred routes return 404.
- The site is not deployed and the complete seven-page release has not been built.
- Stop here. `/wellbeing` requires explicit approval of this phase.

## Production Lighthouse — three simulated-mobile runs per route

All configured assertions passed: Performance >=90, Accessibility >=95, Best Practices >=95, SEO=100. Both production routes stay indexable because they are production pages, not to influence scores.

| Route / run       | Performance | Accessibility | Best Practices | SEO |    LCP |   TBT | CLS |
| ----------------- | ----------: | ------------: | -------------: | --: | -----: | ----: | --: |
| `/` / 1           |          97 |           100 |            100 | 100 | 2.432s |  99ms |   0 |
| `/` / 2           |          99 |           100 |            100 | 100 | 1.829s |  98ms |   0 |
| `/` / 3           |          97 |           100 |            100 | 100 | 2.435s | 112ms |   0 |
| `/technology` / 1 |          99 |           100 |            100 | 100 | 1.981s | 100ms |   0 |
| `/technology` / 2 |          91 |           100 |            100 | 100 | 2.534s | 308ms |   0 |
| `/technology` / 3 |          97 |           100 |            100 | 100 | 2.407s |  90ms |   0 |

Homepage LCP: **1.83–2.44s**, median **2.43s**. Technology LCP: **1.98–2.53s**, median **2.41s**. One Technology run narrowly exceeds the 2.5s target, so consistent sub-2.5s performance is **not** claimed. Scores meet the requested gates; these are local lab observations, not field guarantees. TBT is not INP.

Audited transfer: homepage **234,004 bytes (228.5KiB)**; Technology **235,568 bytes (230.0KiB)**. Homepage baseline from the prior phase was 230,416 bytes, LCP 2.41–2.47s and Performance 97. The current homepage adds about **3.5KiB** of audited transfer, with its median LCP still about 2.43s. That baseline was recorded in a different run/session; this is an indicative comparison, not a controlled performance improvement claim.

Machine-readable measurements are in `technology-lighthouse-summary.json`. Detailed Lighthouse HTML and Playwright reports are reproducible locally and excluded from the source archive.
