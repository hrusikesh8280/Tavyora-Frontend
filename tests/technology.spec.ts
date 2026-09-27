import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

test("Technology content, metadata, semantic hierarchy and no console errors", async ({
  page,
}, info) => {
  const errors: string[] = [];
  page.on("pageerror", (e) => errors.push(e.message));
  page.on("console", (m) => {
    if (m.type() === "error") errors.push(m.text());
  });
  expect((await page.goto("/technology"))?.status()).toBe(200);
  await page.evaluate(() => document.fonts.ready);
  await expect(page).toHaveTitle(
    "Technology Consultancy & Software Development — Tavyora",
  );
  await expect(page.locator("h1")).toHaveCount(1);
  await expect(page.locator("h1")).toHaveText(
    "Bring the problem, not a perfect brief.",
  );
  for (const role of ["banner", "main", "contentinfo"] as const)
    await expect(page.getByRole(role)).toHaveCount(1);
  await expect(page.locator("main > section")).toHaveCount(8);
  await expect(page.locator('meta[name="robots"]')).toHaveAttribute(
    "content",
    "index, follow",
  );
  await expect(page.locator('link[rel="canonical"]')).toHaveAttribute(
    "href",
    "https://tavyora.com/technology",
  );
  await expect(page.locator('meta[property="og:image"]')).toHaveAttribute(
    "content",
    "https://tavyora.com/social/tavyora-technology.png",
  );
  await expect(page.locator('meta[name="twitter:card"]')).toHaveAttribute(
    "content",
    "summary_large_image",
  );
  const headings = await page
    .locator("h1,h2,h3,h4")
    .evaluateAll((els) => els.map((e) => Number(e.tagName[1])));
  for (let i = 1; i < headings.length; i++)
    expect(headings[i] - headings[i - 1]).toBeLessThanOrEqual(1);
  await expect(
    page.getByRole("link", {
      name: "Start a technology conversation",
      exact: true,
    }),
  ).toHaveCount(2);
  await expect(
    page.getByRole("link", { name: "See how we work" }),
  ).toBeVisible();
  await page.screenshot({ path: info.outputPath("technology-hero.png") });
  await page.screenshot({
    path: info.outputPath("technology-full.png"),
    fullPage: true,
  });
  expect(errors).toEqual([]);
});

