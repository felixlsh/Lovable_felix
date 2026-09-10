import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Menu, X, ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { ThemeToggle } from "./ThemeToggle";
import { MotionToggle } from "@/components/MotionToggle";
import { smoothScrollToId, smoothScrollTo } from "@/lib/smooth-scroll";

const items = [
  { id: "about", label: "About" },
  { id: "work", label: "Work" },
  { id: "experience", label: "Experience" },
  { id: "contact", label: "Contact" },
];

export const TopNav = () => {
  const [active, setActive] = useState("about");
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const onHome = location.pathname === "/";

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!onHome) return;
    const els = items
      .map((i) => document.getElementById(i.id))
      .filter((el): el is HTMLElement => Boolean(el));
    if (!els.length) return;

    const io = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible?.target.id) setActive(visible.target.id);
      },
      { rootMargin: "-30% 0px -55% 0px", threshold: [0.05, 0.25, 0.5] }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [onHome, location.pathname]);

  const go = (id: string) => {
    setOpen(false);
    setActive(id);
    if (!onHome) {
      navigate(`/#${id}`);
      return;
    }
    window.setTimeout(() => smoothScrollToId(id), 60);
  };

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-50 pointer-events-none">
        <div className="mx-auto flex max-w-6xl items-center gap-3 px-4 pt-4 md:px-8 md:pt-6">
          <nav
            className={cn(
              "pointer-events-auto flex w-full items-center gap-2 rounded-full px-3 py-2 transition-all duration-300 md:px-4",
              scrolled ? "glass-panel shadow-elevated" : "border border-transparent"
            )}
          >
            <Link
              to="/"
              onClick={(e) => {
                if (onHome) {
                  e.preventDefault();
                  smoothScrollTo(0);
                }
              }}
              className="font-display text-base tracking-tight px-2 py-1"
            >
              Felix<span className="text-primary-glow">.</span>
            </Link>

            <div className="mx-auto hidden items-center gap-1 md:flex">
              {items.map((it) => (
                <button
                  key={it.id}
                  type="button"
                  onClick={() => go(it.id)}
                  className={cn(
                    "relative rounded-full px-4 py-1.5 text-sm transition-colors",
                    onHome && active === it.id
                      ? "text-foreground"
                      : "text-muted-foreground hover:text-foreground"
                  )}
                >
                  {onHome && active === it.id && (
                    <span className="absolute inset-0 rounded-full bg-foreground/[0.07] border border-border" />
                  )}
                  <span className="relative">{it.label}</span>
                </button>
              ))}
            </div>

            <div className="ml-auto flex items-center gap-2 md:ml-0">
              <MotionToggle className="hidden sm:inline-flex" />
              <ThemeToggle className="hidden sm:inline-flex" />
              <button
                type="button"
                onClick={() => go("contact")}
                className="hidden items-center gap-1.5 rounded-full bg-gradient-primary px-4 py-2 text-xs font-semibold text-primary-foreground transition-transform hover:-translate-y-0.5 md:inline-flex"
              >
                연락하기
                <ArrowUpRight className="h-3.5 w-3.5" />
              </button>
              <button
                type="button"
                onClick={() => setOpen((v) => !v)}
                aria-label={open ? "메뉴 닫기" : "메뉴 열기"}
                aria-expanded={open}
                className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-border bg-card/60 backdrop-blur md:hidden"
              >
                {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
              </button>
            </div>
          </nav>
        </div>

        {open && (
          <div className="pointer-events-auto mx-auto mt-2 max-w-6xl px-4 md:hidden">
            <div className="glass-panel rounded-3xl p-3 shadow-elevated">
              {items.map((it) => (
                <button
                  key={it.id}
                  type="button"
                  onClick={() => go(it.id)}
                  className="block w-full rounded-2xl px-4 py-3 text-left text-sm text-foreground/90 hover:bg-foreground/[0.06]"
                >
                  {it.label}
                </button>
              ))}
              <div className="mt-2 flex items-center gap-2 border-t border-border/70 px-2 pt-3">
                <MotionToggle />
                <ThemeToggle />
              </div>
            </div>
          </div>
        )}
      </header>
      {open && (
        <button
          type="button"
          aria-hidden
          tabIndex={-1}
          onClick={() => setOpen(false)}
          className="fixed inset-0 z-40 md:hidden"
        />
      )}
    </>
  );
};
