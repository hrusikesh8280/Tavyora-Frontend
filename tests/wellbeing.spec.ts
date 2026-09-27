import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

test("Wellbeing content, images, metadata and console", async ({
  page,
}, info) => {
  const errors: string[] = [];
  page.on("pageerror", (e) => errors.push(e.message));
  page.on("console", (m) => {
    if (m.type() === "error") errors.push(m.text());
  });
  expect((await page.goto("/wellbeing"))?.status()).toBe(200);
  await page.evaluate(() => document.fonts.ready);
  await expect(page).toHaveTitle(
    "One-to-One & Small-Group Online Yoga — Tavyora",
  );
  await expect(page.locator("h1")).toHaveCount(1);
  await expect(page.locator("h1")).toContainText("Online yoga,");
  await expect(page.locator("main > section")).toHaveCount(9);
  for (const role of ["banner", "main", "contentinfo"] as const)
    await expect(page.getByRole(role)).toHaveCount(1);
  await expect(page.locator('meta[name="robots"]')).toHaveAttribute(
    "content",
    "index, follow",
  );
  await expect(page.locator('link[rel="canonical"]')).toHaveAttribute(
    "href",
    "https://tavyora.com/wellbeing",
  );
  await expect(page.locator('meta[property="og:image"]')).toHaveAttribute(
    "content",
    "https://tavyora.com/social/tavyora-wellbeing.png",
  );
  const levels = await page
    .locator("h1,h2,h3,h4")
    .evaluateAll((els) => els.map((e) => Number(e.tagName[1])));
  for (let i = 1; i < levels.length; i++)
    expect(levels[i] - levels[i - 1]).toBeLessThanOrEqual(1);
  await expect(
    page.getByRole("link", { name: "Explore the practice", exact: true }),
  ).toBeVisible();
  await expect(
    page
      .getByRole("link", { name: "Enquire about a session", exact: true })
      .first(),
  ).toBeVisible();
  await page.screenshot({ path: info.outputPath("wellbeing-hero.png") });
  const photo = page.locator("#one-to-one img");
  await photo.scrollIntoViewIfNeeded();
  await photo.evaluate(async (e) => (e as HTMLImageElement).decode());
  await expect(photo).toHaveAttribute("loading", "lazy");
  await expect(photo).toHaveAttribute("width", "1200");
  await expect(photo).toHaveAttribute("height", "800");
  await expect(photo).toHaveAttribute("alt", /Yoga mat, folded cloth/);
  await expect(page.locator("#one-to-one figcaption")).toContainText(
    "Daylight study",
  );
  expect(
    await photo.evaluate((e) => (e as HTMLImageElement).naturalWidth),
  ).toBeGreaterThan(0);
  await page.screenshot({
    path: info.outputPath("wellbeing-full.png"),
    fullPage: true,
  });
  await page
    .locator('section[aria-labelledby="pause-title"]')
    .screenshot({ path: info.outputPath("wellbeing-pause.png") });
  expect(errors).toEqual([]);
});

