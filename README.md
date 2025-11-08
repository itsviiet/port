# Pearl Creative Portfolio

Minimalist UX portfolio site built from the `Pearl Creative` design system. The layout focuses on strong typography, generous whitespace, and subtle interactions so you can drop in your own case studies, services, and imagery.

## Getting Started

- Serve the site locally with any static server. Example using Python:
  - Python 3: `python -m http.server`
  - Python 2: `python -m SimpleHTTPServer`
- Then visit `http://localhost:8000` (or the port you chose).
- Alternatively open `index.html` directly in a modern browser.

## Project Structure

- `index.html` – semantic structure for navigation, hero, featured work, services, about, and contact.
- `styles.css` – global design tokens, layout grid, responsive typography, and component styling.
- `scripts.js` – sticky header, mobile navigation, intersection-based fade-ins, and dynamic copyright year.

## Customising Content

- Update copy directly in `index.html`. Suggested areas:
  - Hero headline & subheadline (`.hero__headline`, `.hero__subheadline`)
  - Project cards in the Featured Work section (titles, descriptions, metadata links)
  - Service cards (`.service-card`)
  - About narrative, location, collaboration details
  - Contact email, social links, and form labels/placeholders
- Replace `#` links with URLs to case studies, resume, socials, etc.

## Replacing Imagery

- Swap the inline SVG placeholders with your assets:
  - Project cards: update `src` to `/assets/projects/project-name.webp` (create folders if needed).
  - About portrait: update `src` to your photo (`portrait.jpg`).
- Recommended specs:
  - Project images: 1600×900 (16:9), WebP/AVIF preferred, `alt` text describing the work.
  - Portrait: 1200×1600 (3:4), ensure meaningful `alt` text.
- For lazy loading keep the `loading="lazy"` attribute on non-critical images.

## Design Tokens & Typography

- Colors, radii, spacing, and transitions are defined as CSS custom properties at the top of `styles.css`.
- Primary fonts:
  - `Space Grotesk` for display headings.
  - `Inter` for body text and UI elements.
- Adjust global scale by editing the `clamp()` declarations for headings or body size in `styles.css`.

## Interactions & Accessibility

- Intersection Observer fades elements in once as they enter the viewport; respects `prefers-reduced-motion`.
- Mobile navigation toggles at ≤900px with focus management and ARIA attributes (`aria-expanded`, landmark roles).
- Buttons and links include focus indicators; maintain 4.5:1 contrast if introducing new colors.
- Form remains static—hook it up to your provider (e.g., Netlify Forms, Formspree) by adding `action`/`method`.

## Extending the Layout

- Duplicate `.project-card` articles for additional case studies.
- Cast new sections by reusing the `.section` wrapper to keep spacing consistent.
- Use the `.container` class to respect the 1200px content width and responsive paddings.

## Deployment

- Any static hosting works: GitHub Pages, Netlify, Vercel, Cloudflare Pages.
- If using build tools later, keep these files as the source-of-truth and integrate assets into your pipeline.