# Структура проекта frontend

Генерировано: Пн 16 фев 2026 21:15:23 +03

/home/ivan/git/elbruso/packages/frontend
├── docs
│   ├── COMPONENT_SYSTEM.md
│   ├── MIGRATION_TABLE.md
│   └── PROJECT_TREE.md
├── src
│   ├── api
│   │   ├── admin
│   │   │   ├── admin-organizations.api.ts
│   │   │   ├── auth.ts
│   │   │   ├── client.ts
│   │   │   └── index.ts
│   │   ├── hooks
│   │   │   ├── index.ts
│   │   │   ├── queryClient.hook.ts
│   │   │   ├── ReactQueryProvider.tsx
│   │   │   ├── useAuth.hook.ts
│   │   │   ├── useCountries.hook.ts
│   │   │   ├── useForgotPassword.hook.ts
│   │   │   ├── useOrganizations.hook.ts
│   │   │   ├── useReference.hook.ts
│   │   │   ├── useResetPassword.hook.ts
│   │   │   ├── useUsers.hook.ts
│   │   │   └── useWorkspaces.hook.ts
│   │   ├── admin.api.ts
│   │   ├── Admin.ts
│   │   ├── api-mapping.ts
│   │   ├── api-types.ts
│   │   ├── api-utils.ts
│   │   ├── auth.api.ts
│   │   ├── auth-client.ts
│   │   ├── Auth.ts
│   │   ├── blocks.api.ts
│   │   ├── Blocks.ts
│   │   ├── client.ts
│   │   ├── config.constant.ts
│   │   ├── countries.api.ts
│   │   ├── Countries.ts
│   │   ├── create-api.service.ts
│   │   ├── data-contracts.ts
│   │   ├── definitions.ts
│   │   ├── endpoints.ts
│   │   ├── error.ts
│   │   ├── events.api.ts
│   │   ├── Events.ts
│   │   ├── formulas.api.ts
│   │   ├── Formulas.ts
│   │   ├── groups.api.ts
│   │   ├── Groups.ts
│   │   ├── Health.ts
│   │   ├── http-client.service.ts
│   │   ├── http-client.ts
│   │   ├── index.ts
│   │   ├── pages.api.ts
│   │   ├── Pages.ts
│   │   ├── rbac.api.ts
│   │   ├── reference.api.ts
│   │   ├── Reference.ts
│   │   ├── tables.api.ts
│   │   ├── Tables.ts
│   │   ├── users.api.ts
│   │   ├── Users.ts
│   │   ├── versions.api.ts
│   │   ├── Versions.ts
│   │   ├── websocket.ws.ts
│   │   ├── workspaces.api.ts
│   │   ├── Workspaces.ts
│   │   ├── workspace-template.api.ts
│   │   └── WorkspaceTemplates.ts
│   ├── app
│   │   ├── providers
│   │   │   ├── AppProviders.tsx
│   │   │   └── index.ts
│   │   └── index.ts
│   ├── build
│   │   └── plugins
│   │       └── inject-source.cjs
│   ├── lib
│   │   ├── react
│   │   │   └── SourceTracker.smart.tsx
│   │   ├── cn.lib.ts
│   │   └── index.ts
│   ├── modules
│   │   ├── admin
│   │   │   ├── api
│   │   │   ├── auth
│   │   │   │   ├── lib
│   │   │   │   │   ├── AdminAuthContext.tsx
│   │   │   │   │   └── ProtectedRoute.tsx
│   │   │   │   ├── ui
│   │   │   │   │   ├── AdminLoginForm.tsx
│   │   │   │   │   ├── auth.css
│   │   │   │   │   └── index.ts
│   │   │   │   └── index.ts
│   │   │   ├── ui
│   │   │   │   ├── AdminLayout
│   │   │   │   │   ├── AdminLayout.smart.tsx
│   │   │   │   │   └── AdminRightPanel.smart.tsx
│   │   │   │   ├── AdminLeftPanel
│   │   │   │   │   ├── AdminLeftPanel.smart.tsx
│   │   │   │   │   └── index.ts
│   │   │   │   ├── AdminRoles
│   │   │   │   │   ├── AdminRoles.page.tsx
│   │   │   │   │   └── index.ts
│   │   │   │   ├── Admins
│   │   │   │   │   ├── index.ts
│   │   │   │   │   └── page.tsx
│   │   │   │   ├── AdminSettings
│   │   │   │   │   ├── AdminSettings.smart.tsx
│   │   │   │   │   ├── CreateAdminModal.tsx
│   │   │   │   │   ├── EditAdminModal.tsx
│   │   │   │   │   ├── ProfileSettings.smart.tsx
│   │   │   │   │   └── UserManagement.smart.tsx
│   │   │   │   ├── AdminTemplateTree
│   │   │   │   │   ├── AdminTemplateTree.smart.tsx
│   │   │   │   │   ├── CreateTemplateModal.smart.tsx
│   │   │   │   │   └── index.ts
│   │   │   │   ├── Menu
│   │   │   │   │   ├── admin.menu.ts
│   │   │   │   │   ├── AdminMenu.tsx
│   │   │   │   │   └── index.ts
│   │   │   │   ├── Organizations
│   │   │   │   │   ├── CreateOrganizationModal.tsx
│   │   │   │   │   ├── DeleteConfirmationModal.tsx
│   │   │   │   │   ├── EditOrganizationModal.tsx
│   │   │   │   │   ├── OrganizationsFilters.tsx
│   │   │   │   │   ├── OrganizationsList.tsx
│   │   │   │   │   ├── OrganizationsSmart.tsx
│   │   │   │   │   └── OrganizationsTree.tsx
│   │   │   │   ├── ReferenceData
│   │   │   │   │   ├── Events
│   │   │   │   │   │   ├── EventFormModal.tsx
│   │   │   │   │   │   ├── EventsFilters.tsx
│   │   │   │   │   │   ├── EventsList.tsx
│   │   │   │   │   │   ├── EventsManagementSmart.tsx
│   │   │   │   │   │   └── index.ts
│   │   │   │   │   ├── LicenseCategories
│   │   │   │   │   │   ├── index.ts
│   │   │   │   │   │   ├── LicenseCategoriesFilters.tsx
│   │   │   │   │   │   ├── LicenseCategoriesList.tsx
│   │   │   │   │   │   ├── LicenseCategoriesSmart.tsx
│   │   │   │   │   │   └── LicenseCategoryFormModal.tsx
│   │   │   │   │   ├── Management
│   │   │   │   │   │   ├── index.ts
│   │   │   │   │   │   ├── ReferenceManagerForm.tsx
│   │   │   │   │   │   └── ReferenceManagerPage.tsx
│   │   │   │   │   └── UniversalTable
│   │   │   │   │       ├── index.ts
│   │   │   │   │       ├── ReferenceFormModal.tsx
│   │   │   │   │       ├── ReferenceTablePage.tsx
│   │   │   │   │       └── table-configs.ts
│   │   │   │   ├── RolesManagement
│   │   │   │   │   ├── index.ts
│   │   │   │   │   └── RolesManagement.tsx
│   │   │   │   ├── UserRoles
│   │   │   │   │   ├── index.ts
│   │   │   │   │   └── UserRoles.page.tsx
│   │   │   │   ├── Users
│   │   │   │   │   ├── roles
│   │   │   │   │   │   ├── index.ts
│   │   │   │   │   │   └── page.tsx
│   │   │   │   │   ├── index.ts
│   │   │   │   │   └── page.tsx
│   │   │   │   └── index.ts
│   │   │   └── index.ts
│   │   ├── auth
│   │   │   ├── lib
│   │   │   │   ├── AuthContext.tsx
│   │   │   │   ├── index.ts
│   │   │   │   └── ProtectedRoute.smart.tsx
│   │   │   ├── ui
│   │   │   │   ├── auth.css
│   │   │   │   ├── index.ts
│   │   │   │   ├── LoginForm.smart.tsx
│   │   │   │   ├── RegisterForm.smart.tsx
│   │   │   │   └── ResetPasswordForm.smart.tsx
│   │   │   └── index.ts
│   │   ├── dashboard
│   │   │   └── index.ts
│   │   ├── events
│   │   │   └── index.ts
│   │   ├── i18n
│   │   │   ├── lib
│   │   │   │   ├── language
│   │   │   │   │   ├── index.ts
│   │   │   │   │   └── LanguageContext.tsx
│   │   │   │   ├── I18nProvider.tsx
│   │   │   │   └── index.ts
│   │   │   ├── ui
│   │   │   │   └── LanguageSwitcher
│   │   │   │       ├── index.ts
│   │   │   │       ├── LanguageSwitcher.css
│   │   │   │       └── LanguageSwitcher.smart.tsx
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
│   │   │   │   └── ToastContainer.smart.tsx
│   │   │   ├── index.ts
│   │   │   └── toast.service.ts
│   │   ├── pages
│   │   │   └── index.ts
│   │   ├── profile
│   │   │   ├── ui
│   │   │   │   ├── indicators
│   │   │   │   │   ├── components
│   │   │   │   │   │   ├── CreateIndicatorModal.tsx
│   │   │   │   │   │   ├── FilterDropdown.dumb.tsx
│   │   │   │   │   │   ├── FilterDropdown.smart.tsx
│   │   │   │   │   │   ├── GenerateIndicatorsModal.tsx
│   │   │   │   │   │   ├── index.ts
│   │   │   │   │   │   ├── IndicatorGroupModal.tsx
│   │   │   │   │   │   ├── IndicatorGroupsList.smart.tsx
│   │   │   │   │   │   ├── IndicatorGroupsTable.dumb.tsx
│   │   │   │   │   │   ├── IndicatorGroupsTable.smart.tsx
│   │   │   │   │   │   ├── IndicatorsTable.dumb.tsx
│   │   │   │   │   │   └── IndicatorsTable.smart.tsx
│   │   │   │   │   └── index.ts
│   │   │   │   ├── ProfileLayout
│   │   │   │   │   ├── Sidebar
│   │   │   │   │   │   ├── index.ts
│   │   │   │   │   │   └── Sidebar.smart.tsx
│   │   │   │   │   ├── index.ts
│   │   │   │   │   ├── LeftPanel.smart.tsx
│   │   │   │   │   ├── ProfileLayout.smart.tsx
│   │   │   │   │   └── RightPanel.smart.tsx
│   │   │   │   ├── Settings
│   │   │   │   │   ├── PasswordStrength
│   │   │   │   │   │   ├── index.ts
│   │   │   │   │   │   ├── PasswordStrength.css
│   │   │   │   │   │   └── PasswordStrength.dumb.tsx
│   │   │   │   │   ├── index.ts
│   │   │   │   │   ├── OrganizationTree.smart.tsx
│   │   │   │   │   ├── ProfileForm.smart.tsx
│   │   │   │   │   └── SecurityForm.smart.tsx
│   │   │   │   ├── WorkspaceTree
│   │   │   │   │   ├── CreateTableModal.tsx
│   │   │   │   │   ├── CreateWorkspaceModal.tsx
│   │   │   │   │   ├── index.ts
│   │   │   │   │   ├── WorkspaceTableTabs.smart.tsx
│   │   │   │   │   └── WorkspaceTree.smart.tsx
│   │   │   │   └── index.ts
│   │   │   └── index.ts
│   │   ├── reference
│   │   │   ├── ui
│   │   │   │   ├── index.ts
│   │   │   │   └── ReferenceSelector.smart.tsx
│   │   │   └── index.ts
│   │   ├── seasons
│   │   │   ├── ui
│   │   │   │   ├── Seasons
│   │   │   │   │   ├── AutogenerateModal.tsx
│   │   │   │   │   ├── index.ts
│   │   │   │   │   └── SeasonModal.tsx
│   │   │   │   └── index.ts
│   │   │   └── index.ts
│   │   ├── sports
│   │   │   └── index.ts
│   │   ├── table
│   │   │   ├── hooks
│   │   │   │   └── useKeyboardShortcuts.hook.ts
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
│   │   │   │   ├── ContextMenu.smart.tsx
│   │   │   │   ├── DynamicTable.smart.tsx
│   │   │   │   ├── FormulaBar.smart.tsx
│   │   │   │   ├── index.ts
│   │   │   │   ├── MainToolbar.dumb.tsx
│   │   │   │   ├── SheetTabs.dumb.tsx
│   │   │   │   ├── TableHeader.smart.tsx
│   │   │   │   └── TableTheme.css
│   │   │   └── index.ts
│   │   ├── users
│   │   │   ├── api
│   │   │   │   └── users.api.ts
│   │   │   ├── hooks
│   │   │   │   └── useUsersPermissions.ts
│   │   │   ├── stores
│   │   │   │   └── useUsersPageStore.ts
│   │   │   ├── types
│   │   │   │   └── users.types.ts
│   │   │   ├── ui
│   │   │   │   ├── UserEditorModal.tsx
│   │   │   │   ├── UsersFilters.tsx
│   │   │   │   └── UsersTable.tsx
│   │   │   └── index.ts
│   │   ├── visualization
│   │   │   ├── lib
│   │   │   │   ├── adapters
│   │   │   │   │   ├── AreaChartAdapter.ts
│   │   │   │   │   ├── BarChartAdapter.ts
│   │   │   │   │   ├── BoxPlotAdapter.ts
│   │   │   │   │   ├── BubbleChartAdapter.ts
│   │   │   │   │   ├── BubbleMapAdapter.ts
│   │   │   │   │   ├── CalendarHeatmapAdapter.ts
│   │   │   │   │   ├── CandlestickAdapter.ts
│   │   │   │   │   ├── ChordAdapter.ts
│   │   │   │   │   ├── ChoroplethMapAdapter.ts
│   │   │   │   │   ├── CorrelationMatrixAdapter.ts
│   │   │   │   │   ├── ForceDirectedGraphAdapter.ts
│   │   │   │   │   ├── GanttAdapter.ts
│   │   │   │   │   ├── GeoHeatMapAdapter.ts
│   │   │   │   │   ├── GroupedBarChartAdapter.ts
│   │   │   │   │   ├── HeatmapAdapter.ts
│   │   │   │   │   ├── HistogramAdapter.ts
│   │   │   │   │   ├── LineChartAdapter.ts
│   │   │   │   │   ├── ParallelCoordinatesAdapter.ts
│   │   │   │   │   ├── PieChartAdapter.ts
│   │   │   │   │   ├── RadarChartAdapter.ts
│   │   │   │   │   ├── RadialBarChartAdapter.ts
│   │   │   │   │   ├── RidgelinePlotAdapter.ts
│   │   │   │   │   ├── SankeyAdapter.ts
│   │   │   │   │   ├── ScatterPlotAdapter.ts
│   │   │   │   │   ├── StackedBarChartAdapter.ts
│   │   │   │   │   ├── StreamGraphAdapter.ts
│   │   │   │   │   ├── SunburstAdapter.ts
│   │   │   │   │   ├── ViolinPlotAdapter.ts
│   │   │   │   │   └── WaterfallChartAdapter.ts
│   │   │   │   └── index.ts
│   │   │   ├── ui
│   │   │   │   ├── charts
│   │   │   │   │   ├── BarChart
│   │   │   │   │   │   ├── BarChart.tsx
│   │   │   │   │   │   └── index.ts
│   │   │   │   │   ├── LineChart
│   │   │   │   │   │   ├── index.ts
│   │   │   │   │   │   └── LineChart.tsx
│   │   │   │   │   ├── PieChart
│   │   │   │   │   │   ├── index.ts
│   │   │   │   │   │   └── PieChart.tsx
│   │   │   │   │   └── index.ts
│   │   │   │   ├── d3
│   │   │   │   │   ├── AreaChart
│   │   │   │   │   │   ├── AreaChart.tsx
│   │   │   │   │   │   └── index.ts
│   │   │   │   │   ├── BoxPlot
│   │   │   │   │   │   ├── BoxPlot.tsx
│   │   │   │   │   │   └── index.ts
│   │   │   │   │   ├── BubbleChart
│   │   │   │   │   │   ├── BubbleChart.tsx
│   │   │   │   │   │   └── index.ts
│   │   │   │   │   ├── BubbleMap
│   │   │   │   │   │   ├── BubbleMap.tsx
│   │   │   │   │   │   └── index.ts
│   │   │   │   │   ├── CalendarHeatmap
│   │   │   │   │   │   ├── CalendarHeatmap.tsx
│   │   │   │   │   │   └── index.ts
│   │   │   │   │   ├── Candlestick
│   │   │   │   │   │   ├── Candlestick.tsx
│   │   │   │   │   │   └── index.ts
│   │   │   │   │   ├── Chord
│   │   │   │   │   │   ├── Chord.tsx
│   │   │   │   │   │   └── index.ts
│   │   │   │   │   ├── ChoroplethMap
│   │   │   │   │   │   ├── ChoroplethMap.tsx
│   │   │   │   │   │   └── index.ts
│   │   │   │   │   ├── CorrelationMatrix
│   │   │   │   │   │   ├── CorrelationMatrix.tsx
│   │   │   │   │   │   └── index.ts
│   │   │   │   │   ├── DonutChart
│   │   │   │   │   │   ├── DonutChart.tsx
│   │   │   │   │   │   └── index.ts
│   │   │   │   │   ├── ForceDirectedGraph
│   │   │   │   │   │   ├── ForceDirectedGraph.tsx
│   │   │   │   │   │   └── index.ts
│   │   │   │   │   ├── Gantt
│   │   │   │   │   │   ├── Gantt.tsx
│   │   │   │   │   │   └── index.ts
│   │   │   │   │   ├── GeoHeatMap
│   │   │   │   │   │   ├── GeoHeatMap.tsx
│   │   │   │   │   │   └── index.ts
│   │   │   │   │   ├── GroupedBarChart
│   │   │   │   │   │   ├── GroupedBarChart.tsx
│   │   │   │   │   │   └── index.ts
│   │   │   │   │   ├── Heatmap
│   │   │   │   │   │   ├── Heatmap.tsx
│   │   │   │   │   │   └── index.ts
│   │   │   │   │   ├── Histogram
│   │   │   │   │   │   ├── Histogram.tsx
│   │   │   │   │   │   └── index.ts
│   │   │   │   │   ├── ParallelCoordinates
│   │   │   │   │   │   ├── index.ts
│   │   │   │   │   │   └── ParallelCoordinates.tsx
│   │   │   │   │   ├── RadarChart
│   │   │   │   │   │   ├── index.ts
│   │   │   │   │   │   └── RadarChart.tsx
│   │   │   │   │   ├── RadialBarChart
│   │   │   │   │   │   ├── index.ts
│   │   │   │   │   │   └── RadialBarChart.tsx
│   │   │   │   │   ├── RidgelinePlot
│   │   │   │   │   │   ├── index.ts
│   │   │   │   │   │   └── RidgelinePlot.tsx
│   │   │   │   │   ├── Sankey
│   │   │   │   │   │   ├── index.ts
│   │   │   │   │   │   └── Sankey.tsx
│   │   │   │   │   ├── ScatterPlot
│   │   │   │   │   │   ├── index.ts
│   │   │   │   │   │   └── ScatterPlot.tsx
│   │   │   │   │   ├── Sparkline
│   │   │   │   │   │   ├── index.ts
│   │   │   │   │   │   └── Sparkline.tsx
│   │   │   │   │   ├── StackedBarChart
│   │   │   │   │   │   ├── index.ts
│   │   │   │   │   │   └── StackedBarChart.tsx
│   │   │   │   │   ├── StreamGraph
│   │   │   │   │   │   ├── index.ts
│   │   │   │   │   │   └── StreamGraph.tsx
│   │   │   │   │   ├── Sunburst
│   │   │   │   │   │   ├── index.ts
│   │   │   │   │   │   └── Sunburst.tsx
│   │   │   │   │   ├── ViolinPlot
│   │   │   │   │   │   ├── index.ts
│   │   │   │   │   │   └── ViolinPlot.tsx
│   │   │   │   │   ├── WaterfallChart
│   │   │   │   │   │   ├── index.ts
│   │   │   │   │   │   └── WaterfallChart.tsx
│   │   │   │   │   └── index.ts
│   │   │   │   └── index.ts
│   │   │   └── index.ts
│   │   ├── workspaces
│   │   │   ├── ui
│   │   │   │   └── AdminWorkspacesSmart.tsx
│   │   │   └── index.ts
│   │   └── index.ts
│   ├── stores
│   │   ├── index.ts
│   │   ├── useAdminAuth.store.ts
│   │   ├── useAdminSettings.store.ts
│   │   ├── useFormatting.store.ts
│   │   ├── useFormula.store.ts
│   │   ├── useHistory.store.ts
│   │   ├── useOrganizationsStore.ts
│   │   ├── useReference.store.ts
│   │   ├── useSelection.store.ts
│   │   ├── useTableReference.store.ts
│   │   ├── useTableStore.ts
│   │   ├── useUser.store.ts
│   │   ├── useWorkspace.store.ts
│   │   └── useWorkspaceTemplate.store.ts
│   ├── types
│   │   ├── admin.types.ts
│   │   ├── api-response.ts
│   │   ├── dictionary.ts
│   │   ├── enums.ts
│   │   ├── index.ts
│   │   ├── link.types.ts
│   │   ├── rbac.ts
│   │   ├── reference.types.ts
│   │   └── visualization.ts
│   ├── ui
│   │   ├── layout
│   │   │   ├── AuthLayout
│   │   │   │   ├── AuthLayout.css
│   │   │   │   ├── AuthLayout.tsx
│   │   │   │   └── index.ts
│   │   │   ├── Footer
│   │   │   │   ├── Footer.smart.tsx
│   │   │   │   └── index.ts
│   │   │   ├── Header
│   │   │   │   ├── Header.smart.tsx
│   │   │   │   └── index.ts
│   │   │   ├── ProfilePageLayout
│   │   │   │   ├── index.ts
│   │   │   │   └── ProfilePageLayout.tsx
│   │   │   └── index.ts
│   │   ├── primitives
│   │   │   ├── Button
│   │   │   │   ├── Button.dumb.tsx
│   │   │   │   └── index.ts
│   │   │   ├── Checkbox
│   │   │   │   ├── Checkbox.tsx
│   │   │   │   └── index.ts
│   │   │   ├── ConfirmDialog
│   │   │   │   ├── ConfirmDialog.dumb.tsx
│   │   │   │   └── index.ts
│   │   │   ├── IconButton
│   │   │   │   ├── IconButton.dumb.tsx
│   │   │   │   └── index.ts
│   │   │   ├── Input
│   │   │   │   ├── index.ts
│   │   │   │   ├── Input.css
│   │   │   │   └── Input.dumb.tsx
│   │   │   ├── Logo
│   │   │   │   ├── index.ts
│   │   │   │   ├── Logo.dumb.tsx
│   │   │   │   └── LogoV2.tsx
│   │   │   ├── Modal
│   │   │   │   ├── index.ts
│   │   │   │   └── Modal.tsx
│   │   │   ├── PermissionsTree
│   │   │   │   ├── index.ts
│   │   │   │   └── PermissionsTree.tsx
│   │   │   ├── RoleCard
│   │   │   │   ├── index.ts
│   │   │   │   └── RoleCard.tsx
│   │   │   ├── RolePermissionsEditor
│   │   │   │   ├── index.ts
│   │   │   │   └── RolePermissionsEditor.tsx
│   │   │   ├── Select
│   │   │   │   ├── index.ts
│   │   │   │   └── Select.dumb.tsx
│   │   │   ├── Table
│   │   │   │   ├── index.ts
│   │   │   │   └── Table.dumb.tsx
│   │   │   └── index.ts
│   │   └── index.ts
│   └── index.ts
├── AGENTS.md
├── package.json
├── tsconfig.json
└── tsconfig.tsbuildinfo

139 directories, 394 files