test("Technology keyboard, touch selection, distinct routes and working links", async ({
  page,
}) => {
  await page.goto("/technology");
  await page.keyboard.press("Tab");
  await expect(
    page.getByRole("link", { name: "Skip to content" }),
  ).toBeFocused();
  await page.keyboard.press("Enter");
  await expect(page.getByRole("main")).toBeFocused();
  const buttons = page.locator('button[aria-controls="problem-detail"]');
  const geometry = new Set<string>();
  for (const [i, id] of [
    "build",
    "rework",
    "intelligence",
    "systems",
  ].entries()) {
    await buttons.nth(i).focus();
    await page.keyboard.press("Enter");
    await expect(buttons.nth(i)).toHaveAttribute("aria-pressed", "true");
    await expect(page.locator("[data-routing-state]")).toHaveAttribute(
      "data-routing-state",
      id,
    );
    geometry.add(await page.locator("[data-routing-state]").innerHTML());
    if ((page.viewportSize()?.width ?? 0) > 600) {
      const distance = await buttons.nth(i).evaluate((button) => {
        const marker = button
          .querySelector("[data-problem-port]")!
          .getBoundingClientRect();
        const path =
          document.querySelector<SVGPathElement>("[data-connector]")!;
        const point = path
          .getPointAtLength(0)
          .matrixTransform(path.getScreenCTM()!);
        return Math.hypot(
          point.x - marker.left - marker.width / 2,
          point.y - marker.top - marker.height / 2,
        );
      });
      expect(distance).toBeLessThan(1.5);
    }
    await expect(page.locator("#problem-detail a")).toHaveAttribute(
      "href",
      `#capability-${id}`,
    );
  }
  expect(geometry.size).toBe(4);
  if (test.info().project.use.hasTouch) await buttons.nth(1).tap();
  else await buttons.nth(1).click();
  await buttons.nth(2).click();
  await buttons.nth(0).click();
  await expect(page.locator("[data-problem]")).toHaveAttribute(
    "data-problem",
    "build",
  );
  await page.getByRole("link", { name: "See how we work" }).click();
  await expect(page).toHaveURL(/#approach$/);
  const invalid = await page
    .locator('a[href^="#"]')
    .evaluateAll((els) =>
      els
        .map((e) => e.getAttribute("href")!)
        .filter((h) => !document.getElementById(h.slice(1))),
    );
  expect(invalid).toEqual([]);
  await expect(
    page
      .getByRole("navigation", { name: "Main navigation" })
      .getByRole("link", { name: "How we work" }),
  ).toHaveAttribute("href", "/about");
  for (const a of await page
    .getByRole("link", { name: "Start a technology conversation", exact: true })
    .all())
    await expect(a).toHaveAttribute(
      "href",
      /^mailto:hello@tavyora.com\?subject=/,
    );
  await page.getByRole("link", { name: "Tavyora, home" }).click();
  await expect(page).toHaveURL(/\/$/);
});

test("Technology motion, settling, reduced motion and journey progression", async ({
  page,
}) => {
  await page.goto("/technology");
  await page.locator("#journey").scrollIntoViewIfNeeded();
  const stages = page.locator("[data-stage]");
  await stages.last().scrollIntoViewIfNeeded();
  await expect(stages.last()).toHaveAttribute("data-reached", "true");
  await page.locator('button[aria-controls="problem-detail"]').nth(2).click();
  await expect
    .poll(() =>
      page
        .locator("[data-routing-state]")
        .evaluate(
          (el) =>
            el
              .getAnimations({ subtree: true })
              .filter((a) => a.playState === "running").length,
        ),
    )
    .toBe(0);
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.reload();
  await expect(page.locator("[data-motion]")).toHaveAttribute(
    "data-motion",
    "off",
  );
  await expect(page.locator(".motion-toggle")).toHaveCount(0);
  await page.locator('button[aria-controls="problem-detail"]').nth(3).click();
  await expect(page.locator("[data-routing-state]")).toHaveAttribute(
    "data-routing-state",
    "systems",
  );
  await expect(page.locator("[data-stage]")).toHaveCount(7);
  expect(
    await page
      .locator("[data-routing-state]")
      .evaluate((el) => el.getAnimations({ subtree: true }).length),
  ).toBe(0);
});

test("Technology reflow, touch targets, focus and axe", async ({ page }) => {
  await page.goto("/technology");
  for (const id of [
    "top",
    "problems",
    "capabilities",
    "journey",
    "conversation",
  ]) {
    await page.locator(`#${id}`).scrollIntoViewIfNeeded();
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= innerWidth,
      ),
    ).toBe(true);
  }
  for (const button of await page
    .locator('button[aria-controls="problem-detail"]')
    .all()) {
    const box = await button.boundingBox();
    expect(box!.height).toBeGreaterThanOrEqual(44);
    expect(box!.width).toBeGreaterThanOrEqual(44);
  }
  const cta = page
    .getByRole("link", { name: "Start a technology conversation", exact: true })
    .first();
  await cta.focus();
  expect(
    await cta.evaluate((el) => getComputedStyle(el).outlineStyle),
  ).not.toBe("none");
  const scan = await new AxeBuilder({ page })
    .withTags(["wcag2a", "wcag2aa", "wcag21aa", "wcag22aa"])
    .analyze();
  expect(scan.violations).toEqual([]);
  await page.setViewportSize({ width: 320, height: 844 });
  expect(
    await page.evaluate(
      () => document.documentElement.scrollWidth <= innerWidth,
    ),
  ).toBe(true);
  await page.setViewportSize({ width: 720, height: 450 }); // Equivalent 200% desktop reflow; manual browser zoom remains separate.
  expect(
    await page.evaluate(
      () => document.documentElement.scrollWidth <= innerWidth,
    ),
  ).toBe(true);
});

test("Technology initial HTML, factual schema, sitemap and no-JS content", async ({
  request,
  browser,
}, info) => {
  test.skip(
    info.project.name !== "production-1440",
    "Shared route output verified once.",
  );
  const r = await request.get("/technology");
  const html = await r.text();
  for (const copy of [
    "Bring the problem",
    "OCR / document workflows",
    "Modernisation planning",
    "Build from zero",
    "Think past the launch",
  ])
    expect(html).toContain(copy);
  const ctx = await browser.newContext({ javaScriptEnabled: false });
  const p = await ctx.newPage();
  await p.goto("http://127.0.0.1:3108/technology");
  await expect(p.locator("h1")).toBeVisible();
  await expect(p.locator("[data-stage]")).toHaveCount(7);
  const json = JSON.parse(
    (await p.locator('script[type="application/ld+json"]').textContent()) ??
      "{}",
  );
  expect(json["@graph"].map((x: { "@type": string }) => x["@type"])).toEqual([
    "Organization",
    "Service",
    "BreadcrumbList",
  ]);
  expect(JSON.stringify(json)).not.toMatch(
    /aggregateRating|reviewCount|priceCurrency/,
  );
  await ctx.close();
  const xml = await (await request.get("/sitemap.xml")).text();
  expect(xml.match(/<loc>/g)).toHaveLength(7);
  expect(xml).toContain("https://tavyora.com/technology");
  expect(xml).not.toMatch(/concept-|direction-/);
  expect((await request.get("/social/tavyora-technology.png")).status()).toBe(
    200,
  );
});

test("Homepage hero entrance settles and reduced motion is static", async ({
  page,
}) => {
  await page.goto("/");
  const trace = page.locator("[data-entrance]");
  await expect(trace).toHaveCount(1);
  await expect
    .poll(() =>
      trace.evaluate(
        (el) =>
          el.getAnimations().filter((a) => a.playState === "running").length,
      ),
    )
    .toBe(0);
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.reload();
  await expect(page.locator("[data-motion]")).toHaveAttribute(
    "data-motion",
    "off",
  );
  await expect(page.locator(".motion-toggle")).toHaveCount(0);
  expect(await trace.evaluate((el) => el.getAnimations().length)).toBe(0);
});
