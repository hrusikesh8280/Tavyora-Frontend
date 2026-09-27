# Locked production system

Living Signal V2. Canonical code: components/production/system.module.css and route-scoped CSS Modules. Shared Arrow remains in components/shared. No prototype dependency.

Core tokens: bone #f3efe6; ink #282e2d; muted #625d55; clay #964630; mineral #c5bfb3; soft #e7dfd2. Inter for body/display; IBM Plex Serif for editorial emphasis. Local fonts retain licence files. No palette/type/spacing changes in cleanup.

Motion: Home signature entrance 1500ms, Technology routes respond/settle, Wellbeing Breath entrance 4400ms and pause 4800ms once, rhythm signal 1250ms or Breathe1500ms, About connection1400ms, Contact selection feedback, 404 trace1200ms once. Scroll/pointer updates are event-driven. No continuous loop. Persistent pause control removed after audit; CSS media query and MotionProvider still honour prefers-reduced-motion. No WebGL/video.

All important content stays semantic HTML. Preserve focus indicators, keyboard controls, explicit touch selection, reserved image dimensions and independent mobile compositions. Historical specifications: archive/pre-cleanup-design-system.md and archive/living-signal-v2-design.md.

Final editorial figure presentation uses the existing single-subject WebP sequence, static grayscale/soft sepia/mineral treatment, low-opacity 4px grain and softened aperture edges. This adds no image downloads or motion. Existing geometry, slow transitions, click/tap/keyboard selection, hover-only previews and mobile arrangement are preserved. The favicon now matches the ink/bone tokens.
