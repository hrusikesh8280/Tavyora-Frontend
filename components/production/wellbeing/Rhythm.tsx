"use client";
import { useCallback, useEffect, useId, useRef, useState } from "react";
import Image, { type ImageLoaderProps } from "next/image";
import { useMotionPreference } from "../MotionProvider";
import { sessionStages } from "./content";
import s from "./wellbeing.module.css";
import b from "../system.module.css";
// M + two cubic curves; all states remain open. This is an illustration, not a breathing timer.
const states = [
  [0, 360, 110, 365, 90, 155, 280, 150, 430, 145, 420, 330, 600, 285],
  [0, 390, 190, 390, 120, 105, 320, 100, 480, 95, 445, 230, 600, 165],
  [0, 365, 130, 365, 130, 245, 300, 245, 440, 245, 460, 110, 600, 110],
  [0, 330, 170, 330, 135, 190, 310, 190, 470, 190, 445, 320, 600, 300],
];
const foregroundStates = [
  [0, 440, 140, 440, 180, 370, 300, 370, 430, 370, 470, 425, 600, 425],
  [0, 450, 130, 450, 220, 410, 320, 400, 440, 385, 490, 330, 600, 330],
  [0, 440, 130, 440, 240, 350, 340, 350, 450, 350, 490, 420, 600, 420],
  [0, 445, 130, 445, 210, 415, 310, 415, 440, 415, 470, 440, 600, 440],
];
const contour = (values: number[], i: number) =>
  `M${values[0]} ${values[1] + i * 13} C${values[2]} ${values[3] + i * 13} ${values[4] + i * 9} ${values[5] + i * 15} ${values[6] + i * 7} ${values[7] + i * 16} C${values[8] + i * 7} ${values[9] + i * 16} ${values[10]} ${values[11] + i * 13} ${values[12]} ${values[13] + i * 13}`;
