> Current phase: production Home + Technology + Wellbeing. Earlier prototype checklists below are historical; the final section defines current route/indexing gates.

# Living Signal — QA checklist

This is the review gate for `/direction-living-signal`, not permission to build production pages. See `docs/living-signal-results.md` for actual measured results.

## Automated commands

```sh
bun install --frozen-lockfile
bun x playwright install chromium
bun run lint
bun run typecheck
bun run test:e2e
bun run build
bun run test:lighthouse
```

Stop any existing development server in the same checkout before Playwright; the test runner starts and stops its own server on port 3108. Lighthouse uses a production server on 3109 after a successful build. Test dependencies do not enter the production client bundle.

`PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH` optionally selects an already installed Chromium for constrained CI environments. Normal Mac use needs no override. Lighthouse may need `CHROME_PATH` set to an installed Chrome executable. Test output remains in ignored folders, excluded from delivery source.

## Visual

- Check hierarchy, line lengths, letter spacing, wrapping, section intervals and column alignment.
- Inspect hero and complete page at 1440, 1280, 1024, 768, 430, 390 and 360 widths.
- Compare desktop and mobile compositions rather than expecting a scaled desktop.
- Ensure signal geometry does not obscure text, push content or create horizontal overflow.
- Confirm the core palette and typography persist across technology and wellbeing.
- Confirm temporary image disclosure remains visible.

## Functional

- Test the skip link and main navigation anchors.
- Test all four situation selectors and the selected state/description.
- Test the study menu and all three preserved comparison routes.
- Confirm email enquiry links identify the correct enquiry type. They open a mail client; they do not automatically send or submit an enquiry.
- Verify links and controls have meaningful accessible names.
- Check focus order, visible focus, Enter/Space activation, and no keyboard traps.

## Mobile

- Inspect 360/390/430 widths and both 768/1024 tablet layouts.
- Check 844×390 landscape and a real phone when available.
- Check comfortable touch targets and no hover-dependent content.
- Confirm all four capability groups and both yoga formats remain readable without interaction.
- Confirm no page-level horizontal scrolling at narrow widths or 200% zoom.

## Motion

- Test normal motion and the Pause motion control.
- Test system `prefers-reduced-motion`; expect two static transition states and all text/controls.
- Scroll freely in both directions; there must be no pinning, scroll capture or forced timeline.
- Verify decorative animation stops offscreen and no continuous idle loop runs.
- Pointer effect must be absent on touch devices.
- Observe a midrange Android phone for dropped frames; emulation alone cannot certify this.

## SEO / content

- Exactly one meaningful H1; logical H2/H3 hierarchy.
- Read critical content in generated HTML with JavaScript disabled.
- Verify ordinary anchor hrefs and semantic nav/section elements.
- Check title/description and explicit prototype noindex.
- Canonical deliberately absent on a local experiment; no invented production URL.
- No prototype entries in a sitemap. There is no production sitemap yet.
- Check no fabricated claims, practitioner identity, timetable, prices or app adoption.

## Performance

- Production Lighthouse, 3 mobile runs: Performance >=90, Accessibility >=95, Best Practices >=95.
- SEO=100 is an eventual production target; report the intentional prototype noindex conflict honestly.
- Inspect client bundles and exclude test packages, development browser code and unnecessary motion libraries.
- Fonts local; hero has no raster LCP asset or autoplay video.
- Image uses reserved dimensions, responsive local sources and lazy loading.
- Check CLS and unused JS; distinguish lab scores from field Core Web Vitals.

## Accessibility

- Run axe on desktop/tablet/mobile and after changing the problem selector.
- Manually check keyboard, focus, 200% browser zoom and 320-CSS-pixel reflow.
- Verify text, focus, controls and essential boundaries have adequate contrast.
- Test VoiceOver/NVDA reading order and live-region announcements; automated checks cannot certify screen-reader quality.
- Confirm the decorative SVG is hidden from assistive technology and important content remains HTML.
- Reduced motion must not remove meaning or navigation.

## Living Signal V2 additions

- Run `bun run test:v2` for the 24 V2 checks, or `bun run test:e2e` for V1 + V2 and original-route smoke checks.
- `bun run build` then `bun run test:lighthouse:v2` audits the new route. Its SEO=100 assertion intentionally fails on noindex; retain protection.
- Verify the hero reads as one typographic composition, not text plus an illustration.
- Tab through all four problem buttons. Each focus must select its labelled path without moving keyboard focus. Test rapid selection interruption.
- Compare build sequence, rework return loop, intelligence branches and systems junctions. Check all three process labels at desktop and mobile sizes.
- Scroll through the full transition in both directions. Text must stay in the geometric opening, without line collisions, pinning or clipped focus rings.
- Pause motion and enable OS reduced motion separately. Verify the static pair and functional selectors.
- Confirm no-JavaScript capability and offering text. These are automated in V2.
- Check a real 200% browser zoom, VoiceOver/TalkBack and average Android device before approving production. Emulated viewports/axe do not substitute for these checks.

