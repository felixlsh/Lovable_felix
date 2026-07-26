Add a floating "Scroll to Top" button to the portfolio.

### What will be built
- A new `ScrollToTopButton` component in `src/components/ScrollToTopButton.tsx`.
- It will appear when the user scrolls past ~400 px and hide when near the top.
- On click it will smoothly scroll to the top of the page.
- It will use the existing design tokens: primary color, rounded-full, glass-morphism backdrop blur, and shadow.
- It will respect `prefers-reduced-motion` (instant scroll + no entrance animation).
- The button will be rendered globally so it works on both the main page and project detail pages.

### Placement
- Add the component to `src/App.tsx` next to `ScrollProgress` so it is present on every route.
- It will float in the bottom-right corner, offset from the edges so it does not overlap content on mobile.

### Visual design
- Circular button (48 px) with an upward arrow icon (`ArrowUp` from lucide-react).
- Opacity/scale transition when entering and leaving.
- Optional subtle glow matching the existing `shadow-glow` style.

### Accessibility
- `aria-label="맨 위로 스크롤"`.
- Visible focus ring.
- No interference with the existing scroll spy or progress bar.

### Implementation files
- `src/components/ScrollToTopButton.tsx` (new)
- `src/App.tsx` (import + render)