test("Production cross-page navigation and enquiry destinations", async ({
  page,
}) => {
  for (const route of ["/", "/technology", "/wellbeing"]) {
    await page.goto(route);
    const nav = page.getByRole("navigation", { name: "Main navigation" });
    await expect(
      page.getByRole("link", { name: "Tavyora, home", exact: true }),
    ).toHaveAttribute("href", "/");
    await expect(
      nav.getByRole("link", { name: "Technology", exact: true }),
    ).toHaveAttribute("href", "/technology");
    await expect(
      nav.getByRole("link", { name: "Wellbeing", exact: true }),
    ).toHaveAttribute("href", "/wellbeing");
    await nav.getByRole("link", { name: "Technology", exact: true }).click();
    await expect(page).toHaveURL(/\/technology$/);
    await page
      .getByRole("navigation", { name: "Main navigation" })
      .getByRole("link", { name: "Wellbeing", exact: true })
      .click();
    await expect(page).toHaveURL(/\/wellbeing$/);
    await page
      .getByRole("link", { name: "Tavyora, home", exact: true })
      .click();
    await expect(page).toHaveURL(/\/$/);
  }
  for (const [label, url] of [
    ["Explore technology", "/technology"],
    ["Explore wellbeing", "/wellbeing"],
  ])
    await expect(
      page.getByRole("link", { name: label, exact: true }),
    ).toHaveAttribute("href", url);
  await page.goto("/wellbeing");
  for (const a of await page
    .getByRole("link", { name: "Enquire about a session", exact: true })
    .all())
    await expect(a).toHaveAttribute(
      "href",
      "mailto:hello@tavyora.com?subject=Yoga%20enquiry%20%E2%80%94%20Tavyora",
    );
  await page
    .getByRole("link", { name: "Explore the practice", exact: true })
    .click();
  await expect(page).toHaveURL(/#practice$/);
  expect(
    await page
      .locator('a[href^="#"]')
      .evaluateAll((els) =>
        els
          .map((el) => el.getAttribute("href")!)
          .filter((h) => !document.getElementById(h.slice(1))),
      ),
  ).toEqual([]);
  await expect(
    page.locator('a[href="/products"],a[href="/apps"],a[href="/blog"]'),
  ).toHaveCount(0);
});

test("Wellbeing keyboard, touch, rhythm geometry and reduced motion", async ({
  page,
}, info) => {
  await page.goto("/wellbeing");
  await page.keyboard.press("Tab");
  await expect(
    page.getByRole("link", { name: "Skip to content" }),
  ).toBeFocused();
  await page.keyboard.press("Enter");
  await expect(page.getByRole("main")).toBeFocused();
  const choices = page.locator("#session button");
  const geometry = new Set<string>();
  for (const [i, name] of ["arrive", "move", "breathe", "close"].entries()) {
    await choices.nth(i).focus();
    await page.keyboard.press("Enter");
    await expect(choices.nth(i)).toHaveAttribute("aria-pressed", "true");
    await expect(page.locator("[data-session-stage]")).toHaveAttribute(
      "data-session-stage",
      name,
    );
    await expect
      .poll(
        async () => {
          const one = await page
            .locator("[data-session-contour] path")
            .first()
            .getAttribute("d");
          await page.waitForTimeout(100);
          return (
            one ===
            (await page
              .locator("[data-session-contour] path")
              .first()
              .getAttribute("d"))
          );
        },
        { timeout: 4500, intervals: [200] },
      )
      .toBe(true);
    geometry.add(await page.locator("[data-session-contour]").innerHTML());
  }
  expect(geometry.size).toBe(4);
  if (info.project.use.hasTouch) await choices.nth(2).tap();
  else await choices.nth(2).click();
  await choices.nth(0).click();
  await expect(page.locator("[data-session-stage]")).toHaveAttribute(
    "data-session-stage",
    "arrive",
  );
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.reload();
  await expect(page.locator("[data-motion]")).toHaveAttribute(
    "data-motion",
    "off",
  );
  await expect(page.locator(".motion-toggle")).toHaveCount(0);
  await choices.nth(2).click();
  await expect(page.locator("[data-session-stage]")).toHaveAttribute(
    "data-session-stage",
    "breathe",
  );
  expect(
    await page
      .locator("[data-breath]")
      .evaluateAll(
        (els) =>
          els.flatMap((el) => el.getAnimations({ subtree: true })).length,
      ),
  ).toBe(0);
});

test("Wellbeing reflow, focus, touch target and axe checks", async ({
  page,
}) => {
  await page.goto("/wellbeing");
  for (const id of [
    "top",
    "practice",
    "one-to-one",
    "session",
    "practitioner",
    "is-this-for-you",
    "enquire",
  ]) {
    await page.locator(`#${id}`).scrollIntoViewIfNeeded();
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= innerWidth,
      ),
    ).toBe(true);
  }
  for (const control of await page
    .locator("#session button,header nav a")
    .all()) {
    const box = await control.boundingBox();
    if (box) expect(box.height).toBeGreaterThanOrEqual(44);
  }
  await page.locator("#session button").nth(2).focus();
  expect(
    await page
      .locator("#session button")
      .nth(2)
      .evaluate((el) => getComputedStyle(el).outlineStyle),
  ).not.toBe("none");
  const scan = await new AxeBuilder({ page })
    .withTags(["wcag2a", "wcag2aa", "wcag21aa", "wcag22aa"])
    .analyze();
  expect(scan.violations).toEqual([]);
  for (const width of [320, 720]) {
    await page.setViewportSize({ width, height: width === 720 ? 450 : 844 });
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= innerWidth,
      ),
    ).toBe(true);
  }
});

test("Wellbeing static HTML, schema, sitemap and motion settling", async ({
  page,
  request,
  browser,
}, info) => {
  test.skip(
    info.project.name !== "production-1440",
    "Shared route and timing checks run once.",
  );
  const html = await (await request.get("/wellbeing")).text();
  for (const text of [
    "Individual pace",
    "Small-group",
    "master’s degree in yoga",
    "Close",
    "Begin with",
  ])
    expect(html.toLowerCase()).toContain(text.toLowerCase());
  const ctx = await browser.newContext({ javaScriptEnabled: false });
  const p = await ctx.newPage();
  await p.goto("http://127.0.0.1:3108/wellbeing");
  await expect(p.locator("h1")).toBeVisible();
  await expect(p.locator("#session button")).toHaveCount(4);
  await expect(p.locator("#practitioner")).toContainText(
    "master’s degree in yoga",
  );
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
    /"Person"|aggregateRating|priceCurrency|"Course"|"Event"/,
  );
  await p.setViewportSize({ width: 390, height: 844 });
  for (const text of [
    "Take a moment to settle in",
    "Follow clear guidance",
    "Leave room to notice",
    "Take time to finish",
  ])
    await expect(
      p.locator("#session button").getByText(text, { exact: false }),
    ).toBeVisible();
  await ctx.close();
  const xml = await (await request.get("/sitemap.xml")).text();
  expect(xml.match(/<loc>/g)).toHaveLength(7);
  expect(xml).toContain("https://tavyora.com/wellbeing");
  expect(xml).not.toMatch(/concept-|direction-/);
  await page.goto("/wellbeing");
  // Wait for real entrance animations; do not mistake pre-hydration inactivity for settling.
  await expect
    .poll(() =>
      page
        .locator('[data-breath="hero"]')
        .evaluate((el) => el.getAnimations({ subtree: true }).length),
    )
    .toBe(2);
  await expect
    .poll(
      () =>
        page
          .locator('[data-breath="hero"]')
          .evaluate(
            (el) =>
              el
                .getAnimations({ subtree: true })
                .filter((a) => a.playState === "running").length,
          ),
      { timeout: 7000 },
    )
    .toBe(0);
  for (const route of ["/privacy", "/terms"])
    expect((await request.get(route)).status()).toBe(200);
  const image = await request.get("/social/tavyora-wellbeing.png");
  expect(image.status()).toBe(200);
  const bytes = await image.body();
  expect(bytes.readUInt32BE(16)).toBe(1200);
  expect(bytes.readUInt32BE(20)).toBe(630);
});

