# Структура проекта shared

Генерировано: Чт 05 фев 2026 21:31:23 +03

/home/ivan/git/elbruso/packages/shared
├── docs
│   ├── COMPONENT_SYSTEM.md
│   ├── MIGRATION_TABLE.md
│   └── PROJECT_TREE.md
├── src
│   ├── api
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
│   │   ├── api-mapping.ts
│   │   ├── api-types.ts
│   │   ├── api-utils.ts
│   │   ├── auth.api.ts
│   │   ├── blocks.api.ts
│   │   ├── client.ts
│   │   ├── config.constant.ts
│   │   ├── countries.api.ts
│   │   ├── create-api.service.ts
│   │   ├── data-contracts.ts
│   │   ├── definitions.ts
│   │   ├── endpoints.ts
│   │   ├── error.ts
│   │   ├── events.api.ts
│   │   ├── formulas.api.ts
│   │   ├── groups.api.ts
│   │   ├── http-client.service.ts
│   │   ├── index.ts
│   │   ├── pages.api.ts
│   │   ├── reference.api.ts
│   │   ├── tables.api.ts
│   │   ├── users.api.ts
│   │   ├── versions.api.ts
│   │   ├── websocket.ws.ts
│   │   └── workspaces.api.ts
│   ├── app
│   │   ├── providers
│   │   │   ├── AppProviders.tsx
│   │   │   └── index.ts
│   │   └── index.ts
│   ├── lib
│   │   ├── react
│   │   │   └── SourceTracker.smart.tsx
│   │   ├── cn.lib.ts
│   │   └── index.ts
│   ├── modules
│   │   ├── admin
│   │   │   └── index.ts
│   │   ├── admin-auth
│   │   │   ├── lib
│   │   │   │   ├── AdminAuthContext.tsx
│   │   │   │   └── ProtectedRoute.tsx
│   │   │   ├── ui
│   │   │   │   ├── AdminLoginForm.tsx
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
│   │   │   └── index.ts
│   │   ├── pages
│   │   │   └── index.ts
│   │   ├── profile
│   │   │   ├── ui
│   │   │   │   ├── indicators
│   │   │   │   │   ├── components
│   │   │   │   │   │   ├── CreateIndicatorModal.tsx
│   │   │   │   │   │   ├── FilterDropdown.smart.tsx
│   │   │   │   │   │   ├── GenerateIndicatorsModal.tsx
│   │   │   │   │   │   ├── index.ts
│   │   │   │   │   │   ├── IndicatorGroupModal.tsx
│   │   │   │   │   │   └── IndicatorGroupsList.smart.tsx
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
│   │   │   └── index.ts
│   │   └── index.ts
│   ├── stores
│   │   ├── index.ts
│   │   ├── useFormatting.store.ts
│   │   ├── useFormula.store.ts
│   │   ├── useHistory.store.ts
│   │   ├── useReference.store.ts
│   │   ├── useSelection.store.ts
│   │   ├── useTableReference.store.ts
│   │   ├── useTable.store.ts
│   │   ├── useUser.store.ts
│   │   └── useWorkspace.store.ts
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
│   │   │   │   ├── Footer.smart.tsx
│   │   │   │   └── index.ts
│   │   │   ├── Header
│   │   │   │   ├── Header.smart.tsx
│   │   │   │   └── index.ts
│   │   │   ├── PageLayout
│   │   │   │   ├── index.ts
│   │   │   │   └── PageLayout.tsx
│   │   │   └── index.ts
│   │   ├── primitives
│   │   │   ├── Button
│   │   │   │   ├── Button.dumb.tsx
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
│   │   │   ├── Select
│   │   │   │   ├── index.ts
│   │   │   │   └── Select.dumb.tsx
│   │   │   └── index.ts
│   │   └── index.ts
│   └── index.ts
├── AGENTS.md
├── package.json
├── tsconfig.json
└── tsconfig.tsbuildinfo

103 directories, 282 files
