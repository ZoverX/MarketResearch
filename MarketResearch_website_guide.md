# Market Research Website Guide

## What this document is

This guide explains how your `MarketResearch` website repo works from the ground up.

It is written for a beginner. It assumes:

- you are new to web development
- you may be new to GitHub
- you may not know what Astro, Markdown, routing, or deployment mean

The goal is that after reading this guide, you should be able to:

- understand how the site is structured
- edit existing content
- add new pages
- add new methodology pages
- change navigation
- change styling
- understand how the site gets published to GitHub Pages
- make safe changes without guessing

---

## 1. What this website is

This repo contains a static website.

Static means:

- pages are generated ahead of time
- there is no server-side database
- no backend code is required for the site to work
- GitHub Pages can host it cheaply and simply

Your site is built with **Astro**.

Astro is a framework for building static websites using:

- pages
- layouts
- components
- Markdown content

This is a good fit for your project because your website is mainly a structured knowledge library, not a web app with user accounts or complex live data.

---

## 2. The main technologies used

### Astro

Purpose:

- builds the website
- turns your source files into finished HTML/CSS/JS
- handles routes like `/basics/` and `/methodologies/`

Why it is used:

- good for content-heavy sites
- simple GitHub Pages deployment
- supports Markdown well
- lets you reuse layouts and components

### Markdown

Purpose:

- stores most written content in simple text files
- easier to edit than raw HTML

Why it is used:

- beginner-friendly
- clean for note-taking and documentation
- fast to extend

### Astro Content Collections

Purpose:

- organize Markdown content into groups such as `basics`, `methodologies`, `displayr`, `glossary`
- validate the frontmatter fields you use

Why it is used:

- keeps content structured
- prevents inconsistent fields
- makes it easier to build reusable templates

### Components

Purpose:

- reusable pieces of UI like the navigation bar, hero section, footer, methodology section blocks

Why it is used:

- avoids repeating the same code everywhere
- makes design changes easier

### CSS

Purpose:

- controls colors, spacing, layout, typography, buttons, cards, responsiveness

Why it is used:

- this is how the visual design is built

### GitHub Actions

Purpose:

- automatically builds and deploys the site when you push to GitHub

Why it is used:

- removes manual deployment work
- standard GitHub Pages flow

### GitHub Pages

Purpose:

- hosts the final website publicly

Why it is used:

- free and simple for static sites

---

## 3. High-level mental model

Think of the repo in five layers:

1. Configuration
2. Content
3. Layout and reusable UI
4. Pages and routes
5. Deployment

If you understand those five layers, the repo becomes much easier to manage.

---

## 4. Folder structure and what each part does

Your repo is:

`c:\Users\zihao\Desktop\MyRepo\MarketResearch`

Important files and folders:

### `package.json`

Purpose:

- lists project dependencies
- defines commands like `npm run dev` and `npm run build`

You use it when:

- installing dependencies
- running the site locally
- building the site

### `package-lock.json`

Purpose:

- locks exact dependency versions

Why it matters:

- keeps installs consistent
- allows `npm ci` in GitHub Actions

### `astro.config.mjs`

Purpose:

- Astro configuration
- defines the site URL and the base path

Why it matters:

- GitHub Pages project sites need the correct base path
- your repo is deployed under `/MarketResearch/`, not `/`

### `src/`

This is the main source folder.

Inside `src/`:

### `src/content/`

This holds your written content.

Subfolders:

- `basics/`
- `methodologies/`
- `displayr/`
- `sawtooth/`
- `glossary/`

Each content folder contains Markdown files.

### `src/content.config.ts`

Purpose:

- defines the structure rules for content collections
- validates frontmatter fields

Why it matters:

- if you add a methodology page and forget a required field, Astro can detect that

### `src/layouts/`

Purpose:

- contains layout wrappers shared across pages

Main file:

- `BaseLayout.astro`

This handles:

- page shell
- header
- footer
- global styles
- metadata like page title and description

### `src/components/`

Purpose:

- reusable visual building blocks

Examples:

- `Nav.astro`
- `Footer.astro`
- `Hero.astro`
- `SectionCards.astro`
- `CollectionList.astro`
- `MethodologySections.astro`

These are used by pages to avoid repeating UI code.

### `src/pages/`

Purpose:

- defines routes

Examples:

