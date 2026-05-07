import { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";

/**
 * Robust scroll handling on route/hash change:
 * - Disables browser's automatic scroll restoration
 * - If a hash is present, polls for the target element (it may mount async / after images)
 *   and smooth-scrolls to it, accounting for the sticky header height
 * - Otherwise jumps to top
 */
const SCROLL_OFFSET = 64; // sticky header height (~h-14)
const MAX_WAIT_MS = 3000;
const POLL_INTERVAL_MS = 50;

const ScrollToTop = () => {
  const { pathname, hash, key } = useLocation();
  const rafRef = useRef<number | null>(null);
  const timeoutRef = useRef<number | null>(null);

  useEffect(() => {
    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }
  }, []);

  useEffect(() => {
    // Cancel any pending scroll attempts from previous navigation
    if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
    if (timeoutRef.current !== null) window.clearTimeout(timeoutRef.current);

    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    const behavior: ScrollBehavior = prefersReduced ? "auto" : "smooth";

    if (!hash) {
      // Force top across multiple frames to defeat late layout shifts,
      // async image loads, autofocus, or animations scrolling the page.
      const startNoHash = performance.now();
      const forceTop = () => {
        window.scrollTo({ top: 0, left: 0, behavior: "auto" });
        if (performance.now() - startNoHash < 600) {
          rafRef.current = requestAnimationFrame(forceTop);
        }
      };
      rafRef.current = requestAnimationFrame(forceTop);
      return () => {
        if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
      };
    }

    const id = decodeURIComponent(hash.replace("#", ""));
    const start = performance.now();

    const tryScroll = () => {
      const el = document.getElementById(id);
      if (el) {
        const top =
          el.getBoundingClientRect().top + window.scrollY - SCROLL_OFFSET;
        window.scrollTo({ top: Math.max(0, top), left: 0, behavior });
        return;
      }
      if (performance.now() - start < MAX_WAIT_MS) {
        timeoutRef.current = window.setTimeout(() => {
          rafRef.current = requestAnimationFrame(tryScroll);
        }, POLL_INTERVAL_MS);
      } else {
        // Fallback: target never appeared, go to top
        window.scrollTo({ top: 0, left: 0, behavior: "auto" });
      }
    };

    rafRef.current = requestAnimationFrame(tryScroll);

    return () => {
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
      if (timeoutRef.current !== null) window.clearTimeout(timeoutRef.current);
    };
  }, [pathname, hash, key]);

  return null;
};

export default ScrollToTop;
