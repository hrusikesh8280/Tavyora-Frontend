# Validation record — 2026-09-23

## Verified in the build environment

- Bun install completed and created bun.lock.
- TypeScript strict check passed.
- ESLint passed with zero warnings and errors after cleanup.
- Next.js production build passed; all three concept routes prerendered successfully.
- bun dev started successfully.
- /concept-a, /concept-b and /concept-c returned HTTP 200 with their shared factual content in the rendered HTML.
- The reusable smoke check passed for all three routes, 22 referenced framework/style assets and all four local font files, with no captured server runtime errors.
- Source review: concept styles isolated; motion preference listeners clean up; event-driven animation avoids permanent requestAnimationFrame loops; content is not gated behind graphics.
- Font files and licences are included locally (approximately 102 KB of WOFF2 assets across all fonts).

## Explicit limitations

The cloud browser rejected local HTTP and shared-file preview access under its security policy. No alternate browser or security workaround was used. Therefore this delivery has **not** been visually verified at 1440, 1024 or 390 pixels, and browser-console cleanliness, hydration, touch behaviour and real-device animation smoothness are **not certified**. Responsive CSS for these widths is implemented, but implementation is not the same as visual verification.

No Lighthouse score, field Core Web Vitals result or average-Android performance claim is made. All three prototypes require the user's local visual review before a creative direction is chosen.

## Reproduce technical checks

```sh
bun install --frozen-lockfile
bun typecheck
bun lint
bun run build
bun smoke
```

The smoke test starts and stops its own dev server on port 3107. Stop any other `bun dev` in the same checkout first because Next.js permits one development server per checkout. It verifies HTTP responses, shared content, CTA anchor targets, referenced framework assets and local fonts. It is not a browser test.

## Local browser review

Run `bun dev` and open all three routes. In browser responsive mode, inspect 1440, 1024 and 390 pixel widths. Also inspect 200% zoom.

1. Check the full page for clipped type, unexpected horizontal scrolling and overlap.
2. Follow both hero CTAs and both navigation anchors; verify the correct section appears.
3. Switch A/B/C from the header and confirm the selected study is indicated.
4. A: scroll through the contours; move the pointer over the desktop sculpture. Verify no pointer dependency on mobile.
5. B: click “Make a little space”; verify the aperture opens and returns on the next click.
6. C: switch the journal between Technology and Wellbeing. Use all four process tabs; verify left/right arrows and Home/End keys work while a tab is focused.
7. Toggle Pause motion, then test the OS reduced-motion preference. Content and all controls must remain available.
8. Tab from the address bar through the skip link, navigation, CTAs and controls. Check visible focus and logical order.
9. Inspect the Console after each interaction. Any hydration/runtime error is a blocker before advancing.
10. Use a real midrange Android device when available. CPU/network throttling is a supplement, not a replacement.

No production work should begin until the user reviews and selects a direction.
