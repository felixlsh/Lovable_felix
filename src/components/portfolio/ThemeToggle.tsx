import { useEffect, useState } from "react";
import { Sun, Moon } from "lucide-react";
import { cn } from "@/lib/utils";

export const ThemeToggle = ({ className }: { className?: string }) => {
  const [isLight, setIsLight] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem("theme");
    const light = stored === "light";
    setIsLight(light);
    document.documentElement.classList.toggle("light", light);
  }, []);

  const toggle = () => {
    const next = !isLight;
    setIsLight(next);
    document.documentElement.classList.toggle("light", next);
    localStorage.setItem("theme", next ? "light" : "dark");
  };

  return (
    <button
      onClick={toggle}
      aria-label="Toggle color theme"
      className={cn(
        "relative inline-flex h-9 w-16 items-center rounded-full border border-border bg-card/70 backdrop-blur transition-colors hover:border-primary/50",
        className
      )}
    >
      <span
        className={cn(
          "absolute top-1 h-7 w-7 rounded-full bg-gradient-primary shadow-glow transition-transform duration-300 flex items-center justify-center",
          isLight ? "translate-x-8" : "translate-x-1"
        )}
      >
        {isLight ? (
          <Sun className="h-3.5 w-3.5 text-primary-foreground" />
        ) : (
          <Moon className="h-3.5 w-3.5 text-primary-foreground" />
        )}
      </span>
      <Sun className={cn("absolute left-2 h-3.5 w-3.5 transition-opacity", isLight ? "opacity-0" : "opacity-40 text-muted-foreground")} />
      <Moon className={cn("absolute right-2 h-3.5 w-3.5 transition-opacity", isLight ? "opacity-40 text-muted-foreground" : "opacity-0")} />
    </button>
  );
};
