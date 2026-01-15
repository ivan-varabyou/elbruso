# Elbruso - Port Schema

## Port Allocation Strategy

Используем диапазон 7xxx для всех сервисов проекта:

### 71xx - Backend Microservices
- **7100** - Main API (NestJS)
- **7101** - Auth Service (если выделим отдельно)
- **7102** - Users Service
- **7103** - Workspaces Service
- **7104** - Tables Service
- **7105** - Indicators Service
- **7106** - Agents Service
- **7107** - Analytics Service

### 72xx - Frontend Applications
- **7200** - User Web App (Next.js)
- **7201** - Admin App (Next.js)

### 78xx - Cache & Utilities
- **7800** - Redis
- **7801** - (Reserved for future cache services)

### 79xx - Databases
- **7900** - PostgreSQL
- **7901** - (Reserved for future DB services)

## Current Configuration

```bash
# Database
PostgreSQL: localhost:7900

# Cache
Redis: localhost:7800

# Backend
API: localhost:7100

# Frontend
User App: localhost:7200
Admin App: localhost:7201
```

## Benefits

1. **No Conflicts**: Избегаем конфликтов со стандартными портами
2. **Easy to Remember**: Логичная структура 71xx, 72xx, 78xx, 79xx
3. **Scalability**: Легко добавлять новые сервисы в рамках диапазонов
4. **Clear Separation**: Четкое разделение по типам сервисов
