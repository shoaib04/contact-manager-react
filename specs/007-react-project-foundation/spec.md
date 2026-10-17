# Feature Specification: React project foundation

**Feature Branch**: Not created

**Created**: 2026-10-17

**Status**: Draft

**Input**: User description: "Create React migration specification set 007 for the project foundation, setup, testing, and delivery requirements based on the current project documentation."

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Set up and run the application (Priority: P1)

As a developer, I want documented prerequisites and repeatable setup steps, so I can run the application locally without guessing its requirements.

**Why this priority**: Every feature spec depends on a working development environment.

**Independent Test**: On a clean environment that meets the documented prerequisites, follow the setup instructions and open the application locally.

**Acceptance Scenarios**:

1. **Given** a clean checkout and supported runtime, **when** I follow the documented setup, **then** dependencies install and the development application starts.
2. **Given** the application is running, **when** I open each supported route directly and refresh it, **then** the intended page loads.

### User Story 2 - Verify and produce a release artifact (Priority: P1)

As a developer, I want documented verification and build commands, so I can check a change and produce browser assets for release.

**Why this priority**: Feature work must be testable and releasable as a browser application.

**Independent Test**: Run the documented type, lint, unit, end-to-end, and production-build checks; verify each result and the generated static artifact.

**Acceptance Scenarios**:

1. **Given** a feature change, **when** I run the documented checks, **then** each check reports pass or a clear failure.
2. **Given** the production build succeeds, **when** its browser assets are served at the supported base path, **then** the application loads and direct route refreshes work.

### Edge Cases

- A required runtime version is missing or unsupported.
- A documented command fails because a dependency or service is unavailable.
- A visitor opens a nested route directly or refreshes it.
- An environment-specific setting is missing.
- A deployment target is not yet selected.

## Requirements *(mandatory)*

### Current behavior

The repository contains a browser-only application and produces static browser assets. It has no application server, database, authentication service, persistent storage, CI pipeline, or deployment target. The package manifest defines installable dependencies and scripts, but supported Node.js and npm versions are not pinned. Existing browser targets are usage above 0.5%, the last two versions, Firefox ESR, non-dead browsers, and no Internet Explorer 9 through 11. Current tests use legacy runners and include stale expectations; no test or build result has been verified for the React target.

### Functional Requirements

- **FR-001**: The project MUST deliver a browser application using the React framework selected by the project owner.
- **FR-002**: The project MUST document supported development-runtime versions and provide repeatable dependency installation and local-start procedures.
- **FR-003**: The project MUST document commands for type checking, linting, unit testing, end-to-end testing, and production build. Each command MUST report failures without presenting them as successful results.
- **FR-004**: The production build MUST produce static browser assets and MUST support direct opening and refresh of every route defined by the feature specifications.
- **FR-005**: The project MUST document the selected browser-support policy. Unless the project owner approves a change, retain the current policy: usage above 0.5%, the latest two versions, Firefox ESR, non-dead browsers, and no Internet Explorer 9 through 11.
- **FR-006**: Browser bundles MUST NOT contain credentials or private secrets. Environment-specific public settings MUST be identified by name and documented without publishing secret values.
- **FR-007 (Approved target)**: The first release MUST publish static browser assets and support direct route refresh. The hosting provider and release procedure MUST be selected during project planning.
- **FR-008**: The project MUST NOT add an application server, database, authentication service, payment service, or persistent browser storage without an approved feature specification defining its ownership, security, and lifecycle.
- **FR-009**: Automated verification MUST cover every automatically testable acceptance criterion in the feature specifications, with integration and end-to-end coverage for cross-feature routes and critical user journeys.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: A developer can set up and start the application from a clean checkout using only the documented prerequisites and commands.
- **SC-002**: Every documented quality-check command returns a reproducible pass or failure result.
- **SC-003**: The production build produces static browser assets that load at the supported base path.
- **SC-004**: Every route in the feature specifications loads both through in-app navigation and direct URL refresh.
- **SC-005**: No production browser bundle contains credentials or private secrets.

## Assumptions

- React is the target framework selected by the project owner. The existing constitution recommends TypeScript unless the foundation plan records a reason to choose JavaScript.
- This remains a browser-only application that produces static assets.
- Build, test, lint, router, and UI-library choices are implementation decisions for the foundation plan; this specification defines the outcomes they must support.
- The first release is a static single-page application; its host and release procedure are selected during planning.
- The contact endpoint and its configuration are owned by the contact-management specification.

## Source basis

The [developer setup](../../docs/development/setup-and-testing.md), [deployment boundary](../../docs/operations/deployment.md), [configuration reference](../../docs/config-reference.md), and [system inventory](../../docs/system-inventory.md) describe current operational constraints. The [browser target policy](../../src/browserslist), [package manifest](../../package.json), [build configuration](../../angular.json), and [project constitution](../../.specify/memory/constitution.md) ground the requirements and assumptions.