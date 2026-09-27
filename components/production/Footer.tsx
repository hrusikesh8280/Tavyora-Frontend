import Link from "next/link";
import s from "./navigation.module.css";
export function Footer() {
  return (
    <footer className={s.footer} aria-label="Tavyora footer">
      <div>
        <a href="mailto:hello@tavyora.com">hello@tavyora.com</a>
        <nav aria-label="Footer navigation">
          {[
            ["/technology", "Technology"],
            ["/wellbeing", "Wellbeing"],
            ["/about", "About"],
            ["/contact", "Contact"],
            ["/privacy", "Privacy"],
            ["/terms", "Terms"],
          ].map(([href, label]) => (
            <Link prefetch={false} key={href} href={href}>
              {label}
            </Link>
          ))}
        </nav>
      </div>
      <p>© 2026 Tavyora · Independent practice, based in India.</p>
    </footer>
  );
}
