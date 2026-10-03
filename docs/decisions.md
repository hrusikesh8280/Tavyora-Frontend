# Decisions

2026-09-23

- User approved all three bounded prototypes and explicitly prohibited another selection gate before implementation.
- Next.js 16.3.6 and React 19.3.0 were confirmed from the package registry when building. Exact dependency resolutions are retained in bun.lock.
- Bun 1.4.2 installed dependencies in this environment. Node 24.19.0 ran Next.js.
- Use ordinary server-rendered page components with small client islands. Passing server-rendered children through the motion provider does not make the content source client components.
- Native requestAnimationFrame, CSS and SVG satisfy the interaction needs; Motion for React would add no necessary capability here, so it is omitted.
- No external runtime assets, analytics, backend, accounts, data persistence or deployment.
- Prefer separately scoped concept folders over branches containing mutually exclusive versions. Preserve all three together so reviewers can compare routes without switching branches.
- Prototype controls A/B/C and Pause motion are review utilities, not proposals for production navigation.
- Zoho/GoDaddy DNS and mail configuration have not been touched.
- Approval of these studies does not approve production implementation.

## Living Signal — 2026-09-23

- User ranking: **A > C > B**.
- Decision: **C structural foundation + A signature motion**. Preserve editorial credibility and usability while introducing one memorable brand interaction. B contributes restraint in spacing only.
- The existing committed source was tagged `concepts-v1` before implementation. New work is on `concept/living-signal`.
- Original routes and original shared components are unchanged. Living Signal owns its navigation, copy, styles, signal geometry and problem-path interaction.
- Only `/direction-living-signal` is added. No production route or deployment is approved.
- The hero is “Useful systems. Thoughtful practice.” See `docs/living-signal-copy.md` for alternatives and rationale.
- Full capabilities remain visible as server-rendered HTML. Interactive suggestions add detail without hiding essential service information.
- Email enquiry links open a user's mail client. They are real `mailto:` links, not fake forms or unbuilt internal routes, and do not send messages automatically.
- The master brand palette persists through technology and wellbeing; curvature, line density and spacing carry the transition.
- The reduced-motion transition exposes two labelled static compositions. Ordinary scrolling remains in control; no pinned sequence, autoplay or orientation effects.
- No motion library is required for these event-driven interactions.
- Original comparison routes remain under noindex/nofollow. The new direction explicitly repeats those metadata rules; no canonical production URL or sitemap entry is fabricated.
- Playwright, axe and Lighthouse CI are development-only dependencies. The test browser itself is not part of the source archive.

## Living Signal V2 — bounded architectural iteration

- V1 is technically sound but **not approved**. The user's critique: the animation reads as a separate right-hand object, and its relationship with composition and colour is too weak.
- Preserve A, B, C and Living Signal V1 without source changes. Checkpoint `living-signal-v1` refers to commit `38cebb2`; V2 is isolated on `concept/living-signal-v2` and `/direction-living-signal-v2`.
- Retain C's editorial credibility and A's signal idea. Do not blend styles or introduce B as another aesthetic.
- Replace the hero's separate object with full-width typography, a left architectural spine and parallel signal lines running between headline baselines. First paint is complete before JavaScript.
- One visual family: parallel paths, right-angle routing, open cubic curves. The same clay token defines links, active paths, chapter markers, image contour and transition geometry.
- Four meaningful routing states: build follows a delivery sequence; rework adds a feedback return; intelligence branches and merges; systems identifies connected responsibilities. Labels are ordinary HTML, never embedded in graphics.
- Selection or keyboard focus updates the routing path and the capability index. Desktop routing uses a 240 ms interruptible positional interpolation; branch details crossfade. Mobile re-composes the path below the selector with a compact labelled sequence. No continuous animation loop.
- Transition paths leave a real opening for typography rather than hiding lines under an opaque text plate. Normal scrolling opens the curves and reduces density; no pinning or scroll capture. Reduced motion shows two static states.
- Warm bone is the only base environment. No green wellbeing theme or dark technology theme. See `archive/living-signal-v2-design.md` for tested semantic tokens.
- V2 preloads only the two above-the-fold typefaces, uses lighter inline geometry and reuses the documented temporary still life. It adds no runtime dependency.
- This remains noindex, outside any sitemap, with no production canonical. The expected Lighthouse SEO assertion failure must not be “fixed” by indexing a prototype.
- Deliver a new archive and portable Git bundle; stop after local validation. No production page, backend, analytics, DNS or deployment action is authorised in this stage.

## Production homepage — 24 September 2026

**Living Signal V2 is officially approved as Tavyora's production design system.** The visual direction is locked. Its canonical source is `/direction-living-signal-v2` at `4a74c87`, tagged `living-signal-approved-v1` before implementation. This phase is on `production/homepage`.

