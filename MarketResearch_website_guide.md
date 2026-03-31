# Market Research Website Guide

## What this guide is for

This document explains how the `MarketResearch` repo works and how to safely change it.

It assumes you are a beginner.

It is written so you can understand:

- what the repo is made of
- how content becomes pages
- how navigation and styling work
- how to add or edit content
- how to add new pages or sections
- how to avoid the compatibility problems we already had to fix

---

## 1. What this website is

This project is a **static website** built with **Astro** and deployed to **GitHub Pages**.

Static means:

- pages are built into HTML ahead of time
- there is no backend server or database
- GitHub Pages can host it directly

This is a good fit because your website is mainly a structured knowledge library.

---

## 2. Main technologies and why they are used

### Astro

Astro is the framework that builds the site.

It is used for:

- routing
- layouts
- reusable components
- content collections
- static site generation

Why it was chosen:

- strong for content-heavy websites
- works well with Markdown
- simple GitHub Pages deployment
- avoids unnecessary frontend complexity

### Markdown

Markdown is used for most written content.

It is used in:

- `src/content/basics/`
- `src/content/methodologies/`
- `src/content/displayr/`
- `src/content/sawtooth/`
- `src/content/glossary/`

Why it was chosen:

- easy to edit
- beginner-friendly
- clean for long-form educational content

### Astro content collections

Content collections are Astro’s way of grouping and validating Markdown entries.

They are used so:

- content is structured
- required fields are enforced
- pages can be generated from content automatically

In this repo, collections include:

- `basics`
- `methodologies`
- `displayr`
- `sawtooth`
- `glossary`

### Components

Components are reusable chunks of UI.

Examples:

- header
- footer
- hero section
- methodology details block
- collection card list

Why they are used:

- avoid repeating code
- keep the site consistent
- make future changes easier

### CSS

CSS controls:

- colors
- spacing
- typography
- layout
- responsive behavior
- interaction styling

### GitHub Actions

GitHub Actions builds and deploys the site automatically whenever you push to `main`.

### GitHub Pages

GitHub Pages hosts the finished built website online.

---

## 3. Repo structure

Repo location:

`c:\Users\zihao\Desktop\MyRepo\MarketResearch`

Important files and folders:

### `package.json`

Defines:

- dependencies
- scripts like `npm run dev` and `npm run build`

### `package-lock.json`

Locks exact dependency versions.

This is why the workflow can use `npm ci`.

### `astro.config.mjs`

Astro configuration.

Important in this project because:

- GitHub Pages project sites need a base path
- this repo is hosted under `/MarketResearch/`

### `src/content.config.ts`

Defines the content collections.

This file is especially important in Astro 6 because it uses explicit `glob()` loaders to tell Astro:

- where each collection lives
- what schema each collection uses

### `src/content/`

Holds Markdown content.

Subfolders:

- `basics/`
- `methodologies/`
- `displayr/`
- `sawtooth/`
- `glossary/`

### `src/pages/`

Defines routes.

Examples:

- `src/pages/index.astro` -> homepage
- `src/pages/about.astro` -> `/about/`
- `src/pages/basics/index.astro` -> `/basics/`
- `src/pages/basics/[slug].astro` -> `/basics/<page>/`

### `src/components/`

Reusable UI pieces.

### `src/layouts/`

Shared page wrappers, especially:

- `BaseLayout.astro`

### `src/lib/`

Shared utility logic.

Most importantly:

- `src/lib/content.ts`

This file helps with:

- route building
- collection ordering
- GitHub Pages base path handling
- converting content entry ids into URLs

### `src/styles/global.css`

The main stylesheet for the whole site.

### `.github/workflows/static.yml`

The GitHub Actions deployment workflow.

### `public/`

For static assets like images and downloadable files.

---

## 4. How content becomes a webpage

This is the most important concept in the repo.

The flow is:

1. You create a Markdown file in `src/content/...`
2. Astro loads it through `src/content.config.ts`
3. A page in `src/pages/...` reads that collection
4. Astro generates HTML for it
5. GitHub Pages serves the built page

So content files do not appear on the site “by themselves”.
They only appear when a page template uses them.

---

## 5. Astro 6 compatibility rules in this repo

These matter because the repo originally used older content collection patterns.

### Rule 1: collections use loaders

In Astro 6, this repo uses `glob()` loaders in:

- `src/content.config.ts`

Example idea:

- `methodologies` loads all Markdown from `src/content/methodologies`

### Rule 2: entries use `id`, not `slug`

With the loader-based setup, content entries are identified with `entry.id`.

The repo normalizes that id into the final route path.

Example:

- file: `panel-providers.md`
- id: `panel-providers.md`
- final route path: `/basics/panel-providers/`

### Rule 3: rendered content uses `render(entry)`

In this repo, rendering content entries uses:

```ts
import { render } from "astro:content";
const { Content } = await render(entry);
```

Do not assume the older `entry.render()` pattern still applies.

---

## 6. What frontmatter is

