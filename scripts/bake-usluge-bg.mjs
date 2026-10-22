// Bakes the green tint of the Usluge section into the background image.
//
// UslugeSection used to stack the raw ruler photo with a multiply-blended
// gradient plus a second translucent gradient, all as separate full-section
// layers. mix-blend-mode forces the compositor to re-rasterise the whole stack
// while scrolling, which is the main source of the jank on that section.
// Baking those two colour layers here means the browser paints one opaque
// image and nothing has to blend at runtime.
//
// Usage:  node scripts/bake-usluge-bg.mjs
// Output: public/usluge-bg.webp

import sharp from "sharp";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";
import { existsSync, statSync } from "fs";

const __dirname = dirname(fileURLToPath(import.meta.url));
const publicDir = resolve(__dirname, "..", "public");

const source = ["ruler.jpg", "ruler.webp"]
  .map((f) => resolve(publicDir, f))
  .find((p) => existsSync(p));
if (!source) throw new Error("public/ruler.jpg or ruler.webp not found");

const WIDTH = 1600; // enough for 1x desktop; next/image downsizes for phones
const base = sharp(source).resize(WIDTH, null, { withoutEnlargement: true });
const { width, height } = await base.clone().toBuffer({ resolveWithObject: true }).then((r) => r.info);

// CSS "to bottom right" ≈ SVG objectBoundingBox (0,0) → (1,1)
const multiplyLayer = Buffer.from(`
<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}">
  <defs>
    <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0"   stop-color="rgb(30,100,65)"/>
      <stop offset="0.5" stop-color="rgb(35,110,72)"/>
      <stop offset="1"   stop-color="rgb(25,85,55)"/>
    </linearGradient>
  </defs>
  <rect width="100%" height="100%" fill="url(#g)"/>
</svg>`);

const depthLayer = Buffer.from(`
<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}">
  <defs>
    <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0"   stop-color="rgb(20,70,48)" stop-opacity="0.65"/>
      <stop offset="0.5" stop-color="rgb(25,90,58)" stop-opacity="0.6"/>
      <stop offset="1"   stop-color="rgb(18,55,40)" stop-opacity="0.7"/>
    </linearGradient>
  </defs>
  <rect width="100%" height="100%" fill="url(#g)"/>
</svg>`);

const out = resolve(publicDir, "usluge-bg.webp");
await base
  .composite([
    { input: multiplyLayer, blend: "multiply" },
    { input: depthLayer, blend: "over" },
  ])
  .webp({ quality: 55 })
  .toFile(out);

console.log(`usluge-bg.webp: ${width}x${height}, ${(statSync(out).size / 1024).toFixed(0)} KB`);
