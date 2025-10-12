// Auto-generated file for React Native compatibility
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
    collections: {
  "met-floral-collection": {
    "id": "met-floral-collection",
    "name": "Floral & Botanical Collection",
    "wallpapers": [
      {
        "id": "436525",
        "title": "Bouquet of Flowers in a Vase",
        "author": "Vincent van Gogh",
        "year": "1890",
        "source": "met",
        "collection": "met-floral-collection",
        "imagePath": "images-eink/met/met-floral-collection/met-436525.webp",
        image: require('./images-eink/met/met-floral-collection/met-436525.webp')
      },
      {
        "id": "438031",
        "title": "Summer Flowers",
        "author": "Henri Fantin-Latour",
        "year": "1880",
        "source": "met",
        "collection": "met-floral-collection",
        "imagePath": "images-eink/met/met-floral-collection/met-438031.webp",
        image: require('./images-eink/met/met-floral-collection/met-438031.webp')
      },
      {
        "id": "544865",
        "title": "Floral plaque",
        "author": "Unknown artist",
        "year": "100 BC–100 AD",
        "source": "met",
        "collection": "met-floral-collection",
        "imagePath": "images-eink/met/met-floral-collection/met-544865.webp",
        image: require('./images-eink/met/met-floral-collection/met-544865.webp')
      },
      {
        "id": "671456",
        "title": "Chrysanthemums in the Garden at Petit-Gennevilliers",
        "author": "Gustave Caillebotte",
        "year": "1893",
        "source": "met",
        "collection": "met-floral-collection",
        "imagePath": "images-eink/met/met-floral-collection/met-671456.webp",
        image: require('./images-eink/met/met-floral-collection/met-671456.webp')
      },
      {
        "id": "823979",
        "title": "Book of Flower Studies",
        "author": "Master of Claude de France",
        "year": "ca. 1510–1515",
        "source": "met",
        "collection": "met-floral-collection",
        "imagePath": "images-eink/met/met-floral-collection/met-823979.webp",
        image: require('./images-eink/met/met-floral-collection/met-823979.webp')
      },
      {
        "id": "825613",
        "title": "Flower Studies",
        "author": "Unknown artist",
        "year": "ca. 1650",
        "source": "met",
        "collection": "met-floral-collection",
        "imagePath": "images-eink/met/met-floral-collection/met-825613.webp",
        image: require('./images-eink/met/met-floral-collection/met-825613.webp')
      },
      {
        "id": "825614",
        "title": "Two Panels with Flower Designs",
        "author": "Unknown artist",
        "year": "ca. 1650",
        "source": "met",
        "collection": "met-floral-collection",
        "imagePath": "images-eink/met/met-floral-collection/met-825614.webp",
        image: require('./images-eink/met/met-floral-collection/met-825614.webp')
      },
      {
        "id": "827660",
        "title": "A Bouquet of Flowers",
        "author": "Clara Peeters",
        "year": "ca. 1612",
        "source": "met",
        "collection": "met-floral-collection",
        "imagePath": "images-eink/met/met-floral-collection/met-827660.webp",
        image: require('./images-eink/met/met-floral-collection/met-827660.webp')
      }
    ]
  },
  "met-impressionism-collection": {
    "id": "met-impressionism-collection",
    "name": "Impressionism Collection",
    "wallpapers": [
      {
        "id": "436441",
        "title": "Wooded Upland Landscape",
        "author": "Thomas Gainsborough",
        "year": "probably 1783",
        "source": "met",
        "collection": "met-impressionism-collection",
        "imagePath": "images-eink/met/met-impressionism-collection/met-436441.webp",
        image: require('./images-eink/met/met-impressionism-collection/met-436441.webp')
      },
      {
        "id": "436525",
        "title": "Bouquet of Flowers in a Vase",
        "author": "Vincent van Gogh",
        "year": "1890",
        "source": "met",
        "collection": "met-impressionism-collection",
        "imagePath": "images-eink/met/met-impressionism-collection/met-436525.webp",
        image: require('./images-eink/met/met-impressionism-collection/met-436525.webp')
      },
      {
        "id": "436831",
        "title": "An Extensive Wooded Landscape",
        "author": "Philips Koninck",
        "year": "1670s",
        "source": "met",
        "collection": "met-impressionism-collection",
        "imagePath": "images-eink/met/met-impressionism-collection/met-436831.webp",
        image: require('./images-eink/met/met-impressionism-collection/met-436831.webp')
      },
      {
        "id": "436965",
        "title": "The Monet Family in Their Garden at Argenteuil",
        "author": "Edouard Manet",
        "year": "1874",
        "source": "met",
        "collection": "met-impressionism-collection",
        "imagePath": "images-eink/met/met-impressionism-collection/met-436965.webp",
        image: require('./images-eink/met/met-impressionism-collection/met-436965.webp')
      },
      {
        "id": "437191",
        "title": "Landscape at Sunset",
        "author": "Aert van der Neer",
        "year": "1650s",
        "source": "met",
        "collection": "met-impressionism-collection",
        "imagePath": "images-eink/met/met-impressionism-collection/met-437191.webp",
        image: require('./images-eink/met/met-impressionism-collection/met-437191.webp')
      },
      {
        "id": "437382",
        "title": "Vase of Flowers (Pink Background)",
        "author": "Odilon Redon",
        "year": "ca. 1906",
        "source": "met",
        "collection": "met-impressionism-collection",
        "imagePath": "images-eink/met/met-impressionism-collection/met-437382.webp",
        image: require('./images-eink/met/met-impressionism-collection/met-437382.webp')
      },
      {
        "id": "438031",
        "title": "Summer Flowers",
        "author": "Henri Fantin-Latour",
        "year": "1880",
        "source": "met",
        "collection": "met-impressionism-collection",
        "imagePath": "images-eink/met/met-impressionism-collection/met-438031.webp",
        image: require('./images-eink/met/met-impressionism-collection/met-438031.webp')
      }
    ]
  },
  "met-landscape-collection": {
    "id": "met-landscape-collection",
    "name": "Landscape Collection",
    "wallpapers": [
      {
        "id": "10793",
        "title": "Landscape—Scene from \"Thanatopsis\"",
        "author": "Asher Brown Durand",
        "year": "1850",
        "source": "met",
        "collection": "met-landscape-collection",
        "imagePath": "images-eink/met/met-landscape-collection/met-10793.webp",
        image: require('./images-eink/met/met-landscape-collection/met-10793.webp')
      },
      {
        "id": "435907",
        "title": "Sunrise",
        "author": "Claude Lorrain (Claude Gellée)",
        "year": "possibly 1646–47",
        "source": "met",
        "collection": "met-landscape-collection",
        "imagePath": "images-eink/met/met-landscape-collection/met-435907.webp",
        image: require('./images-eink/met/met-landscape-collection/met-435907.webp')
      },
      {
        "id": "436441",
        "title": "Wooded Upland Landscape",
        "author": "Thomas Gainsborough",
        "year": "probably 1783",
        "source": "met",
        "collection": "met-landscape-collection",
        "imagePath": "images-eink/met/met-landscape-collection/met-436441.webp",
        image: require('./images-eink/met/met-landscape-collection/met-436441.webp')
      },
      {
        "id": "436455",
        "title": "Evening: Landscape with an Aqueduct",
        "author": "Théodore Gericault",
        "year": "1818",
        "source": "met",
        "collection": "met-landscape-collection",
        "imagePath": "images-eink/met/met-landscape-collection/met-436455.webp",
        image: require('./images-eink/met/met-landscape-collection/met-436455.webp')
      },
      {
        "id": "436831",
        "title": "An Extensive Wooded Landscape",
        "author": "Philips Koninck",
        "year": "1670s",
        "source": "met",
        "collection": "met-landscape-collection",
        "imagePath": "images-eink/met/met-landscape-collection/met-436831.webp",
        image: require('./images-eink/met/met-landscape-collection/met-436831.webp')
      },
      {
        "id": "437191",
        "title": "Landscape at Sunset",
        "author": "Aert van der Neer",
        "year": "1650s",
        "source": "met",
        "collection": "met-landscape-collection",
        "imagePath": "images-eink/met/met-landscape-collection/met-437191.webp",
        image: require('./images-eink/met/met-landscape-collection/met-437191.webp')
      },
      {
        "id": "437323",
        "title": "A Brazilian Landscape",
        "author": "Frans Post",
        "year": "1650",
        "source": "met",
        "collection": "met-landscape-collection",
        "imagePath": "images-eink/met/met-landscape-collection/met-437323.webp",
        image: require('./images-eink/met/met-landscape-collection/met-437323.webp')
      },
      {
        "id": "45650",
        "title": "Landscape",
        "author": "Zhao Yuan",
        "year": "late 14th century",
        "source": "met",
        "collection": "met-landscape-collection",
        "imagePath": "images-eink/met/met-landscape-collection/met-45650.webp",
        image: require('./images-eink/met/met-landscape-collection/met-45650.webp')
      }
    ]
  },
  "met-seascape-collection": {
    "id": "met-seascape-collection",
    "name": "Seascape Collection",
    "wallpapers": [
      {
        "id": "11321",
        "title": "The Sea",
        "author": "John Frederick Kensett",
        "year": "1872",
        "source": "met",
        "collection": "met-seascape-collection",
        "imagePath": "images-eink/met/met-seascape-collection/met-11321.webp",
        image: require('./images-eink/met/met-seascape-collection/met-11321.webp')
      },
      {
        "id": "15370",
        "title": "Seascape (from Sketchbook VII)",
        "author": "William Trost Richards",
        "year": "1886",
        "source": "met",
        "collection": "met-seascape-collection",
        "imagePath": "images-eink/met/met-seascape-collection/met-15370.webp",
        image: require('./images-eink/met/met-seascape-collection/met-15370.webp')
      },
      {
        "id": "15374",
        "title": "Seascape with Waves Breaking off Rocks (from Sketchbook VII)",
        "author": "William Trost Richards",
        "year": "1886",
        "source": "met",
        "collection": "met-seascape-collection",
        "imagePath": "images-eink/met/met-seascape-collection/met-15374.webp",
        image: require('./images-eink/met/met-seascape-collection/met-15374.webp')
      },
      {
        "id": "15379",
        "title": "Seascape with Breaking Waves (from Sketchbook VII)",
        "author": "William Trost Richards",
        "year": "1886",
        "source": "met",
        "collection": "met-seascape-collection",
        "imagePath": "images-eink/met/met-seascape-collection/met-15379.webp",
        image: require('./images-eink/met/met-seascape-collection/met-15379.webp')
      },
      {
        "id": "261941",
        "title": "[The Great Wave, Sète]",
        "author": "Gustave Le Gray",
        "year": "1857",
        "source": "met",
        "collection": "met-seascape-collection",
        "imagePath": "images-eink/met/met-seascape-collection/met-261941.webp",
        image: require('./images-eink/met/met-seascape-collection/met-261941.webp')
      },
      {
        "id": "435570",
        "title": "A Ship in a Stormy Sea",
        "author": "Ivan Konstantinovich Aivazovsky (Hovhannes Aivazian)",
        "year": "1892",
        "source": "met",
        "collection": "met-seascape-collection",
        "imagePath": "images-eink/met/met-seascape-collection/met-435570.webp",
        image: require('./images-eink/met/met-seascape-collection/met-435570.webp')
      },
      {
        "id": "436005",
        "title": "The Calm Sea",
        "author": "Gustave Courbet",
        "year": "1869",
        "source": "met",
        "collection": "met-seascape-collection",
        "imagePath": "images-eink/met/met-seascape-collection/met-436005.webp",
        image: require('./images-eink/met/met-seascape-collection/met-436005.webp')
      },
      {
        "id": "437853",
        "title": "Venice, from the Porch of Madonna della Salute",
        "author": "Joseph Mallord William Turner",
        "year": "ca. 1835",
        "source": "met",
        "collection": "met-seascape-collection",
        "imagePath": "images-eink/met/met-seascape-collection/met-437853.webp",
        image: require('./images-eink/met/met-seascape-collection/met-437853.webp')
      }
    ]
  }
},
  },
  nasa: {
    id: "nasa",
    name: "NASA",
    collections: {
  "nasa-featured-collection": {
    "id": "nasa-featured-collection",
    "name": "Featured Collection",
    "wallpapers": [
      {
        "id": "PIA02652",
        "title": "Mars Pathfinder Filled",
        "author": "NASA/JPL",
        "year": "2000",
        "source": "nasa",
        "collection": "nasa-featured-collection",
        "imagePath": "images-eink/nasa/nasa-featured-collection/nasa-pia02652.webp",
        image: require('./images-eink/nasa/nasa-featured-collection/nasa-pia02652.webp')
      },
      {
        "id": "PIA04921",
        "title": "Andromeda Galaxy",
        "author": "NASA/JPL/California Institute of Technology",
        "year": "2003",
        "source": "nasa",
        "collection": "nasa-featured-collection",
        "imagePath": "images-eink/nasa/nasa-featured-collection/nasa-pia04921.webp",
        image: require('./images-eink/nasa/nasa-featured-collection/nasa-pia04921.webp')
      },
      {
        "id": "PIA12348",
        "title": "Great Observatories Unique Views of the Milky Way",
        "author": "NASA/JPL-Caltech/ESA/CXC/STScI",
        "year": "2009",
        "source": "nasa",
        "collection": "nasa-featured-collection",
        "imagePath": "images-eink/nasa/nasa-featured-collection/nasa-pia12348.webp",
        image: require('./images-eink/nasa/nasa-featured-collection/nasa-pia12348.webp')
      },
      {
        "id": "PIA18920",
        "title": "Ceres Awaits Dawn",
        "author": "NASA/JPL-Caltech/UCLA/MPS/DLR/IDA",
        "year": "2015",
        "source": "nasa",
        "collection": "nasa-featured-collection",
        "imagePath": "images-eink/nasa/nasa-featured-collection/nasa-pia18920.webp",
        image: require('./images-eink/nasa/nasa-featured-collection/nasa-pia18920.webp')
      },
      {
        "id": "PIA19808",
        "title": "Looking Up at Mars Rover Curiosity in Buckskin Selfie",
        "author": "NASA/JPL-Caltech/MSSS",
        "year": "2015",
        "source": "nasa",
        "collection": "nasa-featured-collection",
        "imagePath": "images-eink/nasa/nasa-featured-collection/nasa-pia19808.webp",
        image: require('./images-eink/nasa/nasa-featured-collection/nasa-pia19808.webp')
      },
      {
        "id": "PIA22946",
        "title": "Jupiter Marble",
        "author": "NASA",
        "year": "2019",
        "source": "nasa",
        "collection": "nasa-featured-collection",
        "imagePath": "images-eink/nasa/nasa-featured-collection/nasa-pia22946.webp",
        image: require('./images-eink/nasa/nasa-featured-collection/nasa-pia22946.webp')
      }
    ]
  }
},
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
