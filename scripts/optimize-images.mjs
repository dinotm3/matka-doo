import sharp from 'sharp';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';
import { stat } from 'fs/promises';

const __dirname = dirname(fileURLToPath(import.meta.url));
const publicDir = resolve(__dirname, '..', 'public');

async function getSize(path) {
  const s = await stat(path);
  return (s.size / 1024).toFixed(0) + ' KB';
}

async function optimize() {
  // white_bg.jpg - background texture, doesn't need to be high res
  // Used at 40% opacity as subtle texture, can be very small
  const whiteBg = resolve(publicDir, 'white_bg.jpg');
  console.log(`white_bg.jpg before: ${await getSize(whiteBg)}`);
  await sharp(whiteBg)
    .resize(1200, null, { withoutEnlargement: true })
    .webp({ quality: 50 })
    .toFile(resolve(publicDir, 'white_bg.webp'));
  console.log(`white_bg.webp after: ${await getSize(resolve(publicDir, 'white_bg.webp'))}`);

  // ruler.jpg - used behind dark overlay, very little detail visible
  const ruler = resolve(publicDir, 'ruler.jpg');
  console.log(`ruler.jpg before: ${await getSize(ruler)}`);
  await sharp(ruler)
    .resize(1600, null, { withoutEnlargement: true })
    .webp({ quality: 45 })
    .toFile(resolve(publicDir, 'ruler.webp'));
  console.log(`ruler.webp after: ${await getSize(resolve(publicDir, 'ruler.webp'))}`);

  // calculator.jpg - hero background, half-width, behind gradient
  const calc = resolve(publicDir, 'calculator.jpg');
  console.log(`calculator.jpg before: ${await getSize(calc)}`);
  await sharp(calc)
    .resize(800, null, { withoutEnlargement: true })
    .webp({ quality: 55 })
    .toFile(resolve(publicDir, 'calculator.webp'));
  console.log(`calculator.webp after: ${await getSize(resolve(publicDir, 'calculator.webp'))}`);

  // registratori_side_image.jpg - already small but let's convert
  const reg = resolve(publicDir, 'registratori_side_image.jpg');
  console.log(`registratori_side_image.jpg before: ${await getSize(reg)}`);
  await sharp(reg)
    .resize(800, null, { withoutEnlargement: true })
    .webp({ quality: 60 })
    .toFile(resolve(publicDir, 'registratori_side_image.webp'));
  console.log(`registratori_side_image.webp after: ${await getSize(resolve(publicDir, 'registratori_side_image.webp'))}`);

  console.log('\nDone! Now update image references in code to use .webp files.');
}

optimize().catch(console.error);
