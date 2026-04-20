import { mkdir, writeFile, access, readFile, readdir } from "fs/promises";
import { randomUUID } from "crypto";
import path from "path";
import { fileURLToPath } from "url";
import fetch from "node-fetch";
import sharp from "sharp";
import { getLocalizedMetadataFields } from "./lib/metadata-language.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const PROJECT_ROOT = path.resolve(__dirname, "..");
const IMAGE_ROOT = path.join(PROJECT_ROOT, "images");
const METADATA_ROOT = path.join(PROJECT_ROOT, "metadata");
const CONFIG_ROOT = path.join(PROJECT_ROOT, "config");
const IGNORE_FILE = path.join(CONFIG_ROOT, "ignored-assets.json");

const DEFAULT_LIMIT = 5;
const DEFAULT_MAX_SAME_TITLE = 2;
const NASA_PAGE_SIZE = 100;
let IGNORE_SETS = {};

const SOURCE_CONFIG = {
  met: {
    label: "The Met Museum Open Access",
    license: "Public Domain (The Met Open Access)",
    configFile: path.join(CONFIG_ROOT, "met.json"),
    async fetchBatch({ limit, query, offset, category }) {
      const sourceKey = "met";
      const categoryIds = Array.isArray(category.objectIds)
        ? category.objectIds
            .map((value) => String(value).trim())
            .filter(Boolean)
        : [];

      if (categoryIds.length > 0) {
        if (offset >= categoryIds.length) {
          return { items: [], nextOffset: categoryIds.length };
        }

        const results = [];
        let nextOffset = offset;

        for (
          let index = offset;
          index < categoryIds.length && results.length < limit;
          index += 1
        ) {
          const objectId = categoryIds[index];
          if (shouldIgnore(sourceKey, objectId)) {
            console.log(
              `[${sourceKey}] Ignoring object ${objectId} via ignore list`
            );
            nextOffset = index + 1;
            continue;
          }
          const storageKey = makeStorageKey(sourceKey, objectId);
          const imagePath = path.join(
            IMAGE_ROOT,
            sourceKey,
            category.id,
            `${storageKey}.webp`
          );
          const metadataPath = path.join(
            METADATA_ROOT,
            sourceKey,
            category.id,
            `${storageKey}.json`
          );

          if (
            (await fileExists(imagePath)) &&
            (await fileExists(metadataPath))
          ) {
            console.log(`[${sourceKey}] Skipping cached object ${objectId}`);
            nextOffset = index + 1;
            continue;
          }

          const objectUrl = `https://collectionapi.metmuseum.org/public/collection/v1/objects/${objectId}`;
          const objectResponse = await fetch(objectUrl);

          nextOffset = index + 1;

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
            storageKey,
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
      }

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
        const storageKey = makeStorageKey(sourceKey, objectId);
        if (shouldIgnore(sourceKey, objectId)) {
          console.log(
            `[${sourceKey}] Ignoring object ${objectId} via ignore list`
          );
          continue;
        }
        const imagePath = path.join(
          IMAGE_ROOT,
          sourceKey,
          category.id,
          `${storageKey}.webp`
        );
        const metadataPath = path.join(
          METADATA_ROOT,
          sourceKey,
          category.id,
          `${storageKey}.json`
        );

        if ((await fileExists(imagePath)) && (await fileExists(metadataPath))) {
          console.log(`[${sourceKey}] Skipping cached object ${objectId}`);
          continue;
        }

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
          storageKey,
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
    async fetchBatch({ limit, query, offset, category }) {
      const sourceKey = "nasa";
      const categoryIds = Array.isArray(category.nasaIds)
        ? category.nasaIds.map((value) => String(value).trim()).filter(Boolean)
        : [];

      if (categoryIds.length > 0) {
        if (offset >= categoryIds.length) {
          return { items: [], nextOffset: categoryIds.length };
        }

        const results = [];
        let nextOffset = offset;

        for (
          let index = offset;
          index < categoryIds.length && results.length < limit;
          index += 1
        ) {
          const nasaId = categoryIds[index];
          if (shouldIgnore(sourceKey, nasaId)) {
            console.log(
              `[${sourceKey}] Ignoring asset ${nasaId} via ignore list`
            );
            nextOffset = index + 1;
            continue;
          }
          const storageKey = makeStorageKey(sourceKey, nasaId);
          const imagePath = path.join(
            IMAGE_ROOT,
            sourceKey,
            category.id,
            `${storageKey}.webp`
          );
          const metadataPath = path.join(
            METADATA_ROOT,
            sourceKey,
            category.id,
            `${storageKey}.json`
          );

          if (
            (await fileExists(imagePath)) &&
            (await fileExists(metadataPath))
          ) {
            console.log(`[${sourceKey}] Skipping cached asset ${nasaId}`);
            nextOffset = index + 1;
            continue;
          }

          const item = await fetchNasaItemById(nasaId);

          nextOffset = index + 1;

          if (!item) continue;

          const { metadata, assetUrl } = item;

          results.push({
            id: metadata.nasa_id ?? randomUUID(),
            storageKey,
            title: metadata.title ?? "Untitled NASA image",
            author:
              metadata.photographer || metadata.secondary_creator || "NASA",
            description: metadata.description ?? "",
            year: metadata.date_created?.slice(0, 4) ?? "",
            imageUrl: assetUrl,
            sourceUrl: metadata.nasa_id
              ? `https://images.nasa.gov/details-${metadata.nasa_id}`
              : "",
            license: "Public Domain (NASA)",
          });
        }

        return { items: results, nextOffset };
      }

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

          const assetId = metadata.nasa_id ?? randomUUID();
          const storageKey = makeStorageKey(sourceKey, assetId);
          if (shouldIgnore(sourceKey, assetId)) {
            console.log(
              `[${sourceKey}] Ignoring asset ${assetId} via ignore list`
            );
            continue;
          }

          results.push({
            id: assetId,
            storageKey,
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
  nmk: {
    label: "National Museum of Korea Collection",
    license: "KOGL Type 1 (Attribution)",
    configFile: path.join(CONFIG_ROOT, "nmk.json"),
    async fetchBatch({ limit, offset, category }) {
      const sourceKey = "nmk";
      const relicIds = Array.isArray(category.relicIds)
        ? category.relicIds.map((value) => String(value).trim()).filter(Boolean)
        : [];

      if (relicIds.length === 0) {
        return { items: [], nextOffset: offset };
      }

      if (offset >= relicIds.length) {
        return { items: [], nextOffset: relicIds.length };
      }

      const results = [];
      let nextOffset = offset;

      for (
        let index = offset;
        index < relicIds.length && results.length < limit;
        index += 1
      ) {
        const relicId = relicIds[index];

        if (shouldIgnore(sourceKey, relicId)) {
          console.log(`[${sourceKey}] Ignoring relic ${relicId} via ignore list`);
          nextOffset = index + 1;
          continue;
        }

        const storageKey = makeStorageKey(sourceKey, relicId);
        const imagePath = path.join(
          IMAGE_ROOT,
          sourceKey,
          category.id,
          `${storageKey}.webp`
        );
        const metadataPath = path.join(
          METADATA_ROOT,
          sourceKey,
          category.id,
          `${storageKey}.json`
        );

        if ((await fileExists(imagePath)) && (await fileExists(metadataPath))) {
          console.log(`[${sourceKey}] Skipping cached relic ${relicId}`);
          nextOffset = index + 1;
          continue;
        }

        const item = await fetchNmkItemById(relicId);
        nextOffset = index + 1;

        if (!item) continue;
        results.push({
          id: relicId,
          storageKey,
          ...item,
        });
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

async function fetchNasaItemById(nasaId) {
  const params = new URLSearchParams({
    nasa_id: nasaId,
    media_type: "image",
  });
  const searchUrl = `https://images-api.nasa.gov/search?${params.toString()}`;
  const response = await fetch(searchUrl);

  if (!response.ok) {
    console.warn(`Failed to fetch NASA item ${nasaId}: ${response.status}`);
    return null;
  }

  const data = await response.json();
  const item = data.collection?.items?.[0];
  if (!item) return null;

  const metadata = item.data?.[0];
  if (!metadata) return null;

  const assetUrl = await resolveNasaAssetUrl(item);
  if (!assetUrl) return null;

  return { metadata, assetUrl };
}

function decodeHtml(text) {
  if (!text) return "";

  return text
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/\s+/g, " ")
    .trim();
}

function extractNmkField(html, label) {
  const escaped = label.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const pattern = new RegExp(
    `<li><strong>${escaped}</strong>[\\s\\S]*?<p>([\\s\\S]*?)<\\/p>`,
    "i"
  );
  const match = html.match(pattern);
  if (!match) return "";
  return decodeHtml(match[1].replace(/<[^>]+>/g, " "));
}

function normalizeNmkImageUrl(rawPath) {
  if (!rawPath) return "";

  let normalized = rawPath.trim();
  if (normalized.startsWith("http://") || normalized.startsWith("https://")) {
    return normalized;
  }

  normalized = normalized.replace(/^\/relic_image\/\//, "/relic_image/");
  normalized = normalized.replace("/700/", "/");

  if (!normalized.startsWith("/")) {
    normalized = `/${normalized}`;
  }

  return `https://www.museum.go.kr${normalized}`;
}

async function fetchNmkItemById(relicId) {
  const detailUrl = `https://www.museum.go.kr/MUSEUM/contents/M0502000000.do?schM=view&searchId=search&relicId=${encodeURIComponent(
    relicId
  )}`;
  const response = await fetch(detailUrl);

  if (!response.ok) {
    console.warn(`Failed to fetch NMK relic ${relicId}: ${response.status}`);
    return null;
  }

  const html = await response.text();

  const isKoglType1 =
    /new_img_opencode1\.jpg/i.test(html) || /licenseType1\.do/i.test(html);

  if (!isKoglType1) {
    console.warn(
      `[nmk] relic ${relicId} is not KOGL type 1. Skipping for commercial-safe collection.`
    );
    return null;
  }

  const title =
    decodeHtml((html.match(/class="outveiw-tit">([\s\S]*?)<\/strong>/i) || [])[1]) ||
    `국립중앙박물관 소장품 ${relicId}`;

  const nationEra = extractNmkField(html, "국적/시대");
  const material = extractNmkField(html, "재질");
  const classification = extractNmkField(html, "분류");
  const size = extractNmkField(html, "크기");
  const relicNo = extractNmkField(html, "소장품번호");

  const bodyTextRaw = (
    html.match(
      /<div class="view-info-cont view-info-cont2">[\s\S]*?<p>([\s\S]*?)<\/p>/i
    ) || []
  )[1];
  const bodyText = decodeHtml((bodyTextRaw || "").replace(/<[^>]+>/g, " "));

  const imagePath = (
    html.match(/<img src="(\/relic_image[^"]+\.jpg)"/i) || []
  )[1];
  const imageUrl = normalizeNmkImageUrl(imagePath);

  if (!imageUrl) {
    console.warn(`[nmk] relic ${relicId} has no downloadable image URL.`);
    return null;
  }

  const descriptionParts = [bodyText, material, classification, size]
    .map((value) => value.trim())
    .filter(Boolean);

  const description = descriptionParts.join(" | ");

  return {
    title,
    author: nationEra || "국립중앙박물관",
    description,
    year: "",
    imageUrl,
    sourceUrl: detailUrl,
    license: "KOGL Type 1 (Attribution)",
    extraMetadata: {
      relicNo,
      nationEra,
      material,
      classification,
      size,
    },
  };
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

function shouldIgnore(sourceKey, id) {
  if (!id) return false;
  const key = String(sourceKey);
  const value = String(id).trim();
  if (!value) return false;
  const set = IGNORE_SETS[key];
  return set ? set.has(value) : false;
}

async function loadIgnoreSets() {
  let parsed;
  try {
    parsed = await readJsonFile(IGNORE_FILE);
  } catch (error) {
    if (error.code !== "ENOENT") {
      console.warn(
        `Failed to read ignore list at ${IGNORE_FILE}: ${error.message}`
      );
    }
    IGNORE_SETS = {};
    return;
  }

  if (!parsed || typeof parsed !== "object") {
    IGNORE_SETS = {};
    return;
  }

  const nextSets = {};
  for (const [sourceKey, value] of Object.entries(parsed)) {
    const set = new Set();
    if (Array.isArray(value)) {
      value.forEach((item) => {
        const str = String(item).trim();
        if (str) set.add(str);
      });
    } else if (value && typeof value === "object") {
      const candidates = [
        ...(Array.isArray(value.objectIds) ? value.objectIds : []),
        ...(Array.isArray(value.nasaIds) ? value.nasaIds : []),
        ...(Array.isArray(value.ids) ? value.ids : []),
      ];
      candidates.forEach((item) => {
        const str = String(item).trim();
        if (str) set.add(str);
      });
    }

    if (set.size > 0) {
      nextSets[sourceKey] = set;
    }
  }

  IGNORE_SETS = nextSets;
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
      const query =
        typeof category.query === "string" ? category.query.trim() : "";
      const hasQuery = query.length > 0;
      const hasObjectIds =
        Array.isArray(category.objectIds) &&
        category.objectIds.some((value) => String(value).trim().length > 0);
      const hasNasaIds =
        Array.isArray(category.nasaIds) &&
        category.nasaIds.some((value) => String(value).trim().length > 0);
      const hasRelicIds =
        Array.isArray(category.relicIds) &&
        category.relicIds.some((value) => String(value).trim().length > 0);

      if (!hasQuery && !hasObjectIds && !hasNasaIds && !hasRelicIds) {
        console.warn(
          `Skipping ${sourceKey} category without query or IDs at index ${index}`
        );
        return null;
      }

      const fallbackId = hasQuery
        ? sanitizeFileName(query)
        : sanitizeFileName(`${sourceKey}-category-${index + 1}`);

      const id = category.id?.trim() || fallbackId || `category-${index + 1}`;

      return {
        ...category,
        id,
        query,
      };
    })
    .filter(Boolean);
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

function makeStorageKey(sourceKey, id) {
  const idPart =
    id && String(id).trim().length > 0 ? String(id).trim() : randomUUID();
  return sanitizeFileName(`${sourceKey}-${idPart}`);
}

function normalizeTitleForGrouping(title) {
  return String(title ?? "")
    .trim()
    .toLowerCase()
    .replace(/\s+/g, " ");
}

function applyTitleDiversity(items, maxSameTitle) {
  if (!Number.isFinite(maxSameTitle)) {
    return {
      filteredItems: items,
      skippedCount: 0,
    };
  }

  const limit = Math.max(1, Math.floor(maxSameTitle));
  const titleCounts = new Map();
  const filteredItems = [];
  let skippedCount = 0;

  for (const item of items) {
    const titleKey = normalizeTitleForGrouping(item.title);
    const currentCount = titleCounts.get(titleKey) ?? 0;

    if (titleKey && currentCount >= limit) {
      skippedCount += 1;
      continue;
    }

    filteredItems.push(item);
    if (titleKey) {
      titleCounts.set(titleKey, currentCount + 1);
    }
  }

  return {
    filteredItems,
    skippedCount,
  };
}

function resolveMaxSameTitle(category) {
  const configured = Number(category?.maxSameTitle);
  if (Number.isFinite(configured)) {
    return Math.max(1, Math.floor(configured));
  }
  return DEFAULT_MAX_SAME_TITLE;
}

async function downloadAndConvert({
  sourceKey,
  categoryId,
  categoryLabel,
  item,
  imageDir,
  metadataDir,
}) {
  if (shouldIgnore(sourceKey, item.id)) {
    console.log(
      `[${sourceKey}] Skipping ${item.id} (${
        item.title || "untitled"
      }) due to ignore list entry`
    );
    return false;
  }

  const baseName = item.storageKey ?? makeStorageKey(sourceKey, item.id);
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
    const localizedFields = getLocalizedMetadataFields({
      sourceKey,
      id: item.id,
      title: item.title,
      author: item.author,
    });

    await writeFile(
      metadataPath,
      JSON.stringify(
        {
          id: item.id,
          title: localizedFields.title,
          author: localizedFields.author,
          ...(localizedFields.titleOriginal
            ? { titleOriginal: localizedFields.titleOriginal }
            : {}),
          ...(localizedFields.authorOriginal
            ? { authorOriginal: localizedFields.authorOriginal }
            : {}),
          description: item.description,
          year: item.year,
          originalImageUrl: item.imageUrl,
          sourcePage: item.sourceUrl,
          license: item.license,
          fetchedFrom: SOURCE_CONFIG[sourceKey].label,
          sourceCategory: categoryId,
          categoryLabel,
          fetchedAt: new Date().toISOString(),
          ...(item.extraMetadata ?? {}),
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

  await loadIgnoreSets();
  await Promise.all([ensureDir(IMAGE_ROOT), ensureDir(METADATA_ROOT)]);

  for (const sourceKey of sources) {
    const config = SOURCE_CONFIG[sourceKey];
    const categories = await loadSourceCategories(sourceKey);

    if (categories.length === 0) {
      console.warn(`No categories configured for ${sourceKey}.`);
      continue;
    }

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

      const hasExplicitIds =
        (Array.isArray(category.objectIds) && category.objectIds.length > 0) ||
        (Array.isArray(category.nasaIds) && category.nasaIds.length > 0) ||
        (Array.isArray(category.relicIds) && category.relicIds.length > 0);
      const offset = hasExplicitIds
        ? 0
        : await countMetadataFiles(metadataDir);

      console.log(
        `\n[${sourceKey}] ${categoryLabel}: fetching up to ${categoryLimit} items (offset ${offset})`
      );

      const { items, nextOffset } = await config.fetchBatch({
        limit: categoryLimit,
        query: category.query,
        offset,
        category,
      });

      console.log(
        `[${sourceKey}] ${categoryLabel}: received ${items.length} candidates`
      );

      const maxSameTitle = resolveMaxSameTitle(category);
      const { filteredItems, skippedCount } = applyTitleDiversity(
        items,
        maxSameTitle
      );

      if (skippedCount > 0) {
        console.log(
          `[${sourceKey}] ${categoryLabel}: skipped ${skippedCount} candidates by title diversity (maxSameTitle=${maxSameTitle})`
        );
      }

      let savedCount = 0;
      for (const item of filteredItems) {
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
