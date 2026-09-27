// Local, deterministic rendering of approved brand typography and vector lines.
// Uses the existing development-only Playwright dependency; no runtime image service.
import { chromium } from "@playwright/test";
import { readFile, mkdir } from "node:fs/promises";
const font = async (name) =>
  (
    await readFile(new URL(`../public/fonts/${name}`, import.meta.url))
  ).toString("base64");
const inter = await font("inter-latin-wght-normal.woff2");
const serif = await font("ibm-plex-serif-latin-400-italic.woff2");
const browser = await chromium.launch(
  process.env.PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH
    ? { executablePath: process.env.PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH }
    : {},
);
try {
  const page = await browser.newPage({
    viewport: { width: 1200, height: 630 },
    deviceScaleFactor: 1,
  });
  await page.setContent(`<!doctype html><html><head><style>
 @font-face{font-family:Inter;src:url(data:font/woff2;base64,${inter}) format('woff2');font-weight:100 900}
 @font-face{font-family:Plex;src:url(data:font/woff2;base64,${serif}) format('woff2');font-style:italic;font-weight:400}
 *{box-sizing:border-box}body{margin:0;background:#f3efe6;color:#282e2d;font-family:Inter}
 .canvas{width:1200px;height:630px;padding:44px 56px;position:relative}.wordmark{font-size:36px;font-weight:530;letter-spacing:-2.4px}.dot{color:#964630}.meta{position:absolute;right:56px;top:61px;font-size:12px;letter-spacing:1px;color:#625d55}.rule{height:1px;background:#c5bfb3;margin-top:25px}.rail{position:absolute;width:1px;background:#c5bfb3;left:80px;top:113px;bottom:44px}.title{font-size:82px;font-weight:450;letter-spacing:-5.5px;margin:57px 0 0 64px;line-height:1.1}.italic{font-family:Plex;font-style:italic;font-size:82px;letter-spacing:-4.6px;text-align:right;margin-top:9px;padding-right:16px;line-height:1.2}.signal{width:1088px;height:66px;margin-top:0}.caption{font-size:18px;line-height:1.6;margin:40px 0 0 64px;color:#625d55;max-width:750px}.url{position:absolute;bottom:47px;right:56px;font-size:14px;color:#625d55}
 </style></head><body><div class="canvas"><div class="wordmark">tavyora<span class="dot">.</span></div><div class="meta">WELLBEING / TAVYORA</div><div class="rule"></div><div class="rail"></div><div class="title">Online yoga,</div><svg class="signal" viewBox="0 0 1088 66" fill="none" xmlns="http://www.w3.org/2000/svg">${Array.from({ length: 4 }, (_, i) => `<path d="M${24 + i * 5} 0 C${24 + i * 5} ${50 + i * 3} ${200 + i * 12} ${60 + i * 4} ${440 + i * 10} ${38 + i * 5} S${880 + i * 8} ${6 + i * 4} 1088 ${54 + i * 4}" stroke="#964630" stroke-width=".9"/>`).join("")}</svg><div class="italic">with room to notice.</div><div class="caption">One-to-one and small-group online yoga.<br/>Clear instruction. Considered pacing.</div><div class="url">tavyora.com/wellbeing</div></div></body></html>`);
  await page.evaluate(() => document.fonts.ready);
  await mkdir(new URL("../public/social/", import.meta.url), {
    recursive: true,
  });
  await page.screenshot({
    path: new URL("../public/social/tavyora-wellbeing.png", import.meta.url)
      .pathname,
  });
  console.log("Generated public/social/tavyora-wellbeing.png (1200 × 630)");
} finally {
  await browser.close();
}
