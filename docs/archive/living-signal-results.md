# Living Signal — validation results

Validated 23 September 2026. This records the new direction only; the earlier A/B/C validation document is historical.

## Completed checks

- `bun install --frozen-lockfile`: pass; lockfile matches.
- `bun run lint`: pass, zero diagnostics. Generated test/Lighthouse reports are excluded from lint.
- `bun run typecheck`: pass, strict TypeScript.
- `bun run build`: pass; all four study routes statically prerendered.
- `bun run test:e2e`: **21/21 passed**, 30.5 seconds, local Chromium 153.
- Dev server startup and HTTP 200 verified by Playwright for all four routes.
- No uncaught page errors or browser console errors in the core route tests.
- Three axe scans: zero violations against WCAG 2 A/AA, 2.1 AA and 2.2 AA tags, with the problem interaction selected.
- Keyboard skip-link focus/activation and problem selector activation pass.
- Primary links, email destinations, study navigation and problem selection pass.
- Reduced-motion static pair, disabled motion control and unchanged SVG paths pass.
- No horizontal overflow at 1440, 1280, 1024, 768, 430, 390, 360 and landscape 844×390. Comparisons use document client width, including mobile viewport emulation.
- Original route components, shared components, global styles and layout have zero source diff from `concepts-v1`.

Browser projects: desktop 1440×900, tablet 1024×768 and touch mobile 390×844. The normal Playwright CDN browser download failed in this environment; an external compatible Chromium binary was selected using the documented executable override. That binary is not included in the source archive or project dependencies. Mac users should use the normal Playwright install command.

## Production Lighthouse

Three simulated-mobile runs, Lighthouse CI default mobile throttling, local production server, Chromium 153:

| Run | Performance | Accessibility | Best Practices | SEO |   LCP |   TBT |   CLS |
| --- | ----------: | ------------: | -------------: | --: | ----: | ----: | ----: |
| 1   |          97 |           100 |            100 |  63 | 2.3 s | 90 ms | 0.002 |
| 2   |          94 |           100 |            100 |  63 | 2.8 s | 70 ms | 0.002 |
| 3   |          95 |           100 |            100 |  63 | 2.8 s | 60 ms | 0.002 |

The Performance >=90, Accessibility >=95 and Best Practices >=95 assertions pass. **The SEO=100 assertion fails intentionally:** the only failed SEO audit is “Page is blocked from indexing.” Preview noindex stays in place. Do not interpret this as all requested gates passing; SEO is explicitly deferred to approved production routes. All other applicable SEO audits passed.

Initial audited transfer was about 292 KiB. No animation library, WebGL, video or remote image/font request is added by the direction. The hero is inline SVG and server-rendered HTML; the below-fold image is lazy-loaded and reserved in layout. Scroll work is requestAnimationFrame-coalesced and offscreen graphics stop updates; there is no idle decorative animation loop.

LCP did not consistently reach the <=2.5 s target in this simulation. Further optimization should follow the selected direction and actual hosting/device tests. TBT is a lab metric, not INP. These scores do not establish real-user Core Web Vitals or physical Android smoothness.

## Visual review and limitations

Desktop hero and mobile hero/wellbeing screenshots were inspected. The artwork overflow found on narrow screens was fixed by clipping the decorative signal within its own reserved frame, without hiding overflow across the page. Screenshot capture now waits for lazy-image decoding.

Temporary image: an explicitly labelled AI-generated still life, no practitioner or invented identity. Replacement art direction and files are in `imagery.md`.

A Next development warning can flag the below-fold image as LCP when automation jumps directly to wellbeing. It is deliberately lazy because it is not above the initial fold; no browser error was recorded.

Automated accessibility results are not WCAG certification. Actual VoiceOver/TalkBack, Safari/Firefox, 200% browser zoom, physical Android performance and a human full-page motion review remain manual acceptance checks in `qa.md`. No booking delivery or email-send workflow is tested: enquiries are mailto links only.

No production pages, analytics, backend, deployment or Search Console configuration were created.
