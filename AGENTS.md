# AGENTS.md - Elbruso Project

## Documentation

→ @docs/ → @docs/
→ PROJECT_TREE.md → @docs/PROJECT_TREE.md

## Core Principles

- **DRY** - Don't Repeat Yourself
- **KISS** - Keep It Simple, Stupid
- **YAGNI** - You Aren't Gonna Need It
- **SOLID** - Object-oriented design principles

## Project Structure

```
/home/ivan/git/elbruso
├── @docs/              → @docs/COMPONENT_SYSTEM_MIGRATION.md
├── @apps/web/          → apps/web/AGENTS.md
├── @apps/api/          → apps/api/AGENTS.md
├── @packages/shared/    → packages/shared/AGENTS.md
├── @packages/context/    → packages/context
└── @packages/database/  → packages/database/src/
```

## Ports

| Service | Port | URL                            |
| ------- | ---- | ------------------------------ |
| Web     | 7200 | http://localhost:7200          |
| Admin   | 7201 | http://localhost:7201          |
| API     | 7100 | http://localhost:7100/api/docs |
| WS      | 7000 | ws://localhost:7000            |

## Zone Responsibilities

| Path Pattern         | See                                 |
| -------------------- | ----------------------------------- |
| `@apps/api/*`        | apps/api/AGENTS.md                  |
| `@apps/admin/*`      | apps/admin/AGENTS.md                |
| `@apps/web/*`        | apps/web/AGENTS.md                  |
| `@packages/shared/*` | packages/shared/AGENTS.md           |
| Components           | @docs/COMPONENT_SYSTEM_MIGRATION.md |

## Quick Commands

```bash
pnpm install   # All deps
pnpm dev      # All servers or npm run dev
pnpm lint     # All linting
```
