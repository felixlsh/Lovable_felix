import { useState } from "react";
import { Link } from "react-router-dom";
import {
  Vote,
  ExternalLink,
  ArrowUpRight,
  Activity,
  Sparkles,
  Target,
  Server,
  Globe,
  GitCompare,
  Database,
  LineChart,
  ChevronRight,
  ChevronDown,
} from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

const phases = [
  {
    step: "01",
    label: "PROBLEM",
    icon: Target,
    title: "수기 새로고침의 한계",
    body:
      "중앙선거관리위원회의 실시간 개표 현황을 매번 수동으로 새로고침하며 직접 계산해야 하는 비효율을 해결. 단순 현재 수치 조회를 넘어, 개표율 변동에 따른 후보별 득표율 추이를 시계열로 축적해 직관적으로 모니터링할 인프라가 필요했습니다.",
  },
  {
    step: "02",
    label: "ACTION",
    icon: Activity,
    title: "수집·감지·시각화 파이프라인 구축",
    body:
      "Cloud 서버에서 Python·Selenium으로 선관위 개표 페이지를 실시간 크롤링. Pandas로 이전 데이터와 비교해 Change Point만 필터링하여 시계열 데이터셋에 적재하고, Streamlit으로 누적 추이 라인 차트와 실시간 로그 테이블을 동적으로 시각화·배포했습니다.",
  },
  {
    step: "03",
    label: "RESULT",
    icon: Sparkles,
    title: "100% 무인 실시간 대시보드",
    body:
      "수집·가공·시각화 전 과정을 완전 자동화하여 수기 모니터링 리소스 100% 절감. 개표율 변동 시점을 왜곡 없이 실시간으로 반영하는 데이터 정합성을 확보하고 모던 대시보드 아키텍처를 완성했습니다.",
  },
];

const stack = ["Python", "Selenium", "Pandas", "Streamlit", "Cloud Server"];

const pipeline = [
  {
    step: "01",
    icon: Server,
    title: "Cloud Server",
    desc: "Python 상시 구동 환경",
  },
  {
    step: "02",
    icon: Globe,
    title: "Selenium Crawl",
    desc: "중앙선관위 페이지 실시간 폴링",
  },
  {
    step: "03",
    icon: GitCompare,
    title: "Change Point 감지",
    desc: "Pandas로 변동 시점만 필터링",
  },
  {
    step: "04",
    icon: Database,
    title: "시계열 Dataset",
    desc: "누적 변동 로그 적재",
  },
  {
    step: "05",
    icon: LineChart,
    title: "Streamlit App",
    desc: "라인 차트 · 실시간 로그 시각화",
  },
];

const LIVE_URL = "https://felixlsh0election.streamlit.app/";

