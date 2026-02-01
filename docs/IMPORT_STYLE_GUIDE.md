# Elbruso Import Style Guide

A comprehensive guide for consistent and maintainable imports across the Elbruso monorepo.

## Overview

This guide establishes a unified import system using `@elbruso/*` aliases to ensure:

- **Consistency** across all packages and applications
- **Readability** with clear import paths
- **Maintainability** by avoiding relative path chains
- **Collision prevention** through organized namespace aliases

## Project Structure

```
elbruso/
├── apps/
│   ├── web/              # Next.js web application
│   └── api/              # Backend API service
├── packages/
│   ├── shared/           # Shared React components, hooks, utilities
│   ├── debug/            # Debug utilities
│   └── path-copier/      # Path copying utilities
└── docs/
    └── IMPORT_STYLE_GUIDE.md
```

## Import Aliases

| Alias                | Target                                   | Usage                      |
| -------------------- | ---------------------------------------- | -------------------------- |
| `@elbruso/shared`    | `packages/shared/src/index.ts`           | Main shared package entry  |
| `@elbruso/shared/*`  | `packages/shared/src/*`                  | Any file in shared package |
| `@elbruso/api`       | `packages/shared/src/api/index.ts`       | API client and services    |
| `@elbruso/api/*`     | `packages/shared/src/api/*`              | Specific API modules       |
| `@elbruso/hooks`     | `packages/shared/src/api/hooks/index.ts` | All React hooks            |
| `@elbruso/hooks/*`   | `packages/shared/src/api/hooks/*`        | Specific hooks             |
| `@elbruso/lib/*`     | `packages/shared/src/lib/*`              | Utility libraries          |
| `@elbruso/modules/*` | `packages/shared/src/modules/*`          | Feature modules            |
| `@elbruso/ui/*`      | `packages/shared/src/ui/*`               | UI components              |
| `@elbruso/types`     | `packages/shared/src/types/index.ts`     | TypeScript types           |
| `@elbruso/types/*`   | `packages/shared/src/types/*`            | Specific type files        |
| `@elbruso/stores`    | `packages/shared/src/stores/index.ts`    | State stores               |
| `@elbruso/debug`     | `packages/debug/src/index.ts`            | Debug utilities            |

## Import Rules

### DO: Use Alias Imports

```typescript
// ✅ CORRECT: Using aliases
import { Button, Input } from "@elbruso/ui";
import { useCountries } from "@elbruso/hooks";
import { Auth } from "@elbruso/api";
import { cn } from "@elbruso/lib/utils";
import { User } from "@elbruso/types";
```

### DON'T: Use Relative Imports

```typescript
// ❌ INCORRECT: Relative paths
import { Button } from "../../../ui/uikit/Button";
import { useCountries } from "../../../api/hooks/useCountries";
import { Auth } from "../../api/Auth";
```

### DO: Import from Specific Aliases

```typescript
// ✅ CORRECT: Import specific items
import { useAuth } from "@elbruso/hooks";
import { useToast, Toast } from "@elbruso/ui/Toast";
import { LoginDto } from "@elbruso/types";
```

### DON'T: Import from Wildcard Alias

```typescript
// ❌ INCORRECT: Using wildcard for specific items
import * as API from "@elbruso/api";
API.Auth; // Ambiguous
```

## Category Examples

### API Clients

```typescript
// ✅ CORRECT
import { Auth, Users, Workspaces } from "@elbruso/api";
import { apiClient, setTokens } from "@elbruso/api";

// Usage
const auth = new Auth();
await auth.login(credentials);
```

### React Hooks

```typescript
// ✅ CORRECT: Import from hooks alias
import { useCountries, useOrganizations, useAuth } from "@elbruso/hooks";

// Component usage
const countries = useCountries();
const { login } = useAuth();
```

### UI Components

```typescript
// ✅ CORRECT: Import UI components
import { Button } from "@elbruso/ui/Button";
import { Input } from "@elbruso/ui/Input";
import { Select } from "@elbruso/ui/Select";
import { Toast, useToast } from "@elbruso/ui/Toast";

// Composite import
import { Button, Input, Select } from "@elbruso/ui";
```

### Modules

