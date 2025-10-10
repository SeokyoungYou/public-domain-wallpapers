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

  // 메타데이터를 모두 로드
  const metData = [];
  const nasaData = [];

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

    metData.push({
      id: metadata.id ?? stem,
      title: metadata.title,
      author: metadata.author,
      year: metadata.year,
      source: "met",
      collection: metadata.sourceCategory,
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

    nasaData.push({
      id: metadata.id ?? stem,
      title: metadata.title,
      author: metadata.author,
      year: metadata.year,
      source: "nasa",
      collection: metadata.sourceCategory,
      imagePath: `images-eink/${baseName}.webp`,
    });
  }

  // React Native용 정적 require를 포함한 배열 생성
  const metWallpapersWithImages = metData.map((wallpaper) => ({
    ...wallpaper,
    image: `require('./${wallpaper.imagePath}')`
  }));
  
  const nasaWallpapersWithImages = nasaData.map((wallpaper) => ({
    ...wallpaper,
    image: `require('./${wallpaper.imagePath}')`
  }));

  // 객체를 문자열로 변환하면서 require를 코드로 처리
  const stringifyWithRequire = (arr) => {
    return JSON.stringify(arr, null, 2)
      .replace(/"image": "require\('(.+?)'\)"/g, 'image: require(\'$1\')');
  };

  // React Native용 index 파일 생성
  const code = `// Auto-generated file for React Native compatibility
// Run 'npm run generate:index' to regenerate

const MET_WALLPAPERS = ${stringifyWithRequire(metWallpapersWithImages)};

const NASA_WALLPAPERS = ${stringifyWithRequire(nasaWallpapersWithImages)};

/**
 * Met 카테고리의 모든 wallpaper를 반환한다.
 * @returns {Array<Object>}
 */
export function loadMetWallpapers() {
  return MET_WALLPAPERS;
}

/**
 * NASA 카테고리의 모든 wallpaper를 반환한다.
 * @returns {Array<Object>}
 */
export function loadNasaWallpapers() {
  return NASA_WALLPAPERS;
}

/**
 * 특정 카테고리에서 랜덤으로 하나의 wallpaper를 반환한다.
 * @param {Object} [options]
 * @param {"met" | "nasa"} [options.category="met"] - 카테고리 이름 (기본값: "met")
 * @returns {Object|null}
 */
export function getRandomWallpaper({ category = "met" } = {}) {
  const wallpapers = category === "nasa" ? NASA_WALLPAPERS : MET_WALLPAPERS;
  
  if (wallpapers.length === 0) {
    return null;
  }
  
  const randomIndex = Math.floor(Math.random() * wallpapers.length);
  return wallpapers[randomIndex];
}
`;

  const outputPath = path.join(__dirname, "..", "index.js");
  await writeFile(outputPath, code, "utf8");
  console.log("✅ Generated index.js successfully!");
  console.log(`   - Met wallpapers: ${metData.length}`);
  console.log(`   - NASA wallpapers: ${nasaData.length}`);
}

generateNativeIndex().catch((error) => {
  console.error("❌ Error generating native index:", error);
  process.exit(1);
});
