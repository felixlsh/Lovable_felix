import { Briefcase, Database, Server, Wrench, Zap, FileSpreadsheet, Repeat, Keyboard, Clock } from "lucide-react";
import { useInView } from "@/hooks/use-in-view";
import { cn } from "@/lib/utils";

const jobs = [
  {
    company: "다이트랩",
    role: "데이터분석지원",
    period: "2023.10 — 2024.01",
    icon: Database,
    tag: "DATA",
    summary: "데이터 이관 및 CRM 통계 시스템 구축",
    points: [
      "기존 → 신규 CRM 데이터 전처리 및 이관 작업 주도",
      "SQL로 CRM 데이터 추출 후 Looker Studio 통계 페이지 구현",
      "실장단 대상 결제·고객 실적 조회 시스템 가이드 제공",
      "AHK 기반 업무 자동화 프로그램 개발",
    ],
  },
  {
    company: "사소한",
    role: "자산 & 인프라 관리",
    period: "2022.02 — 2022.08",
    icon: Wrench,
    tag: "OPS",
    summary: "사내 IT 자산 관리 및 시스템 운영",
    points: [
      "IT Helpdesk · 계정 및 솔루션 관리",
      "사내 전산자원 & PC 유지보수",
      "사내 솔루션 문의 응대 및 운영 지원",
      "반복 업무 자동화 스크립트 개발",
    ],
  },
  {
    company: "대한민국 육군",
    role: "정보체계운용 담당관",
    period: "2016.03 — 2018.06",
    icon: Server,
    tag: "INFRA",
    summary: "군 정보체계 시스템 운용 및 유지보수",
    points: [
      "군 정보체계 24/7 운용 및 장애 대응",
      "시스템 유지보수 및 정기 점검 수행",
      "사용자 대상 IT Helpdesk 운영",
    ],
  },
];

const automation = [
  {
    icon: FileSpreadsheet,
    title: "엑셀 편집 자동화",
    desc: "수백 개 시트의 데이터 정합성 검증, 포맷 변환, 셀 병합·정리 작업을 단일 스크립트로 처리.",
    metric: "↓ 85%",
    metricLabel: "처리 시간",
  },
  {
    icon: Repeat,
    title: "반복 작업 효율화",
    desc: "주기적 보고서 생성, 파일 분류, 메일 발송 등 매크로 패턴화된 업무를 핫키 한 번으로 실행.",
    metric: "10+",
    metricLabel: "자동화 시나리오",
  },
  {
    icon: Keyboard,
    title: "단축키 기반 워크플로우",
    desc: "솔루션 진행 과정 추적, 데이터 전처리 단계 등을 글로벌 핫키로 호출하여 컨텍스트 전환 최소화.",
    metric: "1-key",
    metricLabel: "트리거 실행",
  },
  {
    icon: Clock,
    title: "주기적 업무 보고",
    desc: "정해진 시각에 데이터 수집 → 가공 → 시각화 → 배포까지 무인 실행되는 파이프라인 구성.",
    metric: "24/7",
    metricLabel: "무인 실행",
  },
];

