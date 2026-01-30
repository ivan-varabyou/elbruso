export class SportCreatedEvent {
  constructor(public readonly sportId: number) {}
}

export class SportUpdatedEvent {
  constructor(public readonly sportId: number) {}
}

export class SportDeletedEvent {
  constructor(public readonly sportId: number) {}
}
