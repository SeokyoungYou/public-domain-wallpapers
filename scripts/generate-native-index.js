import { readFile, readdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const METADATA_DIR = path.join(__dirname, "..", "metadata");
const INDEX_OUTPUT_PATH = path.join(__dirname, "..", "index.js");
const TYPES_OUTPUT_PATH = path.join(__dirname, "..", "index.d.ts");

const SOURCE_NAME_OVERRIDES = {
  met: "The Met Museum",
  nasa: "NASA",
  nmk: "National Museum of Korea",
};

const toTitleCase = (value) => {
  return value
    .trim()
    .replace(/[-_]+/g, " ")
    .split(/\s+/)
    .filter(Boolean)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1).toLowerCase())
    .join(" ");
};

const toConstantName = (...segments) => {
  return segments
    .filter(Boolean)
    .join("_")
    .replace(/[^a-zA-Z0-9]+/g, "_")
    .replace(/_+/g, "_")
    .replace(/^_+|_+$/g, "")
    .toUpperCase();
};

const quote = (value) => JSON.stringify(value);

const toSourceDisplayName = (sourceId) => {
  return SOURCE_NAME_OVERRIDES[sourceId] ?? toTitleCase(sourceId);
};

const sortObjectEntries = (obj) => {
  return Object.entries(obj).sort(([a], [b]) => a.localeCompare(b));
};

async function listMetadataFiles(currentDir, relativePrefix = "") {
  const entries = await readdir(currentDir, { withFileTypes: true });
  const files = [];

  for (const entry of entries) {
    if (entry.name.startsWith("_") || entry.name.startsWith(".")) {
      continue;
    }

    if (entry.isDirectory()) {
      const childPrefix = relativePrefix
        ? `${relativePrefix}/${entry.name}`
        : entry.name;
      const childFiles = await listMetadataFiles(
        path.join(currentDir, entry.name),
        childPrefix
      );
      files.push(...childFiles);
      continue;
    }

    if (entry.isFile() && entry.name.endsWith(".json")) {
      const relativePath = relativePrefix
        ? `${relativePrefix}/${entry.name}`
        : entry.name;
      files.push(relativePath);
    }
  }

  return files;
}

const stringifyWithRequire = (value) => {
  return JSON.stringify(value, null, 2).replace(
    /"image": "require\('(.+?)'\)"/g,
    "image: require('$1')"
  );
};

const getImagePathFromMetadataPath = (relativeMetadataPath) => {
  const normalized = relativeMetadataPath.replace(/\\/g, "/");
  return `images-eink/${normalized.replace(/\.json$/i, ".webp")}`;
};

const getCollectionId = (metadata, pathSegments, sourceId) => {
  const sourceCategory =
    typeof metadata.sourceCategory === "string"
      ? metadata.sourceCategory.trim()
      : "";

  if (sourceCategory) return sourceCategory;

  const pathCategory = pathSegments[pathSegments.length - 2];
  if (pathCategory) return pathCategory;

  return `${sourceId}-misc-collection`;
};

const getCollectionName = (metadata, collectionId) => {
  const categoryLabel =
    typeof metadata.categoryLabel === "string" ? metadata.categoryLabel.trim() : "";

  if (categoryLabel) return categoryLabel;

  return toTitleCase(collectionId);
};

async function collectSourcesFromMetadata(metadataFiles) {
  const sourceMap = {};
  const sortedMetadataFiles = [...metadataFiles].sort((a, b) =>
    a.localeCompare(b)
  );

  for (const file of sortedMetadataFiles) {
    const normalizedFile = file.replace(/\\/g, "/");
    const segments = normalizedFile.split("/");
    const [sourceId] = segments;

    if (!sourceId || segments.length < 2) {
      continue;
    }

    const fullPath = path.join(METADATA_DIR, file);
    const content = await readFile(fullPath, "utf8");
    const metadata = JSON.parse(content);

    const stem = segments[segments.length - 1].replace(/\.json$/i, "");
    const collectionId = getCollectionId(metadata, segments, sourceId);
    const collectionName = getCollectionName(metadata, collectionId);
    const imagePath = getImagePathFromMetadataPath(normalizedFile);

    if (!sourceMap[sourceId]) {
      sourceMap[sourceId] = {
        id: sourceId,
        name: toSourceDisplayName(sourceId),
        collections: {},
      };
    }

    if (!sourceMap[sourceId].collections[collectionId]) {
      sourceMap[sourceId].collections[collectionId] = {
        id: collectionId,
        name: collectionName,
        wallpapers: [],
      };
    }

    sourceMap[sourceId].collections[collectionId].wallpapers.push({
      id: String(metadata.id ?? stem),
      title: String(metadata.title ?? ""),
      author: String(metadata.author ?? ""),
      year: String(metadata.year ?? ""),
      source: sourceId,
      collection: collectionId,
      imagePath,
      image: `require('./${imagePath}')`,
    });
  }

  for (const source of Object.values(sourceMap)) {
    for (const collection of Object.values(source.collections)) {
      collection.wallpapers.sort((a, b) => a.id.localeCompare(b.id));
    }
  }

  return sourceMap;
}

