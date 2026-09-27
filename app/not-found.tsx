import Link from "next/link";
import { PageFrame } from "../components/production/editorial/PageFrame";
import b from "../components/production/system.module.css";
import s from "../components/production/legal/not-found.module.css";
export default function NotFound() {
  return (
    <PageFrame current="">
      <section className={s.scene}>
        <p className={b.eyebrow}>404 / Unconnected route</p>
        <h1>
          The signal ends <em>here.</em>
        </h1>
        <p className={s.copy}>
          The page may have moved, changed, or never existed. There are other
          paths into Tavyora.
        </p>
        <svg
          className={s.signal}
          viewBox="0 0 1000 160"
          fill="none"
          aria-hidden="true"
        >
          <path
            className={s.base}
            d="M0 40H260Q290 40 290 70V90Q290 120 320 120H590Q620 120 620 90V70Q620 40 650 40H790"
          />
          <path
            className={s.trace}
            pathLength="1"
            d="M0 40H260Q290 40 290 70V90Q290 120 320 120H590Q620 120 620 90V70Q620 40 650 40H790"
          />
          <path className={s.end} d="M790 30V50M850 40H1000" />
        </svg>
        <div className={s.recovery}>
          <Link className={b.primary} href="/">
            Return home <span aria-hidden="true">↗</span>
          </Link>
          <nav aria-label="Other paths">
            <Link href="/technology">Technology</Link>
            <Link href="/wellbeing">Wellbeing</Link>
            <Link href="/contact">Contact</Link>
          </nav>
        </div>
      </section>
    </PageFrame>
  );
}
