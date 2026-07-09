import { BarChart3, Gamepad2, Zap, Car, Vote } from "lucide-react";
import type { LucideProps } from "lucide-react";
import type { ComponentType } from "react";
import crmDashboardImg from "@/assets/crm-dashboard.webp";
import rok2489_1 from "@/assets/rok/2489_1.png";
import rok2489_2 from "@/assets/rok/2489_2.png";
import rok2489_3 from "@/assets/rok/2489_3.webp";
import rok2489_4 from "@/assets/rok/2489_4.webp";
import rok2489_5 from "@/assets/rok/2489_5.webp";
import rok1021_1 from "@/assets/rok/1021_1.png";
import rok1021_2 from "@/assets/rok/1021_2.png";
import rok1021_3 from "@/assets/rok/1021_3.png";
import rok1021_4 from "@/assets/rok/1021_4.webp";
import ahk2022 from "@/assets/ahk/2022_sosohan_ahk.png";
import ahk2023 from "@/assets/ahk/2023_dytlab_ahk.png";

export type ProjectGallery = {
  title: string;
  subtitle?: string;
  images: string[];
};

export type Project = {
  slug: string;
  title: string;
  org: string;
  status: "Done" | "In Progress";
  icon: ComponentType<LucideProps>;
  desc: string;
  tags: string[];
  metric: { v: string; l: string };
  externalHref: string;
  caseStudy?: {
    problem: string;
    solution: string;
    result: string;
  };
  overview: string;
  role: string[];
  highlights: { title: string; body: string }[];
  stack: string[];
  image?: string;
  galleries?: ProjectGallery[];
  embedUrl?: string;
  embedAppName?: string;
  embedPoweredBy?: string;
  embedCaption?: string;
  pdfUrl?: string;
};

