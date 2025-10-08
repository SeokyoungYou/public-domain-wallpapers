# Wallpaper Quality Guide

이 문서는 `public-domain-wallpapers` 패키지에 포함되는 배경화면과 메타데이터를 준비할 때 준수해야 하는 품질 기준을 정리합니다.

## 해상도 & 비율

- 데스크톱: 3840x2160 (4K) 또는 2560x1440 (QHD)
- 모바일: 1170x2532 또는 비슷한 세로형 비율
- 필요 시 태블릿, 초광폭 등 추가 폼팩터를 제공할 수 있습니다.

## 파일 포맷 & 용량

- 포맷: JPG 또는 WEBP
- 4K 버전: 최대 3MB
- 모바일 버전: 최대 500KB
- 색공간: sRGB 내보내기를 기본으로 합니다.

## 파일명 규칙

```
{source}-{id}-{slug}-{size}.jpg
```

- `source`: met, cma, aic, smithsonian 등 기관 약어
- `id`: 기관에서 제공하는 고유 식별자
- `slug`: 작품 제목을 소문자-케밥케이스로 변환
- `size`: 4k, qhd, mobile 등 해상도 태그

예시: `met-436535-hokusai-great-wave-4k.jpg`

## 메타데이터 작성

- 각 이미지에 대해 `metadata/*.json` 파일을 생성합니다.
- `metadata/schema.json`을 참고하여 필드를 채웁니다.
- `license` 값은 `CC0` 또는 `Public Domain` 중 하나여야 합니다.
- `image` 필드에는 패키지 내 상대 경로를 기재합니다.

## 출처 검증

- Open Access 또는 CC0 정책을 명시한 기관 자료만 사용합니다.
- 다운로드 페이지를 즐겨찾기하거나 아카이브하여 검증 기록을 남깁니다.
- 라이선스 변경 여부를 주기적으로 확인합니다.
