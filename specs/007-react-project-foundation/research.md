# Research: React Project Foundation

## Current Project Evidence

- `package.json` defines a Vite 8.3, React 19.2, TypeScript 6 project with Oxlint, but has no lockfile, router, test runner, or test scripts.
- The local shell has Node 22.5.1 and npm 10.8.2. Vite 8.3 requires Node `^20.19.0 || >=22.12.0`; the latest React Router requires Node `>=22.22.0` or Node 24+. Therefore the checked-in runtime floor must be at least Node 22.22.0, and this shell's Node must be upgraded for verification.
- No app server, database, authentication service, CI pipeline, or deployment host is present, consistent with the foundation specification.
- The contact-management specification uses JSONPlaceholder as a demo endpoint and disclaims remote persistence guarantees.

## Decisions

### Runtime and package manager

Support Node `^22.22.0` and `^24.0.0`, and npm `>=10.8.0 <12`. Use Node 24 as the default in `.nvmrc`. Commit `package-lock.json` and use `npm ci` for clean installs. This covers the selected router and current build/test tool engine constraints while retaining an LTS Node 22 line.

### Routing

Use React Router 7 with `BrowserRouter` at the application entry. Feature specs continue to own their route content. The shell feature owns the app-level route map and must ensure the exact `/products/cart` path wins over the product-id pattern. Static hosting must rewrite nested paths to the SPA entry point.

### Unit and end-to-end testing

Use Vitest with jsdom and Testing Library for component behavior; use Playwright for end-to-end checks against the production preview. Keep test filenames compliant with the constitution (`*.test.ts` and `*.test.tsx`). Add a small application smoke test so both commands execute meaningful checks in the foundation-only starter.

### Browser target

Keep the existing Browserslist query: usage above 0.5%, latest two versions, Firefox ESR, non-dead browsers, excluding IE 9 through 11. `browserslist-to-esbuild` converts that policy to Vite/esbuild build targets so declared support and emitted JavaScript stay aligned.

### Static hosting

Select Netlify for the initial static host. The build command is `npm run build`, the publish directory is `dist`, and a `public/_redirects` rule rewrites nested paths to `/index.html` with status 200. No server-side functions or secret deployment variables are required by this foundation.

### Public configuration and secrets

Document `VITE_CONTACTS_API_BASE_URL` as the public demo-service setting and provide only its JSONPlaceholder URL in `.env.example`. Vite-exposed variables are public by definition; do not put credentials, tokens, or private values in them or in browser assets.

## Remaining Operational Note

The current terminal runtime is Node 22.5.1, below the selected requirement. Upgrade to a supported version before installing dependencies or running project verification.
