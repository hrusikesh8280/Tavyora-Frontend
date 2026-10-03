# Tavyora Site Enhancement V1.1 — bounded visual prototype

## Source and scope

Fresh clone of https://github.com/hrusikesh8280/Tavyora-Frontend, latest main at start: bb63495088016b9e0db0d4ca4cb247f570516ed0. Working branch: enhancement/site-v1.1. No old checkout or ZIP is used as application source.

This is the first visual review, not the whole V1.1 release. Homepage hero, global fonts, navigation, SEO configuration and all other page files remain unchanged. No favicon change yet. No full Rework/Systems/Audit or process-page overhaul yet. No main merge or production deployment.

## Review locations

- `/` → existing Technology section: Product System with Build / Rework / Intelligence / Systems selection.
- `/technology#problems` → BUILD assembly and INTELLIGENCE information-to-reviewed-action studies, replacing the old routing block for this review branch.
- `/review/typography.html` → isolated noindex static review file, not a production navigation item or sitemap entry. Three actual self-hosted combinations, identical sample copy/layout, desktop and 390px specimens. It does not change website fonts.

## Visual grammar

The shared family is implemented in components/enhancement/VisualGrammar.tsx and its scoped stylesheet.

- Signal: thin clay line; explains a relationship or transition.
- Rail: quiet mineral construction line; keeps the shared grid visible.
- Port: small diamond or terminal; indicates a connection, not a metric.
- Layer: open plane within the same composition, never a rounded service card.
- Transformation: assemble / simplify / structure / connect.
- Review gate: explicit human decision between information and action.
- Resolution: a completed route that settles, with labels remaining readable in HTML.

Product System keeps seven named layers present. BUILD assembles connections; REWORK leaves a faint historical detour and resolves a direct route; INTELLIGENCE branches through interpretation/review; SYSTEMS exposes APIs and infrastructure. Intelligence is optional, not a mandatory dependency for every product.

BUILD uses six individually selectable contributions: intent, experience, interface, logic, data, operation. Open planes and related small glyphs assemble around one signal. This is not a contractual delivery sequence.

INTELLIGENCE uses one fictional record to explain mixed inputs, extraction/structure, validation, human review and a gated action. Nothing is uploaded, processed or sent. No scores, customer data, product claims or fabricated results. Retrieval is described as an optional source of context, not an invented product.

## Interaction and motion

Explicit click/tap/keyboard activation; no autoplay or hover-driven selection. Signal traces run once for approximately 1–1.2 seconds with decelerating easing. Changes interrupt prior animations. CSS assembly settles; no indefinite loop. Reduced motion cancels traces and displays final states. Mobile uses a legible two-column connected index and compact scene compositions rather than shrinking a desktop SVG. Essential labels and descriptions remain HTML.

## Copy changes

Homepage Technology heading becomes “What needs to work better?” and its support becomes one direct sentence. Product System replaces the old four long capability rows and problem descriptions; the current hero is byte-for-byte unchanged. Technology study headings use direct language. Broader copy humanisation is deferred until these visual systems are approved.

## Typography

1. Inter + IBM Plex Serif (existing files).
2. IBM Plex Sans + IBM Plex Serif.
3. Source Sans 3 + Source Serif 4.

Identical homepage hero, Technology hero, capability heading, paragraph, navigation and wellbeing excerpt. Static regular400 Latin subsets isolate the comparison; Source Serif italic supplies its editorial emphasis. No typography is selected. Review-only font files and OFL licences live in public/review/fonts. Alternatives are not requested by production pages. Future Arabic requires real-script/RTL testing; Plex Sans Arabic is a possible companion, not an implemented locale.

## Preview publishing status

Cloudflare Pages is already attached to the repository and successfully deployed the baseline commit. The connected GitHub account reports pull=true and push=false. No branch push or Cloudflare deployment can be claimed from local validation. Enable repository write access, or push this prepared branch from an authorised local checkout. Cloudflare preview branch policy must allow enhancement/site-v1.1. Preserve main and the current public/_headers noindex rules. No DNS, analytics or Search Console actions are part of this work.

## Local review and checks

`bun install`, `bun run build`, `bun dev`. Visit the locations above. Bounded static-export QA: `node scripts/check-enhancement.mjs` after installing Playwright Chromium; PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH may point at an existing compatible browser.

Existing broad tests for the old routing block intentionally still describe the approved baseline and are not represented as passing against this prototype replacement. The bounded enhancement script checks the new interactions, typography, both routes, 1440/768/390, keyboard/touch, no overflow, reduced motion, runtime errors and axe. See qa-v1.1.json for collected results.


## Publishing the prepared branch from an authorised checkout

The source ZIP contains a Git patch in handoff/. Apply it to the same baseline (or resolve any newer main changes deliberately), then push only the enhancement branch:

```sh
git fetch origin
git switch -c enhancement/site-v1.1 bb63495088016b9e0db0d4ca4cb247f570516ed0
git am /path/to/Tavyora_Site_V1.1_Prototype.patch
git push -u origin enhancement/site-v1.1
```

Do not merge to main. Cloudflare Pages can then create a branch preview if that branch is enabled in its existing preview policy. The prior main preview URL is not a preview of this prototype and must not be used as the handoff link.
