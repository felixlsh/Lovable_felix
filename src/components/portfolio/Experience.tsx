import { Briefcase } from "lucide-react";

const jobs = [
  {
    company: "다이트랩",
    role: "데이터분석지원",
    period: "2023.10 — 2024.01",
    points: [
      "CRM 데이터 전처리 및 신규 시스템 이관",
      "SQL로 CRM 데이터 추출 → Looker Studio 대시보드 구축",
      "실장단 대상 실적 조회 시스템 가이드 제공",
      "업무 자동화 프로그램(AHK) 개발",
    ],
  },
  {
    company: "사소한",
    role: "자산 & 인프라 관리, 시스템 운영",
    period: "2022.02 — 2022.08",
    points: [
      "IT Helpdesk · 계정 및 솔루션 관리",
      "사내 전산자원 & PC 유지보수",
      "사내 솔루션 문의 응대",
      "반복 업무 자동화 프로그램 개발",
    ],
  },
  {
    company: "대한민국 육군",
    role: "정보체계운용 담당관",
    period: "2016.03 — 2018.06",
    points: ["군 정보체계 운용 및 유지보수", "IT Helpdesk 운영"],
  },
];

export const Experience = () => {
  return (
    <section id="experience" className="py-20 lg:py-28">
      <div className="flex items-end justify-between mb-12">
        <div>
          <p className="text-[10px] tracking-[0.25em] text-muted-foreground mb-3">02 — CAREER</p>
          <h2 className="font-display text-4xl md:text-5xl">Experience</h2>
        </div>
        <p className="hidden md:block text-sm text-muted-foreground max-w-xs text-right">
          데이터 운용과 분석으로 이어진 커리어 타임라인
        </p>
      </div>

      <div className="relative">
        <div className="absolute left-[15px] md:left-[19px] top-2 bottom-2 w-px bg-gradient-to-b from-primary via-border to-transparent" />

        <div className="space-y-6">
          {jobs.map((job) => (
            <div key={job.company} className="relative pl-12 md:pl-16">
              <div className="absolute left-0 top-2 h-8 w-8 md:h-10 md:w-10 rounded-xl bg-gradient-primary flex items-center justify-center shadow-glow">
                <Briefcase className="h-4 w-4 text-primary-foreground" />
              </div>

              <div className="rounded-2xl border border-border bg-gradient-card p-6 md:p-7 hover:border-primary/40 transition-colors">
                <div className="flex flex-wrap items-center gap-x-4 gap-y-1 mb-1">
                  <h3 className="font-display text-xl md:text-2xl">{job.company}</h3>
                  <span className="text-xs font-mono text-primary-glow tabular-nums">{job.period}</span>
                </div>
                <p className="text-sm text-muted-foreground mb-5">{job.role}</p>

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
          ))}
        </div>
      </div>
    </section>
  );
};
