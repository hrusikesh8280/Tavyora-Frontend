# Tavyora — production source

Locked Living Signal V2 website. Local review only; no deployment authorised.

## Run on your Mac

Prerequisites: Bun 1.4.2 and Node 20.9+ (Node 24 used for QA).

```sh
unzip Tavyora_Final_Polish_Source.zip
cd tavyora
bun install
bun dev
```

Visit http://localhost:3000. Production routes: `/`, `/technology`, `/wellbeing`, `/about`, `/contact`, `/privacy`, `/terms`. Unknown paths and the five retired concept routes return the branded 404. There are no environment credentials required for local use.

## Check the production build

```sh
bun run lint
bun run typecheck
bun run build
bunx playwright install chromium
bun run test:e2e
```

One Playwright configuration starts the production build on port3108 and covers 1440/768/390 plus narrow/reflow checks. Axe scans are included; `bun run test:a11y` can run the explicitly named axe cases separately when needed. `PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH` optionally selects an installed Chromium. `bun run smoke` checks an already-running localhost:3000 server (`SMOKE_ORIGIN` optional).

One Lighthouse configuration: `bun run test:lighthouse`, one mobile run on Home per invocation. Change its URL list deliberately for a different bounded audit; do not run repetitive score-chasing loops. Existing baseline results are retained in docs/archive.

## Structure

- app: seven approved pages, metadata infrastructure, branded not-found.
- components/production: approved visual system and feature components.
- components/shared: reusable Arrow only.
- lib: factual metadata and schema.
- public: used fonts/licences, current responsive imagery, three social previews.
- scripts: production social generators and smoke check.
- tests: production regressions, contact email flow, motion, accessibility and HTTP/SEO checks.
- docs: current production guidance; archive contains superseded phase history.

The contact page prepares a reviewable email draft for hello@tavyora.com. It does not send or store a submission on a backend. Native email delivery depends on the visitor's email client. No analytics, payments, accounts, CMS or blog.

## Before launch

Read docs/final-review.md, docs/deployment.md, docs/legal-review.md and docs/assets.md. The editorial figure studies are not practitioner or customer photographs; their provenance, owner-approval and future replacement plan are documented in assets.md. Legal wording requires owner/professional review. Native zoom/screen-reader/real-device verification remains part of launch review. No deployment or DNS changes are included.

Final-polish safety checkpoint: pre-final-polish-v1. Local-ready checkpoint: production-ready-local-v1. The downloadable source omits Git internals, installed dependencies, build/cache output and heavy raw QA artifacts. Full history stays in the working Git repository. Exact cleanup manifests and tree are under docs/archive/cleanup-*.
