# Human Rhythm refinement — validation

Date: 2026-09-24. This document supersedes previous phase results for the current source.

## Scope preserved

`wellbeing-approved-v1` preserves the approved overall page at `0a44d0e`. Branch: `refinement/human-rhythm`. Homepage and Technology templates only change their displayed email; their shared enquiry URLs and Organization email also change to hello@. Navigation targets and styling, global colour/type tokens, all route architecture and non-Rhythm Wellbeing chapters are unchanged. Preserved prototypes only receive the public email/subject replacement.

No Zoho/admin mailbox, alias, DNS or infrastructure configuration was changed. Actual delivery to hello@ remains unverified. No email was sent.

## Automated validation

| Check                         | Result                                                  |
| ----------------------------- | ------------------------------------------------------- |
| Frozen Bun install            | Pass; no dependency changes                             |
| Lint                          | Pass                                                    |
| Typecheck                     | Pass                                                    |
| Production build              | Pass; all three production pages statically prerendered |
| Full `test:e2e`               | 153 passed; 18 intentional skips                        |
| Focused final Wellbeing suite | 36 passed; 6 intentional skips                          |

The full suite covers preserved prototype checks plus Home, Technology and Wellbeing at 1440, 1280, 1024, 768, 430, 390 and 360 CSS pixels. Shared static HTML/schema/route checks run once rather than at every viewport. The focused rerun validates the final open Breathe geometry and mobile no-JavaScript fallback. Final foreground/light-edge mask softening is checked against the production build separately.

Checks cover cross-page navigation, exact public enquiry URLs, no rendered admin@ exposure, one H1, canonical/index/social metadata, sitemap boundaries, keyboard focus, touch selection, normal/reduced/paused motion, four distinct contours, responsive images/alt, visible temporary-asset disclosure and no horizontal overflow. The initial page does not request the three unvisited figure states. All four image decodes succeed; the figure stage height stays fixed across selection. No page or console errors in content checks.

The Next development image heuristic can warn after a test scrolls straight to the illustration that it might be an LCP image. It is below the fold on a normal initial page load and intentionally remains lazy-loaded. Production Lighthouse measurements below are the performance evidence; the conditional development warning is not suppressed by eagerly downloading below-fold images.

## Accessibility

Axe WCAG 2/2.1/2.2 A/AA scans report zero violations across the three production routes at all seven widths. Final Wellbeing focused scans also pass. Additional 320px reflow and 720px equivalent 200% desktop reflow remain covered.

The figure has accurate descriptive alt text and a visible AI disclosure. Inactive figures are hidden from assistive technology; signal/light are decorative. Desktop hover, keyboard focus and click select the same state; mobile touch uses an accordion. Core page content stays visible. With JavaScript disabled, all four session descriptions are displayed on mobile. Reduced motion removes spatial light movement and SVG interpolation; there is no body morphing or image parallax.

Global text tokens are unchanged: ink 12.05:1 and muted/clay 5.69:1 on bone. The light field is confined to the illustration, not behind body copy. Motion is never necessary to understand an offering or reach an enquiry.

Automated checks are not WCAG certification. Physical browser-menu zoom, physical midrange Android, Safari/Firefox and VoiceOver/TalkBack remain prelaunch checks. Real-user INP has not been measured.

## Asset and content limits

Four temporary AI-generated figure families each have 320/480/768/1024px transparent WebP variants. The existing illustrative still life is retained. Together they form two photographic moments on Wellbeing. Actual practitioner identity, photography and consent were not supplied; no figure is presented as that person. Generated studies may have small identity/anatomical inconsistencies and are not pose instructions.

`human-rhythm.md` documents the full inventory, nine-shot replacement brief, publishing consent, alt/disclosure updates and responsive replacement checks. `human-rhythm-prompts.md` records the built-in generation prompt set. Qualifications remain owner-supplied and require the previously documented confirmation before public release.

