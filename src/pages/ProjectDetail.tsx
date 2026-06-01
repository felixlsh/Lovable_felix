import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { ArrowLeft, CheckCircle2, ZoomIn, BarChart3, FileText, Download } from "lucide-react";
import { getProjectBySlug } from "@/data/projects";
import NotFound from "./NotFound";
import { cn } from "@/lib/utils";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Sidebar } from "@/components/portfolio/Sidebar";
import { Reveal } from "@/components/Reveal";

const ProjectDetail = () => {
  const { slug } = useParams();
  const project = getProjectBySlug(slug);
  const [lightbox, setLightbox] = useState<{ src: string; alt: string } | null>(null);

  // Smooth scroll to top on entry for a natural page-to-page transition
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [slug]);

  if (!project) return <NotFound />;

  const Icon = project.icon;
  const isLive = project.status === "In Progress";

  return (
    <div className="min-h-screen bg-background text-foreground animate-fade-in">
      <Sidebar />
      <main className="lg:pl-64">
        {/* Sticky sub-header */}
        <div className="sticky top-0 z-30 border-b border-border bg-background/80 backdrop-blur-md supports-[backdrop-filter]:bg-background/60">
          <div className="mx-auto max-w-6xl px-5 md:px-10 lg:px-16 h-14 flex items-center gap-3">
            <Link
              to="/#projects"
              className="inline-flex items-center justify-center h-8 w-8 rounded-md border border-border bg-card/60 text-muted-foreground hover:text-foreground hover:border-primary/40 transition-colors flex-shrink-0"
              aria-label="Back to projects"
            >
              <ArrowLeft className="h-4 w-4" />
            </Link>
            <div className="h-7 w-7 rounded-md bg-primary/15 border border-primary/30 flex items-center justify-center flex-shrink-0">
              <Icon className="h-3.5 w-3.5 text-primary-glow" />
            </div>
            <p className="font-display text-sm sm:text-base truncate">{project.title}</p>
            <span
              className={cn(
                "ml-auto inline-flex items-center gap-1.5 rounded-full px-2 py-0.5 text-[10px] font-semibold flex-shrink-0",
                isLive
                  ? "bg-primary/20 text-primary-glow"
                  : "bg-emerald-500/15 text-emerald-300"
              )}
            >
              <span
                className={cn(
                  "h-1.5 w-1.5 rounded-full",
                  isLive ? "bg-primary-glow animate-pulse" : "bg-emerald-400"
                )}
              />
              {project.status}
            </span>
            <span className="hidden sm:inline-flex items-center rounded-full border border-border bg-muted/40 px-2 py-0.5 text-[10px] font-mono text-muted-foreground tabular-nums flex-shrink-0">
              {project.metric.v} · {project.metric.l}
            </span>
          </div>
        </div>

        <div className="mx-auto max-w-6xl px-5 md:px-10 lg:px-16 py-10 md:py-16 animate-fade-in" style={{ animationDelay: "80ms", animationFillMode: "backwards" }}>
        {/* Back link */}
        <Link
          to="/#projects"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-10"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to projects
        </Link>

        {/* Header */}
        <div className="mb-10">
          <div className="flex items-center gap-4 mb-6">
            <div className="h-14 w-14 rounded-xl bg-primary/15 border border-primary/30 flex items-center justify-center">
              <Icon className="h-6 w-6 text-primary-glow" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground mb-1">{project.org}</p>
              <span
                className={cn(
                  "inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[10px] font-semibold",
                  isLive
                    ? "bg-primary/20 text-primary-glow"
                    : "bg-emerald-500/15 text-emerald-300"
                )}
              >
                <span
                  className={cn(
                    "h-1.5 w-1.5 rounded-full",
                    isLive ? "bg-primary-glow animate-pulse" : "bg-emerald-400"
                  )}
                />
                {project.status}
              </span>
            </div>
          </div>

          <h1 className="font-display text-4xl md:text-5xl mb-4 leading-tight">
            {project.title}
          </h1>
          <p className="text-base md:text-lg text-foreground/80 leading-relaxed max-w-3xl">
            {project.overview}
          </p>
        </div>

        {/* Preview image */}
        {project.image && (
          <div className="mb-12 rounded-2xl border border-border bg-gradient-card overflow-hidden shadow-elevated">
            <img
              src={project.image}
              alt={`${project.title} preview`}
              className="w-full h-auto block"
              loading="lazy"
            />
          </div>
        )}

        {/* Metric + tags */}
        <div className="grid md:grid-cols-3 gap-4 mb-12">
          <Reveal className="rounded-2xl border border-primary/30 bg-gradient-to-br from-primary/15 to-transparent p-6">
            <p className="text-[10px] tracking-[0.25em] text-primary-glow mb-3">
              KEY METRIC
            </p>
            <p className="font-display text-4xl text-gradient tabular-nums leading-none">
              {project.metric.v}
            </p>
            <p className="text-xs text-muted-foreground mt-2">
              {project.metric.l}
            </p>
          </Reveal>
          <Reveal delay={120} className="md:col-span-2 rounded-2xl border border-border bg-gradient-card p-6">
            <p className="text-[10px] tracking-[0.25em] text-muted-foreground mb-3">
              TECH STACK
            </p>
            <div className="flex flex-wrap gap-2">
              {project.stack.map((s) => (
                <span
                  key={s}
                  className="text-xs font-mono text-foreground/90 bg-muted/60 border border-border rounded-md px-2.5 py-1"
                >
                  {s}
                </span>
              ))}
            </div>
          </Reveal>
        </div>

        {/* Role */}
        <section className="mb-12">
          <h2 className="font-display text-2xl mb-5">My Role</h2>
          <ul className="space-y-3">
            {project.role.map((r, i) => (
              <Reveal
                as="li"
                key={r}
                delay={i * 80}
                className="flex items-start gap-3 rounded-xl border border-border bg-card/50 p-4"
              >
                <CheckCircle2 className="h-5 w-5 text-primary-glow flex-shrink-0 mt-0.5" />
                <span className="text-sm text-foreground/90">{r}</span>
              </Reveal>
            ))}
          </ul>
        </section>

        {/* Highlights */}
        <section className="mb-12">
          <h2 className="font-display text-2xl mb-5">Highlights</h2>
          <div className="grid md:grid-cols-3 gap-4">
            {project.highlights.map((h, i) => (
              <Reveal
                key={h.title}
                delay={i * 100}
                className="rounded-2xl border border-border bg-gradient-card p-5 hover:border-primary/40 transition-colors"
              >
                <p className="font-display text-lg text-gradient mb-2">
                  {h.title}
                </p>
                <p className="text-sm text-foreground/80 leading-relaxed">
                  {h.body}
                </p>
              </Reveal>
            ))}
          </div>
        </section>


        {/* Live embed (e.g. Looker Studio) */}
        {project.embedUrl && (
          <section className="mb-12">
            <div className="mb-5">
              <p className="text-[10px] tracking-[0.25em] text-primary-glow mb-1.5">
                LIVE DASHBOARD
              </p>
              <h2 className="font-display text-2xl">{project.title} · Live</h2>
              <p className="text-sm text-muted-foreground mt-1">
                실시간으로 동기화되는 Looker Studio 대시보드입니다.
              </p>
            </div>
            <div className="bezel-border relative rounded-2xl bg-gradient-card shadow-elevated overflow-hidden">
              <div className="relative flex items-center justify-between px-4 sm:px-5 py-3 border-b border-border bg-background/40 backdrop-blur">
                <div className="flex items-center gap-3 min-w-0">
                  <div className="hidden sm:flex items-center gap-1.5 mr-1">
                    <span className="h-2.5 w-2.5 rounded-full bg-rose-400/70" />
                    <span className="h-2.5 w-2.5 rounded-full bg-amber-400/70" />
                    <span className="h-2.5 w-2.5 rounded-full bg-emerald-400/70" />
                  </div>
                  <div className="h-8 w-8 rounded-lg bg-primary/15 border border-primary/30 flex items-center justify-center flex-shrink-0">
                    <BarChart3 className="h-4 w-4 text-primary-glow" />
                  </div>
                  <div className="min-w-0">
                    <p className="font-display text-sm truncate">ROK Live Dashboard</p>
                    <p className="text-[11px] text-muted-foreground truncate">
                      Powered by Looker Studio
                    </p>
                  </div>
                </div>
                <span className="flex items-center gap-1.5 rounded-full bg-emerald-500/15 text-emerald-300 px-2.5 py-1 text-[10px] font-semibold">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  LIVE
                </span>
              </div>
              <div className="relative aspect-video bg-background/60">
                <iframe
                  title={`${project.title} Live Dashboard`}
                  src={project.embedUrl}
                  className="absolute inset-0 w-full h-full"
                  frameBorder={0}
                  allowFullScreen
                  sandbox="allow-storage-access-by-user-activation allow-scripts allow-same-origin allow-popups allow-popups-to-escape-sandbox"
                />
              </div>
            </div>
          </section>
        )}

        {/* Galleries (grouped) */}
        {project.galleries && project.galleries.length > 0 && (
          <section className="mb-12 space-y-10">
            {project.galleries.map((g) => (
              <div key={g.title}>
                <div className="mb-5 flex items-end justify-between gap-4 flex-wrap">
                  <div>
                    <p className="text-[10px] tracking-[0.25em] text-primary-glow mb-1.5">
                      SECTION
                    </p>
                    <h2 className="font-display text-2xl">{g.title}</h2>
                    {g.subtitle && (
                      <p className="text-sm text-muted-foreground mt-1">
                        {g.subtitle}
                      </p>
                    )}
                  </div>
                  <span className="text-[11px] font-mono text-muted-foreground">
                    {g.images.length} {g.images.length === 1 ? "screen" : "screens"}
                  </span>
                </div>
                <div
                  className={cn(
                    "grid gap-4",
                    g.images.length > 1 && "sm:grid-cols-2"
                  )}
                >
                  {g.images.map((src, i) => (
                    <Reveal key={src} delay={i * 100}>
                      <button
                        type="button"
                        onClick={() =>
                          setLightbox({
                            src,
                            alt: `${g.title} screenshot ${i + 1}`,
                          })
                        }
                        className={cn(
                          "group relative w-full block rounded-2xl border border-border bg-muted/30 overflow-hidden shadow-elevated hover:border-primary/40 transition-colors focus:outline-none focus:ring-2 focus:ring-primary/50",
                          g.images.length === 1 ? "aspect-[16/7]" : "aspect-[4/3]"
                        )}
                      >
                        <img
                          src={src}
                          alt={`${g.title} screenshot ${i + 1}`}
                          className="absolute inset-0 w-full h-full object-contain transition-transform duration-300 group-hover:scale-[1.02]"
                          loading="lazy"
                        />
                        <span className="absolute top-2 right-2 inline-flex items-center justify-center h-8 w-8 rounded-full bg-background/80 backdrop-blur-sm text-foreground/80 opacity-0 group-hover:opacity-100 transition-opacity">
                          <ZoomIn className="h-4 w-4" />
                        </span>
                      </button>
                    </Reveal>
                  ))}
                </div>
              </div>
            ))}
          </section>
        )}

        {/* PDF embed */}
        {project.pdfUrl && (
          <section className="mb-12">
            <div className="mb-5 flex items-end justify-between gap-4 flex-wrap">
              <div>
                <p className="text-[10px] tracking-[0.25em] text-primary-glow mb-1.5">
                  DOCUMENT
                </p>
                <h2 className="font-display text-2xl">졸업작품 보고서</h2>
                <p className="text-sm text-muted-foreground mt-1">
                  프로젝트 진행 과정과 결과를 정리한 PDF 보고서입니다.
                </p>
              </div>
              <a
                href={project.pdfUrl}
                download
                className="inline-flex items-center gap-2 rounded-xl border border-border bg-card/60 hover:border-primary/40 hover:text-primary-glow text-foreground/90 px-4 py-2 text-xs font-semibold transition-colors"
              >
                <Download className="h-3.5 w-3.5" />
                Download PDF
              </a>
            </div>
            <div className="rounded-2xl border border-border bg-gradient-card overflow-hidden shadow-elevated">
              <div className="flex items-center gap-2 px-4 py-3 border-b border-border bg-background/40 text-[11px] font-mono text-muted-foreground">
                <FileText className="h-3.5 w-3.5 text-primary-glow" />
                graduation-report.pdf
              </div>
              <iframe
                title="졸업작품 보고서"
                src={`${project.pdfUrl}#view=FitH`}
                className="w-full h-[80vh] bg-background"
              />
            </div>
          </section>
        )}

        {/* External link */}
        <a
          href={project.externalHref}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 rounded-xl border border-primary/40 bg-primary/10 hover:bg-primary/20 text-primary-glow px-5 py-3 text-sm font-semibold transition-colors"
        >
          상세 케이스 스터디 보기
          <ExternalLink className="h-4 w-4" />
        </a>
        </div>
      </main>

      <Dialog open={!!lightbox} onOpenChange={(o) => !o && setLightbox(null)}>
        <DialogContent className="max-w-[95vw] md:max-w-5xl p-2 bg-background/95 border-border">
          {lightbox && (
            <img
              src={lightbox.src}
              alt={lightbox.alt}
              className="w-full h-auto max-h-[85vh] object-contain rounded-lg"
            />
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ProjectDetail;