const TimelineItem = ({ job, index }: { job: (typeof jobs)[number]; index: number }) => {
  const { ref, inView } = useInView<HTMLDivElement>();
  const Icon = job.icon;

  return (
    <div
      ref={ref}
      className={cn(
        "relative pl-12 md:pl-16 opacity-0",
        inView && "animate-fade-up"
      )}
      style={{ animationDelay: inView ? `${index * 120}ms` : undefined }}
    >
      <div className="absolute left-0 top-2 h-8 w-8 md:h-10 md:w-10 rounded-xl bg-gradient-primary flex items-center justify-center shadow-glow">
        <Icon className="h-4 w-4 text-primary-foreground" />
      </div>

      <div className="rounded-2xl border border-border bg-gradient-card p-6 md:p-7 hover:border-primary/40 transition-colors">
        <div className="flex flex-wrap items-center gap-x-3 gap-y-2 mb-2">
          <h3 className="font-display text-xl md:text-2xl">{job.company}</h3>
          <span className="rounded-md bg-primary/15 text-primary-glow px-2 py-0.5 text-[10px] font-mono font-semibold tracking-wider">
            {job.tag}
          </span>
          <span className="text-xs font-mono text-muted-foreground tabular-nums ml-auto">{job.period}</span>
        </div>
        <p className="text-sm text-foreground/85 mb-1 font-medium">{job.role}</p>
        <p className="text-xs text-muted-foreground mb-5">{job.summary}</p>

        <ul className="grid sm:grid-cols-2 gap-2">
          {job.points.map((p) => (
            <li key={p} className="flex items-start gap-2.5 text-sm text-foreground/85">
              <span className="mt-1.5 h-1 w-1 rounded-full bg-primary-glow flex-shrink-0" />
              {p}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

const AutomationCard = ({ item, index }: { item: (typeof automation)[number]; index: number }) => {
  const { ref, inView } = useInView<HTMLDivElement>();
  const Icon = item.icon;

  return (
    <div
      ref={ref}
      className={cn(
        "group relative rounded-2xl border border-border bg-gradient-card p-6 overflow-hidden hover:border-primary/40 transition-colors opacity-0",
        inView && "animate-fade-up"
      )}
      style={{ animationDelay: inView ? `${index * 100}ms` : undefined }}
    >
      <div className="absolute -top-12 -right-12 h-32 w-32 rounded-full bg-primary/10 blur-3xl opacity-0 group-hover:opacity-100 transition-opacity" />
      <div className="relative">
        <div className="flex items-start justify-between mb-4">
          <div className="h-11 w-11 rounded-xl bg-primary/15 border border-primary/30 flex items-center justify-center">
            <Icon className="h-5 w-5 text-primary-glow" />
          </div>
          <div className="text-right">
            <p className="font-display text-xl text-gradient tabular-nums leading-none">{item.metric}</p>
            <p className="text-[10px] text-muted-foreground mt-1 tracking-wider">{item.metricLabel}</p>
          </div>
        </div>
        <h4 className="font-display text-lg mb-2">{item.title}</h4>
        <p className="text-sm text-foreground/75 leading-relaxed">{item.desc}</p>
      </div>
    </div>
  );
};

export const Experience = () => {
  const headerView = useInView<HTMLDivElement>();
  const autoHeaderView = useInView<HTMLDivElement>();

  return (
    <section id="experience" className="py-20 lg:py-28">
      <div
        ref={headerView.ref}
        className={cn(
          "flex items-end justify-between mb-12 opacity-0",
          headerView.inView && "animate-fade-up"
        )}
      >
        <div>
          <p className="text-[10px] tracking-[0.25em] text-muted-foreground mb-3">02 — CAREER</p>
          <h2 className="font-display text-4xl md:text-5xl">Experience</h2>
        </div>
        <p className="hidden md:block text-sm text-muted-foreground max-w-xs text-right">
          시스템 운용에서 데이터 분석으로 이어진 커리어 타임라인
        </p>
      </div>

      <div className="relative">
        <div className="absolute left-[15px] md:left-[19px] top-2 bottom-2 w-px bg-gradient-to-b from-primary via-border to-transparent" />
        <div className="space-y-6">
          {jobs.map((job, i) => (
            <TimelineItem key={job.company} job={job} index={i} />
          ))}
        </div>
      </div>

      {/* Automation block */}
      <div className="mt-24">
        <div
          ref={autoHeaderView.ref}
          className={cn(
            "flex items-end justify-between mb-10 opacity-0",
            autoHeaderView.inView && "animate-fade-up"
          )}
        >
          <div className="flex items-start gap-4">
            <div className="h-11 w-11 rounded-xl bg-gradient-primary flex items-center justify-center shadow-glow flex-shrink-0">
              <Zap className="h-5 w-5 text-primary-foreground" />
            </div>
            <div>
              <p className="text-[10px] tracking-[0.25em] text-muted-foreground mb-2">02.5 — AUTOMATION</p>
              <h3 className="font-display text-2xl md:text-3xl">AutoHotkey 업무 자동화</h3>
              <p className="text-sm text-muted-foreground mt-1.5 max-w-lg">
                반복되는 업무를 스크립트로 압축하여 진짜 일에 집중할 시간을 만들기
              </p>
            </div>
          </div>
          <span className="hidden md:inline-flex items-center gap-1.5 rounded-full bg-primary/20 text-primary-glow px-3 py-1.5 text-[10px] font-semibold flex-shrink-0">
            <Briefcase className="h-3 w-3" />
            ONGOING TOOLKIT
          </span>
        </div>

        <div className="grid sm:grid-cols-2 gap-4">
          {automation.map((item, i) => (
            <AutomationCard key={item.title} item={item} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
};
