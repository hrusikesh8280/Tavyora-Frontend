"use client";
import { useEffect, useRef } from "react";
import { useMotionPreference } from "../MotionProvider";
import s from "./technology.module.css";
export function Journey({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const active = useMotionPreference();
  useEffect(() => {
    const el = ref.current;
    if (
      !el ||
      !active ||
      matchMedia("(prefers-reduced-motion: reduce)").matches
    )
      return;
    let frame = 0,
      visible = false;
    const paint = () => {
      frame = 0;
      if (!visible || document.hidden) return;
      const box = el.getBoundingClientRect();
      const progress = Math.max(
        0,
        Math.min(1, (innerHeight * 0.65 - box.top) / box.height),
      );
      el.style.setProperty("--progress", String(progress));
      el.querySelectorAll<HTMLElement>("[data-stage]").forEach((stage, i) => {
        stage.dataset.reached = String(progress >= i / 7);
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
    observer.observe(el);
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    document.addEventListener("visibilitychange", schedule);
    return () => {
      observer.disconnect();
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      document.removeEventListener("visibilitychange", schedule);
      el.style.removeProperty("--progress");
      el.querySelectorAll<HTMLElement>("[data-stage]").forEach((stage) => {
        delete stage.dataset.reached;
      });
    };
  }, [active]);
  return (
    <div ref={ref} className={s.journey}>
      <span className={s.journeyTrack} aria-hidden="true" />
      {children}
    </div>
  );
}
