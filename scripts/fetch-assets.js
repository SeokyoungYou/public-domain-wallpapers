import { mkdir, writeFile, access, readFile, readdir } from "fs/promises";
import { randomUUID } from "crypto";
import path from "path";
import { fileURLToPath } from "url";
import fetch from "node-fetch";
import sharp from "sharp";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const PROJECT_ROOT = path.resolve(__dirname, "..");
const IMAGE_ROOT = path.join(PROJECT_ROOT, "images");
const METADATA_ROOT = path.join(PROJECT_ROOT, "metadata");
const CONFIG_ROOT = path.join(PROJECT_ROOT, "config");

const DEFAULT_LIMIT = 10;
const NASA_PAGE_SIZE = 100;

const SOURCE_CONFIG = {
  met: {
    label: "The Met Museum Open Access",
    license: "Public Domain (The Met Open Access)",
    configFile: path.join(CONFIG_ROOT, "met.json"),
    async fetchBatch({ limit, query, offset }) {
      if (!query) {
        return { items: [], nextOffset: offset };
      }

      const params = new URLSearchParams({
        q: query,
        hasImages: "true",
      });
      const searchUrl = `https://collectionapi.metmuseum.org/public/collection/v1/search?${params.toString()}`;
      const searchResponse = await fetch(searchUrl);

      if (!searchResponse.ok) {
        throw new Error(
          `Met search failed with status ${searchResponse.status}`
        );
      }

      const searchData = await searchResponse.json();
      const sourceIds = searchData.objectIDs ?? [];

      if (offset >= sourceIds.length) {
        return { items: [], nextOffset: sourceIds.length };
      }

      const idsToInspect = sourceIds.slice(offset);
      const results = [];
      let nextOffset = offset;

      for (const objectId of idsToInspect) {
        if (results.length >= limit) break;

        nextOffset += 1;
        const objectUrl = `https://collectionapi.metmuseum.org/public/collection/v1/objects/${objectId}`;
        const objectResponse = await fetch(objectUrl);

        if (!objectResponse.ok) {
          console.warn(
            `Failed to fetch Met object ${objectId}: ${objectResponse.status}`
          );
          continue;
        }

        const data = await objectResponse.json();
        const imageUrl = data.primaryImage || data.primaryImageSmall;

        if (!imageUrl) {
          continue;
        }

        results.push({
          id: String(objectId),
          title: data.title ?? "Unknown title",
          author: data.artistDisplayName || "Unknown artist",
          description: data.creditLine ?? data.department ?? "",
          year: data.objectDate ?? "",
          imageUrl,
          sourceUrl: data.objectURL,
          license: "Public Domain (The Met Open Access)",
        });
      }

      return { items: results, nextOffset };
    },
  },
  nasa: {
    label: "NASA Image and Video Library",
    license: "Public Domain (NASA)",
    configFile: path.join(CONFIG_ROOT, "nasa.json"),
    async fetchBatch({ limit, query, offset }) {
      if (!query) {
        return { items: [], nextOffset: offset };
      }

      const results = [];
      let nextOffset = offset;
      let page = Math.max(1, Math.floor(offset / NASA_PAGE_SIZE) + 1);
      let pageOffset = offset % NASA_PAGE_SIZE;
      let exhausted = false;

      while (results.length < limit && !exhausted) {
        const params = new URLSearchParams({
          q: query,
          media_type: "image",
          page: String(page),
        });
        const searchUrl = `https://images-api.nasa.gov/search?${params.toString()}`;
        const searchResponse = await fetch(searchUrl);

        if (!searchResponse.ok) {
          throw new Error(
            `NASA search failed with status ${searchResponse.status}`
          );
        }

        const searchData = await searchResponse.json();
        const items = searchData.collection?.items ?? [];

        if (items.length === 0) {
          exhausted = true;
          break;
        }

        for (
          let idx = pageOffset;
          idx < items.length && results.length < limit;
          idx += 1
        ) {
          const item = items[idx];
          nextOffset += 1;

          const metadata = item.data?.[0];
          if (!metadata) continue;

          const assetUrl = await resolveNasaAssetUrl(item);
          if (!assetUrl) continue;

          results.push({
            id: metadata.nasa_id ?? randomUUID(),
            title: metadata.title ?? "Untitled NASA image",
            author:
              metadata.photographer || metadata.secondary_creator || "NASA",
            description: metadata.description ?? "",
            year: metadata.date_created?.slice(0, 4) ?? "",
            imageUrl: assetUrl,
            sourceUrl: metadata.nasa_id
              ? `https://images.nasa.gov/details-${metadata.nasa_id}`
              : item.href ?? "",
            license: "Public Domain (NASA)",
          });
        }

        if (results.length >= limit) break;

        if (items.length < NASA_PAGE_SIZE) {
          exhausted = true;
          break;
        }

        page += 1;
        pageOffset = 0;
      }

      return { items: results, nextOffset };
    },
  },
};

