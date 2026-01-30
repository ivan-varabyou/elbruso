# Elbruso Context - Setup Guide

## Quick Start

### 1. GitHub Token (required for backups)

1. Go to: https://github.com/settings/tokens
2. Generate new token (classic) with:
   - `repo` - full control of private repositories
   - `read:user` - read user profile data
3. Copy token and add to `.env`:
   ```
   GITHUB_TOKEN=ghp_your_token_here
   ```

### 2. Supermemory API Key (optional, for cloud sync)

1. Go to: https://console.supermemory.ai
2. Create account and get API key
3. Add to `~/.config/opencode/supermemory.jsonc`:
   ```json
   { "apiKey": "sm_your_key_here" }
   ```

### 3. Start Qdrant

```bash
cd /home/ivan/git/elbruso-context
docker compose up -d
```

### 4. Configure OpenCode

The config is already at `~/.config/opencode/opencode.jsonc`

### 5. Test Installation

```bash
# Test Qdrant
curl http://localhost:7999/collections

# Test MCP server
python -m mcp_server_qdrant --help
```

## Project Structure

```
elbruso-context/
├── docker-compose.yml      # Qdrant container
├── mcp-server/server.py    # Custom MCP server (optional)
├── scripts/
│   ├── backup.py          # GitHub backup script
│   └── embed.py           # Embedding utilities
├── .github/workflows/     # Automated backups
└── README.md
```

## Available MCP Tools (official server)

- `qdrant-search` - Search vector database
- `qdrant-upsert` - Add/update vectors
- `qdrant-delete` - Remove vectors
- `qdrant-list-collections` - List all collections

## Using with OpenCode

1. Start OpenCode: `opencode`
2. Agent can now use:
   - `supermemory.add/save/context` - persistent memory
   - `qdrant-*` tools - vector search
   - AGENTS.md rules - agent behavior

## Troubleshooting

### Qdrant not starting
```bash
docker logs elbruso-qdrant
docker compose restart qdrant
```

### MCP tools not available
Check `~/.config/opencode/opencode.jsonc` syntax
Restart OpenCode after config changes

### GitHub backup fails
Verify GITHUB_TOKEN has correct permissions
Run manually: `python scripts/backup.py`
