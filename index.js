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
      const childPrefix = relativePrefix ? `${relativePrefix}/${entry.name}` : entry.name;
      const childFiles = await listMetadataFiles(path.join(currentDir, entry.name), childPrefix);
      files.push(...childFiles);
      continue;
    }

    if (entry.isFile() && entry.name.endsWith(".json")) {
      const relativePath = relativePrefix ? `${relativePrefix}/${entry.name}` : entry.name;
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
 * Load wallpapers with paired metadata and image paths.
 *
 * @param {Object} [options]
 * @param {string} [options.imageRoot="images-eink"] - Folder (relative to package root) that stores the image assets.
 * @param {string} [options.imageExtension=".webp"] - Image file extension (with or without leading dot).
 * @param {boolean} [options.includeAbsolutePaths=false] - Include absolute filesystem paths in the returned entries.
 * @returns {Promise<Array<Object>>} List of wallpaper entries including metadata, relative specifiers, and optional absolute paths.
 */
export async function loadWallpapers(options = {}) {
  const {
    imageRoot = "images-eink",
    imageExtension = ".webp",
    includeAbsolutePaths = false,
  } = options;

  if (!(await fileExists(METADATA_DIR))) {
    return [];
  }

  const metadataFiles = await listMetadataFiles(METADATA_DIR);
  const normalizedExtension = imageExtension.startsWith(".")
    ? imageExtension
    : `.${imageExtension}`;
  const imageBaseDir = path.join(__dirname, imageRoot);

  const wallpapers = [];

  for (const metadataRelative of metadataFiles) {
    const metadataSegments = metadataRelative.split("/");
    const metadataAbsolute = path.join(METADATA_DIR, ...metadataSegments);
    const raw = await readFile(metadataAbsolute, "utf8");
    const metadata = JSON.parse(raw);

    const relativeDirSegments = metadataSegments.slice(0, -1);
    const stem = metadataSegments[metadataSegments.length - 1].slice(0, -".json".length);

    const baseName = relativeDirSegments.length > 0
      ? `${relativeDirSegments.join("/")}/${stem}`
      : stem;

    const imageRelative = `${imageRoot}/${baseName}${normalizedExtension}`;
    const imageAbsolute = path.join(
      imageBaseDir,
      ...relativeDirSegments,
      `${stem}${normalizedExtension}`,
    );
    const hasImage = await fileExists(imageAbsolute);

    const entry = {
      id: metadata.id ?? stem,
      metadata,
      metadataPath: `metadata/${metadataRelative}`,
    };

    entry.imagePath = hasImage ? imageRelative : null;

    if (includeAbsolutePaths) {
      entry.metadataFile = metadataAbsolute;
      entry.imageFile = hasImage ? imageAbsolute : null;
    }

    wallpapers.push(entry);
  }

  return wallpapers;
}

/**
 * @deprecated Use `loadWallpapers()` instead.
 */
export const wallpapers = [];
