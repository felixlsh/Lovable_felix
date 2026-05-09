import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

// Disable browser scroll restoration so initial load always starts at the top
if ("scrollRestoration" in window.history) {
  window.history.scrollRestoration = "manual";
}

// Force the page to the top on first entry, before React mounts and during
// the first few frames (defeats late layout shifts, image loads, autofocus, etc.)
window.scrollTo(0, 0);

createRoot(document.getElementById("root")!).render(<App />);

// Keep forcing top for a short window after mount on the very first load only
const start = performance.now();
const forceTop = () => {
  window.scrollTo(0, 0);
  if (performance.now() - start < 800) {
    requestAnimationFrame(forceTop);
  }
};
requestAnimationFrame(forceTop);
