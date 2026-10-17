# Contact Manager React

A browser-only React single-page application built with TypeScript and Vite.

## Prerequisites

- Node.js 22.22 or newer in the 22.x line, or Node.js 24.x LTS.
- npm 10.8 or newer and earlier than 12.
- Playwright's Chromium browser for end-to-end tests.

The default Node version is recorded in `.nvmrc`. With nvm, run `nvm install` and `nvm use`. npm enforces the supported engine ranges.

## Setup

```sh
npm ci
npm run dev
```

Vite prints the local development URL. Public environment settings are listed in `.env.example`; copy the values needed for local work into `.env`. Variables prefixed with `VITE_` are exposed to browser code and MUST NOT contain credentials, tokens, or other private values.

The demo contact endpoint is configured with `VITE_CONTACTS_API_BASE_URL`. It points to JSONPlaceholder and does not guarantee remote persistence.

## Verification

```sh
npm run typecheck
npm run lint
npm test
npm run test:watch
npx playwright install chromium
npm run test:e2e
npm run build
npm run preview
```

The build runs TypeScript checks before producing static assets in `dist`. The Playwright command builds the application and tests it through Vite's production preview. Use `npm ci` for repeatable clean installs.

## Browser Support

The supported policy is usage above 0.5%, the latest two versions, Firefox ESR, and non-dead browsers, excluding Internet Explorer 9 through 11. `.browserslistrc` is the source of truth; Vite's build target is derived from it.

## Deployment

The first-release static host is Netlify. Connect the repository to Netlify with build command `npm run build` and publish directory `dist`; these values are also in `netlify.toml`. `public/_redirects` routes nested paths to the SPA entry point for direct links and page refreshes. Verify the deployment preview before release.
