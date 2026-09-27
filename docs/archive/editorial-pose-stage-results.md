# Editorial Pose Stage — validation

## Scope and baseline

Before: approved Human Rhythm checkpoint `29d85ef` / `human-rhythm-approved-v1`. After: `refinement/editorial-pose-stage`.

`app/page.tsx`, `app/technology/page.tsx`, `app/wellbeing/page.tsx` and all 16 figure assets are byte-identical to the checkpoint. The only production implementation changes are `Rhythm.tsx` and rhythm-scoped rules in `wellbeing.module.css`. No dependency, route, metadata, global token, email or navigation change.

## Visual inspection

Reviewed all four states at 1440 and 390px, plus full session composition at 1440, 1280, 1024, 768, 430, 390 and 360px. Fixed an Arrive aperture crop discovered in the first screenshot pass before final tests. Foreground geometry is independently routed below upper body/face; mobile uses fewer contours. The desktop rows are unchanged. Labels about AI generation have moved out of the figure composition into `assets.md`.

## Limits

These are Chromium lab checks, not real-user Core Web Vitals or a WCAG certification. Safari/Firefox, physical Android hardware and VoiceOver/TalkBack require prelaunch spot checks. Reflow is tested, but an emulated narrow viewport is not a complete real-browser 200% zoom assessment. First-use pose changes can wait for image decoding on a slow connection; the previous figure is retained in that interval. Temporary generated figures must be replaced with authentic practitioner photography before final public marketing approval. Existing practice-space still-life provenance is unchanged.

No deployment and no `/about` implementation are included.

## Technical checks

- `bun run lint`: pass.
- `bun run typecheck`: pass.
- `bun run build`: pass; production pages remain statically generated; no new routes.
- `bun run test:e2e`: **153 passed, 18 intentionally skipped**, 6.8 minutes. The skips avoid repeating desktop-only static/schema checks at every viewport; they are not failures.
- Production route regressions: `/`, `/technology`, `/wellbeing` at 1440, 1280, 1024, 768, 430, 390 and 360px, including normal/reduced motion, keyboard/focus, mobile touch, enquiry URLs, heading/meta/canonical checks, responsive image selection and no horizontal overflow. Historical prototype tests also pass.
- axe WCAG-tagged scans: zero violations in the suite and separate production-browser review at all seven widths. Machine-readable review: `pose-stage-production-browser.json`; additional all-pose desktop/mobile art review: `pose-stage-art-browser.json`.
- No production page errors. Next's development-only LCP/image advisory can appear after scripted scrolling to the below-fold study. Assets remain intentionally lazy loaded; this is not a production error or a reason to preload every pose.

## Lighthouse comparison

Nine new simulated-mobile runs (three per production route), after the browser suite finished. Historical raw reports were separated before running assertions on these nine results only. LHCI median score assertions pass. One unchanged-homepage run scores 82; therefore this is not an all-runs Performance ≥90 result. No reruns are substituted for outliers.

| Route         | Performance | Accessibility | Best Practices | SEO |    LCP |   TBT | CLS | Initial transfer |
| ------------- | ----------: | ------------: | -------------: | --: | -----: | ----: | --: | ---------------: |
| `/`           |          99 |           100 |            100 | 100 | 1.829s |  92ms |   0 |    240,984 bytes |
| `/`           |          96 |           100 |            100 | 100 | 2.614s | 127ms |   0 |    240,984 bytes |
| `/`           |          82 |           100 |            100 | 100 | 2.672s | 597ms |   0 |    240,984 bytes |
| `/technology` |          99 |           100 |            100 | 100 | 1.815s | 116ms |   0 |    239,109 bytes |
| `/technology` |          97 |           100 |            100 | 100 | 2.422s |  98ms |   0 |    239,109 bytes |
| `/technology` |          97 |           100 |            100 | 100 | 2.424s | 103ms |   0 |    239,109 bytes |
| `/wellbeing`  |          98 |           100 |            100 | 100 | 2.228s | 102ms |   0 |    284,647 bytes |
| `/wellbeing`  |          96 |           100 |            100 | 100 | 2.640s |  82ms |   0 |    284,647 bytes |
| `/wellbeing`  |          97 |           100 |            100 | 100 | 2.690s |  53ms |   0 |    284,647 bytes |

| Wellbeing metric         | Prior final Human Rhythm | Editorial Pose Stage |
| ------------------------ | -----------------------: | -------------------: |
| Performance              |                    96–99 |                96–98 |
| Median LCP               |                   2.196s |               2.640s |
| LCP range                |             1.994–2.728s |         2.228–2.690s |
| CLS                      |                        0 |                    0 |
| Initial transfer         |            283,959 bytes |        284,647 bytes |
| Lighthouse Accessibility |                      100 |                  100 |

Transfer rises by **688 bytes (0.24%)**; all photographic assets are byte-identical. The below-fold selection-loaded pose images are not all part of the initial transfer. The latest score range is comparable, but measured median LCP increased by 0.444s, and two of three runs exceed 2.5s. Consistently sub-2.5s is **not established**. A small payload change and noisy results on the unchanged homepage do not prove the cause of the timing difference. The historical baseline was not measured as a randomized paired experiment. Keep the complete measurements; do not claim an LCP improvement.

All nine runs score 100 for Accessibility, Best Practices and SEO; all have CLS 0. TBT is a lab metric, not a measurement of real-user INP. JSON measurements: `pose-stage-lighthouse-summary.json`.
