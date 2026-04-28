import { useMemo } from "react";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, Area, AreaChart } from "recharts";
import { TrendingUp, Users, Trophy, Target, Gamepad2, ExternalLink, BarChart3 } from "lucide-react";

const data = [
  { week: "W1", active: 612, kills: 1.2, power: 38 },
  { week: "W2", active: 684, kills: 1.8, power: 42 },
  { week: "W3", active: 731, kills: 2.4, power: 47 },
  { week: "W4", active: 802, kills: 3.1, power: 53 },
  { week: "W5", active: 848, kills: 4.0, power: 58 },
  { week: "W6", active: 901, kills: 5.2, power: 64 },
  { week: "W7", active: 947, kills: 6.4, power: 71 },
  { week: "W8", active: 1012, kills: 7.9, power: 78 },
];

const CustomTooltip = ({ active, payload, label }: any) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="rounded-xl border border-border bg-popover/95 backdrop-blur px-4 py-3 shadow-elevated">
      <p className="text-[10px] tracking-widest text-muted-foreground mb-2">{label} · 2025 SEASON</p>
      <div className="space-y-1.5">
        <div className="flex items-center justify-between gap-6">
          <span className="flex items-center gap-2 text-xs text-foreground">
            <span className="h-2 w-2 rounded-full bg-primary-glow" />
            Active Users
          </span>
          <span className="font-mono text-sm font-semibold tabular-nums">{payload[0].value}</span>
        </div>
        <div className="flex items-center justify-between gap-6">
          <span className="flex items-center gap-2 text-xs text-foreground">
            <span className="h-2 w-2 rounded-full bg-cyan-400" />
            Kill Points (M)
          </span>
          <span className="font-mono text-sm font-semibold tabular-nums">{payload[1]?.value}</span>
        </div>
      </div>
    </div>
  );
};

