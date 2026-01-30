# API Authentication Guide

## Получение Bearer токена

### 1. Регистрация нового пользователя

**Endpoint:** `POST /auth/register`

**Request Body:**
```json
{
  "email": "user@example.com",
  "name": "John Doe",
  "password": "Password123!"
}
```

**Response (201):**
```json
{
  "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "expiresIn": "15m"
}
```

### 2. Вход существующего пользователя

**Endpoint:** `POST /auth/login`

**Request Body:**
```json
{
  "email": "user@example.com",
  "password": "Password123!"
}
```

**Response (200):**
```json
{
  "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "expiresIn": "15m"
}
```

---

## Использование Bearer токена в Swagger UI

1. **Скопируйте `accessToken`** из ответа регистрации/входа
2. **Нажмите кнопку "Authorize"** в правом верхнем углу Swagger UI (иконка замка 🔒)
3. **В модальном окне:**
   - Выберите схему **"JWT-auth (http, Bearer)"**
   - Вставьте токен в поле **"Value"** (можно с префиксом `Bearer` или без)
   - Нажмите **"Authorize"**
   - Нажмите **"Close"**

4. Теперь все защищенные эндпоинты будут автоматически использовать этот токен

---

## Использование Bearer токена в HTTP запросах

### cURL
```bash
curl -X GET 'http://localhost:7100/workspaces' \
  -H 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...'
```

### JavaScript (Fetch API)
```javascript
fetch('http://localhost:7100/workspaces', {
  headers: {
    'Authorization': `Bearer ${accessToken}`,
    'Content-Type': 'application/json'
  }
})
```

### Axios
```javascript
axios.get('http://localhost:7100/workspaces', {
  headers: {
    'Authorization': `Bearer ${accessToken}`
  }
})
```

---

## Обновление токена

Когда `accessToken` истекает (через 15 минут), используйте `refreshToken` для получения нового:

**Endpoint:** `POST /auth/refresh`

**Request Body:**
```json
{
  "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

**Response (200):**
```json
{
  "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "expiresIn": "15m"
}
```

---

## Структура JWT токена

JWT токен состоит из трех частей, разделенных точками:

```
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIzNDcyOWQ4OC1kYmFjLTQ5YmUtYjNlMi0yZTI1YmExYjBjNTUiLCJlbWFpbCI6InVzZXJAZXhhbXBsZS5jb20iLCJpYXQiOjE3Njg4MDc1MTYsImV4cCI6MTc2ODgwODQxNn0.DrRaOmvFGrmsoRnA94-owp06o9Xslsz-x5pDlMfVOQA
```

**Header (алгоритм и тип):**
```json
{
  "alg": "HS256",
  "typ": "JWT"
}
```

**Payload (данные пользователя):**
```json
{
  "sub": "34729d88-dbac-49be-b3e2-2e25ba1b0c55",  // User ID
  "email": "user@example.com",
  "iat": 1768807516,  // Issued At (время создания)
  "exp": 1768808416   // Expiration (время истечения)
}
```

**Signature (подпись для проверки подлинности)**

---

## Безопасность

- ✅ Храните `accessToken` в памяти (не в localStorage)
- ✅ Храните `refreshToken` в httpOnly cookie (или безопасном хранилище)
- ✅ Всегда используйте HTTPS в продакшене
- ✅ Не передавайте токены в URL параметрах
- ✅ Обновляйте токены до истечения срока действия
