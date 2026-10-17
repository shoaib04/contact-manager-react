# Feature Specification: Product catalog

**Feature Branch**: Not created

**Created**: 2026-10-17

**Status**: Draft

**Input**: User description: "Create React migration specification set 003 for the product catalog from the current project documentation and behavior."

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Browse the catalog (Priority: P1)

As a visitor, I want to browse the available sample products, so I can compare items and choose one for the cart.

**Why this priority**: The catalog is the entry point to the shopping example.

**Independent Test**: Open `/products`; verify every sample item, its displayed name and price, and its product-details link.

**Acceptance Scenarios**:

1. **Given** I open the catalog, **when** it loads, **then** all ten sample products appear with a name, display price, image, and short description.
2. **Given** I choose a product's details link, **when** its address opens, **then** the product-details outcome defined by FR-004 appears.
3. **Given** I open a product's details, **when** its record exists, **then** I see the selected product's name, category, description, and display price.

### User Story 2 - Add a product to the cart (Priority: P1)

As a visitor, I want to add a product from its catalog card, so I can see it in the shared cart.

**Why this priority**: Adding a catalog item is the catalog's primary action and connects it to the cart feature.

**Independent Test**: Add a known product, open the cart, and verify the same product is present; cart rules are owned by spec 004.

**Acceptance Scenarios**:

1. **Given** a product card is visible, **when** I choose Add to cart, **then** that product is passed to the cart experience.
2. **Given** I add a product, **when** I open its details link, **then** the cart contents remain governed by the shopping-cart feature.

### Edge Cases

- A product identifier does not match an item in the sample catalog.
- A product has a long name or category.
- A product image is unavailable.
- The visitor activates Add to cart repeatedly.

## Requirements *(mandatory)*

### Current behavior

The catalog contains ten sample records. Each has an identifier, name, category, and price represented as display text. Cards show a placeholder image, a generic description, the name, and price; the category is used in the cart. Product names link to `/products/:id`, whose current content is only a placeholder. Catalog data is local to the application, and Add to cart delegates to the shopping-cart feature.

### Functional Requirements

- **FR-001**: The catalog MUST show the ten sample products listed below with their current names, categories, and display prices.

  | ID | Name | Category | Display price |
  |---:|---|---|---:|
  | 1 | Apple | Fruits | $2.76 |
  | 2 | Cheese | Dairy | $6.38 |
  | 3 | Orange | Fruits | $4.85 |
  | 4 | Tomato | Vegetables | $5.01 |
  | 5 | Table Cloth | Kitchen Essentials | $6.13 |
  | 6 | Cranberries - Frozen | Fruits | $7.08 |
  | 7 | Angular 7 Book | Books | $6.89 |
  | 8 | NFS - PS4 Game | Games | $9.48 |
  | 9 | Pepper | Grocery | $5.51 |
  | 10 | Potatoes - Organic | Vegetables | $9.63 |

- **FR-002**: Each catalog card MUST display the product name, display price, a short description, and an image. Product images MUST use secure resources or approved local assets.
- **FR-003**: Each product card MUST offer an Add to cart action that passes the selected product to the shopping-cart feature without changing its identity or display price.
- **FR-004 (Approved target)**: `/products/:id` MUST display the selected product's name, category, description, and display price.
- **FR-005**: The product category MUST remain available to the shopping-cart feature, even if the catalog card does not display it.
- **FR-006**: The catalog MUST NOT imply inventory availability, payment, or purchase completion because the current project defines none of those contracts.

### Key Entities

- **Product**: A sample catalog entry identified by a numeric ID, with a name, category, and display-price string. The price is not a numeric total or payment amount.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: All ten sample products appear in the catalog with the correct name and display price.
- **SC-002**: Every product card's details link opens the matching product route.
- **SC-003**: Every Add to cart action sends the selected product to the shopping-cart feature; the catalog does not alter cart rules.
- **SC-004**: Product-image failure does not hide the product name or price.

## Assumptions

- The ten records remain a sample catalog; a remote product service is outside this feature.
- Product price strings remain display values. Numeric totals belong to an approved cart/pricing scope.
- Placeholder image selection is a project-foundation resource decision.
- Product details use the sample catalog fields; additional inventory or purchase behavior is outside scope.

## Source basis

The [data model](../../docs/data-model/data-model.md) and [React migration requirements](../../docs/spec-requirements.md) describe the catalog boundary. Current evidence is in the [product records](../../src/app/shared/models/product.ts), [product list](../../src/app/shopping/product-list/product-list.component.html), and [product routes](../../src/app/shopping/product-routing.module.ts).