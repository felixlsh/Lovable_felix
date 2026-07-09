## 목표
Projects 섹션 그리드 안에 **서울시장 개표 대시보드**를 문제-해결-성과(PSR) 3단 구조의 특별 카드로 노출합니다. 기존 `election-dashboard` 항목을 케이스 스터디 카드로 전환합니다.

## 변경 내용

### 1. `src/data/projects.ts`
- `Project` 타입에 optional 필드 추가:
  ```ts
  caseStudy?: {
    problem: string;
    solution: string;
    result: string;
  };
  ```
- `election-dashboard` 프로젝트에 `caseStudy` 필드 채워넣기 (초안):
  - **problem**: 중앙선관위 개표 페이지를 수동으로 새로고침하고 후보별 득표율을 매번 손으로 계산해야 하는 비효율이 존재했음.
  - **solution**: Cloud 서버에서 Selenium으로 개표 데이터를 상시 크롤링, Pandas로 Change Point만 필터링해 적재하고 Streamlit으로 실시간 라인 차트·로그 테이블 대시보드를 배포.
  - **result**: 수기 모니터링을 100% 제거한 무인 대시보드 완성. 개표율 변동 시점마다 후보별 득표율 추이가 자동 축적되어 누구나 URL로 실시간 확인 가능.

> 문구는 초안이며 마감 전에 다듬을 수 있습니다.

### 2. `src/components/portfolio/CaseStudyCard.tsx` (신규)
- `ProjectCard`와 동일한 외곽 스타일(테두리·gradient-card·shine·hover 이펙트·아이콘 헤더·상태 뱃지·metric·태그·`ArrowUpRight`)을 그대로 재사용하되, 본문 영역을 아래 3단 구조로 대체:
  ```text
  ┌───────────────────────────────┐
  │ [icon]         [status badge] │
  │ org                           │
  │ Title                         │
  │ ─────────────────────────────│
  │ PROBLEM   문제 설명 문장       │
  │ SOLUTION  해결 방법 문장       │
  │ RESULT    성과 문장            │
  │ ─────────────────────────────│
  │ tags                  metric  │
  └───────────────────────────────┘
  ```
- 각 단계는 좌측 라벨(예: `PROBLEM`) + 얇은 세로 구분선/도트 + 본문 텍스트. 라벨은 `text-[10px] tracking-[0.25em] text-primary-glow`로 기존 섹션 헤더 스타일과 통일.
- 세 블록은 `border-l border-primary/30 pl-3` + `space-y-3` 로 리듬 부여.
- 카드가 세로로 살짝 길어지지만 그리드 셀 높이는 `items-stretch` 로 자연스럽게 맞춰짐(기존 `md:grid-cols-2` 유지).

### 3. `src/components/portfolio/Projects.tsx`
- `projects.map()` 렌더 시 `p.caseStudy`가 있으면 `CaseStudyCard`, 없으면 기존 `ProjectCard`로 분기.
- 기타 로직·헤더·애니메이션은 그대로 유지.

## 디자인 · 토큰 원칙
- 색상은 전부 기존 시맨틱 토큰(`border-primary/*`, `bg-gradient-card`, `text-primary-glow`, `text-muted-foreground`, `bg-muted/50` 등)만 사용. 하드코딩 색상 금지.
- 폰트는 기존 `font-display` / 기본 sans 그대로. 신규 폰트 로딩 없음.
- 애니메이션은 기존 `useInView` + `animate-fade-up` 재사용, `animationDelay`도 `index * 100ms` 동일.

## 검증
- `bun run build`로 타입/빌드 통과 확인.
- Projects 섹션에서 첫 카드가 PSR 3단 레이아웃으로 렌더되는지, 나머지 4개 카드는 기존과 동일한지 미리보기 확인.