export const RokProject = () => {
  const peak = useMemo(() => Math.max(...data.map((d) => d.active)), []);

  return (
    <section className="py-12">
      {/* Header */}
      <div className="flex items-start justify-between gap-4 mb-8">
        <div className="flex items-start gap-4">
          <div className="h-12 w-12 rounded-xl bg-primary/15 border border-primary/30 flex items-center justify-center flex-shrink-0">
            <Gamepad2 className="h-5 w-5 text-primary-glow" />
          </div>
          <div>
            <p className="text-xs text-muted-foreground mb-1">Featured Case Study</p>
            <h3 className="font-display text-3xl md:text-4xl">Rise of Kingdoms 데이터 분석</h3>
            <p className="text-sm text-muted-foreground mt-2 max-w-xl">
              1,000여 개 계정의 시즌별 활동을 수집·가공·시각화한 장기 분석 프로젝트
            </p>
          </div>
        </div>
        <span className="hidden md:inline-flex items-center gap-1.5 rounded-full bg-primary/20 text-primary-glow px-3 py-1.5 text-[10px] font-semibold flex-shrink-0">
          <span className="h-1.5 w-1.5 rounded-full bg-primary-glow animate-pulse" />
          IN PROGRESS
        </span>
      </div>

      {/* Chart + Stats grid */}
      <div className="grid lg:grid-cols-5 gap-5 mb-5">
        {/* Chart card */}
        <div className="lg:col-span-3 rounded-2xl border border-border bg-gradient-card p-5 md:p-6">
          <div className="flex items-start justify-between mb-1">
            <div>
              <p className="text-[10px] tracking-[0.2em] text-muted-foreground">USER ACTIVITY</p>
              <h4 className="font-display text-lg mt-1">유저 활동 지표 · 8주 추이</h4>
            </div>
            <div className="flex items-center gap-3 text-[11px]">
              <span className="flex items-center gap-1.5 text-muted-foreground">
                <span className="h-2 w-2 rounded-full bg-primary-glow" /> Active
              </span>
              <span className="flex items-center gap-1.5 text-muted-foreground">
                <span className="h-2 w-2 rounded-full bg-cyan-400" /> Kills
              </span>
            </div>
          </div>

          <div className="flex items-baseline gap-3 mt-4 mb-2">
            <p className="font-display text-4xl tabular-nums text-gradient">{peak.toLocaleString()}</p>
            <span className="text-xs font-mono text-emerald-400 flex items-center gap-1">
              <TrendingUp className="h-3 w-3" /> +65.4%
            </span>
          </div>
          <p className="text-xs text-muted-foreground mb-4">Peak weekly active accounts</p>

          <div className="h-[260px] -ml-2">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data} margin={{ top: 10, right: 8, left: -10, bottom: 0 }}>
                <defs>
                  <linearGradient id="gradActive" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="hsl(var(--primary-glow))" stopOpacity={0.4} />
                    <stop offset="100%" stopColor="hsl(var(--primary-glow))" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid stroke="hsl(var(--border))" strokeDasharray="3 6" vertical={false} />
                <XAxis
                  dataKey="week"
                  stroke="hsl(var(--muted-foreground))"
                  fontSize={11}
                  tickLine={false}
                  axisLine={false}
                />
                <YAxis
                  stroke="hsl(var(--muted-foreground))"
                  fontSize={11}
                  tickLine={false}
                  axisLine={false}
                />
                <Tooltip content={<CustomTooltip />} cursor={{ stroke: "hsl(var(--primary-glow))", strokeOpacity: 0.3, strokeWidth: 1 }} />
                <Area
                  type="monotone"
                  dataKey="active"
                  stroke="hsl(var(--primary-glow))"
                  strokeWidth={2.5}
                  fill="url(#gradActive)"
                  dot={{ fill: "hsl(var(--primary-glow))", r: 3, strokeWidth: 0 }}
                  activeDot={{ r: 5, fill: "hsl(var(--primary-glow))", stroke: "hsl(var(--background))", strokeWidth: 2 }}
                />
                <Line
                  type="monotone"
                  dataKey="kills"
                  stroke="hsl(199 89% 60%)"
                  strokeWidth={2}
                  strokeDasharray="4 4"
                  dot={false}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Achievements column */}
        <div className="lg:col-span-2 flex flex-col gap-3">
          <div className="rounded-2xl border border-primary/30 bg-gradient-to-br from-primary/15 to-transparent p-6 relative overflow-hidden">
            <div className="absolute -top-10 -right-10 h-32 w-32 rounded-full bg-primary/30 blur-3xl" />
            <div className="relative">
              <p className="text-[10px] tracking-[0.25em] text-primary-glow mb-3">KEY OUTCOME</p>
              <p className="font-display text-3xl leading-tight">
                <span className="text-gradient">1,000+</span> 계정
              </p>
              <p className="text-sm text-foreground/85 mt-3 leading-relaxed">
                계정 데이터 수집 및 시각화로 길드 운영 의사결정의 핵심 인사이트 제공
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            {[
              { icon: Users, v: "1,012", l: "Active Accounts" },
              { icon: Trophy, v: "Top 3", l: "Server Ranking" },
              { icon: Target, v: "94%", l: "KPI 달성률" },
              { icon: TrendingUp, v: "+65%", l: "활동 증가율" },
            ].map(({ icon: Icon, v, l }) => (
              <div key={l} className="rounded-xl border border-border bg-card/60 p-4 hover:border-primary/40 transition-colors">
                <Icon className="h-4 w-4 text-primary-glow mb-3" />
                <p className="font-display text-xl tabular-nums">{v}</p>
                <p className="text-[11px] text-muted-foreground mt-1">{l}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Looker Studio embed placeholder */}
      <div className="rounded-2xl border border-border bg-gradient-card overflow-hidden">
        <div className="flex items-center justify-between px-5 md:px-6 py-4 border-b border-border">
          <div className="flex items-center gap-3">
            <div className="h-8 w-8 rounded-lg bg-primary/15 flex items-center justify-center">
              <BarChart3 className="h-4 w-4 text-primary-glow" />
            </div>
            <div>
              <p className="font-display text-sm">ROK Live Dashboard</p>
              <p className="text-[11px] text-muted-foreground">Powered by Looker Studio</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className="hidden sm:flex h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="hidden sm:inline text-[11px] text-muted-foreground font-mono">connecting…</span>
          </div>
        </div>

        {/* iframe slot */}
        <div className="relative aspect-video bg-background/40">
          {/* Replace src with real Looker Studio embed URL */}
          <iframe
            title="Looker Studio Dashboard"
            src="about:blank"
            className="absolute inset-0 w-full h-full opacity-0"
          />

          {/* Stylish placeholder overlay */}
          <div className="absolute inset-0 grid-bg pointer-events-none" />
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6">
            <div className="relative mb-5">
              <div className="absolute inset-0 bg-primary/40 blur-2xl rounded-full" />
              <div className="relative h-14 w-14 rounded-2xl bg-gradient-primary flex items-center justify-center shadow-glow">
                <BarChart3 className="h-6 w-6 text-primary-foreground" />
              </div>
            </div>
            <p className="font-display text-xl md:text-2xl mb-2">Looker Studio Embed</p>
            <p className="text-sm text-muted-foreground max-w-md mb-5">
              실제 대시보드 URL이 연결되면 이 영역에 인터랙티브 보고서가 표시됩니다.
            </p>
            <code className="inline-flex items-center gap-2 rounded-md border border-border bg-muted/40 px-3 py-1.5 text-[11px] font-mono text-muted-foreground">
              <ExternalLink className="h-3 w-3" />
              https://lookerstudio.google.com/embed/...
            </code>
          </div>
        </div>
      </div>
    </section>
  );
};
