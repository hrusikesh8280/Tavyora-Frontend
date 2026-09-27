import { test, expect } from "@playwright/test";

test("Life Rhythm remains deliberate, interruptible and still", async ({
  page,
}, info) => {
  await page.goto("/wellbeing");
  const story = page.locator("[data-session-stage]");
  const buttons = story.locator("button[data-chapter]");
  const stage = page.locator("[data-human-stage]");
  await buttons.nth(0).click();
  // Hover events themselves never change the human scene, even on another chapter.
  await buttons.nth(2).dispatchEvent("pointerenter", { pointerType: "mouse" });
  await page.waitForTimeout(1700);
  await expect(story).toHaveAttribute("data-session-stage", "arrive");
  const path = stage.locator("[data-session-contour] path").first();
  const stable = await path.getAttribute("d");
  await page.waitForTimeout(1200);
  expect(await path.getAttribute("d")).toBe(stable);
  await expect(story).toHaveAttribute("data-session-stage", "arrive");

  // Rapid keyboard input interrupts transitions. The most recent intent wins.
  for (const i of [1, 3, 0, 2]) {
    await buttons.nth(i).focus();
    await page.keyboard.press("Enter");
    await page.waitForTimeout(70);
  }
  await expect(story).toHaveAttribute("data-session-stage", "breathe");
  await stage
    .locator('[data-pose="breathe"] img')
    .evaluate((el) => (el as HTMLImageElement).decode());
  await expect(stage.locator('[data-pose="breathe"]')).toHaveAttribute(
    "data-visible",
    "true",
  );
  await page.waitForTimeout(1700);
  expect(
    await stage.evaluate(
      (el) =>
        el
          .getAnimations({ subtree: true })
          .filter((a) => a.playState === "running").length,
    ),
  ).toBe(0);
  const settled = await path.getAttribute("d");
  await page.waitForTimeout(400);
  expect(await path.getAttribute("d")).toBe(settled);
  if (info.project.use.hasTouch) await buttons.nth(3).tap();
  else await buttons.nth(3).click();
  await expect(story).toHaveAttribute("data-session-stage", "close");
  for (const button of await buttons.all()) {
    const box = await button.boundingBox();
    expect(box!.height).toBeGreaterThanOrEqual(48);
    expect(box!.width).toBeGreaterThanOrEqual(48);
  }
  await page.emulateMedia({ reducedMotion: "reduce" });
  await buttons.nth(0).click();
  await page.waitForTimeout(200);
  expect(
    await stage
      .locator('[data-pose="arrive"]')
      .evaluate((el) => getComputedStyle(el).transform),
  ).toBe("none");
  expect(
    await story
      .locator("figure")
      .locator("..")
      .evaluate((el) => getComputedStyle(el).position),
  ).not.toBe("sticky");
  expect(
    await page.evaluate(
      () => document.documentElement.scrollWidth > innerWidth,
    ),
  ).toBe(false);
});

test("Desktop chapters follow ordinary scrolling; mobile selection stays explicit", async ({
  page,
}, info) => {
  await page.goto("/wellbeing");
  const story = page.locator("[data-session-stage]");
  const buttons = story.locator("button[data-chapter]");
  const width = info.project.use.viewport?.width ?? 390;
  if (width > 1024) {
    for (const [i, name] of ["arrive", "move", "breathe", "close"].entries()) {
      const box = await buttons.nth(i).boundingBox();
      const dy =
        box!.y + box!.height / 2 - info.project.use.viewport!.height * 0.48;
      const targetY = await page.evaluate(
        (delta) => Math.max(0, scrollY + delta),
        dy,
      );
      await page.mouse.wheel(0, dy);
      await expect
        .poll(async () =>
          Math.abs((await page.evaluate(() => scrollY)) - targetY),
        )
        .toBeLessThan(3);
      await expect(story).toHaveAttribute("data-session-stage", name);
    }
    // Equivalent 200% layout viewport; native browser zoom remains a manual check.
    await page.setViewportSize({ width: 720, height: 450 });
    await page.evaluate(() => {
      document.documentElement.style.zoom = "";
    });
    await buttons.nth(0).focus();
    await expect(buttons.nth(0)).toBeFocused();
    expect(
      await page.evaluate(
        () =>
          document.documentElement.scrollWidth >
          document.documentElement.clientWidth,
      ),
    ).toBe(false);
    await page.evaluate(() => {
      document.documentElement.style.zoom = "";
    });
  } else {
    await buttons.nth(1).click();
    await page.mouse.wheel(0, 500);
    await page.waitForTimeout(300);
    await expect(story).toHaveAttribute("data-session-stage", "move");
  }
});
