// Pure draft preparation: no network, persistence or delivery side effects.
// A future server adapter can accept validated values without replacing the form UI.
export type EnquiryPath = "technology" | "wellbeing";
export type EnquiryValues = Record<string, string>;
export const recipient = "hello@tavyora.com";
export const subjects = {
  technology: "Technology enquiry — Tavyora",
  wellbeing: "Yoga enquiry — Tavyora",
};
export function validateEnquiry(values: EnquiryValues) {
  const errors: Record<string, string> = {};
  if (!values.name?.trim()) errors.name = "Please add your name.";
  if (!values.email?.trim()) errors.email = "Please add your email address.";
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email))
    errors.email = "Use an email address such as name@example.com.";
  if (!values.message?.trim())
    errors.message =
      "Share a little context so we know what you would like to discuss.";
  return errors;
}
export function prepareEnquiry(path: EnquiryPath, values: EnquiryValues) {
  const pairs: [string, string | undefined][] = [
    ["Name", values.name],
    ["Email", values.email],
    ...((path === "technology"
      ? [
          ["Company / organisation", values.company],
          ["Problem type", values.problem || "Not sure yet"],
          ["Timeline", values.timeline],
          ["Budget range", values.budget],
        ]
      : [
          ["Interested in", values.interest || "Not sure yet"],
          ["Experience level", values.experience],
        ]) as [string, string | undefined][]),
  ];
  return `${pairs
    .filter(([, v]) => v?.trim())
    .map(([k, v]) => `${k}: ${v!.trim()}`)
    .join("\n")}\n\nContext:\n${values.message.trim()}`;
}
export function emailHref(path: EnquiryPath, body: string) {
  return `mailto:${recipient}?subject=${encodeURIComponent(subjects[path])}&body=${encodeURIComponent(body)}`;
}