- `index.astro` becomes the homepage
- `about.astro` becomes `/about/`
- `method-chooser.astro` becomes `/method-chooser/`
- `basics/index.astro` becomes `/basics/`
- `basics/[slug].astro` creates dynamic basic content pages

### `src/styles/global.css`

Purpose:

- global site styling

This is where most colors, spacing, typography, cards, buttons, and responsive behavior are defined.

### `.github/workflows/static.yml`

Purpose:

- GitHub Actions deployment workflow

This:

- installs dependencies
- builds the Astro site
- uploads the final `dist/` output
- deploys to GitHub Pages

### `public/`

Purpose:

- static assets that should be copied directly into the final site

Examples you may add later:

- images
- PDFs
- downloadable files

---

## 5. How Astro routing works in this repo

Routing means: how a file becomes a website URL.

Examples:

- `src/pages/index.astro` -> `/`
- `src/pages/about.astro` -> `/about/`
- `src/pages/methodologies/index.astro` -> `/methodologies/`

Dynamic route example:

- `src/pages/methodologies/[slug].astro`

This does not represent one single page.
It represents many pages.

Astro creates one page per Markdown file inside:

- `src/content/methodologies/`

If you create:

- `src/content/methodologies/new-method.md`

then Astro can generate:

- `/methodologies/new-method/`

This is why content collections are powerful.

You add content files, and the site automatically gains pages.

---

## 6. What a content collection is

A content collection is a named group of content files.

In your repo, collections include:

- `basics`
- `methodologies`
- `displayr`
- `sawtooth`
- `glossary`

They are defined in:

- `src/content.config.ts`

That file says what fields each collection must have.

For example, methodology entries require more structured fields than basic notes because methodology pages use a more detailed template.

---

## 7. What frontmatter is

At the top of each Markdown file, you see something like:

```md
---
title: Conjoint
description: Estimate how people trade off product features, levels, and price when making choices.
section: Advanced Methodologies
order: 1
tags: [Choice Modelling, Product, Pricing]
related: [maxdiff, gabor-granger, van-westendorp]
---
```

This top block is called **frontmatter**.

Purpose:

- gives the page metadata
- controls ordering
- controls related links
- controls tag displays
- controls method chooser logic

Think of frontmatter as the structured settings for the page.

The body below the frontmatter is the actual written content.

---

## 8. How methodology pages work

Methodology pages are more structured than standard notes.

Files live in:

- `src/content/methodologies/`

The page template is:

- `src/pages/methodologies/[slug].astro`

That page uses:

- `src/components/MethodologySections.astro`

Together, they render:

- title
- description
- tags
- “What it is”
- overview notes
- decision guide
- strengths
- limitations
- common mistakes
- Displayr notes
- placeholder demo block

This means:

- the layout and structure are reusable
- you mostly edit the Markdown file
- you do not usually need to edit the page template just to add another methodology

---

## 9. How the homepage works

Homepage file:

- `src/pages/index.astro`

It does several things:

- renders the hero section
- shows “How to use this library”
- pulls methodology content from the collection
- shows featured methods
- links to major site sections

If you want to change homepage text, edit:

- `src/pages/index.astro`

If you want to change homepage styles, edit:

- `src/styles/global.css`

If you want to change featured methods, edit the relevant methodology Markdown files and set:

`featured: true`

or remove it.

---

## 10. How navigation works

Navigation is in:

- `src/components/Nav.astro`

This controls the top menu:

- Home
- Basic Info
- Methodologies
- Displayr / Q
- Sawtooth
- Method Chooser
- Glossary
- About

If you want to add a new top-level section:

1. create the page or route
2. add the new link in `Nav.astro`

Do not hardcode links like `/my-page/` carelessly if the site is a GitHub Pages project site.
This repo uses a helper called `withBase(...)` so links work under `/MarketResearch/`.

That helper lives in:

- `src/lib/content.ts`

---

## 11. How site styling works

Most styling is centralized in:

- `src/styles/global.css`

This includes:

- color variables
- page widths
- buttons
- cards
- hero layout
- header
- responsive design

If you want to change:

- background color
- accent color
- card appearance
- spacing
- font sizing

start there.

Important idea:

The top of the CSS file contains custom properties like:

```css
:root {
  --bg: #07111f;
  --text: #edf3fb;
  --accent: #7bdff2;
}
```

These are reusable design variables.

Why this is good:

- one change can update many places
- the design stays consistent

---

