import { useEffect, useState } from "react";
import { User, Briefcase, FolderKanban, Mail, BarChart3 } from "lucide-react";
import { cn } from "@/lib/utils";
import { ThemeToggle } from "./ThemeToggle";

const items = [
  { id: "about", label: "About", icon: User },
  { id: "experience", label: "Experience", icon: Briefcase },
  { id: "projects", label: "Projects", icon: FolderKanban },
  { id: "contact", label: "Contact", icon: Mail },
];

export const Sidebar = () => {
  const [active, setActive] = useState("about");

  useEffect(() => {
    const onScroll = () => {
      for (const it of items) {
        const el = document.getElementById(it.id);
        if (!el) continue;
        const rect = el.getBoundingClientRect();
        if (rect.top <= 160 && rect.bottom >= 160) {
          setActive(it.id);
          break;
        }
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const go = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <>
      {/* Desktop sidebar */}
      <aside className="hidden lg:flex fixed left-0 top-0 z-40 h-screen w-64 flex-col border-r border-border bg-sidebar/80 backdrop-blur-xl px-6 py-8">
        <div className="flex items-center gap-3 mb-12">
          <div className="h-10 w-10 rounded-xl bg-gradient-primary flex items-center justify-center shadow-glow">
            <BarChart3 className="h-5 w-5 text-primary-foreground" />
          </div>
          <div>
            <p className="font-display text-base">Felix</p>
            <p className="text-xs text-muted-foreground">Data Analyst</p>
          </div>
        </div>

        <nav className="flex flex-col gap-1">
          <p className="text-[10px] tracking-[0.2em] text-muted-foreground mb-3 px-3">NAVIGATION</p>
          {items.map(({ id, label, icon: Icon }) => {
            const isActive = active === id;
            return (
              <button
                key={id}
                onClick={() => go(id)}
                className={cn(
                  "group flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm transition-all",
                  isActive
                    ? "bg-primary/15 text-foreground shadow-[inset_0_0_0_1px_hsl(var(--primary)/0.4)]"
                    : "text-muted-foreground hover:bg-sidebar-accent hover:text-foreground"
                )}
              >
                <Icon className={cn("h-4 w-4 transition-colors", isActive && "text-primary-glow")} />
                <span className="font-medium">{label}</span>
                {isActive && <span className="ml-auto h-1.5 w-1.5 rounded-full bg-primary-glow shadow-glow" />}
              </button>
            );
          })}
        </nav>

        <div className="mt-auto rounded-xl border border-border bg-card/50 p-4">
          <div className="flex items-center gap-2 mb-2">
            <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
            <p className="text-xs text-muted-foreground">Available for hire</p>
          </div>
          <p className="text-xs text-foreground/80 leading-relaxed">
            데이터로 비즈니스 임팩트를 만들 기회를 찾고 있습니다.
          </p>
        </div>
      </aside>

      {/* Desktop floating theme toggle */}
      <div className="hidden lg:block fixed top-6 right-6 z-50">
        <ThemeToggle />
      </div>

      {/* Mobile top nav */}
      <header className="lg:hidden sticky top-0 z-40 border-b border-border bg-background/85 backdrop-blur-xl">
        <div className="flex items-center justify-between px-4 py-3 gap-3">
          <div className="flex items-center gap-2 flex-shrink-0">
            <div className="h-8 w-8 rounded-lg bg-gradient-primary flex items-center justify-center">
              <BarChart3 className="h-4 w-4 text-primary-foreground" />
            </div>
            <span className="font-display text-sm">Felix</span>
          </div>
          <ThemeToggle className="!h-8 !w-14 flex-shrink-0" />
        </div>
        <nav className="flex gap-1 px-3 pb-2 overflow-x-auto scrollbar-none">
          {items.map(({ id, label }) => (
            <button
              key={id}
              onClick={() => go(id)}
              className={cn(
                "rounded-md px-3 py-1.5 text-xs font-medium transition-colors flex-shrink-0",
                active === id
                  ? "bg-primary/20 text-foreground"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              {label}
            </button>
          ))}
        </nav>
      </header>
    </>
  );
};
