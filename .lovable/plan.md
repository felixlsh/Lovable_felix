# Hero 타이포 리듬 조정

`src/components/portfolio/Hero.tsx`의 `<h1>` 한 곳만 수정합니다. 현재 모든 브레이크포인트에서 `leading-[1.2]`로 붙어 있고, 모바일 32px → 데스크톱 60px 계단이 다소 급합니다. 4줄 구성(수집… / 비즈니스… / End-to-End / 데이터…)에서 줄 사이가 답답하게 느껴지는 원인입니다.

## 변경 사항

**클래스 변경 (한 줄)**
- 이전: `text-[2rem] sm:text-4xl md:text-5xl lg:text-6xl leading-[1.2] tracking-tight`
- 이후: `text-[1.75rem] sm:text-[2.25rem] md:text-[2.75rem] lg:text-[3.25rem] leading-[1.28] sm:leading-[1.25] lg:leading-[1.22] tracking-[-0.02em]`

## 왜 이렇게

- **글자 크기**: 모바일 28px → sm 36px → md 44px → lg 52px. 기존 32/36/48/60의 급격한 점프를 완만한 계단으로 바꿔 줄바꿈 지점에서 어색한 크기 차이를 줄입니다.
- **줄간격**: 큰 사이즈일수록 line-height를 살짝 좁혀(1.28 → 1.22) 시각 밸런스를 맞춥니다. 작은 화면에선 여백을 유지해 4줄이 뭉치지 않게 합니다.
- **자간**: `tracking-tight`(-0.025em)에서 `-0.02em`로 살짝 완화. 큰 디스플레이 폰트에서 자모가 붙는 현상을 줄입니다.

## 범위 밖

- 문장/줄바꿈, 색상, 그라데이션, 애니메이션, 아래 문단(`<p>`)은 변경하지 않습니다.
