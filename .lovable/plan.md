## 작업 개요
`src/components/portfolio/Automation.tsx`의 각 자동화 카드 설명(desc)을 확장하여 AutoHotkey, Zapier, Make, Telegram Bot이 각각 어떤 역할을 수행하는지 1~2줄씩 명시적으로 추가합니다.

## 변경 사항

### Automation.tsx — automation 배열 desc 필드 확장

**1. 엑셀 편집 자동화** (tools: AutoHotkey, Make)
- 기존: "AutoHotkey 스크립트로 포맷 변환, 셀 병합·정리 작업을 단일 핫키로 처리하고, Make 시나리오로 결과 파일을 자동 백업·공유."
- 변경: AutoHotkey가 핫키 기반 엑셀 조작을 처리하고, Make가 결과 파일의 자동 백업·공유를 담당한다는 내용을 더 명확하게 분리하여 서술.

**2. 반복 작업 효율화** (tools: AutoHotkey, Zapier, Make)
- 기존: "보고서 생성·파일 분류·메일 발송 등 반복 업무를 AutoHotkey 매크로와 Zapier·Make 워크플로우로 연결해 트리거 기반으로 실행."
- 변경: AutoHotkey가 로컬 반복 매크로 실행, Zapier가 앱 간 간단한 트리거 연결, Make가 복잡한 시나리오 자동화를 담당한다는 역할을 명확히 분리.

**3. 단축키 기반 워크플로우** (tools: AutoHotkey, Telegram Bot)
- 기존: "솔루션 진행 추적, 데이터 전처리 단계를 글로벌 핫키로 호출하고, 실행 로그를 Telegram Bot으로 즉시 푸시 받아 진행 상황 확인."
- 변경: AutoHotkey가 글로벌 핫키 호출, Telegram Bot이 실시간 푸시 알림을 담당한다는 역할 분리.

**4. 주기적 업무 보고** (tools: Zapier, Make, Telegram Bot)
- 기존: "Zapier·Make로 데이터 수집 → 가공 → 시각화 → 배포 파이프라인을 스케줄링하고, 완료 알림과 핵심 지표를 Telegram Bot으로 자동 전달."
- 변경: Zapier가 트리거 기반 간단 연결, Make가 데이터 수집·가공·시각화·배포 시나리오 구축, Telegram Bot이 완료 알림·핵심 지표 전달을 담당한다는 역할을 명확히 분리.