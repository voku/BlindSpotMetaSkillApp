# Der Griller

Der Griller is a static React + Vite UI for creating reusable blind-spot review prompts, previewing the generated skill package, and exporting the resulting prompt files.

## Features

- Interactive skill specification editor with preset templates
- Live generated prompt preview
- Package browser for exported skill files
- Static build output ready for GitHub Pages
- Social preview metadata and favicon included

## Tech Stack

- React 19
- TypeScript
- Vite 6
- Tailwind CSS 4
- Lucide React

## Requirements

- Node.js 22+ recommended
- npm 10+ recommended

## Local Development

```bash
npm install
npm run dev
```

The Vite dev server starts locally and serves the app with hot reload.

## Validation

```bash
npm run lint
npm run build
```

## Production Build

```bash
npm run build
```

The production bundle is written to `/dist`.

## Preview the Production Build

```bash
npm run preview
```

## Automatic GitHub Pages Deployment

This repository includes `.github/workflows/deploy-pages.yml` for automatic deployment.

- Push to `main` to trigger a deploy
- The workflow runs `npm ci`, `npm run lint`, and `npm run build`
- The workflow sets `VITE_BASE_URL=/BlindSpotMetaSkillApp/` so asset paths work on GitHub Pages
- The workflow publishes the generated `/dist` directory with the official GitHub Pages actions

If GitHub Pages is not already configured for this repository, set the Pages source to **GitHub Actions** in the repository settings.

## Project Structure

```text
.
├── index.html
├── public/
│   ├── favicon.svg
│   └── social-preview.svg
├── src/
│   ├── App.tsx
│   ├── components/
│   │   ├── PackageBrowser.tsx
│   │   └── SkillForm.tsx
│   └── utils/
│       ├── defaultTemplates.ts
│       ├── skillTemplates.ts
│       └── validation.ts
└── vite.config.ts
```

## Key Files Detector Helper Prompt

Use this helper prompt when you want another agent or model to quickly identify the most relevant files before making changes:

```text
You are reviewing the Der Griller repository.

Goal:
- Identify the smallest set of files that must be inspected to complete a requested change safely.

Instructions:
- Start with the entry points and user-facing surfaces.
- Then identify the core generator logic, validation rules, and any build/deploy files that affect the task.
- Group the result into:
  1. Must read first
  2. Read if the task touches generation or validation
  3. Read if the task touches deployment or metadata
- For each file, explain in one sentence why it matters.

Important files to consider:
- src/App.tsx
- src/components/SkillForm.tsx
- src/components/PackageBrowser.tsx
- src/utils/defaultTemplates.ts
- src/utils/skillTemplates.ts
- src/utils/validation.ts
- index.html
- vite.config.ts
- .github/workflows/deploy-pages.yml
```

## Deployment URL

After the Pages workflow succeeds, the app is expected to be available at:

<https://voku.github.io/BlindSpotMetaSkillApp/>
