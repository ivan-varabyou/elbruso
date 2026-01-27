# Skill: architecture

Overview of Elbruso architecture. Use this as a starting point, then reference specific skills.

---

## Quick Reference

| What you need         | Skill           | File                      |
| --------------------- | --------------- | ------------------------- |
| Backend architecture  | @foed-backend   | `.spec/FOED-backend.md`   |
| Frontend architecture | @foed-frontend  | `.spec/FOED-frontend.md`  |
| Design system         | @design-system  | `.spec/DESIGN_SYSTEM.md`  |
| Domain model          | @project-schema | `.spec/PROJECT_SCHEMA.md` |
| Database              | @database       | `.spec/DATABASE_SETUP.md` |
| Authentication        | @auth           | `.spec/API_AUTH_GUIDE.md` |
| Development workflow  | @task           | `.spec/TASK.md`           |

---

## Architecture Principles

### 1. Contracts First

Contracts are the source of truth.

```
contracts/
├── http/              # OpenAPI specs
│   └── {context}.openapi.yaml
├── events/            # Event schemas
│   └── {event}.event.json
└── schemas/           # Data schemas
    └── {entity}.schema.json
```

**Rule:** Backend and frontend types are generated from contracts.

### 2. Layered Architecture (Backend)

```
┌─────────────────────────────────────┐
│            host/                     │  Entry point
├─────────────────────────────────────┤
│           services/                  │  Bounded contexts
│  ┌───────────────────────────────┐   │
│  │   {bounded-context}/          │   │
│  │   ├── app/   (use cases)      │   │
│  │   ├── domain/ (business)      │   │
│  │   └── infra/  (persistence)   │   │
│  └───────────────────────────────┘   │
├─────────────────────────────────────┤
│            shared/                   │  Cross-cutting concerns
│  ├── kernel/  (Result, Either, etc) │
│  ├── logging/                       │
│  ├── metrics/                       │
│  └── config/                        │
├─────────────────────────────────────┤
│            contracts/                │  Source of truth
└─────────────────────────────────────┘
```

### 3. FEOD Architecture (Frontend)

```
apps/                    # Applications (composition only)
├── web/
│   ├── pages/           # Routes
│   ├── app/             # Providers, state
│   └── common/          # App-specific
└── admin/

packages/frontend/
├── modules/             # Feature modules (fractal)
│  └── {module}/
│     ├── api/           # API layer
│     ├── services/      # Business logic
│     ├── ui/            # UI components
│     └── _modules/      # Submodules
├── common/              # Shared, agnostic
│  ├── ui/               # Atoms, molecules
│  ├── hooks/
│  └── utils/
├── contracts/           # Schemas
└── generated/           # Codegen output
```

### 4. Import Rules

**Backend:**

```
domain → app → infra
services/A → services/B (only via API or events)
```

**Frontend:**

```
apps → modules → common
modules/A → modules/B (only via public API)
```

### 5. Event-Driven Communication

Between bounded contexts:

```
services/A
  └── produces: OrderCreatedEvent
      ↓ (Kafka/RabbitMQ)
services/B
  └── consumes: OrderCreatedEvent
```

### 6. CQRS

For complex business operations:

```
app/
├── commands/    # Write operations
│   └── CreateOrder.handler.ts
└── queries/     # Read operations
    └── GetOrders.handler.ts
```

---

## Monorepo Structure

```
elbruso/
├── apps/
│   ├── api/           # NestJS backend
│   ├── web/           # Next.js user app
│   └── admin/         # Next.js admin app
├── packages/
│   ├── frontend/      # Shared frontend
│   ├── types/         # Shared types
│   ├── database/      # Database layer
│   └── dev-tools/     # CLI tools
├── tools/
│   └── feod-scaffold/ # Module generator
├── .spec/             # Architecture docs (for OpenCode)
└── docs/
```

---

## Technology Stack

| Layer           | Technology                 |
| --------------- | -------------------------- |
| Backend         | NestJS, TypeScript         |
| Frontend        | Next.js, React, TypeScript |
| Database        | PostgreSQL, Kysely         |
| Cache           | Redis                      |
| ORM             | Prisma / Kysely            |
| API             | OpenAPI 3.0                |
| Styling         | Tailwind CSS               |
| Package Manager | pnpm                       |
| Build Tool      | Turbo                      |

---

## Service Ports

| Port | Service    |
| ---- | ---------- |
| 7100 | Main API   |
| 7200 | Web App    |
| 7201 | Admin App  |
| 7900 | PostgreSQL |
| 7800 | Redis      |

---

## Key Files

### Backend

```
apps/api/src/
├── contracts/          # API contracts
├── services/           # Bounded contexts
├── shared/             # Kernel, utilities
└── host/               # DI, bootstrap
```

### Frontend

```
packages/frontend/
├── modules/            # Features
├── common/             # Shared UI, hooks, utils
├── contracts/          # Schemas
└── generated/          # Codegen
```

---

## Development Workflow

Reference: @task

1. **Analyze** → Understand bounded context
2. **Design** → Create/update contracts
3. **Backend** → Domain → App → Infra
4. **Frontend** → Module → API → UI
5. **Test** → Unit → Integration → E2E

---

## Next Steps

**For backend work:**
→ @foed-backend

**For frontend work:**
→ @foed-frontend

**For UI components:**
→ @design-system

**For domain entities:**
→ @project-schema

**For database work:**
→ @database

**For auth:**
→ @auth

**For any task:**
→ @task