```typescript
// ✅ CORRECT: Import from modules
import { RegisterForm } from "@elbruso/modules/auth/ui";
import { DynamicTable } from "@elbruso/modules/table/ui";
```

### Utilities

```typescript
// ✅ CORRECT: Import utilities
import { cn } from "@elbruso/lib/utils";
import { formatDate } from "@elbruso/lib/date";
```

### Types

```typescript
// ✅ CORRECT: Import types
import type { User, Country, Organization } from "@elbruso/types";
import type { LoginDto, RegisterDto } from "@elbruso/api";
```

## Re-export Structure

### hooks/index.ts

```typescript
export { useCountries } from "./useCountries";
export { useOrganizations } from "./useOrganizations";
export { useForgotPassword, useResetPassword, useVerifyResetToken } from "./useForgotPassword";
export { useAuth } from "./useAuth";
export { useUsers } from "./useUsers";
export { useWorkspaces } from "./useWorkspaces";
export { useReference } from "./useReference";
export { ReactQueryProvider } from "./ReactQueryProvider";
export { queryClient } from "./queryClient";
```

### ui/index.ts

```typescript
export { Button } from "./uikit/Button";
export { Input } from "./uikit/Input";
export { Select } from "./uikit/Select";
export { Toast, useToast } from "./uikit/Toast";
export { Logo } from "./Logo";
export { PasswordStrength } from "./PasswordStrength";
export { AppProviders } from "./layout/AppProviders/AppProviders";
```

### api/index.ts

```typescript
export { Auth } from "./Auth";
export { Reference } from "./Reference";
export { Countries } from "./Countries";
export { Users } from "./Users";
export { Workspaces } from "./Workspaces";
export { Tables } from "./Tables";
export { Admin } from "./Admin";
export { Blocks } from "./Blocks";
export { Events } from "./Events";
export { Formulas } from "./Formulas";
export { Groups } from "./Groups";
export { Pages } from "./Pages";
export { Versions } from "./Versions";
export type {
  LoginDto,
  RegisterDto,
  ForgotPasswordDto,
  ResetPasswordDto,
  UpdateProfileDto,
} from "./data-contracts";
export { apiClient, setTokens, clearTokens, isAuthenticated } from "./client";
```

## TypeScript Configuration

### packages/shared/tsconfig.json

```json
{
  "compilerOptions": {
    "paths": {
      "@elbruso/shared": ["./src/index.ts"],
      "@elbruso/shared/*": ["./src/*"],
      "@elbruso/api": ["./src/api/index.ts"],
      "@elbruso/api/*": ["./src/api/*"],
      "@elbruso/hooks": ["./src/api/hooks/index.ts"],
      "@elbruso/hooks/*": ["./src/api/hooks/*"],
      "@elbruso/lib/*": ["./src/lib/*"],
      "@elbruso/modules/*": ["./src/modules/*"],
      "@elbruso/ui/*": ["./src/ui/*"],
      "@elbruso/types": ["./src/types/index.ts"],
      "@elbruso/types/*": ["./src/types/*"],
      "@elbruso/stores": ["./src/stores/index.ts"],
      "@elbruso/debug": ["../debug/src/index.ts"]
    }
  }
}
```

### apps/web/tsconfig.json

```json
{
  "compilerOptions": {
    "paths": {
      "@/*": ["./src/*"],
      "@/app/*": ["./src/app/*"],
      "@/pages": ["./src/pages/index.ts"],
      "@/pages/*": ["./src/pages/*"],
      "@/shared": ["../../packages/shared/src/index.ts"],
      "@/shared/*": ["../../packages/shared/src/*"],
      "@/types": ["./src/types"],
      "@path-copier/*": ["../../packages/path-copier/src/*"],
      "@elbruso/*": ["../../packages/*/src"],
      "@elbruso/shared": ["../../packages/shared/src/index.ts"],
      "@elbruso/shared/*": ["../../packages/shared/src/*"],
      "@elbruso/api": ["../../packages/shared/src/api/index.ts"],
      "@elbruso/api/*": ["../../packages/shared/src/api/*"],
      "@elbruso/hooks": ["../../packages/shared/src/api/hooks/index.ts"],
      "@elbruso/lib/*": ["../../packages/shared/src/lib/*"],
      "@elbruso/modules/*": ["../../packages/shared/src/modules/*"],
      "@elbruso/ui/*": ["../../packages/shared/src/ui/*"],
      "@elbruso/types": ["../../packages/shared/src/types/index.ts"],
      "@elbruso/types/*": ["../../packages/shared/src/types/*"],
      "@elbruso/stores": ["../../packages/shared/src/stores/index.ts"],
      "@elbruso/debug": ["../../packages/debug/src/index.ts"]
    }
  }
}
```

