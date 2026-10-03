import Link from "next/link";
import { PageFrame } from "../../components/production/editorial/PageFrame";
import { Enquiry } from "../../components/production/editorial/Enquiry";
import { editorialMetadata, editorialSchema } from "../../lib/editorial-seo";
import s from "../../components/production/editorial/editorial.module.css";
import c from "../../components/production/editorial/contact.module.css";
import b from "../../components/production/system.module.css";
export const metadata = editorialMetadata("contact");
export default function ContactPage() {
  return (
    <PageFrame current="/contact">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(editorialSchema("contact")).replace(
            /</g,
            "\\u003c",
          ),
        }}
      />
      <section
        className={`${s.hero} ${c.hero}`}
        aria-labelledby="contact-title"
      >
        <nav className={s.breadcrumb} aria-label="Breadcrumb">
          <Link href="/">Home</Link>
          <span aria-hidden="true">/</span>
          <span aria-current="page">Contact</span>
        </nav>
        <p className={b.eyebrow}>LET’S FIND A STARTING POINT</p>
        <h1 id="contact-title">What do you have in mind?</h1>
        <p className={c.introduction}>
          An early idea or a question is enough. Tell us what you need help
          with; you do not need a finished brief.
        </p>
      </section>
      <section className={c.conversation} aria-labelledby="conversation-title">
        <h2 id="conversation-title" className={c.conversationTitle}>
          What would you like to talk about?
        </h2>
        <Enquiry />
      </section>
      <section className={c.direct} aria-labelledby="direct-title">
        <p className={b.eyebrow}>ANOTHER WAY IN</p>
        <h2 id="direct-title">Prefer email?</h2>
        <a href="mailto:hello@tavyora.com">
          hello@tavyora.com <span aria-hidden="true">↗</span>
        </a>
        <p>Send a few lines in your own words.</p>
      </section>
    </PageFrame>
  );
}
