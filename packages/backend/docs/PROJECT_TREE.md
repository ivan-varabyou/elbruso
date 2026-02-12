# Структура проекта backend

Генерировано: Чт 12 фев 2026 23:42:18 +03

/home/ivan/git/elbruso/packages/backend
├── docs
│   └── PROJECT_TREE.md
├── src
│   ├── config
│   ├── lib
│   ├── modules
│   │   ├── admin
│   │   │   ├── admin-auth
│   │   │   │   ├── controllers
│   │   │   │   │   └── admin-auth.controller.ts
│   │   │   │   ├── dto
│   │   │   │   │   └── login.dto.ts
│   │   │   │   ├── services
│   │   │   │   │   └── admin-auth.service.ts
│   │   │   │   └── strategies
│   │   │   │       └── admin-jwt.strategy.ts
│   │   │   ├── admin-users
│   │   │   │   └── dto
│   │   │   ├── controllers
│   │   │   │   ├── admin-auth.controller.ts
│   │   │   │   ├── admin-me.controller.ts
│   │   │   │   ├── admin-setup.controller.ts
│   │   │   │   ├── admin-workspace.controller.ts
│   │   │   │   ├── admin-workspace-template.controller.ts
│   │   │   │   └── index.ts
│   │   │   ├── decorators
│   │   │   │   ├── index.ts
│   │   │   │   └── roles.decorator.ts
│   │   │   ├── dto
│   │   │   │   ├── responses
│   │   │   │   │   ├── admin-auth.response.dto.ts
│   │   │   │   │   ├── admin-me.response.dto.ts
│   │   │   │   │   ├── admin-setup.response.dto.ts
│   │   │   │   │   ├── admin-user.response.dto.ts
│   │   │   │   │   ├── admin-users-list.response.dto.ts
│   │   │   │   │   ├── index.ts
│   │   │   │   │   ├── role.response.dto.ts
│   │   │   │   │   ├── roles-list.response.dto.ts
│   │   │   │   │   ├── workspace.response.dto.ts
│   │   │   │   │   ├── workspaces-list.response.dto.ts
│   │   │   │   │   ├── workspace-template.response.dto.ts
│   │   │   │   │   └── workspace-templates-list.response.dto.ts
│   │   │   │   ├── admin-login.dto.ts
│   │   │   │   ├── admin-reset.dto.ts
│   │   │   │   ├── admin-setup.dto.ts
│   │   │   │   └── index.ts
│   │   │   ├── enums
│   │   │   │   └── admin-role.enum.ts
│   │   │   ├── guards
│   │   │   │   ├── admin-jwt-auth.guard.ts
│   │   │   │   ├── index.ts
│   │   │   │   ├── permissions.guard.ts
│   │   │   │   └── roles.guard.ts
│   │   │   ├── roles
│   │   │   │   ├── dto
│   │   │   │   │   ├── create-role.dto.ts
│   │   │   │   │   ├── index.ts
│   │   │   │   │   └── update-role.dto.ts
│   │   │   │   ├── admin-roles.controller.ts
│   │   │   │   ├── admin-roles.module.ts
│   │   │   │   └── admin-roles.service.ts
│   │   │   ├── services
│   │   │   │   ├── admin-auth.service.ts
│   │   │   │   ├── admin-setup.service.ts
│   │   │   │   └── index.ts
│   │   │   ├── strategies
│   │   │   │   ├── admin-jwt.strategy.ts
│   │   │   │   └── index.ts
│   │   │   ├── users
│   │   │   │   ├── dto
│   │   │   │   │   ├── create-admin-user.dto.ts
│   │   │   │   │   ├── index.ts
│   │   │   │   │   ├── update-admin-me.dto.ts
│   │   │   │   │   └── update-admin-user.dto.ts
│   │   │   │   ├── admin-users.controller.ts
│   │   │   │   ├── admin-users.module.ts
│   │   │   │   └── admin-users.service.ts
│   │   │   ├── admin-auth.module.ts
│   │   │   ├── admin.module.ts
│   │   │   └── index.ts
│   │   ├── audit
│   │   │   ├── events
│   │   │   │   └── audit.events.ts
│   │   │   ├── services
│   │   │   │   └── audit.service.ts
│   │   │   ├── audit.module.ts
│   │   │   └── index.ts
│   │   ├── auth
│   │   │   ├── controllers
│   │   │   │   └── auth.controller.ts
│   │   │   ├── dto
│   │   │   │   ├── responses
│   │   │   │   │   ├── auth.response.dto.ts
│   │   │   │   │   ├── index.ts
│   │   │   │   │   └── user.response.dto.ts
│   │   │   │   ├── auth.dto.ts
│   │   │   │   ├── index.ts
│   │   │   │   └── password-recovery.dto.ts
│   │   │   ├── events
│   │   │   │   ├── auth.events.ts
│   │   │   │   └── index.ts
│   │   │   ├── guards
│   │   │   │   ├── admin-jwt-auth.guard.ts
│   │   │   │   ├── any-jwt-auth.guard.ts
│   │   │   │   ├── api-key-auth.guard.ts
│   │   │   │   ├── index.ts
│   │   │   │   └── jwt-auth.guard.ts
│   │   │   ├── interfaces
│   │   │   │   ├── auth.interface.ts
│   │   │   │   └── index.ts
│   │   │   ├── services
│   │   │   │   └── auth.service.ts
│   │   │   ├── strategies
│   │   │   │   ├── api-key.strategy.ts
│   │   │   │   ├── jwt.strategy.ts
│   │   │   │   └── local.strategy.ts
│   │   │   ├── auth.module.ts
│   │   │   └── index.ts
│   │   ├── blocks
│   │   │   ├── controllers
│   │   │   │   └── blocks.controller.ts
│   │   │   ├── dto
│   │   │   │   ├── responses
│   │   │   │   │   ├── block.response.dto.ts
│   │   │   │   │   ├── blocks-list.response.dto.ts
│   │   │   │   │   └── index.ts
│   │   │   │   └── index.ts
│   │   │   ├── events
│   │   │   │   └── blocks.events.ts
│   │   │   ├── services
│   │   │   │   └── blocks.service.ts
│   │   │   ├── blocks.module.ts
│   │   │   └── index.ts
│   │   ├── content
│   │   │   ├── blocks
│   │   │   │   └── dto
│   │   │   ├── charts
│   │   │   └── pages
│   │   │       └── dto
│   │   ├── countries
│   │   │   ├── controllers
│   │   │   │   └── countries.controller.ts
│   │   │   ├── dto
│   │   │   │   ├── responses
│   │   │   │   │   ├── country.response.dto.ts
│   │   │   │   │   └── index.ts
│   │   │   │   └── index.ts
│   │   │   ├── events
│   │   │   │   └── countries.events.ts
│   │   │   ├── services
│   │   │   │   └── countries.service.ts
│   │   │   ├── countries.module.ts
│   │   │   └── index.ts
│   │   ├── database
│   │   ├── email
│   │   │   ├── controllers
│   │   │   ├── dto
│   │   │   │   └── index.ts
│   │   │   ├── events
│   │   │   │   └── email.events.ts
│   │   │   ├── interfaces
│   │   │   │   └── email-provider.interface.ts
│   │   │   ├── providers
│   │   │   │   ├── console-email.provider.ts
│   │   │   │   └── smtp-email.provider.ts
│   │   │   ├── services
│   │   │   │   └── email.service.ts
│   │   │   ├── email.module.ts
│   │   │   └── index.ts
│   │   ├── events
│   │   │   ├── controllers
│   │   │   │   └── events.controller.ts
│   │   │   ├── dto
│   │   │   │   ├── responses
│   │   │   │   │   ├── event.response.dto.ts
│   │   │   │   │   ├── events-list.response.dto.ts
│   │   │   │   │   └── index.ts
│   │   │   │   ├── event-filters.dto.ts
│   │   │   │   └── index.ts
│   │   │   ├── events
│   │   │   ├── services
│   │   │   │   └── events.service.ts
│   │   │   ├── events.module.ts
│   │   │   └── index.ts
│   │   ├── indicators
│   │   │   ├── controllers
│   │   │   │   ├── indicator-groups.controller.ts
│   │   │   │   └── indicators.controller.ts
│   │   │   ├── dto
│   │   │   │   ├── responses
│   │   │   │   │   ├── groups-list.response.dto.ts
│   │   │   │   │   ├── index.ts
│   │   │   │   │   ├── indicator-group.response.dto.ts
│   │   │   │   │   ├── indicator.response.dto.ts
│   │   │   │   │   └── indicators-list.response.dto.ts
│   │   │   │   ├── generate-indicators.dto.ts
│   │   │   │   ├── indicator-filters.dto.ts
│   │   │   │   ├── indicator-group.dto.ts
│   │   │   │   └── indicator-group-filters.dto.ts
│   │   │   ├── entities
│   │   │   ├── interfaces
│   │   │   ├── mappers
│   │   │   │   ├── indicator-group.mapper.ts
│   │   │   │   └── indicator.mapper.ts
│   │   │   ├── services
│   │   │   │   ├── indicator-groups.service.ts
│   │   │   │   └── indicators.service.ts
│   │   │   ├── index.ts
│   │   │   └── indicators.module.ts
│   │   ├── organizations
│   │   │   ├── controllers
│   │   │   │   ├── admin-organizations.controller.ts
│   │   │   │   └── organizations.controller.ts
│   │   │   ├── dto
│   │   │   │   ├── responses
│   │   │   │   │   ├── index.ts
│   │   │   │   │   ├── organization-level.response.dto.ts
│   │   │   │   │   ├── organization.response.dto.ts
│   │   │   │   │   ├── organizations-list.response.dto.ts
│   │   │   │   │   └── organization-type.response.dto.ts
│   │   │   │   ├── create-organization.dto.ts
│   │   │   │   ├── index.ts
│   │   │   │   ├── move-organization.dto.ts
│   │   │   │   ├── organization-filters.dto.ts
│   │   │   │   └── update-organization.dto.ts
│   │   │   ├── events
│   │   │   │   └── organizations.events.ts
│   │   │   ├── mappers
│   │   │   │   └── organization.mapper.ts
│   │   │   ├── services
│   │   │   │   └── organizations.service.ts
│   │   │   ├── index.ts
│   │   │   └── organizations.module.ts
│   │   ├── packages
│   │   │   └── backend
│   │   │       └── src
│   │   │           └── modules
│   │   │               └── workspace-template
│   │   │                   ├── controllers
│   │   │                   ├── dto
│   │   │                   └── services
│   │   ├── pages
│   │   │   ├── controllers
│   │   │   │   └── pages.controller.ts
│   │   │   ├── dto
│   │   │   │   ├── responses
│   │   │   │   │   ├── index.ts
│   │   │   │   │   ├── page.response.dto.ts
│   │   │   │   │   ├── pages-list.response.dto.ts
│   │   │   │   │   ├── page-tree-item.response.dto.ts
│   │   │   │   │   └── page-tree.response.dto.ts
│   │   │   │   └── index.ts
│   │   │   ├── events
│   │   │   │   └── pages.events.ts
│   │   │   ├── services
│   │   │   │   └── pages.service.ts
│   │   │   ├── index.ts
│   │   │   └── pages.module.ts
│   │   ├── reference
│   │   │   ├── countries
│   │   │   ├── organizations
│   │   │   ├── regions
│   │   │   ├── seasons
│   │   │   └── sports
│   │   ├── regions
│   │   │   ├── controllers
│   │   │   │   └── regions.controller.ts
│   │   │   ├── dto
│   │   │   │   ├── responses
│   │   │   │   │   ├── index.ts
│   │   │   │   │   ├── region.response.dto.ts
│   │   │   │   │   └── regions-list.response.dto.ts
│   │   │   │   ├── index.ts
│   │   │   │   └── region-filters.dto.ts
│   │   │   ├── events
│   │   │   │   └── regions.events.ts
│   │   │   ├── services
│   │   │   │   └── regions.service.ts
│   │   │   ├── index.ts
│   │   │   └── regions.module.ts
│   │   ├── seasons
│   │   │   ├── controllers
│   │   │   │   └── seasons.controller.ts
│   │   │   ├── dto
│   │   │   │   ├── responses
│   │   │   │   │   ├── index.ts
│   │   │   │   │   ├── season.response.dto.ts
│   │   │   │   │   └── seasons-list.response.dto.ts
│   │   │   │   ├── generate-seasons.dto.ts
│   │   │   │   └── index.ts
│   │   │   ├── events
│   │   │   │   └── seasons.events.ts
│   │   │   ├── services
│   │   │   │   └── seasons.service.ts
│   │   │   ├── index.ts
│   │   │   └── seasons.module.ts
│   │   ├── sports
│   │   │   ├── controllers
│   │   │   │   └── sports.controller.ts
│   │   │   ├── dto
│   │   │   │   ├── responses
│   │   │   │   │   ├── index.ts
│   │   │   │   │   ├── sport.response.dto.ts
│   │   │   │   │   └── sports-list.response.dto.ts
│   │   │   │   ├── index.ts
│   │   │   │   └── sport-filters.dto.ts
│   │   │   ├── events
│   │   │   │   └── sports.events.ts
│   │   │   ├── services
│   │   │   │   └── sports.service.ts
│   │   │   ├── index.ts
│   │   │   └── sports.module.ts
│   │   ├── tables
│   │   │   ├── controllers
│   │   │   │   ├── formula.controller.ts
│   │   │   │   └── tables.controller.ts
│   │   │   ├── dto
│   │   │   │   ├── responses
│   │   │   │   │   ├── cells.response.dto.ts
│   │   │   │   │   ├── index.ts
│   │   │   │   │   ├── table.response.dto.ts
│   │   │   │   │   └── tables-list.response.dto.ts
│   │   │   │   ├── formula-analysis.dto.ts
│   │   │   │   └── tables.dto.ts
│   │   │   ├── entities
│   │   │   │   ├── formula.entity.ts
│   │   │   │   └── table.entity.ts
│   │   │   ├── events
│   │   │   │   └── tables.events.ts
│   │   │   ├── formula
│   │   │   │   └── dto
│   │   │   │       └── responses
│   │   │   │           ├── formula-analysis.response.dto.ts
│   │   │   │           └── index.ts
│   │   │   ├── interfaces
│   │   │   │   └── tables.interface.ts
│   │   │   ├── services
│   │   │   │   ├── formula.service.ts
│   │   │   │   └── tables.service.ts
│   │   │   ├── index.ts
│   │   │   └── tables.module.ts
│   │   ├── users
│   │   │   ├── controllers
│   │   │   │   └── users.controller.ts
│   │   │   ├── dto
│   │   │   │   ├── responses
│   │   │   │   │   ├── index.ts
│   │   │   │   │   ├── user.response.dto.ts
│   │   │   │   │   └── users-list.response.dto.ts
│   │   │   │   ├── create-user.dto.ts
│   │   │   │   ├── index.ts
│   │   │   │   ├── update-user.dto.ts
│   │   │   │   └── user-settings.dto.ts
│   │   │   ├── enums
│   │   │   │   ├── index.ts
│   │   │   │   └── user-role.enum.ts
│   │   │   ├── events
│   │   │   ├── services
│   │   │   │   └── users.service.ts
│   │   │   ├── index.ts
│   │   │   └── users.module.ts
│   │   └── workspace
│   │       ├── controllers
│   │       │   ├── workspace.controller.ts
│   │       │   ├── workspace-group.controller.ts
│   │       │   └── workspace-template.controller.ts
│   │       ├── dto
│   │       │   ├── responses
│   │       │   │   ├── groups-list.response.dto.ts
│   │       │   │   ├── index.ts
│   │       │   │   ├── workspace-group.response.dto.ts
│   │       │   │   ├── workspace.response.dto.ts
│   │       │   │   └── workspaces-list.response.dto.ts
│   │       │   ├── index.ts
│   │       │   ├── workspace.dto.ts
│   │       │   ├── workspace-group.dto.ts
│   │       │   └── workspace-template.dto.ts
│   │       ├── events
│   │       │   └── workspace.events.ts
│   │       ├── services
│   │       │   ├── workspace-group.service.ts
│   │       │   └── workspace.service.ts
│   │       ├── workspace-template
│   │       │   └── dto
│   │       │       └── responses
│   │       │           ├── index.ts
│   │       │           ├── template.response.dto.ts
│   │       │           └── templates-list.response.dto.ts
│   │       ├── index.ts
│   │       └── workspace.module.ts
│   └── shared
│       ├── decorators
│       │   └── roles.decorator.ts
│       ├── dto
│       ├── interfaces
│       └── utils
├── package.json
└── tsconfig.json

154 directories, 244 files
