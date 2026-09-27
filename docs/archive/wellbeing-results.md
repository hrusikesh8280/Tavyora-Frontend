# Wellbeing phase — validation and handoff

Date: 2026-09-24. Current authority for this phase; earlier result documents describe historical checkpoints.

## Scope and preservation

Added only `/wellbeing`. Homepage and Technology visual design, styles and motion are unchanged from `technology-approved-v1`. Their permitted navigation/CTA changes connect `/`, `/technology` and `/wellbeing`; email remains the interim enquiry destination. All five prototypes are preserved and remain noindex. No other production pages, deployment, analytics or DNS work was performed.

Checkpoint: `technology-approved-v1` at `b95b16f`. Implementation branch: `production/wellbeing`. The ZIP contains complete source and a portable Git history bundle.

## Commands and browser checks

| Check                                           | Result                                                  |
| ----------------------------------------------- | ------------------------------------------------------- |
| `bun install --frozen-lockfile`                 | Pass; lockfile unchanged                                |
| `bun run lint`                                  | Pass                                                    |
| `bun run typecheck`                             | Pass                                                    |
| `bun run test:e2e`                              | 146 passed; 18 intentional skips                        |
| Strengthened finite-animation/static HTML check | 1 additional focused test passed                        |
| `bun run build`                                 | Pass; all three production pages statically prerendered |

The skips avoid repeating route-independent schema/HTML checks at every viewport; these checks run at 1440px. The full suite includes the five preserved studies and all three production routes. Production widths: 1440, 1280, 1024, 768, 430, 390 and 360 CSS pixels. Additional 320px and 720px equivalent 200% desktop reflow checks pass.

Verified real cross-page navigation, homepage exploration links, working email/anchor destinations, no links to unbuilt production pages, one H1, heading order, canonical/robots/social metadata, initial HTML and factual structured data. All three production URLs appear in the sitemap; prototypes do not. Deferred pages return 404. No console or page errors in content checks.

Interaction checks cover keyboard focus/activation, real touch taps, distinct session contours, interrupted selection, manual motion pause, OS reduced motion and finite hero settling. Image decoding, dimensions, responsive source and visible disclosure pass. Desktop/tablet/mobile screenshots were inspected, including the final independent narrow hero and editorial-pause contours.

## Accessibility

Axe WCAG 2/2.1/2.2 A/AA scans: **zero violations** on all three production routes across all seven widths. Existing prototype scans also pass. Visible focus, skip links, semantic landmarks, readable static content, 44px navigation targets and no horizontal overflow are checked.

Locked base text contrast: ink 12.05:1; muted/clay 5.69:1 on bone. Even the conservative full-strength warm field yields ink 10.46:1 and muted/clay 4.94:1; the actual field is only 18% opacity. Decorative contour colour is not the only carrier of meaning.

Automated checks are not WCAG certification. Physical browser-menu 200% zoom, midrange Android hardware, Safari/Firefox and VoiceOver/TalkBack remain manual prelaunch checks. Emulated reflow is not a claim of physical zoom testing.

## Design, motion and content

The page uses the approved type families, grid and semantic palette. Its distinction is open contour spacing, a quiet warm light field and editorial pacing. The selected headline explicitly names online yoga while giving the composition its own rhythm. No alternate brand or generic green wellness theme was introduced.

Breath openings are finite, pause offscreen and settle. Session selection changes one SVG contour; transitions can be interrupted and become immediate static states with reduced motion. Descriptions remain visible HTML. No continuous decorative loop, forced breathing timer, audio, video, WebGL or new runtime dependency.

One existing AI-generated still life appears below the fold using responsive local WebP files. It is visibly labelled illustrative, not an actual practice space. No practitioner likeness or identity was invented. Replacement photography brief and inventory: `wellbeing-imagery.md`.

The two offerings and master's degree are owner-supplied facts. Exact credential wording, practitioner consent and session-description accuracy need practitioner confirmation before public release; see `wellbeing-claims.md`. No invented schedules, prices, group sizes, outcomes or medical claims.

## Known limits and next phase

Enquiries open the visitor's email client; there is no booking service or contact form. Authentic practitioner photography remains outstanding. This is a local three-page review, not a launched complete website. Field INP and real-user Core Web Vitals have not been measured. `/about` is next only after explicit approval; no further routes were built.

## Lighthouse — production simulated mobile

Three initial runs per route, followed by three isolated Technology runs to investigate one slow initial run. All 12 measurements are retained below; none discarded. The configured LHCI aggregate assertions pass for all three URLs. This does not mean every individual run meets the gate.

| Route / batch                        | Performance | Accessibility | Best Practices | SEO |    LCP |   TBT | CLS |
| ------------------------------------ | ----------: | ------------: | -------------: | --: | -----: | ----: | --: |
| `/` / initial                        |          98 |           100 |            100 | 100 | 1.981s | 141ms |   0 |
| `/` / initial                        |          99 |           100 |            100 | 100 | 1.872s | 100ms |   0 |
| `/` / initial                        |          99 |           100 |            100 | 100 | 1.967s | 107ms |   0 |
| `/technology` / initial              |          97 |           100 |            100 | 100 | 2.421s |  96ms |   0 |
| `/technology` / initial              |          96 |           100 |            100 | 100 | 2.458s | 136ms |   0 |
| `/technology` / initial              |          72 |           100 |            100 | 100 | 3.264s | 896ms |   0 |
| `/wellbeing` / initial               |          99 |           100 |            100 | 100 | 1.968s |  57ms |   0 |
| `/wellbeing` / initial               |          99 |           100 |            100 | 100 | 1.975s |  56ms |   0 |
| `/wellbeing` / initial               |          99 |           100 |            100 | 100 | 1.964s |  77ms |   0 |
| `/technology` / technology follow-up |          99 |           100 |            100 | 100 | 1.858s | 111ms |   0 |
| `/technology` / technology follow-up |          92 |           100 |            100 | 100 | 2.173s | 295ms |   0 |
| `/technology` / technology follow-up |          95 |           100 |            100 | 100 | 2.482s | 164ms |   0 |

Wellbeing scores Performance **99** in all three runs, with LCP **1.96–1.98s** and CLS **0**. Accessibility, Best Practices and SEO score **100** across every route/run.

The initial Technology slowdown scored 72 with LCP 3.26s and TBT 896ms, including a 946ms JavaScript task. Its isolated follow-up scores are listed above. The approved Technology implementation is unchanged except for links; the observed variability does not establish a cause. Consistent sub-2.5s results on every route/hardware are not claimed. TBT is not INP.

- `/` audited transfer: 240,206–240,206 bytes.
- `/technology` audited transfer: 238,322–238,322 bytes.
- `/wellbeing` audited transfer: 277,241–277,241 bytes.

Prior-phase homepage LCP was 1.83–2.44s and Technology 1.98–2.53s. These are separate-session observations, not a controlled improvement comparison. Wellbeing has no prior production baseline. Local lab results do not guarantee field performance. Machine-readable evidence: `wellbeing-lighthouse-summary.json`; detailed reports can be reproduced with the README commands.
