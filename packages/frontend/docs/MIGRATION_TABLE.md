# packages/shared Migration Table

> Generated: Wed Feb 04 2026
> Reference: /home/ivan/git/elbruso/docs/COMPONENT_SYSTEM_MIGRATION.md

## packages/shared Migration Table

### api/hooks/

| Current File           | New File                        | Action | Status  |
| ---------------------- | ------------------------------- | ------ | ------- |
| queryClient.ts         | queryClient.hook.ts             | rename | pending |
| ReactQueryProvider.tsx | ReactQueryProvider.provider.tsx | rename | pending |
| useAuth.ts             | useAuth.hook.ts                 | rename | pending |
| useCountries.ts        | useCountries.hook.ts            | rename | pending |
| useForgotPassword.ts   | useForgotPassword.hook.ts       | rename | pending |
| useOrganizations.ts    | useOrganizations.hook.ts        | rename | pending |
| useReference.ts        | useReference.hook.ts            | rename | pending |
| useResetPassword.ts    | useResetPassword.hook.ts        | rename | pending |
| useUsers.ts            | useUsers.hook.ts                | rename | pending |
| useWorkspaces.ts       | useWorkspaces.hook.ts           | rename | pending |
| index.ts               | index.ts                        | keep   | ok      |

### api/

| Current File      | New File               | Action | Status  |
| ----------------- | ---------------------- | ------ | ------- |
| Admin.ts          | admin.api.ts           | rename | pending |
| Auth.ts           | auth.api.ts            | rename | pending |
| Blocks.ts         | blocks.api.ts          | rename | pending |
| Countries.ts      | countries.api.ts       | rename | pending |
| Events.ts         | events.api.ts          | rename | pending |
| Formulas.ts       | formulas.api.ts        | rename | pending |
| Groups.ts         | groups.api.ts          | rename | pending |
| Pages.ts          | pages.api.ts           | rename | pending |
| Reference.ts      | reference.api.ts       | rename | pending |
| Tables.ts         | tables.api.ts          | rename | pending |
| Users.ts          | users.api.ts           | rename | pending |
| Versions.ts       | versions.api.ts        | rename | pending |
| Workspaces.ts     | workspaces.api.ts      | rename | pending |
| client.ts         | client.service.ts      | rename | pending |
| config.ts         | config.constant.ts     | rename | pending |
| create-api.ts     | create-api.service.ts  | rename | pending |
| http-client.ts    | http-client.service.ts | rename | pending |
| websocket.ts      | websocket.ws.ts        | rename | pending |
| api-mapping.ts    | api-mapping.ts         | review | pending |
| api-types.ts      | api-types.ts           | keep   | ok      |
| api-utils.ts      | api-utils.ts           | keep   | ok      |
| data-contracts.ts | data-contracts.ts      | keep   | ok      |
| definitions.ts    | definitions.ts         | keep   | ok      |
| endpoints.ts      | endpoints.ts           | keep   | ok      |
| error.ts          | error.ts               | keep   | ok      |
| index.ts          | index.ts               | keep   | ok      |

### modules/\*\*/ui/

