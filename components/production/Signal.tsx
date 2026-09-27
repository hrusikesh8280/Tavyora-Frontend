"use client";
import { useEffect, useRef } from "react";
import { useMotionPreference } from "./MotionProvider";
import s from "./system.module.css";
import thread from "./hero-thread.module.css";

// One family: parallel paths, orthogonal turns, then open cubic curves.
export function HeroSignal() {
  const ref = useRef<HTMLSpanElement>(null);
  const active = useMotionPreference();
  const entered = useRef(false);
  useEffect(() => {
    const node = ref.current;
    if (!node || !active) return;
    const hero = node.closest("section")!;
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const highlight = node.querySelector("[data-entrance]");
    let entrance: Animation | undefined;
    if (!entered.current && highlight) {
      entered.current = true;
      entrance = highlight.animate(
        [
          { strokeDashoffset: 1, opacity: 0 },
          { opacity: 0.9, offset: 0.18 },
          { opacity: 0.9, offset: 0.72 },
          { strokeDashoffset: -0.1, opacity: 0 },
        ],
        {
          duration: 1500,
          easing: "cubic-bezier(.22,.65,.3,1)",
          fill: "forwards",
        },
      );
    }
    let frame = 0,
      visible = false,
      x = 0;
    const paint = () => {
      frame = 0;
      if (visible && !document.hidden)
        node.style.setProperty("--travel", `${x}px`);
    };
    const schedule = () => {
      if (!frame && visible && !document.hidden)
        frame = requestAnimationFrame(paint);
    };
    const move = (e: PointerEvent) => {
      if (matchMedia("(pointer:fine) and (min-width: 800px)").matches) {
        x = (e.clientX - innerWidth / 2) * 0.025;
        schedule();
      }
    };
    const reset = () => {
      x = 0;
      schedule();
    };
    const observer = new IntersectionObserver(([e]) => {
      visible = e.isIntersecting;
      if (!visible) {
        reset();
        entrance?.finish();
      }
    });
    observer.observe(node);
    hero.addEventListener("pointermove", move);
    hero.addEventListener("pointerleave", reset);
    return () => {
      observer.disconnect();
      entrance?.cancel();
      cancelAnimationFrame(frame);
      hero.removeEventListener("pointermove", move);
      hero.removeEventListener("pointerleave", reset);
      node.style.removeProperty("--travel");
    };
  }, [active]);
  return (
    <span
      ref={ref}
      className={`${s.heroSignal} ${thread.thread}`}
      aria-hidden="true"
    >
      <svg viewBox="0 0 1280 90" preserveAspectRatio="none" fill="none">
        {Array.from({ length: 5 }, (_, i) => (
          <path
            key={i}
            data-strand={i}
            d={`M ${24 + i * 5} 0 V ${12 + i * 5} Q ${24 + i * 5} ${28 + i * 5} ${40 + i * 5} ${28 + i * 5} H ${400 + i * 18} Q ${416 + i * 18} ${28 + i * 5} ${432 + i * 18} ${42 + i * 5} L ${450 + i * 18} ${58 + i * 5} H ${1228 - i * 5} Q ${1244 - i * 5} ${58 + i * 5} ${1244 - i * 5} ${74 + i * 3} V90`}
          />
        ))}
        <path
          data-entrance
          className={thread.entrance}
          pathLength="1"
          d="M24 0V12Q24 28 40 28H400Q416 28 432 42L450 58H1228Q1244 58 1244 74V90"
        />
        <path className={s.signalCursor} d="M650 58h42" />
        <path className={s.signalTerminal} d="M650 54v8M692 54v8" />
      </svg>
    </span>
  );
}