## Production homepage gates

Run `bun run lint`, `bun run typecheck`, `bun run test:e2e`, `bun run build`, then `bun run test:lighthouse:homepage`.

`bun run test:homepage` isolates homepage checks. The full suite preserves A/B/C/V1/V2 regression checks and adds dedicated homepage projects at 1440, 1280, 1024, 768, 430, 390 and 360 CSS pixels. Shared HTTP/sitemap checks run once at 1440 rather than repeating at every width.

Verify:

- Index/follow on `/`, noindex on every experimental route.
- Correct root canonical, social image/metadata and factual Organization JSON-LD in initial HTML.
- Only `/` in sitemap; no broken anchors or links to unbuilt child pages.
- One visible H1, logical headings, named banner/main/footer, skip-link focus and normal navigation.
- All four keyboard/touch problem paths, rapid selection interruption, selected state and labelled routing.
- Normal scroll transformation, manual pause and OS reduced motion with two static states.
- Complete key text without JavaScript; no horizontal overflow at all target widths and narrow 320px reflow.
- 44px or larger navigation/problem touch targets, visible focus and automated axe results.
- 200% equivalent reflow at 720 CSS pixels for a 1440px display. This automated simulation is not a physical browser-menu zoom or screen-reader review; also spot-check those manually before public launch.
- Compare hero, new working-principles section and closing layout to the locked V2 grid/typography.
- Genuine practitioner imagery replacement is recorded; current image is visibly illustrative.
- Production Lighthouse meets P>=90/A>=95/BP>=95. Indexability follows page purpose, never a scoring workaround.

Record measured outcomes and remaining physical-device/assistive-technology limitations in `homepage-results.md`. Do not treat automated scans as WCAG certification or lab TBT as field INP.

## Production Technology gates — 2026-09-24

- Commands: `bun run lint`, `bun run typecheck`, `bun run test:e2e`, `bun run build`, `bun run test:lighthouse:production`.
- Both pages at 1440, 1280, 1024, 768, 430, 390 and 360px; additional 320px and equivalent 200% desktop reflow. Preserve prior route tests.
- Homepage composition remains frozen. Inspect the refined grid-connected thread, one entrance highlight, settling, fine-pointer response, no touch pointer effect and reduced motion.
- Technology: keyboard skip link, all four problem choices, rapid interruption, actual touch tap on mobile, distinct route geometry, direct capability-row links, valid section anchors, working home links, email CTA.
- No-JavaScript: all four situations, all capability lists, all journey stages and engagement starts remain readable. Motion conveys relationships, never unique information.
- Journey line follows normal scroll; no sticky cinematic timeline, no constant idle animation. Reduced motion/manual pause retain the complete static line.
- One H1 per route, ordered H2/H3, banner/main/footer, decorative SVG hidden from assistive technology. Run axe WCAG 2/2.1/2.2 A/AA checks; inspect visible focus and >=44px problem/CTA targets.
- Index/follow on both production routes, unique canonical/title/description/social tags, factual JSON-LD. Sitemap has exactly two entries. Prototype routes stay noindex and absent from sitemap. All deferred page URLs return 404.
- No tech stock assets. Existing homepage wellbeing still life remains illustrative and temporary.
- Real browser-menu 200% zoom, physical Android, Safari/Firefox and VoiceOver/TalkBack remain prelaunch manual checks. Automated reflow, Chromium emulation and axe do not certify them.
- Lab performance results are in `technology-results.md`; field INP has not been measured.

Technology phase execution complete: lint/typecheck/build pass; full suite 117 pass/12 intentional skips; final focused suite 36 pass/6 intentional skips; axe zero violations. Lighthouse gates pass for both routes. See `technology-results.md` for every run and the single 2.53s Technology LCP excursion. Manual device/assistive-technology checks remain open as documented above.

## Production Wellbeing gates — current phase

Run `bun run lint`, `bun run typecheck`, `bun run test:e2e`, `bun run build`, then `bun run test:lighthouse:production` (three mobile audits per production route). Isolate new checks with `bun run test:wellbeing`.

