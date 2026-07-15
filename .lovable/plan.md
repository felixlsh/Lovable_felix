## 목표
업로드된 PDF(`선거_개표_최종_분석_결과_·_Streamlit.pdf`, 1페이지 A2)를 election-dashboard 상세 페이지의 **갤러리 섹션(기존 8번 렌더링 슬롯)** 에 "주요 차트" 스크린샷으로 첨부합니다.

## 처리 순서

### 1. PDF → PNG 변환
- `pdftoppm`(poppler)로 300 DPI PNG 렌더링 → `/tmp/election-chart.png`.
- A2 세로가 커서 결과 이미지 폭을 최대 2400px로 리사이즈 (선명도/용량 균형).

### 2. Lovable Asset 등록
- `lovable-assets create --file /tmp/election-chart.png --filename election-final-analysis.png > src/assets/election-final-analysis.png.asset.json`
- 자산은 CDN에서 서빙 (PDF 원본은 리포에 복사하지 않음).

### 3. `src/data/projects.ts`
`election-dashboard` 프로젝트에 `galleries` 필드 추가:

```ts
galleries: [
  {
    title: "주요 차트",
    subtitle: "Streamlit 대시보드에서 산출된 최종 분석 결과입니다.",
    images: [electionFinalAnalysis.url],
  },
]
```

파일 상단에 `import electionFinalAnalysis from "@/assets/election-final-analysis.png.asset.json"` 추가.

## 렌더링 결과
election-dashboard 상세 페이지 8번 위치의 기존 `{project.galleries && ...}` 블록이 자동으로 활성화되어, "주요 차트" 섹션에 단일 이미지가 `aspect-[16/7]` 카드로 표시됩니다. 클릭 시 기존 라이트박스로 확대 조회 가능.

## 변경하지 않는 것
- `ProjectDetail.tsx` 코드는 이미 갤러리 조건부 렌더링을 지원하므로 수정 없음.
- 다른 프로젝트 데이터/컴포넌트 변경 없음.
- 카드 클릭 시 라우팅(모달이 아닌 상세 페이지) 유지 — 이전 대화에서 확정된 방향.