At the top of each Markdown file you see a block like:

```md
---
title: Panel providers
description: A starter guide to what panel providers do and how to think about quality, fit, and risk.
section: Basic Info
order: 5
tags: [Sampling, Suppliers]
related: [standard-project-process, types-of-data-we-deal-with]
summary: Frame panel suppliers as a sample-quality decision rather than a procurement detail.
---
```

This is frontmatter.

It controls metadata like:

- title
- description
- order
- tags
- related pages

The text below the frontmatter is the actual page content.

### YAML warning

Frontmatter uses YAML.

If a value contains a `:` inside a sentence, quote it.

Example:

```md
practicalUse: "This matters because pricing: design, analysis, and communication all depend on context."
```

If you forget this, Astro may fail to load the content file.

---

## 7. How routing works

Examples:

- `src/pages/index.astro` -> `/`
- `src/pages/methodologies/index.astro` -> `/methodologies/`
- `src/pages/methodologies/[slug].astro` -> one page per methodology content entry

In practice:

- `src/content/methodologies/conjoint.md`
becomes
- `/methodologies/conjoint/`

The same pattern applies to:

- `basics`
- `displayr`
- `sawtooth`
- `glossary`

---

## 8. How the homepage works

File:

- `src/pages/index.astro`

It:

- renders the hero
- pulls methodology entries from the collection
- shows featured methods
- links to the major sections

If you want to change homepage wording, edit this file.

If you want to change how it looks, edit:

- `src/styles/global.css`

If you want to change which methods are featured, edit the relevant methodology Markdown files and change:

`featured: true`

---

## 9. How navigation works

File:

- `src/components/Nav.astro`

This defines the top navigation links.

It uses the `withBase()` helper from:

- `src/lib/content.ts`

That helper is important because the site is hosted under:

`https://zoverx.github.io/MarketResearch/`

So links must work under the `/MarketResearch/` base path.

---

## 10. How the Basic Info section works

Files involved:

- `src/content/basics/*.md`
- `src/pages/basics/index.astro`
- `src/pages/basics/[slug].astro`
- `src/styles/global.css`

Current behavior:

- `/basics/` shows an interactive card for each Basic Info topic
- clicking a card opens the full topic content in a modal/popup
- each card also has a direct article link
- standalone pages still exist at routes like `/basics/panel-providers/`

This means the same Markdown content can be accessed in two ways:

1. inside the Basic Info overview experience
2. on a dedicated standalone page

If you want to change the interaction, edit:

- `src/pages/basics/index.astro`
- `src/styles/global.css`

If you just want to change the topic content, edit the Markdown file in:

- `src/content/basics/`

---

## 11. How methodology pages work

Files involved:

- `src/content/methodologies/*.md`
- `src/pages/methodologies/index.astro`
- `src/pages/methodologies/[slug].astro`
- `src/components/MethodologySections.astro`

Methodology pages are more structured than other sections.

They use frontmatter fields such as:

- `whatItIs`
- `whenToUse`
- `whenNotToUse`
- `inputsRequired`
- `typicalOutputs`
- `strengths`
- `limitations`
- `commonMistakes`
- `practicalUse`
- `interpretation`
- `clientCommunication`
- `displayrNotes`

The route page reads the frontmatter plus the Markdown body and renders them into the methodology template.

---

## 12. How Displayr, Sawtooth, and Glossary pages work

These sections follow the same general pattern:

- collection content in `src/content/...`
- index page in `src/pages/.../index.astro`
- detail page in `src/pages/.../[slug].astro`

Glossary entries are smaller and schema-driven.

The glossary index also includes search and category filtering.

---

## 13. How styling works

Main stylesheet:

- `src/styles/global.css`

This file contains:

- design variables
- layout rules
- component styling
- responsive behavior
- modal styling for Basic Info

The top `:root` variables are the safest place to change the theme.

Examples:

- `--bg`
- `--surface`
- `--text`
- `--accent`

---

## 14. How interactivity works

Current interactive features include:

- mobile nav toggle
- glossary filter/search
- method chooser filter logic
- methodology `<details>` expansion
- Basic Info card modal interaction

Most of this is implemented with small inline scripts in Astro pages/components.

That keeps the site lightweight.

---

## 15. How deployment works

Workflow file:

- `.github/workflows/static.yml`

Deployment process:

1. push to `main`
2. GitHub Actions runs
3. dependencies install with `npm ci`
4. Astro builds the site
5. `dist/` is deployed to GitHub Pages

The workflow is set up for:

- Node 24
- GitHub Pages project-site base path handling

GitHub may still show warnings about some official actions being forced from Node 20 to Node 24.
Those warnings are not the same as a failed build.

---

## 16. How to run the site locally

In PowerShell:

```powershell
cd c:\Users\zihao\Desktop\MyRepo\MarketResearch
npm ci
npm run dev
```

The local URL will look like:

`http://localhost:4321/MarketResearch/`

Note the `/MarketResearch/` base path.

To stop the dev server:

