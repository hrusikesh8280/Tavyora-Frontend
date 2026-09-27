"use client";
import { useEffect, useRef, useState } from "react";
import { useMotionPreference } from "./MotionProvider";
import { problems, projectHref } from "./content";
import { Arrow } from "../shared/Arrow";
import s from "./system.module.css";
export function Technology({ children }: { children: React.ReactNode }) {
  const [selected, setSelected] = useState(0);
  const current = problems[selected];
  const active = useMotionPreference();
  const trace = useRef<SVGPathElement>(null);
  const previousY = useRef(80);
  const y = 80 + selected * 156;
  useEffect(() => {
    const node = trace.current;
    if (!node) return;
    const start = previousY.current;
    const draw = (value: number) => {
      previousY.current = value;
      node.setAttribute("d", `M432 ${value} H496 V324 H948`);
    };
    if (!active || matchMedia("(prefers-reduced-motion: reduce)").matches) {
      draw(y);
      return;
    }
    let frame = 0;
    const begin = performance.now();
    const step = (now: number) => {
      const t = Math.min(1, (now - begin) / 240);
      draw(t === 1 ? y : start + (y - start) * (1 - (1 - t) ** 3));
      if (t < 1) frame = requestAnimationFrame(step);
    };
    frame = requestAnimationFrame(step);
    return () => cancelAnimationFrame(frame);
  }, [y, active]);
  const trunk = `M432 ${y} H496 V324 H948`;
  return (
    <div data-route={current.id} className={s.technologyBody}>
      <div className={s.problemPaths}>
        <div
          className={s.problemChoices}
          aria-label="Choose your starting point"
        >
          {problems.map((p, i) => (
            <button
              key={p.id}
              type="button"
              aria-pressed={selected === i}
              aria-controls="technology-route-detail"
              onFocus={() => setSelected(i)}
              onClick={() => setSelected(i)}
              className={s.problemChoice}
            >
              <span className={s.problemNumber}>0{i + 1}</span>
              <span>
                <span className={s.problemName}>{p.name}</span>
                <span className={s.problemIntro}>{p.intro}</span>
                <span className={s.problemSkills}>{p.skills}</span>
              </span>
              <span className={s.choicePoint} aria-hidden="true" />
            </button>
          ))}
        </div>
        <svg
          className={s.routeMap}
          viewBox="0 0 1000 624"
          preserveAspectRatio="none"
          fill="none"
          aria-hidden="true"
        >
          <path className={s.routeGuide} d="M496 0V624" />
          {problems.map((p, i) => (
            <g
              key={p.id}
              data-route-path={p.id}
              data-active={selected === i ? "true" : "false"}
            >
              <path d={`M432 ${80 + i * 156} H496 V324 H948`} />
              {i === 1 && <path d="M948 324V414H588V324" />}
              {i === 2 && (
                <>
                  <path d="M588 324V284H768V324" />
                  <path d="M588 324V364H768V324" />
                </>
              )}
              {i === 3 && (
                <path d="M588 308h24v32h-24z M756 308h24v32h-24z M936 308h24v32h-24z" />
              )}
            </g>
          ))}
          <path
            ref={trace}
            data-selected-path
            d={trunk}
            className={s.activeTrace}
          />
          {[600, 768, 948].map((x) => (
            <circle key={x} cx={x} cy="324" r="4" className={s.routeNode} />
          ))}
        </svg>
        <div
          className={s.routeDetail}
          id="technology-route-detail"
          role="region"
          aria-label="Suggested capability path"
          aria-live="polite"
          aria-atomic="true"
        >
          <div className={s.routeDescription}>
            <p className={s.eyebrow}>
              PATH 0{selected + 1} / {current.name}
            </p>
            <h3>{current.title}</h3>
            <p>{current.description}</p>
          </div>
          <svg
            className={s.mobileRoute}
            viewBox="0 0 320 68"
            preserveAspectRatio="none"
            fill="none"
            aria-hidden="true"
          >
            <path d="M0 34H320" />
            {selected === 1 && <path d="M312 34V62H8V34" />}
            {selected === 2 && <path d="M40 34V6H200V34 M40 34V62H200V34" />}
            {selected === 3 && (
              <path d="M0 26h16v16H0z M152 26h16v16h-16z M304 26h16v16h-16z" />
            )}
          </svg>
          <ol className={s.routeStages}>
            {current.stages.map((stage, i) => (
              <li key={stage}>
                <span>0{i + 1}</span>
                {stage}
              </li>
            ))}
          </ol>
          <div className={s.routeOutcome}>
            <p>{current.note}</p>
            <a href={projectHref}>
              Talk through your project <Arrow diagonal />
            </a>
          </div>
        </div>
      </div>
      {children}
    </div>
  );
}