| Current File                                                  | New File                                                           | Action | Status  |
| ------------------------------------------------------------- | ------------------------------------------------------------------ | ------ | ------- |
| auth/lib/AuthContext.tsx                                      | auth/lib/AuthContext.context.tsx                                   | rename | pending |
| auth/lib/ProtectedRoute.tsx                                   | auth/lib/ProtectedRoute.smart.tsx                                  | rename | pending |
| auth/ui/LoginForm.tsx                                         | auth/ui/LoginForm.smart.tsx                                        | rename | pending |
| auth/ui/RegisterForm.tsx                                      | auth/ui/RegisterForm.smart.tsx                                     | rename | pending |
| auth/ui/ResetPasswordForm.tsx                                 | auth/ui/ResetPasswordForm.smart.tsx                                | rename | pending |
| events/index.ts                                               | events/index.ts                                                    | keep   | ok      |
| i18n/lib/language/LanguageContext.tsx                         | i18n/lib/language/LanguageContext.context.tsx                      | rename | pending |
| i18n/lib/i18n-provider.tsx                                    | i18n/lib/i18n-provider.provider.tsx                                | rename | pending |
| i18n/ui/LanguageSwitcher/LanguageSwitcher.tsx                 | i18n/ui/LanguageSwitcher/LanguageSwitcher.smart.tsx                | rename | pending |
| indicators/index.ts                                           | indicators/index.ts                                                | keep   | ok      |
| notifications/providers/ToastProvider.tsx                     | notifications/providers/ToastProvider.provider.tsx                 | rename | pending |
| notifications/ui/ToastContainer.tsx                           | notifications/ui/ToastContainer.smart.tsx                          | rename | pending |
| notifications/hooks/useToast.ts                               | notifications/hooks/useToast.hook.ts                               | rename | pending |
| notifications/hooks/index.ts                                  | notifications/hooks/index.ts                                       | keep   | ok      |
| notifications/types/index.ts                                  | notifications/types/index.ts                                       | keep   | ok      |
| notifications/ui/index.ts                                     | notifications/ui/index.ts                                          | keep   | ok      |
| notifications/index.ts                                        | notifications/index.ts                                             | keep   | ok      |
| profile/ui/indicators/components/CreateIndicatorModal.tsx     | profile/ui/indicators/components/CreateIndicatorModal.modal.tsx    | rename | pending |
| profile/ui/indicators/components/FilterDropdown.tsx           | profile/ui/indicators/components/FilterDropdown.smart.tsx          | rename | pending |
| profile/ui/indicators/components/GenerateIndicatorsModal.tsx  | profile/ui/indicators/components/GenerateIndicatorsModal.modal.tsx | rename | pending |
| profile/ui/indicators/components/IndicatorGroupModal.tsx      | profile/ui/indicators/components/IndicatorGroupModal.modal.tsx     | rename | pending |
| profile/ui/indicators/components/IndicatorGroupsList.tsx      | profile/ui/indicators/components/IndicatorGroupsList.smart.tsx     | rename | pending |
| profile/ui/indicators/components/index.ts                     | profile/ui/indicators/components/index.ts                          | keep   | ok      |
| profile/ui/indicators/index.ts                                | profile/ui/indicators/index.ts                                     | keep   | ok      |
| profile/ui/WorkspaceTree/CreateTableModal.tsx                 | profile/ui/WorkspaceTree/CreateTableModal.modal.tsx                | rename | pending |
| profile/ui/WorkspaceTree/CreateWorkspaceModal.tsx             | profile/ui/WorkspaceTree/CreateWorkspaceModal.modal.tsx            | rename | pending |
| profile/ui/WorkspaceTree/WorkspaceTableTabs.tsx               | profile/ui/WorkspaceTree/WorkspaceTableTabs.smart.tsx              | rename | pending |
| profile/ui/WorkspaceTree/WorkspaceTree.tsx                    | profile/ui/WorkspaceTree/WorkspaceTree.smart.tsx                   | rename | pending |
| profile/ui/WorkspaceTree/index.ts                             | profile/ui/WorkspaceTree/index.ts                                  | keep   | ok      |
| profile/ui/Settings/PasswordStrength/PasswordStrength.tsx     | profile/ui/Settings/PasswordStrength/PasswordStrength.dumb.tsx     | rename | pending |
| profile/ui/Settings/PasswordStrength/index.ts                 | profile/ui/Settings/PasswordStrength/index.ts                      | keep   | ok      |
| profile/ui/Settings/ProfileForm.tsx                           | profile/ui/Settings/ProfileForm.smart.tsx                          | rename | pending |
| profile/ui/Settings/SecurityForm.tsx                          | profile/ui/Settings/SecurityForm.smart.tsx                         | rename | pending |
| profile/ui/Settings/OrganizationTree.tsx                      | profile/ui/Settings/OrganizationTree.smart.tsx                     | rename | pending |
| profile/ui/Settings/index.ts                                  | profile/ui/Settings/index.ts                                       | keep   | ok      |
| profile/ui/ProfileLayout/ProfileLayout.tsx                    | profile/ui/ProfileLayout/ProfileLayout.smart.tsx                   | rename | pending |
| profile/ui/ProfileLayout/LeftPanel.tsx                        | profile/ui/ProfileLayout/LeftPanel.smart.tsx                       | rename | pending |
| profile/ui/ProfileLayout/RightPanel.tsx                       | profile/ui/ProfileLayout/RightPanel.smart.tsx                      | rename | pending |
| profile/ui/ProfileLayout/Sidebar/Sidebar.tsx                  | profile/ui/ProfileLayout/Sidebar/Sidebar.smart.tsx                 | rename | pending |
| profile/ui/ProfileLayout/Sidebar/index.ts                     | profile/ui/ProfileLayout/Sidebar/index.ts                          | keep   | ok      |
| profile/ui/ProfileLayout/index.ts                             | profile/ui/ProfileLayout/index.ts                                  | keep   | ok      |
| profile/ui/index.ts                                           | profile/ui/index.ts                                                | keep   | ok      |
| profile/index.ts                                              | profile/index.ts                                                   | keep   | ok      |
| reference/ui/ReferenceSelector.tsx                            | reference/ui/ReferenceSelector.smart.tsx                           | rename | pending |
| reference/ui/index.ts                                         | reference/ui/index.ts                                              | keep   | ok      |
| reference/index.ts                                            | reference/index.ts                                                 | keep   | ok      |
| seasons/ui/Seasons/AutogenerateModal.tsx                      | seasons/ui/Seasons/AutogenerateModal.modal.tsx                     | rename | pending |
| seasons/ui/Seasons/SeasonModal.tsx                            | seasons/ui/Seasons/SeasonModal.modal.tsx                           | rename | pending |
| seasons/ui/Seasons/index.ts                                   | seasons/ui/Seasons/index.ts                                        | keep   | ok      |
| seasons/ui/index.ts                                           | seasons/ui/index.ts                                                | keep   | ok      |
| seasons/index.ts                                              | seasons/index.ts                                                   | keep   | ok      |
| table/hooks/useKeyboardShortcuts.ts                           | table/hooks/useKeyboardShortcuts.hook.ts                           | rename | pending |
| table/services/cell-formatting.service.ts                     | table/services/cell-formatting.service.ts                          | keep   | ok      |
| table/services/table-grid-api.service.ts                      | table/services/table-grid-api.service.ts                           | keep   | ok      |
| table/services/table.service.ts                               | table/services/table.service.ts                                    | keep   | ok      |
| table/types/cell.types.ts                                     | table/types/cell.types.ts                                          | keep   | ok      |
| table/types/table.types.ts                                    | table/types/table.types.ts                                         | keep   | ok      |
| table/ui/ContextMenu.tsx                                      | table/ui/ContextMenu.smart.tsx                                     | rename | pending |
| table/ui/DynamicTable.tsx                                     | table/ui/DynamicTable.smart.tsx                                    | rename | pending |
| table/ui/FormulaBar.tsx                                       | table/ui/FormulaBar.smart.tsx                                      | rename | pending |
| table/ui/MainToolbar.tsx                                      | table/ui/MainToolbar.dumb.tsx                                      | rename | pending |
| table/ui/SheetTabs.tsx                                        | table/ui/SheetTabs.dumb.tsx                                        | rename | pending |
| table/ui/TableHeader.tsx                                      | table/ui/TableHeader.smart.tsx                                     | rename | pending |
| visualization/lib/adapters/\*.ts                              | visualization/lib/adapters/\*.adapter.ts                           | rename | pending |
| visualization/ui/charts/BarChart/BarChart.tsx                 | visualization/ui/charts/BarChart/BarChart.chart.tsx                | rename | pending |
| visualization/ui/charts/LineChart/LineChart.tsx               | visualization/ui/charts/LineChart/LineChart.chart.tsx              | rename | pending |
| visualization/ui/charts/PieChart/PieChart.tsx                 | visualization/ui/charts/PieChart/PieChart.chart.tsx                | rename | pending |
| visualization/ui/d3/ForceDirectedGraph/ForceDirectedGraph.tsx | visualization/ui/d3/ForceDirectedGraph/ForceDirectedGraph.viz.tsx  | rename | pending |
| visualization/ui/d3/ScatterPlot/ScatterPlot.tsx               | visualization/ui/d3/ScatterPlot/ScatterPlot.viz.tsx                | rename | pending |
| visualization/ui/d3/WaterfallChart/WaterfallChart.tsx         | visualization/ui/d3/WaterfallChart/WaterfallChart.viz.tsx          | rename | pending |
| visualization/ui/d3/ChoroplethMap/ChoroplethMap.tsx           | visualization/ui/d3/ChoroplethMap/ChoroplethMap.viz.tsx            | rename | pending |
| visualization/ui/d3/Sankey/Sankey.tsx                         | visualization/ui/d3/Sankey/Sankey.viz.tsx                          | rename | pending |
| admin/index.ts                                                | admin/index.ts                                                     | keep   | ok      |
| workspaces/index.ts                                           | workspaces/index.ts                                                | keep   | ok      |
| index.ts                                                      | index.ts                                                           | keep   | ok      |

