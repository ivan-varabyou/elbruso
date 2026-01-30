#!/bin/bash
# Elbruso Context - Installation Script

set -e

echo "======================================"
echo "Elbruso Context Installation"
echo "======================================"

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m'

# Check prerequisites
echo -e "\n${YELLOW}Checking prerequisites...${NC}"

command -v docker >/dev/null 2>&1 || { echo -e "${RED}Docker not found${NC}"; exit 1; }
command -v git >/dev/null 2>&1 || { echo -e "${RED}Git not found${NC}"; exit 1; }
command -v python3 >/dev/null 2>&1 || { echo -e "${RED}Python not found${NC}"; exit 1; }

echo -e "${GREEN}✓ All prerequisites met${NC}"

# Clone or navigate to repository
if [ -d ".git" ]; then
    echo -e "\n${YELLOW}Repository already exists${NC}"
else
    echo -e "\n${YELLOW}Cloning repository...${NC}"
    git clone https://github.com/ivan-varabyou/elbruso-context.git
    cd elbruso-context
fi

# Install Python dependencies
echo -e "\n${YELLOW}Installing Python dependencies...${NC}"
pip install -q -r requirements.txt
pip install -q mcp-server-qdrant
echo -e "${GREEN}✓ Dependencies installed${NC}"

# Start Qdrant
echo -e "\n${YELLOW}Starting Qdrant...${NC}"
docker compose up -d --remove-orphans
sleep 3

# Verify Qdrant
if curl -s http://localhost:7999/collections | grep -q "collections"; then
    echo -e "${GREEN}✓ Qdrant is running${NC}"
else
    echo -e "${RED}Qdrant failed to start${NC}"
    exit 1
fi

# Configure GitHub token
echo -e "\n${YELLOW}GitHub configuration...${NC}"
if [ -z "$GITHUB_TOKEN" ]; then
    echo -e "${YELLOW}GITHUB_TOKEN not set. Edit .env file.${NC}"
else
    echo -e "${GREEN}✓ GITHUB_TOKEN configured${NC}"
fi

# Create OpenCode config
echo -e "\n${YELLOW}Configuring OpenCode...${NC}"
mkdir -p ~/.config/opencode

cat > ~/.config/opencode/opencode.jsonc << 'OPENCODE'
{
  "$schema": "https://opencode.ai/schema.json",
  "mcpServers": {
    "qdrant": {
      "command": "python",
      "args": ["-m", "mcp_server_qdrant"],
      "env": {
        "QDRANT_URL": "http://localhost:7999"
      }
    }
  },
  "plugins": [
    "supermemory",
    "@tarquinen/opencode-dcp@latest"
  ]
}
OPENCODE

echo -e "${GREEN}✓ OpenCode configured${NC}"

# Create AGENTS.md
cat > ~/.config/opencode/AGENTS.md << 'AGENTS'
# Agent Context Rules

## Core Memory
You are a helpful AI coding assistant with persistent memory.

## Memory Management
- Use `supermemory.add` to save important context with type (persona/task/knowledge)
- Use `supermemory.search` to retrieve relevant memories before starting tasks
- Use `supermemory.list` to see recent memories

## Qdrant Context
- Use `qdrant-search` to search vector database for code patterns
- Collections: agent_core, task_summaries, knowledge_base

## Workflow
1. Before complex tasks: search memory for relevant context
2. After completing tasks: save summary with decisions made
3. When finding solutions: save to knowledge base
AGENTS

echo -e "${GREEN}✓ AGENTS.md created${NC}"

# Final message
echo -e "\n${GREEN}======================================"
echo "Installation Complete!"
echo "======================================${NC}"

echo -e "\nNext steps:"
echo "1. Add GITHUB_TOKEN to .env file"
echo "2. Get supermemory API key from https://console.supermemory.ai"
echo "3. Add to ~/.config/opencode/supermemory.jsonc"
echo "4. Run: docker compose logs -f"
echo "5. Start OpenCode and test memory tools"