- Preserve the five prototype routes. Do not reinterpret A, B or C as separate production directions. Production components begin as a faithful copy of the approved V2 system in `components/production/`; prototype sources remain frozen for comparison.
- Build only `/`. Future first-release pages are `/technology`, `/wellbeing`, `/about`, `/contact`, `/privacy`, `/terms`; none is built or linked as a destination yet. The next page phase is `/technology` only after homepage review.
- Replace prototype navigation with working homepage anchors and real mailto enquiries. Remove study switches from production UI. Do not send visitors to unbuilt pages or expose prototypes from production navigation/footer.
- Retain the approved hero, signal family, bone/ink/clay tokens, grid, fonts, motion hierarchy and responsive arrangements. Add “How Tavyora works” as editorial rows using the same system.
- Keep the factual qualification statement supplied by the owner. Offerings are one-to-one and small-group online yoga only. No corporate sessions, prices, schedules, courses, metrics, product launches or medical claims.
- Keep the current illustrative image visibly identified as AI-generated and document its replacement with genuine practitioner photography. This is a local approval build, not permission to deploy the placeholder as final practitioner imagery.
- The production homepage opts into index/follow and has its own title, description, canonical, Open Graph, Twitter card and factual Organization JSON-LD. Safe noindex defaults remain for experimental routes. Do not inherit production canonicals into prototypes.
- Sitemap contains the homepage only. Robots permits crawling so the experimental noindex instructions can be read. No fake last-modified date is emitted on every build. Add future URLs only when their pages exist and are approved.
- No analytics, contact form, backend, booking, CMS or persistence is added. Email links open a mail client; they do not submit data through this website.
- No deployment, DNS changes, Search Console setup or legal pages are included. Zoho mail DNS remains untouched.

## 2026-09-24 — Homepage approval and Technology phase

- **Homepage approved** by the owner. Checkpoint `homepage-approved-v1` points to the reviewed homepage commit `8aca0fa`.
- **Hero refinement approved** as the bounded scope explicitly authorised in the current brief: a single routed entrance highlight, a grid-connected thread and restrained desktop pointer response. This records scope approval, not a claim of a subsequent owner review of the delivered refinement.
- **Living Signal V2 production system locked.** No palette, typography, hero copy, page proportions, CTA structure or homepage section redesign.
- Branch: `production/technology`. All five prototype routes preserved.
- Homepage refinement uses five static strands (three on mobile), one 1.5-second entrance highlight that settles, and the existing fine-pointer cursor. No infinite animation. Reduced motion receives the complete static composition. Only the production HeroSignal and its own stylesheet change visually.
- Homepage is now frozen. Its existing section-anchor navigation is deliberately preserved under the owner's restriction. Review the new page directly at `/technology`; wider navigation changes can be considered only with later page approval.
- `/technology` is the only new content route. Eight chapters: hero, problems, approach, capabilities, journey, fit, engagement starts, closing.
- The routing gutter connects the selected editorial row to its capability explanation; Build branches into coordinated layers, Rework removes a detour, Intelligence merges inputs, Systems connects structural nodes. Keyboard/focus, pointer and touch can select. All essential descriptions and capability lists are rendered HTML.
- The seven-stage journey is an optional path, not a mandatory delivery formula. Its vertical signal follows ordinary scroll; no pinning or hijacking.
- No ongoing support offering, SLA, invented project results or generic technology photography. Contact stays `mailto:` until `/contact` genuinely exists.
- Shared root `data-scroll-behavior="smooth"` declares the pre-existing behaviour for Next.js navigation, without a visual change.
- Production sitemap now lists only `/` and `/technology`. Prototype metadata remains noindex.

Final validation: all requested technical checks completed. The Technology router's connector was optically aligned to the selected marker and covered by a geometric regression assertion. No further homepage changes followed the isolated hero commit. Lighthouse gates passed; the one mobile 2.53s LCP result is retained transparently. Stop after local Technology handoff; no /wellbeing work started.

## 2026-09-24 — Technology approved; Wellbeing phase

