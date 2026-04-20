const NON_ASCII_PATTERN = /[^\x00-\x7F]/;
const HANGUL_SYLLABLE_PATTERN = /[\uac00-\ud7a3]/;

const NMK_AUTHOR_EXACT_MAP = new Map([
  ["한국", "Korea"],
  ["한국 - 고려", "Korea - Goryeo"],
  ["한국 - 낙랑", "Korea - Nangnang"],
  ["한국 - 신라", "Korea - Silla"],
  ["한국 - 조선", "Korea - Joseon"],
  ["한국 - 통일신라", "Korea - Unified Silla"],
]);

const NMK_TITLE_EXACT_MAP = new Map([
  [
    "「귀를 씻는 허유」 이야기가 그려진 거울",
    'Mirror with the Story of Xu You Washing His Ears',
  ],
  [
    "「함통육세을유」이 새겨진 시공사 쇠북",
    'Temple Iron Gong Inscribed "Xiantong 6, Yiyou"',
  ],
  ["靑銅製彩畵筐金具", "Bronze Gilt Fittings with Painted Basket Motif"],
  ["靑銅釋迦如來立像", "Bronze Standing Shakyamuni Buddha"],
  [
    "감산사 석조미륵보살입상",
    "Stone Standing Maitreya Bodhisattva from Gamsansa Temple",
  ],
  [
    "감산사 석조아미타불입상",
    "Stone Standing Amitabha Buddha from Gamsansa Temple",
  ],
  ["겨울 산수", "Winter Landscape"],
  ["금관", "Gold Crown"],
  ["금동 관음보살 입상", "Gilt-bronze Standing Avalokitesvara Bodhisattva"],
  ["금동 보살 입상", "Gilt-bronze Standing Bodhisattva"],
  ["금동 석가불 입상", "Gilt-bronze Standing Shakyamuni Buddha"],
  ["금동 약사불 입상", "Gilt-bronze Standing Bhaisajyaguru Buddha"],
  ["금동약사불입상", "Gilt-bronze Standing Bhaisajyaguru Buddha"],
  ["금제 띠고리", "Gold Belt Ornament"],
  ["꽃과 풀벌레", "Flowers and Insects"],
  ["눈속에 매화를 찾아", "Searching for Plum Blossoms in Snow"],
  ["물을 바라보는 선비", "Scholar Looking at Water"],
  [
    "백자 철화 포도 원숭이무늬 항아리",
    "White Porcelain Jar with Iron-painted Grapes and Monkey Design",
  ],
  ["별구름무늬거울", "Mirror with Star-and-Cloud Pattern"],
  ["산수그림", "Landscape Painting"],
  ["석조약사불좌상", "Stone Seated Bhaisajyaguru Buddha"],
  ["어미개와 강아지", "Mother Dog and Puppies"],
  ["이길보 초상", "Portrait of Yi Gilbo"],
  ["정곤수 초상", "Portrait of Jeong Gonsu"],
  ["정리자 활자", "Jeongnija Metal Type"],
  [
    "중희당 친림대정시 갱운시병",
    "Folding Screen of Royal Poems from Junghuidang Hall",
  ],
  ["철제여래좌상 및 여진비", "Iron Seated Buddha and Votive Stele"],
  ["청동 모란 무늬 거울", "Bronze Mirror with Peony Pattern"],
  ["청동 봉황 무늬 손잡이 거울", "Bronze Hand Mirror with Phoenix Pattern"],
  ["청동 종 모양 매다는 거울", "Bronze Bell-shaped Pendant Mirror"],
  ["청자 뚜껑 잔", "Celadon Covered Cup"],
  [
    "청자 상감 구름 학 무늬 네귀 항아리",
    "Celadon Four-handled Jar with Inlaid Cloud and Crane Design",
  ],
  [
    "청자 상감 모란 줄기 무늬 기름병",
    "Celadon Oil Bottle with Inlaid Peony Scroll Design",
  ],
  ["청자 상감 연꽃 넝쿨 무늬 합", "Celadon Box with Inlaid Lotus Vine Design"],
  ["청자 음각 모란 무늬 사각 접시", "Celadon Square Dish with Incised Peony Design"],
  [
    "청자 음각 모란 상감 보자기무늬 뚜껑 매병",
    "Celadon Prunus Vase with Incised Peony and Inlaid Wrapping-cloth Lid",
  ],
  ["청자 참외 모양 병", "Celadon Melon-shaped Bottle"],
  [
    "청자 철채 퇴화 잎무늬 매병",
    "Celadon Prunus Vase with Iron-painted and Slip-brushed Leaf Pattern",
  ],
  ["청자 합", "Celadon Box"],
  ["풍랑을 만나 포류하는 배", "Boat Adrift in a Storm"],
  ["홍낙성 초상", "Portrait of Hong Nakseong"],
  ["흑유 완", "Black-glazed Bowl"],
  ["흑유 주전자", "Black-glazed Ewer"],
  ["金製耳飾(太環)", "Gold Earrings (Large Ring)"],
  ["金製耳飾(細環)", "Gold Earrings (Small Ring)"],
  ["金銅觀音坐像", "Gilt-bronze Seated Avalokitesvara"],
]);
const NMK_TITLE_REVERSE_MAP = new Map(
  [...NMK_TITLE_EXACT_MAP.entries()].map(([original, localized]) => [
    localized,
    original,
  ])
);
const NMK_AUTHOR_REVERSE_MAP = new Map(
  [...NMK_AUTHOR_EXACT_MAP.entries()].map(([original, localized]) => [
    localized,
    original,
  ])
);

