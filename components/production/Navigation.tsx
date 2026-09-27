import Link from "next/link";
import { Arrow } from "../shared/Arrow";
import s from "./system.module.css";
import h from "./homepage.module.css";
import n from "./navigation.module.css";
export function Navigation({ current }: { current?: string }) {
  return (
    <header className={s.header}>
      <Link
        prefetch={false}
        href="/"
        className={s.wordmark}
        aria-label="Tavyora, home"
      >
        tavyora<span>.</span>
      </Link>
      <span className={s.navNote}>
        INDEPENDENT THINKING.
        <br />
        CONNECTED PRACTICE.
      </span>
      <Link
        prefetch={false}
        className={`${h.mobileEnquiry} ${n.compact}`}
        href="/contact"
        aria-current={current === "/contact" ? "page" : undefined}
      >
        Start a project <Arrow diagonal />
      </Link>
      <nav className={s.nav} aria-label="Main navigation">
        {[
          ["/technology", "Technology"],
          ["/wellbeing", "Wellbeing"],
          ["/about", "How we work"],
        ].map(([href, label]) => (
          <Link
            key={href}
            prefetch={false}
            href={href}
            aria-current={current === href ? "page" : undefined}
          >
            {label}
          </Link>
        ))}
        <Link
          prefetch={false}
          className={s.navProject}
          href="/contact"
          aria-current={current === "/contact" ? "page" : undefined}
        >
          Start a project <Arrow diagonal />
        </Link>
      </nav>
    </header>
  );
}
