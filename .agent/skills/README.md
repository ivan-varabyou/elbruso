# Qwen Code Skills

Custom skills for Qwen Code agent located in this directory.

## Structure

```
.agent/skills/
├── ai-factory/       # Core workflow skills
├── architecture/     # Architecture decisions
├── best-practices/   # Coding standards
├── commit/          # Git conventions
├── deploy/          # Deployment workflows
├── evolve/          # Architecture evolution
├── feature/         # Feature development
├── fix/             # Bug fixing
├── implement/       # Implementation execution
├── improve/         # Refactoring
├── review/          # Code review
├── security-checklist/  # Security scanning
├── skill-generator/     # Generate new skills
└── task/            # Task planning
```

## Skill Format

Each skill directory contains `SKILL.md` with:

```markdown
---
name: <skill-name>
description: <what it does>
argument-hint: <usage hint>
allowed-tools: <tool list>
disable-model-invocation: <true|false>
---

# Skill Instructions

Workflow, examples, and rules.
```

## Adding New Skills

Use `/ai-factory.skill-generator` to generate new skills from:
- Documentation URLs
- API references
- Project requirements
