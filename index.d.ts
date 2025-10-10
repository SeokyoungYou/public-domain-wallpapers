import type { ImageSourcePropType } from "react-native";

export type WallpaperSource = "met" | "nasa";

export interface PublicDomainWallpaper {
  id: string;
  title: string;
  author?: string;
  year?: string;
  source: WallpaperSource;
  image: ImageSourcePropType;
  imagePath: string;
}

export interface GetRandomWallpaperOptions {
  category?: WallpaperSource;
}

export function loadMetWallpapers(): PublicDomainWallpaper[];

export function loadNasaWallpapers(): PublicDomainWallpaper[];

export function getRandomWallpaper(
  options?: GetRandomWallpaperOptions
): PublicDomainWallpaper | null;
