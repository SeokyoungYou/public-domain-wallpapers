import { readFile, readdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const METADATA_DIR = path.join(__dirname, "..", "metadata");

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

async function generateNativeIndex() {
  const metadataFiles = await listMetadataFiles(METADATA_DIR);

  const metFiles = metadataFiles.filter((f) => f.startsWith("met/"));
  const nasaFiles = metadataFiles.filter((f) => f.startsWith("nasa/"));

  // 메타데이터를 소스별, 컬렉션별로 그룹화
  const metCollections = {};
  const nasaCollections = {};

  for (const file of metFiles) {
    const fullPath = path.join(METADATA_DIR, file);
    const content = await readFile(fullPath, "utf8");
    const metadata = JSON.parse(content);
    const segments = file.split("/");
    const stem = segments[segments.length - 1].replace(".json", "");
    const relativeDirSegments = segments.slice(0, -1);
    const baseName =
      relativeDirSegments.length > 0
        ? `${relativeDirSegments.join("/")}/${stem}`
        : stem;

    const collectionId = metadata.sourceCategory;
    const collectionLabel = metadata.categoryLabel || collectionId;

    if (!metCollections[collectionId]) {
      metCollections[collectionId] = {
        id: collectionId,
        name: collectionLabel,
        wallpapers: [],
      };
    }

    metCollections[collectionId].wallpapers.push({
      id: metadata.id ?? stem,
      title: metadata.title,
      author: metadata.author,
      year: metadata.year,
      source: "met",
      collection: collectionId,
      imagePath: `images-eink/${baseName}.webp`,
    });
  }

  for (const file of nasaFiles) {
    const fullPath = path.join(METADATA_DIR, file);
    const content = await readFile(fullPath, "utf8");
    const metadata = JSON.parse(content);
    const segments = file.split("/");
    const stem = segments[segments.length - 1].replace(".json", "");
    const relativeDirSegments = segments.slice(0, -1);
    const baseName =
      relativeDirSegments.length > 0
        ? `${relativeDirSegments.join("/")}/${stem}`
        : stem;

    const collectionId = metadata.sourceCategory;
    const collectionLabel = metadata.categoryLabel || collectionId;

    if (!nasaCollections[collectionId]) {
      nasaCollections[collectionId] = {
        id: collectionId,
        name: collectionLabel,
        wallpapers: [],
      };
    }

    nasaCollections[collectionId].wallpapers.push({
      id: metadata.id ?? stem,
      title: metadata.title,
      author: metadata.author,
      year: metadata.year,
      source: "nasa",
      collection: collectionId,
      imagePath: `images-eink/${baseName}.webp`,
    });
  }

  // React Native용 정적 require 추가
  const addImageRequire = (wallpaper) => ({
    ...wallpaper,
    image: `require('./${wallpaper.imagePath}')`,
  });

  const metCollectionsWithImages = Object.fromEntries(
    Object.entries(metCollections).map(([id, collection]) => [
      id,
      {
        ...collection,
        wallpapers: collection.wallpapers.map(addImageRequire),
      },
    ])
  );

  const nasaCollectionsWithImages = Object.fromEntries(
    Object.entries(nasaCollections).map(([id, collection]) => [
      id,
      {
        ...collection,
        wallpapers: collection.wallpapers.map(addImageRequire),
      },
    ])
  );

  // 객체를 문자열로 변환하면서 require를 코드로 처리
  const stringifyWithRequire = (obj) => {
    return JSON.stringify(obj, null, 2).replace(
      /"image": "require\('(.+?)'\)"/g,
      "image: require('$1')"
    );
  };

  // 통계 계산
  const metTotal = Object.values(metCollections).reduce(
    (sum, col) => sum + col.wallpapers.length,
    0
  );
  const nasaTotal = Object.values(nasaCollections).reduce(
    (sum, col) => sum + col.wallpapers.length,
    0
  );

  // React Native용 index 파일 생성
  const code = `// Auto-generated file for React Native compatibility
// Run 'npm run generate:index' to regenerate

/**
 * @typedef {Object} Wallpaper
 * @property {string} id - Wallpaper ID
 * @property {string} title - Wallpaper 제목
 * @property {string} author - 작가명
 * @property {string} year - 제작 연도
 * @property {string} source - 소스 (met/nasa)
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
 * 모든 wallpaper 소스 (단일 source of truth)
 * @type {Record<string, WallpaperSource>}
 */
export const WALLPAPER_SOURCES = {
  met: {
    id: "met",
    name: "The Met Museum",
    collections: ${stringifyWithRequire(metCollectionsWithImages)},
  },
  nasa: {
    id: "nasa",
    name: "NASA",
    collections: ${stringifyWithRequire(nasaCollectionsWithImages)},
  },
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
 * @param {"met" | "nasa"} sourceId - 소스 ID
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
 * 특정 소스의 모든 컬렉션을 반환한다.
 * @param {"met" | "nasa"} sourceId - 소스 ID
 * @returns {WallpaperCollection[]}
 */
export function getCollections(sourceId) {
  const source = WALLPAPER_SOURCES[sourceId];
  return source ? Object.values(source.collections) : [];
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
 * @param {"met" | "nasa"} sourceId - 소스 ID
 * @returns {Wallpaper[]}
 */
export function getWallpapersBySource(sourceId) {
  return getCollections(sourceId).flatMap((col) => col.wallpapers);
}

/**
 * 모든 wallpaper를 단일 배열로 반환한다.
 * @returns {Wallpaper[]}
 */
export function getAllWallpapers() {
  return Object.values(WALLPAPER_SOURCES).flatMap((source) =>
    Object.values(source.collections).flatMap((col) => col.wallpapers)
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
      const wallpaper = collection.wallpapers.find((w) => w.id === wallpaperId);
      if (wallpaper) return wallpaper;
    }
  }
  return null;
}

/**
 * 랜덤 wallpaper를 반환한다.
 * @param {Object} [options]
 * @param {string} [options.collectionId] - 특정 컬렉션에서만 선택
 * @param {"met" | "nasa"} [options.sourceId] - 특정 소스에서만 선택
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

  const outputPath = path.join(__dirname, "..", "index.js");
  await writeFile(outputPath, code, "utf8");
  console.log("✅ Generated index.js successfully!");
  console.log(
    `   - Met: ${
      Object.keys(metCollections).length
    } collections, ${metTotal} wallpapers`
  );
  console.log(
    `   - NASA: ${
      Object.keys(nasaCollections).length
    } collections, ${nasaTotal} wallpapers`
  );
}

generateNativeIndex().catch((error) => {
  console.error("❌ Error generating native index:", error);
  process.exit(1);
});
