import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
for (const route of ["privacy", "terms", "this-page-does-not-exist"]) {
  test(`${route}: reading, navigation, metadata, axe and reduced motion`, async ({
    page,
  }) => {
    const errors: string[] = [];
    page.on("pageerror", (error) => errors.push(error.message));
    const response = await page.goto(`/${route}`);
    expect(response?.status()).toBe(route.startsWith("this-") ? 404 : 200);
    await expect(page.locator("h1")).toHaveCount(1);
    await expect(page.locator("main")).toBeVisible();
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= innerWidth,
      ),
    ).toBeTruthy();
    const footer = page.getByRole("navigation", { name: "Footer navigation" });
    await expect(footer.getByRole("link")).toHaveCount(6);
    await expect(
      footer.getByRole("link", { name: "Privacy", exact: true }),
    ).toHaveAttribute("href", "/privacy");
    await expect(
      footer.getByRole("link", { name: "Terms", exact: true }),
    ).toHaveAttribute("href", "/terms");
    if (!route.startsWith("this-")) {
      await expect(page.locator('link[rel="canonical"]')).toHaveAttribute(
        "href",
        `https://tavyora.com/${route}`,
      );
      await expect(page.locator('meta[name="robots"]')).toHaveAttribute(
        "content",
        "index, follow",
      );
      await expect(page.locator('meta[property="og:title"]')).toHaveCount(1);
      const first = page
        .getByRole("navigation", { name: "On this page" })
        .getByRole("link")
        .first();
      await first.click();
      await expect(page).toHaveURL(
        new RegExp(`#${route === "privacy" ? "scope" : "use"}$`),
      );
    } else {
      expect(
        await page
          .locator('meta[name="robots"]')
          .evaluateAll((nodes) =>
            nodes.some((node) =>
              node.getAttribute("content")?.includes("noindex"),
            ),
          ),
      ).toBeTruthy();
      await expect(
        page.getByRole("link", { name: "Return home" }),
      ).toHaveAttribute("href", "/");
    }
    expect(
      (
        await new AxeBuilder({ page })
          .withTags(["wcag2a", "wcag2aa", "wcag21aa", "wcag22aa"])
          .analyze()
      ).violations,
    ).toEqual([]);
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.goto("about:blank");
    await page.goto(`/${route}`);
    if (route.startsWith("this-"))
      expect(
        await page
          .locator("svg path")
          .evaluateAll((nodes) =>
            nodes.every(
              (node) => getComputedStyle(node).animationName === "none",
            ),
          ),
      ).toBeTruthy();
    await page.keyboard.press("Tab");
    await expect(
      page.getByRole("link", { name: "Skip to content" }),
    ).toBeFocused();
    await page.keyboard.press("Enter");
    await expect(page.locator("main")).toBeFocused();
    expect(errors).toEqual([]);
    await page.screenshot({
      path: `test-results/legal-${route}-${test.info().project.name}.png`,
      fullPage: true,
    });
  });
}
test("approved routes footer and recovery regression", async ({ page }) => {
  for (const route of ["/", "/about", "/contact"]) {
    await page.goto(route);
    const footer = page.getByRole("navigation", { name: "Footer navigation" });
    await footer.getByRole("link", { name: "Privacy", exact: true }).click();
    await expect(page).toHaveURL(/\/privacy$/);
    await page
      .getByRole("navigation", { name: "Footer navigation" })
      .getByRole("link", { name: "Terms", exact: true })
      .click();
    await expect(page).toHaveURL(/\/terms$/);
  }
  await page.goto("/this-page-does-not-exist");
  await page.getByRole("link", { name: "Return home" }).click();
  await expect(page).toHaveURL("/");
});
test("narrow reflow and sitemap", async ({ page, request }) => {
  test.skip(test.info().project.name !== "production-1440");
  for (const width of [720, 320]) {
    await page.setViewportSize({ width, height: 450 });
    for (const route of ["privacy", "terms", "this-page-does-not-exist"]) {
      await page.goto(`/${route}`);
      expect(
        await page.evaluate(
          () => document.documentElement.scrollWidth <= innerWidth,
        ),
      ).toBeTruthy();
    }
  }
  const xml = await (await request.get("/sitemap.xml")).text();
  expect((xml.match(/<loc>/g) || []).length).toBe(7);
  expect(xml).not.toMatch(/concept|direction-|not-found|blog/);
});
