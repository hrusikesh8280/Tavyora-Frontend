# Tavyora V1.1 — identity and human craft review

Branch: `enhancement/site-v1.1`. Baseline: `767c8c5`. Local review only; no merge, push or deployment.

## Boundaries preserved

Homepage hero, Product System/control-point code and approved Technology story components are unchanged. Production font loading, global typography tokens, navigation, architecture, routes, canonicals, schema, sitemap, robots and hostname remain unchanged. Changes are selective copy/heading rhythm, raster identity, wellbeing editorial treatment, and review artifacts.

## Typography decision

Retain **Inter + IBM Plex Serif**. Changing the supporting headline rhythm resolves the repeated statement/italic response more directly than replacing the family. The surviving serif accents have a clearer role. Inter maintains the strongest small-text presence; Plex Serif keeps the existing warmer editorial register.

The three identical specimens are available at `/review/typography.html` (noindex, not in navigation or sitemap). Each includes home hero, Technology hero, reading paragraph, navigation, capability heading, wellbeing excerpt and a 390px mobile specimen. Shared desktop text measure is 600px, mobile text measure 324px. All content, sizes, spacing and controls are identical; only families change.

| Direction | Family files on disk | Desktop specimen height | Mobile specimen height | Assessment |
| --- | ---: | ---: | ---: | --- |
| A Inter + IBM Plex Serif | 88,736 bytes | 1,483px | 1,843px | Strong interface readability; retains established contrast and brand continuity. Recommended. |
| B IBM Plex Sans + IBM Plex Serif | 63,068 bytes | 1,490px | 1,823px | Cohesive, more technical/humanist voice. Mobile opening paragraph saves one line, but no decisive overall improvement. |
| C Source Sans 3 + Source Serif 4 | 55,876 bytes | 1,475px | 1,784px | Compact, softer editorial voice; smaller apparent body size at identical CSS size. Would need optical retuning. |

Payload figures are file sums, not directly comparable production transfer benchmarks: A includes a variable sans file; B/C are static regular samples plus regular/italic serif. The specimen loads only faces it uses, and its review chrome also uses Inter. A production replacement would need weight/subset planning. No new fonts are loaded by production pages.

All specimens fit without horizontal overflow. At mobile, the introductory body paragraph is 112px in A and 84px in B/C; the Technology paragraph is 112px in all three. Shared 600px desktop paragraphs remove font-dependent `ch` measure as a comparison confound.

Arabic is a future coordinated typography exercise, not solved by any of these Latin specimens. Plex offers a related Arabic design direction, but shaping, RTL, Arabic/Latin pairing, weights and actual language fonts must be tested before selection. No Arabic payload or unsupported multilingual capability is implied by this review.

## Copy and rhythm

No production hero was redesigned. Home/Technology/Wellbeing signature hero wording remains. Across the five main page source files, headings containing italic emphasis fell from 27 to 7 (excluding child-component headings); this is a rhythm measurement, not a stylistic quota.

Examples:

| Before | After | Purpose |
| --- | --- | --- |
| Understand first. Build deliberately. | Understand before building. | One clear instruction, less slogan pairing. |
| A clear next step. A considered scope. | Start with a manageable scope. | Concrete engagement expectation. |
| Room to move. Time to notice. | Online yoga at your pace. | Home preview explains the actual offering. |
| A useful next step. | What would you like to work on? | Natural conversation, less generic brand phrasing. |
| Keep the thinking connected. | Work through the trade-offs. | Describes actual work. |

Copy removed because the visuals carry the idea:

- Home Technology: “Explore how design, software and the systems behind them connect.” Product System shows those relationships.
- Technology diagnostic introduction: “Choose the situation closest to yours. See how the same system can be built, repaired or connected.” Explicit control points and state visuals already explain the choice and response.
- Redundant wellbeing editorial echo: “Progress has its own pace.” Kept the stronger single line, “Practice creates room to notice.” This is a voice reduction, not information moved into graphics.

`identity-copy-changes.json` records the initial replacement pairs; the final source diff is authoritative. Literal capability labels and essential meaning remain HTML, including all visual-stage labels and supporting explanations.

Route audit: Home and Technology shortened; Wellbeing supporting headings made more direct without changing its session story; About supporting headings clarify the business and operating style; Contact uses natural questions, with existing draft validation/hand-off preserved. Privacy only loses the implementation jargon “production” before analytics. Terms already reads plainly and is unchanged. 404 retains its signal headline with a shorter recovery explanation.

No new customer, outcome, scale or medical claims were introduced. The professionally qualified/master’s-degree wording was already owner-approved; this pass does not independently verify credentials. No practitioner identity is invented. Public contact remains hello@tavyora.com. Contact still prepares a draft for the visitor’s email app; it does not send to a backend.

## Images

Four same-subject scenes retain their original composition and slow, deliberate behaviour. Sixteen warm ink levels, a very small edge softening and existing signal aperture/occlusion make the images editorial studies rather than documentary-looking portraits. The same treatment is applied across all poses. No source image bytes, variants or downloads were added. See `docs/assets.md` for the complete 18-file temporary inventory and authentic replacement plan.

## Identity

96px PNG search/browser icon and 180px Apple icon use the existing geometric t with a restrained rust terminal. Reviewed at 16, 24, 32 and 48px. The automatic SVG icon was removed to avoid duplicate primary references. No manual icon metadata overrides. Keep icon URLs stable. Raster support does not guarantee immediate Google Search display.

## Validation and limitations

See `docs/qa.md` for final run results. Automated axe is not WCAG certification. Real-device Safari, assistive-technology reading and actual browser 200% zoom remain manual review items; the automated check uses equivalent CSS reflow. No Lighthouse optimisation loop or new performance claim. Image and font file transfer budgets did not increase on production pages; filter paint cost has not been measured on low-end hardware. Review fonts are isolated to the noindex specimen. Owner approval of the artistic treatment/rights, genuine practitioner photography, existing legal review and actual hello@ delivery remain separate checks.
