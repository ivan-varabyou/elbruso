# Тестовые данные для входа / Test Login Credentials

## Development Environment

URL: http://localhost:7200/login

### Регистрация / Registration

Для тестирования необходимо **зарегистрировать нового пользователя**:

1. Перейдите на http://localhost:7200/register
2. Заполните форму регистрации:
   - Email: любой валидный email
   - Name: ваше имя
   - Password: минимум 8 символов (например: Password123!)

### API Endpoints

- **Login**: POST http://localhost:7100/auth/login
- **Register**: POST http://localhost:7100/auth/register
- **API Docs**: http://localhost:7100/api/docs

### Database / База данных

- PostgreSQL: localhost:7900
- Database: elbruso
- User: postgres
- Password: postgres

### Как создать тестового пользователя через БД

```sql
-- Вставка тестового пользователя (пароль: Password123!)
INSERT INTO users (email, password_hash, first_name, last_name, role, is_active)
VALUES (
  'test@elbruso.ru',
  '$2b$10$N9qo8uLOickgx2ZMRZoMyeIjZRGdjGj/nMskyB.1nNLGdL4n5kCse', -- Password123!
  'Test',
  'User',
  'USER',
  true
);
```

### Команды для работы с базой

```bash
# Подключение к БД
psql -h localhost -p 7900 -U postgres -d elbruso

# Просмотр пользователей
SELECT id, email, role FROM users;
```
