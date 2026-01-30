# Troubleshooting Guide

## Qdrant Issues

### Container won't start

# Check logs
docker logs elbruso-qdrant

# Common errors:
# - Port 7999 already in use → Stop other Qdrant containers
# - Permission denied → Check volume permissions
# - Out of memory → Reduce Qdrant memory limit

# Fix: Restart with fresh data
docker compose down -v
docker compose up -d
```

### Connection refused

# Verify Qdrant is running
docker ps | grep qdrant

# Check port
curl http://localhost:7999/collections

# If not responding:
docker restart elbruso-qdrant

# Delete and recreate
curl -X DELETE "http://localhost:7999/collections/{collection_name}"

# Recreate with correct size
# Run: python -c "from mcp_server.server import ensure_collection; ensure_collection('name')"

### Tools not available in OpenCode

```bash
# Check config syntax
cat ~/.config/opencode/opencode.jsonc | python3 -m json.tool

# Restart OpenCode after config changes

# Test MCP server manually
python3 -m mcp_server_qdrant
```

### No tools found

```bash
# Verify installation
pip show mcp-server-qdrant

# Reinstall
pip uninstall mcp-server-qdrant -y
pip install mcp-server-qdrant
```

## Supermemory Issues

### API key error

```bash
# Check config
cat ~/.config/opencode/supermemory.jsonc

# Verify API key at https://console.supermemory.ai
# Regenerate if needed

# Restart OpenCode
```

### Memory not saving

```bash
# Enable debug logging in OpenCode
# Look for "supermemory" messages

# Check keyword triggers:
# "remember", "don't forget", "this is important"
```

## Embedding Issues

### Slow embeddings

```bash
# Model loading is slow on first run
# Subsequent calls should be faster

# Check system resources
htop | grep python

# Consider using smaller model
# Edit .env: EMBEDDING_MODEL=sentence-transformers/all-MiniLM-L6-v2
```

### Wrong dimensions

```bash
# BGE-small: 384 dimensions
# BGE-base: 768 dimensions
# all-MiniLM: 384 dimensions

# Verify model in use
python3 -c "from mcp_server.embeddings import get_embedding; print(len(get_embedding('test')))"
```

## GitHub Backup Issues

### Push failed

```bash
# Verify token has correct permissions
curl -H "Authorization: Bearer $GITHUB_TOKEN" https://api.github.com/user

# Token needs: repo (for private repos) or public_repo

# Check git remote
git remote -v
```

### Large file error

```bash
# Install Git LFS
git lfs install

# Track snapshot files
git lfs track "*.snapshot"
git add .gitattributes
git commit -m "Add LFS tracking"
```

### No changes to commit

```bash
# This is normal if no new data since last backup
# Check last backup time

# Force backup
python scripts/backup.py
```

## Performance Issues

### High memory usage

```bash
# Check Qdrant memory
docker stats elbruso-qdrant

# Reduce Qdrant memory in docker-compose.yml:
# environment:
#   - QDRANT__STORAGE__MEMMAP=false
```

### Slow search

```bash
# Check collection size
curl "http://localhost:7999/collections/{collection}" | jq '.result.points_count'

# For large collections (>100k vectors):
# Consider enabling quantization
```

## Log Locations

| Component | Log Location |
|-----------|--------------|
| Qdrant | `docker logs elbruso-qdrant` |
| OpenCode | `~/.local/share/opencode/log/` |
| GitHub Actions | Repository Actions tab |
| MCP Server | stdout (when running manually) |

## Getting Help

1. Check this guide for your issue
2. Look at logs for error messages
3. Search existing issues on GitHub
4. Create new issue with:
   - Error message
   - Steps to reproduce
   - System info (`uname -a`, `docker --version`)
