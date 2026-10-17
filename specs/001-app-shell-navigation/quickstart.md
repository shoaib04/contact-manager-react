# Quickstart: App Shell and Navigation

## Current Project Commands

The project currently defines these commands:

```sh
npm install
npm run dev
npm run lint
npm run build
npm run preview
```

`npm run build` performs TypeScript project builds followed by the Vite production build. No test command is currently configured; specification 007 owns the test-stack decision. These commands are documented from `package.json` and were not executed as part of creating this plan.

## Acceptance Checks

After implementation and foundation test tooling are in place, verify:

- `/` redirects to `/concepts`; each supported route loads directly and after refresh.
- Every supported route and the not-found view render the shared header and footer.
- Navigation destinations and active-area indication work on root, nested contact, about, catalog, product-detail, and cart routes.
- At 320px, the accessible menu button opens the five destinations without horizontal page scrolling; keyboard users can operate it and see focus.
- Search is visibly labeled but cannot accept or submit input.
- Cart displays the value supplied by the cart feature and opens `/products/cart`.
- The not-found view displays the approved message and links back to `/concepts`.
- Back to Top returns the visitor to the beginning of the page.
- Type checking, linting, tests, and production build pass using the commands finalized by specification 007.
