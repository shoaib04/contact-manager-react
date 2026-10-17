<!--
Sync Impact Report
Version change: unversioned scaffold → 1.0.0 (initial adoption)
Principles added:
- I. Contract-Preserving Migration
- II. Functional React and State Ownership
- III. Consistent Naming and Explicit Contracts
- IV. Safe and Accessible Browser UI
- V. Behavior-Focused Testing and Verification
Sections added:
- Core Principles (five principles)
- Architecture and Product Boundaries
- Delivery and Review Workflow
- Governance
Sections removed: None.
Follow-up TODOs: None; open platform and product decisions remain with their owning specs.
-->

# Contact Manager React Constitution
## Core Principles

### I. Contract-Preserving Migration
Every React feature MUST trace to an accepted feature or project-foundation requirement. Its
specification MUST distinguish current behavior, approved changes, and unresolved decisions.
Preserve documented routes, API contracts, data meanings, and user-visible behavior unless the
owning specification explicitly approves a change. Known defects MUST NOT become requirements,
and unresolved behavior MUST NOT be decided by implementation alone. This keeps migration
decisions grounded in evidence without turning accidental behavior into product policy.

### II. Functional React and State Ownership
New UI MUST use function components and React hooks. Hooks MUST follow the Rules of Hooks.
Rendering MUST remain pure: it MUST NOT perform I/O, mutate shared data, or trigger side effects.
State MUST live with the narrowest owner that serves its consumers; derive display values from
that source of truth instead of storing duplicates. Keep presentation separate from API and
domain logic. These rules reduce coupling and make UI behavior predictable.

### III. Consistent Naming and Explicit Contracts
Component, page, and component-file names MUST use PascalCase, for example `ContactForm.tsx`.
Custom hooks MUST use `useThing` names and matching `useThing.ts` files. Variables, functions,
props, callbacks, and non-component modules MUST use camelCase. Type names MUST use PascalCase;
component prop types MUST end in `Props`; callback props MUST begin with `on`; event handlers
MUST begin with `handle`. Use `UPPER_SNAKE_CASE` only for module-level immutable configuration
constants. Type names MUST NOT use an `I` prefix, and abbreviations MUST be clear and conventional.
Test files MUST use the `*.test.ts` or `*.test.tsx` suffix and mirror the subject name.

The project-foundation specification MUST record the implementation language. Because the
current application uses TypeScript, the React foundation SHOULD select TypeScript unless it
records a reason to select JavaScript. If TypeScript is selected, new code MUST pass strict type
checking; `any` and unchecked casts are limited to narrow, documented interoperability
boundaries. In either language, domain models, component props, and API payloads MUST have
explicit contracts. Validate remote response values at the integration boundary because
compile-time types do not validate JSON at runtime.

### IV. Safe and Accessible Browser UI
Remote resources MUST use HTTPS, and browser bundles MUST NOT contain credentials or private
secrets. Treat user input and remote data as untrusted. Render text using React's standard
escaping; do not use executable URLs such as `javascript:` or raw HTML APIs such as
`dangerouslySetInnerHTML` unless the owning specification approves a narrowly scoped, sanitized
use. Interactive controls MUST have accessible names, keyboard operation, and visible focus.
Inputs MUST have associated labels, and validation errors MUST be programmatically connected to
their fields. Asynchronous interactions MUST show the loading, empty, and error states defined
by their owning specification. Failures MUST be surfaced, not swallowed or disguised as success.

### V. Behavior-Focused Testing and Verification
Tests MUST verify outcomes visible to users or callers rather than component internals. Each
automatically testable acceptance criterion MUST have an automated test. API contracts and
cross-component route behavior MUST be covered at their integration boundaries; critical user
journeys MUST have end-to-end coverage. A defect fix MUST include a regression test. Tests MUST
NOT preserve known defects or settle unresolved product behavior. Before merge, run the
documented type-check, build, lint, and relevant test commands, and report failures or unrun
checks accurately.

## Architecture and Product Boundaries

The target is a browser-only React single-page application that produces static browser assets.
The current project has no application server, database, authentication service, or persistent
storage. Do not add these capabilities, or browser persistence, without an approved specification
that defines scope, data ownership, security, and lifecycle.

The project-foundation specification owns language and tooling choices, routing, build and test
tools, UI dependencies, runtime resources, supported Node.js and npm versions, browser targets,
configuration, build output, and deployment. Preserve the existing browser policy until that
specification approves a change: usage above 0.5%, the latest two versions, Firefox ESR,
non-dead browsers, and no Internet Explorer 9 through 11.

Feature specifications own route behavior, contact API contracts, catalog and cart semantics,
and page-level interactions. Treat items marked **Recommended target** as proposals until
accepted, and keep **Decision needed** items open until the owner decides them. Do not infer
authentication, persistence, checkout, quantity, duplicate-item, or external-write behavior.

## Delivery and Review Workflow

Before implementing user-visible behavior, update the owning feature or foundation specification
with testable acceptance criteria and resolve any decisions required for that change. Changes to
routes, API contracts, data models, setup, integrations, or deployment MUST update the related
documentation in the same change.

The foundation specification MUST define the formatter, linter, type-check, build, and test
commands. Implementations MUST use those commands as quality gates; do not claim an unrun check
passed. Tests MUST cover the accepted behavior, and failures MUST be reported explicitly rather
than hidden by broad catches or success-shaped fallbacks.

## Governance

This Constitution governs specifications, plans, implementation, and review. Amendments MUST
include the reason for change, affected principles, compatibility impact, and required updates to
specifications, documentation, and tests. A project maintainer MUST approve the amendment, and
the amendment MUST update the version and last-amended date.

Use semantic versioning: increment MAJOR for backward-incompatible removal or redefinition of a
rule, MINOR for a new principle or material expansion, and PATCH for clarifications or other
non-semantic refinements. Reviewers MUST check compliance during specification, planning, and
code review. Any exception MUST identify the principle, justification, scope, owner approval,
and expiry or remediation plan; silent exceptions are not permitted.

**Version**: 1.0.0 | **Ratified**: 2026-10-13 | **Last Amended**: 2026-10-13
