import type { ImageSourcePropType } from "react-native";

export type WallpaperSource = "met" | "nasa";

export interface PublicDomainWallpaper {
  id: string;
  title: string;
  author?: string;
  description?: string;
  year?: string;
  license?: string;
  originalImageUrl?: string;
  sourcePage?: string;
  fetchedFrom?: string;
  categoryLabel?: string;
  source: WallpaperSource;
  image: ImageSourcePropType;
  imagePath: string;
  metadataPath: string;
}

export interface LoadWallpapersOptions {
  includeAbsolutePaths?: boolean;
}

export interface PublicDomainWallpaperWithAbsolutePaths
  extends PublicDomainWallpaper {
  metadataFile: string;
  imageFile: string | null;
}

export function loadMetWallpapers(
  options?: LoadWallpapersOptions & { includeAbsolutePaths?: false }
): Promise<PublicDomainWallpaper[]>;
export function loadMetWallpapers(
  options: LoadWallpapersOptions & { includeAbsolutePaths: true }
): Promise<PublicDomainWallpaperWithAbsolutePaths[]>;

export function loadNasaWallpapers(
  options?: LoadWallpapersOptions & { includeAbsolutePaths?: false }
): Promise<PublicDomainWallpaper[]>;
export function loadNasaWallpapers(
  options: LoadWallpapersOptions & { includeAbsolutePaths: true }
): Promise<PublicDomainWallpaperWithAbsolutePaths[]>;
