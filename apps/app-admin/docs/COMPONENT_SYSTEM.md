# Component System Naming Convention

### Суффиксы компонентов

| Тип        | Суффикс         | Пример                     |
| ---------- | --------------- | -------------------------- |
| Section    | `.section.tsx`  | Analytics.section.tsx      |
| Widget     | `.widget.tsx`   | UserList.widget.tsx        |
| Modal      | `.modal.tsx`    | ConfirmDelete.modal.tsx    |
| Layout     | `.layout.tsx`   | AuthLayout.layout.tsx      |
| Smart      | `.smart.tsx`    | LoginForm.smart.tsx        |
| Dumb       | `.dumb.tsx`     | Button.dumb.tsx            |
| Dumb Group | `.dumbs.tsx`    | FormFields.dumbs.tsx       |
| Provider   | `.provider.tsx` | ToastProvider.provider.tsx |
| Hook       | `.hook.ts`      | useAuth.hook.ts            |
| Context    | `.context.tsx`  | AuthContext.context.tsx    |

### Правило Barrel Exports

```typescript
// ✅ РАЗРЕШЕНО
export { ButtonDumb } from "./Button";

// ❌ ЗАПРЕЩЕНО
export * from "./Button";
```
