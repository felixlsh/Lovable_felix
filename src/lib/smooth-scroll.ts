// Smooth, offset-aware scrolling helpers shared by navigation.

export const getHeaderOffset = () => {
  // Mobile has a fixed top bar (~56px); desktop sidebar is side-anchored.
  if (typeof window === "undefined") return 24;
  return window.innerWidth < 1024 ? 72 : 24;
};

const prefersReducedMotion = () =>
  typeof window !== "undefined" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

const easeInOutCubic = (t: number) =>
  t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;

let activeAnimation = 0;

export const cancelSmoothScroll = () => {
  if (activeAnimation) {
    cancelAnimationFrame(activeAnimation);
    activeAnimation = 0;
  }
};

/** Animate window scroll to an absolute Y position with easing. */
export const smoothScrollTo = (targetY: number, duration = 650) =>
  new Promise<void>((resolve) => {
    cancelSmoothScroll();
    const maxY = Math.max(
      0,
      document.documentElement.scrollHeight - window.innerHeight
    );
    const to = Math.min(Math.max(0, targetY), maxY);
    const from = window.scrollY;
    const delta = to - from;

    if (prefersReducedMotion() || Math.abs(delta) < 2) {
      window.scrollTo(0, to);
      resolve();
      return;
    }

    const start = performance.now();
    const step = (now: number) => {
      const t = Math.min(1, (now - start) / duration);
      window.scrollTo(0, from + delta * easeInOutCubic(t));
      if (t < 1) {
        activeAnimation = requestAnimationFrame(step);
      } else {
        activeAnimation = 0;
        resolve();
      }
    };
    activeAnimation = requestAnimationFrame(step);
  });

/** Scroll an element (by id) into view below the fixed header. */
export const smoothScrollToId = async (id: string, extraOffset = 0) => {
  const el = document.getElementById(id);
  if (!el) return false;
  const offset = getHeaderOffset() + extraOffset;
  const target = el.getBoundingClientRect().top + window.scrollY - offset;
  await smoothScrollTo(target);

  // Re-correct once layout settles (lazy images / reveal animations).
  await new Promise((r) => setTimeout(r, 60));
  const corrected =
    document.getElementById(id)!.getBoundingClientRect().top +
    window.scrollY -
    offset;
  if (Math.abs(corrected - window.scrollY) > 8) {
    await smoothScrollTo(corrected, 260);
  }
  return true;
};

// Stop the animation as soon as the user takes over.
if (typeof window !== "undefined") {
  ["wheel", "touchstart", "keydown"].forEach((evt) =>
    window.addEventListener(evt, cancelSmoothScroll, { passive: true })
  );
}
