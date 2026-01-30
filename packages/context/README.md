# Elbruso Context

Persistent memory system for AI agents with Qdrant vector database and OpenCode integration.

## Features

- **Qdrant Vector Database** - Semantic search for code and context
- **OpenCode Plugins** - Supermemory + Dynamic Context Pruning
- **Local Embeddings** - BGE model (no external API dependencies)
- **GitHub Backup** - Automated nightly backups with version control
- **Multi-Collection** - Core memory, task summaries, knowledge base

## Quick Install

```bash
./INSTALL.sh
```

Or manual:

```bash
# Clone and enter
git clone https://github.com/ivan-varabyou/elbruso-context.git
cd elbruso-context

# Install dependencies
pip install -r requirements.txt
pip install mcp-server-qdrant

# Start Qdrant
docker compose up -d

# Configure OpenCode
cp .env.example .env
# Edit .env with your GITHUB_TOKEN
```

## Documentation

- [SETUP.md](SETUP.md) - Installation guide
- [CONFIG.md](CONFIG.md) - Configuration reference
- [TOOLS.md](TOOLS.md) - Available tools
- [ARCHITECTURE.md](ARCHITECTURE.md) - System design
- [USAGE_RU.md](USAGE_RU.md) - Руководство пользователя (RU)

## Project Structure

```
├── docker-compose.yml      # Qdrant container
├── mcp-server/
│   └── server.py          # Custom MCP server
├── scripts/
│   ├── backup.py          # GitHub backup
│   └── embed.py           # Embedding utilities
├── .github/workflows/     # Automated backups
├── INSTALL.sh             # Installation script
└── *.md                   # Documentation
```

## Usage

### With OpenCode

1. Start Qdrant: `docker compose up -d`
2. Run OpenCode: `opencode`
3. Agent can use:
   - `supermemory.add/save/search` - persistent memory
   - `qdrant-search/upsert` - vector operations
   - `save_task_summary` - task documentation

# Test Qdrant
curl http://localhost:7999/collections

# Test embeddings
python scripts/embed.py "test query"

# Run backup
python scripts/backup.py
```

## Collections

| Name | Purpose |
|------|---------|
| `agent_core` | Persona, goals, preferences |
| `task_summaries` | Task history, decisions |
| `knowledge_base` | Documentation, patterns |

## Backup

Automatic daily backups at 3:00 UTC via GitHub Actions.

## Requirements

- Docker + Docker Compose
- Python 3.10+
- 2GB RAM (Qdrant + model cache)
- GitHub account (for backups)

## License

MIT
