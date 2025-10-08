#!/usr/bin/env node

import fs from "fs/promises";
import path from "path";
import sharp from "sharp";

const SUPPORTED_EXTENSIONS = new Set([".webp", ".jpeg", ".jpg", ".png", ".tif", ".tiff"]);

function parseArgs(argv) {
  const options = {
    input: "images",
    output: null,
    maxWidth: 1072,
    maxHeight: 1448,
    quality: 35,
    grayscale: false,
    effort: 6,
  };

  for (let i = 0; i < argv.length; i += 1) {
    const arg = argv[i];
    switch (arg) {
      case "--input":
      case "-i":
        options.input = argv[++i];
        break;
      case "--output":
      case "-o":
        options.output = argv[++i];
        break;
      case "--maxWidth":
        options.maxWidth = Number(argv[++i]);
        break;
      case "--maxHeight":
        options.maxHeight = Number(argv[++i]);
        break;
      case "--quality":
      case "-q":
        options.quality = Number(argv[++i]);
        break;
      case "--color":
        options.grayscale = false;
        break;
      case "--grayscale":
        options.grayscale = true;
        break;
      case "--effort":
        options.effort = Number(argv[++i]);
        break;
      case "--help":
      case "-h":
        printHelp();
        process.exit(0);
        break;
      default:
        console.warn(`Unknown option: ${arg}`);
        printHelp();
        process.exit(1);
    }
  }

  if (!Number.isFinite(options.maxWidth) || options.maxWidth <= 0) {
    console.error("maxWidth must be a positive number");
    process.exit(1);
  }

  if (!Number.isFinite(options.maxHeight) || options.maxHeight <= 0) {
    console.error("maxHeight must be a positive number");
    process.exit(1);
  }

  if (!Number.isFinite(options.quality) || options.quality <= 0 || options.quality > 100) {
    console.error("quality must be a number between 1 and 100");
    process.exit(1);
  }

  if (!Number.isFinite(options.effort) || options.effort < 0 || options.effort > 6) {
    console.error("effort must be between 0 (fastest) and 6 (slowest)");
    process.exit(1);
  }

  return options;
}

function printHelp() {
  console.log(`Usage: node scripts/optimize-eink-images.js --input <folder> [options]

Options:
  --input, -i       Source image file or directory to optimise (default: "images")
  --output, -o      Destination directory or file (defaults to "<input>-eink" beside source)
  --maxWidth        Maximum width in pixels (default: 1072)
  --maxHeight       Maximum height in pixels (default: 1448)
  --quality, -q     Output quality (1-100, default: 35)
  --effort          WebP encoder effort (0-6, higher is smaller & slower; default: 6)
  --grayscale       Force grayscale output
  --color           Preserve colour output (default)
  --help, -h        Show this help text

Examples:
  node scripts/optimize-eink-images.js --input images/nasa/nasa-featured-collection
  node scripts/optimize-eink-images.js --input images/nasa --output build/eink --maxWidth 1448 --maxHeight 1072
`);
}

async function ensureDirectory(dirPath) {
  await fs.mkdir(dirPath, { recursive: true });
}

async function optimiseFile(srcFile, destFile, options) {
  const ext = path.extname(srcFile).toLowerCase();
  if (!SUPPORTED_EXTENSIONS.has(ext)) {
    console.warn(`Skipping unsupported file: ${srcFile}`);
    return;
  }

  const transformer = sharp(srcFile, { failOn: "none" }).rotate();

  transformer.resize({
    width: options.maxWidth,
    height: options.maxHeight,
    fit: "inside",
    withoutEnlargement: true,
  });

  if (options.grayscale) {
    transformer.greyscale();
  }

  switch (ext) {
    case ".webp":
      transformer.webp({ quality: options.quality, effort: options.effort });
      break;
    case ".jpg":
    case ".jpeg":
      transformer.jpeg({ quality: options.quality, mozjpeg: true });
      break;
    case ".png":
      transformer.png({ compressionLevel: 9, palette: true });
      break;
    case ".tif":
    case ".tiff":
      transformer.tiff({ quality: options.quality });
      break;
    default:
      break;
  }

  await transformer.toFile(destFile);
  console.log(`Optimised ${srcFile} → ${destFile}`);
}

async function optimiseEntry(srcPath, destPath, options) {
  const stat = await fs.stat(srcPath);

  if (stat.isDirectory()) {
    await ensureDirectory(destPath);
    const entries = await fs.readdir(srcPath, { withFileTypes: true });

    for (const entry of entries) {
      const nextSrc = path.join(srcPath, entry.name);
      const nextDest = path.join(destPath, entry.name);
      await optimiseEntry(nextSrc, nextDest, options);
    }
    return;
  }

  const parentDir = path.dirname(destPath);
  await ensureDirectory(parentDir);
  await optimiseFile(srcPath, destPath, options);
}

async function main() {
  const options = parseArgs(process.argv.slice(2));
  const inputPath = path.resolve(options.input);

  let stats;
  try {
    stats = await fs.stat(inputPath);
  } catch (error) {
    console.error(`Unable to read input path: ${inputPath}`);
    console.error(error.message);
    process.exit(1);
  }

  let defaultOutput;
  if (stats.isDirectory()) {
    defaultOutput = path.join(
      path.dirname(inputPath),
      `${path.basename(inputPath)}-eink`
    );
  } else {
    const parsed = path.parse(inputPath);
    defaultOutput = path.join(parsed.dir, `${parsed.name}-eink${parsed.ext}`);
  }

  const outputPath = path.resolve(options.output || defaultOutput);

  await optimiseEntry(inputPath, outputPath, options);
  console.log("Done.");
}

main().catch((error) => {
  console.error("Failed to optimise images:", error);
  process.exit(1);
});
