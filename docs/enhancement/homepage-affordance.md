# Homepage Technology control points

Continues enhancement/site-v1.1 from approved Technology commit 840e7db. Only ProductSystem and its scoped styles change. Homepage hero, approved Technology implementation, other pages, fonts, navigation and SEO remain unchanged.

## Invitation

Considered: “Where are you starting?”, “What needs to work better?”, “Which sounds familiar?”, “What would you like to work on?”, “Choose the closest starting point.”

Selected: **Where are you starting?** It invites problem recognition without an interface instruction or another poetic slogan.

## Interaction contract

- Resting: readable muted number/title, concise meaning, open signal node and editorial rules. Entire row is a native button with cursor:pointer.
- Hover/focus: 3px title movement, slightly warmer surface, stronger rule/node and a small directional cue. Relevant diagram ports receive a restrained outline. The scene never switches on hover or focus.
- Activation: aria-pressed, filled node, short accent rail, persistent cue and selected surface. A measured SVG connector starts exactly at the selected node and ends at the first active system port. It routes through empty gutters at tablet/mobile widths.
- Capture: 350ms. Existing scene traces follow after 300ms for 750ms; ports settle in sequence. Final motion finishes around 1.2 seconds. Immediate UI feedback uses 160–180ms. New activation cancels the previous sequence, including rapid changes. No loop or autoplay.
- Reduced motion: static connection and selected system; no traces or title translation. All controls remain keyboard-operable with a visible focus outline.
- Mobile: four full-width rows, each at least 104px tall; diagram immediately follows. No tiny tabs or hover requirement.

## Validation

Lint, typecheck and static production build passed using the existing npm scripts in this environment; project dependencies and Bun lockfile are unchanged. Targeted Chromium Playwright checked 1440/768/390, hover/focus non-selection, Enter/Space, tap, rapid selection, pointer affordance, stable component dimensions, settled motion, reduced motion, no horizontal overflow and no runtime errors. Axe reported zero violations across the three component scans. Details: homepage-affordance-qa.json.

First-time discoverability still requires human review; no 1–2 second comprehension claim is made. No Lighthouse rerun, Safari or physical-device testing. No remote push, main merge or deployment.

Review locally at http://localhost:3000/#technology after bun install and bun dev.
