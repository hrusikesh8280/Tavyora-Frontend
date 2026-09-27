# Design boundaries

Concept styles are isolated CSS Modules. Shared components are limited to navigation, accessible arrow glyphs, factual content and a motion preference shell.

## A — Signal → Breath

Forest ink #142523, pale lavender contour #b9b7d3, pale green action #e1e6c9 and wellbeing surface #e6eadb. Inter carries the system. A finite family of SVG paths changes on scroll; no render loop runs while idle. Desktop pointer response is bounded. Mobile hides additional lines. Reduced motion selects static contours.

## B — Room to Think

Paper #f5f1e9, charcoal #302d27, olive #6d705d and clay #8b654b. Plex Serif for display, Inter for utility. The architectural aperture uses lightweight CSS planes and reserved geometry. Transform-based opening does not move content.

## C — The Living Practice

Porcelain #faf9f4, graphite #263227 and journal green #e9ecdf. Inter, selective Plex Serif and small Plex Mono annotations. Keyboard-operable process tabs and a two-state working-note illustration.

## Accessibility

Semantic landmarks and headings, skip link, visible focus, normal anchors, no hover-only content. System reduced-motion overrides the review toggle. No information lives exclusively in SVG. There is no continuous autoplay animation. No audio, orientation access, canvas or WebGL.

Fonts are shipped locally with their original licences in public/fonts. Illustration geometry is original, procedural and decorative; it represents no product metrics.

## Canonical production lock

Living Signal V2 is officially approved as of the production-homepage phase. The authoritative design specification is `living-signal-v2-design.md`, with source checkpoint `living-signal-approved-v1`. Earlier concept descriptions in this document are historical, not alternative production directions.

Production uses `components/production/system.module.css` as a faithful starting copy of the approved V2 system. `homepage.module.css` adds only the operating-principles section and production navigation/footer refinements. The approved typefaces, semantic palette, architectural signal, spacing cadence, reduced-motion alternatives and responsive hierarchy stay intact. Future pages must use this system, not revive A/B/C palettes or introduce new decorative effects.

## Production Technology extension

The approved tokens are unchanged. New technology styles live under `components/production/technology/` and consume the same variables. Headline sans/italic serif pairing, chapter rail, editorial capability rows and angular routing are carried forward. Text contrast against bone: ink **12.05:1**, muted **5.69:1**, clay/signal **5.69:1**. Mineral rules remain decorative; meaningful focus/selection uses clay and shape/text, not a mineral line alone.

Motion: homepage entrance 1500ms once; Technology gutter 300ms; route traces 340ms with 35ms stagger; journey updates only while visible and on scroll/resize. No animation library dependency added. Reduced motion bypasses entrance/routing effects and leaves a complete static journey.

## Wellbeing extension

Same semantic palette and font families. New scoped styles only under `components/production/wellbeing/`; no changes to approved shared/homepage/Technology styling. Wide contours and independently composed two-line mobile geometry frame the typography. Hero opening is 4.4s once; editorial pause 4.8s once; session interpolation 650ms, 1000ms for the spacious Breathe state. A low-opacity soft/mineral daylight field responds to section boundaries via a restrained transform, with no blur or changing hue. No infinite loop, audio, timer or new runtime dependency. Reduced motion keeps static forms and semantic content.

## Approved Wellbeing refinement — current authority

See `human-rhythm.md` and `human-rhythm-results.md` for the focused pose-study refinement. Public email is hello@tavyora.com. Earlier sections describe historical phases. Global typography/palette and approved page architecture are unchanged; prototypes receive only the public-email replacement.

## Rhythm-only motion refinement

Life Rhythm uses finite 1–1.4s scene/signal/light transitions with a 200ms type response, explicit selection and suitable-desktop scroll activation. It does not change global motion tokens or other sections. Reduced motion uses 120ms opacity only. Exact behaviour and durations: `life-rhythm.md`.
