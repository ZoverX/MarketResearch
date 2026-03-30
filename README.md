# Market Research Notes

An Astro-based static knowledge site for market research and analytics notes, designed for GitHub Pages project-site deployment.

## Stack

- Astro
- Markdown content collections
- Minimal client-side JavaScript for filtering and chooser interactions
- GitHub Actions deployment to GitHub Pages

## Local setup

1. Install Node.js 24 or later.
2. Run `npm ci`.
3. Run `npm run dev`.
4. Open the local Astro URL shown in the terminal.

## Build commands

- `npm run dev` starts the local dev server
- `npm run build` creates the production build in `dist/`
- `npm run preview` previews the production build locally
- `npm run check` runs Astro type and content checks

## Content structure

- `src/content/basics/` holds foundational pages
- `src/content/methodologies/` holds methodology pages
- `src/content/displayr/` holds workflow notes
- `src/content/sawtooth/` holds Sawtooth-specific notes
- `src/content/glossary/` holds glossary entries

## Adding a new methodology page

1. Create a new Markdown file in `src/content/methodologies/`.
2. Follow the frontmatter pattern used in the existing methodology pages.
3. Set `related` to the slugs of connected methodology pages.
4. Add chooser metadata such as `chooserGoal` and `chooserOutput` so the method chooser includes it automatically.
5. Add body content under the frontmatter for overview notes, interpretation context, or screenshots.

## GitHub Pages deployment

The workflow in `.github/workflows/static.yml`:

1. Installs dependencies with `npm ci`
2. Builds the Astro site
3. Passes the repository name into Astro so the `base` path matches a GitHub Pages project site
4. Uploads `dist/` to GitHub Pages

If you later convert this to a user site such as `username.github.io`, update the build environment so `PUBLIC_BASE_PATH` becomes `/`.

## Notes for extension

- The method chooser and glossary are intentionally local and dependency-free.
- The dark theme is the default visual system.
- Placeholder demo panels mark where future screenshots or mini teaching interactions can be added.
