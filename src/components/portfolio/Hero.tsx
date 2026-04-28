import { ArrowUpRight, Sparkles, TrendingUp, Database } from "lucide-react";

const stacks = [
  { label: "Python", color: "from-blue-500/20 to-blue-500/5" },
  { label: "SQL", color: "from-cyan-500/20 to-cyan-500/5" },
  { label: "Looker Studio", color: "from-indigo-500/20 to-indigo-500/5" },
  { label: "Node.js", color: "from-emerald-500/20 to-emerald-500/5" },
];

const stats = [
  { value: "1,000+", label: "분석 계정", sub: "Rise of Kingdoms" },
  { value: "8년+", label: "데이터 경력", sub: "취미 · 실무 포함" },
  { value: "3", label: "주요 프로젝트", sub: "Data viz & 자동화" },
];

export const Hero = () => {
  return (
    <section id="about" className="relative overflow-hidden pt-12 pb-16 lg:pt-20">
      <div className="absolute inset-0 grid-bg pointer-events-none" />

      <div className="relative">
        {/* Status pill */}
        <div className="inline-flex items-center gap-2 rounded-full border border-border bg-card/60 backdrop-blur px-4 py-1.5 text-xs text-muted-foreground mb-8">
          <span className="h-1.5 w-1.5 rounded-full bg-primary-glow animate-pulse" />
          PORTFOLIO · 2026
          <Sparkles className="h-3 w-3 text-primary-glow" />
        </div>

        <h1 className="font-display text-[2.5rem] sm:text-5xl md:text-7xl lg:text-[5.5rem] leading-[1.05] tracking-tight">
          데이터로
          <br />
          <span className="text-gradient">성장을 증명하는</span>
          <br />
          분석가.
        </h1>

        <p className="mt-6 sm:mt-8 max-w-2xl text-base sm:text-lg text-muted-foreground leading-relaxed">
          안녕하세요, <span className="text-foreground font-semibold">이승헌</span>입니다.
          꿈에서도 데이터를 적재하고 가공하는, SQL과 시각화로 비즈니스 의사결정에 기여하는 데이터 분석가입니다.
        </p>

        {/* CTA */}
        <div className="mt-10 flex flex-wrap gap-3">
          <a
            href="#projects"
            className="group inline-flex items-center gap-2 rounded-xl bg-gradient-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-glow transition-transform hover:-translate-y-0.5"
          >
            프로젝트 보기
            <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </a>
          <a
            href="#contact"
            className="inline-flex items-center gap-2 rounded-xl border border-border bg-card/40 backdrop-blur px-6 py-3 text-sm font-semibold text-foreground hover:bg-card transition-colors"
          >
            연락하기
          </a>
        </div>

        {/* Tech stack badges */}
        <div className="mt-12">
          <p className="text-[10px] tracking-[0.25em] text-muted-foreground mb-4">CORE STACK</p>
          <div className="flex flex-wrap gap-2.5">
            {stacks.map((s) => (
              <span
                key={s.label}
                className={`inline-flex items-center gap-2 rounded-full border border-border bg-gradient-to-br ${s.color} px-4 py-2 text-sm font-semibold text-foreground backdrop-blur transition-all hover:border-primary/50 hover:shadow-glow`}
              >
                <span className="h-1.5 w-1.5 rounded-full bg-primary-glow" />
                {s.label}
              </span>
            ))}
          </div>
        </div>

        {/* KPI strip */}
        <div className="mt-16 grid grid-cols-1 sm:grid-cols-3 gap-4">
          {stats.map((s, i) => (
            <div
              key={s.label}
              className="relative rounded-2xl border border-border bg-gradient-card p-6 overflow-hidden group hover:border-primary/40 transition-colors"
            >
              <div className="absolute -right-6 -top-6 h-24 w-24 rounded-full bg-primary/10 blur-2xl group-hover:bg-primary/20 transition-colors" />
              <div className="relative flex items-start justify-between mb-4">
                <div className="h-9 w-9 rounded-lg bg-primary/15 flex items-center justify-center">
                  {i === 0 && <Database className="h-4 w-4 text-primary-glow" />}
                  {i === 1 && <TrendingUp className="h-4 w-4 text-primary-glow" />}
                  {i === 2 && <Sparkles className="h-4 w-4 text-primary-glow" />}
                </div>
                <span className="text-[10px] text-muted-foreground tracking-widest">0{i + 1}</span>
              </div>
              <p className="font-display text-4xl tabular-nums">{s.value}</p>
              <p className="mt-2 text-sm font-semibold text-foreground">{s.label}</p>
              <p className="text-xs text-muted-foreground mt-0.5">{s.sub}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
