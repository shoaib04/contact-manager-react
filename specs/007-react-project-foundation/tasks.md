# Tasks: React Project Foundation

**Input**: Design documents from `specs/007-react-project-foundation/`
**Prerequisites**: `plan.md`, `research.md`, `data-model.md`, `quickstart.md`

## Phase 1: Runtime and Project Tooling

- [x] T001 Declare supported Node/npm engines and scripts in `package.json`; add `.nvmrc` for Node 24 and `.npmrc` with `engine-strict=true`; install dependencies and generate `package-lock.json` using a supported Node runtime.
- [x] T002 Record the existing browser policy in `.browserslistrc`; add `browserslist` and `browserslist-to-esbuild`; configure Vite production targets from that policy.
- [x] T003 Add React Router 7 and wrap the application in `BrowserRouter` at `src/main.tsx`, without moving feature-specific page behavior into the foundation.

## Phase 2: Automated Verification

- [x] T004 Configure Vitest with jsdom, Testing Library, user-event, and jest-dom; add a focused `src/App.test.tsx` smoke test and the `npm test` / `npm run test:watch` scripts.
- [x] T005 Configure Playwright against the production preview, using `*.test.ts` discovery; add an E2E smoke test for root and direct nested-path loading; add the `npm run test:e2e` script.
- [x] T006 Expose `npm run typecheck` and ensure `npm run build` performs type checking before the Vite build; retain the existing Oxlint command as `npm run lint`.

## Phase 3: Static Delivery and Setup Documentation

- [x] T007 Configure Netlify to build with `npm run build`, publish `dist`, and serve the SPA entry point for nested paths through `public/_redirects`.
- [x] T008 Add `.env.example` with the non-secret JSONPlaceholder `VITE_CONTACTS_API_BASE_URL` and replace the starter README with supported runtime, setup, commands, browser policy, configuration, and Netlify release instructions.

## Phase 4: Verification

- [x] T009 On a supported Node runtime, run `npm ci`, `npm run typecheck`, `npm run lint`, `npm test`, `npm run test:e2e`, and `npm run build`; fix only foundation-scope failures and record the results.
- [x] T010 Inspect the production output and Netlify fallback configuration to confirm static assets contain no credentials/private secrets and nested paths resolve to the application entry point.
