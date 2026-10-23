// Bakes the green tint of the Usluge section into the background image.
//
// UslugeSection used to stack the raw ruler photo with a multiply-blended
// gradient plus a second translucent gradient, all as separate full-section
// layers. mix-blend-mode forces the compositor to re-rasterise the whole stack
// while scrolling, which is the main source of the jank on that section.
// Baking those two colour layers here means the browser paints one opaque
// image and nothing has to blend at runtime.
//
// Usage:  node scripts/bake-usluge-bg.mjs [path/to/ruler.jpg]
// Output: public/usluge-bg.webp
//
// Source: the original 3727x5590 ruler.jpg is NOT in the working tree (it is
// 1.7 MB). It lives in git history at commit ab212d7 as public/ruler.jpg:
//   git show ab212d7:public/ruler.jpg > /some/dir/ruler.jpg
// and is passed as the first argument. Without an argument the script falls
// back to public/ruler.webp (1200 px), which looks soft on large screens.

import sharp from "sharp";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";
import { existsSync, statSync } from "fs";

const __dirname = dirname(fileURLToPath(import.meta.url));
const publicDir = resolve(__dirname, "..", "public");

const source = [process.argv[2], resolve(publicDir, "ruler.jpg"), resolve(publicDir, "ruler.webp")]
  .filter(Boolean)
  .find((p) => existsSync(p));
if (!source) throw new Error("no source image found (pass ruler.jpg as the first argument)");
console.log(`source: ${source}`);

// 2000 px covers a 1x 2560-wide screen without visible upscaling once the
// section is cropped to its aspect; next/image downsizes for phones.
const WIDTH = 2000;
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
  // Dark, low-contrast images smear badly at low WebP quality, and next/image
  // re-encodes once more on the way out, so keep this one fairly high.
  .webp({ quality: 80 })
  .toFile(out);

console.log(`usluge-bg.webp: ${width}x${height}, ${(statSync(out).size / 1024).toFixed(0)} KB`);
