# Production Setup

## Overview

This document describes how to configure the Elbruso application for production deployment.

## Environment Configuration

### Files

| File                      | Purpose                 | Gitignored |
| ------------------------- | ----------------------- | ---------- |
| `.env`                    | Development environment | Yes        |
| `.env.production`         | Production environment  | Yes        |
| `.env.production.example` | Production template     | No         |
| `.env.example`            | Development template    | No         |

### Environment Variables

#### Required for Production

```bash
# Database (PostgreSQL with SSL)
DATABASE_URL=postgresql://user:password@hostname:5432/elbruso?sslmode=require

# JWT Secrets (generate with scripts/generate-secrets.sh)
JWT_SECRET=your-64-char-hex-secret
JWT_EXPIRES_IN=15m
JWT_REFRESH_EXPIRES_IN=7d

ADMIN_JWT_SECRET=your-admin-secret
ADMIN_REFRESH_SECRET=your-admin-refresh-secret

# Server
NODE_ENV=production
PORT=7100
WS_PORT=7000
CORS_ORIGINS=https://app.elbruso.com

# Redis (cache)
REDIS_HOST=127.0.0.1
REDIS_PORT=6379
REDIS_PASSWORD=

# Optional
SENTRY_DSN=your-sentry-dsn
```

## Setup Scripts

### Generate Secrets

Generate secure random secrets:

```bash
# Generate JWT secret
./scripts/generate-secrets.sh jwt

# Generate admin secrets
./scripts/generate-secrets.sh admin

# Generate all secrets
./scripts/generate-secrets.sh all
```

### Production Setup

Automatically generate secrets and create `.env.production`:

```bash
./scripts/production-setup.sh
```

This script:

1. ✅ Generates JWT, ADMIN_JWT, ADMIN_REFRESH secrets
2. ✅ Creates `.env.production` from template
3. ✅ Verifies critical configuration
4. ⚠️ Asks before overwriting existing files

## Security Best Practices

1. **Never commit `.env` or `.env.production`** to version control
2. **Use strong secrets** - at least 32 characters (64 hex chars recommended)
3. **Enable SSL** for database connections in production
4. **Restrict CORS origins** to your production domains only
5. **Rotate secrets** periodically and after team member departures

## Deployment Checklist

- [ ] Generate new secrets with `./scripts/production-setup.sh`
- [ ] Configure `DATABASE_URL` with production PostgreSQL
- [ ] Configure `REDIS_*` for caching
- [ ] (Optional) Configure `RABBITMQ_*` for messaging
- [ ] (Optional) Configure `SENTRY_DSN` for error tracking
- [ ] Build API: `cd apps/api && pnpm install && pnpm build`
- [ ] Build Web: `cd apps/web && pnpm install && pnpm build`
- [ ] Start services with process manager (PM2, Docker, etc.)