test("Human Rhythm figures, responsive sources, interaction parity and public email", async ({
  page,
}, info) => {
  const images: string[] = [];
  page.on("request", (request) => {
    if (request.url().includes("/images/session-study/"))
      images.push(request.url());
  });
  await page.goto("/wellbeing");
  expect(images.some((url) => /\/(move|breathe|close)-/.test(url))).toBe(false);
  const study = page.locator("[data-human-stage]");
  await study.scrollIntoViewIfNeeded();
  const initial = await study.boundingBox();
  const buttons = page.locator("#session button");
  for (const [i, name] of ["arrive", "move", "breathe", "close"].entries()) {
    if (info.project.use.hasTouch) await buttons.nth(i).tap();
    else await buttons.nth(i).click();
    await expect(buttons.nth(i)).toHaveAttribute("aria-pressed", "true");
    await expect(study).toHaveAttribute("data-human-stage", name);
    const figure = study.locator(`[data-pose="${name}"]`);
    await figure.locator("img").evaluate(async (el) => {
      await (el as HTMLImageElement).decode();
    });
    await expect(figure).toHaveAttribute("data-visible", "true");
    await expect(study.locator('[data-visible="true"]')).toHaveCount(1);
    const image = figure.locator("img");
    await expect(image).toHaveAttribute("alt", /figure/);
    await expect(image).toHaveAttribute("width", "1024");
    await expect(image).toHaveAttribute("height", "1024");
    await expect(image).toHaveAttribute("loading", "lazy");
    await expect(image).toHaveAttribute("sizes", /75vw/);
    const src = await image.evaluate(
      (el) => (el as HTMLImageElement).currentSrc,
    );
    expect(src).toMatch(
      new RegExp(
        `/images/session-study/${name}-(320|480|768|1024)\\.webp\\?w=\\d+$`,
      ),
    );
    if ((info.project.use.viewport?.width ?? 1440) <= 430)
      expect(src).not.toContain("1024.webp");
    const bounds = await study.boundingBox();
    expect(bounds?.height).toBe(initial?.height);
    if ([1440, 390, 360].includes(info.project.use.viewport?.width ?? 0)) {
      await page.waitForTimeout(1600);
      await study.screenshot({
        path: info.outputPath(`human-rhythm-${name}.png`),
      });
    }
  }
  await expect(page.locator("#rhythm-disclosure")).toHaveCount(0);
  await expect(study.locator("clipPath")).toHaveCount(1);
  await buttons.nth(0).focus();
  await page.keyboard.press("Enter");
  await expect(study).toHaveAttribute("data-human-stage", "arrive");
  await expect(study.locator('[data-pose="arrive"]')).toHaveAttribute(
    "data-visible",
    "true",
  );
  await page.emulateMedia({ reducedMotion: "reduce" });
  await buttons.nth(2).click();
  await expect(study).toHaveAttribute("data-human-stage", "breathe");
  expect(
    await study
      .locator('[data-pose="breathe"]')
      .evaluate((el) => getComputedStyle(el).transform),
  ).toBe("none");
  for (const route of ["/", "/technology", "/wellbeing"]) {
    await page.goto(route);
    expect(await page.content()).not.toContain("admin@tavyora.com");
    const mailLinks = await page
      .locator('a[href^="mailto:"]')
      .evaluateAll((els) => els.map((el) => el.getAttribute("href")));
    expect(mailLinks.length).toBeGreaterThan(0);
    for (const href of mailLinks)
      expect(href).toMatch(/^mailto:hello@tavyora\.com(?:\?|$)/);
    if (route !== "/wellbeing")
      expect(mailLinks).toContain(
        "mailto:hello@tavyora.com?subject=Technology%20project%20%E2%80%94%20Tavyora",
      );
    if (route !== "/technology")
      expect(mailLinks).toContain(
        "mailto:hello@tavyora.com?subject=Yoga%20enquiry%20%E2%80%94%20Tavyora",
      );
  }
});
