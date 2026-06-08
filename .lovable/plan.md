Revert the dark-mode primary blue color and related tokens in `src/index.css` back to their original values before the previous brightening change.

Changes in `:root` (dark mode):
- `--primary`: `224 76% 56%` -> `226 71% 40%`
- `--primary-foreground`: keep `210 40% 98%`
- `--primary-glow`: `217 91% 68%` -> `224 76% 52%`
- `--accent`: `224 76% 56%` -> `226 71% 40%`
- `--ring`: `224 76% 60%` -> `226 71% 50%`
- `--gradient-primary`: `linear-gradient(135deg, hsl(224 76% 56%), hsl(217 91% 68%))` -> `linear-gradient(135deg, hsl(226 71% 40%), hsl(224 76% 52%))`
- `--gradient-radial`: revert `hsl(224 76% 56% / 0.28)` -> `hsl(226 71% 55% / 0.28)` and `hsl(199 89% 60% / 0.20)` -> `hsl(199 89% 60% / 0.20)` (only the first radial's primary color changes)
- `--shadow-glow`: `0 0 60px -10px hsl(224 76% 62% / 0.55)` -> `0 0 60px -10px hsl(226 71% 50% / 0.55)`
- Update comment on line 20 from `/* Deep Blue — brightened for dark bg legibility */` back to original comment or simply `/* Deep Blue */`

No other files are affected.