# AGENTS.md - Web Zone

## Documentation

→ @docs/ → @docs/
→ PROJECT_TREE.md → @apps/web/docs/PROJECT_TREE.md

## Commands

```bash
cd apps/web
pnpm dev            # Next.js dev (port 7200)
pnpm build          # Production build
pnpm typecheck      # TypeScript check
```

## Architecture

```
apps/web/src/app/
├── (auth)/                 # Auth routes group
│   ├── login/
│   ├── register/
│   └── layout.tsx
├── (profile)/              # Protected routes group
│   ├── dashboard/
│   ├── settings/
│   └── layout.tsx
├── page.tsx                # Home page
└── layout.tsx              # Root layout
```

## Next.js Patterns

### Page

```typescript
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Dashboard',
  description: 'User dashboard',
};

export default function DashboardPage() {
  return <div>Dashboard</div>;
}
```

### Layout

```typescript
export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="dashboard-layout">
      <Sidebar />
      <main>{children}</main>
    </div>
  );
}
```

### Server Component

```typescript
async function getData(): Promise<User[]> {
  const res = await fetch('https://api.example.com/users');
  if (!res.ok) throw new Error('Failed to fetch');
  return res.json();
}

export default async function UsersPage() {
  const users = await getData();
  return <UserList users={users} />;
}
```

## Import from Shared

```typescript
// Use shared components
import { LoginForm } from "@elbruso/modules/auth";
import { Dashboard } from "@elbruso/modules/dashboard";

// Use shared hooks
import { useAuth } from "@elbruso/modules/auth";
import { useUsers } from "@elbruso/api/hooks";

// Use shared API
import { apiClient } from "@elbruso/api";
```

## Smart vs Dumb Components

**Smart** - contain logic, use hooks, fetch data
**Dumb** - pure UI, receive props, no hooks

```typescript
// Smart: has logic & state
'use client';
export function UserList.smart.tsx() {
  const { users, loading } = useUsers();
  return <UserListDumb users={users} loading={loading} />;
}

// Dumb: pure UI
export function UserListDumb({ users, loading }: UserListProps) {
  if (loading) return <Spinner />;
  return <ul>{users.map(u => <li key={u.id}>{u.name}</li>)}</ul>;
}
```

## ESLint Rules

- `no-logic-in-dumb` - Dumb components cannot use hooks
- `import-aliases` - Use `@elbruso/*` aliases
- Component suffixes validation
