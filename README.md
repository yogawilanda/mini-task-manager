# Mini Task Manager

> Expected duration: 3–5 hours
> Actual duration: 2 hours 25~ minutes

A small full-stack task manager built for the Qonflo take-home assignment.

The application supports task creation, controlled status transitions, audit history, and deletion. The implementation intentionally focuses on clear business rules rather than additional features.

## Tech Stack

* **Frontend:** React, TypeScript, Vite
* **Backend:** Node.js, Express, TypeScript
* **Persistence:** In-memory

## How to Run

### Backend

```bash
cd backend
npm install
npm run dev
```

Runs on `http://localhost:3000`.

Production build:

```bash
npm run build
npm start
```

### Frontend

In another terminal:

```bash
cd frontend
npm install
npm run dev
```

Production build:

```bash
npm run build
```

## Architecture

```text
React UI
   ↓
API Client
   ↓
HTTP
   ↓
Routes
   ↓
Controller
   ↓
TaskService
   ↓
Domain
```

The domain contains `Task`, `TaskStatus`, `TaskTransition`, and `AuditLog`. `TaskService` owns the business rules, while controllers and routes handle HTTP concerns.

The frontend is intentionally small and separated into API, components, and types.

## Status & Audit Rules

The allowed flow is:

```text
to_do → pending → in_progress → done
```

The backend is the source of truth for transition validation. Invalid transitions are rejected. Updating a task to its current status is idempotent and does not create an audit record.

For every valid transition, the service updates the task and appends an audit record containing the task, actor, previous status, new status, and timestamp. The UI only exposes the next valid action to reduce unnecessary user actions.

## Audit Log Protection

Audit logs have no update or delete operation. They can only be appended through a valid status transition, while the API only exposes read access.

For production, append-only guarantees should additionally be enforced at the database level.

## Assumptions & Trade-offs

In-memory storage was chosen because it is explicitly allowed by the assignment and keeps the implementation focused. The trade-off is that data is lost on restart and cannot be safely shared between multiple backend instances.

Authentication, roles, and permissions were intentionally omitted because they are outside the required scope. The frontend currently uses a predefined actor value (`yoga`).

A repository layer was also intentionally omitted because the current in-memory persistence does not justify the additional abstraction.

## Multi-user Risk & Future Refactor

The biggest multi-user risk is the in-memory state: multiple backend instances would maintain separate task and audit data.

If the system grew, the first refactor would be the persistence boundary:

```text
Controller
   ↓
TaskService
   ↓
Repository / Data Access
   ↓
Database
```

This would allow shared persistence, transactions, querying, and concurrency handling without mixing persistence concerns into the business logic.

## If I Had More Time

I would prioritize:

1. Automated backend tests
2. Runtime request validation
3. Persistent storage
4. Authenticated actor identity
5. Database-level append-only audit guarantees

## Validation

I manually tested task creation, listing, valid transitions, same-status updates, invalid transitions, audit history, deletion, frontend/backend communication, and both production builds.

The invalid transition:

```text
to_do → done
```

was rejected by the backend and did not create an audit record.

The same-status case was also verified to avoid creating duplicate audit records.

## AI Usage

AI was used as a development assistant and technical discussion partner, including architecture decisions, React/TypeScript conventions, status-transition design, audit behavior, CORS debugging, project structure, and documentation.

I also considered introducing MySQL persistence, but decided against it because in-memory storage was sufficient for the assignment and adding a database would increase setup and implementation complexity without materially improving the required demonstration.

AI suggestions were validated through code inspection and by actually running and testing the application. This included testing the complete status flow, invalid and same-status transitions, audit behavior, deletion, frontend/backend communication, and both production builds.
