# Rules
SOLID, DRY, KISS, YAGNI

# Develop STEPS
1. open @apps/api/docs/PROJECT_TREE.md
2. dont use any, forever find or create types and interfaces
3. plane logic as microsorvices based monolith modules
4. find modules @apps/api/src/modules/ and create new logic 

# Architecture
@apps/api/docs/ - documentation
@apps/api/modules/ - modules developed here
@apps/api/modules/core/ - core modules
apps/api/modules/{feature}/ - {feature} modules

# Libs
Typescript, NestJS, PostgreSQL, @apps/api/src/package.json

# URL
http://localhost:7100
http://localhost:7100/api/docs

# Run
cd /home/ivan/git/elbruso/ && npm run dev // it run all apps more @scripts/dev-setup.sh
