# .agent

Qwen Code agent configuration for the elbruso project.

## Structure

```
.agent/
├── CONFIG.md          # Agent configuration overview
├── MCP.md             # MCP servers documentation
└── skills/            # Custom skills
    ├── README.md      # Skills documentation
    ├── ai-factory/    # Core workflow skills
    ├── architecture/
    ├── best-practices/
    ├── commit/
    ├── deploy/
    ├── evolve/
    ├── feature/
    ├── fix/
    ├── implement/
    ├── improve/
    ├── review/
    ├── security-checklist/
    ├── skill-generator/
    └── task/
```

## Quick Start

### Available Commands

| Command | Description |
|---------|-------------|
| `/ai-factory.task <desc>` | Create implementation plan |
| `/ai-factory.implement` | Execute task plan |
| `/ai-factory.feature <desc>` | Start new feature (branch + plan) |
| `/ai-factory.commit` | Commit with conventions |
| `/ai-factory.review` | Code review |
| `/ai-factory.fix` | Fix bugs |
| `/ai-factory.improve` | Refactor code |
| `/ai-factory.deploy` | Deploy workflows |
| `/ai-factory.evolve` | Architecture evolution |
| `/ai-factory.security-checklist` | Security scanning |

### Workflow Example

```bash
# 1. Start a new feature
/ai-factory.feature Add user authentication

# 2. Review and confirm the plan
# (Tasks are created automatically)

# 3. Begin implementation
/ai-factory.implement

# 4. Commit when done
/ai-factory.commit
```

## Configuration Files

- **`opencode.json`** - MCP servers and agent settings
- **`.ai-factory.json`** - Skills and MCP configuration
- **`.agent/CONFIG.md`** - Skills documentation
- **`.agent/MCP.md`** - MCP servers documentation

## MCP Servers

| Server | Status | Purpose |
|--------|--------|---------|
| heroui | ✅ | UI components |
| chrome-devtools | ✅ | Browser debugging |
| memory | ✅ | Vector memory (Qdrant) |
| github | ✅ | GitHub operations |
| filesystem | ✅ | File operations |
| postgres | ❌ | Database (disabled) |

See `.agent/MCP.md` for details.

## Skills

14 skills installed:

- **Workflow:** task, implement, feature, commit
- **Development:** fix, improve, review, deploy, evolve
- **Knowledge:** architecture, best-practices, security-checklist
- **Meta:** skill-generator, ai-factory

See `.agent/skills/README.md` for details.

## Environment Variables

Required for MCP:
- `GITHUB_TOKEN` - GitHub API access
- `DATABASE_URL` - PostgreSQL (when enabled)

## Documentation

- `.agent/CONFIG.md` - Configuration overview
- `.agent/MCP.md` - MCP servers reference
- `.agent/skills/README.md` - Skills reference
- Individual skill docs in `.agent/skills/<name>/SKILL.md`