const figures = [
  {
    name: "arrive",
    alt: "Seated figure on a mat, with hands resting on her knees.",
  },
  {
    name: "move",
    alt: "The same figure standing in a gentle side reach.",
  },
  {
    name: "breathe",
    alt: "The same figure seated upright, with open space around her.",
  },
  {
    name: "close",
    alt: "The same figure resting with hands in her lap.",
  },
] as const;
// Local pre-sized WebP assets: portable to static hosting, no image service required.
function figureLoader({ src, width }: ImageLoaderProps) {
  const size = [320, 480, 768, 1024].find((size) => size >= width) ?? 1024;
  return `${src.replace("-1024.webp", `-${size}.webp`)}?w=${size}`;
}
export function Rhythm() {
  const apertureId = useId();
  const [selected, setSelected] = useState(0);
  const [visited, setVisited] = useState([0]);
  const [visible, setVisible] = useState(0);
  const ready = useRef(new Set<number>());
  const active = useMotionPreference();
  const ref = useRef<HTMLDivElement>(null);
  const current = useRef(states[0]);
  const currentFront = useRef(foregroundStates[0]);
  const storyRef = useRef<HTMLDivElement>(null);
  const selectedRef = useRef(0);
  const manualSelection = useRef(false);
  const choose = useCallback((index: number, manual = true) => {
    if (manual) manualSelection.current = true;
    selectedRef.current = index;
    setSelected(index);
    setVisited((items) => (items.includes(index) ? items : [...items, index]));
    if (ready.current.has(index)) setVisible(index);
  }, []);
  // Scroll is an input, never a clock. Manual choices remain until a deliberate scroll.
  useEffect(() => {
    const wide = matchMedia("(min-width: 1025px) and (min-height: 720px)");
    const reduced = matchMedia("(prefers-reduced-motion: reduce)");
    let frame = 0;
    const update = () => {
      frame = 0;
      if (!active || !wide.matches || reduced.matches) return;
      if (manualSelection.current) return;
      const story = storyRef.current;
      if (!story) return;
      const bounds = story.getBoundingClientRect();
      const zone = innerHeight * 0.48;
      if (bounds.top > zone || bounds.bottom < zone) return;
      const buttons = Array.from(
        story.querySelectorAll<HTMLButtonElement>("button[data-chapter]"),
      );
      const distances = buttons.map((button) => {
        const r = button.getBoundingClientRect();
        return Math.abs(r.top + r.height / 2 - zone);
      });
      const closest = distances.indexOf(Math.min(...distances));
      if (
        closest >= 0 &&
        closest !== selectedRef.current &&
        distances[closest] + 32 < distances[selectedRef.current]
      )
        choose(closest, false);
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    const resumeScroll = () => {
      manualSelection.current = false;
    };
    const onNavigationKey = (event: KeyboardEvent) => {
      if (
        ["PageDown", "PageUp", "Home", "End", "ArrowDown", "ArrowUp"].includes(
          event.key,
        ) ||
        (event.key === " " && !(event.target instanceof HTMLButtonElement))
      )
        resumeScroll();
    };
    const onScrollbar = (event: PointerEvent) => {
      if (event.clientX >= document.documentElement.clientWidth) resumeScroll();
    };
    window.addEventListener("wheel", resumeScroll, { passive: true });
    window.addEventListener("touchmove", resumeScroll, { passive: true });
    window.addEventListener("keydown", onNavigationKey);
    window.addEventListener("pointerdown", onScrollbar);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("wheel", resumeScroll);
      window.removeEventListener("touchmove", resumeScroll);
      window.removeEventListener("keydown", onNavigationKey);
      window.removeEventListener("pointerdown", onScrollbar);
    };
  }, [active, choose]);
  useEffect(() => {
    const svg = ref.current;
    if (!svg) return;
    const target = states[selected],
      from = [...current.current];
    const fromFront = [...currentFront.current];
    let frame = 0;
    if (from.every((v, i) => v === target[i])) return;
    const paint = (p: number) => {
      const values = from.map((v, i) => v + (target[i] - v) * p);
      current.current = values;
      const front = fromFront.map(
        (v, i) => v + (foregroundStates[selected][i] - v) * p,
      );
      currentFront.current = front;
      svg.querySelector("[data-front]")?.setAttribute("d", contour(front, 0));
      svg
        .querySelectorAll<SVGPathElement>("path[data-line]")
        .forEach((path) =>
          path.setAttribute("d", contour(values, Number(path.dataset.line))),
        );
    };
    if (!active || matchMedia("(prefers-reduced-motion: reduce)").matches) {
      paint(1);
      return;
    }
    const start = performance.now(),
      duration = selected === 2 ? 1500 : 1250;
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / duration);
      paint(1 - Math.pow(1 - t, 3));
      if (t < 1) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [selected, active]);
  return (
    <div
      className={s.rhythm}
      ref={storyRef}
      data-session-stage={sessionStages[selected].name.toLowerCase()}
    >
      <div className={s.rhythmField}>
        <p className={b.eyebrow}>EDITORIAL POSE STAGE</p>
        <p className={s.storyInvitation}>One practice. Room for each moment.</p>
        <figure
          className={s.humanStudy}
          aria-label="An editorial illustration of session rhythm"
        >
          <div
            ref={ref}
            className={s.studyStage}
            data-human-stage={figures[selected].name}
          >
            <svg className={s.apertureDefinition} aria-hidden="true">
              <defs>
                {/* Sixteen warm ink values turn source photography into a print study.
                    Geometry, source bytes and state choreography are unchanged. */}
                <filter id={`${apertureId}-ink`} colorInterpolationFilters="sRGB">
                  <feColorMatrix type="saturate" values="0" />
                  <feComponentTransfer>
                    <feFuncR type="discrete" tableValues="0.190 0.241 0.292 0.343 0.393 0.444 0.495 0.546 0.597 0.648 0.699 0.750 0.800 0.851 0.902 0.953" />
                    <feFuncG type="discrete" tableValues="0.210 0.258 0.307 0.355 0.404 0.452 0.501 0.549 0.598 0.646 0.695 0.743 0.792 0.840 0.889 0.937" />
                    <feFuncB type="discrete" tableValues="0.200 0.247 0.294 0.340 0.387 0.434 0.481 0.528 0.574 0.621 0.668 0.715 0.762 0.808 0.855 0.902" />
                  </feComponentTransfer>
                  <feGaussianBlur stdDeviation="0.32" />
                </filter>
                <clipPath id={apertureId} clipPathUnits="objectBoundingBox">
                  <path d="M.04 .02 L.65 .02 C.85 .02 .98 .16 .98 .38 L.98 .98 L.34 .98 C.14 .98 .04 .88 .04 .68 Z" />
                </clipPath>
              </defs>
            </svg>
            <div
              className={s.studyAperture}
              style={{ clipPath: `url(#${apertureId})` }}
              aria-hidden="true"
            />
            <span className={s.studyIndex} aria-hidden="true">
              0{selected + 1} / 04
            </span>
            <svg
              className={s.contourBehind}
              viewBox="0 0 600 500"
              preserveAspectRatio="none"
              fill="none"
              aria-hidden="true"
              data-session-contour
            >
              {Array.from({ length: 4 }, (_, i) => (
                <path key={i} data-line={i} d={contour(states[0], i)} />
              ))}
            </svg>
            <div
              className={s.figureAperture}
              style={{ clipPath: `url(#${apertureId})` }}
            >
              {visited.map((i) => (
                <div
                  key={i}
                  className={s.figureLayer}
                  data-pose={figures[i].name}
                  data-visible={visible === i}
                  aria-hidden={visible !== i}
                >
                  <Image
                    loader={figureLoader}
                    style={{ filter: `url(#${apertureId}-ink)` }}
                    src={`/images/session-study/${figures[i].name}-1024.webp`}
                    width={1024}
                    height={1024}
                    sizes="(max-width: 600px) 75vw, (max-width: 1024px) 34vw, 32vw"
                    alt={figures[i].alt}
                    loading="lazy"
                    decoding="async"
                    onLoad={() => {
                      ready.current.add(i);
                      if (i === selectedRef.current) setVisible(i);
                    }}
                  />
                </div>
              ))}
              <div className={s.studyLight} aria-hidden="true" />
            </div>
            <svg
              className={s.contourFront}
              viewBox="0 0 600 500"
              preserveAspectRatio="none"
              fill="none"
              aria-hidden="true"
            >
              <path data-front d={contour(foregroundStates[0], 0)} />
            </svg>
          </div>
        </figure>
        <p className={s.rhythmStatus} aria-live="polite" aria-atomic="true">
          0{selected + 1} / {sessionStages[selected].name}
        </p>
        <p className={s.mobileStageCopy}>{sessionStages[selected].copy}</p>
      </div>
      <div
        className={s.rhythmChoices}
        aria-label="Explore the rhythm of a session"
      >
        <noscript>
          <style>{`.${s.rhythmChoice} .${s.stageCopy}{display:block!important;margin-top:12px}`}</style>
        </noscript>
        {sessionStages.map((stage, i) => (
          <button
            type="button"
            key={stage.name}
            aria-pressed={selected === i}
            data-chapter={i}
            onFocus={() => choose(i)}
            onClick={() => choose(i)}
            className={s.rhythmChoice}
          >
            <span className={s.number}>0{i + 1}</span>
            <span>
              <span className={s.stageName}>{stage.name}</span>
              <span className={s.stageCopy}>{stage.copy}</span>
            </span>
            <span className={s.stageMark} aria-hidden="true" />
          </button>
        ))}
      </div>
      <div className={s.storyClosing}>
        <p>You can begin with questions, not experience.</p>
        <a href="mailto:hello@tavyora.com?subject=Yoga%20enquiry%20%E2%80%94%20Tavyora">
          Ask about a session <span aria-hidden="true">↗</span>
        </a>
      </div>
    </div>
  );
}