### ui/

| Current File                                 | New File                                   | Action | Status  |
| -------------------------------------------- | ------------------------------------------ | ------ | ------- |
| ui/layout/AuthLayout/AuthLayout.tsx          | ui/layout/AuthLayout/AuthLayout.layout.tsx | rename | pending |
| ui/layout/AuthLayout/index.ts                | ui/layout/AuthLayout/index.ts              | keep   | ok      |
| ui/layout/Footer/Footer.tsx                  | ui/layout/Footer/Footer.smart.tsx          | rename | pending |
| ui/layout/Footer/index.ts                    | ui/layout/Footer/index.ts                  | keep   | ok      |
| ui/layout/Header/Header.tsx                  | ui/layout/Header/Header.smart.tsx          | rename | pending |
| ui/layout/Header/index.ts                    | ui/layout/Header/index.ts                  | keep   | ok      |
| ui/layout/PageLayout/PageLayout.tsx          | ui/layout/PageLayout/PageLayout.layout.tsx | rename | pending |
| ui/layout/PageLayout/index.ts                | ui/layout/PageLayout/index.ts              | keep   | ok      |
| ui/layout/index.ts                           | ui/layout/index.ts                         | keep   | ok      |
| ui/primitives/Button/Button.dumb.tsx         | ui/kit/Button/Button.dumb.tsx              | move   | pending |
| ui/primitives/Button/index.ts                | ui/kit/Button/index.ts                     | move   | pending |
| ui/primitives/IconButton/IconButton.dumb.tsx | ui/kit/IconButton/IconButton.dumb.tsx      | move   | pending |
| ui/primitives/IconButton/index.ts            | ui/kit/IconButton/index.ts                 | move   | pending |
| ui/primitives/Input/Input.dumb.tsx           | ui/kit/Input/Input.dumb.tsx                | move   | pending |
| ui/primitives/Input/index.ts                 | ui/kit/Input/index.ts                      | move   | pending |
| ui/primitives/Logo/Logo.dumb.tsx             | ui/kit/Logo/Logo.dumb.tsx                  | move   | pending |
| ui/primitives/Logo/LogoV2.tsx                | ui/kit/Logo/LogoV2.dumb.tsx                | move   | pending |
| ui/primitives/Logo/index.ts                  | ui/kit/Logo/index.ts                       | move   | pending |
| ui/primitives/Select/Select.dumb.tsx         | ui/kit/Select/Select.dumb.tsx              | move   | pending |
| ui/primitives/Select/index.ts                | ui/kit/Select/index.ts                     | move   | pending |
| ui/primitives/index.ts                       | ui/primitives/index.ts                     | remove | pending |
| ui/index.ts                                  | ui/index.ts                                | keep   | ok      |

