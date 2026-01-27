1. Корень backend
text
backend/
├── package.json / pyproject.toml / build.gradle   # зависимости, скрипты
├── tsconfig.json / аналог                         # базовая типизация/конфиг
├── docker/                                        # образы, compose, k8s-манифесты
├── infra/                                         # CI/CD, terraform, ansible, k8s
├── config/                                        # глобальные конфиги (env, profiles)
├── contracts/                                     # контракты (HTTP, события, схемы)
├── services/                                      # модульный монолит (bounded contexts)
├── shared/                                        # общие абстракции (kernel)
├── host/                                          # точка входа монолита
└── tools/                                         # codegen, миграции, утилиты
2. contracts/ — единый источник истины
text
backend/
  contracts/
    ├── http/                                      # API-контракты
    │   ├── {BOUNDED_CONTEXT}.openapi.yaml         # OpenAPI/Swagger/gRPC proto
    │   └── {BOUNDED_CONTEXT_2}.openapi.yaml
    │
    ├── events/                                    # доменные/интеграционные события
    │   ├── {EVENT_NAME}.event.json                # схема события
    │   ├── {EVENT_NAME_2}.event.json
    │   └── index.json                             # реестр событий
    │
    ├── schemas/                                   # схемы данных (JSON Schema / Avro / Proto)
    │   ├── {AGGREGATE}.schema.json
    │   ├── {VALUE_OBJECT}.schema.json
    │   └── index.json
    │
    └── codegen/                                   # генерация типов/клиентов
        ├── backend/
        │   ├── generate-types.ts                  # генерит типы для BE
        │   ├── generate-clients.ts                # генерит HTTP/gRPC клиенты
        │   └── templates/
        └── frontend/
            ├── generate-types.ts
            └── templates/
3. shared/ — ядро и кросс-срезы
text
backend/
  shared/
    ├── kernel/                                    # фундаментальные абстракции
    │   ├── Result.ts
    │   ├── Either.ts
    │   ├── Entity.ts
    │   ├── AggregateRoot.ts
    │   ├── DomainEvent.ts
    │   └── ValueObject.ts
    │
    ├── logging/
    │   ├── Logger.ts
    │   ├── adapters/
    │   │   ├── console.logger.ts
    │   │   ├── json.logger.ts
    │   │   └── {LOGGER_ADAPTER}.ts
    │   └── index.ts
    │
    ├── metrics/
    │   ├── Metrics.ts
    │   ├── adapters/
    │   │   ├── prometheus.adapter.ts
    │   │   └── {METRICS_ADAPTER}.ts
    │   └── index.ts
    │
    ├── tracing/
    │   ├── Tracer.ts
    │   ├── adapters/
    │   │   ├── opentelemetry.adapter.ts
    │   │   └── {TRACING_ADAPTER}.ts
    │   └── index.ts
    │
    ├── cache/
    │   ├── Cache.ts
    │   ├── adapters/
    │   │   ├── redis.adapter.ts
    │   │   └── {CACHE_ADAPTER}.ts
    │   └── index.ts
    │
    ├── security/
    │   ├── AuthContext.ts
    │   ├── Permissions.ts
    │   └── index.ts
    │
    ├── utils/
    │   ├── date.ts
    │   ├── uuid.ts
    │   ├── validation.ts
    │   └── {UTIL}.ts
    │
    └── config/
        ├── env.schema.ts                          # схема env
        ├── env.loader.ts                          # загрузка env
        └── index.ts
