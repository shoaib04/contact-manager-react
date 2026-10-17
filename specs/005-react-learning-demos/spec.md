# Feature Specification: React learning demos

**Feature Branch**: Not created

**Created**: 2026-10-17

**Status**: Draft

**Input**: User description: "Create React migration specification set 005 for the concepts-page learning demos from the current project documentation and behavior."

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Explore interactive examples (Priority: P1)

As a learner, I want to view and change small examples, so I can understand how values and user actions affect a page.

**Why this priority**: The concepts page is the primary learning area of the application.

**Independent Test**: Open the learning page and verify each populated example displays its initial state and responds to its demonstrated interaction.

**Acceptance Scenarios**:

1. **Given** I open the learning page, **when** I choose a topic, **then** I see the matching example and its current values.
2. **Given** an example contains an editable value, **when** I change it, **then** the displayed value updates.
3. **Given** I activate the child-event example, **when** its delay completes, **then** the parent view displays the emitted name.
4. **Given** a topic has no complete example, **when** I browse the learning page, **then** the unfinished topic is omitted rather than shown as a blank or broken lesson.

### User Story 2 - Understand conditional and repeated content (Priority: P2)

As a learner, I want to see examples of conditional content, lists, and visual changes, so I can compare the result of different states.

**Why this priority**: These examples demonstrate how a page responds to data without using a real account or external service.

**Independent Test**: Open the structural examples and verify the signed-out message, skills list, and demonstration block appear as specified.

**Acceptance Scenarios**:

1. **Given** the demonstration state is signed out, **when** I view the conditional example, **then** I see the signed-out message.
2. **Given** a skills list is provided, **when** I view the list example, **then** every listed skill appears once.
3. **Given** I open the visual-style example, **when** it loads, **then** the demonstration block is yellow and 200 pixels high.

### Edge Cases

- An editable value is empty.
- A list contains no items.
- The child-event example has not completed its two-second delay.
- A topic has no approved example content.
- The local signed-out example is mistaken for real authentication.

## Requirements *(mandatory)*

### Current behavior

The concepts page presents examples for data binding, child-provided values, child events, structural and visual directives, and pipes. The populated examples use local demonstration values only. The child-event example emits the name Arun after two seconds. The Pipes tab is empty, the `ngSwitch` example is unfinished, and some source examples intentionally show broken syntax or explanatory TODO text.

### Functional Requirements

- **FR-001**: The learning page MUST provide working, user-visible examples for editable values, values supplied to a child example, events returned from a child example, conditional content, lists, and visual state.
- **FR-002**: The editable-values example MUST begin with the application name Contact Manager, signed-out state, skills `html`, `nodejs`, `react`, and `ng`, experience value 13, and company value `ITC`.
- **FR-003**: The child-value example MUST show ages 20, 30, 50, 100, and 65.
- **FR-004**: The child-event example MUST show no result before activation; after activation and a two-second delay, it MUST display the returned value `Arun` in the parent view.
- **FR-005**: The conditional and list examples MUST show the signed-out message and the skills `html`, `css`, `java`, and `maven`. The visual example MUST show a yellow block 200 pixels high.
- **FR-006 (Approved target)**: The page MUST omit the empty Pipes tab and unfinished `ngSwitch` example. It MUST NOT reproduce blank or broken examples as completed lessons.
- **FR-007**: The page MUST describe local demonstration state as a teaching example and MUST NOT imply that it authenticates visitors.
- **FR-008**: The page MUST use clear, user-facing terminology and MUST NOT reproduce broken Angular syntax or deliberate failure examples as required behavior.

### Key Entities

- **Learning example**: A self-contained page example with an initial value, an optional user action, and a visible result.
- **Demo value**: Local sample data such as a company name, skill, age, or signed-out state. It is not a contact record or authenticated user.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: Every approved topic displays its initial values and expected result without a runtime error.
- **SC-002**: Every editable example updates its visible value after one user change.
- **SC-003**: The child-event example displays `Arun` within three seconds after activation.
- **SC-004**: The learning page makes clear that its signed-out state is a local demonstration and not account access.

## Assumptions

- The learning page remains a demonstration area, not an authentication or production data feature.
- Current working example values remain the baseline.
- Empty or unfinished examples are omitted rather than reproduced as broken behavior.

## Source basis

The [React migration requirements](../../docs/spec-requirements.md) and [repository overview](../../docs/architecture/repository-overview.md) define the page boundary. Current examples are grounded in the [concepts tabs](../../src/app/concepts/concepts.component.html), [data-binding example](../../src/app/concepts/databinding/databinding.component.html), [child-value example](../../src/app/concepts/cpb/cpb.component.html), [child-event component](../../src/app/concepts/ceb/ceb.component.ts), and [structural example](../../src/app/concepts/sd/sd.component.html).