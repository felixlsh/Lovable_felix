import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { ArrowLeft, ExternalLink, CheckCircle2, ZoomIn, BarChart3, FileText, Download } from "lucide-react";
import { getProjectBySlug } from "@/data/projects";
import NotFound from "./NotFound";
import { cn } from "@/lib/utils";
import { Dialog, DialogContent } from "@/components/ui/dialog";

const ProjectDetail = () => {
  const { slug } = useParams();
  const project = getProjectBySlug(slug);
  const [lightbox, setLightbox] = useState<{ src: string; alt: string } | null>(null);

  if (!project) return <NotFound />;

  const Icon = project.icon;
  const isLive = project.status === "In Progress";

  return (
    <div className="min-h-screen bg-background text-foreground">
      <main className="mx-auto max-w-4xl px-5 md:px-10 py-10 md:py-16">
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
          <div className="rounded-2xl border border-primary/30 bg-gradient-to-br from-primary/15 to-transparent p-6">
            <p className="text-[10px] tracking-[0.25em] text-primary-glow mb-3">
              KEY METRIC
            </p>
            <p className="font-display text-4xl text-gradient tabular-nums leading-none">
              {project.metric.v}
            </p>
            <p className="text-xs text-muted-foreground mt-2">
              {project.metric.l}
            </p>
          </div>
          <div className="md:col-span-2 rounded-2xl border border-border bg-gradient-card p-6">
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
          </div>
        </div>

        {/* Role */}
        <section className="mb-12">
          <h2 className="font-display text-2xl mb-5">My Role</h2>
          <ul className="space-y-3">
            {project.role.map((r) => (
              <li
                key={r}
                className="flex items-start gap-3 rounded-xl border border-border bg-card/50 p-4"
              >
                <CheckCircle2 className="h-5 w-5 text-primary-glow flex-shrink-0 mt-0.5" />
                <span className="text-sm text-foreground/90">{r}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* Highlights */}
        <section className="mb-12">
          <h2 className="font-display text-2xl mb-5">Highlights</h2>
          <div className="grid md:grid-cols-3 gap-4">
            {project.highlights.map((h) => (
              <div
                key={h.title}
                className="rounded-2xl border border-border bg-gradient-card p-5 hover:border-primary/40 transition-colors"
              >
                <p className="font-display text-lg text-gradient mb-2">
                  {h.title}
                </p>
                <p className="text-sm text-foreground/80 leading-relaxed">
                  {h.body}
                </p>
              </div>
            ))}
          </div>
        </section>

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
                    <button
                      key={src}
                      type="button"
                      onClick={() =>
                        setLightbox({
                          src,
                          alt: `${g.title} screenshot ${i + 1}`,
                        })
                      }
                      className={cn(
                        "group relative rounded-2xl border border-border bg-muted/30 overflow-hidden shadow-elevated hover:border-primary/40 transition-colors focus:outline-none focus:ring-2 focus:ring-primary/50",
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
                  ))}
                </div>
              </div>
            ))}
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
