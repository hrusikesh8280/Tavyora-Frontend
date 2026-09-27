"use client";
import { useRef, useState } from "react";
import { Arrow } from "../../shared/Arrow";
import {
  emailHref,
  prepareEnquiry,
  recipient,
  subjects,
  validateEnquiry,
  type EnquiryPath,
  type EnquiryValues,
} from "./enquiry-utils";
import b from "../system.module.css";
import s from "./contact.module.css";
export function Enquiry() {
  const [path, setPath] = useState<EnquiryPath>("technology");
  const [values, setValues] = useState<Record<EnquiryPath, EnquiryValues>>({
    technology: {},
    wellbeing: {},
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [draft, setDraft] = useState<string | null>(null);
  const [copyStatus, setCopyStatus] = useState("");
  const summary = useRef<HTMLDivElement>(null),
    review = useRef<HTMLDivElement>(null);
  const form = useRef<HTMLFormElement>(null);
  function select(next: EnquiryPath) {
    setPath(next);
    setErrors({});
    setDraft(null);
    setCopyStatus("");
  }
  function update(name: string, value: string) {
    setValues((all) => ({ ...all, [path]: { ...all[path], [name]: value } }));
  }
  function field(
    name: string,
    label: string,
    options?: string[],
    hint?: string,
  ) {
    const id = `enquiry-${name}`,
      error = errors[name];
    const required = ["name", "email", "message"].includes(name);
    const common = {
      id,
      name,
      value: values[path][name] ?? "",
      onChange: (
        e: React.ChangeEvent<
          HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
        >,
      ) => update(name, e.target.value),
      "aria-invalid": !!error,
      "aria-describedby":
        [hint ? `${id}-hint` : "", error ? `${id}-error` : ""]
          .filter(Boolean)
          .join(" ") || undefined,
      required,
    };
    return (
      <div className={s.field} key={name}>
        <label htmlFor={id}>
          {label}
          {!required && <span>Optional</span>}
        </label>
        {hint && (
          <p id={`${id}-hint`} className={s.hint}>
            {hint}
          </p>
        )}
        {options ? (
          <select {...common}>
            <option value="">
              {name === "experience" ? "Choose if you wish" : "Not sure yet"}
            </option>
            {options.map((option) => (
              <option key={option}>{option}</option>
            ))}
          </select>
        ) : name === "message" ? (
          <textarea {...common} rows={5} maxLength={2000} />
        ) : (
          <input
            {...common}
            type={name === "email" ? "email" : "text"}
            maxLength={name === "email" ? 254 : 160}
            autoComplete={
              name === "name"
                ? "name"
                : name === "email"
                  ? "email"
                  : name === "company"
                    ? "organization"
                    : "off"
            }
          />
        )}
        {error && (
          <p id={`${id}-error`} className={s.error}>
            {error}
          </p>
        )}
      </div>
    );
  }
  async function copy(text: string) {
    try {
      await navigator.clipboard.writeText(text);
      setCopyStatus("Copied to clipboard.");
    } catch {
      setCopyStatus(
        "Copy is unavailable here. Select and copy the draft text below, or use the email address shown above it.",
      );
    }
  }
  return (
    <div className={s.enquiry} data-enquiry-path={path}>
      <div
        className={s.choices}
        role="group"
        aria-label="Choose an enquiry path"
      >
        <button
          type="button"
          aria-pressed={path === "technology"}
          onClick={() => select("technology")}
        >
          <span className={b.eyebrow}>01 / TECHNOLOGY</span>
          <strong>
            Build, improve
            <br />
            <em>or untangle.</em>
          </strong>
          <span className={s.choiceCopy}>
            Have a product, workflow or technical question in mind?
          </span>
          <span className={s.choiceAction}>
            Technology enquiry <Arrow diagonal />
          </span>
        </button>
        <button
          type="button"
          aria-pressed={path === "wellbeing"}
          onClick={() => select("wellbeing")}
        >
          <span className={b.eyebrow}>02 / WELLBEING</span>
          <strong>
            Make room
            <br />
            <em>for practice.</em>
          </strong>
          <span className={s.choiceCopy}>
            Interested in one-to-one or small-group online yoga?
          </span>
          <span className={s.choiceAction}>
            Wellbeing enquiry <Arrow diagonal />
          </span>
        </button>
      </div>
      <svg
        className={s.responseSignal}
        viewBox="0 0 1200 100"
        preserveAspectRatio="none"
        fill="none"
        aria-hidden="true"
      >
        <g data-route="technology">
          <path d="M0 16H300L390 60H730L790 85H1200M0 28H292L382 72H724L784 97H1200" />
        </g>
        <g data-route="wellbeing">
          <path d="M0 35C240 35 270 90 480 70S770 10 940 38S1100 88 1200 65M0 49C240 49 270 104 480 84S770 24 940 52S1100 102 1200 79" />
        </g>
      </svg>
      <div className={s.formLayout}>
        <aside className={s.formNote}>
          <p className={b.eyebrow}>03 / A LITTLE CONTEXT</p>
          <h2>
            {path === "technology" ? (
              <>
                Start where
                <br />
                <em>you are.</em>
              </>
            ) : (
              <>
                Your practice.
                <br />
                <em>Your questions.</em>
              </>
            )}
          </h2>
          <p>
            {path === "technology"
              ? "An early idea, an awkward workflow or a system that needs attention is enough to begin."
              : "Tell us which format interests you and what you would like to understand before joining."}
          </p>
          <div className={s.deliveryNote}>
            <span className={b.eyebrow}>YOU REVIEW. YOU SEND.</span>
            <p>
              This form prepares an email draft on your device. Nothing is
              submitted to Tavyora by this form. You choose whether to send it
              from your email app.
            </p>
          </div>
        </aside>
        <div>
          {draft === null ? (
            <form
              ref={form}
              noValidate
              onSubmit={(e) => {
                e.preventDefault();
                const next = validateEnquiry(values[path]);
                setErrors(next);
                if (Object.keys(next).length) {
                  requestAnimationFrame(() => summary.current?.focus());
                  return;
                }
                setDraft(prepareEnquiry(path, values[path]));
                setCopyStatus("");
                requestAnimationFrame(() => review.current?.focus());
              }}
              aria-label={`${path === "technology" ? "Technology" : "Wellbeing"} enquiry`}
            >
              <p className={s.formLegend}>
                Name, email and context are required. Everything else is
                optional.
              </p>
              {Object.keys(errors).length > 0 && (
                <div
                  className={s.errorSummary}
                  ref={summary}
                  tabIndex={-1}
                  role="alert"
                >
                  <strong>A few details need attention.</strong>
                  <ul>
                    {Object.entries(errors).map(([key, message]) => (
                      <li key={key}>
                        <a href={`#enquiry-${key}`}>{message}</a>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              {field("name", "Name")}
              {field("email", "Email")}
              {path === "technology" ? (
                <>
                  {field("company", "Company / organisation")}
                  {field("problem", "What are you trying to solve?", [
                    "Build",
                    "Rework",
                    "Intelligence",
                    "Systems",
                  ])}
                  {field(
                    "timeline",
                    "Timeline",
                    undefined,
                    "A rough idea is fine; you can leave this open.",
                  )}
                  {field(
                    "budget",
                    "Budget range",
                    undefined,
                    "If helpful, include a currency. No budget is required to enquire.",
                  )}
                </>
              ) : (
                <>
                  {field("interest", "Interested in", [
                    "One-to-one online practice",
                    "Small-group online practice",
                  ])}
                  {field("experience", "Experience level", [
                    "New to yoga",
                    "Some experience",
                    "Regular practice",
                    "Prefer not to say",
                  ])}
                </>
              )}
              {field(
                "message",
                path === "technology" ? "Message / context" : "Message",
                undefined,
                path === "technology"
                  ? "What is happening, and what would you like to change? Avoid passwords, credentials or confidential information."
                  : "Share your questions or practical goals. Please do not include medical history, diagnoses, injuries, medications or other sensitive health information.",
              )}
              <p className={s.hint}>
                Your draft stays in this tab until you open your email app or
                copy it. It is not saved by this form; reloading clears it.
              </p>
              <button className={`${b.primary} ${s.prepare}`} type="submit">
                Review email draft <Arrow diagonal />
              </button>
            </form>
          ) : (
            <div
              className={s.review}
              ref={review}
              tabIndex={-1}
              aria-labelledby="draft-title"
            >
              <p className={b.eyebrow}>READY TO REVIEW / NOT SENT</p>
              <h3 id="draft-title">Your email is ready.</h3>
              <p>
                Check the details, make any edits, then continue in your email
                app. You will still need to send it there.
              </p>
              <dl>
                <dt>To</dt>
                <dd>{recipient}</dd>
                <dt>Subject</dt>
                <dd>{subjects[path]}</dd>
              </dl>
              <label htmlFor="email-draft">Your enquiry text</label>
              <textarea
                id="email-draft"
                value={draft}
                onChange={(e) => setDraft(e.target.value)}
                rows={12}
                maxLength={3500}
              />
              <div className={s.reviewActions}>
                <a className={b.primary} href={emailHref(path, draft)}>
                  Open email app <Arrow diagonal />
                </a>
                <button
                  type="button"
                  className={b.textLink}
                  onClick={() => {
                    setDraft(null);
                    setCopyStatus("");
                    requestAnimationFrame(() =>
                      form.current
                        ?.querySelector<HTMLInputElement>("input")
                        ?.focus(),
                    );
                  }}
                >
                  Edit form details
                </button>
              </div>
              <p className={s.hint}>
                No email app opens, or the draft is incomplete? Copy the text
                into your usual email service.
              </p>
              <div className={s.copyActions}>
                <button
                  type="button"
                  onClick={() =>
                    copy(
                      `To: ${recipient}\nSubject: ${subjects[path]}\n\n${draft}`,
                    )
                  }
                >
                  Copy enquiry text
                </button>
                <button type="button" onClick={() => copy(recipient)}>
                  Copy email address
                </button>
              </div>
              <p className={s.copyStatus} role="status">
                {copyStatus}
              </p>
            </div>
          )}
        </div>
      </div>
      <noscript>
        <p>
          To prepare a draft here, enable JavaScript. You can also email{" "}
          <a href="mailto:hello@tavyora.com">hello@tavyora.com</a> directly.
        </p>
      </noscript>
    </div>
  );
}
