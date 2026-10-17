# Feature Specification: App shell and navigation

**Feature Branch**: Not created

**Created**: 2026-10-13

**Status**: Draft

**Input**: User description: "create a specification for the first spec set 001. analyse the current project for this and complete it for my new project in react"

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Navigate between the main areas (Priority: P1)

As a visitor, I want to move between the main areas from any page, so I can find the part of the application I need without memorizing its address.

**Why this priority**: Visitors need the shared navigation to reach the contact, shopping, learning, and about areas.

**Independent Test**: Open each main navigation destination from a supported page and confirm the destination and current-area indicator without relying on page-specific actions.

**Acceptance Scenarios**:

1. **Given** I open the home address, **when** the page loads, **then** I arrive at the Concepts page with the shared header and footer visible. (FR-001, FR-002)
2. **Given** I am on a supported page, **when** I choose a main navigation item, **then** I arrive at its mapped destination and see the current area indicated. Home returns me to Concepts. (FR-002, FR-004)
3. **Given** the cart is empty or contains entries, **when** I view the shared header, **then** its Cart control shows the current cart count; choosing it opens the cart page. (FR-005)
4. **Given** the cart count changes, **when** I view the shared header, **then** its Cart control shows the new count. (FR-005)
5. **Given** I view the shared header, **when** I reach the Search demo, **then** it is labeled as a demo and cannot be submitted or used to search. (FR-009)
6. **Given** I open any supported address, **when** the page loads, **then** no sign-in is required and the shell shows no Login or Sign up links. (FR-010)

### User Story 2 - Open a page directly and recover from an invalid address (Priority: P1)

As a visitor, I want direct links to work and invalid addresses to offer a clear way back, so I can continue when I arrive from a bookmark or mistyped link.

**Why this priority**: Visitors need to reach a destination from a direct link and return to a known page after opening an invalid address.

**Independent Test**: Open each supported address and an unrecognized address directly, then verify the destination and shared shell.

**Acceptance Scenarios**:

1. **Given** I open or refresh any supported address, **when** the application loads, **then** it displays the page assigned to that address. (FR-002, FR-003)
2. **Given** I open an unrecognized address, **when** the application loads, **then** the shared shell displays "Page not found" and a "Return to Concepts" link. (FR-001, FR-008, FR-011)
3. **Given** I am on an unrecognized address, **when** I use the main navigation, **then** I can reach the supported areas. (FR-002, FR-008)

### User Story 3 - Use the shared controls on a narrow screen (Priority: P2)

As a visitor using a narrow screen or keyboard, I want the shared controls to stay usable, so I can reach the same areas as visitors using a larger screen.

**Why this priority**: Visitors need every main destination and page-level return control to remain available on small screens and with keyboard input.

**Independent Test**: At a display width of 320 pixels, use only the keyboard to open the menu, visit each main area, and return to the top of a long page.

**Acceptance Scenarios**:

1. **Given** I use a display width of 320 pixels, **when** I open the navigation, **then** I can reach every main destination without horizontal page scrolling. (FR-006)
2. **Given** I use only a keyboard, **when** I move through the menu, **then** each control has an accessible name and visible focus. (FR-006)
3. **Given** I am partway down a page, **when** I choose Back to Top, **then** the page returns to its beginning. (FR-007)

### Edge Cases

- Opening `/` sends the visitor to `/concepts`.
- `/products/cart` opens the shopping cart rather than product details.
- An empty cart displays a count of zero.
- A path that matches none of the supported addresses displays the not-found view with the shared shell.
- A contact or product identifier that does not exist is handled by its destination feature specification.
- Visitors can open a supported nested address directly and refresh it without losing the destination.

## Requirements *(mandatory)*

### Current behavior

- The application shows a shared header and footer around routed pages, including the not-found view.
- The header brand reads "Contact Manager with Shopping". The navigation items are Home, Concepts, Contacts, PrimeNg, and Shopping. PrimeNg opens `/about`.
- Opening `/` redirects to `/concepts`. The current route set appears in FR-002.
- The Cart control displays the current number of cart entries and opens `/products/cart`.
- Search does not return results. Login and Sign up are placeholder links.
- The footer provides Back to Top and displays a 2019 ITC Infotech attribution.
- An unmatched address displays a not-found view with the placeholder text "page-not-found works!".
- The listed routes are publicly accessible. The new-contact route does not require sign-in.

### Functional Requirements

- **FR-001 (Baseline)**: The replacement MUST show a shared header and footer around every supported destination and the not-found view.
- **FR-002 (Baseline)**: The application MUST support these current addresses and destinations:

  | Address | Destination |
  |---|---|
  | `/` | Redirect to Concepts |
  | `/concepts` | Concepts |
  | `/contacts` | Contact list |
  | `/contacts/new` | New contact |
  | `/contacts/<contact-id>` | Contact details |
  | `/about` | About page |
  | `/products` | Shopping catalog |
  | `/products/cart` | Shopping cart |
  | `/products/<product-id>` | Product details |