- All production routes at 1440, 1280, 1024, 768, 430, 390 and 360 CSS pixels; additional 320px reflow and 720px equivalent 200% desktop reflow.
- Cross-page navigation from each page: logo → home, Technology → Technology, Wellbeing → Wellbeing. Homepage hero CTAs reach actual pages. Email actions retain appropriate subjects; no links to unbuilt routes.
- Single H1, semantic sections/headings, accurate metadata/canonical/social image, index/follow. Sitemap exactly three production entries. All experiments noindex and excluded.
- Keyboard/focus, touch selection, rapid interruption and four distinct session states. Essential copy stays visible without interaction or JavaScript.
- Breath openings settle; stop offscreen/document-hidden. Pause control and OS reduced motion leave complete static artwork. No timer, audio, scroll capture or idle loop.
- Inspect independent mobile hero/pausing geometry for line/text collisions; image crop/disclosure; restrained whitespace; clear CTAs. No horizontal overflow or clipped focus rings.
- Axe WCAG A/AA scan, contrast, comfortable targets and image dimensions/lazy loading/alt disclosure.
- Practitioner name, credential evidence and photography require owner confirmation before public release. No health outcomes, prices or schedules inferred.
- Actual browser-menu zoom, VoiceOver/TalkBack, Safari/Firefox and a physical average Android device remain manual prelaunch checks. Emulation/axe are not certification.

Current measured evidence is in `wellbeing-results.md`. Previous phase result files remain historical records.

Wellbeing execution complete: install/lint/typecheck/build pass; full suite 146 passed/18 intentional skips, plus the strengthened finite-motion/static-HTML check passed. Axe: zero violations across all production widths. Wellbeing Lighthouse: Performance 99, Accessibility/Best Practices/SEO 100 in three runs, LCP 1.96–1.98s, CLS 0. Technology's initial 72-point outlier and all three follow-ups are retained in `wellbeing-results.md`; aggregate assertions pass. Manual prelaunch checks remain open.

## Human Rhythm focused refinement — current phase

- Run the full existing regression suite across all three production routes and seven widths; retain prototype checks after their public-email change.
- Verify desktop hover/focus/click parity, mobile touch accordion, all four figure sources, one primary figure at a time, responsive width selection, alt text and visible AI disclosure.
- Confirm initially unvisited figures are not requested. Stage dimensions remain stable when images decode/change. Test reduced motion and rapid interrupted selection.
- Verify public hello@ mailto URLs and exact enquiry subjects, Organization email, no rendered admin@ exposure and no infrastructure changes.
- Retest axe, lint, typecheck, production build and three Lighthouse runs per production route; compare Wellbeing to the approved 99 / LCP 1.96–1.98s / CLS 0 baseline.
- Inspect desktop/mobile screenshots for silhouette edges, line/body depth, complete hand/foot framing, crop and touch-control proximity. Check no generic photo-card treatment was introduced.
- Known manual prelaunch checks and qualification/consent requirements remain as documented. Current results: `human-rhythm-results.md`.

Human Rhythm execution complete: frozen install/lint/typecheck/build pass. Full suite 153 passed / 18 intentional skips; final focused Wellbeing suite 36 passed / 6 intentional skips. Production-build Playwright/axe checks pass at seven widths, with 2× mobile image selection verified. Final Wellbeing Lighthouse: Performance 96–99, Accessibility/Best Practices/SEO 100, LCP 1.99–2.73s, median 2.20s, CLS 0. One final LCP run exceeds target; all 12 measurements including the earlier 88-point run are recorded in `human-rhythm-results.md`. Manual device/assistive-technology and hello@ delivery checks remain open.

## Editorial Pose Stage refinement

- Checkpoint prior Human Rhythm; retain all production/prototype routes.
- Inspect four static poses on desktop/mobile: aperture boundaries, complete hands/feet, clear body, sparse foreground line.
- Confirm desktop four rows unchanged; mobile selected label/art/copy/selectors; no hover requirement.
- Confirm interrupted input, 600ms cached transition, no idle loop, static reduced-motion depth.
- Check keyboard/focus, tap, alt text, 320px reflow and all seven production widths.
- Confirm temporary annotations absent from pose composition; replacement gate in `assets.md`.
- Compare optimized production Lighthouse to prior final Human Rhythm cohort, including all outliers; do not equate lab scores with field INP.
- Record results in `editorial-pose-stage-results.md`.

## Life Rhythm refinement

