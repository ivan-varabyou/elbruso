# Elbruso Development Setup

## Quick Start

```bash
npm run dev
```

Этот скрипт автоматически:
- ✅ Проверит и запустит Docker контейнеры (PostgreSQL, Redis)
- ✅ Соберет database package
- ✅ Создаст необходимые .env файлы
- ✅ Запустит все dev серверы

## Доступные сервисы

После запуска будут доступны:

- **Web App**: http://localhost:7200
- **Admin App**: http://localhost:7201
- **API**: http://localhost:7100
- **Swagger Docs**: http://localhost:7100/api/docs

## База данных

### PostgreSQL
- **Host**: localhost
- **Port**: 7900
- **Database**: elbruso
- **User**: elbruso
- **Password**: elbruso

### Redis
- **Host**: localhost
- **Port**: 7800

## Переменные окружения

### API (`apps/api/.env`)
```env
DATABASE_URL=postgresql://elbruso:elbruso@localhost:7900/elbruso
JWT_SECRET=your-super-secret-jwt-key-change-in-production
JWT_EXPIRES_IN=15m
JWT_REFRESH_EXPIRES_IN=7d
PORT=3001
NODE_ENV=development
```

### Web (`apps/web/.env.local`)
```env
NEXT_PUBLIC_API_URL=http://localhost:7100
```

## Команды

- `npm run dev` - Запуск dev среды с автоматической настройкой
- `npm run dev:only` - Запуск только dev серверов (без setup)
- `npm run build` - Сборка всех приложений
- `npm run lint` - Проверка кода

## Требования

- Node.js 20+
- Docker Desktop
- pnpm 9.0.0

## Troubleshooting

### Docker не запущен
```bash
# Запустите Docker Desktop вручную
```

### База данных не подключается
```bash
# Проверьте статус контейнеров
docker ps | grep elbruso

# Перезапустите контейнеры
docker restart elbruso-postgres elbruso-redis
```

### Порты заняты
Убедитесь, что порты 7200, 7201, 3001, 7900, 7800 свободны.
