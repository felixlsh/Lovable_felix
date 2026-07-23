import { useMemo, useRef, useState, type MouseEvent } from "react";
import { ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";
import { useInView } from "@/hooks/use-in-view";
import { cn } from "@/lib/utils";
import { projects, type Project } from "@/data/projects";
import { CaseStudyCard } from "./CaseStudyCard";

const ProjectCard = ({ p, index }: { p: Project; index: number }) => {
  const Icon = p.icon;
  const isLive = p.status === "In Progress";
  const cardRef = useRef<HTMLAnchorElement | null>(null);
  const { ref: viewRef, inView } = useInView<HTMLAnchorElement>();

  const setRefs = (el: HTMLAnchorElement | null) => {
    cardRef.current = el;
    viewRef.current = el;
  };

  const onMove = (e: MouseEvent<HTMLAnchorElement>) => {
    const el = cardRef.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    el.style.setProperty("--mx", `${e.clientX - r.left}px`);
    el.style.setProperty("--my", `${e.clientY - r.top}px`);
  };

  return (
    <Link
      ref={setRefs}
      to={`/projects/${p.slug}`}
      onMouseMove={onMove}
      className={cn(
        "shine group relative block rounded-2xl border border-border bg-gradient-card p-6 md:p-7 overflow-hidden transition-all duration-300 hover:border-primary/60 hover:-translate-y-1 hover:shadow-elevated opacity-0",
        inView && "animate-fade-up"
      )}
      style={{ animationDelay: inView ? `${index * 100}ms` : undefined }}
    >
      {/* Cursor-following spotlight */}
      <div
        className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{
          background:
            "radial-gradient(420px circle at var(--mx, 50%) var(--my, 50%), hsl(var(--primary-glow) / 0.18), transparent 45%)",
        }}
      />
      <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-primary/10 blur-3xl opacity-0 group-hover:opacity-100 transition-opacity" />

      <div className="relative z-[2]">
        <div className="flex items-start justify-between mb-5">
          <div className="h-12 w-12 rounded-xl bg-primary/15 border border-primary/30 flex items-center justify-center transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3">
            <Icon className="h-5 w-5 text-primary-glow" />
          </div>
          <span
            className={cn(
              "inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[10px] font-semibold",
              isLive ? "bg-primary/20 text-primary-glow" : "bg-emerald-500/15 text-emerald-300"
            )}
          >
            <span className={cn("h-1.5 w-1.5 rounded-full", isLive ? "bg-primary-glow animate-pulse" : "bg-emerald-400")} />
            {p.status}
          </span>
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

        <ArrowUpRight className="absolute -top-1 -right-1 h-5 w-5 text-muted-foreground opacity-40 group-hover:opacity-100 group-hover:text-primary-glow group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
      </div>
    </Link>
  );
};

export const Projects = () => {
  const header = useInView<HTMLDivElement>();
  const filterRow = useInView<HTMLDivElement>();
  const [selected, setSelected] = useState<string>("All");

  const tagOptions = useMemo(() => {
    const counts = new Map<string, number>();
    const order: string[] = [];
    projects.forEach((p) => {
      p.tags.forEach((t) => {
        if (!counts.has(t)) order.push(t);
        counts.set(t, (counts.get(t) ?? 0) + 1);
      });
    });
    const sorted = order
      .map((t) => ({ tag: t, count: counts.get(t)! }))
      .sort((a, b) => b.count - a.count || order.indexOf(a.tag) - order.indexOf(b.tag));
    return [{ tag: "All", count: projects.length }, ...sorted];
  }, []);

  const filtered = useMemo(
    () => (selected === "All" ? projects : projects.filter((p) => p.tags.includes(selected))),
    [selected]
  );

  return (
    <section id="projects" className="py-20 lg:py-28">
      <div
        ref={header.ref}
        className={cn(
          "flex items-end justify-between mb-8 opacity-0",
          header.inView && "animate-fade-up"
        )}
      >
        <div>
          <p className="text-[10px] tracking-[0.25em] text-muted-foreground mb-3">03 — SELECTED WORK</p>
          <h2 className="font-display text-4xl md:text-5xl">Projects</h2>
        </div>
        <p className="hidden md:block text-sm text-muted-foreground max-w-xs text-right">
          데이터 시각화부터 자동화까지 — 문제 해결 중심의 작업물
        </p>
      </div>

      <div
        ref={filterRow.ref}
        className={cn(
          "flex flex-wrap gap-2 mb-8 opacity-0",
          filterRow.inView && "animate-fade-up"
        )}
        style={{ animationDelay: filterRow.inView ? "60ms" : undefined }}
        role="tablist"
        aria-label="Filter projects by tag"
      >
        {tagOptions.map(({ tag, count }) => {
          const isActive = selected === tag;
          return (
            <button
              key={tag}
              role="tab"
              aria-selected={isActive}
              onClick={() => setSelected(tag)}
              className={cn(
                "inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs transition-all",
                isActive
                  ? "bg-primary/15 text-primary-glow border-primary/40 shadow-[inset_0_0_0_1px_hsl(var(--primary)/0.25)]"
                  : "bg-muted/40 text-muted-foreground border-border hover:text-foreground hover:border-primary/40"
              )}
            >
              <span>{tag}</span>
              <span className={cn("text-[10px] tabular-nums", isActive ? "opacity-80" : "opacity-60")}>
                {count}
              </span>
            </button>
          );
        })}
      </div>

      <div className="grid md:grid-cols-2 gap-5">
        {filtered.length === 0 ? (
          <div className="md:col-span-2 rounded-2xl border border-dashed border-border bg-muted/20 p-10 text-center">
            <p className="text-sm text-muted-foreground mb-4">해당 태그의 프로젝트가 없어요.</p>
            <button
              onClick={() => setSelected("All")}
              className="inline-flex items-center gap-1.5 rounded-full border border-primary/40 bg-primary/10 px-3 py-1.5 text-xs text-primary-glow hover:bg-primary/20 transition-colors"
            >
              All 보기
            </button>
          </div>
        ) : (
          filtered.map((p, i) =>
            p.caseStudy ? (
              <CaseStudyCard key={p.slug} p={p} index={i} />
            ) : (
              <ProjectCard key={p.slug} p={p} index={i} />
            )
          )
        )}
      </div>
    </section>
  );
};
