import { readdir, readFile, writeFile } from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";
import {
  getLocalizedMetadataFields,
  recoverOriginalMetadataField,
} from "./lib/metadata-language.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const METADATA_ROOT = path.join(__dirname, "..", "metadata");

function parseSources() {
  const index = process.argv.indexOf("--sources");
  if (index === -1) return new Set(["nmk"]);

  const value = String(process.argv[index + 1] ?? "nmk");
  const sources = value
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);

  return new Set(sources.length > 0 ? sources : ["nmk"]);
}

async function walkJsonFiles(dir) {
  const entries = await readdir(dir, { withFileTypes: true });
  const files = [];

  for (const entry of entries) {
    if (entry.name.startsWith(".") || entry.name.startsWith("_")) continue;

    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      const child = await walkJsonFiles(fullPath);
      files.push(...child);
      continue;
    }

    if (entry.isFile() && entry.name.endsWith(".json")) {
      files.push(fullPath);
    }
  }

  return files;
}

function isSameValue(a, b) {
  return String(a ?? "") === String(b ?? "");
}

async function run() {
  const selectedSources = parseSources();
  const files = await walkJsonFiles(METADATA_ROOT);
  let changed = 0;

  for (const filePath of files) {
    const raw = await readFile(filePath, "utf8");
    const metadata = JSON.parse(raw);
    const relativePath = path.relative(METADATA_ROOT, filePath);
    const sourceKey = relativePath.split(path.sep)[0];
    if (!selectedSources.has(sourceKey)) continue;

    if (!metadata || typeof metadata !== "object") continue;
    if (!metadata.title && !metadata.author) continue;

    const sourceTitle =
      metadata.titleOriginal ||
      recoverOriginalMetadataField({
        sourceKey,
        field: "title",
        localizedValue: metadata.title,
      }) ||
      metadata.title;

    const sourceAuthor =
      metadata.authorOriginal ||
      recoverOriginalMetadataField({
        sourceKey,
        field: "author",
        localizedValue: metadata.author,
      }) ||
      metadata.author;

    const localizedFields = getLocalizedMetadataFields({
      sourceKey,
      id: metadata.id ?? path.basename(filePath, ".json"),
      title: sourceTitle,
      author: sourceAuthor,
    });

    const next = { ...metadata };
    next.title = localizedFields.title;
    next.author = localizedFields.author;

    if (localizedFields.titleOriginal) {
      next.titleOriginal = localizedFields.titleOriginal;
    } else {
      delete next.titleOriginal;
    }

    if (localizedFields.authorOriginal) {
      next.authorOriginal = localizedFields.authorOriginal;
    } else {
      delete next.authorOriginal;
    }

    const hasChanged =
      !isSameValue(metadata.title, next.title) ||
      !isSameValue(metadata.author, next.author) ||
      !isSameValue(metadata.titleOriginal, next.titleOriginal) ||
      !isSameValue(metadata.authorOriginal, next.authorOriginal);

    if (!hasChanged) continue;

    await writeFile(filePath, `${JSON.stringify(next, null, 2)}\n`);
    changed += 1;
  }

  console.log(
    `Updated metadata files: ${changed} (sources: ${[...selectedSources].join(
      ", "
    )})`
  );
}

run().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