4. services/ — модульный монолит, 1:1 с будущими микросервисами
text
backend/
  services/
    └── {BOUNDED_CONTEXT}/                         # будущий микросервис
        ├── app/                                   # application layer (use cases)
        │   ├── commands/                          # команды (изменяют состояние)
        │   │   ├── {COMMAND_NAME}.handler.ts
        │   │   ├── {COMMAND_NAME}.dto.ts
        │   │   └── index.ts
        │   │
        │   ├── queries/                           # запросы (чтение, CQRS)
        │   │   ├── {QUERY_NAME}.handler.ts
        │   │   ├── {QUERY_NAME}.dto.ts
        │   │   └── index.ts
        │   │
        │   ├── mappers/                           # DTO ↔ Domain
        │   │   ├── {MAPPER_NAME}.ts
        │   │   └── index.ts
        │   │
        │   ├── validators/                        # валидация входных данных use case
        │   │   ├── {COMMAND_NAME}.validator.ts
        │   │   └── {QUERY_NAME}.validator.ts
        │   │
        │   └── index.ts                           # публичный API app-слоя
        │
        ├── domain/                                # чистый домен
        │   ├── aggregates/
        │   │   ├── {AGGREGATE}.ts
        │   │   └── index.ts
        │   │
        │   ├── entities/
        │   │   ├── {ENTITY}.ts
        │   │   └── index.ts
        │   │
        │   ├── valueObjects/
        │   │   ├── {VALUE_OBJECT}.ts
        │   │   └── index.ts
        │   │
        │   ├── services/                          # доменные сервисы
        │   │   ├── {DOMAIN_SERVICE}.ts
        │   │   └── index.ts
        │   │
        │   ├── events/                            # доменные события (модель)
        │   │   ├── {EVENT_NAME}.ts
        │   │   └── index.ts
        │   │
        │   ├── policies/                          # инварианты, бизнес-правила
        │   │   ├── {POLICY_NAME}.ts
        │   │   └── index.ts
        │   │
        │   └── index.ts                           # публичный API domain
        │
        ├── infra/                                 # инфраструктура контекста
        │   ├── persistence/
        │   │   ├── orm/                           # ORM-модели
        │   │   │   ├── {AGGREGATE}.model.ts
        │   │   │   └── index.ts
        │   │   ├── repositories/                  # реализации интерфейсов domain
        │   │   │   ├── {AGGREGATE}.repository.ts
        │   │   │   └── index.ts
        │   │   └── migrations/
        │   │       ├── {TIMESTAMP}_{MIGRATION_NAME}.ts
        │   │       └── index.ts
        │   │
        │   ├── messaging/
        │   │   ├── consumers/                     # обработчики входящих событий
        │   │   │   ├── {EVENT_NAME}.consumer.ts
        │   │   │   └── index.ts
        │   │   ├── producers/                     # публикация событий
        │   │   │   ├── {EVENT_NAME}.producer.ts
        │   │   │   └── index.ts
        │   │   └── mappers/                       # event payload ↔ domain
        │   │       ├── {EVENT_MAPPER}.ts
        │   │       └── index.ts
        │   │
        │   ├── http/                              # HTTP/gRPC адаптеры
        │   │   ├── controllers/
        │   │   │   ├── {RESOURCE}.controller.ts   # маппинг маршрутов на use cases
        │   │   │   └── index.ts
        │   │   ├── validators/                    # HTTP-валидация (schema-based)
        │   │   │   ├── {ROUTE}.validator.ts
        │   │   │   └── index.ts
        │   │   ├── mappers/                       # HTTP DTO ↔ app DTO
        │   │   │   ├── {HTTP_MAPPER}.ts
        │   │   │   └── index.ts
        │   │   └── routes.ts                      # декларация маршрутов
        │   │
        │   ├── integrations/                      # внешние системы (другие сервисы)
        │   │   ├── {EXTERNAL_SERVICE}.client.ts
        │   │   ├── {EXTERNAL_SERVICE}.mapper.ts
        │   │   └── index.ts
        │   │
        │   └── index.ts                           # публичный API infra-слоя
        │
        ├── api/                                   # API контекста для других контекстов
        │   ├── {USE_CASE}.service.ts              # фасады, не завязанные на transport
        │   └── index.ts
        │
        ├── config/                                # конфиг только этого контекста
        │   ├── schema.ts
        │   ├── env.ts
        │   └── index.ts
        │
        ├── tests/
        │   ├── unit/
        │   │   ├── domain/
        │   │   ├── app/
        │   │   └── infra/
        │   ├── integration/
        │   │   ├── http/
        │   │   ├── messaging/
        │   │   └── persistence/
        │   ├── contract/
        │   │   ├── http.contract.test.ts          # проверка против contracts/http
        │   │   └── events.contract.test.ts        # проверка против contracts/events
        │   └── e2e/
        │       ├── {SCENARIO}.e2e.test.ts
        │       └── index.ts
        │
        └── index.ts                               # точка входа контекста (регистрация в host)
5. host/ — оболочка модульного монолита
text
backend/
  host/
    ├── main.ts                                    # entrypoint процесса
    ├── http-server/
    │   ├── server.ts                              # запуск HTTP
    │   ├── middleware/
    │   ├── error-handling/
    │   └── routing.ts                             # подключение routes из services/*
    │
    ├── messaging/
    │   ├── broker.ts                              # подключение к Kafka/Rabbit/etc
    │   ├── subscriptions.ts                       # регистрация consumers из services/*
    │   └── index.ts
    │
    ├── di/
    │   ├── container.ts                           # DI-контейнер
    │   ├── register-shared.ts                     # shared/*
    │   ├── register-services.ts                   # services/*
    │   └── index.ts
    │
    ├── config/
    │   ├── env.ts
    │   ├── app.config.ts
    │   └── index.ts
    │
    └── bootstrap/
        ├── startup.ts                             # init logging, metrics, tracing
        ├── lifecycle.ts                           # graceful shutdown
        └── index.ts
6. tools/ — автоматизация
text
backend/
  tools/
    ├── migrations/
    │   ├── generate-migration.ts
    │   └── run-migrations.ts
    │
    ├── contracts/
    │   ├── validate-contracts.ts                  # проверка contracts/* против кода
    │   └── sync-contracts.ts                      # синхронизация с внешними репо (если нужно)
    │
    ├── architecture/
    │   ├── validate-imports.ts                    # no-cross-context, no-host-in-services
    │   ├── validate-layers.ts                     # domain/app/infra правила
    │   └── report.ts
    │
    └── README.md
7. Правила импортов (ключ к миграции на микросервисы)
Внутри {BOUNDED_CONTEXT}:

domain → не импортирует app, infra, api

app → импортирует domain, но не infra напрямую (только через интерфейсы)

infra → импортирует domain (интерфейсы), но не app

api → импортирует app, но не infra

Между контекстами:

services/A не импортирует services/B/domain или services/B/infra

только через:

services/B/api

или события из contracts/events

Между host и services:

host/* может импортировать services/*

services/* не могут импортировать host/*
