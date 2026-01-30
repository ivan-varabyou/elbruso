# Configuration Reference

## Environment Variables

### Required

| Variable | Description | Default |
|----------|-------------|---------|
| `QDRANT_URL` | Qdrant server URL | `http://localhost:7999` |
| `GITHUB_TOKEN` | GitHub PAT for backups | Required |
| `GITHUB_REPO` | Repository for backups | `ivan-varabyou/elbruso-context` |

### Optional

| Variable | Description | Default |
|----------|-------------|---------|
| `QDRANT_API_KEY` | Qdrant API key | Empty |
| `EMBEDDING_MODEL` | HuggingFace model name | `BAAI/bge-small-en-v1.5` |
| `AGENT_CORE_COLLECTION` | Core memory collection | `agent_core` |
| `TASKS_COLLECTION` | Task summaries collection | `task_summaries` |
| `KNOWLEDGE_COLLECTION` | Knowledge base collection | `knowledge_base` |

## OpenCode Configuration

Location: `~/.config/opencode/opencode.jsonc`

```jsonc
{
  "mcpServers": {
    "qdrant": {
      "command": "python",
      "args": ["-m", "mcp_server_qdrant"],
      "env": {
        "QDRANT_URL": "http://localhost:6333",
        "QDRANT_COLLECTION": "agent_memory"
      }
    }
  },
  "plugins": [
    "@tarquinen/opencode-dcp@latest"
  ]
}
```

## Supermemory Configuration

Location: `~/.config/opencode/supermemory.jsonc`

```jsonc
{
  "apiKey": "",  // Get from https://console.supermemory.ai
  "similarityThreshold": 0.6,
  "maxMemories": 10,
  "compactionThreshold": 0.80,
  "autoSave": true,
  "scopes": {
    "user": true,
    "project": true
  }
}
```

## AGENTS.md

Location: `~/.config/opencode/AGENTS.md`

Contains agent behavior rules and memory management instructions.
