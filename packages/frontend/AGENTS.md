# AGENTS.md - Frontend Package

## Documentation

→ @docs/ → @docs/
→ PROJECT_TREE.md → @docs/PROJECT_TREE.md

## Structure

```
packages/frontend/src/
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
│   └── primitives/      # Base components
├── lib/                 # Utilities
├── stores/              # Zustand stores
└── types/               # Shared types
```

## Import Rules

```typescript
// GOOD - use @frontend/* aliases
import { useAuth } from "@frontend/modules/auth";
import { apiClient } from "@frontend/api";
import { Button } from "@frontend/ui";

// BAD - deep relative imports
import { useAuth } from "../../../modules/auth/lib";
```

## Import Order

1. React imports
2. External packages
3. @frontend/\* aliases
4. @/\* internal aliases
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
// packages/frontend/src/api/hooks/useUsers.hook.ts
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
- `import-aliases` - Use `@frontend/*` or `#/*` aliases
- `component-suffix-validation` - Exports must match file suffixes
- `named-exports-naming` - Export names follow conventions

## Exports from Index

```typescript
// packages/frontend/src/modules/auth/index.ts
export type { AuthState, User } from "./lib/AuthContext";
export { AuthProvider, useAuth } from "./lib/AuthContext";
export { LoginForm } from "./ui/LoginForm.smart";
export { RegisterForm } from "./ui/RegisterForm.smart";
```
