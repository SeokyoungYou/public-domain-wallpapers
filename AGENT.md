# Asset Addition Guide (NASA / MET)

This file describes the standard workflow for adding new wallpapers and collections to this repository.

## Scope
Use this guide when you need to:
- add new images to an existing collection
- create a brand-new collection
- refresh generated outputs after config changes

## Source Config Files
- NASA config: `config/nasa.json`
- MET config: `config/met.json`
- Optional ignore list: `config/ignored-assets.json`

## 1) Update Collection Config

### NASA
Edit `config/nasa.json`.
Each category should look like:
- `id`: stable kebab-case collection ID (ex: `nasa-earth-orbit-collection`)
- `name`: display label
- `nasaIds`: array of NASA asset IDs
- `limit`: number of items to fetch from that category

Rules:
- Keep IDs unique within the category.
- If you append new IDs to an existing collection, increase `limit` to include all intended IDs.

### MET
Edit `config/met.json`.
A category can use either:
- `objectIds`: curated list of MET object IDs (recommended for deterministic results)
- `query`: search query fallback

Include:
- `id`, `name`, and `limit`

## 2) Fetch New Assets
Run only for the source you changed.

```bash
node scripts/fetch-assets.js --sources nasa
node scripts/fetch-assets.js --sources met
```

What this does:
- downloads source images
- converts to WebP under `images/...`
- writes metadata JSON under `metadata/...`

## 3) Generate E-Ink Variants
Regenerate optimized images for the updated source.

```bash
node scripts/optimize-eink-images.js --input images/nasa --output images-eink/nasa
node scripts/optimize-eink-images.js --input images/met --output images-eink/met
```

## 4) Regenerate Native Index
Always rebuild `index.js` after metadata changes.

```bash
node scripts/generate-native-index.js
```

## 5) Verify Completeness
Minimum checks:
- every configured ID has 3 outputs:
  - `images/.../*.webp`
  - `images-eink/.../*.webp`
  - `metadata/.../*.json`
- `index.js` includes the new collection and wallpaper entries
- `git status --short` shows expected changed/new files only

## 6) Ignore Problematic Assets (Optional)
If an asset is unsuitable or broken, add its ID to `config/ignored-assets.json` under the correct source (`nasa` or `met`), then rerun fetch.

## Definition of Done
A collection update is complete when:
- config is updated
- source images exist
- e-ink images exist
- metadata exists
- `index.js` is regenerated and includes the new content
- no unexpected file changes remain