function buildSourceArtifacts(sourceEntries) {
  const artifacts = [];

  for (const [sourceId, source] of sourceEntries) {
    const baseCollections = sortObjectEntries(source.collections).filter(
      ([collectionId]) => !collectionId.startsWith("all-")
    );

    const wallpaperConstants = [];
    const collectionRefs = [];

    for (const [collectionId, collection] of baseCollections) {
      const constantName = toConstantName(sourceId, collectionId, "wallpapers");
      wallpaperConstants.push(
        `const ${constantName} = ${stringifyWithRequire(collection.wallpapers)};`
      );
      collectionRefs.push({
        id: collectionId,
        name: collection.name,
        constantName,
        wallpaperCount: collection.wallpapers.length,
      });
    }

    const allCollectionId = `all-${sourceId}`;
    const allCollectionName = `All ${source.name} Collection`;
    const allCollectionConstant = toConstantName(allCollectionId, "wallpapers");

    const mergedConstantLines = collectionRefs
      .map((ref) => `      ...${ref.constantName}`)
      .join(",\n");

    wallpaperConstants.push(`const ${allCollectionConstant} = Array.from(
  new Map(
    [
${mergedConstantLines}
    ].map((item) => [item.id, item])
  ).values()
);`);

    const collectionEntries = [
      {
        id: allCollectionId,
        name: allCollectionName,
        constantName: allCollectionConstant,
      },
      ...collectionRefs,
    ];

    const collectionsObjectCode = `{
${collectionEntries
  .map(
    (entry) => `      ${quote(entry.id)}: {
        id: ${quote(entry.id)},
        name: ${quote(entry.name)},
        wallpapers: ${entry.constantName}
      }`
  )
  .join(",\n")}
    }`;

    const sourceObjectCode = `  ${sourceId}: {
    id: ${quote(sourceId)},
    name: ${quote(source.name)},
    collections: ${collectionsObjectCode}
  }`;

    const wallpaperTotal = collectionRefs.reduce(
      (sum, ref) => sum + ref.wallpaperCount,
      0
    );

    artifacts.push({
      sourceId,
      sourceName: source.name,
      collectionCount: collectionRefs.length,
      wallpaperTotal,
      wallpaperConstants,
      sourceObjectCode,
    });
  }

  return artifacts;
}