async function resolveNasaAssetUrl(item) {
  if (item.href) {
    try {
      const assetResponse = await fetch(item.href);
      if (assetResponse.ok) {
        const assetUrls = await assetResponse.json();
        if (Array.isArray(assetUrls)) {
          return (
            assetUrls.find((url) => url.endsWith("~orig.jpg")) ??
            assetUrls.find(
              (url) => url.endsWith(".jpg") || url.endsWith(".png")
            ) ??
            assetUrls[0]
          );
        }
      }
    } catch (error) {
      console.warn(`Failed to resolve NASA asset list: ${error.message}`);
    }
  }

  const fallback =
    item.links?.find((link) => link.render === "image") ?? item.links?.[0];
  return fallback?.href;
}

function parseArgs() {
  const args = process.argv.slice(2);

  const getValue = (flag, fallback) => {
    const index = args.indexOf(flag);
    if (index === -1) return fallback;
    return args[index + 1] ?? fallback;
  };

  const sourcesValue = getValue("--sources", "met,nasa");
  const sources = sourcesValue
    .split(",")
    .map((item) => item.trim())
    .filter((item) => Boolean(item) && SOURCE_CONFIG[item]);

  if (sources.length === 0) {
    throw new Error(
      `No valid sources selected. Supported: ${Object.keys(SOURCE_CONFIG).join(
        ", "
      )}`
    );
  }

  const limit = Number.parseInt(getValue("--limit", DEFAULT_LIMIT), 10);

  return {
    sources,
    limit: Number.isNaN(limit) ? DEFAULT_LIMIT : Math.max(1, limit),
  };
}

async function ensureDir(dirPath) {
  await mkdir(dirPath, { recursive: true });
}

async function fileExists(filePath) {
  try {
    await access(filePath);
    return true;
  } catch {
    return false;
  }
}

async function readJsonFile(filePath) {
  const contents = await readFile(filePath, "utf8");
  return JSON.parse(contents);
}

async function loadSourceCategories(sourceKey) {
  const config = SOURCE_CONFIG[sourceKey];
  const configPath = config.configFile;

  let parsed;
  try {
    parsed = await readJsonFile(configPath);
  } catch (error) {
    if (error.code === "ENOENT") {
      console.warn(
        `No config file found for ${sourceKey} at ${configPath}. Skipping.`
      );
      return [];
    }
    throw new Error(`Failed to read config for ${sourceKey}: ${error.message}`);
  }

  const categories = Array.isArray(parsed.categories) ? parsed.categories : [];

  return categories
    .map((category, index) => {
      const query = category.query?.trim();

      if (!query) {
        console.warn(
          `Skipping ${sourceKey} category without query at index ${index}`
        );
        return null;
      }

      const id =
        category.id?.trim() ||
        sanitizeFileName(query) ||
        `category-${index + 1}`;

      return {
        ...category,
        id,
        query,
      };
    })
    .filter(Boolean);
}

async function loadSourceState(sourceKey) {
  const statePath = path.join(METADATA_ROOT, sourceKey, "_state.json");

  if (!(await fileExists(statePath))) {
    return { categories: {} };
  }

  try {
    return await readJsonFile(statePath);
  } catch (error) {
    console.warn(`Failed to parse state for ${sourceKey}: ${error.message}`);
    return { categories: {} };
  }
}

async function saveSourceState(sourceKey, state) {
  const sourceMetadataDir = path.join(METADATA_ROOT, sourceKey);
  await ensureDir(sourceMetadataDir);
  const statePath = path.join(sourceMetadataDir, "_state.json");
  await writeFile(statePath, JSON.stringify(state, null, 2));
}

async function countMetadataFiles(metadataDir) {
  try {
    const entries = await readdir(metadataDir, { withFileTypes: true });
    return entries.filter(
      (entry) => entry.isFile() && entry.name.endsWith(".json")
    ).length;
  } catch (error) {
    if (error.code === "ENOENT") {
      return 0;
    }
    throw error;
  }
}

async function readCategoryAssets(sourceKey, categoryId) {
  const metadataDir = path.join(METADATA_ROOT, sourceKey, categoryId);

  let entries;
  try {
    entries = await readdir(metadataDir, { withFileTypes: true });
  } catch (error) {
    if (error.code === "ENOENT") {
      return [];
    }
    throw error;
  }

  const assets = [];

  for (const entry of entries) {
    if (!entry.isFile() || !entry.name.endsWith(".json")) continue;

    const metadataPath = path.join(metadataDir, entry.name);
    const metadata = await readJsonFile(metadataPath);
    const imagePath = path.join(
      IMAGE_ROOT,
      sourceKey,
      categoryId,
      `${path.basename(entry.name, ".json")}.webp`
    );

    assets.push({
      source: sourceKey,
      categoryId,
      metadataPath,
      imagePath,
      metadata,
    });
  }

  return assets;
}

export async function listAssetsByCategory(sourceKey, categoryId) {
  return readCategoryAssets(sourceKey, categoryId);
}

