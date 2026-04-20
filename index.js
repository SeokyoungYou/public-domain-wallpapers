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

// Met Museum Wallpapers
const MET_FLORAL_COLLECTION_WALLPAPERS = [
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
];

const MET_IMPRESSIONISM_COLLECTION_WALLPAPERS = [
  {
    "id": "11321",
    "title": "The Sea",
    "author": "John Frederick Kensett",
    "year": "1872",
    "source": "met",
    "collection": "met-impressionism-collection",
    "imagePath": "images-eink/met/met-impressionism-collection/met-11321.webp",
    image: require('./images-eink/met/met-impressionism-collection/met-11321.webp')
  },
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
];

const MET_LANDSCAPE_COLLECTION_WALLPAPERS = [
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
];

const MET_OLD_MASTERS_COLLECTION_WALLPAPERS = [
  {
    "id": "435848",
    "title": "The Birth of the Virgin",
    "author": "Fra Carnevale (Bartolomeo di Giovanni Corradini)",
    "year": "1467",
    "source": "met",
    "collection": "met-old-masters-collection",
    "imagePath": "images-eink/met/met-old-masters-collection/met-435848.webp",
    image: require('./images-eink/met/met-old-masters-collection/met-435848.webp')
  },
  {
    "id": "436102",
    "title": "Virgin and Child with Four Angels",
    "author": "Gerard David",
    "year": "ca. 1510–15",
    "source": "met",
    "collection": "met-old-masters-collection",
    "imagePath": "images-eink/met/met-old-masters-collection/met-436102.webp",
    image: require('./images-eink/met/met-old-masters-collection/met-436102.webp')
  },
  {
    "id": "436122",
    "title": "The Collector of Prints",
    "author": "Edgar Degas",
    "year": "1866",
    "source": "met",
    "collection": "met-old-masters-collection",
    "imagePath": "images-eink/met/met-old-masters-collection/met-436122.webp",
    image: require('./images-eink/met/met-old-masters-collection/met-436122.webp')
  },
  {
    "id": "436144",
    "title": "James-Jacques-Joseph Tissot (1836–1902)",
    "author": "Edgar Degas",
    "year": "ca. 1867–68",
    "source": "met",
    "collection": "met-old-masters-collection",
    "imagePath": "images-eink/met/met-old-masters-collection/met-436144.webp",
    image: require('./images-eink/met/met-old-masters-collection/met-436144.webp')
  },
  {
    "id": "436492",
    "title": "Saint Christopher and the Infant Christ",
    "author": "Domenico Ghirlandaio (Domenico Bigordi)",
    "year": "",
    "source": "met",
    "collection": "met-old-masters-collection",
    "imagePath": "images-eink/met/met-old-masters-collection/met-436492.webp",
    image: require('./images-eink/met/met-old-masters-collection/met-436492.webp')
  },
  {
    "id": "437756",
    "title": "The Japanese Robe",
    "author": "Alfred Stevens",
    "year": "ca. 1872",
    "source": "met",
    "collection": "met-old-masters-collection",
    "imagePath": "images-eink/met/met-old-masters-collection/met-437756.webp",
    image: require('./images-eink/met/met-old-masters-collection/met-437756.webp')
  },
  {
    "id": "438490",
    "title": "Interior of the Oude Kerk, Delft",
    "author": "Emanuel de Witte",
    "year": "probably 1650",
    "source": "met",
    "collection": "met-old-masters-collection",
    "imagePath": "images-eink/met/met-old-masters-collection/met-438490.webp",
    image: require('./images-eink/met/met-old-masters-collection/met-438490.webp')
  },
  {
    "id": "53427",
    "title": "Six Jewel Rivers",
    "author": "Sakai Ōho",
    "year": "ca. 1839",
    "source": "met",
    "collection": "met-old-masters-collection",
    "imagePath": "images-eink/met/met-old-masters-collection/met-53427.webp",
    image: require('./images-eink/met/met-old-masters-collection/met-53427.webp')
  },
  {
    "id": "53449",
    "title": "Six Jewel Rivers from Various Provinces",
    "author": "Utagawa Hiroshige",
    "year": "1857",
    "source": "met",
    "collection": "met-old-masters-collection",
    "imagePath": "images-eink/met/met-old-masters-collection/met-53449.webp",
    image: require('./images-eink/met/met-old-masters-collection/met-53449.webp')
  }
];

