import { useEffect } from "react";
import { useLocation } from "react-router-dom";

/**
 * On route change:
 * - If there's a hash (#section), smooth-scroll to it after mount
 * - Otherwise, jump to top
 * Also disables the browser's automatic scroll restoration which can
 * leave the page stuck at a previously-saved offset on first load.
 */
const ScrollToTop = () => {
  const { pathname, hash, key } = useLocation();

  useEffect(() => {
    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }
  }, []);

  useEffect(() => {
    if (hash) {
      // Wait a tick for the target section to render
      const id = hash.replace("#", "");
      requestAnimationFrame(() => {
        const el = document.getElementById(id);
        if (el) {
          el.scrollIntoView({ behavior: "smooth", block: "start" });
        } else {
          window.scrollTo({ top: 0, left: 0 });
        }
      });
      return;
    }
    window.scrollTo({ top: 0, left: 0 });
  }, [pathname, hash, key]);

  return null;
};

export default ScrollToTop;
