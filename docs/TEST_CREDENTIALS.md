# Test Credentials

## Admin Panel (port 7201)

### Access
| Service | URL |
|---------|-----|
| Admin Web | http://localhost:7201 |
| Admin API | http://localhost:7100/api/docs |

### Super Admin
- **Email:** admin@elbruso.ru
- **Password:** admin123

### Default Roles
| Role | Description | Permissions |
|------|-------------|------------|
| super_admin | Полный доступ | ["*"] |
| admin | Администратор | ["users:*", "roles:read", "settings:read"] |
| moderator | Модератор | ["users:read", "roles:read"] |

### API Endpoints
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | /api/admin/auth/login | Admin login |
| GET | /api/admin/users | List admin users |
| GET | /api/admin/roles | List admin roles |
