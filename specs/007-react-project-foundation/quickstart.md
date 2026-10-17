# Quickstart: React Project Foundation

## Prerequisites

- Node.js 22.22 or newer in the 22.x line, or Node.js 24.x LTS.
- npm 10.8 or newer and earlier than 12.
- Playwright browser binaries for end-to-end tests (`npx playwright install`).

Use the Node version in `.nvmrc` (24) with nvm, or install another supported Node line. The repository's `engines` field and npm's strict engine setting reject unsupported runtimes.

## Install and Run

```sh
npm ci
npm run dev
```

Vite prints the local development URL. Environment-specific public settings are listed in `.env.example`; copy only non-secret values into a local `.env` file when needed. Never put credentials in variables exposed through the `VITE_` prefix.

## Quality Checks

```sh
npm run typecheck
npm run lint
npm test
npm run test:e2e
npm run build
npm run preview
```

`npm run build` performs type checking before producing static assets in `dist`. `npm run test:e2e` builds/serves the production preview and runs Playwright checks. Use `npm ci` rather than `npm install` for clean, lockfile-based setup.

## Browser and Deployment

The supported browser policy is: usage above 0.5%, latest two versions, Firefox ESR, non-dead browsers, excluding IE 9 through 11. `.browserslistrc` is the source of truth and Vite's esbuild target is derived from it.

For the first release, connect the repository to Netlify. The Netlify build command is `npm run build`, the publish directory is `dist`, and `public/_redirects` provides the SPA fallback required for direct route access and refresh. Confirm root and nested routes on the deployment preview before release.
