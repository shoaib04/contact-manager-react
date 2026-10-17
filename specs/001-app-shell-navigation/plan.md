# Implementation Plan: App Shell and Navigation

**Branch**: Not created | **Date**: 2026-10-17 | **Spec**: [spec.md](spec.md)

**Input**: Feature specification at `specs/001-app-shell-navigation/spec.md`

## Summary

Replace the Vite starter screen with the shared React application shell and route composition defined by the feature specification. Implement the branded header, five navigation destinations, responsive keyboard-operable menu, display-only Search demo, cart link/count integration, footer, and not-found view. Preserve page ownership in the contact, catalog, cart, concepts, and about feature specifications. Router, test tooling, and static-host route fallback are foundation decisions owned by specification 007 and must be settled there before implementation.

## Technical Context

**Language/Version**: TypeScript 6.0.x, as declared by the current package manifest

**Primary Dependencies**: React 19.2.x and React DOM 19.2.x; no router is currently installed. Select the router through the project-foundation plan before implementation.

**Storage**: None. Shell state is derived from the current route; cart count is supplied by the shopping-cart feature.

**Testing**: Current scripts are `npm run build` (`tsc -b && vite build`) and `npm run lint` (`oxlint`). No unit or end-to-end test runner is configured. Foundation specification 007 owns test-tool selection; shell acceptance scenarios must receive automated coverage once that choice is made.

**Target Platform**: Browser-only React single-page application producing static assets; support the existing browser policy in specification 007.

**Project Type**: Frontend web application

**Performance Goals**: No special performance target is defined. Navigation and shell controls must respond normally without blocking the browser.

**Constraints**: Direct navigation and refresh must work for every route in the specification. At 320px, the navigation is collapsed behind an accessible menu button and the page has no horizontal scrolling. Route-refresh hosting behavior depends on the static host selected by specification 007.

**Scale/Scope**: Shared shell and route integration only. Feature-specific contact, product, cart, concepts, and about behavior remains owned by its respective specification.

## Constitution Check

- **Contract-preserving migration**: Preserve the accepted route map and approved shell copy. Implement only the destinations and interactions assigned to this feature; feature specifications own page behavior.
- **Functional React and state ownership**: Use function components and hooks. Derive the active navigation area from the router location. Do not duplicate the cart's count state in the shell.
- **Consistent naming and explicit contracts**: Use PascalCase component files, explicit TypeScript props, and `*.test.ts` / `*.test.tsx` test names.
- **Safe and accessible browser UI**: Use semantic navigation, an accessible menu button with visible focus and keyboard operation, and no executable HTML injection. Search remains display-only rather than an active form control.
- **Behavior-focused verification**: Cover the acceptance criteria at user-visible boundaries. The required test stack must be selected by specification 007 before implementation; do not claim unconfigured checks passed.

**Gate result**: No planned constitution exception. Implementation is gated on resolving the router and test-stack choices in the project-foundation plan.

## Design and Integration

- Keep the application entry point at `src/main.tsx`; replace the starter content in `src/App.tsx` with the route composition and shared shell.
- Build the shell from focused components for the header, main navigation, footer, and not-found view. Keep styling in the existing application stylesheets unless a foundation decision establishes another convention.
- Render the header and footer around every supported route, including not-found. The root route redirects to `/concepts`; the Home and Concepts navigation destinations follow the behavior specified in `spec.md`.
- Support `/concepts`, `/contacts`, `/contacts/new`, `/contacts/:contactId`, `/about`, `/products`, `/products/cart`, and `/products/:productId`. The exact `/products/cart` route must resolve to the cart destination rather than product details.
- Map active navigation state across nested contact and shopping routes. The About destination remains labeled PrimeNg in the shared navigation, per the approved shell copy.
- Receive the displayed cart count from the shopping-cart feature. The shell links to `/products/cart` and does not determine cart counting semantics.
- At a 320px viewport, provide a collapsible menu button with accessible name, expanded state, keyboard operation, and visible focus; expose all five destinations without horizontal page scrolling.
- Render Search as a visibly labeled, non-interactive demo. Do not accept input, submit a search, return results, or mutate application state.
- Provide the footer's Back to Top action and required attribution. The not-found view displays the approved message and a working link to `/concepts`.
- Configure direct-route refresh behavior at the hosting boundary selected in specification 007; do not add a server or persistence layer for this feature.

## Project Structure

### Documentation (this feature)

```text
specs/001-app-shell-navigation/
├── spec.md
├── plan.md
├── research.md
├── data-model.md
└── quickstart.md
```

### Source Code (repository root)

```text
src/
├── App.tsx                         # Route composition and shell integration
├── App.css                         # Application and shell styles
├── index.css                       # Global styles
├── main.tsx                        # Existing React entry point
├── components/
│   └── layout/
│       ├── AppShell.tsx
│       ├── Header.tsx
│       ├── MainNavigation.tsx
│       └── Footer.tsx
└── pages/
    └── NotFoundPage.tsx
```

Feature-owned destination components and test locations are added by their owning plans and by the foundation's test-tool decision. The router library and host-specific fallback configuration are also determined by specification 007.

**Structure Decision**: Extend the existing single Vite React application. Keep route composition at the current `App.tsx` boundary and add shared shell components under `src/components/layout/`; do not introduce another application or a backend.

## Complexity Tracking

No constitution violations or additional projects are proposed.