export const projects: Project[] = [
  {
    slug: "election-dashboard",
    title: "제9회 지선 서울시장 개표 추이 대시보드",
    org: "Personal Project",
    status: "Done",
    icon: Vote,
    desc: "Cloud 환경에서 Selenium으로 선관위 개표 데이터를 실시간 크롤링하고, Pandas로 변동 시점을 감지해 Streamlit 웹앱으로 시각화한 실시간 모니터링 대시보드.",
    tags: ["Python", "Selenium", "Streamlit"],
    metric: { v: "100%", l: "모니터링 자동화" },
    externalHref: "https://felixlsh0election.streamlit.app/",
    caseStudy: {
      problem:
        "중앙선관위 개표 페이지를 매번 수동으로 새로고침하고 후보별 득표율을 손으로 계산해야 해, 변동 시점을 놓치기 쉽고 시계열 흐름을 파악할 수 없었습니다.",
      solution:
        "Cloud 서버에서 Selenium으로 개표 데이터를 상시 크롤링하고, Pandas로 이전 스냅샷 대비 Change Point만 필터링해 적재. Streamlit으로 누적 변동 추이 라인 차트와 실시간 로그 테이블을 배포했습니다.",
      result:
        "수기 모니터링을 100% 제거한 무인 대시보드를 완성했고, 개표율 변동마다 후보별 득표율 추이가 자동 축적되어 누구나 URL로 실시간 확인할 수 있게 됐습니다.",
    },
    overview:
      "중앙선거관리위원회의 실시간 개표 현황을 매번 수동으로 새로고침하며 직접 계산해야 하는 비효율을 해결하기 위해 만든 프로젝트입니다. 단순 현재 수치 조회를 넘어 개표율 변동에 따른 후보별 득표율 추이를 시계열로 축적, 실시간 흐름을 직관적으로 모니터링할 수 있는 대시보드 인프라를 구축했습니다.",
    role: [
      "Cloud 서버 환경에서 Python·Selenium 기반 실시간 크롤링 파이프라인 구축",
      "Pandas로 이전 데이터와 비교해 Change Point만 필터링·적재하는 정제 프로세스 구현",
      "Streamlit으로 누적 변동 추이 라인 차트와 실시간 로그 테이블을 동적 시각화·배포",
    ],
    highlights: [
      {
        title: "수기 모니터링 100% 제거",
        body: "데이터 수집부터 가공·시각화까지 전 과정을 완전 자동화하여 사람이 새로고침할 필요가 없는 무인 대시보드를 완성했습니다.",
      },
      {
        title: "Change Point 실시간 감지",
        body: "이전 스냅샷과 비교해 변동이 발생한 순간만 필터링·적재함으로써 데이터 정합성을 확보했습니다.",
      },
      {
        title: "라이브 대시보드 배포",
        body: "Streamlit Cloud에 배포해 누구나 URL로 접속해 개표 변동 추이를 실시간으로 확인할 수 있도록 했습니다.",
      },
    ],
    stack: ["Python", "Selenium", "Pandas", "Streamlit", "Cloud Server"],
    embedUrl: "https://felixlsh0election.streamlit.app/?embed=true",
    embedAppName: "서울시장 개표 추이 대시보드",
    embedPoweredBy: "Powered by Streamlit",
    embedCaption: "Streamlit Cloud에 배포된 실시간 개표 추이 대시보드입니다.",
  },
  {
    slug: "crm-dashboard",
    title: "CRM 실적 대시보드",
    org: "다이트랩",
    status: "Done",
    icon: BarChart3,
    desc: "신규 CRM에 부재했던 실적 조회 기능을 SQL + Looker Studio로 구축. 실장단이 결제 금액·내역·고객 정보를 손쉽게 조회.",
    tags: ["SQL", "Looker Studio", "Data Viz"],
    metric: { v: "100%", l: "조회 자동화" },
    externalHref: "https://felixlsh.oopy.io/1e98d2a0-6494-803c-a36d-ebbc70a23f17",
    overview:
      "기존 CRM에서 신규 CRM으로 이관한 후, 실적 조회 기능이 부재해 실무자들이 매번 수기로 데이터를 취합해야 했던 문제를 해결한 프로젝트입니다. SQL 기반 데이터 파이프라인을 구축하고 Looker Studio로 시각화하여, 결제 금액·내역·고객 정보를 누구나 손쉽게 조회할 수 있는 환경을 제공했습니다.",
    role: [
      "신규 CRM 데이터 전처리 및 이관",
      "원내 실무자 대상 결제·고객 실적 조회 시스템 제공 및 가이드",
      "Looker Studio 대시보드 설계 및 운영",
    ],
    highlights: [
      { title: "조회 자동화 100%", body: "수기 집계 작업을 완전히 제거하여 실무자가 즉시 실적을 확인할 수 있도록 개선했습니다." },
      { title: "데이터 정합성 확보", body: "이관 과정에서 발생하는 누락·중복 이슈를 파이프라인 점검 방식으로 사전에 차단했습니다." },
      { title: "실무 친화 UI", body: "Looker Studio의 필터·드릴다운 기능을 활용해 비개발자도 다룰 수 있는 화면을 제공했습니다." },
    ],
    stack: ["SQL", "Looker Studio", "Google BigQuery"],
    image: crmDashboardImg,
  },
  {
    slug: "rok-dashboard",
    title: "ROK Dashboard",
    org: "Rise of Kingdoms",
    status: "In Progress",
    icon: Gamepad2,
    desc: "1,000여 개 계정의 시즌별 데이터를 수집·정리·시각화. 개인 성과 지표, 항목별 랭킹, KPI 달성률을 차트로 제공.",
    tags: ["Python", "Looker Studio", "ETL"],
    metric: { v: "1,000+", l: "계정 분석" },
    externalHref: "https://felixlsh.oopy.io/b29f67c3-3037-48f6-8c8a-ddd0b5a1008e",
    overview:
      "Rise of Kingdoms 길드 운영을 위해 1,000여 개 계정의 시즌 데이터를 장기간 수집·가공·시각화한 분석 프로젝트입니다. 개인 성과 지표, 항목별 랭킹, KPI 달성률을 한눈에 볼 수 있는 대시보드를 제공해 의사결정에 기여하고 있습니다.",
    role: [
      "Python 기반 데이터 수집·정제 파이프라인 구축",
      "시즌별 KPI 정의 및 지표 설계",
      "Looker Studio 시각화 및 운영",
    ],
    highlights: [
      { title: "1,000+ 계정", body: "시즌별 활동 데이터를 자동으로 수집·정제해 분석 가능한 형태로 가공했습니다." },
      { title: "+65% 활동 증가", body: "데이터 기반 KPI 운영으로 길드 평균 활동 지표가 65% 이상 향상되었습니다." },
      { title: "Top 3 서버 랭킹", body: "데이터 인사이트를 운영에 반영해 서버 상위권을 유지하고 있습니다." },
    ],
    stack: ["Python", "Pandas", "Looker Studio", "Google Sheets API"],
    galleries: [
      {
        title: "Kingdom 2489",
        subtitle: "KPI 시스템 · 리더보드 · 명예의 전당",
        images: [rok2489_1, rok2489_2, rok2489_3, rok2489_4, rok2489_5],
      },
      {
        title: "Kingdom 1021",
        subtitle: "왕국 투력·처치 포인트 · 개인 퀘스트 진행 현황",
        images: [rok1021_1, rok1021_2, rok1021_3, rok1021_4],
      },
    ],
    embedUrl:
      "https://datastudio.google.com/embed/reporting/305dc2f7-bc0e-445f-b855-157fa8ab8f56/page/p_71pb7nil6c",
  },
  {
    slug: "ahk-automation",
    title: "AHK 업무 자동화",
    org: "다이트랩 · 사소한",
    status: "Done",
    icon: Zap,
    desc: "솔루션 진행 과정, 데이터 전처리, 주기 보고 등 반복 업무를 AutoHotkey로 자동화하여 처리 시간 단축.",
    tags: ["AHK", "Automation", "Python"],
    metric: { v: "↓ 70%", l: "수작업 시간" },
    externalHref: "https://felixlsh.oopy.io/57185ce0-b3af-463b-aab3-d41fbd9f0b0d",
    overview:
      "솔루션 진행 과정, 데이터 전처리, 주기 보고 등 반복적으로 발생하는 업무를 AutoHotkey와 Python을 결합해 자동화한 프로젝트입니다. 수작업으로 처리하던 업무 시간을 약 70% 줄이고, 휴먼 에러 가능성도 크게 낮췄습니다.",
    role: [
      "반복 업무 패턴 분석 및 자동화 대상 선정",
      "AutoHotkey 스크립트 설계 및 배포",
      "포맷 변환, 셀 병합·정리 작업을 단일 스크립트로 처리",
    ],
    highlights: [
      { title: "수작업 70% 감소", body: "반복 업무를 자동화해 실무자의 작업 시간을 대폭 단축했습니다." },
      { title: "휴먼 에러 최소화", body: "정해진 규칙 기반으로 동작해 사람이 놓치기 쉬운 실수를 사전에 방지했습니다." },
      { title: "단일 스크립트 통합", body: "포맷 변환·셀 병합·정리 작업을 하나의 스크립트로 묶어 운영 편의성을 높였습니다." },
    ],
    stack: ["AutoHotkey", "Python", "Excel"],
    galleries: [
      {
        title: "사소한 (2022)",
        subtitle: "출근 전·업무 중·퇴근 전·서브PC 탭으로 구성된 일과 자동화 매크로",
        images: [ahk2022],
      },
      {
        title: "다이트랩 (2023)",
        subtitle: "데이터 입력 보조 매크로 — 반복 입력·포맷 정리 자동화",
        images: [ahk2023],
      },
    ],
  },
  {
    slug: "carad",
    title: "CarAD",
    org: "졸업작품 · 2인",
    status: "Done",
    icon: Car,
    desc: "Node.js(Express) + MongoDB + Kotlin 기반 웹앱. REST API 설계 및 백엔드/DB 담당.",
    tags: ["Node.js", "MongoDB", "REST API"],
    metric: { v: "2인", l: "팀 프로젝트" },
    externalHref: "https://felixlsh.oopy.io/1901d883-b654-48ad-b4a5-169d8cef3211",
    overview:
      "졸업작품으로 2인 팀에서 진행한 차량 광고 플랫폼 프로젝트입니다. Node.js(Express)와 MongoDB로 백엔드를 구축하고, Kotlin 기반 안드로이드 앱과 통신하는 REST API를 설계했습니다.",
    role: [
      "REST API 설계 및 구현",
      "MongoDB 스키마 설계 및 데이터 운영",
      "백엔드 인프라 전반 담당",
    ],
    highlights: [
      { title: "End-to-End 설계", body: "DB 스키마부터 API, 클라이언트 연동까지 전체 흐름을 직접 설계·구현했습니다." },
      { title: "2인 협업", body: "역할을 명확히 분리해 짧은 기간 안에 작동 가능한 MVP를 완성했습니다." },
      { title: "실서비스 지향 구조", body: "확장성을 고려한 REST 설계로 추가 기능을 쉽게 붙일 수 있도록 했습니다." },
    ],
    stack: ["Node.js", "Express", "MongoDB", "Kotlin", "REST API"],
    pdfUrl: "/carad/graduation-report.pdf",
  },
];

export const getProjectBySlug = (slug?: string) =>
  projects.find((p) => p.slug === slug);