## Usage Examples

### Component with Multiple Imports

```typescript
// Before (using relative paths)
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "../../../lib/auth";
import { useToast } from "../../../ui/uikit/Toast";
import { Input } from "../../../ui/uikit/Input";
import { Button } from "../../../ui/uikit/Button";
import { useCountries } from "../../../api/hooks/useCountries";

// After (using aliases)
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@elbruso/lib/auth";
import { useToast } from "@elbruso/ui/Toast";
import { Input } from "@elbruso/ui/Input";
import { Button } from "@elbruso/ui/Button";
import { useCountries } from "@elbruso/hooks";
```

### API Usage

```typescript
// Before
import { Auth } from "../api/Auth";
import { LoginDto } from "../api/data-contracts";

// After
import { Auth } from "@elbruso/api";
import type { LoginDto } from "@elbruso/api";
```

### Type Usage

```typescript
// Before
import { User } from "../../types";

// After
import type { User } from "@elbruso/types";
```

## Prohibited Patterns

### ❌ Absolute Paths to Shared (apps/web only)

```typescript
// ❌ INCORRECT
import { Button } from "@/shared/ui/Button";
```

### ❌ Deep Relative Paths

```typescript
// ❌ INCORRECT
import { something } from "../../../../../../../shared/src/lib/utils";
```

### ❌ Mixed Import Styles

```typescript
// ❌ INCORRECT
import { Button } from "@elbruso/ui/Button";
import { Input } from "../../../ui/Input";
```

### ❌ Barrel File Re-exports Only

```typescript
// ❌ INCORRECT - Don't re-export everything without clear structure
export * from "./hooks";
export * from "./ui";
// Hard to trace where things come from
```

## ESLint Recommendations

Add these rules to your ESLint configuration:

```json
{
  "rules": {
    "no-restricted-imports": [
      "error",
      {
        "patterns": ["../../*", "../../../*", "../../../../*"]
      }
    ],
    "@typescript-eslint/no-restricted-imports": [
      "error",
      {
        "name": "@/shared",
        "message": "Use @elbruso/* aliases instead of @/shared"
      }
    ]
  }
}
```

## Migration Guide

### Step 1: Update tsconfig.json

Add or update path aliases in all tsconfig.json files.

### Step 2: Create Re-export Files

Create or update index.ts files in hooks/ and ui/ directories:

```typescript
// packages/shared/src/api/hooks/index.ts
export { useCountries } from "./useCountries";
export { useOrganizations } from "./useOrganizations";
// ... other exports
```

### Step 3: Update Imports

Search and replace relative imports with aliases:

```bash
# Example sed replacements (run from project root)
find . -name "*.ts" -o -name "*.tsx" | xargs sed -i \
  's|../../../ui/uikit/Button|@elbruso/ui/Button|g'

find . -name "*.ts" -o -name "*.tsx" | xargs sed -i \
  's|../../../api/hooks/|@elbruso/hooks/|g'
```

### Step 4: Run TypeScript Check

```bash
# Verify changes
npx tsc --noEmit
```

## FAQ

### Q: When should I use `* as` imports?

**A:** Avoid `* as` imports. Use named imports for better tree-shaking and readability:

```typescript
// ✅ CORRECT
import { Button, Input, Select } from "@elbruso/ui";

// ❌ INCORRECT
import * as UI from "@elbruso/ui";
UI.Button; // Less readable
```

### Q: How do I import types vs values?

**A:** Use `import type` for types only:

```typescript
import { apiClient } from "@elbruso/api"; // Value
import type { User } from "@elbruso/types"; // Type only
```

### Q: Can I create custom aliases for my module?

**A:** No. All packages should use the standardized `@elbruso/*` aliases. This ensures consistency across the codebase.

