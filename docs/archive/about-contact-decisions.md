# About + Contact — bounded production phase

## Design lock
Home, Technology and Wellbeing are approved. Checkpoint commit `3d8621a`, tag `core-pages-locked-v1`; implementation branch `production/about-contact`. Changes to the three existing routes are limited to shared navigation/footer integration and removal of imports made unused by that integration. Their content, artwork and motion are unchanged.

## About headline exploration
1. Different disciplines. The same attention. — selected.
2. Two practices. Care in the details.
3. Independent work. Considered together.
4. Different questions. Thoughtful responses.
5. Built carefully. Practised deliberately.

The selected line distinguishes the disciplines and names a shared operating standard. It does not equate coding and yoga. Separate straight and open paths align at a common centre rail without becoming a single line. The editorial split uses one palette; the Wellbeing column begins later to create a quieter rhythm. No invented portraits or company history.

## Contact headline exploration
1. A question is enough to begin. — selected.
2. Start with what you know.
3. Tell us what needs attention.
4. Make room for a conversation.
5. What would you like to work through?

The selected line lowers the threshold without promising outcomes. Two typographic paths precede the fields. Signal selection is a short opacity response, not a new animation system. Fields stay single-column at every width.

## Navigation
All five production routes use the same header and restrained footer. Logo → Home; Technology → /technology; Wellbeing → /wellbeing; How we work → /about; Start a project / Let’s talk → /contact. No privacy or terms links. Existing in-page enquiry CTAs retain their working email actions; only requested navigation/footer wiring changed on the locked pages.

## Draft workflow and privacy
The form has no backend. Required name, email and context are validated on review, with focused error summary and field-linked messages. Optional fields remain optional. Values for the two paths are independent and retained only in memory while the tab stays open. No localStorage, analytics, network submission or success-delivery message. The visitor can edit a generated email draft, open their email app, copy the structured enquiry, or copy the address. Clipboard failure leaves selectable draft text and the address visible. Editing form details regenerates the draft from the form on the next review, replacing manual draft edits.

Recipient: hello@tavyora.com. Subject: Technology enquiry — Tavyora / Yoga enquiry — Tavyora. The site does not verify delivery. Mailto length/handling differs between clients; copy is the fallback. Generic wellbeing enquiries explicitly exclude sensitive health information.

## Future backend
A real delivery adapter can consume the pure draft model in `components/production/editorial/enquiry.ts`. Before delivery is enabled: server-side validation, abuse controls, rate limiting, provider credentials outside client code, delivery/error handling, retention policy and accurate privacy/consent copy. Do not retain the current "nothing submitted" description once that behaviour changes. No response-time or service-level promise is made.

## SEO
Both pages explicitly opt into index/follow, with unique title/description/canonical/OG/Twitter metadata. The existing factual brand social image is reused; no new photo dependency. AboutPage / ContactPage, Organization and BreadcrumbList JSON-LD use only known facts. Sitemap now contains five production URLs, no experiments. Core metadata unchanged.

## Boundaries
No new photography, backend, analytics, deployments, privacy/terms/custom 404, products, apps, blog or service child routes. Existing experimental route files are preserved untouched and are not linked or included in the sitemap.
