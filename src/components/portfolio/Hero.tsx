import { ArrowUpRight, Sparkles, TrendingUp, Database, Code2, FileCode2, BarChart2, Server } from "lucide-react";

const stacks = [
  { label: "Python", color: "from-blue-500/20 to-blue-500/5", Icon: Code2 },
  { label: "SQL", color: "from-cyan-500/20 to-cyan-500/5", Icon: Database },
  { label: "Looker Studio", color: "from-indigo-500/20 to-indigo-500/5", Icon: BarChart2 },
  { label: "Node.js", color: "from-emerald-500/20 to-emerald-500/5", Icon: Server },
];

const stats = [
  { value: "1,000+", label: "분석 계정", sub: "Rise of Kingdoms" },
  { value: "4년+", label: "데이터 경력", sub: "취미 · 실무 포함" },
  { value: "3", label: "주요 프로젝트", sub: "Data viz & 자동화" },
];

export const Hero = () => {
  return (
    <section id="about" className="relative overflow-hidden pt-12 pb-16 lg:pt-20">
      <div className="absolute inset-0 grid-bg pointer-events-none" />
      <div className="absolute inset-0 data-network pointer-events-none opacity-70" />

      <div className="relative">
        {/* Status pill */}
        <div className="inline-flex items-center gap-2 rounded-full border border-border bg-card/60 backdrop-blur px-4 py-1.5 text-xs text-muted-foreground mb-8 animate-fade-up">
          <span className="h-1.5 w-1.5 rounded-full bg-primary-glow animate-pulse" />
          PORTFOLIO · 2026
          <Sparkles className="h-3 w-3 text-primary-glow" />
        </div>

        <h1
          className="font-display text-[2rem] sm:text-4xl md:text-5xl lg:text-6xl leading-[1.2] tracking-tight animate-fade-up"
          style={{ animationDelay: "80ms" }}
        >
          <span className="text-gradient">데이터</span>의 흐름을 설계하고,
          <br />
          비즈니스의 해답을 <span className="text-gradient">시각화</span>합니다.
        </h1>

        <p
          className="mt-6 sm:mt-8 max-w-2xl text-base sm:text-lg text-muted-foreground leading-relaxed animate-fade-up"
          style={{ animationDelay: "180ms" }}
        >
          안녕하세요, <span className="text-foreground font-semibold">이승헌</span>입니다.
          단순한 열정을 넘어, <span className="font-bold text-[hsl(var(--primary))]">데이터</span> 기반의 정교한{" "}
          <span className="font-bold text-[hsl(var(--primary))]">의사결정</span>으로 가치를 증명한다고 생각합니다.
        </p>

        <p
          className="mt-3 max-w-2xl text-sm sm:text-base text-foreground/90 font-medium animate-fade-up"
          style={{ animationDelay: "220ms" }}
        >
          <span className="font-bold text-[hsl(var(--primary))]">1,000개 이상</span>의 유저 데이터를 다뤄본 경험으로 비즈니스 임팩트를 만들고자 합니다.
        </p>

        {/* CTA */}
        <div
          className="mt-10 flex flex-wrap gap-3 animate-fade-up"
          style={{ animationDelay: "260ms" }}
        >
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
        <div className="mt-12 animate-fade-up" style={{ animationDelay: "340ms" }}>
          <p className="text-[10px] tracking-[0.25em] text-muted-foreground mb-4">CORE STACK</p>
          <div className="flex flex-wrap gap-2.5">
            {stacks.map((s, i) => (
              <span
                key={s.label}
                className={`inline-flex items-center gap-2 rounded-full border border-border bg-gradient-to-br ${s.color} px-4 py-2 text-sm font-semibold text-foreground backdrop-blur transition-all hover:border-primary/60 hover:shadow-glow hover:-translate-y-0.5 animate-fade-up`}
                style={{ animationDelay: `${400 + i * 70}ms` }}
              >
                <s.Icon className="h-3.5 w-3.5 text-primary-glow" />
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
              className="shine relative rounded-2xl border border-border bg-gradient-card p-6 overflow-hidden group hover:border-primary/50 hover:-translate-y-1 transition-all duration-300 animate-fade-up"
              style={{ animationDelay: `${300 + i * 120}ms` }}
            >
              <div className="absolute -right-6 -top-6 h-24 w-24 rounded-full bg-primary/10 blur-2xl group-hover:bg-primary/30 transition-colors" />
              <div className="relative flex items-start justify-between mb-4">
                <div className="h-9 w-9 rounded-lg bg-primary/15 flex items-center justify-center transition-transform group-hover:scale-110">
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
