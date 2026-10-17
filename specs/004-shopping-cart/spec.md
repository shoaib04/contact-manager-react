# Feature Specification: Shopping cart

**Feature Branch**: Not created

**Created**: 2026-10-17

**Status**: Draft

**Input**: User description: "Create React migration specification set 004 for the shopping cart from the current project documentation and behavior."

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Review the cart (Priority: P1)

As a visitor, I want to see the products I have added, so I can review the sample cart.

**Why this priority**: The cart is the destination of the catalog's Add to cart action and supplies the shared header count.

**Independent Test**: Open the cart at startup and after adding one or more products; verify the initial item, rows, and header count.

**Acceptance Scenarios**:

1. **Given** I open the application in a new session, **when** I open the cart, **then** I see the initial Cheese product.
2. **Given** I add a product from the catalog, **when** I open the cart, **then** I see that product's name, category, and display price.
3. **Given** the cart contents change, **when** I view the shared header, **then** its count reflects the cart rule selected in FR-006.

### User Story 2 - Manage cart entries (Priority: P2)

As a visitor, I want cart controls to describe their effect and apply it to the intended item, so I can manage the sample cart without losing another item by mistake.

**Why this priority**: A misleading remove or checkout control can cause visitors to believe an unsupported operation succeeded.

**Independent Test**: Add two distinguishable products, use each enabled cart control, and verify only the promised change occurs.

**Acceptance Scenarios**:

1. **Given** the cart has more than one entry, **when** I use the approved removal action, **then** only its intended entry is removed.
2. **Given** I review the sample cart, **when** I inspect purchase controls, **then** quantity remains fixed at one and no total or checkout action is offered.

### Edge Cases

- The cart contains its initial item and no visitor-added products.
- The same product is added more than once.
- The visitor removes the first, middle, or last cart row.
- The application is reloaded after cart changes.
- A product's display price is a string and does not support arithmetic without an approved price rule.

## Requirements *(mandatory)*

### Current behavior

A new application session begins with Cheese, product ID 2, at `$6.38`. The cart shares entries with the header and appends each catalog selection. Its current removal handler receives a product but treats the value as an array index, so it removes the first row. The quantity control stays at one, the total is placeholder text, and Checkout has no action. Cart data remains in memory and is not persisted across application restarts.

### Functional Requirements

- **FR-001**: A new application session MUST begin with the Cheese sample product, ID 2, with display price `$6.38`.
- **FR-002**: Choosing Add to cart in the catalog MUST add the selected product to the shared cart.
- **FR-003**: Each cart row MUST show the product name, category, and display price.
- **FR-004**: The shared header MUST show a count derived from cart contents. The exact counting rule MUST follow the decision in FR-006.
- **FR-005**: Cart state MUST be limited to the active application session. The cart MUST NOT claim to persist across application restarts without an approved persistence specification.
- **FR-006 (Approved target)**: Each Add to cart action MUST create a separate cart entry, including when the same product is already present.
- **FR-007 (Approved target)**: The Remove action MUST remove only the selected cart entry.
- **FR-008**: Quantity editing, calculated totals, and checkout MUST remain outside this sample-cart scope until an approved specification defines their behavior and any required pricing or purchase contract.
- **FR-009**: The cart MUST NOT claim that a payment or order was completed; the repository defines no payment or checkout service.

### Key Entities

- **Cart entry**: A product placed in the current session's cart. Each addition creates a separate entry.
- **Product**: A sample catalog item with an identifier, name, category, and display-price string.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: A new application session displays one Cheese entry and a header count consistent with the selected counting rule.
- **SC-002**: Each catalog Add to cart action makes the selected product visible in the cart.
- **SC-003**: Every cart row displays its name, category, and display price.
- **SC-004**: No action reports successful checkout or payment without an approved order and payment contract.

## Assumptions

- The cart is a sample shopping experience, not an order-management or payment system.
- Cart state is in memory for the current session; browser persistence is outside scope.
- Product prices remain display strings until a separate price and currency rule is approved.
- Quantity, total, and checkout remain outside scope. Duplicate additions create separate entries, and Remove targets the selected entry.

## Source basis

The [cart data model](../../docs/data-model/data-model.md) and [cart requirements](../../docs/spec-requirements.md) define the documented scope. Current behavior is grounded in the [cart service](../../src/app/shared/services/shopping-cart-data.service.ts), [cart view](../../src/app/shopping/cart/cart.component.html), [cart component](../../src/app/shopping/cart/cart.component.ts), and [header count](../../src/app/shared/components/header/header.component.ts).