- Owner approved `/technology`. Tag `technology-approved-v1` preserves commit `b95b16f` before implementation. Work continues on `production/wellbeing`.
- Explicit new authorization resolves the prior navigation restriction: wire logos to `/`, Technology to `/technology`, Wellbeing to `/wellbeing`, and homepage exploration CTAs to the corresponding pages. Existing navigation styling and approved page composition remain unchanged.
- Start-a-project retains the technology email enquiry destination until /contact exists. Yoga uses a subject-specific mailto. No invented or broken future-route links.
- Living Signal V2 remains locked. Wellbeing changes rhythm, not brand: same Inter/Plex Serif, bone/ink/clay tokens and editorial rail; open curves, warmer light, asymmetric image treatment, greater breathing room.
- Hero selected from five candidates: “Online yoga, with room to notice.” Ten original microcopy options considered; only three standalone editorial lines used. See wellbeing-copy.md.
- Breath animations are finite: hero 4.4s, editorial pause 4.8s, then settle. Pause offscreen/document-hidden; no automatic loop or breathing timer. Session state changes interpolate one open contour family; the Breathe state expands the spacing. Daylight changes are restrained, section-driven transforms of one low-opacity tonal field.
- Reduced motion keeps full static composition and all information/controls. No audio, video, Three.js, WebGL or extra runtime dependency.
- Only one temporary photographic illustration, reused from the existing assets and clearly disclosed. No fabricated practitioner identity/portrait. Replacement plan and claim register are explicit.
- Only `/wellbeing` is newly built. `/about`, `/contact`, `/privacy`, `/terms` remain deferred. Stop after local handoff; /about requires explicit approval.

## Wellbeing approved; focused Human Rhythm refinement

- Overall Wellbeing direction approved by owner. `wellbeing-approved-v1` tags `0a44d0e` before this refinement; branch `refinement/human-rhythm`.
- Preserve all approved page architecture, global typography/palette, navigation styling and motion hierarchy. Add human figure studies only inside Rhythm; retain Arrive / Move / Breathe / Close.
- Four generated temporary cutouts, explicitly disclosed. Bodies change through opacity, never shape interpolation. Signal remains the continuous transforming layer. Mobile uses an explicit touch accordion and independent figure spacing.
- Keep three existing standalone editorial lines; do not add another quotation merely to fill the study.
- Public email changes to hello@tavyora.com, including structured data and preserved public prototypes. admin@ remains administrative infrastructure. No Zoho/DNS changes. Email subjects use the owner's exact Technology/Yoga wording. Actual public mailbox delivery remains unverified.
- Use Next/Image with pre-sized local transparent WebP variants. Lazy arrival image; other poses load on selection. No image service or new runtime dependency.
- Preserve original checkpoint in Git. Do not build About or any later route until this refinement is reviewed.

## Editorial Pose Stage — focused final wellbeing refinement

The overall Wellbeing direction remains approved; only the Human Rhythm Study is refined. Checkpoint: `human-rhythm-approved-v1`; branch: `refinement/editorial-pose-stage`.

Replace the transparent-overlay impression with an architectural aperture, state-specific editorial figure positions, interrupted back contours and one sparse foreground line. Signal carries continuity; body images change discretely. Reuse every optimized image byte. Preserve approved production pages, navigation, email, palette, typography and section architecture.

Move figure-generation disclosure out of the composition into `docs/assets.md` at the user's explicit request. Authentic photography is a gate before final public marketing approval, not an optional provenance note. No deployment or `/about` work is authorized in this phase.

## Life Rhythm: slower, deliberate and inclusive

The prior Editorial Pose Stage is preserved at `editorial-pose-stage-v1` (`57327dd`). On `refinement/life-rhythm`, replace immediate hover swapping with title-only hover feedback, explicit selection and a section-bound desktop scroll story. Manual intent wins over focus-induced scrolling. Scene/light/signal transitions last about 1–1.4 seconds, finish in stillness, and remain interruptible. Reduced motion uses static composition and 120ms fades only.

Replace the single-young-woman cutout family with four consistently art-directed fictional adult room scenes: seated arrival, ordinary standing movement, older adult seated on a chair, and a small mixed-adult group. These are neither real customers nor practitioner portraits. Children are excluded until a genuine offering and safeguarding are defined. Public development labels remain absent; replacement before final marketing approval remains mandatory. No other page/section redesign and no `/about` work.

## 27 September 2026 — focused Wellbeing refinement
Only Wellbeing hero and session study changed. Home, Technology, navigation, global tokens and other page sections remain unchanged. Replace mixed demographic scenes with one consistent fictional subject. Hero atmosphere uses local light geometry and a small material aperture. Preserve deliberate selection, hover-only preview, desktop section-bound scroll activation, interruption and stillness. No autoplay. Signal settles in 1250ms (Breathe 1500ms); image reveal 850ms after 350ms exit interval (Breathe 1050ms); UI 200ms; reduced motion short opacity only. New assets do not imply practitioner identity or customer participation. No additional routes built.

## About + Contact production phase — 27 September 2026
Core pages locked at `core-pages-locked-v1` (`3d8621a`); branch `production/about-contact`. Add About as distinct disciplines/shared attention; Contact as two editorial enquiry paths with honest local email-draft review. Shared navigation/footer connects only five existing production routes. No core-page content or visual redesign. Full reasoning, headline alternatives and future backend requirements: `docs/about-contact-decisions.md`.

## Legal pages and not-found — 27 September 2026