No additional public pages, pricing, schedules, medical claims, booking backend, analytics or deployment were added. Stop for local review before About.

## Final production-browser review

Separate Playwright checks against `next start` cover all seven widths, with 2× device pixel density on 430/390/360. Image decoding, selected-figure rendering, console errors, overflow and axe are checked after the final visual masks. Results: `human-rhythm-production-browser.json`. Normal-motion interaction checks remain covered by the main/focused suites.

## Lighthouse and before/after comparison

Three simulated-mobile runs per production route, followed by three Wellbeing runs after final light-edge softening. Home and Technology source/styles were unchanged between these two audit batches. All 12 measurements are retained; the earlier Wellbeing Performance 88 run is not discarded. No claim is made that light-edge masking caused the difference between batches.

| Route / phase                      | Performance | Accessibility | Best Practices | SEO |    LCP |   TBT | CLS |
| ---------------------------------- | ----------: | ------------: | -------------: | --: | -----: | ----: | --: |
| `/` / initial refinement           |          97 |           100 |            100 | 100 | 2.443s | 110ms |   0 |
| `/` / initial refinement           |          97 |           100 |            100 | 100 | 2.131s | 141ms |   0 |
| `/` / initial refinement           |          95 |           100 |            100 | 100 | 2.501s | 170ms |   0 |
| `/technology` / initial refinement |          98 |           100 |            100 | 100 | 2.118s | 114ms |   0 |
| `/technology` / initial refinement |          94 |           100 |            100 | 100 | 2.527s | 198ms |   0 |
| `/technology` / initial refinement |          99 |           100 |            100 | 100 | 1.960s |  97ms |   0 |
| `/wellbeing` / initial refinement  |          88 |           100 |            100 | 100 | 2.700s | 356ms |   0 |
| `/wellbeing` / initial refinement  |          97 |           100 |            100 | 100 | 2.687s |  60ms |   0 |
| `/wellbeing` / initial refinement  |          97 |           100 |            100 | 100 | 2.623s |  40ms |   0 |
| `/wellbeing` / final Wellbeing     |          96 |           100 |            100 | 100 | 2.728s |  69ms |   0 |
| `/wellbeing` / final Wellbeing     |          99 |           100 |            100 | 100 | 1.994s |  48ms |   0 |
| `/wellbeing` / final Wellbeing     |          99 |           100 |            100 | 100 | 2.196s |  40ms |   0 |

Final Wellbeing runs meet the requested score gates: Performance 96–99, Accessibility 100, Best Practices 100 and SEO 100. All routes remain correctly indexable; prototypes remain noindex. CLS is 0 across every run.

| Wellbeing metric         | Approved baseline | Refined final build |
| ------------------------ | ----------------: | ------------------: |
| Performance              |                99 |               96–99 |
| LCP range                |      1.964–1.975s |        1.994–2.728s |
| Median LCP               |            1.968s |              2.196s |
| Audited initial transfer |     277,241 bytes |       283,959 bytes |
| CLS                      |                 0 |                   0 |

Initial transfer increases by **6,718 bytes (6.56KiB; 2.42%)**. The figure variants are lazy/selection-loaded; this is not the sum of all images stored in the repository. Phone screenshots at 2× density selected 768px variants; the Breathe source is 49,806 bytes. At 1× mobile density the automated suite selects a smaller source. No original generation PNG is shipped.

LCP has increased relative to the earlier session baseline, and one final run exceeds 2.5s. Median LCP remains below target, but consistently sub-2.5s is not established. Lab variance and changed payload cannot be separated conclusively from these measurements; this is not a controlled causal attribution or real-user guarantee. TBT is not INP. Real-device/field monitoring remains a prelaunch requirement.

The production-browser review reports zero axe violations, no page errors and no horizontal overflow at all seven widths. Detailed machine-readable results are included; raw build, test and Lighthouse report output is excluded from the source ZIP and reproducible using README commands.
