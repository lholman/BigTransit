# ADR 0007: Use React and a service layer for the example front-end

Date: 2025-06-05

## Status

Accepted

## Context

Big Transit is primarily an API, and we need an example front-end to demonstrate its usage. The front-end should be easy to maintain, implement all API endpoints, and be deployable to different environments (local, acceptance, production).

## Decision

We will use React for the example front-end and implement a service layer to encapsulate API calls.

## Rationale

- **React:** React is a widely adopted, lightweight, and flexible framework. It has a large ecosystem, excellent documentation, and strong community support. It allows for quick prototyping and easy maintenance, making it ideal for an example front-end.
- **Service Layer:** A service layer separates API logic from UI components, improving maintainability, reusability, and testability. It centralizes error handling, logging, and environment configuration, making the codebase cleaner and more scalable.

## Consequences

- **Pros:**
  - Clear separation of concerns between UI and API logic.
  - Reusable API calls across components.
  - Easier testing and mocking of API interactions.
  - Centralized error handling and logging.
  - Simplified maintenance and scalability.
- **Cons:**
  - Slightly more initial setup compared to a simpler approach.
  - May be overkill for very small projects or prototypes.

## Alternatives Considered

- **Vue.js/Svelte:** While also excellent choices, React's widespread adoption and ecosystem make it a safer choice for an example project.
- **Direct API calls in components:** Simpler but less maintainable and scalable for larger applications.
