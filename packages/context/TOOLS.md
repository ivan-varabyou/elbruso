# Available Tools Reference

## MCP Server Qdrant (Official)

### qdrant-search
Search the Qdrant vector database for similar documents.

**Parameters:**
- `query` (string): Search query
- `collection` (string, optional): Collection name
- `limit` (number, optional): Max results (default: 5)
- `score_threshold` (number, optional): Minimum similarity (default: 0.5)

### qdrant-upsert
Add or update documents in Qdrant.

**Parameters:**
- `documents` (array): Documents to upsert
- `collection` (string, optional): Collection name
- `metadata` (object, optional): Additional metadata

### qdrant-delete
Delete documents from Qdrant.

**Parameters:**
- `ids` (array): Document IDs to delete
- `collection` (string, optional): Collection name

### qdrant-list-collections
List all collections in Qdrant.

### qdrant-get-collection
Get collection details.

**Parameters:**
- `collection` (string): Collection name

### qdrant-create-collection
Create a new collection.

**Parameters:**
- `collection` (string): Collection name
- `vector_size` (number): Vector dimensions
- `distance` (string): Distance metric (cosine, euclidean, dot)

## Supermemory (OpenCode Plugin)

### supermemory.add / supermemory.save
Store a memory.

**Parameters:**
- `content` (string): Memory content
- `type` (string): Type (persona, task, knowledge)
- `scope` (string, optional): user or project

### supermemory.search
Search memories.

**Parameters:**
- `query` (string): Search query
- `limit` (number, optional): Max results

### supermemory.list
List recent memories.

**Parameters:**
- `scope` (string, optional): user or project

### supermemory.forget
Delete memories.

**Parameters:**
- `ids` (array): Memory IDs

## Dynamic Context Pruning (OpenCode Plugin)

### dcp.context
Show token usage breakdown.

### dcp.stats
Show cumulative pruning statistics.

### dcp.sweep
Prune all tools since last user message.

### discard
Remove completed/noisy tool content.

### extract
Distill valuable context into summaries.

## Custom Tools (elbruso-context)

### save_task_summary
Save task completion summary.

**Parameters:**
- `task` (string): Task description
- `summary` (string): Summary of work done
- `outcomes` (array): List of outcomes
- `decisions` (array): List of decisions made

### save_knowledge
Save knowledge document.

**Parameters:**
- `title` (string): Document title
- `content` (string): Document content
- `topic` (string): Topic/category
- `importance` (string, optional): low/medium/high

### save_context
Save arbitrary context.

**Parameters:**
- `content` (string): Content to save
- `context_type` (string): Type (core, task, knowledge)
- `metadata` (object, optional): Additional data

### search_context
Search saved context.

**Parameters:**
- `query` (string): Search query
- `collection` (string, optional): core/tasks/knowledge
- `limit` (number, optional): Max results

### get_core_memory
Retrieve agent core memory.

### set_core_memory
Set agent core memory.

**Parameters:**
- `content` (string): Memory content
- `memory_type` (string): persona/goals/preferences

### health_check
Check system health.
