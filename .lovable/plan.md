## 요약
`Automation.tsx`에서 **Make** 도구를 전부 **Zapier**로 교체하고, **주기적 업무 보고** 카드의 알림 도구를 **Telegram Bot → Discord Bot**으로 변경합니다.

## 상세 작업

### 1. Make → Zapier 교체
- `엑셀 편집 자동화` desc: Make 역할 문구 → Zapier로 변경
- `반복 작업 효율화` desc: Make 역할 문구 → Zapier로 변경, tools 배열에서 "Make" 제거
- `주기적 업무 보고` desc: Make 역할 문구 → Zapier로 변경, tools 배열에서 "Make" → "Zapier"로 교체

### 2. 주기적 업무 보고 카드 내용 변경
- **데이터 흐름**: "Zapier가 정기 트리거로 데이터 수집을 시작하면 Make가 가공·시각화·배포 시나리오를 실행" → "Zapier가 정기 트리거로 데이터를 수집하고 가공·시각화·배포 시나리오를 실행"
- **알림 도구**: "Telegram Bot" → "Discord Bot"
- **알림 문구**: "Telegram Bot은 완료 알림과 핵심 지표 요약을 매일 정해진 시간에 자동 전달" → "Discord Bot은 완료 알림과 핵심 지표 요약을 매일 정해진 시간에 자동 전달"

## 변경 대상 파일
- `src/components/portfolio/Automation.tsx`