# System Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                        OpenCode CLI                             │
├─────────────────────────────────────────────────────────────────┤
│  ┌───────────────────────────────────────────────────────────┐  │
│  │ AGENTS.md (rules, memory instructions)                    │  │
│  └───────────────────────────────────────────────────────────┘  │
│                          ↓                                       │
│  ┌───────────────────────┬─────────────────────────────────┐   │
│  │ supermemory plugin    │ dynamic-context-pruning         │   │
│  │                       │                                 │   │
│  │ • Cross-session       │ • Deduplication                 │   │
│  │   memory             │ • Supersede writes              │   │
│  │ • Semantic search     errors                  │   │
│  │ • Auto │ • Purge-save          │ • Token optimization            │   │
│  └───────────┬───────────┴─────────────────────────────────┘   │
│              ↓                                                   │
│  ┌───────────────────────────────────────────────────────────┐  │
│  │           Official mcp-server-qdrant                       │  │
│  │           (or custom server.py for advanced features)     │  │
│  └─────────────────────────┬─────────────────────────────────┘  │
│                            ↓                                      │
│  ┌───────────────────────────────────────────────────────────┐  │
│  │                     Qdrant (Docker)                       │  │
│  │                                                           │  │
│  │  ┌─────────────────┐  ┌─────────────────┐                │  │
│  │  │ agent_core      │  │ task_summaries  │                │  │
│  │  │ • Persona       │  │ • Task history  │                │  │
│  │  │ • Goals         │  │ • Decisions     │                │  │
│  │  │ • Preferences   │  │ • Outcomes      │                │  │
│  │  └─────────────────┘  └─────────────────┘                │  │
│  │                                                           │  │
│  │  ┌─────────────────┐  ┌─────────────────┐                │  │
│  │  │ knowledge_base  │  │ backups         │                │  │
│  │  │ • Documentation │  │ • Snapshots     │                │  │
│  │  │ • Code patterns │  │ • Recovery      │                │  │
│  │  │ • Solutions     │  │ • Versioning    │                │  │
│  │  └─────────────────┘  └─────────────────┘                │  │
│  └───────────────────────────────────────────────────────────┘  │
│                            ↓                                      │
│  ┌───────────────────────────────────────────────────────────┐  │
│  │              GitHub Actions (Nightly)                     │  │
│  │  • 3:00 UTC daily backup                                  │  │
│  │  • LFS for large files                                    │  │
│  │  • Retention: 7 daily + 4 weekly                          │  │
│  └───────────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────────┘
```

## Data Flow

### Writing Context
1. Agent completes task → `save_task_summary()`
2. Tool calls custom MCP server → embeds text with BGE
3. Vector stored in Qdrant → indexed for search
4. Supermemory also saves → cloud sync (optional)

### Reading Context
1. Agent needs context → `search_context(query)`
2. Query embedded with BGE → semantic search in Qdrant
3. Top-k results returned → injected into prompt
4. Supermemory searched → additional context

### Backup Flow
1. GitHub Actions triggers at 3:00 UTC
2. Qdrant creates snapshots for each collection
3. Snapshots committed to GitHub via LFS
4. Old backups cleaned up (retention policy)

## Collections

| Collection | Purpose | Vector Size | Metadata |
|------------|---------|-------------|----------|
| `agent_core` | Persona, goals, preferences | 384 | memory_type, created_at |
| `task_summaries` | Task history, decisions | 384 | task, decisions, outcomes |
| `knowledge_base` | Documentation, patterns | 384 | title, topic, importance |

## Performance

- **Embedding**: ~100ms per document (BGE, CPU)
- **Search**: ~10ms for 10k vectors (HNSW)
- **Backup**: ~30s for 1000 vectors
- **Memory Usage**: ~500MB for Qdrant + model cache
