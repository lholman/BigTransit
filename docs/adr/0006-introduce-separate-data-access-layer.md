# 6. Introduce separate Data Access Layer

Date: 2024-06-15

## Status

Accepted

## Context
To enhance the maintainability and testability of the Big Transit application, we need a clear separation between the business logic and the data access logic. This separation will allow us to decouple the concerns of data persistence from the core application logic, facilitating easier changes and improvements to each part independently.

## Decision
We will introduce a separate Data Access Layer (DAL) for handling all interactions with the database. The DAL will be responsible for all CRUD operations and other direct database interactions, while the service/domain layer will handle business logic and application workflows.

## Consequences
### Pros
Separation of Concerns: By separating the data access logic from the business logic, we achieve a cleaner and more modular codebase. Each layer can evolve independently without affecting the other.

Improved Testability: The DAL can be easily mocked in unit tests, allowing for fast and isolated testing of business logic. This decoupling ensures that tests are not dependent on the database, leading to quicker test execution and more reliable tests.

Code Reusability: Data access methods can be reused across different parts of the application, promoting DRY (Don't Repeat Yourself) principles.

Flexibility: Changes to the database schema or the data access technology (e.g., switching from DynamoDB to another database) can be made with minimal impact on the business logic.

Consistency: Centralising data access logic helps maintain consistent data handling practices and reduces the likelihood of code duplication.

### Cons
Initial Overhead: Introducing a new layer adds some initial complexity and requires additional effort to set up the architecture correctly.

Learning Curve: Developers need to familiarize themselves with the new layer and the patterns for accessing data through the DAL.

Performance Overhead: There might be a slight performance overhead due to the additional abstraction layer, but this is usually negligible compared to the benefits.

By implementing a separate Data Access Layer, we ensure that our application is more modular, maintainable, and testable, which will significantly benefit long-term development and scalability.