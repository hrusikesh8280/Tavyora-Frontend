import { Navigation } from "../../components/production/Navigation";
import Link from "next/link";
import { Footer } from "../../components/production/Footer";
import { MotionProvider } from "../../components/production/MotionProvider";
import { Chapter } from "../../components/production/Chapter";
import { Arrow } from "../../components/shared/Arrow";
import { Breath, Daylight } from "../../components/production/wellbeing/Breath";
import { Rhythm } from "../../components/production/wellbeing/Rhythm";
import {
  enquiryHref,
  principles,
  individualQualities,
  fit,
} from "../../components/production/wellbeing/content";
import {
  wellbeingMetadata,
  wellbeingStructuredData,
} from "../../lib/wellbeing-seo";
import b from "../../components/production/system.module.css";
import s from "../../components/production/wellbeing/wellbeing.module.css";
export const metadata = wellbeingMetadata;
export default function WellbeingPage() {
  return (
    <MotionProvider className={b.page}>
      <link
        rel="preload"
        href="/fonts/inter-latin-wght-normal.woff2"
        as="font"
        type="font/woff2"
        crossOrigin="anonymous"
      />
      <link
        rel="preload"
        href="/fonts/ibm-plex-serif-latin-400-italic.woff2"
        as="font"
        type="font/woff2"
        crossOrigin="anonymous"
      />
      <a className={b.skip} href="#main">
        Skip to content
      </a>
      <Daylight>
        <div className={b.frame} id="top">
          <Navigation current="/wellbeing" />
          <main id="main" className={`${b.main} ${s.main}`} tabIndex={-1}>
            <script
              type="application/ld+json"
              dangerouslySetInnerHTML={{
                __html: JSON.stringify(wellbeingStructuredData).replace(
                  /</g,
                  "\\u003c",
                ),
              }}
            />
            <section className={s.hero} aria-labelledby="wellbeing-title">
              <nav className={s.breadcrumb} aria-label="Breadcrumb">
                <Link prefetch={false} href="/">
                  Home
                </Link>
                <span aria-hidden="true">/</span>
                <span aria-current="page">Wellbeing</span>
              </nav>
              <div className={s.heroComposition}>
                <div className={s.heroLight} aria-hidden="true" />
                <div className={s.heroMaterial} aria-hidden="true">
                  {/* Temporary material study, not a Tavyora venue. */}
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="/images/practice-space-640.webp"
                    width="640"
                    height="427"
                    alt=""
                    decoding="async"
                  />
                </div>
                <Breath />
                <p className={`${b.eyebrow} ${s.heroLabel}`}>
                  01 / WELLBEING AT TAVYORA
                </p>
                <h1 id="wellbeing-title">
                  Online yoga, <em>with room to notice.</em>
                </h1>
                <div className={s.heroBottom}>
                  <p>
                    Practitioner-led online yoga through individual and
                    small-group sessions. Clear instruction and time to find a
                    pace that works for you.
                  </p>
                  <div className={s.actions}>
                    <a className={b.primary} href="#practice">
                      Explore the practice <span aria-hidden="true">↓</span>
                    </a>
                    <a className={b.textLink} href={enquiryHref}>
                      Enquire about a session <Arrow diagonal />
                    </a>
                  </div>
                </div>
                <p className={s.heroFoot}>
                  INDIVIDUAL GUIDANCE <span aria-hidden="true">/</span> SHARED
                  PRACTICE <span aria-hidden="true">/</span> ONLINE
                </p>
              </div>
            </section>
            <section
              className={s.practice}
              id="practice"
              aria-labelledby="practice-title"
            >
              <Chapter number="02" label="THE PRACTICE" />
              <div className={s.practiceGrid}>
                <div>
                  <p className={b.eyebrow}>LESS TO PROVE. MORE TO NOTICE.</p>
                  <h2 id="practice-title">
                    Clear guidance.
                    <br />
                    <em>Space to be yourself.</em>
                  </h2>
                  <p className={s.lead}>
                    You do not need an impressive pose to begin. Start with what
                    feels manageable, and ask questions along the way.
                  </p>
                </div>
                <ol className={s.principles}>
                  {principles.map(([title, copy], i) => (
                    <li key={title}>
                      <span className={s.number}>0{i + 1}</span>
                      <div>
                        <h3>{title}</h3>
                        <p>{copy}</p>
                      </div>
                    </li>
                  ))}
                </ol>
              </div>
            </section>
            <section
              className={s.individual}
              id="one-to-one"
              aria-labelledby="individual-title"
            >
              <Chapter number="03" label="ONE-TO-ONE ONLINE YOGA" />
              <div className={s.individualGrid}>
                <figure className={s.imageFigure}>
                  <div className={s.imageFrame}>
                    <picture>
                      <source
                        media="(max-width: 600px)"
                        srcSet="/images/practice-space-640.webp"
                      />
                      {/* Temporary local illustration; no practitioner or real venue depicted. Replacement brief: docs/assets.md. */}
                      <img
                        src="/images/practice-space-1200.webp"
                        width="1200"
                        height="800"
                        loading="lazy"
                        decoding="async"
                        alt="Yoga mat, folded cloth and wooden block beside a sunlit window."
                      />
                    </picture>
                  </div>
                  <figcaption>
                    Daylight study
                    <br />
                    Mat, cloth and wood.
                  </figcaption>
                  <p className={s.imageLine}>
                    A little room.
                    <br />
                    <em>A place to begin.</em>
                  </p>
                </figure>
                <div className={s.individualCopy}>
                  <h2 id="individual-title">
                    One person.
                    <br />
                    <em>A practice of your own.</em>
                  </h2>
                  <p className={s.lead}>
                    Individual guided online sessions shaped around your
                    experience, pace and practical goals. Discuss your pace,
                    comfort boundaries and available time with the practitioner.
                  </p>
                  <dl className={s.qualities}>
                    {individualQualities.map(([title, copy], i) => (
                      <div key={title}>
                        <dt>
                          <span className={s.number}>0{i + 1}</span>
                          {title}
                        </dt>
                        <dd>{copy}</dd>
                      </div>
                    ))}
                  </dl>
                  <a className={b.textLink} href={enquiryHref}>
                    Enquire about a session <Arrow diagonal />
                  </a>
                </div>
              </div>
            </section>
            <section
              className={s.group}
              id="group-practice"
              aria-labelledby="group-title"
            >
              <Chapter number="04" label="SMALL-GROUP ONLINE YOGA" />
              <div className={s.groupGrid}>
                <div>
                  <p className={b.eyebrow}>
                    A SHARED SESSION. YOUR OWN EXPERIENCE.
                  </p>
                  <h2 id="group-title">
                    Practise together.
                    <br />
                    <em>Keep your own pace.</em>
                  </h2>
                </div>
                <div className={s.groupCopy}>
                  <p className={s.lead}>
                    Guided online sessions with clear instruction and time to
                    follow along. Move with the group at a pace that feels
                    manageable for you.
                  </p>
                  <p>
                    The group offers a shared rhythm, without asking everyone to
                    make the same movement in the same way. Discuss your
                    experience and expectations before joining.
                  </p>
                  <a className={b.textLink} href={enquiryHref}>
                    Enquire about a session <Arrow diagonal />
                  </a>
                </div>
              </div>
              <div className={s.sharedLines} aria-hidden="true">
                <svg
                  viewBox="0 0 1280 150"
                  fill="none"
                  preserveAspectRatio="none"
                >
                  {[0, 1, 2].map((i) => (
                    <path
                      key={i}
                      d={`M24 ${18 + i * 12} C250 ${18 + i * 12} 300 ${105 + i * 10} 580 ${100 + i * 8} S1000 ${35 + i * 10} 1280 ${65 + i * 12}`}
                    />
                  ))}
                </svg>
              </div>
            </section>
            <section
              className={s.session}
              id="session"
              aria-labelledby="session-title"
            >
              <Chapter number="05" label="THE RHYTHM OF A SESSION" />
              <div className={s.sectionIntro}>
                <h2 id="session-title">
                  A session has
                  <br />
                  <em>room between moments.</em>
                </h2>
                <p>
                  A sense of the experience, rather than a fixed sequence. Each
                  session can take a different shape.
                </p>
              </div>
              <Rhythm />
            </section>
            <section
              className={s.practitioner}
              id="practitioner"
              aria-labelledby="practitioner-title"
            >
              <Chapter number="06" label="THE PERSON GUIDING THE PRACTICE" />
              <div className={s.practitionerGrid}>
                <div className={s.studyNote}>
                  <span className={b.eyebrow}>
                    FORMAL STUDY / PERSONAL ATTENTION
                  </span>
                  <p>
                    Study.
                    <br />
                    <em>Attention.</em>
                    <br />
                    Practice.
                  </p>
                  <span className={s.qualification}>
                    MASTER’S DEGREE IN YOGA
                  </span>
                </div>
                <div className={s.practitionerCopy}>
                  <h2 id="practitioner-title">
                    Guided by study.
                    <br />
                    <em>Led with attention.</em>
                  </h2>
                  <p className={s.lead}>
                    Tavyora’s online yoga practice is guided by a professionally
                    qualified practitioner who holds a master’s degree in yoga.
                  </p>
                  <p>
                    That formal grounding sits alongside a simple approach: give
                    clear instruction, listen to the participant and allow time
                    for questions.
                  </p>
                  <a className={b.textLink} href={enquiryHref}>
                    Enquire about a session <Arrow diagonal />
                  </a>
                </div>
              </div>
            </section>
            <section className={s.editorial} aria-labelledby="pause-title">
              <Breath variant="pause" />
              <div>
                <p className={b.eyebrow}>07 / A MOMENT BETWEEN</p>
                <h2 id="pause-title">
                  Leave room
                  <br />
                  <em>for what you notice.</em>
                </h2>
              </div>
            </section>
            <section
              className={s.fit}
              id="is-this-for-you"
              aria-labelledby="fit-title"
            >
              <Chapter number="08" label="IS THIS FOR YOU?" />
              <div className={s.fitGrid}>
                <div>
                  <h2 id="fit-title">
                    Begin with
                    <br />
                    <em>your circumstances.</em>
                  </h2>
                  <p className={s.lead}>
                    These may be useful starting points for a conversation.
                    Suitability depends on the individual, not just the format.
                  </p>
                </div>
                <div>
                  <ul>
                    {fit.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                  <p className={s.responsible}>
                    Consider your own circumstances and seek appropriate
                    professional or medical guidance where needed before
                    physical activity. Share relevant comfort boundaries when
                    enquiring.
                  </p>
                </div>
              </div>
            </section>
            <section
              className={s.closing}
              id="enquire"
              aria-labelledby="closing-title"
            >
              <p className={b.eyebrow}>09 / THE FIRST STEP</p>
              <h2 id="closing-title">
                Begin with
                <br />
                <em>a conversation.</em>
              </h2>
              <p>
                Tell us a little about your experience, what you would like from
                practice and whether you prefer individual or small-group
                sessions.
              </p>
              <div className={s.actions}>
                {/* Direct email option. Opens the visitor's mail client; sends nothing automatically. */}
                <a className={b.primary} href={enquiryHref}>
                  Enquire about a session <Arrow diagonal />
                </a>
                <Link prefetch={false} className={b.textLink} href="/">
                  Back to Tavyora <span aria-hidden="true">↗</span>
                </Link>
              </div>
            </section>
          </main>
          <Footer />
        </div>
      </Daylight>
    </MotionProvider>
  );
}