const MET_PORTRAIT_FIGURE_COLLECTION_WALLPAPERS = [
  {
    "id": "372898",
    "title": "Draped Figure Reclining",
    "author": "James McNeill Whistler",
    "year": "1892",
    "source": "met",
    "collection": "met-portrait-figure-collection",
    "imagePath": "images-eink/met/met-portrait-figure-collection/met-372898.webp",
    image: require('./images-eink/met/met-portrait-figure-collection/met-372898.webp')
  },
  {
    "id": "436543",
    "title": "Josefa de Castilla Portugal y van Asbrock de Garcini (1775–about 1850)",
    "author": "Goya (Francisco de Goya y Lucientes)",
    "year": "1804",
    "source": "met",
    "collection": "met-portrait-figure-collection",
    "imagePath": "images-eink/met/met-portrait-figure-collection/met-436543.webp",
    image: require('./images-eink/met/met-portrait-figure-collection/met-436543.webp')
  },
  {
    "id": "436545",
    "title": "Manuel Osorio Manrique de Zuñiga (1784–1792)",
    "author": "Goya (Francisco de Goya y Lucientes)",
    "year": "1787–88",
    "source": "met",
    "collection": "met-portrait-figure-collection",
    "imagePath": "images-eink/met/met-portrait-figure-collection/met-436545.webp",
    image: require('./images-eink/met/met-portrait-figure-collection/met-436545.webp')
  },
  {
    "id": "437056",
    "title": "Tommaso di Folco Portinari (1428–1501); Maria Portinari (Maria Maddalena Baroncelli, born 1456)",
    "author": "Hans Memling",
    "year": "ca. 1470",
    "source": "met",
    "collection": "met-portrait-figure-collection",
    "imagePath": "images-eink/met/met-portrait-figure-collection/met-437056.webp",
    image: require('./images-eink/met/met-portrait-figure-collection/met-437056.webp')
  },
  {
    "id": "438815",
    "title": "Madame Georges Charpentier (Marguerite-Louise Lemonnier, 1848–1904) and Her Children, Georgette-Berthe (1872–1945) and Paul-Emile-Charles (1875–1895)",
    "author": "Auguste Renoir",
    "year": "1878",
    "source": "met",
    "collection": "met-portrait-figure-collection",
    "imagePath": "images-eink/met/met-portrait-figure-collection/met-438815.webp",
    image: require('./images-eink/met/met-portrait-figure-collection/met-438815.webp')
  },
  {
    "id": "459027",
    "title": "Portrait of a Woman, Possibly a Nun of San Secondo; (verso) Scene in Grisaille",
    "author": "Jacometto (Jacometto Veneziano)",
    "year": "ca. 1485–95",
    "source": "met",
    "collection": "met-portrait-figure-collection",
    "imagePath": "images-eink/met/met-portrait-figure-collection/met-459027.webp",
    image: require('./images-eink/met/met-portrait-figure-collection/met-459027.webp')
  },
  {
    "id": "459028",
    "title": "Portrait of Alvise Contarini(?); (verso) A Tethered Roebuck",
    "author": "Jacometto (Jacometto Veneziano)",
    "year": "ca. 1485–95",
    "source": "met",
    "collection": "met-portrait-figure-collection",
    "imagePath": "images-eink/met/met-portrait-figure-collection/met-459028.webp",
    image: require('./images-eink/met/met-portrait-figure-collection/met-459028.webp')
  },
  {
    "id": "643540",
    "title": "Portrait of a Woman",
    "author": "Giovanni Battista Gaulli (Il Baciccio)",
    "year": "ca. 1670s",
    "source": "met",
    "collection": "met-portrait-figure-collection",
    "imagePath": "images-eink/met/met-portrait-figure-collection/met-643540.webp",
    image: require('./images-eink/met/met-portrait-figure-collection/met-643540.webp')
  },
  {
    "id": "824771",
    "title": "Marie Antoinette in a Park",
    "author": "Elisabeth Louise Vigée Le Brun",
    "year": "ca. 1780–81",
    "source": "met",
    "collection": "met-portrait-figure-collection",
    "imagePath": "images-eink/met/met-portrait-figure-collection/met-824771.webp",
    image: require('./images-eink/met/met-portrait-figure-collection/met-824771.webp')
  }
];

