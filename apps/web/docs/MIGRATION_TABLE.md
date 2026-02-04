# apps/web Migration Table

> Генерировано: Ср 04 Feb 2026
> Основано на: /docs/COMPONENT_SYSTEM_MIGRATION.md section 9

---

## app/(auth)/

| Current File             | New File                      | Action | Status  |
| ------------------------ | ----------------------------- | ------ | ------- |
| forgot-password/page.tsx | forgot-password/page.page.tsx | rename | pending |
| login/page.tsx           | login/page.page.tsx           | rename | pending |
| register/page.tsx        | register/page.page.tsx        | rename | pending |
| reset-password/page.tsx  | reset-password/page.page.tsx  | rename | pending |
| layout.tsx               | layout.layout.tsx             | rename | pending |

## app/(profile)/

| Current File                     | New File                              | Action | Status  |
| -------------------------------- | ------------------------------------- | ------ | ------- |
| dashboard/page.tsx               | dashboard/page.page.tsx               | rename | pending |
| indicators/page.tsx              | indicators/page.page.tsx              | rename | pending |
| organizations/page.tsx           | organizations/page.page.tsx           | rename | pending |
| seasons/page.tsx                 | seasons/page.page.tsx                 | rename | pending |
| settings/page.tsx                | settings/page.page.tsx                | rename | pending |
| tables/[id]/page.tsx             | tables/[id]/page.page.tsx             | rename | pending |
| tables-test/page.tsx             | tables-test/page.page.tsx             | rename | pending |
| workspace/[workspaceId]/page.tsx | workspace/[workspaceId]/page.page.tsx | rename | pending |
| workspace/page.tsx               | workspace/page.page.tsx               | rename | pending |
| workspaces/page.tsx              | workspaces/page.page.tsx              | rename | pending |
| layout.tsx                       | layout.layout.tsx                     | rename | pending |

## app/

| Current File | New File          | Action | Status  |
| ------------ | ----------------- | ------ | ------- |
| layout.tsx   | layout.layout.tsx | rename | pending |
| page.tsx     | page.page.tsx     | rename | pending |

## components/home/

| Current File                                | New File                                          | Action | Status  |
| ------------------------------------------- | ------------------------------------------------- | ------ | ------- |
| Brands/Brands.tsx                           | Brands/Brands.smart.tsx                           | rename | pending |
| ChartsShowcase/ChartsShowcase.tsx           | ChartsShowcase/ChartsShowcase.smart.tsx           | rename | pending |
| DataWavesBackground/DataWavesBackground.tsx | DataWavesBackground/DataWavesBackground.smart.tsx | rename | pending |
| Footer/Footer.tsx                           | Footer/Footer.smart.tsx                           | rename | pending |
| Header/Header.tsx                           | Header/Header.smart.tsx                           | rename | pending |
| Hero/Hero.tsx                               | Hero/Hero.smart.tsx                               | rename | pending |
| HomePage/HomePage.tsx                       | HomePage/HomePage.smart.tsx                       | rename | pending |
| InteractiveGrid/InteractiveGrid.tsx         | InteractiveGrid/InteractiveGrid.smart.tsx         | rename | pending |
| LiveSportsChart/LiveSportsChart.tsx         | LiveSportsChart/LiveSportsChart.smart.tsx         | rename | pending |
| LiveSportsChart/chartConfig.ts              | LiveSportsChart/chartConfig.constant.ts           | rename | pending |
| ProductsShowcase/ProductsShowcase.tsx       | ProductsShowcase/ProductsShowcase.smart.tsx       | rename | pending |

## hooks/

| Current File               | New File | Action | Status |
| -------------------------- | -------- | ------ | ------ |
| (directory does not exist) |          |        |        |

## stores/

| Current File               | New File | Action | Status |
| -------------------------- | -------- | ------ | ------ |
| (directory does not exist) |          |        |        |

## Summary

- Total files to rename: 29
- Total files to move: 0
- Estimated time: 15-20 minutes
- Requires rollback: Yes

## Rollback Plan

1. Run: `git checkout HEAD -- apps/web/src/`
2. Restore all renamed files to original names
3. Verify app functionality after rollback

## Next Steps

1. Review this migration table
2. Run: `npx ts-migrate rename --dry-run apps/web/src/`
3. Execute rename operations
4. Update all imports referencing renamed files
5. Run TypeScript check: `cd apps/web && npx tsc --noEmit`
6. Run linter: `cd apps/web && npm run lint`
7. Verify build: `cd apps/web && npm run build`
