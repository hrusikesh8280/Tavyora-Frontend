import type { ReactNode } from "react";
import { PageFrame } from "../editorial/PageFrame";
import s from "./legal.module.css";
export type LegalSection = { id: string; title: string; content: ReactNode };
export function LegalPage({
  kind,
  title,
  introduction,
  sections,
}: {
  kind: "privacy" | "terms";
  title: string;
  introduction: string;
  sections: LegalSection[];
}) {
  return (
    <PageFrame current={`/${kind}`}>
      <header className={s.hero}>
        <p className={s.kicker}>
          Tavyora / {kind === "privacy" ? "Privacy notice" : "Website terms"}
        </p>
        <h1>{title}</h1>
        <p className={s.intro}>{introduction}</p>
        <p className={s.updated}>
          Last updated <time dateTime="2026-09-27">27 September 2026</time>
        </p>
      </header>
      <div className={s.reading}>
        <nav className={s.index} aria-label="On this page">
          <p className={s.kicker}>On this page</p>
          <ol>
            {sections.map((section) => (
              <li key={section.id}>
                <a href={`#${section.id}`}>{section.title}</a>
              </li>
            ))}
          </ol>
        </nav>
        <div className={s.body}>
          {sections.map((section, i) => (
            <section
              className={s.section}
              id={section.id}
              key={section.id}
              aria-labelledby={`${section.id}-title`}
            >
              <span className={s.number} aria-hidden="true">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h2 id={`${section.id}-title`}>{section.title}</h2>
              {section.content}
            </section>
          ))}
        </div>
      </div>
    </PageFrame>
  );
}
