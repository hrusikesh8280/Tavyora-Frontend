# Life Rhythm — deliberate motion and inclusive editorial scenes

## Scope

Checkpoint `editorial-pose-stage-v1` (`57327dd`); branch `refinement/life-rhythm`. Only Rhythm component, its scoped CSS and four supporting session sentences change. Homepage, Technology, navigation, metadata, global tokens, other Wellbeing sections and hello@ links remain intact. No new production dependency or route.

## State triggers

- No autoplay, timers, ambient breathing loop or floating figures.
- Hover: title colour/underline preview only; no pose or scene change.
- Click/tap or keyboard focus/Enter/Space: immediately select the chapter; native buttons expose `aria-pressed` and visible focus.
- On desktop wider than 1024px and at least 720px tall, with motion enabled: stage sticks only within the story. Ordinary scrolling chooses the chapter whose centre is closest to a 48%-viewport activation line. A 32px hysteresis prevents boundary jitter. Nothing intercepts or cancels scrolling.
- A manual selection remains authoritative until the next real wheel, touch-scroll, scrollbar or page-navigation-key input. Focus-induced browser scrolling cannot override it. There is no time-based lockout and every transition is interruptible.
- At smaller widths, short landscape windows, reduced motion or global motion-off: no sticky scene story. Explicit selection remains available; all chapter text remains HTML.
- Mobile: selected label → one scene → selected copy → four large explicit choices. No swipe requirement or automatic advancement.

## Timing specification

| Layer            |               Duration | Behaviour                                                        |
| ---------------- | ---------------------: | ---------------------------------------------------------------- |
| Selected type    |                  200ms | Clear immediate selected state                                   |
| Old scene exit   |                  480ms | Opacity; maximum 2px movement                                    |
| New scene reveal |      780ms after 400ms | Clean image change, no body interpolation                        |
| Signal reroute   | 1000ms; Breathe 1200ms | Cubic deceleration, starting from interrupted geometry           |
| Natural light    |                 1400ms | Restrained opacity/position change inside aperture               |
| Final settle     |      200ms from 1100ms | Ends at 1300ms                                                   |
| Reduced motion   |          120ms opacity | Static paths/light position/figure position; no sticky behaviour |

CSS uses `cubic-bezier(.22,1,.36,1)`; SVG interpolation uses cubic ease-out. All effects finish. The slowest layer finishes at 1400ms. First-time scene decoding can delay its reveal on a slow connection; the previous scene is retained until the new one is ready. Only selected/previously visited scenes mount, all below-fold assets use lazy loading, and no non-active scene is given high network priority.

## Inclusion rationale

The visual system should not suggest yoga belongs only to young, highly flexible or fitness-oriented people. Four fictional adult scenes vary age, gender and everyday posture while maintaining the same window light, wall/floor materials, natural texture, camera character and neutral wardrobe. Arrive is a seated adult; Move a standing adult of another gender; Breathe an older adult on a chair; Close a small mixed-adult group.

These are editorial representations, not customers, testimonials, a documented class or practitioner identity. The group scene suggests shared practice without promising in-person classes or a fixed group size. No demographic labels are part of the public copy. Inclusive imagery does not establish universal suitability: the existing responsible-participation note remains unchanged. There is no clinical or outcome claim.

No children are pictured or advertised. Children's practice remains a future possibility only, requiring a defined age group, format, parent communication, safeguarding and actual delivery before public promotion.

## Copy decisions

Inclusive line options:

1. There is room for your way of practising. **Selected** — accommodates difference without categorising people.
2. Different days can ask for different practice.
3. A practice can begin where you are.
4. Make room for the way you move.
5. Your pace belongs in the practice.

Low-pressure closing alternatives:

1. You can begin with questions, not experience. **Selected** — invites enquiry without promising that every practice suits everyone.
2. There is time to ask before you begin.
3. Start by telling us what would help you feel comfortable.
4. A conversation can come before a first session.
5. You do not need a polished practice to ask about one.

CTA: **Ask about a session**, using the existing Yoga enquiry mailto. No urgency, bookings, pricing or new services. Session copy is plain, about guidance/pacing/attention, and not a sequence of pose instructions.

## Assets and final photography

See `assets.md` for the current asset inventory, release gate and photography plan. Exact prompts are in `life-rhythm-prompts.json`. Built-in image generation produced four temporary originals; only optimized local responsive WebP variants ship. No video or WebGL.
