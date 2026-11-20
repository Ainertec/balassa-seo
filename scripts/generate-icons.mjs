/**
 * Gera os ícones da PWA e a imagem de compartilhamento a partir dos assets originais.
 *
 *   logo.webp   -> icons/icon-192.png, icons/icon-512.png, icons/icon-maskable-512.png,
 *                  apple-touch-icon-180.png (fundo charcoal + logo com margem de segurança)
 *   banner.webp -> assets/og-image.jpg (1200x630, fundo bege, chamada dourada)
 *
 * Uso: npm run icons
 */
import { readFile, writeFile, mkdir } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import path from 'node:path';
import sharp from 'sharp';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const publicDir = path.join(root, 'public');
const iconsDir = path.join(publicDir, 'icons');
const assetsDir = path.join(publicDir, 'assets');

const CHARCOAL = '#111111';
const BEIGE = '#F4F1EA';
const GOLD = '#C79A4B';

async function ensureDirs() {
  await mkdir(iconsDir, { recursive: true });
  await mkdir(assetsDir, { recursive: true });
}

/** Ícone quadrado com fundo charcoal e a marca centralizada. */
async function squareIcon(buffer, size, output, { padding = 0.12 } = {}) {
  const inner = Math.round(size * (1 - padding * 2));
  const logo = await sharp(buffer)
    .resize(inner, inner, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .png()
    .toBuffer();

  await sharp({ create: { width: size, height: size, channels: 4, background: CHARCOAL } })
    .composite([{ input: logo, gravity: 'center' }])
    .png({ compressionLevel: 9 })
    .toFile(path.join(publicDir, output));

  console.log(`✓ ${output} (${size}x${size})`);
}

async function ogImage(bannerBuffer, logoBuffer) {
  const width = 1200;
  const height = 630;
  const bandHeight = 112;
  const footerHeight = 56;
  const bannerWidth = Math.round(width * 0.32);
  const availableHeight = height - bandHeight - footerHeight - 48;

  const banner = await sharp(bannerBuffer)
    .resize({ width: bannerWidth, height: availableHeight, fit: 'contain', background: BEIGE })
    .toBuffer();

  const markSize = 68;
  const mark = await sharp(logoBuffer)
    .resize(markSize, markSize, { fit: 'cover' })
    .png()
    .toBuffer();

  // Faixa superior e inferior com a identidade da marca.
  const header = Buffer.from(`<svg width="${width}" height="${bandHeight}" xmlns="http://www.w3.org/2000/svg">
    <rect width="${width}" height="${bandHeight}" fill="${CHARCOAL}"/>
    <text x="${width - 64}" y="66" text-anchor="end" font-family="Georgia, serif" font-size="34" fill="${BEIGE}">
      Autoridade <tspan fill="${GOLD}" font-style="italic">orgânica</tspan>
    </text>
    <text x="${width - 64}" y="90" text-anchor="end" font-family="Helvetica, Arial, sans-serif" font-size="13" letter-spacing="5" fill="rgba(244,241,234,0.6)">
      SEO &amp; GROWTH
    </text>
  </svg>`);

  const footer = Buffer.from(`<svg width="${width}" height="${footerHeight}" xmlns="http://www.w3.org/2000/svg">
    <rect width="${width}" height="${footerHeight}" fill="${CHARCOAL}"/>
    <text x="64" y="35" font-family="Helvetica, Arial, sans-serif" font-size="14" letter-spacing="4" fill="rgba(244,241,234,0.65)">
      CONSULTORIA EXCLUSIVA DE SEO E ESTRATÉGIA DIGITAL
    </text>
    <text x="${width - 64}" y="35" text-anchor="end" font-family="Helvetica, Arial, sans-serif" font-size="14" letter-spacing="4" fill="${GOLD}">
      PRIVATE ACCESS
    </text>
  </svg>`);

  const left = Math.round((width - bannerWidth) / 2);
  const top = bandHeight + Math.round((height - bandHeight - footerHeight - availableHeight) / 2);

  await sharp({ create: { width, height, channels: 3, background: BEIGE } })
    .composite([
      { input: banner, top, left },
      { input: header, top: 0, left: 0 },
      { input: footer, top: height - footerHeight, left: 0 },
      { input: mark, top: Math.round((bandHeight - markSize) / 2), left: 64 },
    ])
    .jpeg({ quality: 88, mozjpeg: true })
    .toFile(path.join(assetsDir, 'og-image.jpg'));

  console.log(`✓ assets/og-image.jpg (${width}x${height})`);
}

async function main() {
  await ensureDirs();
  const logo = await readFile(path.join(publicDir, 'logo.webp'));
  const banner = await readFile(path.join(publicDir, 'banner.webp'));

  await squareIcon(logo, 192, 'icons/icon-192.png');
  await squareIcon(logo, 512, 'icons/icon-512.png');
  // Maskable: margem extra para respeitar a zona segura do Android.
  await squareIcon(logo, 512, 'icons/icon-maskable-512.png', { padding: 0.18 });
  await squareIcon(logo, 180, 'apple-touch-icon-180.png', { padding: 0.1 });

  await ogImage(banner, logo);

  // Markdown versionado dos arquivos fonte, útil para o time de conteúdo.
  await writeFile(
    path.join(assetsDir, '.placeholder'),
    'Arquivos gerados por `npm run icons` a partir de public/logo.webp e public/banner.webp.\n',
    'utf8',
  );
}

main().catch((error) => {
  console.error('Falha ao gerar ícones:', error);
  process.exitCode = 1;
});
