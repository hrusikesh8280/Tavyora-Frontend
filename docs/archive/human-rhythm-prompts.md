# Human Rhythm — asset generation prompts

Built-in image-generation tool; final transparent PNGs optimized into local responsive WebP assets using Sharp. No CLI/API fallback used. Failed checkerboard-background variations and a tightly cropped movement variation are not shipped.

## Shared final prompt — Arrival

Use case: photorealistic-natural. Asset: temporary editorial human figure study for Tavyora's quiet online-yoga page, ARRIVE state. One fictional adult South Asian woman about 35, ordinary healthy proportions, dark hair in a simple low bun, loose warm oatmeal cotton short-sleeve top and muted charcoal flowing full-length trousers, barefoot. Seated comfortably on a low folded neutral fabric support, relaxed loosely crossed legs, both hands resting naturally on knees palms downward, upright but unforced, eyes softly open and gaze lowered. Three-quarter front view. Entire body including feet fully in frame, centered in a square composition, generous 12% margin. Refined low-saturation warm monochrome editorial photography with realistic skin and fabric texture, soft window daylight from upper left. Genuinely transparent alpha background: isolated cutout figure and small fabric support only, no room, no backdrop, no gradient, no scenery, no lettering, no graphics, no yoga mat. Anatomically credible hands and limbs; no advanced pose, no mudra, no spiritual symbols, no fitness glamour. This is a fictional illustrative model, not an actual practitioner. Deliver one high-quality PNG cutout.

## Final pose variations

The BREATHE prompt replaces the ARRIVE state and its seated-posture sentence with: Seated comfortably on a low folded neutral fabric support with relaxed loosely crossed legs, both forearms open at a low angle and hands resting softly palms upward on thighs, shoulders relaxed, eyes closed, torso naturally upright with open chest, no exaggerated arch, no special hand gesture.

The CLOSE prompt replaces the ARRIVE state and its seated-posture sentence with: Seated comfortably on a low folded neutral fabric support with loosely crossed legs, both hands gently resting one over the other in her lap, shoulders settled, eyes gently closed, chin slightly lowered, a quiet unforced resting posture.

The final MOVE prompt replaces the ARRIVE state and its seated-posture sentence with: Standing comfortably with both feet grounded at hip width, her left arm extended gently sideways at SHOULDER HEIGHT, right hand relaxed by thigh, torso upright. Face turned slightly toward the extended hand. Accessible gentle lateral reach, no bend.

For MOVE, remove the fabric support from the isolated-subject description and append: IMPORTANT: include all fingertips and toes, no cropping whatsoever, 15 percent transparent clearance on all four edges. Both feet and hands fully inside the frame.

Final assets: `public/images/rhythm/arrive-*.webp`, `move-*.webp`, `breathe-*.webp`, `close-*.webp`. Full asset inventory and replacement plan: `human-rhythm.md`.
