# SINGLETON PATTERN AND PUB SUB

## Table of Contents:

- STATEFUL VS STATELESS BACKENDS
- STATE MANAGEMENT IN BACKEND
- SINGLETON PATTERN
- PUB SUB

### STATEFUL VS STATELESS BACKENDS:

Stateless Backends:

- Common in most full-stack applications.
- Backend server doesn’t store user session or application data; instead, it interacts with a database where all data is stored.

Example: After each request, the server forgets everything about the previous request.

Why do we need a backend server if all the data resides in a database?

- To handle authentication and authorization.
- To fetch and return relevant, permission-based data from the database.

Even though databases like Firebase allow direct access with role-based rules, a backend is still useful for custom logic, validations, or additional security.

Stateful Backends:

- Servers maintain data/state between requests.

Useful in cases like:

- In-memory caching (note: not ideal for distributed systems, use Redis for shared cache).
- Game state management (e.g., in an online chess game).

Requires "stickiness" (user's affinity to a specific server) — because the state is tied to a specific server, clients need to consistently connect to the same one.

SINGLETON PATTERN: enforce a single instance of a class

To enforce instantiating the class only once:

- convert the constructor private
- add a static method to return the only class instance
- add a static attribute of the class type

What is a pub sub? : publisher subscriber model: 1 service publishes messages to a channel, all subscribers of the channel receive the message.

- decouple producers and consumers
- services subscribe to events, publisher pushes the events to the services
  Common use cases:
- servers communicating with each other, messages are forwarded from a server to the pub sub service to other servers

Storing in redis queue provides the benefit of batch updates to the database

Why Use a Singleton for Pub/Sub?

- Single Connection to Redis
- Shared subscription list
- Centralized Message Handling (Singleton ensures that one function handles all incoming messages, avoiding bugs like double-processing or missed notifications.)