- **FR-003 (Target outcome)**: Each address in FR-002 MUST display its assigned destination when opened directly or refreshed. The project-foundation specification owns support for this outcome after publication.
- **FR-004 (Baseline)**: The main navigation MUST indicate the current area, including when a visitor is on a nested contact or shopping page.
- **FR-005 (Baseline)**: The shared header MUST show a Cart control with the current count supplied by the cart feature. Choosing the control MUST open `/products/cart`. The cart feature owns the meaning of the count.
- **FR-006 (Project constraint)**: At a 320-pixel display width, the main destinations MUST be collapsed behind a menu button. Activating the button MUST open the navigation so visitors can reach every destination. The navigation MUST remain usable with keyboard-only input. The menu control and destinations MUST have accessible names and visible keyboard focus, and the page MUST NOT scroll horizontally.
- **FR-007 (Baseline)**: The footer MUST provide a Back to Top action that returns the page to its beginning.
- **FR-008 (Baseline)**: An unrecognized address MUST display a not-found view inside the shared shell. The existing placeholder wording is current behavior, not approved replacement copy.
- **FR-009 (Approved target)**: The shared shell MUST retain Search as a visibly labeled, non-interactive demo. It MUST NOT accept search input, return results, or change application data.
- **FR-010 (Approved target)**: All addresses in FR-002 MUST remain publicly accessible. The shared shell MUST omit the Login and Sign up links. Authentication is outside this feature's scope.
- **FR-011 (Approved target)**: The shell MUST retain the brand "Contact Manager with Shopping", navigation labels Home, Concepts, Contacts, PrimeNg, and Shopping, the "Back to Top" footer link, and the existing 2019 ITC Infotech attribution. The not-found view MUST display "Page not found" and a "Return to Concepts" link to `/concepts`.

### Key Entities *(include if feature involves data)*

- **Cart count**: The number of current cart entries shown beside the Cart control. The shopping-cart feature owns the counting rules, and the shell displays its value.

## Success Criteria *(mandatory)*

### Measurable Outcomes

SC-006 and SC-007 are usability study goals, not release acceptance gates.

- **SC-001**: All nine address patterns in FR-002 display the correct destination when opened directly; `/` reaches `/concepts`.
- **SC-002**: Every main navigation destination works from every supported page, and the current area is indicated correctly in all checked cases.
- **SC-003**: The Cart control displays the count provided by the cart feature for empty, populated, and changed carts and opens `/products/cart` with one activation.
- **SC-004**: At a display width of 320 pixels, visitors can open the navigation and reach all five main destinations without horizontal page scrolling. They can also operate the menu and links using only a keyboard.
- **SC-005**: Every tested unrecognized address displays "Page not found" and a working "Return to Concepts" link inside the shared shell.
- **SC-006**: In a task-based review with five first-time visitors, at least four can find Contacts and Shopping and return to Concepts within 30 seconds without assistance.
- **SC-007**: In that review, at least four of the five visitors rate the navigation labels as clear at 4 or higher on a 5-point scale.

## Assumptions

- The current route set is the baseline for the replacement. A route change requires approval in its owning feature specification.
- The contact-management feature specification owns the content and behavior of `/contacts`, `/contacts/new`, and `/contacts/<contact-id>`.
- The product-catalog and shopping-cart feature specifications own the content of `/products` and `/products/<product-id>`. The shopping-cart specification defines the count shown by FR-005 and the behavior of `/products/cart`.
- The concepts and about feature specifications own the content of `/concepts` and `/about`.
- The project-foundation specification (set 007) covers publication and MUST support direct access and refresh for every address in FR-002.
- The project constitution's keyboard and focus requirements apply to this feature.
- Search remains display-only, all supported routes remain public, account links are omitted, and the current shell copy is retained except for the not-found message and recovery link.

## Source basis

The route map is grounded in the [main route configuration](../../src/app/app-routing.module.ts), [shopping route configuration](../../src/app/shopping/product-routing.module.ts), and [application module](../../src/app/app.module.ts). The shared frame and controls are grounded in the [application layout](../../src/app/app.component.html), [header](../../src/app/shared/components/header/header.component.html), [navigation](../../src/app/shared/components/nav/nav.component.html), [search control](../../src/app/shared/components/header/search.component.ts), [footer](../../src/app/shared/components/footer/footer.component.ts), and [not-found view](../../src/app/shared/components/page-not-found/page-not-found.component.html). The [new-contact access rule](../../src/app/shared/guards/auth.guard.ts) permits visitors to open that page without sign-in. The [cart count source](../../src/app/shared/services/shopping-cart-data.service.ts) supplies the header count. Keyboard access and visible focus are required by the [project constitution](../../.specify/memory/constitution.md).
