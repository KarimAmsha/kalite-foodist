# Logo assets

Drop the official logo files here with **exactly these names** and they appear
across the site automatically (header, footer, brands strip, hero). Until a file
exists, the site falls back to a styled text mark — nothing looks broken.

| File name                  | Logo                  | Notes                                  |
| -------------------------- | --------------------- | -------------------------------------- |
| `kalite-cikolata.png`      | Kalite Çikolata       | Transparent PNG or SVG. Used in header, footer (on a white pill), brands strip. |
| `nukka.png`                | NUKKA                 | Transparent PNG. Brands strip.         |
| `prosweet.png`             | PROSWEET              | Transparent PNG. Brands strip.         |
| `foodist-istanbul.png`     | Foodist Istanbul      | Transparent PNG. Hero + footer "exhibiting at". |

Tips:
- Prefer **transparent background** PNG (or SVG) so logos sit cleanly on cream
  and dark surfaces.
- Recommended width ≥ 600px for crisp rendering on retina screens.
- If you rename files, update the paths in `src/content/site.ts` (`logos` / `brands`).
