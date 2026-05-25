# AGENTS.md

This repository is a static personal academic website for Runwen Yao. There is no framework build step, package manager, or test runner in the repo. Most work consists of editing HTML, CSS, JavaScript, and media references directly.

## Project Layout

- `index.html`: landing page. Uses inline page-specific styles rather than `secondary.css`.
- `cv.html`: CV page.
- `research.html`, `research-mesoscale.html`, `research-rna.html`, `research-imaging.html`: research overview and subpages.
- `publications.html`: publications page shell.
- `gallery.html`: gallery page shell.
- `secondary.css`: shared styling for secondary pages.
- `mobile-nav.js`: shared mobile navigation behavior used by secondary pages.
- `publications-data.js`: generated publication dataset consumed by `publications.html`.
- `publications.js`: renders publications from `window.publicationsData`.
- `gallery-data.js`, `gallery.js`, `gallery-coverflow.js`: gallery content and behavior.
- `research-media/`, `publication-media/`, `gallery-media/`: page assets.
- `scripts/`: maintenance scripts.

## How To Work In This Repo

- Treat this as a hand-authored static site. Prefer small, targeted edits over introducing abstractions.
- Preserve the existing visual language unless the task explicitly asks for a redesign.
- Reuse existing classes and page structure when possible before adding new markup or CSS.
- Keep files UTF-8 and avoid unnecessary formatting churn.
- Use relative links for internal navigation and local assets.
- Keep external links as `target="_blank"` with `rel="noopener noreferrer"` to match the current pattern.

## Styling Conventions

- `secondary.css` is the shared stylesheet for most non-home pages.
- The home page currently keeps its own inline CSS in `index.html`. Do not move it into `secondary.css` unless the task is specifically about refactoring shared styles.
- The site uses a warm neutral palette, serif body typography, sans-serif navigation/meta text, soft borders, and restrained shadows. Keep additions consistent with that system.
- Before adding new CSS, search for an existing utility or component style in `secondary.css`.

## JavaScript Conventions

- JavaScript is plain browser-side script with no bundling.
- Keep scripts dependency-free and compatible with the current style of direct DOM manipulation.
- Avoid introducing tooling, modules, or framework-specific patterns unless explicitly requested.
- If editing navigation behavior, check `mobile-nav.js` first because it injects the mobile menu button and manages menu state globally.

## Content And Data Workflows

### Updating publications

`publications-data.js` is generated, not curated by hand.

Use:

```powershell
powershell -ExecutionPolicy Bypass -File .\scripts\sync_ncbi_bibliography.ps1
```

Notes:

- The script pulls from the public NCBI bibliography and writes `publications-data.js`.
- Manual edits to `publications-data.js` may be overwritten.

### Bumping shared CSS cache version

Secondary pages reference `secondary.css` with a query-string version such as `secondary.css?v=20260401-155312`.

After changing `secondary.css`, update the version string in all HTML files with:

```powershell
powershell -ExecutionPolicy Bypass -File .\scripts\bump_secondary_css_version.ps1
```

This script updates all top-level `*.html` files that reference `secondary.css`.

## Validation Checklist

Because there is no automated test suite, validate changes manually.

- Open the edited page(s) in a browser.
- Check desktop and mobile-width layouts.
- Verify the sticky header and navigation still work.
- Verify links, buttons, and dropdowns on the touched page.
- If `secondary.css` changed, spot-check at least `cv.html`, `research.html`, `publications.html`, and `gallery.html`.
- If data files changed, confirm the rendered page still loads without console errors.

## Safe Editing Notes For Agents

- Expect the repo to be manually maintained and potentially partially duplicated across pages.
- Avoid large cross-page rewrites unless the user asks for structural cleanup.
- Do not regenerate or rename media assets unless required by the task.
- If you change shared styles or scripts, keep the blast radius in mind and review multiple pages.
- If a task only concerns page copy or layout, stay local to the affected file unless a shared fix is clearly better.
