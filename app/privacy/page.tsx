import Link from "next/link";
import {
  LegalPage,
  type LegalSection,
} from "../../components/production/legal/LegalPage";
import { legalMetadata } from "../../lib/legal-seo";
export const metadata = legalMetadata("privacy");
const sections: LegalSection[] = [
  {
    id: "scope",
    title: "About this notice",
    content: (
      <p>
        This notice explains how information may be handled when you visit the
        Tavyora website or contact Tavyora, an independent business based in
        India. It covers this website and enquiries about technology work and
        online yoga. Any separate service arrangements may need additional
        information about privacy.
      </p>
    ),
  },
  {
    id: "information",
    title: "Information you choose to provide",
    content: (
      <>
        <p>
          The enquiry form asks for your name, email address and message. You
          can also choose to include information relevant to your enquiry.
        </p>
        <ul>
          <li>
            For technology: your organisation, problem type, timeline and budget
            range.
          </li>
          <li>
            For wellbeing: your preferred practice format and experience level.
          </li>
        </ul>
        <p>
          Optional fields can be left blank. Please do not include medical
          history, diagnoses, medication details or other sensitive health
          information in a website enquiry.
        </p>
      </>
    ),
  },
  {
    id: "enquiries",
    title: "How contact enquiries work",
    content: (
      <>
        <p>
          The <Link href="/contact">Contact page</Link> prepares a draft in your
          browser. You can review or edit it, then choose to open your email
          application or copy the text. Preparing the draft does not submit it
          to a Tavyora backend or send an email.
        </p>
        <p>
          Enquiry text is held in the page’s temporary browser state, rather
          than saved by the website for a later visit. Your email application
          may save its own drafts. Tavyora receives your enquiry only if you
          send it to us through email or another communication channel.
        </p>
        <p>
          Once sent, the email and any subsequent correspondence are handled
          through our business email service so we can respond.
        </p>
      </>
    ),
  },
  {
    id: "technical",
    title: "Technical information",
    content: (
      <p>
        Serving and securing a website can involve infrastructure providers
        processing technical information such as an IP address, requested page,
        browser information and request time. The information processed depends
        on the hosting and security configuration. We do not use the enquiry
        form to collect these details as part of your message.
      </p>
    ),
  },
  {
    id: "cookies",
    title: "Cookies and analytics",
    content: (
      <>
        <p>
          The current website does not intentionally include production
          analytics, advertising trackers or marketing cookies. It does not
          offer user accounts or use a booking or payment system.
        </p>
        <p>
          This describes the current website, not a promise that its features
          will never change. If material tracking or analytics is introduced,
          this notice will be updated and any required choices will be provided.
        </p>
      </>
    ),
  },
  {
    id: "purposes",
    title: "How information may be used",
    content: (
      <>
        <p>
          Information you send may be used to understand and respond to your
          enquiry, discuss a possible engagement and manage related
          correspondence. Technical information may be used to operate the
          website and maintain its security.
        </p>
        <p>
          Information may also need to be handled to meet applicable legal
          obligations or address a legitimate dispute. The current enquiry flow
          does not enrol you in a marketing list.
        </p>
      </>
    ),
  },
  {
    id: "services",
    title: "Third-party services",
    content: (
      <>
        <p>
          Your email application and email provider handle a draft or message
          according to their own settings and privacy practices. Tavyora uses
          Zoho Mail for business email. Website hosting and infrastructure
          services may also process information needed to deliver the site.
        </p>
        <p>
          Following an external link takes you to a service with its own privacy
          practices. Those services are not covered by this notice.
        </p>
      </>
    ),
  },
  {
    id: "retention",
    title: "Keeping information",
    content: (
      <p>
        Enquiry correspondence should be kept only for as long as needed for the
        purpose it serves, including relevant follow-up, an agreed engagement or
        applicable legal requirements. The appropriate period depends on the
        information and circumstances; this notice does not set a single
        retention period for every enquiry.
      </p>
    ),
  },
  {
    id: "choices",
    title: "Your choices and questions",
    content: (
      <>
        <p>
          You can leave optional fields blank, review an enquiry before sending
          it, or choose not to send it. For questions about information you have
          shared, or to request access, correction or deletion where applicable,
          email{" "}
          <a href="mailto:hello@tavyora.com?subject=Privacy%20enquiry%20%E2%80%94%20Tavyora">
            hello@tavyora.com
          </a>
          .
        </p>
        <p>
          We may need enough information to verify a request and identify the
          relevant correspondence. What can be provided or removed depends on
          applicable requirements and any information that must be retained.
        </p>
      </>
    ),
  },
  {
    id: "changes",
    title: "Changes to this notice",
    content: (
      <p>
        This notice may be updated as the website, services or
        information-handling arrangements change. The date at the top identifies
        the latest revision.
      </p>
    ),
  },
];
export default function Privacy() {
  return (
    <LegalPage
      kind="privacy"
      title="Your information, clearly explained."
      introduction="How information may be handled when you use this website or start a conversation with Tavyora."
      sections={sections}
    />
  );
}
