## 목표
Projects 섹션에 문제-해결-성과(Problem-Solution-Result) 구조의 데이터 분석 사례 카드를 추가하고, Hero 태그라인을 사용자가 제공한 문구로 수정합니다.

## 가정
- **대상 프로젝트**: 기존 `crm-dashboard`를 데이터 분석 사례로 확장합니다(가장 명확한 비즈니스 데이터 문제/해결/성과 스토리).
- **PSR 내용**: 프로젝트 기존 설명을 기반으로 요약한 3단계 구성을 사용합니다.
- **레이아웃**: 기존 프로젝트 그리드 내 단일 카드로 추가합니다(사용자가 "옵션 A"로 선택한 것으로 간주).

## 변경 내용

### 1. `src/data/projects.ts`
- `Project` 타입에 선택적 필드 추가:
  ```ts
  caseStudy?: {
    problem: string;
    solution: string;
    result: string;
  }
  ```
- `crm-dashboard` 객체에 `caseStudy` 데이터 추가:
  - problem: "신규 CRM 이관 후 실적 조회 기능이 부재하여, 실무자가 매일 수기로 데이터를 취합·집계해야 했습니다."
  - solution: "SQL 기반 데이터 파이프라인을 구축하고, Looker Studio로 실적 대시보드를 시각화하여 누구나 손쉽게 조회할 수 있도록 했습니다."
  - result: "수기 집계 작업을 100% 제거하여 실장단이 결제 금액·내역·고객 정보를 즉시 확인할 수 있게 되었습니다."

### 2. `src/components/portfolio/CaseStudyCard.tsx` (신규)
- Problem → Solution → Result 3단계 카드 컴포넌트.
- 기존 `ProjectCard`와 동일한 스타일 토큰 사용:
  - `border border-border bg-gradient-card rounded-2xl`
  - `useInView` + `animate-fade-up`
  - shine/spotlight hover 효과 (CSS 변수 `--mx`, `--my` 기반)
  - `border-primary/40` 테두리 강조
- 단계별 시각 구분: 번호 원 + 구분선 + 단계 라벨(문제/해결/성과) + 본문.

### 3. `src/components/portfolio/Projects.tsx`
- `ProjectCard` / `CaseStudyCard` 조건부 렌더링:
  ```tsx
  {projects.map((p, i) => (
    p.caseStudy ? <CaseStudyCard key={p.slug} p={p} index={i} /> : <ProjectCard key={p.slug} p={p} index={i} />
  ))}
  ```

### 4. `src/components/portfolio/Hero.tsx`
- `h1` 태그라인 문구 변경:
  - **기존**: "데이터의 흐름을 설계하고, 비즈니스의 해답을 시각화합니다."
  - **변경**: "수집부터 분석, 자동화, 시각화까지 비즈니스 의사결정을 위한 End-to-End 데이터 프로젝트를 만듭니다."
- 줄바꿈 구조는 반응형에 맞게 조정하여 가독성 유지.

## 기술적 참고
- `CaseStudyCard`는 기존 카드 호버 상호작용(shine, spotlight)을 그대로 재사용합니다.
- Tailwind 토큰(`border-border`, `bg-gradient-card`, `text-primary-glow` 등)만 사용합니다.
- 기존 5개 프로젝트 중 1개만 `caseStudy` 필드를 가지므로, 나머지 4개는 기존 `ProjectCard` 렌더링에 영향이 없습니다.