### Q: How do I import from third-party packages?

**A:** Third-party imports remain unchanged:

```typescript
import { useQuery } from "@tanstack/react-query";
import { z } from "zod";
```

## Checklist

- [ ] Path aliases configured in all tsconfig.json files
- [ ] Re-export files created for hooks and UI
- [ ] All imports updated to use `@elbruso/*` aliases
- [ ] No relative imports (except for local component imports)
- [ ] TypeScript typecheck passes
- [ ] ESLint rules configured for import validation

## References

- [TypeScript Path Mapping](https://www.typescriptlang.org/docs/handbook/module-resolution.html#path-mapping)
- [ESLint Import Rules](https://eslint.org/docs/rules/)

---

## Backend Import Aliases

The API backend (`apps/api`) uses its own import alias system for NestJS modular architecture.

### Backend Aliases

| Alias                  | Target                             | Usage                                                 |
| ---------------------- | ---------------------------------- | ----------------------------------------------------- |
| `@/*`                  | `apps/api/src/*`                   | Root source directory                                 |
| `@modules/*`           | `apps/api/src/modules/*`           | Feature modules                                       |
| `@modules/auth/*`      | `apps/api/src/modules/auth/*`      | Auth module                                           |
| `@modules/users/*`     | `apps/api/src/modules/users/*`     | Users module                                          |
| `@modules/workspace/*` | `apps/api/src/modules/workspace/*` | Workspace module                                      |
| `@modules/tables/*`    | `apps/api/src/modules/tables/*`    | Tables module                                         |
| `@modules/reference/*` | `apps/api/src/modules/reference/*` | Reference data modules                                |
| `@gateway/*`           | `apps/api/src/gateway/*`           | HTTP/WebSocket gateway                                |
| `@shared/*`            | `apps/api/src/shared/*`            | Shared utilities (decorators, dto, interfaces, utils) |
| `@config`              | `apps/api/src/config.ts`           | Configuration file                                    |
| `@database/*`          | `apps/api/src/database/*`          | Database layer                                        |

### Backend Examples

```typescript
// ✅ CORRECT: Using backend aliases
import { UsersService } from "@modules/users/services/users.service";
import { HealthService } from "@gateway/services/health.service";
import { config } from "@config";
import { JwtAuthGuard } from "@modules/auth/guards/jwt-auth.guard";
import { WorkspaceService } from "@modules/workspace/services/workspace.service";
```

### ❌ INCORRECT: Relative Paths in Backend

```typescript
// ❌ INCORRECT
import { UsersService } from "../../modules/users/services/users.service";
import { TransformInterceptor } from "../../gateway/interceptors/transform.interceptor";
```

### Backend tsconfig.json

```json
{
  "compilerOptions": {
    "baseUrl": "./src",
    "paths": {
      "@/*": ["./*"],
      "@modules/*": ["modules/*"],
      "@modules/auth/*": ["modules/auth/*"],
      "@modules/users/*": ["modules/users/*"],
      "@modules/workspace/*": ["modules/workspace/*"],
      "@modules/tables/*": ["modules/tables/*"],
      "@modules/reference/*": ["modules/reference/*"],
      "@gateway/*": ["gateway/*"],
      "@shared/*": ["shared/*"],
      "@config": ["./config.ts"],
      "@database/*": ["database/*"]
    }
  }
}
```

### Backend Module Structure

```
apps/api/src/
├── modules/
│   ├── auth/
│   │   ├── controllers/
│   │   ├── services/
│   │   ├── guards/
│   │   ├── strategies/
│   │   └── dto/
│   ├── users/
│   ├── workspace/
│   ├── tables/
│   ├── pages/
│   ├── blocks/
│   ├── admin/
│   ├── audit/
│   ├── email/
│   └── reference/
│       ├── regions/
│       ├── sports/
│       ├── indicators/
│       ├── seasons/
│       ├── events/
│       ├── organizations/
│       └── countries/
├── gateway/
│   ├── controllers/
│   ├── services/
│   ├── websocket/
│   ├── interceptors/
│   └── filters/
├── shared/
│   ├── decorators/
│   ├── dto/
│   ├── interfaces/
│   └── utils/
└── database/
```
