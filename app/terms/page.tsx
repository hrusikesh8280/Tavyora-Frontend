import Link from "next/link";
import {
  LegalPage,
  type LegalSection,
} from "../../components/production/legal/LegalPage";
import { legalMetadata } from "../../lib/legal-seo";
export const metadata = legalMetadata("terms");
const sections: LegalSection[] = [
  {
    id: "use",
    title: "Using this website",
    content: (
      <p>
        These terms apply to your use of the Tavyora website. Please read them
        alongside our <Link href="/privacy">Privacy notice</Link>. They explain
        the basis on which website information and enquiry tools are provided;
        they are not a contract for a technology project or yoga session.
      </p>
    ),
  },
  {
    id: "information",
    title: "Information on the website",
    content: (
      <p>
        The website provides general information about Tavyora’s technology
        capabilities and practitioner-led online yoga. We aim to keep it useful
        and accurate, but information may change and may not cover every
        circumstance. Please confirm details relevant to a proposed engagement
        directly with us.
      </p>
    ),
  },
  {
    id: "technology",
    title: "Technology enquiries",
    content: (
      <>
        <p>
          Preparing or sending an enquiry does not create a client relationship,
          a service contract or an obligation to proceed. Our Contact page
          prepares an email draft; it does not itself send your message.
        </p>
        <p>
          Technology engagements require a separate agreement on scope,
          deliverables, fees, timelines and responsibilities. A discussion or
          website description does not replace that agreement.
        </p>
      </>
    ),
  },
  {
    id: "wellbeing",
    title: "Wellbeing and yoga information",
    content: (
      <>
        <p>
          Information about yoga on this website describes the practice and
          available session formats. It is not medical diagnosis, medical
          treatment or personalised medical advice.
        </p>
        <p>
          Consider your individual circumstances before taking part in physical
          activity, and seek appropriate professional guidance where needed.
          Session suitability and practical arrangements should be discussed
          before participation. Specific sessions may require separate
          participation terms or acknowledgements.
        </p>
      </>
    ),
  },
  {
    id: "rights",
    title: "Intellectual property",
    content: (
      <>
        <p>
          Tavyora’s branding, original website text, design and visual systems
          may be protected by applicable intellectual-property rights. Visiting
          the website does not transfer ownership of those materials.
        </p>
        <p>
          Third-party fonts, software, imagery and other materials remain
          subject to their respective rights and licences. Nothing here claims
          ownership of those materials or restricts uses permitted by their
          licences or applicable law. Please contact us about other reuse of
          Tavyora-owned content.
        </p>
      </>
    ),
  },
  {
    id: "conduct",
    title: "Acceptable use",
    content: (
      <p>
        Please use the website lawfully. Do not attempt unauthorised access,
        interfere with its operation, introduce malicious code or use it to
        carry out unlawful activity. Do not misrepresent your identity or send
        material you are not entitled to share.
      </p>
    ),
  },
  {
    id: "external",
    title: "Third-party links and services",
    content: (
      <p>
        External websites and services, including your email application,
        operate under their own terms and practices. A link does not mean
        Tavyora controls their content or operation. Review their terms where
        relevant to your use.
      </p>
    ),
  },
  {
    id: "availability",
    title: "Website availability",
    content: (
      <p>
        Access may be interrupted for maintenance, technical reasons or
        circumstances outside our control. We do not promise uninterrupted
        access or that every feature will always be available. If the enquiry
        tool is unavailable, you can email hello@tavyora.com directly.
      </p>
    ),
  },
  {
    id: "responsibility",
    title: "Responsibility and liability",
    content: (
      <p>
        Each party’s rights and responsibilities are subject to applicable law.
        Nothing in these terms excludes or limits a right, remedy or
        responsibility that cannot lawfully be excluded or limited.
        Responsibilities for separately agreed services should be addressed in
        the relevant engagement agreement.
      </p>
    ),
  },
  {
    id: "changes",
    title: "Changes to these terms",
    content: (
      <p>
        These website terms may be revised as Tavyora’s website and services
        evolve. The date at the top shows the latest revision. Changes to
        website terms do not by themselves replace separately agreed engagement
        terms.
      </p>
    ),
  },
  {
    id: "contact",
    title: "Contact",
    content: (
      <p>
        For questions about these terms, write to{" "}
        <a href="mailto:hello@tavyora.com?subject=Website%20terms%20%E2%80%94%20Tavyora">
          hello@tavyora.com
        </a>
        . For a technology or wellbeing enquiry, you can also{" "}
        <Link href="/contact">contact Tavyora</Link> through the Contact page.
      </p>
    ),
  },
];
export default function Terms() {
  return (
    <LegalPage
      kind="terms"
      title="Terms for using Tavyora."
      introduction="A clear basis for using this website, exploring our work and making an enquiry."
      sections={sections}
    />
  );
}
