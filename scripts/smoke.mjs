// Run against an already running local server; no submission or external action.
const origin = process.env.SMOKE_ORIGIN || "http://127.0.0.1:3000";
for (const route of [
  "/",
  "/technology",
  "/wellbeing",
  "/about",
  "/contact",
  "/privacy",
  "/terms",
]) {
  const response = await fetch(new URL(route, origin));
  if (response.status !== 200 || !(await response.text()).includes("<h1"))
    throw new Error(`Failed ${route}`);
  console.log(`PASS ${route}`);
}
for (const route of [
  "/definitely-not-a-page",
  "/concept-a",
  "/concept-b",
  "/concept-c",
  "/direction-living-signal",
  "/direction-living-signal-v2",
]) {
  if ((await fetch(new URL(route, origin))).status !== 404)
    throw new Error(`Expected 404: ${route}`);
  console.log(`PASS 404 ${route}`);
}
