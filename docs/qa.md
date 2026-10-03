# Final production QA — 27 September 2026

Bounded pre-deployment polish, not a redesign or launch approval. Safety tag pre-final-polish-v1; source branch production/final-polish. Final local-ready tag is production-ready-local-v1.

## Commands

- `bun run lint`: PASS, executed once.
- Bun launcher segfaulted before typecheck in this environment. Equivalent package scripts used Node24/npm without changing dependencies.
- `npm run typecheck`: PASS, including Next route type generation.
- `npm run build`: PASS, all seven pages static, plus branded not-found/icon/robots/sitemap.
- Production Playwright regression: single run, axe included (results below). No duplicate standalone axe run.
- One simulated-mobile Lighthouse run on Wellbeing, the representative changed visual route (results below). No optimisation loop or repeated score-chasing.

## Visual / source checks

56 route/width captures at 1440 / 1280 / 1024 / 768 / 430 / 390 / 360: no horizontal overflow. Screenshot review covers hero/navigation/type composition and all four editorial figure states on desktop/mobile. Core layouts retained. All source image files are byte-identical to the checkpoint; no image payload increase. Existing three social graphics are 1200 × 630 and use the current brand language.

Primary text contrast on bone: ink 12.05:1, muted 5.69:1, clay 5.69:1. Axe covers rendered states; these token calculations alone do not certify every composited state.

Source audit: no public admin address, development-image label, retired prototype import or obvious private-key/token pattern. No credentials are needed for local development. This is not a security certification. Contact uses URL-encoded reviewable mailto drafts and copyable plain text, with no backend or fake sent claim.

## Historical baseline and limits

Earlier accepted local-review performance was approximately 89–92 with median LCP 2.60–2.90 s; old phase reports also show substantial run-to-run variation. These are not matched before/after measurements. A single new run cannot establish an improvement or field Core Web Vitals. Public asset bytes remain 635,997 across 26 files. No dependency or lockfile changes.

The preceding cleanup phase verified an isolated Bun frozen-lock install (615 packages) and clean development startup. Those results are reused because dependencies are unchanged; no clean installation was repeated in polish.

## Manual launch gates

Complete final-review.md on real devices: native 200% zoom, screen reader reading/focus, Safari/iOS and average Android. Automated reflow/axe is not WCAG certification. Confirm actual email delivery and owner approval of imagery/credentials. Complete legal-review.md and deployment.md before a separately authorised preview/deployment. No email, DNS, hosting, Search Console or analytics action occurred.

## Final regression results

75 passed, 12 intentionally skipped duplicate HTTP/schema checks, 0 failures; one 5.8-minute run. Desktop 1440, tablet 768 and touch 390 projects include narrower/reflow checks. All targeted axe scans passed with zero violations across seven pages and 404, including routing and contact draft states. Tests cover keyboard, selected focus, reduced motion, responsive images, rapid state selection, no autoplay/hover scene swap, metadata, factual schema, hello@, navigation, sitemap and genuine retired/unknown-route 404 responses. No new browser runtime errors were reported by route checks.

## Final representative Lighthouse result

One simulated-mobile Wellbeing run: Performance 93, Accessibility 100, Best Practices 100, SEO 100. LCP 2.926 s, CLS 0, total transfer 290,916 bytes; no run warnings. LCP remains above the 2.5 s target by about 0.43 s. No rerun or optimisation loop. This is one local lab result, not a median, matched before/after experiment or field INP measurement. Historical accepted LCP was approximately 2.60–2.90 s, so this does not demonstrate an improvement. Image source bytes did not increase. Raw report was reviewed; compact results are in archive/final-polish-lighthouse.json. Heavy raw artifacts are excluded from the clean source ZIP.

LCP element: italic hero text “with room to notice.” The report attributes 84% to render delay and 16% to simulated TTFB. Observed resources: 150,432B scripts,69,720B fonts,39,252B images,19,926B stylesheets,11,586B document; no third-party requests in this run. TBT 170 ms is a lab measure, not field INP. No additional performance intervention was made.

## V1.1 final identity / human craft pass

Local Chromium against the production static export. Runtime provides npm, not Bun; the unchanged package scripts were invoked with npm.

- `npm run lint`: passed.
- `npm run typecheck`: passed.
- `npm run build`: passed, seven content routes plus branded not-found and PNG icon assets.
- `PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH=/tmp/tavyora-chromium node scripts/check-identity-craft.mjs`: passed.
- Eight page experiences at 1440 and 390px: single H1, no horizontal overflow, correct icon references, canonical host, no public admin email/development labels, no page errors.
- Axe WCAG 2 A/AA, 2.1 AA and 2.2 AA tags: zero violations across 16 route/viewport scans.
- Keyboard activation and selected state checked on Home and Contact; touch path checked at 390px. Home reduced-motion selection settles without running animations. Four Wellbeing figures load and expose descriptive alt text.
- All eight routes pass 720px CSS reflow, an equivalent-width check for 200% desktop zoom. Actual browser zoom and screen-reader reading remain manual checks.
- Additional 768px reflow spot check passed. Screenshot capture scrolls lazy images into view before capture; blank offscreen lazy images were a capture issue, not a broken source image.
- Typography A/B/C: measured identical content/layout, desktop + 390px specimen, no overflow. Measurements and screenshots in the handoff review folder.
- Verified no source diff in SEO lib, layout metadata, sitemap, robots, approved enhancement visual components, navigation, package/lockfiles or image source files.

Initial build needed removal of stale generated `.next`/`out` references to the retired SVG icon. A browser run initially lacked the default Chromium binary and was rerun with the available executable. Both environment issues were resolved. The final result above follows the final sixteen-tone figure treatment.

No Lighthouse was run in this pass; no new score, LCP or field-performance claim is made. No production font/image payload increase, framework upgrade or new dependency. The lightweight SVG print filter needs a real low-end-device paint check before release. No deployment or merge.
