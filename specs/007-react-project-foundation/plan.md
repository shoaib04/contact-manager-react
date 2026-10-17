# Implementation Plan: React Project Foundation

**Branch**: Not created | **Date**: 2026-10-17 | **Spec**: [spec.md](spec.md)

**Input**: Feature specification at `specs/007-react-project-foundation/spec.md`

## Summary

Make the existing Vite + React + TypeScript starter reproducible and release-ready as a static single-page application. Pin supported Node/npm requirements, add a lockfile and setup documentation, establish router and unit/E2E test tooling, preserve the existing browser policy, and configure Netlify static hosting with history-route fallback. Do not add a backend, database, authentication, payments, or persistent browser storage.

## Technical Context

**Language/Version**: TypeScript 6.0.x; Node.js 22.22+ or 24.x LTS; npm 10.8+

**Primary Dependencies**: React 19.2.x, React DOM 19.2.x, Vite 8.3.x, React Router 7, Oxlint, Browserslist, and browserslist-to-esbuild. Test dependencies: Vitest, jsdom, Testing Library, and Playwright.

**Storage**: None. The application produces static browser assets.

**Testing**: `npm run typecheck`, `npm run lint`, `npm test`, `npm run test:e2e`, and `npm run build`. Vitest with Testing Library covers component behavior; Playwright exercises the production preview and direct-route fallback.

**Target Platform**: Modern browsers matching the existing policy: usage above 0.5%, latest two versions, Firefox ESR, non-dead browsers, excluding IE 9 through 11.

**Project Type**: Browser-only React single-page application

**Performance Goals**: No numeric performance target is specified. Keep the production output static and avoid adding a server or unnecessary runtime services.

**Constraints**: Node 22.5.1 is present in the current shell and is below the selected minimum. Use Node 24 for local validation. A deployment preview must support direct route refresh. Public Vite environment variables must contain no secrets.

**Scale/Scope**: One Vite application and static deployment. Feature behavior and route contents remain owned by the individual feature specifications.

## Decisions

- **Runtime**: Support Node `^22.22.0` and `^24.0.0`, and npm `>=10.8.0 <12`. Pin the default local line to Node 24 in `.nvmrc`; enforce supported engines in `package.json`.
- **Package installation**: Use npm and commit `package-lock.json`; document `npm ci` for clean, repeatable installs. Set npm engine strictness so unsupported Node/npm versions fail clearly.
- **Routing**: Use React Router 7. Wrap the application in `BrowserRouter` at the entry point. Individual route maps and page behavior remain with their owning feature specifications.
- **Unit/integration tests**: Use Vitest, jsdom, `@testing-library/react`, `@testing-library/user-event`, and `@testing-library/jest-dom`. Name test files `*.test.ts` or `*.test.tsx` to match the constitution.
- **End-to-end tests**: Use Playwright against the production preview server. Configure test discovery for the constitution's `*.test.ts` naming convention.
- **Lint/type/build**: Keep Oxlint, expose TypeScript project checks as `npm run typecheck`, and retain a production build that runs type checking before Vite.
- **Browser support**: Record the existing policy in `.browserslistrc` and the README. Use `browserslist-to-esbuild` to configure Vite's build target from that policy. Do not expand support to Internet Explorer or silently replace the policy with Vite's default target.
- **Hosting**: Use Netlify for the first static deployment. Build with `npm run build`, publish `dist`, and add an SPA rewrite to `/index.html` for direct route refresh.
- **Configuration and secrets**: Document the public `VITE_CONTACTS_API_BASE_URL` setting used by the demo contact integration. Include only the non-secret JSONPlaceholder base URL in `.env.example`; never place credentials or private keys in Vite-exposed variables.

## Constitution Check

- **Contract-preserving migration**: Keep React as the target and feature behavior in its owning specifications. Route configuration at this layer only establishes the router integration point.
- **Functional React and state ownership**: Keep the application entry point declarative. Route state comes from React Router; no duplicate location state or persistence is introduced.
- **Consistent naming and explicit contracts**: Retain TypeScript, strict checking, PascalCase component names, and constitution-compliant test suffixes.
- **Safe and accessible browser UI**: Do not add secrets to client configuration. Public environment variables are documented and limited to non-secret settings.
- **Behavior-focused verification**: Provide working unit and E2E commands. Tests assert observable outcomes and must not encode known defects.

**Gate result**: Pass. No constitution exception is required. Local verification requires a supported Node runtime; Node 22.5.1 is below the planned floor.

## Project Structure

### Documentation (this feature)

```text
specs/007-react-project-foundation/
├── spec.md
├── plan.md
├── research.md
├── data-model.md
└── quickstart.md
```

### Source and configuration (repository root)

```text
.nvmrc
.npmrc
.browserslistrc
.env.example
netlify.toml
package.json
package-lock.json
README.md
public/
└── _redirects
src/
├── main.tsx
└── test/
    └── setup.ts
vitest.config.ts
playwright.config.ts
e2e/
└── app.test.ts
```

Existing Vite and TypeScript configuration remains in place. Feature-specific unit tests and route components are added by their owning feature plans.

**Structure Decision**: Keep a single root-level Vite application. Add only test, runtime, browser-policy, and static-host configuration needed to meet the foundation requirements.

## Verification

On a supported Node/npm installation, run `npm ci`, `npm run typecheck`, `npm run lint`, `npm test`, `npm run test:e2e`, and `npm run build`. Verify the production preview at the root and an arbitrary nested path, then verify Netlify's rewrite configuration maps nested paths to the SPA entry point. Confirm generated browser assets contain no credentials or private secrets.

## Complexity Tracking

No constitution violations or additional projects are proposed.
