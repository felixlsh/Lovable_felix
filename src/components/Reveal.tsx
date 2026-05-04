import { type ElementType, type ReactNode, type CSSProperties, useEffect, useState } from "react";
import { useInView } from "@/hooks/use-in-view";
import { cn } from "@/lib/utils";

interface RevealProps {
  children: ReactNode;
  as?: ElementType;
  delay?: number;
  className?: string;
  style?: CSSProperties;
  id?: string;
}

/** Cap stagger delay so fast scrollers don't wait too long. */
const MAX_DELAY = 300;

/**
 * Wraps children in an element that fades + slides up the first time it
 * scrolls into view. Respects `prefers-reduced-motion` (no transform/opacity
 * animation) and caps the stagger delay.
 */
export const Reveal = ({
  children,
  as: Tag = "div",
  delay = 0,
  className,
  style,
  id,
}: RevealProps) => {
  const { ref, inView } = useInView<HTMLElement>();
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined" || !window.matchMedia) return;
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(mq.matches);
    const onChange = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  const cappedDelay = Math.min(delay, MAX_DELAY);
  const visible = inView || reducedMotion;

  return (
    <Tag
      ref={ref as React.Ref<HTMLElement>}
      id={id}
      style={{
        transitionDelay: visible && !reducedMotion ? `${cappedDelay}ms` : undefined,
        ...style,
      }}
      className={cn(
        reducedMotion
          ? "opacity-100"
          : cn(
              "transition-all duration-700 ease-out will-change-transform",
              visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
            ),
        className
      )}
    >
      {children}
    </Tag>
  );
};
