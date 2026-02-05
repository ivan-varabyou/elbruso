export class OrganizationCreatedEvent {
  constructor(public readonly organizationId: number) {}
}

export class OrganizationUpdatedEvent {
  constructor(public readonly organizationId: number) {}
}

export class OrganizationDeletedEvent {
  constructor(public readonly organizationId: number) {}
}
