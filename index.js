// Auto-generated file for React Native compatibility
// Run 'npm run generate:index' to regenerate

const MET_WALLPAPERS = [
  {
    "id": "435809",
    "title": "The Harvesters",
    "author": "Pieter Bruegel the Elder",
    "year": "1565",
    "source": "met",
    "collection": "met-featured-collection",
    "imagePath": "images-eink/met/met-featured-collection/met-435809.webp",
    image: require('./images-eink/met/met-featured-collection/met-435809.webp')
  },
  {
    "id": "436839",
    "title": "The Penitent Magdalen",
    "author": "Georges de La Tour",
    "year": "ca. 1640",
    "source": "met",
    "collection": "met-featured-collection",
    "imagePath": "images-eink/met/met-featured-collection/met-436839.webp",
    image: require('./images-eink/met/met-featured-collection/met-436839.webp')
  },
  {
    "id": "436965",
    "title": "The Monet Family in Their Garden at Argenteuil",
    "author": "Edouard Manet",
    "year": "1874",
    "source": "met",
    "collection": "met-featured-collection",
    "imagePath": "images-eink/met/met-featured-collection/met-436965.webp",
    image: require('./images-eink/met/met-featured-collection/met-436965.webp')
  },
  {
    "id": "437853",
    "title": "Venice, from the Porch of Madonna della Salute",
    "author": "Joseph Mallord William Turner",
    "year": "ca. 1835",
    "source": "met",
    "collection": "met-featured-collection",
    "imagePath": "images-eink/met/met-featured-collection/met-437853.webp",
    image: require('./images-eink/met/met-featured-collection/met-437853.webp')
  },
  {
    "id": "671456",
    "title": "Chrysanthemums in the Garden at Petit-Gennevilliers",
    "author": "Gustave Caillebotte",
    "year": "1893",
    "source": "met",
    "collection": "met-featured-collection",
    "imagePath": "images-eink/met/met-featured-collection/met-671456.webp",
    image: require('./images-eink/met/met-featured-collection/met-671456.webp')
  }
];

const NASA_WALLPAPERS = [
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
];

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