export function contour(i: number, p: number) {
  const x = 24 + i * 5,
    y = 110 + i * 3;
  const rigid = [
    x,
    0,
    x,
    50,
    x,
    100,
    x,
    y,
    x,
    y,
    1120 - i * 8,
    y,
    1120 - i * 8,
    y,
    1120 - i * 8,
    y,
    1120 - i * 8,
    465 - i * 2,
    1120 - i * 8,
    465 - i * 2,
    1120 - i * 8,
    465 - i * 2,
    x,
    465 - i * 2,
    x,
    580,
  ];
  const open = [
    x,
    0,
    x,
    100,
    240 + i * 8,
    25,
    430 + i * 5,
    100 + i * 4,
    620 + i * 10,
    180 + i * 4,
    1120 - i * 4,
    40 + i * 3,
    1110 - i * 7,
    260 + i * 6,
    1100 - i * 7,
    430 + i * 6,
    710 + i * 9,
    515 + i * 2,
    420 + i * 7,
    470 + i * 3,
    220 + i * 5,
    440 + i * 3,
    x,
    455,
    x,
    580,
  ];
  const v = rigid.map((a, j) => (a + (open[j] - a) * p).toFixed(1));
  return `M${v[0]} ${v[1]} C${v.slice(2, 8).join(" ")} C${v.slice(8, 14).join(" ")} C${v.slice(14, 20).join(" ")} C${v.slice(20, 26).join(" ")}`;
}
function Field({ progress = 0 }: { progress?: number }) {
  return (
    <svg
      viewBox="0 0 1280 580"
      preserveAspectRatio="none"
      fill="none"
      aria-hidden="true"
    >
      {Array.from({ length: 16 }, (_, i) => (
        <path
          key={i}
          data-strand={i}
          d={contour(i, progress)}
          style={{ opacity: i > 5 ? 1 - progress * 0.94 : 1 }}
        />
      ))}
    </svg>
  );
}
export function TransitionSignal() {
  const ref = useRef<HTMLDivElement>(null),
    active = useMotionPreference();
  useEffect(() => {
    const node = ref.current;
    if (
      !node ||
      !active ||
      matchMedia("(prefers-reduced-motion: reduce)").matches
    )
      return;
    const paths = Array.from(
      node.querySelectorAll<SVGPathElement>("[data-morph] path"),
    );
    let frame = 0,
      visible = false,
      last = -1;
    const paint = () => {
      frame = 0;
      if (!visible || document.hidden) return;
      const r = node.getBoundingClientRect();
      const linear = Math.max(
        0,
        Math.min(
          1,
          (innerHeight * 0.85 - r.top) / (innerHeight * 0.5 + r.height * 0.5),
        ),
      );
      const p = linear * linear * (3 - 2 * linear);
      if (Math.abs(p - last) < 0.003) return;
      last = p;
      const mobile = matchMedia("(max-width: 600px)").matches;
      paths.forEach((path, i) => {
        if (mobile && i > 7) return;
        path.setAttribute("d", contour(i, p));
        path.style.opacity = String(i > 5 ? 1 - p * 0.94 : 1);
      });
    };
    const schedule = () => {
      if (!frame && visible && !document.hidden)
        frame = requestAnimationFrame(paint);
    };
    const observer = new IntersectionObserver(([e]) => {
      visible = e.isIntersecting;
      schedule();
    });
    observer.observe(node);
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    document.addEventListener("visibilitychange", schedule);
    return () => {
      observer.disconnect();
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      document.removeEventListener("visibilitychange", schedule);
    };
  }, [active]);
  return (
    <div ref={ref} className={s.transitionField}>
      <div data-morph className={s.morphField}>
        <Field />
        <div className={s.transitionWords}>
          <p className={s.eyebrow}>03 / SIGNAL → BREATH</p>
          <h2>
            Different practices.
            <br />
            <em>The same care.</em>
          </h2>
          <p>
            Clarity in what we build.
            <br />
            Attention in how we practise.
          </p>
        </div>
      </div>
      <div className={s.staticPair}>
        <figure>
          <Field progress={0} />
          <figcaption>01 / Structure gives direction.</figcaption>
        </figure>
        <figure>
          <Field progress={1} />
          <figcaption>02 / Space makes room for practice.</figcaption>
        </figure>
        <div className={s.staticWords}>
          <h2>
            Different practices.
            <br />
            <em>The same care.</em>
          </h2>
          <p>Clarity in what we build. Attention in how we practise.</p>
        </div>
      </div>
    </div>
  );
}
