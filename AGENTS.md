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
├── @apps/web/          → apps/app-web/AGENTS.md
├── @apps/admin/        → apps/app-admin/AGENTS.md
├── @apps/api/          → apps/api-gateway/AGENTS.md
├── @frontend/          → packages/frontend/src (frontend shared)
├── @backend/           → packages/backend/src (backend modules)
├── @database/          → packages/database/src
└── @devtools/          → packages/devtools/src
```

## Aliases

```
@/              → ./src/* (local imports)
@frontend       → packages/frontend/src
@backend        → packages/backend/src
@database       → packages/database/src
@devtools       → packages/devtools/src
@appweb         → apps/app-web/src
@appadmin       → apps/app-admin/src
@apigateway/*   → apps/api-gateway/src/*
```

## Ports

| Service | Port | URL                            |
| ------- | ---- | ------------------------------ |
| Web     | 7200 | http://localhost:7200          |
| Admin   | 7201 | http://localhost:7201          |
| API     | 7100 | http://localhost:7100/api/docs |
| WS      | 7000 | ws://localhost:7000            |

## Zone Responsibilities

| Path Pattern    | See                                 |
| --------------- | ----------------------------------- |
| `@apps/api/*`   | apps/api-gateway/AGENTS.md          |
| `@apps/admin/*` | apps/app-admin/AGENTS.md            |
| `@apps/web/*`   | apps/app-web/AGENTS.md              |
| `@frontend/*`   | packages/frontend/AGENTS.md         |
| `@backend/*`    | packages/backend/src                |
| Components      | @docs/COMPONENT_SYSTEM_MIGRATION.md |

## Quick Commands

```bash
pnpm install   # All deps
pnpm dev      # All servers or npm run dev
pnpm lint     # All linting
```

## Memory System

Memory is stored in Qdrant vector database. Use memory tools to persist context between sessions.

### Connection

| Parameter       | Value                                                 |
| --------------- | ----------------------------------------------------- |
| Qdrant URL      | `http://localhost:7999`                               |
| Proxy URL       | `http://localhost:6333` (for OpenCode built-in tools) |
| Collection      | `elbruso_agent_core`                                  |
| Embedding Model | `BAAI/bge-small-en-v1.5`                              |

### Elbruso MCP Memory Tools

**IMPORTANT**: The Elbruso project has custom memory MCP tools that provide better integration.

**MCP Server**: `/home/ivan/git/elbruso/packages/context/mcp-server/server.py`

**Configuration** (`/home/ivan/git/elbruso/opencode.json`):

```json
{
  "mcp": {
    "memory": {
      "type": "local",
      "command": ["python3", "/home/ivan/git/elbruso/packages/context/mcp-server/server.py"],
      "environment": {
        "PROJECT_NAME": "elbruso",
        "QDRANT_URL": "http://localhost:7999"
      },
      "enabled": true
    }
  }
}
```

**Available Tools**:

- `memory_search_context` - Search memory by query
- `memory_save_context` - Save context/fact to memory
- `memory_save_knowledge` - Save important knowledge
- `memory_save_task_summary` - Save task summary
- `memory_get_core_memory` - Get core memory
- `memory_set_core_memory` - Set core memory
- `memory_list_collections` - List all collections
- `memory_delete_context` - Delete from memory
- `memory_health_check` - Check connection health

**Tool Names**: Use `memory_*` prefix (NOT `elbruso_memory_*`)

### Scripts

```bash
# List all memory points
python3 packages/context/scripts/list_memory.py

# Search memory
python3 packages/context/scripts/search_memory.py "ваш запрос" --limit 5

# Save to memory
python3 packages/context/scripts/save_memory.py --text "текст" --type knowledge

# Get specific point
python3 packages/context/scripts/get_memory.py --id 100
```

### Proxy Management

```bash
# Start proxy (required for OpenCode memory_memory_* tools)
python3 packages/context/proxy/qdrant_proxy.py &

# Check status
python3 packages/context/proxy/run_proxy.sh status

# Or use systemd
sudo cp packages/context/proxy/qdrant-proxy.service /etc/systemd/system/
sudo systemctl enable qdrant-proxy
sudo systemctl start qdrant-proxy
```

### Important Data

- **User name**: Иван (Ivan) - stored in ID 100
- **Collection**: elbruso_agent_core
- **Total points**: 7
