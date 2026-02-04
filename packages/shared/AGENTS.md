# AGENTS.md - Shared Package

## Documentation

→ @docs/ → @docs/
→ PROJECT_TREE.md → @packages/shared/docs/PROJECT_TREE.md

## Structure

```
packages/shared/src/
├── api/                  # API clients & hooks
│   ├── *.api.ts         # API endpoints
│   ├── hooks/           # React Query hooks
│   └── client.ts        # Axios client
├── modules/             # Feature modules
│   ├── auth/            # Auth logic
│   ├── dashboard/       # Dashboard
│   ├── profile/         # Profile & settings
│   ├── table/           # Table components
│   └── visualization/   # Charts & graphs
├── ui/                  # UI components
│   ├── layout/          # Layouts
│   └── uikit/           # Base components
├── lib/                 # Utilities
├── stores/              # Zustand stores
└── types/               # Shared types
```

## Component Suffixes

| Type     | Suffix        | Example                   |
| -------- | ------------- | ------------------------- |
| Smart    | `.smart.tsx`  | `LoginForm.smart.tsx`     |
| Dumb     | `.dumb.tsx`   | `Button.dumb.tsx`         |
| Modal    | `.tsx`        | `CreateTableModal.tsx`    |
| Layout   | `.tsx`        | `AuthLayout.tsx`          |
| Hook     | `.hook.ts`    | `useAuth.hook.ts`         |
| Service  | `.service.ts` | `TableGridApi.service.ts` |
| Context  | `.tsx`        | `AuthContext.tsx`         |
| Provider | `.tsx`        | `ToastProvider.tsx`       |

## Import Rules

```typescript
// GOOD - use @elbruso/* aliases
import { useAuth } from "@elbruso/modules/auth";
import { apiClient } from "@elbruso/api";
import { Button } from "@elbruso/ui/uikit";

// BAD - deep relative imports
import { useAuth } from "../../../modules/auth/lib";
```

## Import Order

1. React imports
2. External packages
3. @elbruso/\* aliases
4. #/\* internal aliases
5. Relative imports

## Barrel Exports

```typescript
// WRONG
export * from "./Button";

// CORRECT
export { Button } from "./Button";
```

## Smart vs Dumb

**Smart** - contain business logic, use hooks, fetch data
**Dumb** - pure UI, receive props, no hooks allowed

```typescript
// Smart: has logic & state
export function LoginForm.smart.tsx() {
  const { login, isLoading } = useAuth();
  return <LoginFormDumb onSubmit={login} loading={isLoading} />;
}

// Dumb: pure UI
export function LoginFormDumb({ onSubmit, loading }: LoginFormProps) {
  return <button disabled={loading}>Login</button>;
}
```

## API Hooks Pattern

```typescript
// packages/shared/src/api/hooks/useUsers.hook.ts
export function useUsers() {
  return useQuery({
    queryKey: ["users"],
    queryFn: () => apiClient.get("/users").then((r) => r.data),
  });
}
```

## ESLint Rules

- `no-logic-in-dumb` - Dumb components cannot use hooks
- `no-barrel-exports` - No `export *` in index files
- `import-aliases` - Use `@elbruso/*` or `#/*` aliases
- `component-suffix-validation` - Exports must match file suffixes
- `named-exports-naming` - Export names follow conventions

## Exports from Index

```typescript
// packages/shared/src/modules/auth/index.ts
export type { AuthState, User } from "./lib/AuthContext";
export { AuthProvider, useAuth } from "./lib/AuthContext";
export { LoginForm } from "./ui/LoginForm.smart";
export { RegisterForm } from "./ui/RegisterForm.smart";
```
