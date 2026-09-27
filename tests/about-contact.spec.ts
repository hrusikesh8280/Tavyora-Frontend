import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

test("new pages: semantics, metadata, responsive composition and axe", async ({
  page,
}, info) => {
  const errors: string[] = [];
  page.on("pageerror", (e) => errors.push(e.message));
  for (const route of ["/about", "/contact"]) {
    const response = await page.goto(route);
    expect(response?.status()).toBe(200);
    await expect(page.locator("h1")).toHaveCount(1);
    await expect(page.locator('link[rel="canonical"]')).toHaveAttribute(
      "href",
      `https://tavyora.com${route}`,
    );
    await expect(page.locator('meta[name="robots"]')).toHaveAttribute(
      "content",
      /index, follow/,
    );
    await expect(page.locator('meta[property="og:url"]')).toHaveAttribute(
      "content",
      `https://tavyora.com${route}`,
    );
    const levels = await page
      .locator("h1,h2,h3")
      .evaluateAll((nodes) => nodes.map((n) => Number(n.tagName[1])));
    for (let i = 1; i < levels.length; i++)
      expect(levels[i] - levels[i - 1]).toBeLessThanOrEqual(1);
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= innerWidth,
      ),
    ).toBe(true);
    await page.screenshot({
      path: info.outputPath(`${route.slice(1)}.png`),
      fullPage: true,
    });
    const scan = await new AxeBuilder({ page })
      .withTags(["wcag2a", "wcag2aa", "wcag21aa", "wcag22aa"])
      .analyze();
    expect(scan.violations).toEqual([]);
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.reload();
    expect(
      await page
        .locator("main")
        .evaluate(
          (el) =>
            el
              .getAnimations({ subtree: true })
              .filter((a) => a.playState === "running").length,
        ),
    ).toBe(0);
    await page.emulateMedia({ reducedMotion: "no-preference" });
  }
  expect(errors).toEqual([]);
  if (info.project.name === "production-1440")
    for (const width of [1280, 1024, 430, 360, 320, 720]) {
      // 720 × 450 models the reflow area of a 1440 × 900 viewport at 200% browser zoom.
      await page.setViewportSize({ width, height: width === 720 ? 450 : 900 });
      for (const route of ["/about", "/contact"]) {
        await page.goto(route);
        expect(
          await page.evaluate(
            () => document.documentElement.scrollWidth <= innerWidth,
          ),
        ).toBe(true);
      }
    }
});