const MET_SEASCAPE_COLLECTION_WALLPAPERS = [
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
];

// 중복 ID 제거를 위해 Map 사용
const ALL_MET_WALLPAPERS = Array.from(
  new Map(
    [
      ...MET_FLORAL_COLLECTION_WALLPAPERS,
      ...MET_IMPRESSIONISM_COLLECTION_WALLPAPERS,
      ...MET_LANDSCAPE_COLLECTION_WALLPAPERS,
      ...MET_OLD_MASTERS_COLLECTION_WALLPAPERS,
      ...MET_PORTRAIT_FIGURE_COLLECTION_WALLPAPERS,
      ...MET_SEASCAPE_COLLECTION_WALLPAPERS
    ].map((item) => [item.id, item])
  ).values()
);

// NASA Wallpapers
const NASA_DEEP_SPACE_COLLECTION_WALLPAPERS = [
  {
    "id": "GSFC_20171208_Archive_e000699",
    "title": "Hubble View of a Nitrogen-Rich Nebula",
    "author": "NASA",
    "year": "2017",
    "source": "nasa",
    "collection": "nasa-deep-space-collection",
    "imagePath": "images-eink/nasa/nasa-deep-space-collection/nasa-gsfc_20171208_archive_e000699.webp",
    image: require('./images-eink/nasa/nasa-deep-space-collection/nasa-gsfc_20171208_archive_e000699.webp')
  },
  {
    "id": "GSFC_20171208_Archive_e001464",
    "title": "Hubble reveals the Ring Nebula’s true shape",
    "author": "NASA",
    "year": "2017",
    "source": "nasa",
    "collection": "nasa-deep-space-collection",
    "imagePath": "images-eink/nasa/nasa-deep-space-collection/nasa-gsfc_20171208_archive_e001464.webp",
    image: require('./images-eink/nasa/nasa-deep-space-collection/nasa-gsfc_20171208_archive_e001464.webp')
  },
  {
    "id": "GSFC_20171208_Archive_e001743",
    "title": "Hubble Images Searchlight Beams from a Preplanetary Nebula",
    "author": "NASA",
    "year": "2017",
    "source": "nasa",
    "collection": "nasa-deep-space-collection",
    "imagePath": "images-eink/nasa/nasa-deep-space-collection/nasa-gsfc_20171208_archive_e001743.webp",
    image: require('./images-eink/nasa/nasa-deep-space-collection/nasa-gsfc_20171208_archive_e001743.webp')
  },
  {
    "id": "GSFC_20171208_Archive_e001955",
    "title": "Hubble reveals heart of Lagoon Nebula",
    "author": "NASA",
    "year": "2017",
    "source": "nasa",
    "collection": "nasa-deep-space-collection",
    "imagePath": "images-eink/nasa/nasa-deep-space-collection/nasa-gsfc_20171208_archive_e001955.webp",
    image: require('./images-eink/nasa/nasa-deep-space-collection/nasa-gsfc_20171208_archive_e001955.webp')
  },
  {
    "id": "GSFC_20171208_Archive_e002076",
    "title": "Hubble Captures Spectacular \"Landscape\" in the Carina Nebula",
    "author": "NASA",
    "year": "2017",
    "source": "nasa",
    "collection": "nasa-deep-space-collection",
    "imagePath": "images-eink/nasa/nasa-deep-space-collection/nasa-gsfc_20171208_archive_e002076.webp",
    image: require('./images-eink/nasa/nasa-deep-space-collection/nasa-gsfc_20171208_archive_e002076.webp')
  },
  {
    "id": "PIA03606",
    "title": "Most Detailed Image of the Crab Nebula",
    "author": "NASA/ESA/JPL/Arizona State Univ.",
    "year": "2005",
    "source": "nasa",
    "collection": "nasa-deep-space-collection",
    "imagePath": "images-eink/nasa/nasa-deep-space-collection/nasa-pia03606.webp",
    image: require('./images-eink/nasa/nasa-deep-space-collection/nasa-pia03606.webp')
  },
  {
    "id": "PIA03678",
    "title": "The Mark of a Dying Star",
    "author": "NASA/JPL-Caltech/ESA",
    "year": "2006",
    "source": "nasa",
    "collection": "nasa-deep-space-collection",
    "imagePath": "images-eink/nasa/nasa-deep-space-collection/nasa-pia03678.webp",
    image: require('./images-eink/nasa/nasa-deep-space-collection/nasa-pia03678.webp')
  },
  {
    "id": "PIA04216",
    "title": "Ant Nebula",
    "author": "NASA/Space Telescope Science Institute",
    "year": "1999",
    "source": "nasa",
    "collection": "nasa-deep-space-collection",
    "imagePath": "images-eink/nasa/nasa-deep-space-collection/nasa-pia04216.webp",
    image: require('./images-eink/nasa/nasa-deep-space-collection/nasa-pia04216.webp')
  },
  {
    "id": "PIA04226",
    "title": "Ghost Head Nebula",
    "author": "NASA, ESA & Mohammad Heydari-Malayeri Observatoire de Paris, France",
    "year": "1999",
    "source": "nasa",
    "collection": "nasa-deep-space-collection",
    "imagePath": "images-eink/nasa/nasa-deep-space-collection/nasa-pia04226.webp",
    image: require('./images-eink/nasa/nasa-deep-space-collection/nasa-pia04226.webp')
  },
  {
    "id": "PIA04921",
    "title": "Andromeda Galaxy",
    "author": "NASA/JPL/California Institute of Technology",
    "year": "2003",
    "source": "nasa",
    "collection": "nasa-deep-space-collection",
    "imagePath": "images-eink/nasa/nasa-deep-space-collection/nasa-pia04921.webp",
    image: require('./images-eink/nasa/nasa-deep-space-collection/nasa-pia04921.webp')
  },
  {
    "id": "PIA05062",
    "title": "The Tarantula Nebula",
    "author": "NASA/JPL-Caltech/Cornell University and University of Leiden",
    "year": "2004",
    "source": "nasa",
    "collection": "nasa-deep-space-collection",
    "imagePath": "images-eink/nasa/nasa-deep-space-collection/nasa-pia05062.webp",
    image: require('./images-eink/nasa/nasa-deep-space-collection/nasa-pia05062.webp')
  },
  {
    "id": "PIA13028",
    "title": "Big Babies in the Rosette Nebula",
    "author": "ESA and the PACS, SPIRE & HSC consortia, F. Motte AIM Saclay,CEA/IRFU - CNRS/INSU - U.ParisDidedrot for the HOBYS key programme",
    "year": "2010",
    "source": "nasa",
    "collection": "nasa-deep-space-collection",
    "imagePath": "images-eink/nasa/nasa-deep-space-collection/nasa-pia13028.webp",
    image: require('./images-eink/nasa/nasa-deep-space-collection/nasa-pia13028.webp')
  },
  {
    "id": "PIA13108",
    "title": "Menkhib and the California Nebula",
    "author": "NASA/JPL-Caltech/UCLA",
    "year": "2010",
    "source": "nasa",
    "collection": "nasa-deep-space-collection",
    "imagePath": "images-eink/nasa/nasa-deep-space-collection/nasa-pia13108.webp",
    image: require('./images-eink/nasa/nasa-deep-space-collection/nasa-pia13108.webp')
  },
  {
    "id": "PIA14091",
    "title": "The van Gogh of the Infrared Sky",
    "author": "NASA/JPL-Caltech/UCLA",
    "year": "2011",
    "source": "nasa",
    "collection": "nasa-deep-space-collection",
    "imagePath": "images-eink/nasa/nasa-deep-space-collection/nasa-pia14091.webp",
    image: require('./images-eink/nasa/nasa-deep-space-collection/nasa-pia14091.webp')
  },
  {
    "id": "PIA14442",
    "title": "Hubble Finds an Hourglass Nebula around a Dying Star",
    "author": "NASA/JPL-Caltech/ESA, the Hubble Heritage Team STScI/AURA",
    "year": "1996",
    "source": "nasa",
    "collection": "nasa-deep-space-collection",
    "imagePath": "images-eink/nasa/nasa-deep-space-collection/nasa-pia14442.webp",
    image: require('./images-eink/nasa/nasa-deep-space-collection/nasa-pia14442.webp')
  },
  {
    "id": "PIA17553",
    "title": "Witch Head Brews Baby Stars",
    "author": "NASA/JPL-Caltech",
    "year": "2013",
    "source": "nasa",
    "collection": "nasa-deep-space-collection",
    "imagePath": "images-eink/nasa/nasa-deep-space-collection/nasa-pia17553.webp",
    image: require('./images-eink/nasa/nasa-deep-space-collection/nasa-pia17553.webp')
  },
  {
    "id": "PIA17563",
    "title": "Crab Nebula, as Seen by Herschel and Hubble",
    "author": "ESA/Herschel/PACS/MESS Key Programme Supernova Remnant Team; NASA, ESA and Allison Loll/Jeff Hester Arizona State University",
    "year": "2013",
    "source": "nasa",
    "collection": "nasa-deep-space-collection",
    "imagePath": "images-eink/nasa/nasa-deep-space-collection/nasa-pia17563.webp",
    image: require('./images-eink/nasa/nasa-deep-space-collection/nasa-pia17563.webp')
  },
  {
    "id": "PIA22568",
    "title": "Cat's Paw Image 1",
    "author": "NASA/JPL-Caltech",
    "year": "2018",
    "source": "nasa",
    "collection": "nasa-deep-space-collection",
    "imagePath": "images-eink/nasa/nasa-deep-space-collection/nasa-pia22568.webp",
    image: require('./images-eink/nasa/nasa-deep-space-collection/nasa-pia22568.webp')
  },
  {
    "id": "PIA23646",
    "title": "Tarantula Nebula Spitzer 2-Color Image",
    "author": "NASA/JPL-Caltech",
    "year": "2020",
    "source": "nasa",
    "collection": "nasa-deep-space-collection",
    "imagePath": "images-eink/nasa/nasa-deep-space-collection/nasa-pia23646.webp",
    image: require('./images-eink/nasa/nasa-deep-space-collection/nasa-pia23646.webp')
  }
];

