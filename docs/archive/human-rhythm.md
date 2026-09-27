# Human Rhythm Study — focused Wellbeing refinement

## Design boundary

The Wellbeing architecture and overall direction are approved. `wellbeing-approved-v1` preserves commit `0a44d0e`. Work is isolated on `refinement/human-rhythm`. Only the Rhythm illustration/interaction is visually refined; the homepage, Technology, navigation styling, global tokens, Wellbeing hero and other chapters are unchanged. Public email text and enquiry URLs change across current pages and preserved prototype pages.

## The composition

Four temporary editorial figure studies sit within the existing Rhythm column. The Breathe state is an open diagonal sweep through the composition, deliberately avoiding a head-framing dome or aura. A contour passes behind the cutout and a restrained foreground segment establishes layer order. An angled, low-opacity field of the existing soft token suggests window light. The field changes slightly with the selected state; it is not a separate colour palette or continuous animation.

| State   | Human study                                | Signal/light intent                            |
| ------- | ------------------------------------------ | ---------------------------------------------- |
| Arrive  | Seated, hands on knees, gaze lowered       | Contained, settled geometry                    |
| Move    | Standing, one arm extended gently sideways | Direction and extension                        |
| Breathe | Seated, shoulders relaxed, hands open      | Wider contour spacing and slower interpolation |
| Close   | Seated, hands resting in lap               | Settled geometry and quieter light             |

The figures are illustrative, not a sequence of instructions. They do not depict the actual Tavyora practitioner. No pose is claimed to cause a health outcome.

Desktop hover, focus and click select the same state. On mobile, explicit touch buttons form an accordion: the four stage names remain visible and the selected explanation opens near the figure. All descriptions remain in the initial HTML; the illustrative stage detail is the only accordion content. With JavaScript disabled, all four descriptions remain visible even on mobile. Core offering, qualification and enquiry copy is unchanged and always visible.

The signal interpolates continuously; bodies never morph. Figure changes use sequential opacity fades, with no scale, parallax or body interpolation. The current image stays present while a new image loads. Rapid selection is interruptible. No automatic cycling or idle loop was added. Reduced motion/manual pause leave static figures and complete contour states; the light does not translate.

## Temporary asset inventory

Two photographic moments now appear on Wellbeing: the retained still life and this single interactive figure study. Only one figure is shown at a time. No human photo was added to the hero, practitioner chapter or editorial pause.

All four figure families are generated illustrations created with the built-in image-generation tool. They are not licensed stock, authentic participant photographs, or evidence of practitioner identity. Small identity/anatomical differences inherent in generated studies remain a reason to replace them with real photographs.

| Family              | Project files                                                       | Dimensions / format                             |
| ------------------- | ------------------------------------------------------------------- | ----------------------------------------------- |
| Arrival             | `public/images/rhythm/arrive-{320,480,768,1024}.webp`               | Square, indicated pixel width, transparent WebP |
| Movement            | `public/images/rhythm/move-{320,480,768,1024}.webp`                 | Same                                            |
| Breath              | `public/images/rhythm/breathe-{320,480,768,1024}.webp`              | Same                                            |
| Closing             | `public/images/rhythm/close-{320,480,768,1024}.webp`                | Same                                            |
| Existing still life | `public/images/practice-space-1200.webp`, `practice-space-640.webp` | Existing 1200×800 / 640×427 crops               |

Figure source variants range from about 10–14KB at 320px, 18–23KB at 480px, 34–50KB at 768px and 55–82KB at 1024px. Alpha is preserved; no synthetic room or backdrop is composited into the photograph. A modest CSS saturation adjustment keeps them within the approved palette.

`next/image` uses a local static-variant loader with declared sizes and intrinsic dimensions. The width query identifies the chosen variant; it requires no remote image service. Arrival is lazy-loaded below the fold. Other figures are mounted only after selection and retained for subsequent use. Their URLs remain normal crawlable assets. Each has a useful descriptive alt; the SVG/light layers are decorative and hidden from assistive technology. The reserved stage dimensions prevent image-load layout shifts.

Visible caption: “ILLUSTRATIVE FIGURES / AI-GENERATED — Temporary studies, not the Tavyora practitioner or pose instructions.” Keep this disclosure until actual photography replaces the generated figures.

## Original editorial copy

Options considered for an additional caption:

1. Movement gives attention somewhere to land.
2. A little movement. A little more attention.
3. Let the moment have its own pace.
4. Practice creates room to notice.
5. A quieter kind of progress.

Decision: do not add another quote. The three existing standalone editorial lines already carry the page: “Less to prove. More to notice.”, “A little room. A place to begin.” and “Leave room for what you notice.” Stage captions are now factual state labels rather than four additional poetic lines. No famous teacher quotation is used.

## Authentic photography replacement plan

Photograph the actual practitioner only after identity and publication consent are supplied. Art direction: natural window light, a warm neutral real environment, simple clothing, honest skin and fabric texture, minimal staging, quiet negative space. Avoid exaggerated retouching and advanced/acrobatic poses. The practitioner should choose comfortable, representative positions.

Shot list:

1. Quiet seated arrival, relaxed hands and gaze.
2. Standing movement, full hands and feet in frame.
3. Gentle extension or flow, generous room in the movement direction.
4. Seated breath, natural shoulders and hands.
5. Quiet closing posture, deliberate rest.
6. Natural portrait for the later practitioner profile.
7. Hands, posture or mat detail.
8. Wide landscape composition with useful negative space.
9. Vertical mobile composition with independent framing.

Capture a consistent camera position, wardrobe and light for the four interactive states. Preserve the full silhouette; leave extra crop room, especially near fingers and feet. Deliver transparent cutouts where consented and suitable, plus original photographs. Replace all four resolutions for each chosen state, retain reserved dimensions, update alt text to describe the real image, and remove AI disclosure only once no generated figure remains. Recheck mobile composition, image-load stability, contrast and performance. Do not add the portrait merely because it exists; approve its placement separately.

## Public email boundary

`hello@tavyora.com` is now the public website address, including visible footer text, Organization JSON-LD and all enquiry links. `admin@tavyora.com` remains administrative infrastructure only. No Zoho mailbox, alias, account, DNS, MX, SPF or DKIM setting was changed.

- Technology: `mailto:hello@tavyora.com?subject=Technology%20project%20%E2%80%94%20Tavyora`
- Wellbeing: `mailto:hello@tavyora.com?subject=Yoga%20enquiry%20%E2%80%94%20Tavyora`

The owner's instruction assumes hello@ will be available. Actual mailbox/alias provisioning and delivery have not been verified. Confirm receipt before public launch; no test email was sent. Historical documents/Git history can retain the former administrative address as a record, but rendered routes no longer expose it.

## Stop boundary

No `/about`, `/contact`, `/privacy`, `/terms`, deployment, analytics or infrastructure work. Review this refinement locally before proceeding.
