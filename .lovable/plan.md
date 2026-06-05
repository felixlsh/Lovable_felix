## 1. 텍스트 수정

### `src/pages/ProjectDetail.tsx` (Live embed 섹션)
- L200: `{project.title} · Live` → `{project.title}`로 단순화 (이미 제목에 "대시보드"가 포함됨)
- L201–203: "실시간으로 동기화되는 Looker Studio 대시보드입니다." → **프로젝트별 동적 카피**로 교체.
  - election-dashboard: "Streamlit으로 배포된 실시간 개표 추이 대시보드입니다."
  - 그 외(룩커 기반): 기존 문구 유지
  - 구현: `project.slug === "election-dashboard"` 분기 또는 `project` 데이터에 `embedCaption`, `embedAppName`, `embedPoweredBy` 옵셔널 필드 추가 (후자가 깔끔). 데이터 모델 확장 채택.
- L217: `ROK Live Dashboard` → `project.embedAppName ?? project.title`
- L219: `Powered by Looker Studio` → `project.embedPoweredBy ?? "Powered by Looker Studio"`

### `src/data/projects.ts`
- `Project` 타입에 `embedAppName?: string`, `embedPoweredBy?: string`, `embedCaption?: string` 추가
- election-dashboard 항목에:
  - `embedAppName: "서울시장 개표 추이 대시보드"`
  - `embedPoweredBy: "Powered by Streamlit"`
  - `embedCaption: "Streamlit Cloud에 배포된 실시간 개표 추이 대시보드입니다."`

### `src/components/portfolio/ElectionProject.tsx`
- L251 윈도우 chrome 제목 `Seoul Mayor · Live Tally` → `서울시장 개표 추이 대시보드`
- 서브 라벨 `Powered by Streamlit`은 그대로 유지

---

## 2. 메인 페이지 ElectionProject 카드 UI 최적화

현재 이슈
- 임베드 높이가 `lg:h-[820px] max-h-[88vh]` 로 과도하게 큼 → 스크롤 피로
- 사이드 컬럼의 `Live Demo` CTA가 임베드 윈도우 헤더의 LIVE 칩/임베드 자체와 기능 중복
- Pipeline 5-스텝이 lg에서 카드 폭이 좁아 아이콘+텍스트가 답답
- 헤더의 `LIVE` 칩과 임베드 헤더의 `LIVE` 칩이 중복

개선안 (한 컴포넌트 내 정리, 기능 변경 없음)

1) **헤더 슬림화 + 메트릭 인라인화**
   - 상단 헤더 우측 `LIVE` 칩 제거 (임베드 윈도우에만 유지)
   - 헤더 우측에 `100% 자동화` 메트릭과 `Live Demo →` 텍스트 링크를 인라인 배치하여 사이드 컬럼의 KEY OUTCOME · Live Demo CTA 중복 제거

2) **그리드 재배치 (5열 → 3열 균형)**
   - 기존: `lg:grid-cols-5` (phases 3 / side 2)
   - 변경: `lg:grid-cols-3` (phases 2 / side 1), Phases 카드는 폭이 넓어져 가독성 ↑
   - 사이드 컬럼은 `TECH STACK`만 남기고 슬림하게. KEY OUTCOME 카드는 헤더로 흡수, Live Demo CTA는 헤더와 임베드 헤더에 통합

3) **Architecture 파이프라인 컴팩트화**
   - 카드 패딩 `p-4` → `p-3`, 아이콘 `h-9 w-9` → `h-8 w-8`
   - lg에서 `flex-row` 카드 내부 정렬을 세로 정렬(`lg:flex-col items-start`) 대신 가로 정렬로 통일, 텍스트는 `text-[11px]/leading-tight`
   - Chevron 사이즈 축소(`h-4 w-4`)로 카드 폭 확보
   - 섹션 헤더 우측에 작은 step counter (`5 stages`) 유지

4) **임베드 윈도우 높이 합리화 + 컨트롤 추가**
   - 높이: `h-[60vh] min-h-[420px] sm:h-[640px] lg:h-[680px] lg:max-h-[78vh]` 로 축소
   - 윈도우 헤더 우측에 `새 창에서 열기` 아이콘 버튼(ExternalLink) 추가 — 풀뷰가 필요한 사용자를 위해
   - 로딩 스켈레톤은 그대로 유지

5) **그라데이션·테두리 정리**
   - 헤더 영역 hover 효과는 유지하되, 메트릭 흡수 후 양옆 정렬 강화 (`items-center`)
   - 아키텍처 카드와 임베드 윈도우 사이 간격 `mb-5` → `mb-6` 로 호흡

## 변경 파일
- `src/pages/ProjectDetail.tsx`
- `src/data/projects.ts`
- `src/components/portfolio/ElectionProject.tsx`
