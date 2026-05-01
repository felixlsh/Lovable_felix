import { type ElementType, type ReactNode, type CSSProperties } from "react";
import { useInView } from "@/hooks/use-in-view";
import { cn } from "@/lib/utils";

interface RevealProps {
  children: ReactNode;
  as?: ElementType;
  delay?: number;
  className?: string;
  style?: CSSProperties;
  /** Optional id passthrough so Reveal can replace plain section/div wrappers */
  id?: string;
}

/**
 * Wraps children in an element that fades + slides up the first time it
 * scrolls into view. Uses the shared `useInView` hook (one-shot).
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

  return (
    <Tag
      ref={ref as React.Ref<HTMLElement>}
      id={id}
      style={{ transitionDelay: inView ? `${delay}ms` : undefined, ...style }}
      className={cn(
        "transition-all duration-700 ease-out will-change-transform",
        inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6",
        className
      )}
    >
      {children}
    </Tag>
  );
};
