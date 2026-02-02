# Структура проекта api

Генерировано: Пн 02 фев 2026 20:04:58 +03

/home/ivan/git/elbruso/packages/shared
├── docs
│   └── PROJECT_TREE.md
├── src
│   ├── api
│   │   ├── hooks
│   │   │   ├── index.ts
│   │   │   ├── queryClient.ts
│   │   │   ├── ReactQueryProvider.tsx
│   │   │   ├── useAuth.ts
│   │   │   ├── useCountries.ts
│   │   │   ├── useForgotPassword.ts
│   │   │   ├── useOrganizations.ts
│   │   │   ├── useReference.ts
│   │   │   ├── useResetPassword.ts
│   │   │   ├── useUsers.ts
│   │   │   └── useWorkspaces.ts
│   │   ├── Admin.ts
│   │   ├── api-mapping.ts
│   │   ├── api-types.ts
│   │   ├── api-utils.ts
│   │   ├── Auth.ts
│   │   ├── Blocks.ts
│   │   ├── client.ts
│   │   ├── config.ts
│   │   ├── Countries.ts
│   │   ├── create-api.ts
│   │   ├── data-contracts.ts
│   │   ├── definitions.ts
│   │   ├── endpoints.ts
│   │   ├── error.ts
│   │   ├── Events.ts
│   │   ├── Formulas.ts
│   │   ├── Groups.ts
│   │   ├── http-client.ts
│   │   ├── index.ts
│   │   ├── Pages.ts
│   │   ├── Reference.ts
│   │   ├── Tables.ts
│   │   ├── Users.ts
│   │   ├── Versions.ts
│   │   ├── websocket.ts
│   │   └── Workspaces.ts
│   ├── app
│   │   └── providers
│   │       ├── AppProviders.tsx
│   │       └── index.ts
│   ├── lib
│   │   ├── react
│   │   │   └── SourceTracker.tsx
│   │   ├── cn.ts
│   │   └── index.ts
│   ├── modules
│   │   ├── admin
│   │   │   └── index.ts
│   │   ├── auth
│   │   │   ├── lib
│   │   │   │   ├── AuthContext.tsx
│   │   │   │   ├── index.ts
│   │   │   │   └── ProtectedRoute.tsx
│   │   │   ├── ui
│   │   │   │   ├── auth.css
│   │   │   │   ├── index.ts
│   │   │   │   ├── LoginForm.tsx
│   │   │   │   ├── RegisterForm.tsx
│   │   │   │   └── ResetPasswordForm.tsx
│   │   │   └── index.ts
│   │   ├── dashboard
│   │   │   └── index.ts
│   │   ├── events
│   │   │   └── index.ts
│   │   ├── i18n
│   │   │   ├── lib
│   │   │   │   ├── language
│   │   │   │   ├── i18n-provider.tsx
│   │   │   │   └── index.ts
│   │   │   ├── ui
│   │   │   │   └── LanguageSwitcher
│   │   │   └── index.ts
│   │   ├── indicators
│   │   │   └── index.ts
│   │   ├── notifications
│   │   │   ├── hooks
│   │   │   │   ├── index.ts
│   │   │   │   └── useToast.ts
│   │   │   ├── providers
│   │   │   │   ├── index.ts
│   │   │   │   └── ToastProvider.tsx
│   │   │   ├── types
│   │   │   │   └── index.ts
│   │   │   ├── ui
│   │   │   │   ├── index.ts
│   │   │   │   └── ToastContainer.tsx
│   │   │   └── index.ts
│   │   ├── pages
│   │   │   └── index.ts
│   │   ├── profile
│   │   │   ├── ui
│   │   │   │   ├── indicators
│   │   │   │   ├── ProfileLayout
│   │   │   │   ├── Settings
│   │   │   │   ├── WorkspaceTree
│   │   │   │   └── index.ts
│   │   │   └── index.ts
│   │   ├── reference
│   │   │   ├── ui
│   │   │   │   ├── index.ts
│   │   │   │   └── ReferenceSelector.tsx
│   │   │   └── index.ts
│   │   ├── seasons
│   │   │   ├── ui
│   │   │   │   ├── Seasons
│   │   │   │   └── index.ts
│   │   │   └── index.ts
│   │   ├── sports
│   │   │   └── index.ts
│   │   ├── table
│   │   │   ├── hooks
│   │   │   │   └── useKeyboardShortcuts.ts
│   │   │   ├── lib
│   │   │   │   ├── cellAddressUtils.ts
│   │   │   │   ├── crossWorkspace.ts
│   │   │   │   ├── engine.ts
│   │   │   │   ├── index.ts
│   │   │   │   └── TableReferenceParser.ts
│   │   │   ├── services
│   │   │   │   ├── cell-formatting.service.ts
│   │   │   │   ├── table-grid-api.service.ts
│   │   │   │   └── table.service.ts
│   │   │   ├── types
│   │   │   │   ├── cell.types.ts
│   │   │   │   ├── index.ts
│   │   │   │   └── table.types.ts
│   │   │   ├── ui
│   │   │   │   ├── ContextMenu.tsx
│   │   │   │   ├── DynamicTable.tsx
│   │   │   │   ├── FormulaBar.tsx
│   │   │   │   ├── index.ts
│   │   │   │   ├── MainToolbar.tsx
│   │   │   │   ├── SheetTabs.tsx
│   │   │   │   ├── TableHeader.tsx
│   │   │   │   └── TableTheme.css
│   │   │   └── index.ts
│   │   ├── visualization
│   │   │   ├── lib
│   │   │   │   ├── adapters
│   │   │   │   └── index.ts
│   │   │   ├── ui
│   │   │   │   ├── charts
│   │   │   │   ├── d3
│   │   │   │   └── index.ts
│   │   │   └── index.ts
│   │   ├── workspaces
│   │   │   └── index.ts
│   │   └── index.ts
│   ├── stores
│   │   ├── index.ts
│   │   ├── useFormattingStore.ts
│   │   ├── useFormulaStore.ts
│   │   ├── useHistoryStore.ts
│   │   ├── useReferenceStore.ts
│   │   ├── useSelectionStore.ts
│   │   ├── useTableReferenceStore.ts
│   │   ├── useTableStore.ts
│   │   ├── useUserStore.ts
│   │   └── useWorkspaceStore.ts
│   ├── types
│   │   ├── dictionary.ts
│   │   ├── enums.ts
│   │   ├── index.ts
│   │   ├── link.types.ts
│   │   ├── next-shim.d.ts
│   │   ├── reference.types.ts
│   │   └── visualization.ts
│   ├── ui
│   │   ├── layout
│   │   │   ├── AuthLayout
│   │   │   │   ├── AuthLayout.css
│   │   │   │   ├── AuthLayout.tsx
│   │   │   │   └── index.ts
│   │   │   ├── Footer
│   │   │   │   ├── Footer.tsx
│   │   │   │   └── index.ts
│   │   │   ├── Header
│   │   │   │   ├── Header.tsx
│   │   │   │   └── index.ts
│   │   │   ├── PageLayout
│   │   │   │   ├── index.ts
│   │   │   │   └── PageLayout.tsx
│   │   │   └── index.ts
│   │   ├── primitives
│   │   │   ├── Button
│   │   │   │   ├── Button.tsx
│   │   │   │   └── index.ts
│   │   │   ├── IconButton
│   │   │   │   ├── IconButton.tsx
│   │   │   │   └── index.ts
│   │   │   ├── Input
│   │   │   │   ├── index.ts
│   │   │   │   ├── Input.css
│   │   │   │   └── Input.tsx
│   │   │   ├── Logo
│   │   │   │   ├── index.ts
│   │   │   │   ├── Logo.tsx
│   │   │   │   └── LogoV2.tsx
│   │   │   ├── Select
│   │   │   │   ├── index.ts
│   │   │   │   └── Select.tsx
│   │   │   └── index.ts
│   │   └── index.ts
│   └── index.ts
├── AGENT.md
├── package.json
├── tsconfig.json
└── tsconfig.tsbuildinfo

66 directories, 148 files
