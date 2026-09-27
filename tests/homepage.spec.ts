import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

test("Homepage content, metadata and semantic landmarks", async ({
  page,
}, info) => {
  const errors: string[] = [];
  page.on("pageerror", (e) => errors.push(e.message));
  page.on("console", (m) => {
    if (m.type() === "error") errors.push(m.text());
  });
  const r = await page.goto("/");
  expect(r?.status()).toBe(200);
  await page.evaluate(() => document.fonts.ready);
  await expect(page).toHaveTitle(
    "Tavyora — Technology Consultancy & Online Yoga",
  );
  await expect(page.getByRole("heading", { level: 1 })).toHaveCount(1);
  await expect(page.getByRole("heading", { level: 1 })).toContainText(
    "Useful systems.",
  );
  await expect(page.getByRole("main")).toHaveCount(1);
  await expect(page.getByRole("banner")).toHaveCount(1);
  await expect(page.getByRole("contentinfo")).toHaveCount(1);
  for (const name of ["Explore technology", "Explore wellbeing"])
    await expect(page.getByRole("link", { name, exact: true })).toBeVisible();
  await expect(
    page.getByRole("heading", { name: "One-to-one online yoga" }),
  ).toBeAttached();
  await expect(
    page.getByRole("heading", { name: "Small-group online yoga" }),
  ).toBeAttached();
  await expect(page.locator('meta[name="robots"]')).toHaveAttribute(
    "content",
    "index, follow",
  );
  await expect(page.locator('link[rel="canonical"]')).toHaveAttribute(
    "href",
    /^https:\/\/tavyora\.com\/?$/,
  );
  await expect(page.locator('meta[property="og:image"]')).toHaveAttribute(
    "content",
    "https://tavyora.com/social/tavyora-home.png",
  );
  await expect(page.locator('meta[name="twitter:card"]')).toHaveAttribute(
    "content",
    "summary_large_image",
  );
  await expect(
    page.locator('a[href^="/concept"], a[href^="/direction-"]'),
  ).toHaveCount(0);
  const levels = await page
    .locator("h1,h2,h3,h4")
    .evaluateAll((els) =>
      els
        .filter((e) => e.getClientRects().length)
        .map((e) => Number(e.tagName[1])),
    );
  for (let i = 1; i < levels.length; i++)
    expect(levels[i] - levels[i - 1]).toBeLessThanOrEqual(1);
  await page.screenshot({ path: info.outputPath("homepage-hero.png") });
  await page.locator("#wellbeing").scrollIntoViewIfNeeded();
  await page
    .locator("#wellbeing img")
    .evaluate(async (e) => (e as HTMLImageElement).decode());
  await page.screenshot({
    path: info.outputPath("homepage-full.png"),
    fullPage: true,
  });
  expect(errors).toEqual([]);
});
test("Homepage keyboard, routing and real destinations", async ({ page }) => {
  await page.goto("/");
  await page.keyboard.press("Tab");
  await expect(
    page.getByRole("link", { name: "Skip to content" }),
  ).toBeFocused();
  await page.keyboard.press("Enter");
  await expect(page.getByRole("main")).toBeFocused();
  await page.keyboard.press("Tab");
  await expect(
    page.getByRole("link", { name: "Explore technology", exact: true }),
  ).toBeFocused();
  await page.keyboard.press("Enter");
  await expect(page).toHaveURL(/\/technology$/);
  await page.goto("/");
  const buttons = page.locator(
    'button[aria-controls="technology-route-detail"]',
  );
  for (const [i, id] of [
    "build",
    "rework",
    "intelligence",
    "systems",
  ].entries()) {
    await buttons.nth(i).focus();
    await page.keyboard.press("Enter");
    await expect(buttons.nth(i)).toHaveAttribute("aria-pressed", "true");
    await expect(page.locator(`[data-route-path="${id}"]`)).toHaveAttribute(
      "data-active",
      "true",
    );
    await expect(page.locator("[data-selected-path]")).toHaveAttribute(
      "d",
      new RegExp(`^M432 ${80 + i * 156} `),
    );
  }
  await buttons.nth(2).click();
  await buttons.nth(0).click();
  await expect(page.locator("[data-selected-path]")).toHaveAttribute(
    "d",
    /^M432 80 /,
  );
  await page
    .getByRole("link", { name: "Explore wellbeing", exact: true })
    .click();
  await expect(page).toHaveURL(/\/wellbeing$/);
  await page.goto("/");
  await expect(
    page.getByRole("link", { name: "Enquire about a session" }),
  ).toHaveAttribute(
    "href",
    /^mailto:hello@tavyora.com\?subject=Yoga%20enquiry/,
  );
  await expect(
    page.getByRole("link", { name: /Build something with Tavyora/ }),
  ).toHaveAttribute("href", /^mailto:hello@tavyora.com/);
  await page
    .getByRole("navigation", { name: "Main navigation" })
    .getByRole("link", { name: "How we work" })
    .click();
  await expect(page).toHaveURL(/\/about$/);
  const invalid = await page
    .locator('a[href^="#"]')
    .evaluateAll((els) =>
      els
        .map((e) => e.getAttribute("href")!)
        .filter((h) => !document.getElementById(h.slice(1))),
    );
  expect(invalid).toEqual([]);
});
test("Homepage normal, paused and reduced motion", async ({ page }, info) => {
  await page.goto("/");
  const path = page.locator("[data-morph] path").first(),
    before = await path.getAttribute("d");
  const y = await page
    .locator("[data-morph]")
    .evaluate((el) => el.getBoundingClientRect().top + scrollY);
  await page.evaluate(
    (top) => scrollTo({ top: top - 100, behavior: "instant" }),
    y,
  );
  await expect(path).not.toHaveAttribute("d", before!);
  await page.screenshot({ path: info.outputPath("homepage-transition.png") });
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.reload();
  await expect(page.locator("[data-motion]")).toHaveAttribute(
    "data-motion",
    "off",
  );
  await expect(page.locator(".motion-toggle")).toHaveCount(0);
  await expect(
    page.getByText("02 / Space makes room for practice."),
  ).toBeVisible();
  expect(
    await page.evaluate(
      () => getComputedStyle(document.documentElement).scrollBehavior,
    ),
  ).toBe("auto");
  const old = await page.locator("[data-morph] path").first().getAttribute("d");
  await page.locator("#how-we-work").scrollIntoViewIfNeeded();
  expect(
    await page.locator("[data-morph] path").first().getAttribute("d"),
  ).toBe(old);
});
test("Homepage reflow, focus and touch targets", async ({ page }, info) => {
  await page.goto("/");
  await page.evaluate(() => document.fonts.ready);
  expect(
    await page.evaluate(
      () =>
        document.documentElement.scrollWidth <=
        document.documentElement.clientWidth,
    ),
  ).toBe(true);
  for (const el of await page
    .locator('button[aria-controls="technology-route-detail"],header nav a')
    .all()) {
    if (await el.isVisible()) {
      const box = await el.boundingBox();
      expect(box!.height).toBeGreaterThanOrEqual(44);
    }
  }
  const button = page
    .locator('button[aria-controls="technology-route-detail"]')
    .first();
  await button.focus();
  expect(
    await button.evaluate((e) => getComputedStyle(e).outlineStyle),
  ).not.toBe("none");
  if (info.project.name === "production-1440") {
    // A 1440px display at 200% browser zoom has a 720 CSS-pixel layout viewport.
    // This verifies equivalent responsive reflow, not a physical browser-menu action.
    await page.setViewportSize({ width: 720, height: 450 });
    expect(
      await page.evaluate(
        () =>
          document.documentElement.scrollWidth <=
          document.documentElement.clientWidth,
      ),
    ).toBe(true);
    await page
      .getByRole("link", { name: "Explore wellbeing", exact: true })
      .click();
    await expect(page).toHaveURL(/\/wellbeing$/);
    await page.goto("/");
    await page.screenshot({ path: info.outputPath("zoom-200-equivalent.png") });
  }
  if (info.project.name === "production-390") {
    await page.setViewportSize({ width: 320, height: 844 });
    expect(
      await page.evaluate(
        () =>
          document.documentElement.scrollWidth <=
          document.documentElement.clientWidth,
      ),
    ).toBe(true);
  }
});
test("Homepage axe WCAG scan", async ({ page }) => {
  await page.goto("/");
  await page
    .locator('button[aria-controls="technology-route-detail"]')
    .nth(2)
    .click();
  const r = await new AxeBuilder({ page })
    .withTags(["wcag2a", "wcag2aa", "wcag21aa", "wcag22aa"])
    .analyze();
  expect(r.violations).toEqual([]);
});
test("Homepage initial HTML, sitemap, image and prototype safety", async ({
  page,
  request,
  browser,
}, info) => {
  test.skip(
    info.project.name !== "production-1440",
    "Shared metadata and HTTP rules need one verification.",
  );
  const r = await request.get("/");
  const html = await r.text();
  expect(r.status()).toBe(200);
  expect(html).toContain("Small-group online yoga");
  expect(html).toContain("Direct conversations.");
  expect(html).toMatch(/name="robots" content="index, follow"/);
  await page.goto("/");
  const json = JSON.parse(
    await page.locator('script[type="application/ld+json"]').innerText(),
  );
  expect(
    json["@graph"].map((item: { "@type": string }) => item["@type"]),
  ).toEqual(["Organization", "WebSite"]);
  expect(json["@graph"][0].name).toBe("Tavyora");
  expect(json["@graph"][0].email).toBe("hello@tavyora.com");
  expect(JSON.stringify(json)).not.toContain("aggregateRating");
  const sitemap = await request.get("/sitemap.xml");
  expect(sitemap.status()).toBe(200);
  const xml = await sitemap.text();
  expect(xml.match(/<loc>/g)).toHaveLength(7);
  expect(xml).toContain("<loc>https://tavyora.com/</loc>");
  expect(xml).not.toContain("concept");
  const robots = await request.get("/robots.txt");
  expect(robots.status()).toBe(200);
  const rules = await robots.text();
  expect(rules).toContain("Allow: /");
  expect(rules).toContain("Sitemap: https://tavyora.com/sitemap.xml");
  expect(rules).not.toContain("Disallow:");
  const image = await request.get("/social/tavyora-home.png");
  expect(image.status()).toBe(200);
  const bytes = await image.body();
  expect(bytes.readUInt32BE(16)).toBe(1200);
  expect(bytes.readUInt32BE(20)).toBe(630);
  for (const route of [
    "/concept-a",
    "/concept-b",
    "/concept-c",
    "/direction-living-signal",
    "/direction-living-signal-v2",
  ]) {
    expect((await page.goto(route))?.status()).toBe(404);
    expect(
      await page
        .locator('meta[name="robots"]')
        .evaluateAll((nodes) =>
          nodes.some((n) => n.getAttribute("content")?.includes("noindex")),
        ),
    ).toBe(true);
  }
  for (const route of [
    "/products",
    "/apps",
    "/case-studies",
    "/blog",
    "/insights",
    "/yoga/programs",
  ])
    expect((await request.get(route)).status()).toBe(404);
  const ctx = await browser.newContext({ javaScriptEnabled: false });
  const staticPage = await ctx.newPage();
  await staticPage.goto("http://127.0.0.1:3108/");
  await expect(staticPage.getByRole("heading", { level: 1 })).toBeVisible();
  await expect(staticPage.locator("[data-capability]")).toHaveCount(4);
  await expect(
    staticPage.getByRole("heading", { name: "Small-group online yoga" }),
  ).toBeVisible();
  await ctx.close();
});
