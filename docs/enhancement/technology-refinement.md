# Technology storytelling refinement

Branch: `enhancement/site-v1.1`. Continues commit `b6973ca`; no restart, source change or remote mutation.

Review: `http://localhost:3000/technology`.

## Changes in scope

1. Hero retains the approved headline. A compact problem-to-system study occupies five of twelve desktop columns; mobile order is headline, study, copy, CTA.
2. One stable diagnostic stage replaces the separate BUILD and INTELLIGENCE studies. Four situation controls share six anchors, a baseline, route vocabulary and a reserved caption area.
3. Capability anatomy uses three connected system depths with an Audit & Rescue bracket across them. It is static and explicitly illustrative.
4. Idea to Operation uses one developing system. Desktop chapters activate a section-bound stage; mobile uses explicit selection. Deliberate selection is protected from browser focus-scrolling.

## Copy displaced by visual explanation

- Removed the separate BUILD study's subheading, stage-purpose controls and assembly explanation from this route.
- Removed the separate INTELLIGENCE study's sample-record/draft-action interaction and its longer explanation. The shared stage now shows input → extract → structure → validate → human review → action directly.
- Replaced the capability catalogue and four introductory taglines with labelled responsibility layers and one cross-layer review framework.
- Removed the repeated italic second-statement treatment from the problem, capability and process headings. Kept the approved hero's editorial emphasis.
- Shortened the three section introductions. Process copy explains the active state rather than requiring the visitor to compare seven full paragraphs. All chapter summaries remain available on desktop; mobile offers explicit controls and the selected explanation.
- Existing approach, fit, engagement and closing sections remain unchanged by this bounded pass.

## Interpretation and limits

All systems are conceptual, not client work or a promised delivery sequence. The diagnostic does not process uploaded information or perform an audit. Paths express relationships; no fake dashboard, data, score or outcome is shown. Selection is not a form submission.

Only Technology source and new Technology-scoped islands/styles changed. Homepage, Wellbeing, other routes, production fonts, metadata, schema, sitemap, robots and global navigation remain unchanged. The preceding homepage prototype and typography comparison remain available on this branch.

No production merge or deployment. No new dependency. No Lighthouse run or field-performance claim. Automated axe is not a substitute for a manual assistive-technology review. Final visual approval is still required.

## Local review and QA

Run `bun install`, then `bun dev`. Open `/technology`.

Targeted static-export checks: `PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH=/path/to/chromium node scripts/check-technology-refinement.mjs` after build. Omit the environment variable when the normal Playwright browser is installed. Screenshots/results go to `test-results/technology-refinement/`.

The check covers three widths, all diagnostic states, identical stage dimensions, click/keyboard/touch selection, interruption, stillness, normal desktop scroll activation, reduced motion, one H1, overflow, runtime errors and axe. See the handoff QA result for the actual run outcome.