## 12. How interactivity works

This site uses light JavaScript only where it helps:

- method chooser filtering
- glossary filtering
- mobile menu toggle
- methodology expand/collapse sections

Examples:

- `src/pages/method-chooser.astro`
- `src/pages/glossary/index.astro`
- `src/components/Nav.astro`

Why this is good:

- keeps the site simple
- keeps the build light
- avoids unnecessary complexity

You do not need React or a heavy frontend framework for this site.

---

## 13. How to run the site locally

In PowerShell:

```powershell
cd c:\Users\zihao\Desktop\MyRepo\MarketResearch
npm ci
npm run dev
```

Astro will print a local URL, usually something like:

`http://localhost:4321`

Open that in your browser.

To make a production build:

```powershell
npm run build
```

To preview the production build:

```powershell
npm run preview
```

---

## 14. How deployment works

Deployment happens through:

- GitHub Actions
- GitHub Pages

Workflow file:

- `.github/workflows/static.yml`

The process is:

1. you push code to `main`
2. GitHub Actions runs the workflow
3. dependencies are installed
4. Astro builds the site
5. the built `dist/` files are deployed to GitHub Pages

This means:

- you do not upload website files manually
- pushing to GitHub is the deployment step

---

## 15. Why the base path matters

Your site is hosted as a project site:

`https://zoverx.github.io/MarketResearch/`

Because of that, page URLs are not:

- `/basics/`

They are:

- `/MarketResearch/basics/`

That is why the repo uses base-path helpers.

Relevant files:

- `astro.config.mjs`
- `src/lib/content.ts`

If links ignore the base path, pages work on the homepage but fail on section links.

This is a very common GitHub Pages issue.

---

## 16. How to edit content that already exists

### Edit a basic note

Example:

- `src/content/basics/what-is-market-research.md`

You can safely change:

- title
- description
- tags
- body text

### Edit a Displayr note

Example:

- `src/content/displayr/reporting-workflow.md`

Same principle: mostly edit the Markdown content.

### Edit a glossary term

Example:

- `src/content/glossary/utility.md`

You can change:

- `term`
- `shortDefinition`
- category
- body text

### Edit a methodology page

Example:

- `src/content/methodologies/conjoint.md`

You can change:

- metadata
- tags
- related links
- chooser fields
- structured methodology fields
- body notes

---

## 17. How to add a new basic page

Example goal:

Add a new page about “Sampling error”.

### Step 1

Create a file:

- `src/content/basics/sampling-error.md`

### Step 2

Add frontmatter:

```md
---
title: Sampling error
description: A beginner-friendly explanation of sampling error in research.
section: Basic Info
order: 6
tags: [Statistics, Foundations]
related: [types-of-data-we-deal-with]
summary: Explain what sampling error means and why it matters.
---
```

### Step 3

Add body content below it:

```md
## What it means

Sampling error is the difference between the survey estimate and the true population value caused by using a sample instead of a full census.

## Why it matters

It affects how much confidence you should place in small differences.
```

### Step 4

Run:

```powershell
npm run dev
```

The new page should appear automatically in the Basic Info collection page.

You do not need to manually create a route file for each basic content page because:

- `src/pages/basics/[slug].astro` already handles that

---

## 18. How to add a new methodology page

This is one of the most important tasks in your site.

### Step 1

Create a new file in:

- `src/content/methodologies/`

For example:

- `src/content/methodologies/latent-class.md`

### Step 2

Use the same structure as an existing methodology page.
The easiest method is:

1. copy a similar file
2. rename it
3. edit the values

### Step 3

Make sure you include all required fields.

A simplified example:

```md
---
title: Latent class
description: Segment respondents into classes based on response patterns.
section: Advanced Methodologies
order: 15
tags: [Segmentation, Modelling]
related: [segmentation, k-means]
featured: false
chooserStage: [Strategy]
chooserGoal: [Audience design]
chooserData: [Survey data]
chooserOutput: [Classes, Profiles]
whatItIs: Latent class analysis is a model-based approach for grouping respondents into classes with similar response patterns.
whenToUse:
  - When model-based grouping is preferred
whenNotToUse:
  - When the sample is too small for stable estimation
inputsRequired:
  - Suitable variables
typicalOutputs:
  - Class assignments
simpleExample: Group respondents into hidden classes based on attitude agreement patterns.
strengths:
  - Model-based approach
limitations:
  - Can be harder to explain
commonMistakes:
  - Overfitting too many classes
practicalUse: I use it when the project benefits from a probabilistic segmentation approach.
outputted:
  - Class probabilities
interpretation:
  - Compare class meaning and stability
clientCommunication:
  - Explain that classes are inferred, not directly observed
displayrNotes:
  - Keep class outputs clearly labeled
demoType: placeholder
demoTitle: Latent class output placeholder
demoSummary: Add a chart or table screenshot later.
---

## Notes

Add practical notes here.
```

