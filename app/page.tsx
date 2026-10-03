import Link from "next/link";
import { Footer } from "../components/production/Footer";
import { MotionProvider } from "../components/production/MotionProvider";
import { Arrow } from "../components/shared/Arrow";
import { HeroSignal, TransitionSignal } from "../components/production/Signal";
import { ProductSystem } from "../components/enhancement/VisualGrammar";
import { projectHref, yogaHref } from "../components/production/content";
import s from "../components/production/system.module.css";
import { homepageMetadata, homepageStructuredData } from "../lib/site";
import { Navigation } from "../components/production/Navigation";
import { Chapter } from "../components/production/Chapter";
import { HowWeWork } from "../components/production/HowWeWork";
export const metadata = homepageMetadata;
export default function Home() {
  return (
    <MotionProvider className={s.page}>
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
      <a className={s.skip} href="#main">
        Skip to content
      </a>
      <div className={s.frame} id="top">
        <Navigation />
        <main id="main" className={s.main} tabIndex={-1}>
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify(homepageStructuredData).replace(
                /</g,
                "\\u003c",
              ),
            }}
          />
          <section className={s.hero} aria-labelledby="hero-title">
            <div className={s.heroIndex}>
              <span>01 / A CONNECTED PRACTICE</span>
              <span>TECHNOLOGY ↔ WELLBEING</span>
            </div>
            <h1 id="hero-title">
              <span className={s.firstLine}>Useful systems.</span>
              <HeroSignal />
              <em>Thoughtful practice.</em>
            </h1>
            <div className={s.heroBottom}>
              <p>
                Tavyora designs and builds digital products, software and
                intelligent workflows, alongside practitioner-led online yoga.
              </p>
              <div className={s.heroActions}>
                <Link prefetch={false} className={s.primary} href="/technology">
                  Explore technology <Arrow diagonal />
                </Link>
                <Link prefetch={false} className={s.textLink} href="/wellbeing">
                  Explore wellbeing <Arrow diagonal />
                </Link>
              </div>
            </div>
            <div className={s.heroFoot}>
              <span>Care in what we build. Care in how we practise.</span>
              <a href="#current">
                Follow the thread <span aria-hidden="true">↓</span>
              </a>
            </div>
          </section>
          <section
            id="current"
            className={s.current}
            aria-label="Currently at Tavyora"
          >
            <p className={s.eyebrow}>
              CURRENTLY
              <br />
              AT TAVYORA
            </p>
            <ol>
              <li>
                <span>01</span>Technology consultancy
              </li>
              <li>
                <span>02</span>Software & product development
              </li>
              <li>
                <span>03</span>Practitioner-led online yoga
              </li>
            </ol>
          </section>
          <section
            id="technology"
            className={s.technology}
            aria-labelledby="technology-title"
          >
            <Chapter number="02" label="TECHNOLOGY" />
            <div className={s.sectionIntro}>
              <h2 id="technology-title">What needs to work better?</h2>
            </div>
            <ProductSystem />
          </section>
          <section className={s.transition} aria-label="Signal becomes breath">
            <TransitionSignal />
          </section>
          <section
            id="wellbeing"
            className={s.wellbeing}
            aria-labelledby="wellbeing-title"
          >
            <Chapter number="04" label="WELLBEING" />
            <div className={s.wellbeingIntro}>
              <p className={s.eyebrow}>A DIFFERENT PACE. THE SAME ATTENTION.</p>
              <h2 id="wellbeing-title">Online yoga at your pace.</h2>
              <p>
                Online yoga led by a professionally qualified practitioner with
                a master’s degree in yoga. Sessions allow time for questions and
                guidance you can follow.
              </p>
            </div>
            <div className={s.practiceLayout}>
              <figure className={s.practicePhoto}>
                <div className={s.photoFrame}>
                  <picture>
                    <source
                      media="(max-width: 600px)"
                      srcSet="/images/practice-space-640.webp"
                    />
                    {/* Explicit responsive sources; reserved ratio and lazy below-fold load. */}
                    <img
                      src="/images/practice-space-1200.webp"
                      width="1200"
                      height="800"
                      loading="lazy"
                      decoding="async"
                      alt="Yoga mat, folded cloth and wooden block in natural daylight."
                    />
                  </picture>
                </div>
                <figcaption>Daylight study</figcaption>
              </figure>
              <div className={s.sessions}>
                <article>
                  <span className={s.eyebrow}>01 / INDIVIDUAL</span>
                  <h3>
                    One-to-one
                    <br />
                    online yoga
                  </h3>
                  <p>
                    Individual guided sessions shaped around you, your
                    experience level and your practical goals.
                  </p>
                </article>
                <article>
                  <span className={s.eyebrow}>02 / SHARED</span>
                  <h3>Small-group online yoga</h3>
                  <p>
                    Follow guided movement with a small group, with time to
                    understand the instruction and find your pace.
                  </p>
                </article>
                <a className={s.textLink} href={yogaHref}>
                  Enquire about a session <Arrow diagonal />
                </a>
              </div>
            </div>
            <p className={s.practiceNote}>
              <em>Practice creates room to notice.</em>
            </p>
          </section>
          <HowWeWork />
          <section className={s.closing} aria-labelledby="closing-title">
            <Chapter number="06" label="A CONVERSATION" />
            <h2 id="closing-title">What would you like to work on?</h2>
            <div className={s.closingPaths}>
              <a href={projectHref}>
                <span className={s.eyebrow}>TECHNOLOGY</span>
                <strong>Build something with Tavyora.</strong>
                <Arrow diagonal />
              </a>
              <Link prefetch={false} href="/wellbeing">
                <span className={s.eyebrow}>WELLBEING</span>
                <strong>Explore yoga.</strong>
                <Arrow diagonal />
              </Link>
            </div>
          </section>
        </main>
        <Footer />
      </div>
    </MotionProvider>
  );
}
