"use client";
import { useEffect, useRef } from "react";
import { useMotionPreference } from "../MotionProvider";
import s from "./wellbeing.module.css";

// A finite opening, not a breathing exercise, timer or continuous ambient loop.
export function Breath({ variant = "hero" }: { variant?: "hero" | "pause" }) {
  const root = useRef<HTMLDivElement>(null);
  const active = useMotionPreference();
  const played = useRef(false);
  useEffect(() => {
    const el = root.current;
    if (
      !el ||
      !active ||
      matchMedia("(prefers-reduced-motion: reduce)").matches
    )
      return;
    let animations: Animation[] = [];
    const groups = Array.from(el.querySelectorAll("g"));
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !played.current) {
          played.current = true;
          animations = groups.map((group) =>
            group.animate(
              [
                { transform: "translateY(5px) scaleY(.97)" },
                { transform: "translateY(-3px) scaleY(1.015)", offset: 0.55 },
                { transform: "translateY(0) scaleY(1)" },
              ],
              {
                duration: variant === "hero" ? 4400 : 4800,
                easing: "cubic-bezier(.33,0,.25,1)",
                fill: "forwards",
              },
            ),
          );
        } else if (
          !entry.isIntersecting &&
          animations.some((a) => a.playState === "running")
        )
          animations.forEach((a) => {
            if (a.playState === "running") a.pause();
          });
        else if (
          entry.isIntersecting &&
          animations.some((a) => a.playState === "paused")
        )
          animations.forEach((a) => {
            if (a.playState === "paused") a.play();
          });
      },
      { threshold: 0.15 },
    );
    const visibility = () => {
      if (document.hidden && animations.some((a) => a.playState === "running"))
        animations.forEach((a) => {
          if (a.playState === "running") a.pause();
        });
      else if (
        !document.hidden &&
        animations.some((a) => a.playState === "paused") &&
        el.getBoundingClientRect().bottom > 0 &&
        el.getBoundingClientRect().top < innerHeight
      )
        animations.forEach((a) => {
          if (a.playState === "paused") a.play();
        });
    };
    observer.observe(el);
    document.addEventListener("visibilitychange", visibility);
    return () => {
      observer.disconnect();
      animations.forEach((a) => a.cancel());
      document.removeEventListener("visibilitychange", visibility);
    };
  }, [active, variant]);
  return (
    <div
      ref={root}
      className={`${s.breath} ${variant === "pause" ? s.pauseContour : s.heroContour}`}
      aria-hidden="true"
      data-breath={variant}
    >
      <svg
        className={s.wideContour}
        viewBox="0 0 1280 560"
        fill="none"
        preserveAspectRatio="none"
      >
        <g>
          {Array.from({ length: 4 }, (_, i) => (
            <path
              key={i}
              d={
                variant === "hero"
                  ? `M${24 + i * 9} 0 C${24 + i * 9} 320 ${20 + i * 8} 400 ${300 + i * 24} ${410 + i * 8} C${620 + i * 18} ${435 + i * 8} ${900 + i * 12} ${360 + i * 9} ${1180 + i * 8} ${430 + i * 10} C${1250 + i * 6} 450 ${1210 + i * 8} 540 1280 ${545 + i * 8}`
                  : `M0 ${390 + i * 14} C${260 + i * 20} ${435 + i * 9} ${190 + i * 25} ${125 + i * 12} ${540 + i * 25} ${130 + i * 14} C${850 + i * 18} ${135 + i * 12} ${950 + i * 10} ${415 + i * 10} 1280 ${250 + i * 14}`
              }
            />
          ))}
        </g>
      </svg>
      <svg
        className={s.narrowContour}
        viewBox="0 0 320 400"
        fill="none"
        preserveAspectRatio="none"
      >
        <g>
          {[0, 1].map((i) => (
            <path
              key={i}
              d={
                variant === "hero"
                  ? `M${8 + i * 3} 0 V260 C${8 + i * 3} ${290 + i * 4} ${20 + i * 5} ${304 + i * 7} ${60 + i * 6} ${304 + i * 7} C130 ${304 + i * 7} 210 ${278 + i * 8} 285 ${310 + i * 7} C310 ${327 + i * 7} 310 380 320 ${390 + i * 6}`
                  : `M${8 + i * 4} 0 C${8 + i * 4} 50 30 ${82 + i * 8} 110 ${88 + i * 9} S255 ${52 + i * 9} 320 ${70 + i * 9} M0 ${342 + i * 10} C110 ${392 + i * 8} 220 ${306 + i * 10} 320 ${325 + i * 10}`
              }
            />
          ))}
        </g>
      </svg>
    </div>
  );
}
export function Daylight({ children }: { children: React.ReactNode }) {
  const root = useRef<HTMLDivElement>(null);
  const active = useMotionPreference();
  useEffect(() => {
    const el = root.current;
    if (
      !el ||
      !active ||
      matchMedia("(prefers-reduced-motion: reduce)").matches
    )
      return;
    const light = el.querySelector<HTMLElement>("[data-daylight]")!;
    const sections = el.querySelectorAll("main > section");
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries)
          if (entry.isIntersecting) {
            const index = Array.from(sections).indexOf(entry.target);
            light.style.transform = `translate3d(${index % 2 ? 2 : -2}%,${(index % 3) - 1}%,0)`;
          }
      },
      { rootMargin: "-35% 0px -35% 0px" },
    );
    sections.forEach((section) => observer.observe(section));
    return () => {
      observer.disconnect();
      light.style.removeProperty("transform");
    };
  }, [active]);
  return (
    <div ref={root} className={s.environment}>
      <div className={s.daylight} data-daylight aria-hidden="true" />
      {children}
    </div>
  );
}
