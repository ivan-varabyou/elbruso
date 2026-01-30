# Skill: task

Standard development workflow for Elbruso. Use this template for any new feature or task.

## Quick Start

When given a task, follow this workflow:

```
1. Analyze → 2. Design → 3. Backend → 4. Frontend → 5. Test
```

---

## Step 1: Analysis

### Read the Task

1. Understand the user story/requirement
2. Identify the business goal
3. Clarify acceptance criteria

### Check Existing Architecture

1. Which bounded context does this belong to?
   - Run: `ls apps/api/src/services/`
   - Run: `ls packages/frontend/modules/`

2. Does a contract already exist?
   - Check: `apps/api/src/contracts/http/`
   - Check: `apps/api/src/contracts/events/`

3. Check domain model:
   - Reference: @project-schema
   - Run: `ls apps/api/src/contracts/schemas/`

### Questions to Answer

- Is this a new bounded context or existing?
- What entities are affected?
- Are there related events?
- What permissions are needed?

---

## Step 2: Design

### API Design (if new endpoint)

1. Create OpenAPI spec: `apps/api/src/contracts/http/{context}.openapi.yaml`

```yaml
paths:
  /{resource}:
    get:
      summary: Get all resources
      tags: [Resource]
      responses:
        '200':
          description: List of resources
          content:
            application/json:
              schema:
                type: array
                items:
                  $ref: '#/components/schemas/Resource'
```

2. Create event schemas (if publishing events): `apps/api/src/contracts/events/{event}.event.json`

3. Run codegen: `pnpm generate:types`

### Frontend Design

1. New module needed?
   - Path: `packages/frontend/modules/{module-name}/`
   - Reference: @foed-frontend

2. New page needed?
   - Path: `apps/web/pages/{section}/`

3. Check design system: @design-system

---

## Step 3: Backend Implementation

### Follow: @foed-backend

### Directory Structure

```
apps/api/src/services/{bounded-context}/
├── app/
│   ├── commands/
│   │   └── {Action}.handler.ts
│   ├── queries/
│   │   └── {Get}.handler.ts
│   └── index.ts
├── domain/
│   ├── aggregates/
│   │   └── {Aggregate}.ts
│   ├── entities/
│   └── valueObjects/
├── infra/
│   ├── persistence/
│   │   └── {Aggregate}.repository.ts
│   ├── http/
│   │   └── controllers/
│   └── messaging/
└── index.ts
```

### Implementation Order

1. **Domain Layer**
   - Create/update aggregate
   - Add entities and value objects
   - Define domain events

2. **Application Layer**
   - Create command/query handler
   - Add validation
   - Map DTOs

3. **Infrastructure Layer**
   - Implement repository
   - Create HTTP controller
   - Add event producer (if needed)

### Rules

- Domain never imports app or infra
- App imports domain, uses interfaces for infra
- Infra implements domain interfaces
- No cross-context imports (use events)

---

## Step 4: Frontend Implementation

### Follow: @foed-frontend

### Directory Structure

```
packages/frontend/modules/{module-name}/
├── api/
│   ├── endpoints.ts
│   └── dto.ts
├── events/
│   └── {event}.publisher.ts
├── services/
│   └── {service}.ts
├── ui/
│   ├── {ModuleName}List.tsx
│   ├── {ModuleName}Detail.tsx
│   └── {ModuleName}Form.tsx
└── _modules/
    └── {submodule}/
```

### For New Page

```
apps/web/pages/{section}/
├── index.tsx
├── {page}.tsx
└── _components/
    └── {Component}.tsx
```

### Using Design System

Reference: @design-system

- Use zinc palette for all UI
- Follow component patterns
- Use Tailwind classes
- Add proper accessibility

---

## Step 5: Testing

### Backend Tests

```
{service}/tests/
├── unit/
│   ├── domain/
│   ├── app/
│   └── infra/
├── integration/
│   ├── http/
│   └── persistence/
└── e2e/
```

### Frontend Tests

```
apps/web/tests/
├── unit/
├── integration/
└── e2e/
```

### Contract Tests

```typescript
import { validateContract } from '../../tools/architecture/validate-contracts';

describe('Contract Validation', () => {
  it('API matches OpenAPI spec', () => {
    validateContract('users');
  });
});
```

---

## Example Workflow

### Task: "Add export to PDF for reports"

#### Step 1: Analysis

- Bounded context: `reports` (existing)
- Entities: `Report`, `ReportTemplate`
- Check: `apps/api/src/contracts/http/reports.openapi.yaml` exists

#### Step 2: Design

- New endpoint: `POST /reports/{id}/export-pdf`
- New event: `ReportExportedEvent`
- Frontend: Export button in report detail page

#### Step 3: Backend

```typescript
// domain/events/report.events.ts
export class ReportExportedEvent extends DomainEvent {
  constructor(
    public readonly reportId: string,
    public readonly userId: string,
  ) {
    super('report.exported');
  }
}

// app/commands/export-report-pdf.handler.ts
@CommandHandler(ExportReportPdfCommand)
export class ExportReportPdfHandler implements ICommandHandler<ExportReportPdfCommand> {
  constructor(
    private reportRepository: ReportRepository,
    private eventPublisher: EventPublisher,
  ) {}

  async execute(command: ExportReportPdfCommand): Promise<Result<string>> {
    const report = await this.reportRepository.findById(command.reportId);
    if (!report) return Result.failure(ReportNotFoundError);

    report.exportPdf(command.format);
    await this.reportRepository.save(report);

    this.eventPublisher.publish(new ReportExportedEvent(report.id, command.userId));

    return Result.success(report.pdfUrl);
  }
}
```

#### Step 4: Frontend

```tsx
// packages/frontend/modules/reports/ui/ExportButton.tsx
import { Button } from '@elbruso/design-system';

export function ExportButton({ reportId }: { reportId: string }) {
  const exportPdf = useExportReportPdf();

  return (
    <Button variant="secondary" onClick={() => exportPdf.mutate({ reportId, format: 'pdf' })}>
      <Download className="h-4 w-4" />
      Export PDF
    </Button>
  );
}
```

#### Step 5: Tests

- Unit: `Report.exportPdf()` domain logic
- Integration: PDF generation service
- E2E: User exports report, receives PDF

---

## Checklist

Before submitting PR:

- [ ] Code follows @foed-backend architecture
- [ ] Code follows @foed-frontend architecture
- [ ] UI follows @design-system
- [ ] Contracts updated/created
- [ ] Types generated: `pnpm generate:types`
- [ ] Unit tests written
- [ ] Integration tests written (if applicable)
- [ ] No lint errors: `pnpm lint`
- [ ] No type errors: `pnpm typecheck`

---

## Common Commands

```bash
# Install dependencies
pnpm install

# Run development
pnpm dev:api      # Backend
pnpm dev:web      # Frontend

# Generate types from contracts
pnpm generate:types

# Run tests
pnpm test         # Unit
pnpm test:e2e     # End-to-end
pnpm test:unit    # Backend only

# Lint and typecheck
pnpm lint
pnpm typecheck

# Database
docker-compose up -d
pnpm db:migrate
```

---

## Related Skills

- @foed-backend - Backend architecture
- @foed-frontend - Frontend architecture
- @design-system - UI standards
- @project-schema - Domain model
- @database - Database patterns
- @auth - Authentication