### stores/

| Current File              | New File                   | Action | Status  |
| ------------------------- | -------------------------- | ------ | ------- |
| useFormattingStore.ts     | useFormatting.store.ts     | rename | pending |
| useFormulaStore.ts        | useFormula.store.ts        | rename | pending |
| useHistoryStore.ts        | useHistory.store.ts        | rename | pending |
| useReferenceStore.ts      | useReference.store.ts      | rename | pending |
| useSelectionStore.ts      | useSelection.store.ts      | rename | pending |
| useTableReferenceStore.ts | useTableReference.store.ts | rename | pending |
| useTableStore.ts          | useTable.store.ts          | rename | pending |
| useUserStore.ts           | useUser.store.ts           | rename | pending |
| useWorkspaceStore.ts      | useWorkspace.store.ts      | rename | pending |
| index.ts                  | index.ts                   | keep   | ok      |

### lib/

| Current File            | New File                      | Action | Status  |
| ----------------------- | ----------------------------- | ------ | ------- |
| cn.ts                   | cn.lib.ts                     | rename | pending |
| react/SourceTracker.tsx | react/SourceTracker.smart.tsx | rename | pending |
| index.ts                | index.ts                      | keep   | ok      |

### types/

| Current File       | New File           | Action | Status |
| ------------------ | ------------------ | ------ | ------ |
| dictionary.ts      | dictionary.ts      | keep   | ok     |
| enums.ts           | enums.ts           | keep   | ok     |
| index.ts           | index.ts           | keep   | ok     |
| link.types.ts      | link.types.ts      | keep   | ok     |
| reference.types.ts | reference.types.ts | keep   | ok     |
| visualization.ts   | visualization.ts   | keep   | ok     |

### Summary

| Category         | Rename | Move | Keep | Remove | Total |
| ---------------- | ------ | ---- | ---- | ------ | ----- |
| api/hooks/       | 10     | 0    | 1    | 0      | 11    |
| api/             | 18     | 0    | 6    | 0      | 24    |
| modules/\*\*/ui/ | 50+    | 0    | 25+  | 0      | 75+   |
| ui/              | 6      | 11   | 8    | 1      | 26    |
| stores/          | 9      | 0    | 1    | 0      | 10    |
| lib/             | 2      | 0    | 1    | 0      | 3     |
| types/           | 0      | 0    | 5    | 0      | 5     |

- Total files to rename: ~95
- Total files to move: 11
- Total files to remove: 1
- Total files to keep: ~47
- Estimated time: 120-180 minutes
- Requires rollback: Yes
