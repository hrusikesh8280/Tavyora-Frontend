import type { ReactNode } from "react";
import { MotionProvider } from "../MotionProvider";
import { Navigation } from "../Navigation";
import { Footer } from "../Footer";
import b from "../system.module.css";
export function PageFrame({
  current,
  children,
}: {
  current: string;
  children: ReactNode;
}) {
  return (
    <MotionProvider className={b.page}>
      <link
        rel="preload"
        href="/fonts/inter-latin-wght-normal.woff2"
        as="font"
        type="font/woff2"
        crossOrigin="anonymous"
      />
      <link
        rel="preload"
        href="/fonts/ibm-plex-serif-latin-400-italic.woff2"
        as="font"
        type="font/woff2"
        crossOrigin="anonymous"
      />
      <a className={b.skip} href="#main">
        Skip to content
      </a>
      <div className={b.frame} id="top">
        <Navigation current={current} />
        <main className={b.main} id="main" tabIndex={-1}>
          {children}
        </main>
        <Footer />
      </div>
    </MotionProvider>
  );
}
