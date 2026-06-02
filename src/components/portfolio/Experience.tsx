import { Database, Server, Wrench } from "lucide-react";
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
      "신규 CRM 데이터 전처리 및 이관",
      "SQL로 CRM 데이터 추출 후 Looker Studio 통계 페이지 구현",
      "원내 실무자 대상 결제·고객 실적 조회 시스템 제공 및 가이드",
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


export const Experience = () => {
  const headerView = useInView<HTMLDivElement>();

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
    </section>
  );
};
