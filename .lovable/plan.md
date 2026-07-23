# Projects 섹션 태그 필터 추가

`src/components/portfolio/Projects.tsx`에 태그 기반 필터 UI를 추가해 프로젝트를 손쉽게 좁혀볼 수 있게 합니다. 데이터 스키마와 카드 컴포넌트는 그대로 두고, Projects 컨테이너에만 필터 상태/UI를 얹습니다.

## UI

헤더 아래, 그리드 위에 얇은 필터 바를 배치합니다.

```text
[ All · 5 ]  [ Python · 3 ]  [ SQL · 1 ]  [ Streamlit · 1 ]  [ Looker Studio · 2 ]  ...
```

- 각 칩: `text-xs` 라운드 필(pill), 비활성은 `bg-muted/40 text-muted-foreground border-border`, 활성은 `bg-primary/15 text-primary-glow border-primary/40`.
- 각 칩 오른쪽에 프로젝트 개수 뱃지(`text-[10px] opacity-70`).
- 좌우로 스크롤 가능한 flex-wrap 컨테이너 (`flex flex-wrap gap-2`), 모바일에서도 자연스러운 랩.
- 진입 시 헤더와 같은 `animate-fade-up` (딜레이 60ms).

## 동작

- `useState<string>("All")` 하나로 관리 — 단일 선택 방식(다중 필터는 이 단계에선 오버스펙).
- 태그 목록은 `projects` 배열에서 `useMemo`로 도출: 등장 빈도 내림차순, 동률이면 원본 순서.
- 필터 적용: `selected === "All" ? projects : projects.filter(p => p.tags.includes(selected))`.
- 필터링된 배열을 그대로 기존 렌더 분기(`caseStudy ? CaseStudyCard : ProjectCard`)로 전달 — 카드 로직/키/애니메이션 인덱스 유지.
- 결과가 0개일 때: 그리드 자리에 `col-span-full` 안내 문구 ("해당 태그의 프로젝트가 없어요") + "All 보기" 리셋 버튼.

## 범위 밖

- `Project` 타입, 카드 디자인, `CaseStudyCard`, 상세 페이지, 사이드바 네비게이션은 변경하지 않습니다.
- 검색창/다중 선택/카테고리 그룹핑은 이번 단계에서 넣지 않습니다 (추후 확장 가능).