### Step 4

Save the file and run the site locally.

The page should automatically:

- get its own URL
- appear in the methodologies index page
- work in related links
- be usable in the method chooser if the chooser fields are filled

---

## 19. How to add a new glossary term

Create a file in:

- `src/content/glossary/`

Example:

- `src/content/glossary/margin-of-error.md`

Then add frontmatter like:

```md
---
title: Margin of error
description: A glossary entry for margin of error.
term: Margin of error
shortDefinition: A statistical range around a survey estimate.
category: Analytics
order: 11
tags: [Analytics]
related: [significance]
---
```

Then write the explanation below.

The glossary page will include it automatically.

---

## 20. How to add a new top-level section

Example goal:

Add a section called `Case Studies`.

### Step 1

Create a content folder if needed:

- `src/content/case-studies/`

### Step 2

Update `src/content.config.ts`

Add a new collection definition.

### Step 3

Create route files in `src/pages/case-studies/`

Usually:

- `index.astro`
- `[slug].astro`

### Step 4

Add the link to:

- `src/components/Nav.astro`

### Step 5

Add starter content files.

This is a bigger change than adding a single page, but it follows the same architecture as the existing sections.

---

## 21. How to add images

If you want to add screenshots or diagrams:

### Option 1: put images in `public/`

Example:

- `public/images/conjoint-example.png`

Then reference it in content or a component.

Example path in HTML:

`/images/conjoint-example.png`

Astro will handle the site base path in the final build.

### Option 2: use local imports in Astro components

This is more advanced and not necessary for simple screenshots.

For your use case, `public/images/` is usually the simpler option.

---

## 22. How to change colors or visual style

Start in:

- `src/styles/global.css`

Main variables are near the top.

Examples:

- `--bg`
- `--text`
- `--accent`
- `--surface`

If you want:

- darker background
- warmer accent color
- lighter cards
- different border style

change those variables first before rewriting lots of CSS.

That is the safest and fastest design-editing method.

---

## 23. How to add a new homepage section

Edit:

- `src/pages/index.astro`

Look at how existing blocks are built.

Examples:

- hero area
- “How to use this library”
- featured methodologies
- main sections

You can add:

- featured glossary terms
- latest added methodologies
- a “Start here” guide
- a “Tools I use” section

If the new block is reusable, it is better to create a component in:

- `src/components/`

If it is homepage-only, it is fine to keep it in `index.astro`.

---

## 24. How to change the method chooser

File:

- `src/pages/method-chooser.astro`

This page:

- reads all methodology entries
- collects their chooser metadata
- builds filters
- filters visible cards with JavaScript

If you want the chooser to recommend methods better, the first thing to improve is usually not the page logic.
It is the metadata in the methodology Markdown files:

- `chooserStage`
- `chooserGoal`
- `chooserData`
- `chooserOutput`

Improve the content first, then improve the page logic only if needed.

---

## 25. How to change the glossary filtering

File:

- `src/pages/glossary/index.astro`

This page:

- reads glossary entries
- builds the category list
- lets the user search and filter entries

If you want to improve glossary usefulness, usually add:

- more terms
- better short definitions
- more useful category choices

---

## 26. How related links work

Many content files have:

```md
related: [maxdiff, gabor-granger, van-westendorp]
```

These values are slugs of related entries.

Purpose:

- create connections across the site
- help users continue reading

When you add a new page, it is good practice to add a few related slugs where they make sense.

This improves the educational flow of the site.

---

## 27. Safe workflow for making changes

Use this process each time:

### For content-only changes

1. edit Markdown files
2. run `npm run dev`
3. check the affected page
4. commit and push

### For layout or style changes

1. edit Astro or CSS files
2. run `npm run dev`
3. test multiple pages
4. test mobile width by resizing the browser
5. commit and push

### For deployment-related changes