Approved core state preserved at `about-contact-approved-v1`; work isolated on `production/legal-404`. No core page design or navigation redesign. Only footer additions and sitemap entries.

Privacy headline candidates: Your information, clearly explained; A clear view of privacy; How your information is handled; Privacy in plain view; What happens to your information. Selected the first for clarity without an absolute privacy/security promise.

Terms candidates: Terms for using Tavyora; Using this website; A clear basis for using the site. Selected the first: literal and unambiguous.

404 candidates: The signal ends here; Nothing lives at this address; This route has no destination; A route without a page. Selected the first, paired with explicit page-not-found explanatory copy and recovery links.

Legal pages use shared server-rendered reading composition, no hidden accordions, no new client island, no legal schema decoration. Indexable metadata; all seven real production routes in sitemap. Existing prototype noindex remains untouched. A root not-found handles unknown routes; finite CSS signal draw respects reduced motion and the existing motion control.

Legal uncertainty is recorded in docs/legal-review.md, not presented as public placeholder text. No unverified compliance guarantees, legal entity, host, retention duration, refunds or service commitments.

## Production repository cleanup — 27 September 2026

Checkpoint pre-cleanup-production-v1 (0368ea2), branch production/repository-cleanup. Removed five prototype route trees and their components only after scanning production imports, test/script/config references and asset paths. No production route depended on those modules. Shared Arrow retained; prototype shared Nav/StudyShell/content removed. No production page copy/layout changes.

Motion audit: no interval/infinite/repeated ambient production animation. Home entrance1.5s; Breath4.4/4.8s once; rhythm1.25/1.5s response; About1.4s; 4041.2s. Scroll/pointer effects update on user input, not idle loops. Removed persistent Motion Pause UI and its CSS. Preserved system reduced-motion CSS, media-query guards, context updates and static alternatives. Reintroduce an accessible pause mechanism if continuous decorative motion is introduced later.

One production Playwright config preserves Home/Technology/Wellbeing/contact/rhythm/legal assertions with current route expectations; three representative projects plus narrow reflow cases. One Lighthouse config with one run, no automated repeats. Prototype assertions about SSR, semantics, routing, keyboard, touch, reduced motion, axe and overflow are represented in production specs; prototype comparison navigation is replaced by genuine404 checks.

No dependency upgrades/removals: React/Next runtime; Tailwind/PostCSS build; TypeScript/types, ESLint, Playwright, axe and LHCI remain used. Scripts importing only transitive Lighthouse/chrome-launcher packages were obsolete and removed; LHCI is the supported audit entry point. bun.lock remains unchanged and bun.lock.original was absent. Package name retained to preserve lockfile identity.

Historical documentation is archived; current strategy/content/SEO/assets correct obsolete phase descriptions. Active image family is session-study, not the rejected multi-person life-rhythm family. Font licences retained. Administrative address appears only in internal documentation, not public code.


## Final pre-deployment polish — 27 September 2026

Checkpoint: `pre-final-polish-v1`; branch `production/final-polish`. Approved architecture and the Living Signal V2 system remain locked. No new routes, dependencies, deployment or integrations.

- Existing single-subject studies receive a CSS warm-monochrome editorial treatment, restrained texture and soft aperture edges. Asset bytes and responsive loading are unchanged. Human identity is illustrative, never practitioner/customer identity. Internal provenance stays in assets.md; development captions become “Daylight study”.
- Targeted copy edits remove repeated “considered” language, simplify a few sentences and align enquiry/navigation labels. Good copy remains intact.
- Keep the persistent Motion Pause control absent: no indefinite decorative animation was found. Entrances, scroll responses and selected scenes settle; reduced-motion support remains. Wellbeing rhythm timings and deliberate activation are unchanged. Hero/pause contours are finite 4.4/4.8-second entrances, not loops.
- Favicon colours now use current ink/bone. Homepage factual schema adds WebSite alongside Organization. Seven canonical production URLs remain on https://tavyora.com.
- This is local review readiness, not legal approval or deployment authorisation. Authentic photography remains a future improvement under the revised owner-authorised editorial strategy.

## V1.1 final identity and human craft

- Approved Homepage Product System/control points and Technology visual storytelling remain locked. No new sections, routes or motion systems.
- Retain Inter + IBM Plex Serif after identical-content visual comparison. Reduce repeated italic second lines rather than replacing production fonts. Alternative fonts remain review-only.
- Use stable `app/icon.png` (96px) and `app/apple-icon.png` (180px). Remove automatic `app/icon.svg` to keep one primary icon reference.
- Render same-subject wellbeing scenes as warm editorial ink studies; preserve assets, composition, deliberate selection and motion timing. They do not represent the practitioner or customers. Provenance stays in docs/assets.md.
- Preserve production SEO configuration, canonical hostname, navigation and approved interactions. No merge or deployment is part of this pass.
