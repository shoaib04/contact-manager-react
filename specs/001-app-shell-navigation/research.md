# Research: App Shell and Navigation

## Current Project Evidence

- The React project is a Vite single-page application. `src/main.tsx` mounts `src/App.tsx` into the root element.
- The package manifest contains React, React DOM, TypeScript, Vite, and Oxlint. It does not currently include a router or a test runner.
- Available scripts are `npm run dev`, `npm run build` (`tsc -b && vite build`), `npm run lint` (`oxlint`), and `npm run preview`.
- The existing screen is the Vite starter; there is no existing shell or route composition to preserve in the React code.

## Decisions and Dependencies

### Route library

Defer router selection to the project-foundation plan for specification 007, which owns routing and tooling choices. This feature plan defines route behavior and shell integration only. The chosen router must support direct route rendering, nested-route active navigation, the root redirect, and a not-found route. Ensure `/products/cart` resolves to the cart route and not `/products/:productId`.

### Test stack

Defer unit, integration, and end-to-end test tooling to specification 007. The current project has no test scripts. Once selected, tests for this feature must assert user-visible behavior and meet the constitution's `*.test.ts` or `*.test.tsx` naming rule.

### Static hosting

The route map requires direct access and refresh for nested addresses. The hosting provider and fallback configuration are not selected. Specification 007 owns the host and must define how static hosting serves the application entry point for supported routes.

### Feature boundaries

The shell owns shared header, navigation, footer, display-only Search, and not-found presentation. Destination page content remains with its owning feature specification. The shell receives cart count from the shopping-cart feature and does not define counting or persistence behavior.

## Open Dependency

Complete the relevant decisions in specification 007 before implementation. No router, test framework, hosting provider, or new runtime dependency is selected by this feature plan.
