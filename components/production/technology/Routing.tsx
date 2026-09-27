"use client";
import { useEffect, useRef, useState } from "react";
import { useMotionPreference } from "../MotionProvider";
import { problems } from "./content";
import s from "./technology.module.css";
import base from "../system.module.css";

// Each path has a distinct job. Shared orthogonal grammar avoids network imagery.
const paths = [
  ["M16 80H100V32H288", "M100 80H288", "M100 80V128H288"],
  ["M16 80H64V24H144V136H224V80H304", "M16 80H304"],
  ["M16 24H96V80H192V48H304", "M16 136H96V80H192V112H304", "M16 80H304"],
  ["M16 80H304", "M80 80V24H240V80", "M80 80V136H240V80"],
];
export function Routing() {
  const [selected, setSelected] = useState(0);
  const active = useMotionPreference();
  const svg = useRef<SVGSVGElement>(null);
  const root = useRef<HTMLDivElement>(null);
  const current = problems[selected];
  useEffect(() => {
    if (!active || matchMedia("(prefers-reduced-motion: reduce)").matches)
      return;
    const animations = Array.from(
      svg.current?.querySelectorAll("[data-route-trace]") ?? [],
    ).map((path, i) =>
      path.animate(
        [
          { strokeDashoffset: 1, opacity: 0.25 },
          { strokeDashoffset: 0, opacity: 1 },
        ],
        { duration: 340, delay: i * 35, easing: "cubic-bezier(.2,.7,.2,1)" },
      ),
    );
    return () => animations.forEach((a) => a.cancel());
  }, [selected, active]);
  useEffect(() => {
    const el = root.current;
    if (!el) return;
    const connector = el.querySelector<SVGPathElement>("[data-connector]")!;
    let animation: Animation | undefined;
    const update = () => {
      const choices = el.querySelector("[data-choices]")!;
      const button = choices.children[selected];
      const box = button
        .querySelector("[data-problem-port]")!
        .getBoundingClientRect();
      const gutter = el.querySelector("[data-gutter]")!.getBoundingClientRect();
      const all = el.getBoundingClientRect();
      const y = ((box.top - all.top + box.height / 2) / all.height) * 100;
      const x = gutter.width
        ? ((box.left + box.width / 2 - gutter.left) / gutter.width) * 100
        : 0;
      connector.setAttribute("d", `M${x} ${y} H50 V0 H100`);
    };
    update();
    const observer = new ResizeObserver(update);
    observer.observe(el);
    if (active && !matchMedia("(prefers-reduced-motion: reduce)").matches) {
      animation = connector.animate([{ opacity: 0.3 }, { opacity: 1 }], {
        duration: 300,
        easing: "ease-out",
      });
    }
    return () => {
      observer.disconnect();
      animation?.cancel();
    };
  }, [selected, active]);
  return (
    <div ref={root} className={s.routing} data-problem={current.id}>
      <svg
        data-gutter
        className={s.connector}
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        fill="none"
        aria-hidden="true"
      >
        <path data-connector d="M0 12.5H50V0H100" pathLength="1" />
      </svg>
      <div
        data-choices
        className={s.choices}
        aria-label="Choose a technology starting point"
      >
        {problems.map((p, i) => (
          <button
            key={p.id}
            type="button"
            aria-pressed={selected === i}
            aria-controls="problem-detail"
            onPointerEnter={(e) => {
              if (
                e.pointerType === "mouse" &&
                !e.currentTarget.parentElement?.querySelector(":focus-visible")
              )
                setSelected(i);
            }}
            onFocus={() => setSelected(i)}
            onClick={() => setSelected(i)}
            className={s.choice}
          >
            <span className={s.number}>0{i + 1}</span>
            <span>
              <span className={s.problemName}>{p.name}</span>
              <span className={s.problemIntro}>{p.intro}</span>
              <span className={s.skills}>{p.skills}</span>
            </span>
            <span data-problem-port className={s.port} aria-hidden="true" />
          </button>
        ))}
      </div>
      <div
        className={s.routeResult}
        id="problem-detail"
        role="region"
        aria-label="Suggested technology path"
      >
        <div aria-live="polite" aria-atomic="true">
          <p className={base.eyebrow}>
            PATH 0{selected + 1} / {current.name}
          </p>
          <h3>{current.title}</h3>
          <p className={s.resultCopy}>{current.description}</p>
        </div>
        <svg
          ref={svg}
          className={s.routingDiagram}
          viewBox="0 0 320 160"
          fill="none"
          aria-hidden="true"
          data-routing-state={current.id}
        >
          {selected === 1 && <path className={s.oldRoute} d={paths[1][0]} />}
          {paths[selected]
            .filter((_, i) => selected !== 1 || i !== 0)
            .map((d, i) => (
              <path
                key={`${selected}-${i}`}
                d={d}
                pathLength="1"
                data-route-trace
              />
            ))}
          {selected === 3 ? (
            [16, 80, 160, 240, 304].map((x) => (
              <rect key={x} x={x - 4} y="76" width="8" height="8" />
            ))
          ) : (
            <>
              <circle cx="16" cy={selected === 2 ? 24 : 80} r="3" />
              <circle
                cx={selected === 0 ? 288 : 304}
                cy={selected === 0 ? 128 : 80}
                r="3"
              />
            </>
          )}
        </svg>
        <ol className={s.routeStages}>
          {current.stages.map((stage, i) => (
            <li key={stage}>
              <span className={s.number}>0{i + 1}</span>
              {stage}
            </li>
          ))}
        </ol>
        <p className={s.routeNote}>{current.note}</p>
        <a className={base.textLink} href={`#capability-${current.id}`}>
          See the related capabilities <span aria-hidden="true">↓</span>
        </a>
      </div>
    </div>
  );
}
