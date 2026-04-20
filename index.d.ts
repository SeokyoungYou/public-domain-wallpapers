import type { ImageSourcePropType } from "react-native";

export type WallpaperSourceId = "met" | "nasa";

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
  sourceId?: WallpaperSourceId;
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
export function getSource(sourceId: WallpaperSourceId): WallpaperSource | null;

/**
 * 모든 컬렉션을 flat 구조로 반환한다.
 */
export function getAllCollections(): Record<string, WallpaperCollection>;

/**
 * 특정 소스의 모든 컬렉션을 배열로 반환한다.
 */
export function getCollections(
  sourceId: WallpaperSourceId
): WallpaperCollection[];

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
export function getWallpapersBySource(sourceId: WallpaperSourceId): Wallpaper[];

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
