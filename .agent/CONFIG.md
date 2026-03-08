# .agent Configuration

Agent configuration for Qwen Code with MCP and skills support.

## Skills Directory

Skills are located in: `.agent/skills/`

Each skill is a markdown file with:
- YAML frontmatter (name, description, allowed-tools, etc.)
- Workflow instructions
- Examples and rules

## MCP Servers

Configured in `opencode.json`:

| Server | Status | Purpose |
|--------|--------|---------|
| `heroui` | ✅ | UI component generation |
| `chrome-devtools` | ✅ | Browser debugging |
| `memory` | ✅ | Vector memory (Qdrant) |
| `github` | ✅ | GitHub operations |
| `filesystem` | ✅ | File operations |
| `postgres` | ❌ | Database (disabled) |

## Available Skills

| Skill | Purpose |
|-------|---------|
| `ai-factory.task` | Create implementation plans |
| `ai-factory.implement` | Execute task plans |
| `ai-factory.feature` | Start new features (branch + plan) |
| `ai-factory.commit` | Commit changes with conventions |
| `ai-factory.review` | Code review |
| `ai-factory.fix` | Bug fixing |
| `ai-factory.improve` | Refactoring |
| `ai-factory.deploy` | Deployment |
| `ai-factory.evolve` | Architecture evolution |
| `ai-factory.security-checklist` | Security scanning |
| `ai-factory.architecture` | Architecture decisions |
| `ai-factory.best-practices` | Best practices reference |
| `ai-factory.skill-generator` | Generate new skills |

## Usage

```
/ai-factory.task <description>     # Create plan
/ai-factory.implement              # Execute plan
/ai-factory.feature <description>  # New feature
/ai-factory.commit                 # Commit changes
```
