"use client";
import { useEffect, useRef } from "react";
import { useMotionPreference } from "../MotionProvider";
import s from "./editorial.module.css";
export function Connection() {
  const ref = useRef<SVGSVGElement>(null);
  const active = useMotionPreference();
  useEffect(() => {
    const el = ref.current;
    if (
      !el ||
      !active ||
      matchMedia("(prefers-reduced-motion: reduce)").matches
    )
      return;
    let animation: Animation | undefined;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          animation = el
            .querySelector("[data-open]")
            ?.animate(
              [
                { transform: "translateY(12px)" },
                { transform: "translateY(0)" },
              ],
              {
                duration: 1400,
                easing: "cubic-bezier(.22,1,.36,1)",
                fill: "forwards",
              },
            );
          observer.disconnect();
        }
      },
      { threshold: 0.2 },
    );
    observer.observe(el);
    return () => {
      observer.disconnect();
      animation?.cancel();
    };
  }, [active]);
  return (
    <svg
      ref={ref}
      className={s.connection}
      viewBox="0 0 1200 170"
      fill="none"
      aria-hidden="true"
      preserveAspectRatio="none"
    >
      <g>
        {[0, 1, 2].map((i) => (
          <path key={i} d={`M0 ${36 + i * 12} H300 L390 ${74 + i * 12} H590`} />
        ))}
      </g>
      <g data-open>
        {[0, 1, 2].map((i) => (
          <path
            key={i}
            d={`M630 ${74 + i * 12} C780 ${74 + i * 12} 850 ${135 + i * 8} 970 ${112 + i * 12} S1100 ${38 + i * 12} 1200 ${48 + i * 12}`}
          />
        ))}
      </g>
      <path className={s.connectionGuide} d="M610 8 V156" />
    </svg>
  );
}
