# Locked production system

Living Signal V2. Canonical code: components/production/system.module.css and route-scoped CSS Modules. Shared Arrow remains in components/shared. No prototype dependency.

Core tokens: bone #f3efe6; ink #282e2d; muted #625d55; clay #964630; mineral #c5bfb3; soft #e7dfd2. Inter for body/display; IBM Plex Serif for editorial emphasis. Local fonts retain licence files. No palette/type/spacing changes in cleanup.

Motion: Home signature entrance 1500ms, Technology routes respond/settle, Wellbeing Breath entrance 4400ms and pause 4800ms once, rhythm signal 1250ms or Breathe1500ms, About connection1400ms, Contact selection feedback, 404 trace1200ms once. Scroll/pointer updates are event-driven. No continuous loop. Persistent pause control removed after audit; CSS media query and MotionProvider still honour prefers-reduced-motion. No WebGL/video.

All important content stays semantic HTML. Preserve focus indicators, keyboard controls, explicit touch selection, reserved image dimensions and independent mobile compositions. Historical specifications: archive/pre-cleanup-design-system.md and archive/living-signal-v2-design.md.

Final editorial figure presentation uses the existing single-subject WebP sequence, static grayscale/soft sepia/mineral treatment, low-opacity 4px grain and softened aperture edges. This adds no image downloads or motion. Existing geometry, slow transitions, click/tap/keyboard selection, hover-only previews and mobile arrangement are preserved. The favicon now matches the ink/bone tokens.

## V1.1 Technology study — visual grammar (review branch only)

The Technology refinement uses existing tokens and fonts. It does not establish a new production font or palette. Canonical experiment: `components/enhancement/TechnologyStory.tsx` and its scoped CSS module.

| Primitive | Meaning | Treatment |
| --- | --- | --- |
| Signal | Flow | Clay stroke; follows a meaningful relationship, then stops |
| Node | Information or decision | Small square port with a normal HTML label |
| Route | Process | Orthogonal connections on shared anchors; no arbitrary line drawing |
| Layer | System depth | Offset planes for experience, logic/data, services and operation |
| Break | Friction | Interrupted/dashed detour; never a fictitious error score |
| Transformation | Intervention | Assemble, simplify, structure or connect within the same stage |
| Resolution | A clearer working state | Connected route, reviewed action or defined layer; no invented outcome claim |

### Spatial contract

Desktop uses a twelve-column frame: four columns for problem selection, eight for the stage, with a 24px gutter. Stage header, title reserve, canvas and outcome baseline stay constant across all four states. Six nodes share a 600×380 coordinate system: `(100,90)`, `(300,90)`, `(500,90)`, `(500,290)`, `(300,290)`, `(100,290)`. Labels, ports and studies position from anchors, never from content height. The semantic ordered list follows this route.

At tablet widths the selector becomes a two-column index above the stage. At mobile, a separate 300×480 path uses two columns and three rows. Labels remain HTML at readable size. Mobile has explicit controls, not scroll-dependent scene changes. The process stage is sticky only inside its own desktop section; no scroll locking.

### Motion contract

- Hero: three problem inputs connect; resolution arrives at 900ms and settles by 1400ms. One entrance, not a loop.
- Diagnostic: selected label responds in 180ms. BUILD layers enter sequentially; REWORK's old route fades over 1300ms as the clear route appears; INTELLIGENCE moves from varied inputs through structure and a human-review gate; SYSTEMS reveals dependencies. Route transition 1200ms; node response 650ms with 90ms spacing. All animations cancel on interruption.
- Process: a 44%-viewport desktop activation zone selects the nearest chapter. Click/Enter/Space overrides scroll selection until a new wheel, touch-scroll, navigation-key or non-control pointer intent. Layer studies settle over 900ms; route progress over 1200ms. IMPROVE exposes a feedback relationship.
- Capability anatomy: static. Audit & Rescue brackets all three layers; no inspection scores or client evidence.
- Reduced motion: static states, no entrance traces, no sticky process stage, no spatial transition. Controls and HTML explanations remain available.

This is a bounded local study, not approval to merge or deploy. Technology metadata and the homepage/Wellbeing implementations remain untouched.
