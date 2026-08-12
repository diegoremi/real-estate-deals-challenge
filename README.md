# Real Estate Deals Challenge

A small real estate deal management application built with **Angular 17**.

The application allows authenticated users to browse a pre-filled collection of real estate deals, filter them by name and purchase price, and add new deals during the current browser session.

## Features

- Authentication flow with protected routes
- Pre-filled real estate deal listing
- Add new deals through a validated reactive form
- Automatic Cap Rate calculation based on NOI and Purchase Price
- Cap Rate classification as Low, Typical, or High
- Case-insensitive deal name filtering
- Purchase price filtering using greater-than and less-than operators
- Search-term highlighting in matching deal names
- Responsive layout
- Empty-state handling
- Logout flow
- Modal interactions including Escape key and backdrop close
- Unit tests for the main business logic and UI behavior

## Tech Stack

- Angular 17.3
- TypeScript
- RxJS
- Angular Reactive Forms
- SCSS
- Jasmine / Karma
- Prettier

The application uses Angular standalone components and `OnPush` change detection for the feature components.

## Getting Started

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm start
```

Then open:

```text
http://localhost:4200
```

### Demo Credentials

```text
Email: demo@example.com
Password: demo1234
```

Authentication is intentionally mocked for the scope of this project.

## Available Commands

Run the application:

```bash
npm start
```

Run the test suite once:

```bash
npm test -- --watch=false
```

Create a production build:

```bash
npm run build
```

Format the project:

```bash
npm run format
```

Verify formatting without modifying files:

```bash
npm run format:check
```

## Architecture

The project is organized primarily by feature, with shared and application-level concerns separated where appropriate.

```text
src/app/
├── core/
│   └── auth/
│       ├── auth.guard.ts
│       └── auth.service.ts
├── features/
│   ├── auth/
│   │   └── login/
│   └── deals/
│       ├── components/
│       │   ├── deal-filters/
│       │   ├── deal-form/
│       │   └── deals-table/
│       ├── data/
│       ├── models/
│       ├── pages/
│       └── services/
└── shared/
    └── pipes/
```

`DealsPageComponent` acts as the feature container and coordinates the store and presentational components. The filters, table, and deal form remain focused on their respective responsibilities.

## State Management

Given the limited scope of the application, I chose a lightweight RxJS-based feature store rather than introducing a global state management library such as NgRx.

`DealsStore` keeps the source state private using `BehaviorSubject` instances and exposes read-only observable streams to consumers.

The filtered deal collection is derived reactively using `combineLatest`:

```text
Deals ──────┐
            ├── combineLatest → filteredDeals$
Filters ────┘
```

This keeps state updates predictable while avoiding unnecessary state-management complexity.

New deals are added using immutable collection updates.

## Derived State

Cap Rate is not persisted as part of a deal.

It is calculated from:

```text
Cap Rate = NOI / Purchase Price
```

This avoids maintaining duplicated state that could become inconsistent if either NOI or Purchase Price changes.

The deal form also classifies the calculated value using the typical 5%–12% range while allowing values outside that range.

## Forms and Validation

Deal creation uses a non-nullable Angular Reactive Form with validation for:

- Required deal name
- Required address
- Purchase Price greater than zero
- Non-negative NOI
- Maximum lengths for textual fields

The calculated Cap Rate updates reactively as the financial inputs change.

## Filtering

Filters are modeled independently from the deal collection and are treated as derived state.

The application supports:

- Case-insensitive partial matching by deal name
- Purchase Price greater-than filtering
- Purchase Price less-than filtering
- Combined name and price filtering
- Clearing all active filters

Matching portions of deal names are rendered as structured text segments rather than injecting HTML into the DOM.

## Authentication

Authentication is intentionally simplified for this project.

A successful login stores a session flag in `sessionStorage`, and a functional Angular route guard protects the private deals route.

In a production application, authentication and authorization would be enforced by a backend or identity provider. Client-side route guards should not be considered a security boundary.

## Persistence

The application intentionally does not use a backend or permanent storage.

New deals remain available during the current application session but are reset when the browser is refreshed. This keeps the implementation focused on frontend architecture and Angular behavior.

## Testing

Tests focus primarily on behavior and business logic rather than implementation details.

Coverage includes areas such as:

- Initial and updated deal state
- Immutable deal creation
- Name and purchase price filtering
- Combined filters and edge cases
- Authentication behavior
- Reactive form validation
- Cap Rate calculation and classification
- Search highlighting and special-character handling

## Code Quality

The project uses:

- Strict TypeScript configuration
- Standalone Angular components
- `OnPush` change detection
- Immutable state updates
- Typed Reactive Forms
- Feature-oriented structure
- Prettier for reproducible formatting
- EditorConfig for editor-level consistency

Formatting can be validated independently of any developer's local editor configuration with:

```bash
npm run format:check
```

## Production Considerations

For a production-scale application, some natural next steps would include server-backed authentication, persistent API integration, centralized error handling, loading states for asynchronous requests, and end-to-end testing.

Those concerns were intentionally left outside the scope of this implementation in favor of a small, focused Angular application.
