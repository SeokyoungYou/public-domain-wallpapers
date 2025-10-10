# Public Domain Wallpapers

Lightweight wallpaper assets and metadata sourced from public domain and CC0 collections. The npm package ships ready-to-use, compressed WebP files together with structured JSON metadata so you can bundle or pre-render wallpapers without doing the crawling and optimisation work yourself.

## Installation

```bash
npm install public-domain-wallpapers
```

## Package Contents

- `images-eink/`: Grayscale/e-ink friendly WebP wallpapers created with `npm run optimize:eink` (these are the only image assets shipped to npm).
- `metadata/`: Per wallpaper JSON records (`id`, `title`, `author`, `description`, `year`, `originalImageUrl`, `sourcePage`, `license`, etc.).
- `index.js`: Placeholder module for future aggregated exports (today you consume the metadata files directly).

Only the optimised asset folders listed above are included when you install the package. Colour masters that live under `images/` in the git repository are treated as working files and are excluded from the published tarball via the `files` allowlist in `package.json`.

## Usage

### 1. Node.js / Web

#### Load metadata

Each wallpaper's metadata ships as a standalone JSON file. With Node.js 18+ (ES modules) you can import what you need using JSON import assertions:

```js
import hokusai from "public-domain-wallpapers/metadata/met/met-featured-collection/met-436839.json" assert { type: "json" };

console.log(hokusai.title); // "The Penitent Magdalen"
console.log(hokusai.license); // "Public Domain (The Met Open Access)"
```

If you prefer CommonJS, use `createRequire` to load the same JSON files.

When you need to enumerate many records at once, the package also ships programmatic helpers that pair each metadata entry with its optimised e-ink image path:

```js
import { loadMetWallpapers, loadNasaWallpapers, getRandomWallpaper } from "public-domain-wallpapers";

const metWallpapers = await loadMetWallpapers(); // only items that live in metadata/met
const nasaWallpapers = await loadNasaWallpapers({ includeAbsolutePaths: true });

// Get a random wallpaper
const randomMet = await getRandomWallpaper(); // defaults to "met"
const randomNasa = await getRandomWallpaper({ category: "nasa" });
```

Both helpers return an array of `{ id, title, author, description, year, license, source, image, imagePath, metadataPath, ... }`. When `includeAbsolutePaths` is `true`, additional `metadataFile` and `imageFile` fields are provided so you can copy or post-process assets directly from the package directory. The `imagePath` always points to the optimised WebP file found under `images-eink/`.

### 2. React Native

React Native는 Metro bundler의 동적 require 제한으로 인해, 모든 이미지를 정적으로 import합니다. 패키지는 이미 최적화되어 있어 즉시 사용 가능합니다.

```tsx
import { loadMetWallpapers, loadNasaWallpapers, getRandomWallpaper } from "public-domain-wallpapers";
import { Image, StyleSheet, View } from "react-native";

// Load all Met wallpapers
const metWallpapers = loadMetWallpapers();
console.log(metWallpapers[0].title); // "The Harvesters"

// Use in Image component
<Image source={metWallpapers[0].image} style={styles.wallpaper} />

// Get a random wallpaper
const randomWallpaper = getRandomWallpaper({ category: "nasa" });
<Image source={randomWallpaper.image} style={styles.wallpaper} />
```

모든 이미지는 `index.js`에서 정적으로 require되어 Metro bundler와 완벽하게 호환됩니다.

**패키지 관리자를 위한 참고사항**: 새로운 에셋을 추가한 후에는 `npm run generate:index`를 실행하여 최신 메타데이터로 `index.js`를 재생성해주세요.

### 3. Serve the optimised images (Node.js/Web only)

Published image assets live under `images-eink/` and are already WebP compressed. A simple Node script can copy them into your own static directory:

```js
import { copyFile } from "node:fs/promises";
import { createRequire } from "node:module";
import path from "node:path";

const require = createRequire(import.meta.url);
const pkgRoot = path.dirname(require.resolve("public-domain-wallpapers/package.json"));

const imageFile = path.join(pkgRoot, "images-eink", "met", "met-featured-collection", "met-436839.webp");
await copyFile(imageFile, path.join("public", "wallpapers", "met-436839.webp"));
```

For bundlers (Vite, webpack, etc.) you can import the asset and let the bundler emit it:

```js
import hokusaiImageUrl from "public-domain-wallpapers/images-eink/met/met-featured-collection/met-436839.webp?url";

document.querySelector("img").src = hokusaiImageUrl;
```

### 4. Generate e-ink variants (optional)

Use the included Sharp-based tooling when you need e-ink/e-paper friendly assets:

```bash
npm run optimize:eink -- --input images --output images-eink --grayscale --maxWidth 1448 --maxHeight 1072
```

This script only re-exports the already-downloaded images, so the npm package still ships with compressed WebP files.

## Included Content

- Only CC0 or unambiguously public domain works make it into the package.
- Metadata tracks the source, licence statement, and collection category for every image.
- Curated sets (e.g. “featured collections”) are stored under dedicated folders for straightforward subset selection.

## Contributing & Tooling

- `npm run fetch:assets`: Fetches new assets according to `config/*.json`, optimises them, and writes metadata.
- `npm run optimize:eink`: Creates e-ink/grayscale derivatives with consistent sizing and compression.
- `npm run generate:index`: Generates `index.js` for React Native compatibility.
- See `docs/QUALITY-GUIDE.md` for asset preparation guidelines.

## Quality Guidelines

- Resolution targets: 4K, QHD, and mobile variants whenever possible.
- File size budgets: 4K ≤ 3 MB, mobile ≤ 500 KB.
- Supported formats: JPG or WEBP (published package currently ships WEBP).
- Filename format: `{source}-{id}-{slug}-{size}.webp`.

## License

- Images: Public Domain or CC0 (verify licence details in each metadata file).
- Code, scripts, and documentation: [MIT](LICENSE).

## Example Sources

- The Metropolitan Museum of Art (Open Access)
- Cleveland Museum of Art (Open Access)
- Smithsonian Open Access
- NASA Image and Video Library

Commercial use is permitted, but always verify the license and source listed in each metadata entry.
