## 작업
`ElectionProject.tsx`에 **Architecture** 섹션을 신규 추가 — Streamlit 임베드 윈도우 바로 위에 배치하여 크롤링 → 변동 감지 → 대시보드 흐름을 시각적으로 설명.

## 디자인 방향
Mermaid 같은 외부 다이어그램이 아닌, 기존 다크 카드 톤(`bg-gradient-card`, `border-border`, `text-primary-glow`)에 맞춘 **Tailwind 기반 인라인 SVG/플로우 카드**로 구현. 페이지 전체 디자인과 통일감 유지.

## 레이아웃 (한 줄 5단계 파이프라인, 모바일은 세로)

```
[Cloud Server]  →  [Selenium Crawl]  →  [Pandas Change Pt]  →  [시계열 Dataset]  →  [Streamlit App]
   Server          중앙선관위 폴링        변동 시점 필터링         누적 적재            Live Dashboard
```

각 노드:
- 아이콘 (lucide): `Server` → `Globe` → `GitCompare` → `Database` → `LineChart`
- 상단 미니 라벨 (`STEP 01` 등, `text-[10px] tracking-[0.25em]`)
- 노드 제목 (한 줄)
- 한 줄 설명
- 카드: `rounded-xl border border-border bg-card/60 p-4`

연결자:
- 데스크탑(`lg:`): 가로 `ChevronRight` 또는 점선 + 화살촉, `text-primary-glow/60`
- 모바일: 세로 `ChevronDown`

상단에 섹션 헤더:
- 라벨 `ARCHITECTURE`
- 제목 `데이터 흐름 — Crawl · Detect · Visualize`

배치: 현재 컴포넌트에서 "Phases/Side column 그리드" **이후**, "Streamlit 임베드 윈도우" **이전**.

## 변경 파일
- `src/components/portfolio/ElectionProject.tsx` 한 곳만 수정 (신규 섹션 블록 추가, lucide import 확장)
