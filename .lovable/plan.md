## 목표
Hero 컴포넌트의 CORE STACK 배지 섹션에 Zapier를 추가합니다.

## 변경 내용

### src/components/portfolio/Hero.tsx
- `react-icons/si`에서 `SiZapier` 아이콘 임포트 추가
- `stacks` 배열 마지막에 Zapier 항목 추가:
  - label: "Zapier"
  - color: "from-orange-500/20 to-orange-500/5" (Zapier 브랜드 컬러 기반)
  - Icon: SiZapier
  - iconColor: "#FF4A00"
  - desc: "다양한 웹 서비스 간 워크플로우 자동화 연동"

## 기술적 참고
- 이미 Hero.tsx에는 CORE STACK 배지 렌더링 로직이 완비되어 있어, stacks 배열에 객체만 추가하면 UI에 자동 반영됩니다.
- `SiZapier`가 react-icons/si에 없는 경우, lucide-react의 `Zap` 아이콘으로 대체하거나 SVG를 직접 사용합니다.