export const ElectionProject = () => {
  const [iframeLoaded, setIframeLoaded] = useState(false);

  return (
    <section className="py-12">
      {/* Header — clickable, links to project detail */}
      <Link
        to="/projects/election-dashboard"
        aria-label="지선 개표 추이 대시보드 프로젝트 상세 보기"
        className="group flex items-start justify-between gap-4 mb-8 rounded-2xl -mx-3 px-3 py-2 transition-all duration-300 hover:bg-primary/5 hover:-translate-y-0.5 active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50"
      >
        <div className="flex items-start gap-4">
          <div className="h-12 w-12 rounded-xl bg-primary/15 border border-primary/30 flex items-center justify-center flex-shrink-0 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3">
            <Vote className="h-5 w-5 text-primary-glow" />
          </div>
          <div className="min-w-0">
            <p className="text-xs text-muted-foreground mb-1">Featured Case Study</p>
            <h3 className="font-display text-2xl sm:text-3xl md:text-4xl break-keep inline-flex items-center gap-2">
              제9회 지선 서울시장 개표 추이 실시간 대시보드
              <ArrowUpRight className="h-5 w-5 text-muted-foreground opacity-50 transition-all group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-primary-glow" />
            </h3>
            <p className="text-sm text-muted-foreground mt-2 max-w-xl">
              선관위 데이터를 실시간 크롤링·감지·시각화하는 24/7 무인 대시보드
            </p>
          </div>
        </div>
        <span className="hidden md:inline-flex items-center gap-1.5 rounded-full bg-emerald-500/15 text-emerald-300 px-3 py-1.5 text-[10px] font-semibold flex-shrink-0">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
          LIVE
        </span>
      </Link>

      {/* Problem / Action / Result + Side column */}
      <div className="grid lg:grid-cols-5 gap-5 mb-5">
        {/* Phases */}
        <div className="lg:col-span-3 flex flex-col gap-3">
          {phases.map(({ step, label, icon: Icon, title, body }) => (
            <div
              key={step}
              className="rounded-2xl border border-border bg-gradient-card p-5 md:p-6 hover:border-primary/40 transition-colors"
            >
              <div className="flex items-start gap-4">
                <div className="h-10 w-10 rounded-xl bg-primary/15 border border-primary/30 flex items-center justify-center flex-shrink-0">
                  <Icon className="h-4 w-4 text-primary-glow" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-[10px] tracking-[0.25em] text-muted-foreground mb-1">
                    {step} — {label}
                  </p>
                  <h4 className="font-display text-lg mb-2">{title}</h4>
                  <p className="text-sm text-foreground/80 leading-relaxed">{body}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Side column */}
        <div className="lg:col-span-2 flex flex-col gap-3">
          {/* Key outcome */}
          <div className="rounded-2xl border border-primary/30 bg-gradient-to-br from-primary/15 to-transparent p-6 relative overflow-hidden">
            <div className="absolute -top-10 -right-10 h-32 w-32 rounded-full bg-primary/30 blur-3xl" />
            <div className="relative">
              <p className="text-[10px] tracking-[0.25em] text-primary-glow mb-3">KEY OUTCOME</p>
              <p className="font-display text-3xl leading-tight">
                <span className="text-gradient">100%</span> 자동화
              </p>
              <p className="text-sm text-foreground/85 mt-3 leading-relaxed">
                수집·가공·시각화 전 과정을 무인화하여 수기 모니터링 리소스 0으로 절감
              </p>
            </div>
          </div>

          {/* Tech stack */}
          <div className="rounded-2xl border border-border bg-card/60 p-5">
            <p className="text-[10px] tracking-[0.25em] text-muted-foreground mb-3">TECH STACK</p>
            <div className="flex flex-wrap gap-1.5">
              {stack.map((t) => (
                <span
                  key={t}
                  className="rounded-md bg-primary/10 border border-primary/20 text-primary-glow px-2 py-1 text-[11px] font-mono font-semibold tracking-wider"
                >
                  {t}
                </span>
              ))}
            </div>
          </div>

          {/* Live demo CTA */}
          <a
            href={LIVE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center justify-between rounded-2xl border border-primary/40 bg-gradient-primary px-5 py-4 text-primary-foreground shadow-glow hover:shadow-elevated hover:-translate-y-0.5 transition-all"
          >
            <span className="flex items-center gap-3">
              <span className="h-9 w-9 rounded-lg bg-background/15 flex items-center justify-center">
                <ExternalLink className="h-4 w-4" />
              </span>
              <span>
                <span className="block font-display text-base leading-tight">Live Demo</span>
                <span className="block text-[11px] opacity-80 font-mono">
                  felixlsh0election.streamlit.app
                </span>
              </span>
            </span>
            <ArrowUpRight className="h-5 w-5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </a>
        </div>
      </div>

      {/* Streamlit embed — window chrome */}
      <div className="bezel-border relative rounded-2xl bg-gradient-card shadow-elevated overflow-hidden">
        <div className="pointer-events-none absolute -inset-px rounded-2xl bg-[radial-gradient(60%_80%_at_50%_-10%,hsl(var(--primary-glow)/0.18),transparent_60%)]" />

        {/* Window chrome */}
        <div className="relative flex items-center justify-between px-4 sm:px-5 md:px-6 py-3 sm:py-4 border-b border-border bg-background/40 backdrop-blur">
          <div className="flex items-center gap-3 min-w-0">
            <div className="hidden sm:flex items-center gap-1.5 mr-1">
              <span className="h-2.5 w-2.5 rounded-full bg-rose-400/70" />
              <span className="h-2.5 w-2.5 rounded-full bg-amber-400/70" />
              <span className="h-2.5 w-2.5 rounded-full bg-emerald-400/70" />
            </div>
            <div className="h-8 w-8 rounded-lg bg-primary/15 border border-primary/30 flex items-center justify-center flex-shrink-0">
              <Vote className="h-4 w-4 text-primary-glow" />
            </div>
            <div className="min-w-0">
              <p className="font-display text-sm truncate">Seoul Mayor · Live Tally</p>
              <p className="text-[11px] text-muted-foreground truncate">Powered by Streamlit</p>
            </div>
          </div>
          <div className="flex items-center gap-2 sm:gap-3 flex-shrink-0">
            <span className="flex items-center gap-1.5 rounded-full bg-emerald-500/15 text-emerald-300 px-2.5 py-1 text-[10px] font-semibold">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
              LIVE
            </span>
          </div>
        </div>

        {/* iframe slot */}
        <div className="relative bg-background/60 h-[70vh] min-h-[420px] sm:h-[78vh] sm:min-h-[560px] lg:h-[820px] lg:max-h-[88vh]">
          <div className="pointer-events-none absolute inset-0 rounded-b-2xl ring-1 ring-inset ring-border/60 z-10" />

          {!iframeLoaded && (
            <div className="absolute inset-0 z-20 p-4 sm:p-6 bg-background/80 backdrop-blur-sm flex flex-col gap-4">
              <div className="flex items-center justify-between">
                <Skeleton className="h-5 w-48" />
                <Skeleton className="h-5 w-20" />
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {Array.from({ length: 4 }).map((_, i) => (
                  <Skeleton key={i} className="h-20 rounded-xl" />
                ))}
              </div>
              <Skeleton className="flex-1 w-full rounded-xl" />
              <p className="text-center text-[11px] font-mono text-muted-foreground">
                <span className="inline-block h-1.5 w-1.5 rounded-full bg-primary-glow animate-pulse mr-2 align-middle" />
                Loading Streamlit app…
              </p>
            </div>
          )}

          <iframe
            title="제9회 지선 서울시장 개표 추이 대시보드"
            src={`${LIVE_URL}?embed=true`}
            className="absolute inset-0 w-full h-full"
            frameBorder={0}
            allowFullScreen
            onLoad={() => setIframeLoaded(true)}
            sandbox="allow-storage-access-by-user-activation allow-scripts allow-same-origin allow-popups allow-popups-to-escape-sandbox allow-forms"
          />
        </div>

        {/* status bar */}
        <div className="relative flex items-center justify-between px-4 sm:px-5 md:px-6 py-2 border-t border-border bg-background/40 text-[10px] font-mono text-muted-foreground">
          <span className="flex items-center gap-1.5">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
            connected · streamlit cloud
          </span>
          <span className="hidden sm:inline">felixlsh0election.streamlit.app</span>
        </div>
      </div>
    </section>
  );
};