```powershell
Ctrl + C
```

To build locally:

```powershell
npm run build
```

---

## 17. How to edit existing content

### Change a Basic Info topic

Edit a file in:

- `src/content/basics/`

Example:

- `src/content/basics/panel-providers.md`

### Change a methodology

Edit a file in:

- `src/content/methodologies/`

Example:

- `src/content/methodologies/conjoint.md`

### Change a glossary term

Edit a file in:

- `src/content/glossary/`

### Change a Displayr or Sawtooth note

Edit a file in:

- `src/content/displayr/`
- `src/content/sawtooth/`

---

## 18. How to add a new Basic Info page

1. Create a new Markdown file in:
   - `src/content/basics/`
2. Add frontmatter using an existing file as a template
3. Add the body content
4. Run `npm run dev`

Result:

- a new card appears on `/basics/`
- clicking the card opens the modal with the full content
- a new standalone route is created automatically

Example route:

- `src/content/basics/sampling-error.md`
becomes
- `/basics/sampling-error/`

---

## 19. How to add a new methodology page

1. Create a file in:
   - `src/content/methodologies/`
2. Copy an existing methodology file
3. Replace the content carefully
4. Keep the required frontmatter fields
5. Quote any plain text values that contain `:`
6. Run `npm run dev`

Result:

- it appears on `/methodologies/`
- a detail page is created automatically
- it can appear in the method chooser if chooser fields are provided

---

## 20. How to add a new glossary term

1. Create a file in:
   - `src/content/glossary/`
2. Add glossary frontmatter
3. Write the definition
4. Run the site locally

Result:

- it appears on the glossary index
- it gets its own detail page

---

## 21. How to add a new top-level section

This is a larger change.

General process:

1. create a new content folder under `src/content/`
2. add a new collection to `src/content.config.ts`
3. create a matching route folder under `src/pages/`
4. create:
   - `index.astro`
   - `[slug].astro`
5. add a navigation link in `src/components/Nav.astro`
6. add starter content

---

## 22. How to add images

Put static assets in:

- `public/images/`

Then reference them from pages/components/content.

For this repo, `public/images/` is the simplest image strategy.

---

## 23. Safe workflow for making changes

### Content changes

1. edit Markdown
2. run `npm run dev`
3. check the affected page
4. commit and push

### UI or styling changes

1. edit Astro/CSS
2. run `npm run dev`
3. test multiple pages
4. test mobile size
5. commit and push

### Config or deployment changes

1. edit config carefully
2. run local validation if possible
3. commit and push
4. inspect the GitHub Actions run

---

## 24. Common mistakes to avoid

### Mistake 1: editing structure when you only need content edits

If you only want to change words, usually edit Markdown in `src/content/`.

### Mistake 2: invalid frontmatter YAML

Examples of common problems:

- missing `---`
- bad indentation
- using `:` inside unquoted values

### Mistake 3: assuming older Astro content APIs still apply

In this repo:

- routes are based on `entry.id`
- rendered content uses `render(entry)`

Do not revert back to older `entry.slug` / `entry.render()` assumptions.

### Mistake 4: forgetting GitHub Pages base path rules

This site is not hosted at `/`.
It is hosted at:

- `/MarketResearch/`

So route helpers must be used consistently.

### Mistake 5: not testing locally after changes

Always run:

```powershell
npm run dev
```

before pushing.

---

## 25. If something breaks

Ask these questions:

### Are collections loading?

Check:

- `src/content.config.ts`
- whether the loader points to the correct folder
- whether the content file has valid frontmatter

### Is one content file broken?

Check:

- YAML syntax
- required frontmatter fields
- quote values containing `:`

### Are routes broken?

Check:

- `astro.config.mjs`
- `src/lib/content.ts`
- the relevant `[slug].astro` route page

### Is deployment broken?

Check:

- `.github/workflows/static.yml`
- GitHub Actions logs

### Is only Basic Info visually broken?

Check:

- `src/pages/basics/index.astro`
- `src/styles/global.css`

---

## 26. Most common files you will edit

### Content

- `src/content/basics/*.md`
- `src/content/methodologies/*.md`
- `src/content/displayr/*.md`
- `src/content/glossary/*.md`

### Layout/structure

- `src/pages/index.astro`
- `src/pages/basics/index.astro`
- `src/components/Nav.astro`
- `src/layouts/BaseLayout.astro`

### Styling

- `src/styles/global.css`

### Config

- `src/content.config.ts`
- `src/lib/content.ts`
- `astro.config.mjs`
- `.github/workflows/static.yml`

---

## 27. Final mental model

For this repo:

- content lives in Markdown
- content loading rules live in `src/content.config.ts`
- route generation lives in `src/pages/` and `src/lib/content.ts`
- shared UI lives in `src/components/`
- overall page shell lives in `src/layouts/`
- design lives in `src/styles/global.css`
- deployment lives in `.github/workflows/static.yml`

If you remember that split, the project stays understandable and maintainable.