export async function listAllAssetsGrouped() {
  const grouped = {};

  for (const sourceKey of Object.keys(SOURCE_CONFIG)) {
    const sourceDir = path.join(METADATA_ROOT, sourceKey);
    let entries;

    try {
      entries = await readdir(sourceDir, { withFileTypes: true });
    } catch (error) {
      if (error.code === "ENOENT") {
        grouped[sourceKey] = {};
        continue;
      }
      throw error;
    }

    grouped[sourceKey] = {};

    for (const entry of entries) {
      if (!entry.isDirectory()) continue;
      grouped[sourceKey][entry.name] = await readCategoryAssets(
        sourceKey,
        entry.name
      );
    }
  }

  return grouped;
}

function sanitizeFileName(input) {
  return input
    .toLowerCase()
    .replace(/[^a-z0-9-_]+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "")
    .slice(0, 80);
}

async function downloadAndConvert({
  sourceKey,
  categoryId,
  categoryLabel,
  item,
  imageDir,
  metadataDir,
}) {
  const baseName = sanitizeFileName(
    `${categoryId}-${item.title || sourceKey}-${item.id}`
  );
  const imagePath = path.join(imageDir, `${baseName}.webp`);
  const metadataPath = path.join(metadataDir, `${baseName}.json`);

  const imageExists = await fileExists(imagePath);
  const metadataExists = await fileExists(metadataPath);

  if (imageExists && metadataExists) {
    console.log(`Skipping existing image: ${imagePath}`);
    return false;
  }

  if (!imageExists) {
    console.log(
      `Downloading ${item.title} from ${sourceKey} (${categoryId})...`
    );
    const response = await fetch(item.imageUrl);

    if (!response.ok) {
      throw new Error(
        `Failed to download image ${item.imageUrl}: ${response.status}`
      );
    }

    const arrayBuffer = await response.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    const webpBuffer = await sharp(buffer).webp({ quality: 92 }).toBuffer();

    await writeFile(imagePath, webpBuffer);
    console.log(`Saved ${imagePath}`);
  } else {
    console.log(`Image already exists, refreshing metadata: ${imagePath}`);
  }

  if (!metadataExists || !imageExists) {
    await writeFile(
      metadataPath,
      JSON.stringify(
        {
          id: item.id,
          title: item.title,
          author: item.author,
          description: item.description,
          year: item.year,
          originalImageUrl: item.imageUrl,
          sourcePage: item.sourceUrl,
          license: item.license,
          fetchedFrom: SOURCE_CONFIG[sourceKey].label,
          sourceCategory: categoryId,
          categoryLabel,
          fetchedAt: new Date().toISOString(),
        },
        null,
        2
      )
    );
  }

  return !imageExists;
}

async function run() {
  const { sources, limit } = parseArgs();

  await Promise.all([ensureDir(IMAGE_ROOT), ensureDir(METADATA_ROOT)]);

  for (const sourceKey of sources) {
    const config = SOURCE_CONFIG[sourceKey];
    const categories = await loadSourceCategories(sourceKey);

    if (categories.length === 0) {
      console.warn(`No categories configured for ${sourceKey}.`);
      continue;
    }

    const sourceState = await loadSourceState(sourceKey);
    sourceState.categories = sourceState.categories ?? {};

    console.log(
      `\nProcessing ${config.label} (${categories.length} categories)...`
    );

    for (const category of categories) {
      const categoryId = category.id;
      const categoryLabel = category.name ?? categoryId;
      const categoryLimit = Math.max(1, category.limit ?? limit);

      const imageDir = path.join(IMAGE_ROOT, sourceKey, categoryId);
      const metadataDir = path.join(METADATA_ROOT, sourceKey, categoryId);
      await Promise.all([ensureDir(imageDir), ensureDir(metadataDir)]);

      const storedCount = await countMetadataFiles(metadataDir);
      const stateOffset = sourceState.categories[categoryId]?.offset ?? 0;
      const offset = Math.max(storedCount, stateOffset);

      console.log(
        `\n[${sourceKey}] ${categoryLabel}: fetching up to ${categoryLimit} items (offset ${offset})`
      );

      const { items, nextOffset } = await config.fetchBatch({
        limit: categoryLimit,
        query: category.query,
        offset,
      });

      console.log(
        `[${sourceKey}] ${categoryLabel}: received ${items.length} candidates`
      );

      let savedCount = 0;
      for (const item of items) {
        try {
          const saved = await downloadAndConvert({
            sourceKey,
            categoryId,
            categoryLabel,
            item,
            imageDir,
            metadataDir,
          });
          if (saved) savedCount += 1;
        } catch (error) {
          console.error(
            `Failed to process ${sourceKey} item ${item.id}: ${error.message}`
          );
        }
      }

      const totalSaved = await countMetadataFiles(metadataDir);
      sourceState.categories[categoryId] = {
        offset: nextOffset,
        totalSaved,
        lastRunAt: new Date().toISOString(),
        lastLimit: categoryLimit,
        query: category.query,
      };

      await saveSourceState(sourceKey, sourceState);

      console.log(
        `[${sourceKey}] ${categoryLabel}: saved ${savedCount} new images (total ${totalSaved}), next offset ${nextOffset}`
      );
    }
  }
}

if (process.argv[1] === __filename) {
  run().catch((error) => {
    console.error(error);
    process.exitCode = 1;
  });
}
