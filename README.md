# Public Domain Wallpapers

Lightweight wallpapers and metadata derived from public domain and CC0 artworks, packaged for distribution via npm.

## Installation

```bash
npm install public-domain-wallpapers
```

## Usage

```js
import { wallpapers } from "public-domain-wallpapers";

// wallpapers[0].image points to the image path inside the package.
const firstWallpaper = wallpapers[0];
console.log(firstWallpaper.image); // e.g. images/met-1234-hokusai-wave-4k.jpg
```

## Included Content

- Includes only CC0 assets or works that institutions clearly publish as Open Access.
- Excludes images with unclear licensing, copyright, or personality rights.
- Optionally ships in bundles of 50 wallpapers when you need smaller sets.

## Directory Structure

- `images/`: Optimized JPG/WEBP wallpaper files.
- `metadata/`: JSON metadata per image (`id`, `source`, `title`, `artist`, `date`, `license`, `image_url`).
- `docs/`: Reference material such as quality guidelines and sourcing policy.

## Quality Guidelines

- Resolution targets: 4K, QHD, and mobile variants whenever possible.
- File size budgets: 4K ≤ 3 MB, mobile ≤ 500 KB.
- Supported formats: JPG or WEBP.
- Filename format: `{source}-{id}-{slug}-{size}.jpg`.

## License

- Images: Public Domain or CC0 (always confirm license details in the metadata).
- Code, scripts, and documentation: [MIT](LICENSE).

## Example Sources

- The Metropolitan Museum of Art (Open Access)
- Cleveland Museum of Art (Open Access)
- Smithsonian Open Access

Commercial use is permitted, but always verify the license and source listed in each metadata entry.
