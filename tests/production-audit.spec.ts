import { test, expect } from "@playwright/test";
test("production metadata, factual schema, email, assets and removed routes", async ({
  page,
  request,
}, info) => {
  test.skip(info.project.name !== "production-1440");
  const titles = new Set<string>(),
    descriptions = new Set<string>();
  const routes = [
    "/",
    "/technology",
    "/wellbeing",
    "/about",
    "/contact",
    "/privacy",
    "/terms",
  ];
  for (const route of routes) {
    expect((await page.goto(route))?.status()).toBe(200);
    titles.add(await page.title());
    const description = await page
      .locator('meta[name="description"]')
      .getAttribute("content");
    expect(description?.length).toBeGreaterThan(30);
    descriptions.add(description!);
    await expect(page.locator("h1")).toHaveCount(1);
    await expect(page.locator('link[rel="canonical"]')).toHaveAttribute(
      "href",
      route === "/" ? /^https:\/\/tavyora\.com\/?$/ : `https://tavyora.com${route}`,
    );
    await expect(page.locator('meta[name="robots"]')).toHaveAttribute(
      "content",
      "index, follow",
    );
    await expect(page.locator('meta[property="og:title"]')).toHaveCount(1);
    expect(await page.content()).not.toContain("admin@tavyora.com");
    await expect(page.locator(".motion-toggle")).toHaveCount(0);
    for (const raw of await page
      .locator('script[type="application/ld+json"]')
      .allTextContents()) {
      const schema = JSON.parse(raw);
      expect(schema).toBeTruthy();
      expect(raw).not.toMatch(
        /"(?:aggregateRating|review|price|award|downloadCount|Person)"/,
      );
    }
    const links = await page
      .locator('a[href^="/"]')
      .evaluateAll((nodes) =>
        nodes.map((n) => n.getAttribute("href")!.split("#")[0].split("?")[0]),
      );
    for (const href of new Set(links)) expect(routes).toContain(href);
  }
  expect(titles.size).toBe(7);
  expect(descriptions.size).toBe(7);
  for (const route of [
    "/definitely-not-a-page",
    "/concept-a",
    "/concept-b",
    "/concept-c",
    "/direction-living-signal",
    "/direction-living-signal-v2",
  ]) {
    expect((await request.get(route)).status()).toBe(404);
  }
  const xml = await (await request.get("/sitemap.xml")).text();
  expect(xml.match(/<loc>/g)).toHaveLength(7);
  expect(xml).not.toMatch(/concept-|direction-|404|not-found/);
});
