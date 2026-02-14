# Implementation Plan: Indicators Page UI Refactoring with HeroUI

Branch: none (direct task)
Created: 2026-02-13

## Settings

- Testing: no
- Logging: standard
- TypeScript: strict

## Overview

Refactor `/indicators` admin page to use HeroUI primitives consistently:

- Replace native `<table>` with HeroUI Table
- Replace native tabs with HeroUI Tabs
- Replace custom FilterDropdown with HeroUI Dropdown
- Add pagination and bulk actions
- Convert groups from cards to table view
- Follow Smart/Dumb component pattern

## Commit Plan

- **Commit 1** (after tasks 1-3): "refactor: replace FilterDropdown with HeroUI Dropdown"
- **Commit 2** (after tasks 4-6): "feat: add indicators table with pagination & bulk"
- **Commit 3** (after tasks 7-9): "refactor: convert groups to table view"
- **Commit 4** (after tasks 10): "refactor: update modals with HeroUI primitives"

## Tasks

### Phase 1: Filter Dropdown HeroUI

- [x] **Task 1**: Replace FilterDropdown.smart.tsx with HeroUI Dropdown
- [x] **Task 2**: Create FilterDropdown.dumb.tsx for dumb component
- [x] **Task 3**: Add FilterDropdown barrel export

### Phase 2: Indicators Table with Pagination & Bulk

- [x] **Task 4**: Create IndicatorsTable.dumb.tsx
- [x] **Task 5**: Create IndicatorsTable.smart.tsx with pagination & bulk
- [x] **Task 6**: Add IndicatorsTable barrel export

### Phase 3: Groups Table View

- [x] **Task 7**: Create IndicatorGroupsTable.dumb.tsx
- [x] **Task 8**: Create IndicatorGroupsTable.smart.tsx

### Phase 4: Page & Modal Refactoring

- [x] **Task 9**: Update main indicators page with new components
- [x] **Task 10**: Refactor modals with HeroUI primitives

### Phase 5: Button Primitive Fix

- [x] **Task 11**: Fix Button primitive with auto-detect icons
      Description: |
      Improve Button primitive to auto-detect icon in children and render properly.
  - Auto-detect if children is ReactElement (icon) and render correctly
  - Follow DESIGN_SYSTEM.md styles:
    - Primary: bg-zinc-900, hover bg-zinc-800
    - Secondary: border-zinc-200 bg-white, hover bg-zinc-50
    - rounded-md instead of rounded-8
    - flex items-center gap-2
  - Add sizes: sm (h-8), md (h-9), lg (h-10)
  - Icon size: h-4 w-4
    Files:
  - Modify: packages/frontend/src/ui/primitives/Button/Button.dumb.tsx
  - Modify: apps/app-admin/src/app/(admin)/indicators/page.tsx
    activeForm: "Fixing Button primitive with auto-detect icons"

## Dependencies

- Task 2 → Task 1 (dumb before smart)
- Task 3 → Task 2 (exports after components)
- Task 4 → Task 3 (depends on FilterDropdown for filtering)
- Task 5 → Task 4 (smart depends on dumb)
- Task 6 → Task 5 (exports after components)
- Task 7 → Task 6 (after understanding table structure)
- Task 8 → Task 7 (smart depends on dumb)
- Task 9 → Tasks 5, 8 (uses new components)
- Task 10 → independent

## API Endpoints Used

- `referenceApi.indicatorsControllerFindAll()` - list indicators
- `referenceApi.indicatorsControllerDelete(id)` - delete indicator
- `referenceApi.indicatorsControllerCreate()` - create indicator
- `referenceApi.indicatorsControllerGetTemplates()` - get templates
- `referenceApi.indicatorsControllerGenerate()` - generate from templates
- `referenceApi.indicatorsControllerGetGroups()` - list groups
- `referenceApi.indicatorsControllerCreateGroup()` - create group
- `referenceApi.indicatorsControllerUpdateGroup()` - update group
- `referenceApi.indicatorsControllerDeleteGroup()` - delete group
- `referenceApi.sportsControllerFindAll()` - get sports list

## HeroUI Primitives Required

- `Table`, `TableHeader`, `TableBody`, `TableColumn`, `TableRow`, `TableCell`
- `Checkbox`
- `Dropdown`, `DropdownTrigger`, `DropdownMenu`, `DropdownItem`
- `Tabs`, `TabsList`, `TabsTrigger`, `TabsContent`
- `Button`
- `Input`, `Textarea` (if available) or Input with textarea
- `Select`, `SelectItem`
- `Card` (for empty states)
- `Chip` (for status/scope badges)

## Breaking Changes

- FilterDropdown props remain the same (backward compatible)
- Page structure changes but functionality preserved
- Groups view changes from cards to table (API unchanged)

## Rollback Plan

- Keep old components in `.old/` folder during refactor
- Revert to old components if issues arise
- Delete `.old/` after successful testing
