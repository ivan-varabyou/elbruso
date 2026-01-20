# Elbruso - Database Setup Guide

## Установка Beekeeper Studio

### Linux (Ubuntu/Debian):
```bash
# Скачать .deb пакет с официального сайта
wget https://github.com/beekeeper-studio/beekeeper-studio/releases/latest/download/beekeeper-studio_amd64.deb

# Установить
sudo dpkg -i beekeeper-studio_amd64.deb
sudo apt-get install -f  # Установить зависимости если нужно
```

### Или через Snap:
```bash
sudo snap install beekeeper-studio
```

### Или через Flatpak:
```bash
flatpak install flathub io.beekeeperstudio.Studio
```

## Запуск базы данных

### 1. Запустить PostgreSQL и Redis в Docker:
```bash
docker-compose up -d
```

### 2. Проверить статус:
```bash
docker-compose ps
```

### 3. Просмотреть логи:
```bash
docker-compose logs -f postgres
```

## Подключение к БД через Beekeeper Studio

1. Открыть Beekeeper Studio
2. Создать новое подключение:
   - **Connection Type:** PostgreSQL
   - **Host:** localhost
   - **Port:** 7900
   - **User:** postgres
   - **Password:** postgres
   - **Default Database:** elbruso

3. Нажать "Connect"

## Выполнение SQL скриптов

### Автоматически при первом запуске:
Docker автоматически выполнит все SQL файлы из `docs/database/` при первом создании контейнера.

### Вручную через Beekeeper Studio:
1. Открыть файл SQL (например, `docs/database/01_reference_tables.sql`)
2. Выполнить через Beekeeper Studio

### Через командную строку:
```bash
# Подключиться к контейнеру
docker exec -it elbruso-postgres psql -U postgres -d elbruso

# Или выполнить файл напрямую
docker exec -i elbruso-postgres psql -U postgres -d elbruso < docs/database/01_reference_tables.sql
```

## Управление данными

### Остановить контейнеры (данные сохранятся):
```bash
docker-compose stop
```

### Запустить снова:
```bash
docker-compose start
```

### Полностью удалить контейнеры (данные сохранятся в volumes):
```bash
docker-compose down
```

### Удалить контейнеры И данные (осторожно!):
```bash
docker-compose down -v
```

### Бэкап базы данных:
```bash
docker exec elbruso-postgres pg_dump -U postgres elbruso > backup_$(date +%Y%m%d_%H%M%S).sql
```

### Восстановление из бэкапа:
```bash
docker exec -i elbruso-postgres psql -U postgres elbruso < backup_20260115_195900.sql
```

## Расположение данных на диске

Docker volumes хранятся в:
- Linux: `/var/lib/docker/volumes/`
- Конкретно для этого проекта:
  - `sba_postgres_data`
  - `sba_redis_data`

Данные **сохраняются** при:
- Перезагрузке контейнера
- Остановке контейнера
- Перезагрузке системы
- Удалении контейнера (если не использовать флаг `-v`)

Данные **удаляются** только при:
- `docker-compose down -v` (с флагом -v)
- `docker volume rm sba_postgres_data`