function buildIndexCode(artifacts) {
  const sourceIdList = artifacts.map((artifact) => artifact.sourceId);
  const sourceUnionForDocs =
    sourceIdList.length > 0
      ? sourceIdList.map((id) => quote(id)).join(" | ")
      : "string";

  const constantsSection = artifacts
    .map((artifact) => {
      return `// ${artifact.sourceName} Wallpapers\n${artifact.wallpaperConstants.join(
        "\n\n"
      )}`;
    })
    .join("\n\n");

  const sourcesObjectSection = artifacts
    .map((artifact) => artifact.sourceObjectCode)
    .join(",\n");

  return `// Auto-generated file for React Native compatibility
// Run 'npm run generate:index' to regenerate

/**
 * @typedef {Object} Wallpaper
 * @property {string} id - Wallpaper ID
 * @property {string} title - Wallpaper 제목
 * @property {string} author - 작가명
 * @property {string} year - 제작 연도
 * @property {string} source - 소스 ID
 * @property {string} collection - 컬렉션 ID
 * @property {string} imagePath - 이미지 경로
 * @property {any} image - React Native require 객체
 */

/**
 * @typedef {Object} WallpaperCollection
 * @property {string} id - 컬렉션 ID
 * @property {string} name - 컬렉션 이름
 * @property {Wallpaper[]} wallpapers - Wallpaper 배열
 */

/**
 * @typedef {Object} WallpaperSource
 * @property {string} id - 소스 ID
 * @property {string} name - 소스 이름
 * @property {Record<string, WallpaperCollection>} collections - 컬렉션 맵
 */

/**
 * @typedef {${sourceUnionForDocs}} WallpaperSourceId
 */

${constantsSection}

/**
 * 모든 wallpaper 소스 (단일 source of truth)
 * @type {Record<string, WallpaperSource>}
 */
export const WALLPAPER_SOURCES = {
${sourcesObjectSection}
};

/**
 * 모든 소스의 정보를 배열로 반환한다.
 * @returns {WallpaperSource[]}
 */
export function getSources() {
  return Object.values(WALLPAPER_SOURCES);
}

/**
 * 특정 소스 정보를 반환한다.
 * @param {string} sourceId - 소스 ID
 * @returns {WallpaperSource | null}
 */
export function getSource(sourceId) {
  return WALLPAPER_SOURCES[sourceId] ?? null;
}

/**
 * 모든 컬렉션을 flat 구조로 반환한다.
 * @returns {Record<string, WallpaperCollection>}
 */
export function getAllCollections() {
  const result = {};
  for (const source of Object.values(WALLPAPER_SOURCES)) {
    Object.assign(result, source.collections);
  }
  return result;
}

/**
 * 특정 소스의 모든 컬렉션을 반환한다. (all 컬렉션은 항상 맨 처음)
 * @param {string} sourceId - 소스 ID
 * @returns {WallpaperCollection[]}
 */
export function getCollections(sourceId) {
  const source = WALLPAPER_SOURCES[sourceId];
  if (!source) return [];

  const collections = Object.values(source.collections);
  return collections.sort((a, b) => {
    if (a.id.startsWith("all-")) return -1;
    if (b.id.startsWith("all-")) return 1;
    return a.id.localeCompare(b.id);
  });
}

/**
 * 특정 컬렉션을 반환한다.
 * @param {string} collectionId - 컬렉션 ID
 * @returns {WallpaperCollection | null}
 */
export function getCollection(collectionId) {
  for (const source of Object.values(WALLPAPER_SOURCES)) {
    if (source.collections[collectionId]) {
      return source.collections[collectionId];
    }
  }
  return null;
}

/**
 * 특정 컬렉션의 모든 wallpaper를 반환한다.
 * @param {string} collectionId - 컬렉션 ID
 * @returns {Wallpaper[]}
 */
export function getWallpapers(collectionId) {
  const collection = getCollection(collectionId);
  return collection?.wallpapers ?? [];
}

/**
 * 특정 소스의 모든 wallpaper를 반환한다.
 * @param {string} sourceId - 소스 ID
 * @returns {Wallpaper[]}
 */
export function getWallpapersBySource(sourceId) {
  return getCollections(sourceId).flatMap((collection) => collection.wallpapers);
}

/**
 * 모든 wallpaper를 단일 배열로 반환한다.
 * @returns {Wallpaper[]}
 */
export function getAllWallpapers() {
  return Object.values(WALLPAPER_SOURCES).flatMap((source) =>
    Object.values(source.collections).flatMap((collection) => collection.wallpapers)
  );
}

/**
 * 특정 wallpaper를 ID로 찾는다.
 * @param {string} wallpaperId - Wallpaper ID
 * @returns {Wallpaper | null}
 */
export function getWallpaperById(wallpaperId) {
  for (const source of Object.values(WALLPAPER_SOURCES)) {
    for (const collection of Object.values(source.collections)) {
      const wallpaper = collection.wallpapers.find((item) => item.id === wallpaperId);
      if (wallpaper) return wallpaper;
    }
  }
  return null;
}

/**
 * 랜덤 wallpaper를 반환한다.
 * @param {Object} [options]
 * @param {string} [options.collectionId] - 특정 컬렉션에서만 선택
 * @param {string} [options.sourceId] - 특정 소스에서만 선택
 * @returns {Wallpaper | null}
 */
export function getRandomWallpaper({ collectionId, sourceId } = {}) {
  let wallpapers = [];

  if (collectionId) {
    wallpapers = getWallpapers(collectionId);
  } else if (sourceId) {
    wallpapers = getWallpapersBySource(sourceId);
  } else {
    wallpapers = getAllWallpapers();
  }

  if (wallpapers.length === 0) return null;

  const randomIndex = Math.floor(Math.random() * wallpapers.length);
  return wallpapers[randomIndex];
}
`;
}

