# Living Signal V2 — a signal built into the page

## Composition

V1 treated the visual as an object beside the proposition. V2 makes the visual part of the reading order. A vertical rail starts at navigation, the hero signal runs between full-width headline lines, chapter markers locate sections, technology routes into process labels, and the same geometry opens around the transition copy. An asymmetrical image contour carries the curve into wellbeing.

Typography remains Inter plus IBM Plex Serif italic. No new font files or licences are needed. Display type has tighter optical spacing; body copy has a 1.8–1.9 line-height and bounded line lengths. The mobile headline and technology sequence are independently composed. Mobile retains three hero strands and eight transition strands; it does not scale down the entire desktop diagram.

## Semantic colours and measured contrast

Ratios calculated using WCAG relative luminance against bone `#f3efe6`:

| Token       | Value     | Role                                        |          Contrast |
| ----------- | --------- | ------------------------------------------- | ----------------: |
| `--bone`    | `#f3efe6` | Continuous page environment                 |                 — |
| `--ink`     | `#282e2d` | Main text, primary CTA surface              |           12.05:1 |
| `--muted`   | `#625d55` | Supporting text, annotations                |            5.69:1 |
| `--clay`    | `#964630` | Active text, signal, focus, chapter markers |            5.69:1 |
| `--mineral` | `#c5bfb3` | Decorative grid and separators only         |            1.59:1 |
| `--soft`    | `#e7dfd2` | Reserved secondary neutral surface          | Not used for text |

`--signal` and `--focus` alias clay. Every animated stroke uses the signal token. No gradient, palette change at wellbeing or animation-specific colour. Mineral must not be used for essential text or as the only indication of a control/state. Selection has `aria-pressed`, a filled marker and an explicitly labelled path. Focus uses clay at 2 px with a 5 px offset.

## Geometry and motion

1. **Signal:** parallel directional lines become a horizontal architectural seam between the headline lines. A bounded 25 px-per-1000 px pointer response moves only the small signal cursor; text and the entire layout stay still. Fine pointer and desktop only.
2. **Routing:** one selected start point connects to a process. Rework returns, intelligence branches/rejoins, systems places structural junctions. Main route interpolation uses 240 ms cubic ease-out; interrupting cancels the previous frame and starts from the current position. Branch details use a 240 ms opacity transition. Mobile uses an immediate simplified branch diagram with the same process labels.
3. **Transition:** compatible cubic path coordinates interpolate with smoothstep progress under normal scroll. Density falls from sixteen to six visible principal strands. Mobile limits path updates to eight. No idle loop, pinned section or scroll hijacking. Intersection/visibility checks suppress offscreen or background work.
4. **Feedback:** 180 ms arrow and CTA feedback. No staggered text entrance, image parallax, autoplay or decorative ambient loops.

Stroke weights use non-scaling SVG strokes so narrow mobile geometry remains legible. Decorative SVGs are hidden from assistive technology. All propositions, capabilities, path labels and services are HTML. Full capabilities and offering text remain available without JavaScript.

Reduced motion removes interpolation and pointer response, switches the transition to two labelled static compositions and honours the existing manual pause control. The ordinary page remains fully navigable.

## Imagery

V2 reuses `practice-space-640.webp` / `practice-space-1200.webp`, the explicitly temporary AI-generated still life from V1. No human/practitioner identity is fabricated. The mobile crop is wider; desktop uses a taller crop. Dimensions are reserved and the image is lazy-loaded. The visible caption says it is temporary. See `imagery.md` for the original prompt and replacement plan with authentic practitioner photography.

## Boundaries

Only `/direction-living-signal-v2` is added. The original routes, content, global CSS, layout and shared components remain unchanged. Preloads and all new styling are scoped to V2. No production design system is approved by this iteration.
