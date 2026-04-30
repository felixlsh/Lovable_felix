import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

export type TocItem = { id: string; label: string };

export const SectionToc = ({ items }: { items: TocItem[] }) => {
  const [active, setActive] = useState<string>(items[0]?.id ?? "");

  useEffect(() => {
    if (!items.length) return;
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) setActive(visible[0].target.id);
      },
      { rootMargin: "-30% 0px -55% 0px", threshold: [0, 1] }
    );
    items.forEach((it) => {
      const el = document.getElementById(it.id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, [items]);

  const handleClick = (id: string) => {
    document
      .getElementById(id)
      ?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <>
      {/* Desktop right-side TOC */}
      <aside className="hidden xl:block fixed top-32 right-8 z-30 w-52">
        <p className="text-[10px] tracking-[0.25em] text-muted-foreground mb-3 pl-3">
          ON THIS PAGE
        </p>
        <nav className="flex flex-col gap-0.5 border-l border-border/60">
          {items.map((it) => {
            const isActive = active === it.id;
            return (
              <button
                key={it.id}
                onClick={() => handleClick(it.id)}
                className={cn(
                  "text-left text-xs px-3 py-2 -ml-px border-l transition-colors",
                  isActive
                    ? "border-primary-glow text-primary-glow font-semibold"
                    : "border-transparent text-muted-foreground hover:text-foreground hover:border-border"
                )}
              >
                {it.label}
              </button>
            );
          })}
        </nav>
      </aside>

      {/* Mobile/tablet sticky chip nav */}
      <nav className="xl:hidden sticky top-[110px] lg:top-4 z-30 -mx-5 md:-mx-10 lg:-mx-16 mb-8 px-5 md:px-10 lg:px-16 py-2 bg-background/85 backdrop-blur-xl border-y border-border">
        <div className="flex gap-1.5 overflow-x-auto scrollbar-none">
          {items.map((it) => {
            const isActive = active === it.id;
            return (
              <button
                key={it.id}
                onClick={() => handleClick(it.id)}
                className={cn(
                  "flex-shrink-0 rounded-md px-3 py-1.5 text-xs font-medium transition-colors border",
                  isActive
                    ? "bg-primary/15 text-primary-glow border-primary/40"
                    : "border-border/60 text-muted-foreground hover:text-foreground"
                )}
              >
                {it.label}
              </button>
            );
          })}
        </div>
      </nav>
    </>
  );
};
