# Prototype imagery

The wellbeing photo is **AI-generated temporary art direction**. It depicts no person and is not a photograph of Tavyora's premises or practitioner. The page caption and alternative text identify it as illustrative/temporary.

## Assets

- `public/images/practice-space-1200.webp` — 1200 × 800, approximately 112 KB.
- `public/images/practice-space-640.webp` — 640 × 427, approximately 38 KB.

Generated using the built-in image-generation tool, then resized/compressed for local delivery. Original file retained outside the source project. The image is below the fold, lazy-loaded, with reserved intrinsic dimensions.

## Prompt

Create a landscape editorial photograph of a quiet, authentic home practice corner with soft natural daylight. Charcoal olive woven yoga mat on pale mineral stone floor, edge slightly rolled; folded undyed cotton cloth and small wooden yoga block; a linen curtain filters clear morning light. Spacious asymmetrical composition, tactile material, warm neutral offwhite palette with graphite and quiet olive. No people, identities, text, logos, candles, incense, lotus, sunset, mountain or mystical props. This is a clearly labelled prototype image, never a photograph of the real practitioner.

## Replacement before production

Obtain consented, authentic photographs of the actual practitioner. Photograph real instruction and practice in natural daylight with honest skin/material texture, quiet movement, landscape crops and useful negative space. Confirm the person's name, exact qualification wording and permission to publish separately. Replace both responsive sizes and update the caption/alt text to accurately describe the real image. Do not remove the temporary disclosure before replacement.

## Production homepage phase

- The approved V2 responsive still-life crops are retained at `/`; no image of an invented practitioner is introduced.
- The visible production caption reads “ILLUSTRATIVE IMAGE / AI-GENERATED”. This image remains temporary pending authentic practitioner photography and rights confirmation.
- The 1200×630 social preview at `public/social/tavyora-home.png` is a deterministic typography/vector rendering of the approved design. It is not a photograph and requires no practitioner replacement. Rebuild with `bun run assets:social` after installing the Playwright browser if approved brand wording changes.


## Technology phase

No new temporary photographic assets. `public/social/tavyora-technology.png` is a deterministic 1200×630 rendering of bundled fonts and vector paths, generated with the development-only script `scripts/generate-technology-social.mjs`. It is intended metadata art, not a product screenshot. Existing homepage practitioner-image replacement plan is unchanged.


## Wellbeing usage

The same responsive AI-generated still life is reused once below the fold on `/wellbeing`, visibly labelled as illustration. It is not a real location or practitioner. No new photographic source is invented. `wellbeing-imagery.md` holds the inventory, rights/consent requirements and seven-shot authentic replacement brief. The new social PNG uses only existing fonts and vector contours.

## Approved Wellbeing refinement — current authority

See `human-rhythm.md` and `human-rhythm-results.md` for the focused pose-study refinement. Public email is hello@tavyora.com. Earlier sections describe historical phases. Global typography/palette and approved page architecture are unchanged; prototypes receive only the public-email replacement.
