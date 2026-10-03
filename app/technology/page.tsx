import { Navigation } from "../../components/production/Navigation";
import Link from "next/link";
import { Footer } from "../../components/production/Footer";
import { MotionProvider } from "../../components/production/MotionProvider";
import { Chapter } from "../../components/production/Chapter";
import { Arrow } from "../../components/shared/Arrow";
import { projectHref } from "../../components/production/content";
import {
  ProblemHero,
  DiagnosticStage,
  CapabilityAnatomy,
  OperationStory,
} from "../../components/enhancement/TechnologyStory";
import v from "../../components/enhancement/technology-story.module.css";
import {
  situations,
  engagements,
} from "../../components/production/technology/content";
import {
  technologyMetadata,
  technologyStructuredData,
} from "../../lib/technology-seo";
import b from "../../components/production/system.module.css";
import s from "../../components/production/technology/technology.module.css";
export const metadata = technologyMetadata;
const principles = [
  [
    "Start with the problem.",
    "Understand the people, the current workflow and the system around them. Agree what needs to become easier before choosing what to build.",
  ],
  [
    "Keep design and engineering together.",
    "Consider the experience and the technical decisions in the same conversation. Reduce unnecessary complexity at both levels.",
  ],
  [
    "Give AI a specific job.",
    "Use it where it can make a workflow more useful. Decide how results will be evaluated, where human review belongs and what happens when it is wrong.",
  ],
  [
    "Think past the launch.",
    "Consider deployment, maintenance and handover while building. The result needs to make sense to the people who will run it.",
  ],
];
export default function TechnologyPage() {
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
      <div className={b.frame} id="top">
        <Navigation current="/technology" />
        <main id="main" className={b.main} tabIndex={-1}>
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify(technologyStructuredData).replace(
                /</g,
                "\\u003c",
              ),
            }}
          />
          <section className={s.hero} aria-labelledby="technology-hero">
            <nav className={s.breadcrumb} aria-label="Breadcrumb">
              <Link prefetch={false} href="/">
                Home
              </Link>
              <span aria-hidden="true">/</span>
              <span aria-current="page">Technology</span>
            </nav>
            <div className={`${b.eyebrow} ${s.heroIndex}`}>
              <span>01 / TECHNOLOGY AT TAVYORA</span>
              <span>FROM THE QUESTION TO THE WORKING SYSTEM</span>
            </div>
            <div className={v.heroComposition}>
              <h1 id="technology-hero">
                Bring the problem, <em>not a perfect brief.</em>
              </h1>
              <ProblemHero />
              <p className={v.heroDescription}>
                Tavyora connects product design, software engineering and
                intelligent workflows. Start with what is difficult. We can work
                out the system together.
              </p>
              <div className={`${s.actions} ${v.heroActions}`}>
                <a href={projectHref} className={b.primary}>
                  Start a technology conversation <Arrow diagonal />
                </a>
                <a href="#approach" className={b.textLink}>
                  See how we work <span aria-hidden="true">↓</span>
                </a>
              </div>
            </div>
          </section>
          <section
            className={s.section}
            id="problems"
            aria-labelledby="problems-title"
          >
            <Chapter number="02" label="FIND YOUR STARTING POINT" />
            <div className={s.intro}>
              <h2 id="problems-title">What needs to work better?</h2>
            </div>
            <DiagnosticStage />
          </section>
          <section
            className={s.section}
            id="approach"
            aria-labelledby="approach-title"
          >
            <Chapter number="03" label="HOW WE APPROACH IT" />
            <div className={s.intro}>
              <h2 id="approach-title">Understand before building.</h2>
              <p>
                The right starting point is not always more software. It may be
                a clearer scope, a simpler workflow or a focused repair.
              </p>
            </div>
            <div className={s.approach}>
              {principles.map(([title, copy]) => (
                <article key={title}>
                  <h3>{title}</h3>
                  <p>{copy}</p>
                </article>
              ))}
            </div>
          </section>
          <section
            className={s.section}
            id="capabilities"
            aria-labelledby="capabilities-title"
          >
            <Chapter number="04" label="THE CAPABILITY SYSTEM" />
            <div className={s.intro}>
              <h2 id="capabilities-title">
                One product needs more than one discipline.
              </h2>
              <p>
                Design, engineering and information work overlap. A review can
                start at any layer.
              </p>
            </div>
            <CapabilityAnatomy />
          </section>
          <section
            className={s.section}
            id="journey"
            aria-labelledby="journey-title"
          >
            <Chapter number="05" label="FROM IDEA TO OPERATION" />
            <div className={s.intro}>
              <h2 id="journey-title">Make the next step clearer.</h2>
              <p>
                Start where you need help. Agree the useful steps, then make
                progress visible.
              </p>
            </div>
            <OperationStory />
          </section>
          <section className={s.section} id="fit" aria-labelledby="fit-title">
            <Chapter number="06" label="WHEN TAVYORA IS USEFUL" />
            <div className={s.intro}>
              <h2 id="fit-title">Does this sound familiar?</h2>
            </div>
            <div className={s.fit}>
              <ul>
                {situations.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
              <aside>
                <p>
                  A useful first conversation starts with what is difficult
                  today.
                </p>
                <small>
                  Some work needs a wider team or specialist expertise. We can
                  establish where Tavyora fits before agreeing a scope.
                </small>
              </aside>
            </div>
          </section>
          <section
            className={s.section}
            id="engagements"
            aria-labelledby="engagements-title"
          >
            <Chapter number="07" label="HOW AN ENGAGEMENT CAN START" />
            <div className={s.intro}>
              <h2 id="engagements-title">Start with a manageable scope.</h2>
              <p>
                Begin with a conversation about the problem, constraints and
                desired outcome. Agree the work and responsibilities before
                implementation.
              </p>
            </div>
            <div className={s.engagements}>
              {engagements.map(([title, copy, start], i) => (
                <article key={title} className={s.engagement}>
                  <span className={s.number}>0{i + 1}</span>
                  <div>
                    <h3>{title}</h3>
                    <p>{copy}</p>
                  </div>
                  <p>{start}</p>
                </article>
              ))}
            </div>
          </section>
          <section
            className={s.closing}
            id="conversation"
            aria-labelledby="closing-title"
          >
            <span className={b.eyebrow}>
              08 / LET’S FIND THE STARTING POINT
            </span>
            <h2 id="closing-title">
              Bring us
              <br />
              <em>the problem.</em>
            </h2>
            <p>
              You do not need a finished specification to start a conversation.
              Tell us what you are trying to do and where you need a hand.
            </p>
            <div className={s.actions}>
              {/* Direct email remains available alongside the Contact page draft flow. */}
              <a className={b.primary} href={projectHref}>
                Start a technology conversation <Arrow diagonal />
              </a>
              <a href="mailto:hello@tavyora.com">hello@tavyora.com</a>
            </div>
          </section>
        </main>
        <Footer />
      </div>
    </MotionProvider>
  );
}