const NASA_EARTH_ORBIT_COLLECTION_WALLPAPERS = [
  {
    "id": "iss040e007403",
    "title": "Earth Observation",
    "author": "NASA",
    "year": "2014",
    "source": "nasa",
    "collection": "nasa-earth-orbit-collection",
    "imagePath": "images-eink/nasa/nasa-earth-orbit-collection/nasa-iss040e007403.webp",
    image: require('./images-eink/nasa/nasa-earth-orbit-collection/nasa-iss040e007403.webp')
  },
  {
    "id": "iss043e003041",
    "title": "Earth observation taken by the Expedition 43 crew.",
    "author": "Terry Virts",
    "year": "2015",
    "source": "nasa",
    "collection": "nasa-earth-orbit-collection",
    "imagePath": "images-eink/nasa/nasa-earth-orbit-collection/nasa-iss043e003041.webp",
    image: require('./images-eink/nasa/nasa-earth-orbit-collection/nasa-iss043e003041.webp')
  },
  {
    "id": "iss045e013851",
    "title": "Earth Observation from the International Space Station",
    "author": "NASA",
    "year": "2015",
    "source": "nasa",
    "collection": "nasa-earth-orbit-collection",
    "imagePath": "images-eink/nasa/nasa-earth-orbit-collection/nasa-iss045e013851.webp",
    image: require('./images-eink/nasa/nasa-earth-orbit-collection/nasa-iss045e013851.webp')
  },
  {
    "id": "S39-23-020",
    "title": "Aurora Australis, Sinuous Loop",
    "author": "NASA",
    "year": "1991",
    "source": "nasa",
    "collection": "nasa-earth-orbit-collection",
    "imagePath": "images-eink/nasa/nasa-earth-orbit-collection/nasa-s39-23-020.webp",
    image: require('./images-eink/nasa/nasa-earth-orbit-collection/nasa-s39-23-020.webp')
  },
  {
    "id": "S39-23-036",
    "title": "Aurora Australis, Red Crown",
    "author": "NASA",
    "year": "1991",
    "source": "nasa",
    "collection": "nasa-earth-orbit-collection",
    "imagePath": "images-eink/nasa/nasa-earth-orbit-collection/nasa-s39-23-036.webp",
    image: require('./images-eink/nasa/nasa-earth-orbit-collection/nasa-s39-23-036.webp')
  },
  {
    "id": "S39-25-006",
    "title": "Aurora Australis, Spiked, Sinuous Green Airglow",
    "author": "NASA",
    "year": "1991",
    "source": "nasa",
    "collection": "nasa-earth-orbit-collection",
    "imagePath": "images-eink/nasa/nasa-earth-orbit-collection/nasa-s39-25-006.webp",
    image: require('./images-eink/nasa/nasa-earth-orbit-collection/nasa-s39-25-006.webp')
  },
  {
    "id": "sl4-143-4706",
    "title": "View of Skylab space station cluster in Earth orbit from CSM",
    "author": "NASA",
    "year": "2008",
    "source": "nasa",
    "collection": "nasa-earth-orbit-collection",
    "imagePath": "images-eink/nasa/nasa-earth-orbit-collection/nasa-sl4-143-4706.webp",
    image: require('./images-eink/nasa/nasa-earth-orbit-collection/nasa-sl4-143-4706.webp')
  },
  {
    "id": "sl4-143-4707",
    "title": "View of Skylab space station cluster in Earth orbit from CSM",
    "author": "NASA",
    "year": "1974",
    "source": "nasa",
    "collection": "nasa-earth-orbit-collection",
    "imagePath": "images-eink/nasa/nasa-earth-orbit-collection/nasa-sl4-143-4707.webp",
    image: require('./images-eink/nasa/nasa-earth-orbit-collection/nasa-sl4-143-4707.webp')
  }
];

