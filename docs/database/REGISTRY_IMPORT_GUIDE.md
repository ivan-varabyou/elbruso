# Руководство по импорту реестра видов спорта

## Обзор

Система поддерживает **автоматический импорт** всего реестра видов спорта Минспорта РФ из CSV файла.

## Что импортируется

- ✅ **Все виды спорта** (~151 вид)
- ✅ **Все дисциплины** (~5000+ дисциплин)
- ✅ **Официальные коды** из реестра
- ✅ **Метаданные** для отслеживания источника

## Быстрый старт

### 1. Первичный импорт

```bash
cd docs/database
python import_registry.py --input ../Reestr_b2e716479e-25-07-2025.csv --output 05_registry_import.sql
psql -d sba -f 05_registry_import.sql
```

### 2. Обновление при новом реестре

```bash
# Скачали новый реестр Reestr_2026.csv
python import_registry.py --input ../Reestr_2026.csv --output 05_registry_import.sql
psql -d sba -f 05_registry_import.sql
```

## Структура импорта

### Виды спорта (`sports`)

```sql
INSERT INTO sports (code, name_ru, popularity_score, metadata) VALUES
('014', 'Баскетбол', 95, '{"registry_code": "014-000-2-6-1-1"}'::jsonb);
```

**Поля:**
- `code` — код из реестра (3 цифры) — **PRIMARY KEY**
- `name_ru` — официальное название
- `popularity_score` — рассчитывается автоматически (топ-50 = 100, далее убывает)
- `metadata` — JSON с полным кодом из реестра

### Дисциплины (`disciplines`)

```sql
INSERT INTO disciplines (sport_id, code, name_ru, metadata) VALUES
(2, '014-001', 'Баскетбол', '{"registry_code": "014-001-2-6-1-1"}'::jsonb);
```

**Поля:**
- `sport_id` — FK к таблице `sports`
- `code` — код дисциплины из реестра
- `name_ru` — официальное название
- `metadata` — JSON с полным кодом

## Конфликты и обновления

Скрипт использует `ON CONFLICT DO UPDATE`, поэтому:

✅ **Новые виды спорта/дисциплины** → добавляются  
✅ **Существующие** → обновляется название и метаданные  
✅ **ID не меняются** → связи сохраняются

## Формат CSV реестра

CSV файл должен иметь структуру:

```
№,Название спорта,Код1,Код2,Код3,...,Название дисциплины,Код1,Код2,...
1,Авиамодельный спорт,152,000,1,4,1,1,Я,класс F-1A,152,001,1,8,1,1,Я
```

**Столбцы:**
- 0: Номер по порядку
- 1: Название вида спорта
- 2-8: Номер-код вида спорта (7 частей)
- 9: Название дисциплины
- 10-16: Номер-код дисциплины (7 частей)

## Пример использования

### Импортировать только олимпийские виды

```bash
# Отфильтровать CSV
grep -E "^(1|2|3|...),.*,.*,.*,1,6," Reestr.csv > Olympic.csv
python import_registry.py --input Olympic.csv --output olympic_import.sql
```

### Проверить результат

```sql
-- Количество видов спорта
SELECT COUNT(*) FROM sports;

-- Количество дисциплин
SELECT COUNT(*) FROM disciplines;

-- Топ-10 по количеству дисциплин
SELECT 
    s.name_ru,
    COUNT(d.id) as disciplines_count
FROM sports s
LEFT JOIN disciplines d ON d.sport_id = s.id
GROUP BY s.id, s.name_ru
ORDER BY disciplines_count DESC
LIMIT 10;
```

## Обслуживание

### Удалить весь импорт

```sql
TRUNCATE TABLE disciplines CASCADE;
TRUNCATE TABLE sports CASCADE;
```

### Импортировать заново

```bash
psql -d sba -f 05_registry_import.sql
```

### Обновить только метаданные

```sql
UPDATE sports 
SET metadata = metadata || '{"updated_at": "2026-01-12"}'::jsonb;
```

## Автоматизация

### Cron для ежемесячного обновления

```bash
# Добавить в crontab
0 0 1 * * cd /path/to/sba/docs/database && \
  python import_registry.py && \
  psql -d sba -f 05_registry_import.sql
```

## Расширение скрипта

### Добавить фильтрацию

Отредактируйте `import_registry.py`:

```python
def parse_registry_csv(csv_file, only_olympic=False):
    # ...
    if only_olympic and row[5] not in ['1', '2']:  # олимпийские категории
        continue
    # ...
```

### Добавить валидацию

```python
def validate_sport(sport):
    """Проверяет корректность данных вида спорта"""
    if not sport['code'] or len(sport['code']) < 3:
        raise ValueError(f"Invalid code: {sport}")
    return True
```

## Troubleshooting

### Ошибка: duplicate key

**Причина:** Конфликт с существующими ID

**Решение:**
```sql
-- Проверить конфликты
SELECT code, COUNT(*) FROM sports GROUP BY code HAVING COUNT(*) > 1;

-- Удалить дубликаты вручную
DELETE FROM sports WHERE id = <дубликат>;
```

### Ошибка: encoding

**Причина:** Неправильная кодировка CSV

**Решение:**
```bash
iconv -f CP1251 -t UTF-8 Reestr.csv > Reestr_UTF8.csv
python import_registry.py --input Reestr_UTF8.csv
```

## См. также

- [README.md](README.md) — общая документация БД
- [AUTO_GENERATION_GUIDE.md](AUTO_GENERATION_GUIDE.md) — автогенерация показателей
- Официальный реестр: https://minsport.gov.ru/sport/registry/
