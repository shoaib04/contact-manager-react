# Feature Specification: About UI demos

**Feature Branch**: Not created

**Created**: 2026-10-17

**Status**: Draft

**Input**: User description: "Create React migration specification set 006 for the about-page controls and formatting examples from the current project documentation and behavior."

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Explore the controls (Priority: P1)

As a visitor, I want to enter sample values and adjust a range, so I can see how the controls respond.

**Why this priority**: The controls are the first interactive examples on the About page.

**Independent Test**: Enter chip values, change the range, and use the Send Data control; verify the resulting state and feedback.

**Acceptance Scenarios**:

1. **Given** the About page is open, **when** I enter chip values, **then** the values remain visible in the control.
2. **Given** the range begins at 20 and 80, **when** I adjust either boundary, **then** the displayed values match the selected range.
3. **Given** I choose Send Data, **when** the action completes, **then** the current chip and range values appear as visible feedback without implying a remote submission.

### User Story 2 - Read formatting examples safely (Priority: P2)

As a visitor, I want to compare date and text formatting examples, so I can see how the same sample value appears under different formats.

**Why this priority**: The About page demonstrates visible transformations of date and text values.

**Independent Test**: Compare the sample date and text in each displayed format, including the two ellipsis examples.

**Acceptance Scenarios**:

1. **Given** the sample date is displayed, **when** I view the formatting examples, **then** I see the default date and the explicit date-time format.
2. **Given** the sample text is displayed, **when** I view the text examples, **then** I see the original, uppercase, and two ellipsis outputs.
3. **Given** I inspect the URL-safety example, **when** I activate its safe link, **then** it does not execute script or unsafe navigation.

### Edge Cases

- The chip list is empty.
- The range boundaries are changed to their minimum or maximum.
- The text sample is shorter than an ellipsis limit.
- The browser uses a different locale for the default date format.
- A visitor attempts to follow an unsafe URL example.

## Requirements *(mandatory)*

### Current behavior

The About page shows a chips control, a range beginning at 20 and 80, and a Send Data button that writes values to the browser console. It shows a sample birthday, default and explicit date formatting, original and uppercase text, and ellipsis examples at 60 and 240 characters. The page also contains an unsafe executable URL example and references HTML snippet values that the component does not define.

### Functional Requirements

- **FR-001**: The page MUST provide a labeled chip-entry control and preserve values entered by the visitor while the page remains open.
- **FR-002**: The page MUST show a two-value range control initialized to 20 and 80 and display the current selected values.
- **FR-003 (Approved target)**: Choosing Send Data MUST display the current chip and range values on the page. It MUST NOT send data to an external service.
- **FR-004**: The page MUST show the sample birthday, its default date representation, and its representation using `dd/MMMM/yyyy hh:mm:ss a`.
- **FR-005**: The page MUST show the sample text as entered, uppercase, and in ellipsis examples using limits of 60 and 240 characters.
- **FR-006**: The URL-safety example MUST use only safe, non-executable navigation. It MUST NOT create a clickable `javascript:` URL or bypass browser URL safety.
- **FR-007**: The undefined HTML snippet example MUST NOT be reproduced as broken content. The page MUST NOT insert untrusted markup as HTML.
- **FR-008**: Every interactive control MUST have an accessible name, keyboard operation, visible focus, and associated instructions or validation where needed.

### Key Entities

- **Chip value**: A text value entered into the sample control.
- **Range selection**: Two numeric bounds, initially 20 and 80.
- **Formatting sample**: The page's fixed date and text values used to demonstrate presentation changes.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: Visitors can enter and review chip values and change both range boundaries using keyboard and pointer input.
- **SC-002**: The date and text examples each show every format required by FR-004 and FR-005.
- **SC-003**: Choosing Send Data displays the current chip and range values without an external submission.
- **SC-004**: No displayed link executes script or bypasses safe URL handling.
- **SC-005**: No undefined snippet values or untrusted HTML appear on the page.

## Assumptions

- The chip list and range remain local demonstration state; they do not call an external service.
- The initial range remains 20 and 80.
- The unsafe URL and undefined HTML snippet are defects, not required behavior. The URL example follows the project constitution's browser-safety rules.
- Send Data displays its values locally; no external submission occurs.

## Source basis

The [About UI requirements](../../docs/spec-requirements.md) and [data model](../../docs/data-model/data-model.md) define the example boundary. Current behavior is grounded in the [About template](../../src/app/about/about.component.html), [About component](../../src/app/about/about.component.ts), [ellipsis transformation](../../src/app/shared/pipes/ellipsis.pipe.ts), and [project constitution](../../.specify/memory/constitution.md).