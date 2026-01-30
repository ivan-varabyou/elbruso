# Usage Guide

## Basic Operations

### Save Context

```python
# Save task summary
await save_task_summary(
    task="Implement user authentication",
    summary="Added JWT-based auth with refresh tokens",
    outcomes=["Login works", "Session management implemented"],
    decisions=["Used JWT instead of sessions", "Refresh token rotation"]
)

# Save knowledge
await save_knowledge(
    title="Authentication Flow",
    content="User logs in → JWT issued → stored in cookie → validated on each request",
    topic="authentication",
    importance="high"
)

# Save core memory
await set_core_memory(
    content="I prefer clean code and modular architecture. Avoid tight coupling.",
    memory_type="persona"
)
```

### Search Context

```python
# Search core memory
results = await search_context(
    query="coding style preferences",
    collection="core",
    limit=5
)

# Search knowledge base
results = await search_context(
    query="authentication patterns",
    collection="knowledge",
    limit=10
)
```

## OpenCode Integration

### Keywords

Supermemory automatically captures memories with keywords:

- "remember that..." → saves to memory
- "don't forget..." → saves to memory
- "this is important..." → saves with high importance

### Example Conversation

```
User: Remember that I prefer TypeScript over JavaScript
Agent: (supermemory.add triggered automatically)
      Saved: "User prefers TypeScript over JavaScript"

User: What languages do I prefer?
Agent: Searching memory... Found: "User prefers TypeScript over JavaScript"
```

## Best Practices

### Before Starting a Task

```python
# Search for relevant context
context = await search_context(query=f"similar to: {current_task}", limit=5)
# Use context in your approach
```

### After Completing a Task

```python
# Document decisions
await save_task_summary(
    task=current_task,
    summary=what_was_done,
    outcomes=[...],
    decisions=[...important_choices...]
)
```

### When Learning Something New

```python
# Save as knowledge
await save_knowledge(
    title="New Concept",
    content=explanation,
    topic="category",
    importance="medium"
)
```

## Tips

1. **Be specific** - "Python async patterns" instead of "Python stuff"
2. **Add metadata** - Tag with topics for easier filtering
3. **Review periodically** - Use `list_collections()` to see what's stored
4. **Use thresholds** - Set similarity threshold to 0.6 for better results
5. **Clean up** - Delete irrelevant memories periodically

## Troubleshooting

### No results from search
- Try different keywords
- Lower similarity threshold
- Check collection name

### Memory not saved
- Verify supermemory plugin is loaded
- Check API key validity
- Look at OpenCode logs

### Qdrant connection failed
- Check: `docker ps | grep qdrant`
- Restart: `docker compose restart qdrant`
- Logs: `docker logs elbruso-qdrant`