const NASA_SOLAR_SYSTEM_COLLECTION_WALLPAPERS = [
  {
    "id": "PIA00342",
    "title": "The Earth & Moon",
    "author": "NASA/JPL/USGS",
    "year": "1998",
    "source": "nasa",
    "collection": "nasa-solar-system-collection",
    "imagePath": "images-eink/nasa/nasa-solar-system-collection/nasa-pia00342.webp",
    image: require('./images-eink/nasa/nasa-solar-system-collection/nasa-pia00342.webp')
  },
  {
    "id": "PIA02219",
    "title": "Neptune",
    "author": "NASA/JPL",
    "year": "1999",
    "source": "nasa",
    "collection": "nasa-solar-system-collection",
    "imagePath": "images-eink/nasa/nasa-solar-system-collection/nasa-pia02219.webp",
    image: require('./images-eink/nasa/nasa-solar-system-collection/nasa-pia02219.webp')
  },
  {
    "id": "PIA03149",
    "title": "Handle-shaped Prominence",
    "author": "ESA/NASA/SOHO",
    "year": "2001",
    "source": "nasa",
    "collection": "nasa-solar-system-collection",
    "imagePath": "images-eink/nasa/nasa-solar-system-collection/nasa-pia03149.webp",
    image: require('./images-eink/nasa/nasa-solar-system-collection/nasa-pia03149.webp')
  },
  {
    "id": "PIA04866",
    "title": "Cassini Jupiter Portrait",
    "author": "NASA/JPL/Space Science Institute",
    "year": "2003",
    "source": "nasa",
    "collection": "nasa-solar-system-collection",
    "imagePath": "images-eink/nasa/nasa-solar-system-collection/nasa-pia04866.webp",
    image: require('./images-eink/nasa/nasa-solar-system-collection/nasa-pia04866.webp')
  },
  {
    "id": "PIA08329",
    "title": "In Saturn Shadow",
    "author": "NASA/JPL/Space Science Institute",
    "year": "2006",
    "source": "nasa",
    "collection": "nasa-solar-system-collection",
    "imagePath": "images-eink/nasa/nasa-solar-system-collection/nasa-pia08329.webp",
    image: require('./images-eink/nasa/nasa-solar-system-collection/nasa-pia08329.webp')
  },
  {
    "id": "PIA12567",
    "title": "Planet Six",
    "author": "NASA/JPL-Caltech/Space Science Institute",
    "year": "2018",
    "source": "nasa",
    "collection": "nasa-solar-system-collection",
    "imagePath": "images-eink/nasa/nasa-solar-system-collection/nasa-pia12567.webp",
    image: require('./images-eink/nasa/nasa-solar-system-collection/nasa-pia12567.webp')
  },
  {
    "id": "PIA12713",
    "title": "High-Phase Plumes",
    "author": "NASA/JPL/Space Science Institute",
    "year": "2010",
    "source": "nasa",
    "collection": "nasa-solar-system-collection",
    "imagePath": "images-eink/nasa/nasa-solar-system-collection/nasa-pia12713.webp",
    image: require('./images-eink/nasa/nasa-solar-system-collection/nasa-pia12713.webp')
  },
  {
    "id": "PIA18033",
    "title": "Earth",
    "author": "NASA",
    "year": "2012",
    "source": "nasa",
    "collection": "nasa-solar-system-collection",
    "imagePath": "images-eink/nasa/nasa-solar-system-collection/nasa-pia18033.webp",
    image: require('./images-eink/nasa/nasa-solar-system-collection/nasa-pia18033.webp')
  },
  {
    "id": "PIA20016",
    "title": "Peering Through Titan Haze",
    "author": "NASA/JPL/University of Arizona/University of Idaho",
    "year": "2015",
    "source": "nasa",
    "collection": "nasa-solar-system-collection",
    "imagePath": "images-eink/nasa/nasa-solar-system-collection/nasa-pia20016.webp",
    image: require('./images-eink/nasa/nasa-solar-system-collection/nasa-pia20016.webp')
  },
  {
    "id": "PIA21046",
    "title": "Saturn, Approaching Northern Summer",
    "author": "NASA/JPL-Caltech/Space Science Institute",
    "year": "2016",
    "source": "nasa",
    "collection": "nasa-solar-system-collection",
    "imagePath": "images-eink/nasa/nasa-solar-system-collection/nasa-pia21046.webp",
    image: require('./images-eink/nasa/nasa-solar-system-collection/nasa-pia21046.webp')
  },
  {
    "id": "PIA22946",
    "title": "Jupiter Marble",
    "author": "NASA",
    "year": "2019",
    "source": "nasa",
    "collection": "nasa-solar-system-collection",
    "imagePath": "images-eink/nasa/nasa-solar-system-collection/nasa-pia22946.webp",
    image: require('./images-eink/nasa/nasa-solar-system-collection/nasa-pia22946.webp')
  }
];