1. edit workflow or config carefully
2. run `npm run build`
3. commit and push
4. inspect the GitHub Actions run

---

## 28. Common mistakes to avoid

### Mistake 1: editing the wrong file type

If you only want to change written content, do not start by editing Astro layout files.
Usually the right file is a Markdown file in `src/content/`.

### Mistake 2: forgetting required frontmatter fields

Methodology pages need many fields.
Copy an existing methodology file first.

### Mistake 3: hardcoding routes incorrectly

For GitHub Pages project sites, do not casually write raw root links everywhere.
Use the repo’s route helpers where the code already uses them.

### Mistake 4: changing structure when only content needed changing

A lot of updates should be content-only.
Do not redesign the architecture unless you actually need to.

### Mistake 5: forgetting to preview locally

Always run:

```powershell
npm run dev
```

before pushing.

---

## 29. Beginner glossary for web development terms

### Route

A URL path like `/about/` or `/methodologies/conjoint/`

### Component

A reusable piece of UI code

### Layout

A wrapper structure shared by many pages

### Static site

A site where pages are prebuilt into files

### Frontmatter

Structured metadata at the top of a Markdown file

### Collection

A group of related content files

### Build

The process of converting source files into the final deployable website

### Deploy

Publishing the built website online

---

## 30. Exact beginner tasks and where to make them

### Task: change homepage text

Edit:

- `src/pages/index.astro`

### Task: change nav menu labels

Edit:

- `src/components/Nav.astro`

### Task: add a new basic educational page

Create:

- `src/content/basics/your-page.md`

### Task: add a new methodology

Create:

- `src/content/methodologies/your-method.md`

### Task: add a new glossary term

Create:

- `src/content/glossary/your-term.md`

### Task: change the site colors

Edit:

- `src/styles/global.css`

### Task: add an image

Add file to:

- `public/images/`

### Task: change GitHub deployment behavior

Edit:

- `.github/workflows/static.yml`

### Task: change page shell/header/footer

Edit:

- `src/layouts/BaseLayout.astro`
- `src/components/Nav.astro`
- `src/components/Footer.astro`

---

## 31. Recommended learning path for you

Do not try to learn everything at once.

Learn in this order:

1. how to run the site locally
2. how to edit Markdown content
3. how routing maps files to URLs
4. how components are reused
5. how CSS variables control design
6. how deployment works through GitHub Actions
7. how to add new collections or new site sections

This order matches the complexity of the repo.

---

## 32. Best practice for this repo

For this project, the best habit is:

- keep content in Markdown
- keep structure in Astro
- keep design in global CSS
- keep route logic centralized
- avoid unnecessary dependencies

This repo is strongest when it stays simple, structured, and easy to extend.

---

## 33. Example update workflow from start to finish

Example: add a new methodology page.

### Step 1

Create:

- `src/content/methodologies/brand-architecture.md`

### Step 2

Copy an existing methodology file and edit the values.

### Step 3

Run:

```powershell
cd c:\Users\zihao\Desktop\MyRepo\MarketResearch
npm run dev
```

### Step 4

Open the site locally and test:

- methodologies index page
- the new method page
- related links
- method chooser behavior

### Step 5

Commit and push:

```powershell
git add .
git commit -m "Add brand architecture methodology page"
git push origin main
```

### Step 6

Watch GitHub Actions deploy the site.

---

## 34. If something breaks

If the site breaks, narrow it down by asking:

### Is it content only?

Check Markdown frontmatter for missing or incorrect fields.

### Is it layout only?

Check the Astro component or layout you edited.

### Is it all routes?

Check:

- `astro.config.mjs`
- `src/lib/content.ts`

### Is deployment failing?

Check:

- `.github/workflows/static.yml`
- GitHub Actions logs

### Is only one page broken?

Check the matching content file and route template.

---

## 35. Final summary

The most important idea in this repo is this:

- content lives in Markdown
- structure lives in Astro
- design lives in CSS
- deployment lives in GitHub Actions

If you keep that mental model, the project stays understandable.

For most future updates, you will only need one of these actions:

- edit a Markdown file
- edit `index.astro`
- edit `Nav.astro`
- edit `global.css`

Only occasionally will you need to change deeper architecture files like:

- `src/content.config.ts`
- `src/lib/content.ts`
- `astro.config.mjs`
- `.github/workflows/static.yml`

That separation is what makes the repo maintainable.
