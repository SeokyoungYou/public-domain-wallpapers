import { access, readFile, readdir } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const METADATA_DIR = path.join(__dirname, "metadata");

/**
 * Recursively enumerate metadata JSON files relative to the metadata root.
 * Uses POSIX-style separators so the returned paths work as ESM specifiers.
 */
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

async function fileExists(filePath) {
  try {
    await access(filePath);
    return true;
  } catch {
    return false;
  }
}

/**
 * 해당 카테고리의 메타데이터 및 e-ink 이미지 경로를 불러온다.
 * @param {string} category - metadata 루트 하위의 상위 디렉터리 이름 (예: "met").
 * @param {Object} [options]
 * @param {boolean} [options.includeAbsolutePaths=false] - 결과에 절대 경로를 포함할지 여부.
 * @returns {Promise<Array<Object>>}
 */
async function loadCategoryWallpapers(category, options = {}) {
  const { includeAbsolutePaths = false } = options;
  if (!(await fileExists(METADATA_DIR))) {
    return [];
  }

  const metadataFiles = await listMetadataFiles(METADATA_DIR);
  const filtered = metadataFiles.filter((relativePath) =>
    relativePath.startsWith(`${category}/`)
  );
  const imageRoot = "images-eink";
  const imageBaseDir = path.join(__dirname, imageRoot);

  const wallpapers = [];

  for (const metadataRelative of filtered) {
    const metadataSegments = metadataRelative.split("/");
    const metadataAbsolute = path.join(METADATA_DIR, ...metadataSegments);
    const raw = await readFile(metadataAbsolute, "utf8");
    const metadata = JSON.parse(raw);

    const relativeDirSegments = metadataSegments.slice(0, -1);
    const stem = metadataSegments[metadataSegments.length - 1].slice(
      0,
      -".json".length
    );

    const baseName =
      relativeDirSegments.length > 0
        ? `${relativeDirSegments.join("/")}/${stem}`
        : stem;

    const imageRelative = `${imageRoot}/${baseName}.webp`;
    const imageAbsolute = path.join(
      imageBaseDir,
      ...relativeDirSegments,
      `${stem}.webp`
    );
    const hasImage = await fileExists(imageAbsolute);

    const entry = {
      id: metadata.id ?? stem,
      title: metadata.title,
      author: metadata.author,
      description: metadata.description,
      year: metadata.year,
      license: metadata.license,
      originalImageUrl: metadata.originalImageUrl,
      sourcePage: metadata.sourcePage,
      fetchedFrom: metadata.fetchedFrom,
      categoryLabel: metadata.categoryLabel,
      source: category,
      image: hasImage ? imageAbsolute : null,
      imagePath: hasImage ? imageRelative : null,
      metadataPath: `metadata/${metadataRelative}`,
    };

    if (includeAbsolutePaths) {
      entry.metadataFile = metadataAbsolute;
      entry.imageFile = hasImage ? imageAbsolute : null;
    }

    wallpapers.push(entry);
  }

  return wallpapers;
}

export async function loadMetWallpapers(options = {}) {
  return loadCategoryWallpapers("met", options);
}

export async function loadNasaWallpapers(options = {}) {
  return loadCategoryWallpapers("nasa", options);
}
