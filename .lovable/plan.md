## 목표
Projects 섹션의 "제9회 지선 서울시장 개표 추이 대시보드" 카드를 CRM 대시보드처럼 문제-해결-성과(PSR) 구조의 `CaseStudyCard`로 렌더링합니다.

## 변경 파일

### `src/data/projects.ts`
`election-dashboard` 프로젝트에 `caseStudy` 필드 추가 (기존 `overview`/`role`/`highlights` 내용 기반 요약):

- **problem**: "중앙선거관리위원회 개표 현황을 매번 수동으로 새로고침하며 후보별 득표율을 직접 계산해야 하는 비효율이 있었습니다."
- **solution**: "Cloud 서버에서 Selenium으로 실시간 크롤링하고, Pandas로 Change Point만 필터링·적재한 뒤 Streamlit 대시보드로 시계열 시각화했습니다."
- **result**: "수집·가공·시각화 전 과정을 완전 자동화하여 수기 모니터링을 100% 제거하고, 라이브 URL로 개표 변동 추이를 실시간 확인할 수 있게 되었습니다."

## 변경하지 않는 것
- `CaseStudyCard.tsx`, `Projects.tsx` 는 기존 조건부 렌더링(`p.caseStudy ? ...`)이 이미 있으므로 코드 수정 불필요.
- 프로젝트의 나머지 필드(`overview`, `role`, `highlights`, `stack`, embed 등)는 상세 페이지에서 그대로 사용되므로 유지.

## 결과
Projects 그리드에서 CRM 카드와 election 카드 모두 PSR 구조의 CaseStudyCard로 표시됩니다.