- Verify no autoplay or hover scene change; chapter remains stable without input.
- Desktop: normal wheel/page scrolling selects chapters; sticky stage stays inside section.
- Manual click/focus wins over browser focus scrolling; subsequent real scrolling resumes story.
- Rapid repeated selections remain responsive; latest intent wins; signal settles after 1.2s, light after 1.4s.
- Mobile: explicit choices, no swipe/hover dependency; large targets and readable 16px supporting text.
- Reduced motion: no sticky story/path morph/light displacement/spatial figure motion; short fade only.
- Verify all seven widths, 200% zoom/reflow, no overflow, stable scene dimensions and CLS.
- Retest production navigation, hello@ links, metadata and untouched historical prototypes.
- Asset provenance/replacement gate: `assets.md`; motion/content rationale: `life-rhythm.md`.

## Focused Wellbeing refinement QA — September 2026
Use `node scripts/check-wellbeing-refinement.mjs` (Playwright Chromium installed, or set `PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH`). This is a small Wellbeing-only check: six widths, explicit selection, hover preview, keyboard/touch, rapid selection, reduced motion, image decode, navigation destinations and a mobile axe scan. It starts/stops its own local dev server. See `docs/wellbeing-refinement-qa.json` for the collected result. No Lighthouse or full-site build marathon is part of this refinement.

## About + Contact — bounded production phase
See `docs/about-contact-results.md` for results and limitations, and `docs/about-contact-tests.json` for the focused production-browser run. New routes were checked at 1440/768/390 with targeted axe, form validation/review, keyboard/touch, reduced motion and five-page navigation. Additional reflow widths include 320/360/430/720/1024/1280. One simulated-mobile Lighthouse run per route is recorded in `docs/about-contact-lighthouse.json`; no repeat audit loop. Full lint/typecheck/build passed using the installed Node equivalents. Manual native zoom/screen-reader/device review remains pending.

## Privacy / Terms / branded 404 — 27 September 2026

Scope: two static legal pages, root not-found, footer links and seven-route sitemap. Locked production page components were not redesigned.

- ESLint: passed; TypeScript `--noEmit`: passed; Next production build: passed, new routes prerendered.
- Environment note: the available Bun binary requires an unavailable musl loader. The actual installed script executables were run with Node 24 (`eslint`, `tsc`, `next build`, Playwright). Bun itself was not validated here. The source retains its existing Bun lock and local setup workflow.
- Targeted Playwright: 13 effective checks passed across 1440/768/390, with two intentional duplicate-reflow skips. Initial run: seven pass, six keyboard-test failures from reloading a hash URL and assuming focus reset. After correcting the test to use a fresh document, the six affected checks passed. No page code was changed for that test correction. Both reports retained.
- Axe: zero WCAG A/AA automated violations on Privacy, Terms and unknown-route page at all three widths.
- Confirmed: actual unknown-route response HTTP 404; noindex on not-found; legal routes 200/indexable, unique metadata/canonical; one H1; anchor index links; footer recovery/navigation from Home/About/Contact; seven sitemap entries only; keyboard skip link and main focus; no pageerror events on new routes; reduced-motion disables 404 animation.
- Overflow: none at 1440/768/390, plus 720x450 (200%-equivalent reflow from 1440x900) and 320px. Native browser 200% zoom and assistive-technology reading remain manual review items; viewport reflow is not a full zoom certification.
- Visual review: desktop 404, desktop Privacy and mobile Terms screenshots inspected. Deliberate numbered legal reading hierarchy, unchanged palette and global shell.
- Lighthouse: exactly one simulated-mobile run per legal route, recorded in docs/legal-lighthouse.json. No repeated performance optimisation loop.

### Before public launch

- Complete docs/legal-review.md with the owner and an appropriately qualified reviewer.
- Manually spot-check native zoom, screen-reader reading order and a real mobile device. Automated axe results are not WCAG certification.
- Verify final host's genuine 404 status, caching/logging/cookie behaviour and production indexing configuration after any future deployment approval.
- Existing temporary wellbeing imagery still needs the previously documented approval/replacement; this phase adds no imagery.
- No deployment, analytics or form backend is part of this handoff.

Single-run mobile lab results:

| Route | Performance | Accessibility | Best Practices | SEO | LCP | CLS | Transfer |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
| /privacy | 93 | 100 | 100 | 100 | 2.653 s | 0 | 237,746 bytes |
| /terms | 91 | 100 | 100 | 100 | 2.213 s | 0 | 237,638 bytes |

Privacy LCP exceeded the 2.5 s target in this single run; no additional audit or tuning was undertaken. These are simulated lab observations, not field Core Web Vitals or INP claims. Full raw reports remain in the local docs/lighthouse-legal folder; the clean source handoff includes the compact result summary.
