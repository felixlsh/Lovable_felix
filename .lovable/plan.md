## 작업 개요

1. **Featured Case Study 컴포넌트 신규 추가** — `RokProject`와 동일한 톤의 강조 섹션을 Hero 바로 아래에 배치
2. **Projects 그리드에 카드 추가** — 기존 4개 카드와 동일한 형식, 상세 페이지(`/projects/election-dashboard`)는 기존 `ProjectDetail` 라우트를 그대로 사용

## 1. 신규 컴포넌트: `src/components/portfolio/ElectionProject.tsx`

`RokProject.tsx` 구조를 참고한 다크 카드 레이아웃:

- **헤더 (클릭 가능, `/projects/election-dashboard`로 이동)**
  - 좌측 아이콘: `Vote` (lucide-react)
  - 라벨: `Featured Case Study`
  - 제목: `제9회 지선 서울시장 개표 추이 실시간 대시보드`
  - 서브카피: 한 줄 요약
  - 우측 상태 칩: `LIVE` (emerald, pulse dot)

- **본문 2단 그리드 (`lg:grid-cols-5`)**
  - 좌 3칸 — **Problem / Action / Result** 3개 스택 카드
    - 각 블록: 단계 라벨(`01 PROBLEM` 등), 제목, 본문. 사용자 제공 문구 그대로 사용(요약 가공)
  - 우 2칸
    - **KEY OUTCOME 카드** (`100%` · `수기 모니터링 리소스 절감`) — RokProject의 그라데이션 카드와 동일 톤
    - **Tech Stack 카드** — Python / Selenium / Pandas / Streamlit / Cloud Server 뱃지 나열
    - **Live Demo 버튼** — `ExternalLink` 아이콘, `https://felixlsh0election.streamlit.app/`로 새 탭 오픈

- **Streamlit 라이브 임베드**
  - RokProject의 윈도우 크롬(트래픽 라이트 + 헤더 + LIVE 칩 + 하단 상태바) 동일 패턴 재사용
  - `<iframe src="https://felixlsh0election.streamlit.app/?embed=true">`, 로딩 스켈레톤 포함
  - 높이: `lg:h-[820px]`, 모바일 대응

## 2. `src/pages/Index.tsx` 순서 변경

```
Hero
ElectionProject  ← 신규
RokProject
Automation
Experience
Projects
Contact
```

## 3. `src/data/projects.ts` 신규 엔트리 추가

`projects` 배열 맨 앞(또는 `rok-dashboard` 위)에 삽입:

```ts
{
  slug: "election-dashboard",
  title: "제9회 지선 서울시장 개표 추이 대시보드",
  org: "Personal Project",
  status: "Done",
  icon: Vote,
  desc: "Selenium으로 선관위 개표 데이터를 실시간 크롤링하고 Pandas로 변동 시점을 감지, Streamlit 웹앱으로 시각화한 실시간 모니터링 대시보드.",
  tags: ["Python", "Selenium", "Streamlit"],
  metric: { v: "100%", l: "모니터링 자동화" },
  externalHref: "https://felixlsh0election.streamlit.app/",
  overview: "...(사용자 제공 기획 의도 통합)",
  role: ["Cloud 서버 기반 Selenium 크롤링 파이프라인 구축", "Pandas 기반 Change Point 감지 로직 구현", "Streamlit 대시보드 설계 및 배포"],
  highlights: [
    { title: "수기 모니터링 100% 제거", body: "수집·가공·시각화 전 과정을 자동화하여 사람이 새로고침할 필요가 없음." },
    { title: "Change Point 실시간 감지", body: "이전 스냅샷과 비교해 변동 시점만 필터링·적재하는 정제 프로세스." },
    { title: "라이브 대시보드 배포", body: "Streamlit으로 누적 추이 라인 차트와 실시간 로그 테이블 제공." },
  ],
  stack: ["Python", "Selenium", "Pandas", "Streamlit", "Cloud Server"],
  embedUrl: "https://felixlsh0election.streamlit.app/?embed=true",
}
```

> 참고: 기존 `ProjectDetail` 페이지는 `embedUrl`을 그대로 렌더링하므로 별도 수정 불필요.

## 변경 파일 요약
- 신규: `src/components/portfolio/ElectionProject.tsx`
- 수정: `src/pages/Index.tsx`, `src/data/projects.ts`