// 중복 ID 제거를 위해 Map 사용
const ALL_NASA_WALLPAPERS = Array.from(
  new Map(
    [
      ...NASA_DEEP_SPACE_COLLECTION_WALLPAPERS,
      ...NASA_EARTH_ORBIT_COLLECTION_WALLPAPERS,
      ...NASA_SOLAR_SYSTEM_COLLECTION_WALLPAPERS
    ].map((item) => [item.id, item])
  ).values()
);

/**
 * 모든 wallpaper 소스 (단일 source of truth)
 * @type {Record<string, WallpaperSource>}
 */
export const WALLPAPER_SOURCES = {
  met: {
    id: "met",
    name: "The Met Museum",
    collections: {
      "all-met": {
        "id": "all-met",
        "name": "All Met Collection",
        wallpapers: ALL_MET_WALLPAPERS
      },
      "met-floral-collection": {
        "id": "met-floral-collection",
        "name": "Floral & Botanical Collection",
        wallpapers: MET_FLORAL_COLLECTION_WALLPAPERS
      },
      "met-impressionism-collection": {
        "id": "met-impressionism-collection",
        "name": "Impressionism Collection",
        wallpapers: MET_IMPRESSIONISM_COLLECTION_WALLPAPERS
      },
      "met-landscape-collection": {
        "id": "met-landscape-collection",
        "name": "Landscape Collection",
        wallpapers: MET_LANDSCAPE_COLLECTION_WALLPAPERS
      },
      "met-old-masters-collection": {
        "id": "met-old-masters-collection",
        "name": "Old Masters Collection",
        wallpapers: MET_OLD_MASTERS_COLLECTION_WALLPAPERS
      },
      "met-portrait-figure-collection": {
        "id": "met-portrait-figure-collection",
        "name": "Portrait & Figure Collection",
        wallpapers: MET_PORTRAIT_FIGURE_COLLECTION_WALLPAPERS
      },
      "met-seascape-collection": {
        "id": "met-seascape-collection",
        "name": "Seascape Collection",
        wallpapers: MET_SEASCAPE_COLLECTION_WALLPAPERS
      }
    },
  },
  nasa: {
    id: "nasa",
    name: "NASA",
    collections: {
      "all-nasa": {
        "id": "all-nasa",
        "name": "All NASA Collection",
        wallpapers: ALL_NASA_WALLPAPERS
      },
      "nasa-deep-space-collection": {
        "id": "nasa-deep-space-collection",
        "name": "Deep Space",
        wallpapers: NASA_DEEP_SPACE_COLLECTION_WALLPAPERS
      },
      "nasa-earth-orbit-collection": {
        "id": "nasa-earth-orbit-collection",
        "name": "Earth Orbit",
        wallpapers: NASA_EARTH_ORBIT_COLLECTION_WALLPAPERS
      },
      "nasa-solar-system-collection": {
        "id": "nasa-solar-system-collection",
        "name": "Solar System",
        wallpapers: NASA_SOLAR_SYSTEM_COLLECTION_WALLPAPERS
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
 * 특정 소스의 모든 컬렉션을 반환한다. (all 컬렉션은 항상 맨 처음)
 * @param {"met" | "nasa"} sourceId - 소스 ID
 * @returns {WallpaperCollection[]}
 */
export function getCollections(sourceId) {
  const source = WALLPAPER_SOURCES[sourceId];
  if (!source) return [];
  
  const collections = Object.values(source.collections);
  // all 컬렉션을 맨 앞으로 정렬
  return collections.sort((a, b) => {
    if (a.id.startsWith('all-')) return -1;
    if (b.id.startsWith('all-')) return 1;
    return 0;
  });
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