const CHOSEONG = [
  "g",
  "kk",
  "n",
  "d",
  "tt",
  "r",
  "m",
  "b",
  "pp",
  "s",
  "ss",
  "",
  "j",
  "jj",
  "ch",
  "k",
  "t",
  "p",
  "h",
];

const JUNGSEONG = [
  "a",
  "ae",
  "ya",
  "yae",
  "eo",
  "e",
  "yeo",
  "ye",
  "o",
  "wa",
  "wae",
  "oe",
  "yo",
  "u",
  "wo",
  "we",
  "wi",
  "yu",
  "eu",
  "ui",
  "i",
];

const JONGSEONG = [
  "",
  "k",
  "k",
  "ks",
  "n",
  "nj",
  "nh",
  "t",
  "l",
  "lk",
  "lm",
  "lb",
  "ls",
  "lt",
  "lp",
  "lh",
  "m",
  "p",
  "ps",
  "t",
  "t",
  "ng",
  "t",
  "t",
  "k",
  "t",
  "p",
  "h",
];

function cleanText(value) {
  return String(value ?? "").replace(/\s+/g, " ").trim();
}

function isAsciiText(value) {
  return !NON_ASCII_PATTERN.test(value);
}

function toAsciiFallback(value) {
  return value
    .replace(/[「」]/g, '"')
    .replace(/[《》]/g, '"')
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^\x20-\x7E]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function toTitleCase(value) {
  return value
    .split(" ")
    .filter(Boolean)
    .map((word) => {
      if (!/[a-z]/i.test(word)) return word;
      return word.charAt(0).toUpperCase() + word.slice(1);
    })
    .join(" ");
}

function romanizeHangulSyllable(char) {
  const code = char.charCodeAt(0);
  if (code < 0xac00 || code > 0xd7a3) return char;

  const index = code - 0xac00;
  const choseong = Math.floor(index / 588);
  const jungseong = Math.floor((index % 588) / 28);
  const jongseong = index % 28;

  return `${CHOSEONG[choseong]}${JUNGSEONG[jungseong]}${JONGSEONG[jongseong]}`;
}

function romanizeHangulText(value) {
  if (!HANGUL_SYLLABLE_PATTERN.test(value)) return value;

  let output = "";
  for (const char of value) {
    output += romanizeHangulSyllable(char);
  }
  return output;
}

function translateNmkTitle(title, id) {
  const exact = NMK_TITLE_EXACT_MAP.get(title);
  if (exact) return exact;

  const romanized = romanizeHangulText(title);
  const ascii = toAsciiFallback(romanized);
  if (ascii) return toTitleCase(ascii);

  return `NMK Relic ${id}`;
}

function translateNmkAuthor(author) {
  const exact = NMK_AUTHOR_EXACT_MAP.get(author);
  if (exact) return exact;

  const romanized = romanizeHangulText(author);
  const ascii = toAsciiFallback(romanized);
  if (ascii) return toTitleCase(ascii);

  return "National Museum of Korea";
}

function localizeField({ sourceKey, field, value, id }) {
  const cleaned = cleanText(value);

  if (!cleaned) {
    if (field === "title") return { value: `Artwork ${id}` };
    if (field === "author") return { value: "Unknown author" };
    return { value: "" };
  }

  if (sourceKey !== "nmk") {
    return { value: cleaned };
  }

  if (isAsciiText(cleaned)) {
    return { value: cleaned };
  }

  let localizedValue = "";

  localizedValue =
    field === "title"
      ? translateNmkTitle(cleaned, id)
      : translateNmkAuthor(cleaned);

  if (!localizedValue) {
    localizedValue =
      field === "title" ? `Artwork ${id}` : "Unknown author";
  }

  return {
    value: localizedValue,
    original: cleaned,
  };
}

export function getLocalizedMetadataFields({ sourceKey, id, title, author }) {
  const localizedTitle = localizeField({
    sourceKey,
    field: "title",
    value: title,
    id,
  });
  const localizedAuthor = localizeField({
    sourceKey,
    field: "author",
    value: author,
    id,
  });

  const result = {
    title: localizedTitle.value,
    author: localizedAuthor.value,
  };

  if (localizedTitle.original) {
    result.titleOriginal = localizedTitle.original;
  }

  if (localizedAuthor.original) {
    result.authorOriginal = localizedAuthor.original;
  }

  return result;
}

export function recoverOriginalMetadataField({
  sourceKey,
  field,
  localizedValue,
}) {
  const cleaned = cleanText(localizedValue);
  if (!cleaned) return "";

  if (sourceKey !== "nmk") return "";
  if (field === "title") return NMK_TITLE_REVERSE_MAP.get(cleaned) ?? "";
  if (field === "author") return NMK_AUTHOR_REVERSE_MAP.get(cleaned) ?? "";
  return "";
}
