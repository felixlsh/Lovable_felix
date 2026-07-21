# 시네마틱 동적 배경 적용 계획

전체 페이지 배경을 정적인 radial gradient에서 **부드럽게 움직이는 시네마틱 배경**으로 교체합니다. 다크 톤(현재 딥 네이비/블루)을 유지하면서 데이터·기술 포트폴리오 분위기에 맞는 절제된 무드로 갑니다.

## 시각 컨셉

- **레이어 1 — 컬러 오브(Aurora Orbs)**: primary/청록/보라 색의 큰 blur 오브 3~4개가 30~40초 주기로 아주 천천히 이동·스케일. 화면 전체를 은은하게 물들이는 시네마틱 라이팅 효과.
- **레이어 2 — 그리드/노이즈**: 기존 `grid-bg` + 얇은 필름 그레인(SVG noise) 오버레이로 아날로그 질감. 노이즈는 매우 낮은 opacity(2~4%)로 정적 유지.
- **레이어 3 — 비네트**: 상하 가장자리를 살짝 어둡게 해 시네마틱 프레이밍.
- 기존 `data-network` 도트 패턴은 Hero 내부 로컬 데코로 유지, 전역 배경에서는 제거하지 않고 그대로 둠.

## 구현 위치

- `src/index.css` `body` 배경을 시네마틱 스택으로 교체:
  - `body::before` → 움직이는 aurora 오브들(고정 위치, `position: fixed; z-index: -2`)
  - `body::after` → 노이즈 + 비네트(`z-index: -1`)
  - 기존 `--gradient-radial` 은 초기 페인트용 fallback으로 유지
- `@keyframes aurora-drift`(translate + scale), `aurora-hue`(선택적으로 아주 미세한 hue-rotate) 추가. 지속시간 30~45s, `ease-in-out` `infinite alternate`.
- **`prefers-reduced-motion: reduce`** 시 애니메이션 정지(정적 그라디언트만 노출).
- 라이트 모드(`.light`)에서는 오브 opacity를 낮추고 밝은 톤으로 재정의.

## 성능·접근성

- `will-change: transform` 만 적용, `filter: blur()` 는 오브 자체에 고정값(움직임에 blur 재계산 없음).
- 배경 요소는 모두 `pointer-events: none`.
- 콘텐츠 위 대비 유지 위해 오브 총 opacity 상한 ~0.35.

## 변경 파일

- `src/index.css` (배경 스택 + keyframes + reduced-motion)

## 확인

- 빌드 통과, 다크/라이트 모드, reduced-motion 각각 시각 확인.
