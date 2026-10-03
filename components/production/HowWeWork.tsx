import { Chapter } from "./Chapter";
import s from "./system.module.css";
import h from "./homepage.module.css";
const principles = [
  {
    title: "Start with the real problem.",
    copy: "Agree what needs attention, what can wait and what a useful outcome looks like. A clear question is a better starting point than a long feature list.",
  },
  {
    title: "Work through the trade-offs.",
    copy: "Consider design, engineering and day-to-day use together. Make the trade-offs visible before they become expensive decisions.",
  },
  {
    title: "Make the next step clear.",
    copy: "Keep scope, decisions and handover understandable. The work should leave you knowing what happens next and why.",
  },
];
export function HowWeWork() {
  return (
    <section
      id="how-we-work"
      className={h.howWeWork}
      aria-labelledby="how-title"
    >
      <Chapter number="05" label="HOW TAVYORA WORKS" />
      <div className={h.workIntro}>
        <div>
          <p className={s.eyebrow}>INDEPENDENT. DIRECT. DELIBERATE.</p>
          <h2 id="how-title">Work directly with Tavyora.</h2>
        </div>
        <p>
          Tavyora is an independent practice. Technology projects begin with the
          problem, the constraints and the people who will use the system.
        </p>
      </div>
      <ol className={h.principles}>
        {principles.map((p, i) => (
          <li key={p.title}>
            <span className={s.eyebrow}>0{i + 1}</span>
            <h3>{p.title}</h3>
            <p>{p.copy}</p>
          </li>
        ))}
      </ol>
    </section>
  );
}