function buildTypesCode(sourceIds) {
  const sourceIdType =
    sourceIds.length > 0 ? sourceIds.map((id) => quote(id)).join(" | ") : "string";

  return `import type { ImageSourcePropType } from "react-native";

export type WallpaperSourceId = ${sourceIdType};

export interface WallpaperMetadata {
  id: string;
  title: string;
  author: string;
  titleOriginal?: string;
  authorOriginal?: string;
  description: string;
  year: string;
  originalImageUrl: string;
  sourcePage: string;
  license: string;
  fetchedFrom: string;
  sourceCategory: string;
  categoryLabel: string;
  fetchedAt: string;
  [key: string]: unknown;
}

export interface Wallpaper {
  id: string;
  title: string;
  author: string;
  year: string;
  source: WallpaperSourceId;
  collection: string;
  imagePath: string;
  image: ImageSourcePropType;
}

export interface WallpaperCollection {
  id: string;
  name: string;
  wallpapers: Wallpaper[];
}

export interface WallpaperSource {
  id: WallpaperSourceId;
  name: string;
  collections: Record<string, WallpaperCollection>;
}

export interface GetRandomWallpaperOptions {
  collectionId?: string;
  sourceId?: string;
}

/**
 * 모든 wallpaper 소스 (단일 source of truth)
 */
export const WALLPAPER_SOURCES: Record<WallpaperSourceId, WallpaperSource>;

/**
 * 모든 소스의 정보를 배열로 반환한다.
 */
export function getSources(): WallpaperSource[];

/**
 * 특정 소스 정보를 반환한다.
 */
export function getSource(sourceId: string): WallpaperSource | null;

/**
 * 모든 컬렉션을 flat 구조로 반환한다.
 */
export function getAllCollections(): Record<string, WallpaperCollection>;

/**
 * 특정 소스의 모든 컬렉션을 배열로 반환한다.
 */
export function getCollections(sourceId: string): WallpaperCollection[];

/**
 * 특정 컬렉션을 반환한다.
 */
export function getCollection(collectionId: string): WallpaperCollection | null;

/**
 * 특정 컬렉션의 모든 wallpaper를 반환한다.
 */
export function getWallpapers(collectionId: string): Wallpaper[];

/**
 * 특정 소스의 모든 wallpaper를 반환한다.
 */
export function getWallpapersBySource(sourceId: string): Wallpaper[];

/**
 * 모든 wallpaper를 단일 배열로 반환한다.
 */
export function getAllWallpapers(): Wallpaper[];

/**
 * 특정 wallpaper를 ID로 찾는다.
 */
export function getWallpaperById(wallpaperId: string): Wallpaper | null;

/**
 * 랜덤 wallpaper를 반환한다.
 */
export function getRandomWallpaper(
  options?: GetRandomWallpaperOptions
): Wallpaper | null;
`;
}

async function generateNativeIndex() {
  const metadataFiles = await listMetadataFiles(METADATA_DIR);
  const sourceMap = await collectSourcesFromMetadata(metadataFiles);
  const sourceEntries = sortObjectEntries(sourceMap);

  if (sourceEntries.length === 0) {
    throw new Error("No metadata files found. Cannot generate index.");
  }

  const artifacts = buildSourceArtifacts(sourceEntries);
  const indexCode = buildIndexCode(artifacts);
  const typesCode = buildTypesCode(sourceEntries.map(([sourceId]) => sourceId));

  await writeFile(INDEX_OUTPUT_PATH, indexCode, "utf8");
  await writeFile(TYPES_OUTPUT_PATH, typesCode, "utf8");

  console.log("✅ Generated index.js and index.d.ts successfully!");
  for (const artifact of artifacts) {
    console.log(
      `   - ${artifact.sourceName}: ${artifact.collectionCount} collections + 1 all collection (total ${artifact.wallpaperTotal} wallpapers)`
    );
  }
  console.log("   💡 Each wallpaper is stored once and referenced by collections");
}

generateNativeIndex().catch((error) => {
  console.error("❌ Error generating native index:", error);
  process.exit(1);
});
