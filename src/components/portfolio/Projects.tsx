import { ArrowUpRight, BarChart3, Gamepad2, Zap, Car } from "lucide-react";

const projects = [
  {
    title: "CRM 실적 대시보드",
    org: "다이트랩",
    status: "Done",
    icon: BarChart3,
    desc: "신규 CRM에 부재했던 실적 조회 기능을 SQL + Looker Studio로 구축. 실장단이 결제 금액·내역·고객 정보를 손쉽게 조회.",
    tags: ["SQL", "Looker Studio", "Data Viz"],
    metric: { v: "100%", l: "조회 자동화" },
  },
  {
    title: "ROK Dashboard",
    org: "Rise of Kingdoms",
    status: "In Progress",
    icon: Gamepad2,
    desc: "1,000여 개 계정의 시즌별 데이터를 수집·정리·시각화. 개인 성과 지표, 항목별 랭킹, KPI 달성률을 차트로 제공.",
    tags: ["Python", "Looker Studio", "ETL"],
    metric: { v: "1,000+", l: "계정 분석" },
  },
  {
    title: "AHK 업무 자동화",
    org: "다이트랩 · 사소한",
    status: "Done",
    icon: Zap,
    desc: "솔루션 진행 과정, 데이터 전처리, 주기 보고 등 반복 업무를 AutoHotkey로 자동화하여 처리 시간 단축.",
    tags: ["AHK", "Automation", "Python"],
    metric: { v: "↓ 70%", l: "수작업 시간" },
  },
  {
    title: "CarAD",
    org: "졸업작품 · 2인",
    status: "Done",
    icon: Car,
    desc: "Node.js(Express) + MongoDB + Kotlin 기반 웹앱. REST API 설계 및 백엔드/DB 담당.",
    tags: ["Node.js", "MongoDB", "REST API"],
    metric: { v: "2인", l: "팀 프로젝트" },
  },
];

export const Projects = () => {
  return (
    <section id="projects" className="py-20 lg:py-28">
      <div className="flex items-end justify-between mb-12">
        <div>
          <p className="text-[10px] tracking-[0.25em] text-muted-foreground mb-3">03 — SELECTED WORK</p>
          <h2 className="font-display text-4xl md:text-5xl">Projects</h2>
        </div>
        <p className="hidden md:block text-sm text-muted-foreground max-w-xs text-right">
          데이터 시각화부터 자동화까지 — 문제 해결 중심의 작업물
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-5">
        {projects.map((p) => {
          const Icon = p.icon;
          const isLive = p.status === "In Progress";
          return (
            <article
              key={p.title}
              className="group relative rounded-2xl border border-border bg-gradient-card p-6 md:p-7 overflow-hidden transition-all hover:border-primary/50 hover:-translate-y-1 hover:shadow-elevated"
            >
              <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-primary/10 blur-3xl opacity-0 group-hover:opacity-100 transition-opacity" />

              <div className="relative">
                <div className="flex items-start justify-between mb-5">
                  <div className="h-12 w-12 rounded-xl bg-primary/15 border border-primary/30 flex items-center justify-center">
                    <Icon className="h-5 w-5 text-primary-glow" />
                  </div>
                  <div className="flex items-center gap-2">
                    <span
                      className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[10px] font-semibold ${
                        isLive
                          ? "bg-primary/20 text-primary-glow"
                          : "bg-emerald-500/15 text-emerald-300"
                      }`}
                    >
                      <span className={`h-1.5 w-1.5 rounded-full ${isLive ? "bg-primary-glow animate-pulse" : "bg-emerald-400"}`} />
                      {p.status}
                    </span>
                  </div>
                </div>

                <p className="text-xs text-muted-foreground mb-1">{p.org}</p>
                <h3 className="font-display text-2xl mb-3">{p.title}</h3>
                <p className="text-sm text-foreground/80 leading-relaxed mb-5">{p.desc}</p>

                <div className="flex items-end justify-between gap-4 pt-5 border-t border-border">
                  <div className="flex flex-wrap gap-1.5">
                    {p.tags.map((t) => (
                      <span key={t} className="text-[11px] font-mono text-muted-foreground bg-muted/50 rounded-md px-2 py-1">
                        {t}
                      </span>
                    ))}
                  </div>
                  <div className="text-right flex-shrink-0">
                    <p className="font-display text-2xl text-gradient tabular-nums leading-none">{p.metric.v}</p>
                    <p className="text-[10px] text-muted-foreground mt-1 tracking-wider">{p.metric.l}</p>
                  </div>
                </div>

                <ArrowUpRight className="absolute top-0 right-0 h-5 w-5 text-muted-foreground opacity-0 group-hover:opacity-100 group-hover:text-primary-glow transition-all" />
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
};
