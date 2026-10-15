// Generates favicon.ico, apple-icon, PWA icons and the OG portrait from one SVG mark.
// Run: node scripts/generate-icons.mjs   (re-run after changing the mark or portrait)
import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const root = path.resolve(import.meta.dirname, "..");
const out = (...p) => path.join(root, ...p);

const BG = "#202020";
const DOT = "#e45684";

// Rounded square with a serif "R" and an accent dot. `pad` shrinks the mark for maskable icons.
const mark = (pad = 0, rounded = true) => `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
  <rect width="512" height="512" rx="${rounded ? 112 : 0}" fill="${BG}"/>
  <g transform="translate(${pad} ${pad}) scale(${(512 - pad * 2) / 512})">
    <text x="238" y="372" text-anchor="middle" font-family="Georgia, 'Times New Roman', serif" font-size="340" fill="#ffffff">R</text>
    <circle cx="392" cy="352" r="34" fill="${DOT}"/>
  </g>
</svg>`;

const png = (svg, size) => sharp(Buffer.from(svg)).resize(size, size).png().toBuffer();

// ICO container holding PNG images (supported by all current browsers).
function ico(images) {
  const header = Buffer.alloc(6);
  header.writeUInt16LE(0, 0);
  header.writeUInt16LE(1, 2);
  header.writeUInt16LE(images.length, 4);
  const dir = Buffer.alloc(16 * images.length);
  let offset = 6 + dir.length;
  images.forEach(({ size, data }, k) => {
    const o = k * 16;
    dir.writeUInt8(size >= 256 ? 0 : size, o);
    dir.writeUInt8(size >= 256 ? 0 : size, o + 1);
    dir.writeUInt8(0, o + 2);
    dir.writeUInt8(0, o + 3);
    dir.writeUInt16LE(1, o + 4);
    dir.writeUInt16LE(32, o + 6);
    dir.writeUInt32LE(data.length, o + 8);
    dir.writeUInt32LE(offset, o + 12);
    offset += data.length;
  });
  return Buffer.concat([header, dir, ...images.map((i) => i.data)]);
}

await mkdir(out("assets"), { recursive: true });

await writeFile(out("app", "icon.svg"), mark());
await writeFile(
  out("app", "favicon.ico"),
  ico(await Promise.all([16, 32, 48].map(async (size) => ({ size, data: await png(mark(), size) })))),
);
await writeFile(out("app", "apple-icon.png"), await png(mark(0, false), 180));
await writeFile(out("public", "icon-192.png"), await png(mark(), 192));
await writeFile(out("public", "icon-512.png"), await png(mark(), 512));
await writeFile(out("public", "icon-maskable-512.png"), await png(mark(72, false), 512));

// Satori (next/og) cannot read WebP, so keep a PNG copy of the portrait for OG images.
await sharp(out("public", "portrait.webp")).resize(560).png({ compressionLevel: 9 }).toFile(out("assets", "og-portrait.png"));

console.log("icons generated");
