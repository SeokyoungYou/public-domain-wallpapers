import type { ImageSourcePropType } from "react-native";

export type WallpaperSource = "met" | "nasa";

export interface PublicDomainWallpaper {
  id: string;
  title: string;
  author?: string;
  year?: string;
  source: WallpaperSource;
  collection?: string;
  image: ImageSourcePropType;
  imagePath: string;
}

export interface GetRandomWallpaperOptions {
  category?: WallpaperSource;
}

export interface GetAvailableCollectionsOptions {
  source?: WallpaperSource | "all";
}

export interface GetWallpapersByCollectionOptions {
  collection: string;
}

export interface GetRandomWallpaperFromCollectionOptions {
  collection: string;
}

export function loadMetWallpapers(): PublicDomainWallpaper[];

export function loadNasaWallpapers(): PublicDomainWallpaper[];

export function getRandomWallpaper(
  options?: GetRandomWallpaperOptions
): PublicDomainWallpaper | null;

export function getAvailableCollections(
  options?: GetAvailableCollectionsOptions
): string[];

export function getWallpapersByCollection(
  options: GetWallpapersByCollectionOptions
): PublicDomainWallpaper[];

export function getRandomWallpaperFromCollection(
  options: GetRandomWallpaperFromCollectionOptions
): PublicDomainWallpaper | null;
