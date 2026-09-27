# Wellbeing editorial refinement — local review

## Scope
Only `/wellbeing` hero and session artwork changed. Home, Technology, global design system, navigation and other Wellbeing sections were not edited in this pass. No new routes.

## Hero
A restrained diagonal daylight plane and a small cropped material aperture enrich the existing typography and open signal contours. The decorative material study reuses the existing temporary practice-space image. The mobile crop moves into the interval beneath the headline; no full photographic banner.

## One coherent session
Four new responsive WebP studies show one fictional adult subject, room, wardrobe and light. Arrival is contained, movement has a gentle directional silhouette, breath leaves the widest negative space, and close settles into a quiet seated pose. An asymmetric architectural aperture, background signal and one low foreground contour relate the photograph to the page grid.

## Interaction and timings
No automatic cycling. Hover is label feedback only. Click/tap/focus and keyboard selection change the scene; desktop section-bound scroll activation remains. Normal browser scrolling is preserved. The signal interpolates for 1250ms, or 1500ms for Breathe. The old image fades over 480ms; the new image reveals over 850ms following a 350ms interval (Breathe 1050ms), with a small final settle. UI colour responds in 200ms. Light changes over 1500ms. Transitions can be interrupted; all settle into stillness. Reduced motion uses static paths and 120ms opacity only.

## Temporary assets
See `docs/assets.md`. The generated subject does not represent a practitioner or customer. Replace with consented authentic photography before final public marketing approval. New scene assets total approximately 268 KiB across all responsive variants; the four largest variants total approximately 116 KiB. This is asset size, not measured page transfer.

## Validation and limits
TypeScript check and targeted ESLint passed. All six focused browser viewport checks passed (1440, 1024, 768, 430, 390, 360); mobile axe reported zero violations. The final run recorded no development warnings or page errors. Focused browser results: `docs/wellbeing-refinement-qa.json`. The script checks six widths, image decoding, keyboard/touch, hover not selecting, rapid state selection, reduced motion, overflow, nav destinations and mobile axe. Screenshots were reviewed separately. A Next.js development-only router-initialization warning was observed during an initial browser pass; the script records this warning separately and does not count it as a page interaction failure. No production build, Lighthouse or field performance measurements were performed in this bounded refinement. Real-device Safari/Android, screen-reader review and authentic photography remain pending.

## Run
`bun install` then `bun dev`; review `http://localhost:3000/wellbeing`.
