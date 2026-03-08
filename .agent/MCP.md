# MCP Servers Configuration

Model Context Protocol servers for Qwen Code.

## Active Servers

### heroui
- **Command:** `npx -y @heroui/react-mcp@latest`
- **Purpose:** Generate HeroUI/React components
- **Status:** ✅ Enabled

### chrome-devtools
- **Command:** `npx chrome-devtools-mcp@latest`
- **Purpose:** Browser debugging and inspection
- **Status:** ✅ Enabled

### memory
- **Command:** `python3 /home/ivan/git/elbruso/packages/context/mcp-server/server.py`
- **Environment:**
  - `PROJECT_NAME=elbruso`
  - `QDRANT_URL=http://localhost:7999`
- **Purpose:** Vector memory for project context
- **Status:** ✅ Enabled

### github
- **Command:** `npx -y @modelcontextprotocol/server-github`
- **Environment:** `GITHUB_TOKEN=${GITHUB_TOKEN}`
- **Purpose:** GitHub operations (PRs, issues, files)
- **Status:** ✅ Enabled

### filesystem
- **Command:** `npx -y @modelcontextprotocol/server-filesystem /home/ivan/git/elbruso`
- **Purpose:** Advanced file operations
- **Status:** ✅ Enabled

## Disabled Servers

### postgres
- **Command:** `npx -y @modelcontextprotocol/server-postgres`
- **Environment:** `DATABASE_URL=${DATABASE_URL}`
- **Purpose:** PostgreSQL database operations
- **Status:** ❌ Disabled (enable when needed)

## Configuration File

MCP servers are configured in `opencode.json` at project root.

## Environment Variables

Required env vars (set in `.env` or shell):
- `GITHUB_TOKEN` - GitHub API access
- `DATABASE_URL` - PostgreSQL connection (when enabled)

## Usage in Skills

Skills can use MCP tools via allowed-tools:
```yaml
allowed-tools: Read Write Bash TaskCreate AskUserQuestion
```

MCP servers provide additional tools automatically.
