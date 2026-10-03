import Link from "next/link";
import { PageFrame } from "../../components/production/editorial/PageFrame";
import { Connection } from "../../components/production/editorial/Connection";
import { Chapter } from "../../components/production/Chapter";
import { Arrow } from "../../components/shared/Arrow";
import { editorialMetadata, editorialSchema } from "../../lib/editorial-seo";
import s from "../../components/production/editorial/editorial.module.css";
import b from "../../components/production/system.module.css";
export const metadata = editorialMetadata("about");
const principles = [
  [
    "Understand before acting.",
    "Ask what is difficult, who it affects and what has already been tried. Agree what needs attention before proposing a response.",
  ],
  [
    "Leave less in the way.",
    "Remove unnecessary steps, unclear decisions and avoidable friction. Complexity should earn its place in the work.",
  ],
  [
    "Stay close to the work.",
    "Keep conversations direct and decisions connected to implementation. Process should help the work, not become a layer between people.",
  ],
  [
    "Make it usable.",
    "A system needs to make sense to the people using and operating it. Instruction needs to be clear enough to follow without rushing.",
  ],
  [
    "Be clear about what exists.",
    "Describe the work and capabilities honestly. Distinguish what is offered today from what is still an idea.",
  ],
  [
    "Keep attention in the practice.",
    "The wellbeing offering is grounded in qualified yoga instruction. Listen, explain and leave room for questions, rather than making promises about outcomes.",
  ],
];
export default function AboutPage() {
  return (
    <PageFrame current="/about">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(editorialSchema("about")).replace(
            /</g,
            "\\u003c",
          ),
        }}
      />
      <section className={s.hero} aria-labelledby="about-title">
        <nav className={s.breadcrumb} aria-label="Breadcrumb">
          <Link href="/">Home</Link>
          <span aria-hidden="true">/</span>
          <span aria-current="page">About</span>
        </nav>
        <p className={b.eyebrow}>01 / THE WAY WE PAY ATTENTION</p>
        <h1 id="about-title">
          Different disciplines.
          <br />
          <em>The same attention.</em>
        </h1>
        <Connection />
        <div className={s.heroNote}>
          <span className={b.eyebrow}>
            DISTINCT WORK.
            <br />
            SHARED STANDARDS.
          </span>
          <p>
            Technology and wellbeing ask different questions. Both deserve care,
            attention and an understanding of the person on the other side.
          </p>
        </div>
      </section>
      <section className={s.section} aria-labelledby="what-title">
        <Chapter number="02" label="WHAT TAVYORA IS" />
        <div className={s.intro}>
          <h2 id="what-title">An independent business in India.</h2>
          <div>
            <p>
              Tavyora is an independent business based in India, working across
              technology consultancy, software and product development, and
              practitioner-led online yoga.
            </p>
            <p>
              The disciplines are distinct. In both, we ask what is needed,
              explain our decisions and stay close to the people using the work.
            </p>
          </div>
        </div>
      </section>
      <section className={s.disciplines} aria-labelledby="disciplines-title">
        <Chapter number="03" label="TWO DISCIPLINES" />
        <h2 id="disciplines-title" className={s.sectionHeading}>
          Two disciplines, each with its own work.
        </h2>
        <div className={s.disciplineGrid}>
          <article>
            <span className={b.eyebrow}>A / TECHNOLOGY</span>
            <h3>Design and build useful software.</h3>
            <svg viewBox="0 0 480 100" fill="none" aria-hidden="true">
              <path d="M0 20H120L180 60H480M0 32H114L174 72H480M0 44H108L168 84H480" />
            </svg>
            <p>
              Product design and engineering, from the interface to the software
              and workflows behind it.
            </p>
            <p className={s.annotation}>STRUCTURED / DESIGNED / ENGINEERED</p>
            <Link className={b.textLink} href="/technology">
              Explore technology <Arrow diagonal />
            </Link>
          </article>
          <article>
            <span className={b.eyebrow}>B / WELLBEING</span>
            <h3>Online yoga with personal guidance.</h3>
            <svg viewBox="0 0 480 100" fill="none" aria-hidden="true">
              <path d="M0 60C140 60 120 10 240 20S340 95 480 60M0 76C140 76 120 26 240 36S340 111 480 76" />
            </svg>
            <p>
              Practitioner-led online yoga, with one-to-one and small-group
              sessions. Instruction and pacing respond to the person practising.
            </p>
            <p className={s.annotation}>GUIDED / PACED / PRACTISED</p>
            <Link className={b.textLink} href="/wellbeing">
              Explore wellbeing <Arrow diagonal />
            </Link>
          </article>
        </div>
      </section>
      <section className={s.section} aria-labelledby="principles-title">
        <Chapter number="04" label="A SHARED STANDARD" />
        <h2 className={s.sectionHeading} id="principles-title">
          How we make decisions.
        </h2>
        <ol className={s.principles}>
          {principles.map(([title, copy], i) => (
            <li key={title}>
              <span className={s.number}>0{i + 1}</span>
              <h3>{title}</h3>
              <p>{copy}</p>
            </li>
          ))}
        </ol>
      </section>
      <section
        className={s.section}
        id="how-we-work"
        aria-labelledby="work-title"
      >
        <Chapter number="05" label="HOW WE WORK" />
        <div className={s.intro}>
          <h2 id="work-title">Direct conversations, clear responsibilities.</h2>
          <div>
            <p>
              Work starts by making the situation clearer. We discuss the need,
              agree a useful next step and make expectations explicit.
            </p>
            <p>
              In technology, design and engineering inform each other from the
              start. In wellbeing, instruction and pacing respond to the person
              and the session. Being independent means staying close to those
              decisions.
            </p>
            <Link className={b.textLink} href="/contact">
              Contact Tavyora <Arrow diagonal />
            </Link>
          </div>
        </div>
      </section>
      <section className={s.section} aria-labelledby="current-title">
        <Chapter number="06" label="CURRENTLY AT TAVYORA" />
        <div className={s.current}>
          <h2 id="current-title">What we offer today.</h2>
          <ol>
            {[
              "Technology consultancy",
              "Software & product development",
              "Practitioner-led online yoga",
            ].map((name, i) => (
              <li key={name}>
                <span className={s.number}>0{i + 1}</span>
                {name}
              </li>
            ))}
          </ol>
        </div>
      </section>
      <section className={s.closing} aria-labelledby="next-title">
        <p className={b.eyebrow}>07 / TWO WAYS TO CONTINUE</p>
        <h2 id="next-title">
          Follow what
          <br />
          <em>brings you here.</em>
        </h2>
        <div className={s.closingLinks}>
          <Link href="/technology">
            <span className={b.eyebrow}>TECHNOLOGY</span>
            <strong>Explore technology</strong>
            <Arrow diagonal />
          </Link>
          <Link href="/wellbeing">
            <span className={b.eyebrow}>WELLBEING</span>
            <strong>Explore wellbeing</strong>
            <Arrow diagonal />
          </Link>
        </div>
      </section>
    </PageFrame>
  );
}
