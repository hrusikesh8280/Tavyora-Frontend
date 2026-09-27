# Living Signal V2 — validation and handoff

## Scope and preservation

Only `/direction-living-signal-v2` is added. A/B/C and V1 route/component sources, shared components, root layout and global styles have no diff from the `living-signal-v1` checkpoint. The root still redirects to A. The V2 study menu links to all five routes.

Git checkpoint: `living-signal-v1` at `38cebb2`. New branch: `concept/living-signal-v2`. The archive includes a complete portable Git bundle and instructions for restoring its branches/tags.

## Technical and interaction checks

- Frozen-lockfile Bun install: pass.
- ESLint: pass, zero diagnostics.
- Strict TypeScript: pass.
- Next.js production build: pass; the V2 route is statically prerendered.
- **24/24 V2 Playwright checks passed** across desktop 1440×900, tablet 1024×768 and mobile 390×844.
- The existing **21/21 V1/comparison checks also passed** during this iteration. These cover V1 interactions, reduced motion, axe and reachability of A/B/C. The complete current suite contains 45 checks.
- After the final mobile transition line-break refinement, the affected mobile scroll/pause/screenshot test was rerun and passed.
- Six V2 axe scans (initial selection and intelligence selection at all three viewports): zero violations against WCAG 2 A/AA, 2.1 AA and 2.2 AA rules. Three preserved V1 axe scans also passed.
- No uncaught exceptions or console errors recorded in V2 core-content tests.
- Keyboard skip link, focus-driven selection, Enter activation, real anchor navigation and email CTA destinations passed.
- Each selected problem changes the actual SVG routing geometry, semantic selected state and linked capability marker.
- OS reduced motion and manual pause both expose the two static transition states. Scroll-driven geometry changes and stops when paused.
- Essential proposition, capability and yoga-offering content verified with JavaScript disabled.
- Overflow checks: 1440, 1024, 768, 430, 390 and 360 widths, plus 844×390 landscape. No horizontal overflow. Problem buttons retain >=44 px height.

Tests used local Chromium 153 via the documented executable override. The previously unavailable Playwright CDN download is not needed in this environment; the external browser executable is not bundled or added as an application dependency. On a Mac, use the standard `bun x playwright install chromium` setup in README.

## Visual review

Desktop hero, complete desktop composition, mobile hero and scrolled desktop/mobile transition screenshots were inspected. Refinements made from those captures:

- Removed the opaque transition text plate by changing the path geometry to leave a real opening.
- Kept stroke widths stable as viewports narrow.
- Gave the mobile transition an intentional shorter line length so the heading clears the curve.
- Kept the skip link visually clipped until focused, including in full-page captures.

The hero is full-width typography with a signal seam, not a right-hand illustration. Technology routes are labels and connectors rather than cards. The wellbeing section uses the same bone/ink/clay environment with wider spacing and an open image contour.

## Performance

Final lab measurements are recorded below. V1 values are the previously recorded baseline in `living-signal-results.md`, not a new side-by-side field trial. Local timing varies; interpret the comparison as lab evidence, not a guarantee.

| Run | Performance | Accessibility | Best Practices | SEO |   LCP |    TBT | CLS |
| --- | ----------: | ------------: | -------------: | --: | ----: | -----: | --: |
| 1   |          99 |           100 |            100 |  63 | 1.8 s | 100 ms |   0 |
| 2   |         100 |           100 |            100 |  63 | 1.8 s |  60 ms |   0 |
| 3   |          99 |           100 |            100 |  63 | 1.8 s |  70 ms |   0 |

V1 baseline: Performance 94–97, LCP 2.3–2.8 s, CLS 0.002, initial transfer ~292 KiB. V2 final runs: initial transfer ~224 KiB (about 23% lower). Accessibility and Best Practices remain 100. All three final V2 LCP measurements are below 2.5 s under simulated mobile conditions.

The only failed Lighthouse SEO audit is intentional `noindex`. The strict SEO=100 assertion therefore exits with status 1. The route must remain non-indexable; all applicable non-indexing SEO audits passed. No sitemap entry or production canonical was added.

The V2 route preloads its two first-screen fonts, reduces inline SVG complexity and introduces no new runtime library. Wellbeing imagery remains lazy and dimensioned. No WebGL, video, autoplay or analytics. TBT is not INP, and no real-user Core Web Vitals claim is made.

## Known limitations

- Actual Safari/Firefox, physical average-Android rendering, 200% browser zoom and VoiceOver/TalkBack review remain manual acceptance checks. Axe is not a WCAG certification.
- Mobile routing changes immediately; desktop adds the short path interpolation. This is an intentional simplification, not identical animation at every breakpoint.
- The image is a visibly labelled, temporary AI-generated still life, not an actual practitioner or venue. Reuse/replacement details are in `imagery.md` and `living-signal-v2-design.md`.
- Mailto links do not submit a form or book a session. No email delivery, pricing or scheduling workflow is implied.
- Inherited V1 may emit a development-only Next Image LCP advisory when automation jumps to its below-fold image; V1 was preserved.

No production homepage/subpages, analytics, backend, deployment or DNS changes were made. Visual approval remains with the user after local comparison.