test("enquiry: validation, keyboard, separate values, draft review and fallback", async ({
  page,
}, info) => {
  const sent: string[] = [];
  page.on("request", (r) => {
    if (r.method() === "POST") sent.push(r.url());
  });
  await page.goto("/contact");
  await page.keyboard.press("Tab");
  await expect(
    page.getByRole("link", { name: "Skip to content" }),
  ).toBeFocused();
  await page.keyboard.press("Enter");
  await expect(page.getByRole("main")).toBeFocused();
  await page.getByRole("button", { name: "Review email draft" }).click();
  await expect(
    page
      .getByRole("alert")
      .filter({ hasText: "A few details need attention." }),
  ).toBeFocused();
  await expect(page.locator('[aria-invalid="true"]')).toHaveCount(3);
  await page.getByLabel("Name", { exact: true }).fill("Review Visitor");
  await page.getByLabel("Email", { exact: true }).fill("invalid");
  await page
    .getByLabel("Message / context", { exact: true })
    .fill("A small web application & a workflow question.");
  await page.getByRole("button", { name: "Review email draft" }).click();
  await expect(page.locator("#enquiry-email-error")).toContainText(
    "name@example.com",
  );
  await page.getByLabel("Email", { exact: true }).fill("review@example.com");
  await page.getByRole("button", { name: "Review email draft" }).click();
  await expect(
    page.getByRole("heading", { name: "Your email is ready." }),
  ).toBeVisible();
  const link = page.getByRole("link", { name: "Open email app" });
  const href = await link.getAttribute("href");
  expect(decodeURIComponent(href!)).toContain("Technology enquiry — Tavyora");
  expect(decodeURIComponent(href!)).toContain("review@example.com");
  await page.getByLabel("Your enquiry text").fill("Reviewed context & details");
  expect(decodeURIComponent((await link.getAttribute("href"))!)).toContain(
    "Reviewed context & details",
  );
  await page.evaluate(() =>
    Object.defineProperty(navigator, "clipboard", {
      configurable: true,
      value: {
        writeText: async () => {
          throw new Error("Unavailable");
        },
      },
    }),
  );
  await page.getByRole("button", { name: "Copy enquiry text" }).click();
  await expect(page.getByRole("status")).toContainText("Select and copy");
  await page.getByRole("button", { name: "Edit form details" }).click();
  await expect(page.getByLabel("Name", { exact: true })).toHaveValue(
    "Review Visitor",
  );
  const wellbeing = page.getByRole("button", { name: /Wellbeing enquiry/ });
  if (info.project.use.hasTouch) await wellbeing.tap();
  else {
    await wellbeing.focus();
    await page.keyboard.press("Enter");
  }
  await expect(wellbeing).toHaveAttribute("aria-pressed", "true");
  await expect(
    page.getByRole("form", { name: "Wellbeing enquiry" }),
  ).toBeVisible();
  await expect(page.locator("#enquiry-company")).toHaveCount(0);
  await page.getByLabel("Name", { exact: true }).fill("Yoga Visitor");
  await page.getByLabel("Email", { exact: true }).fill("yoga@example.com");
  await page
    .getByLabel("Message", { exact: true })
    .fill("I would like to ask about online practice.");
  await page.getByRole("button", { name: "Review email draft" }).click();
  expect(decodeURIComponent((await link.getAttribute("href"))!)).toContain(
    "Yoga enquiry — Tavyora",
  );
  const scan = await new AxeBuilder({ page })
    .withTags(["wcag2a", "wcag2aa", "wcag21aa", "wcag22aa"])
    .analyze();
  expect(scan.violations).toEqual([]);
  expect(sent).toEqual([]);
});

test("five-page navigation and crawlable production routes", async ({
  page,
  request,
}, info) => {
  test.skip(
    info.project.name !== "production-1440",
    "Shared navigation regression runs once.",
  );
  for (const route of [
    "/",
    "/technology",
    "/wellbeing",
    "/about",
    "/contact",
  ]) {
    await page.goto(route);
    const nav = page.getByRole("navigation", { name: "Main navigation" });
    for (const [name, href] of [
      ["Technology", "/technology"],
      ["Wellbeing", "/wellbeing"],
      ["How we work", "/about"],
      ["Start a project", "/contact"],
    ])
      await expect(
        nav.getByRole("link", { name, exact: true }),
      ).toHaveAttribute("href", href);
    await expect(
      page.getByRole("link", { name: "Tavyora, home", exact: true }),
    ).toHaveAttribute("href", "/");
    for (const name of ["Technology", "Wellbeing", "About", "Contact"])
      await expect(
        page
          .getByRole("navigation", { name: "Footer navigation" })
          .getByRole("link", { name, exact: true }),
      ).toBeVisible();
    await nav.getByRole("link", { name: "How we work" }).click();
    await expect(page).toHaveURL(/\/about$/);
    await page
      .getByRole("navigation", { name: "Main navigation" })
      .getByRole("link", { name: "Start a project" })
      .click();
    await expect(page).toHaveURL(/\/contact$/);
  }
  const xml = await (await request.get("/sitemap.xml")).text();
  expect(xml.match(/<loc>/g)).toHaveLength(7);
  expect(xml).not.toMatch(/concept-|direction-/);
  for (const route of ["/about", "/contact"]) {
    const html = await (await request.get(route)).text();
    expect(html).toContain("<h1");
    expect(html).not.toContain("admin@tavyora.com");
  }
});
