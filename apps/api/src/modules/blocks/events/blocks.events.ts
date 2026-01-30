export class BlockCreatedEvent {
  constructor(
    public readonly blockId: string,
    public readonly pageId: string,
    public readonly userId: string,
  ) {}
}

export class BlockUpdatedEvent {
  constructor(
    public readonly blockId: string,
    public readonly pageId: string,
    public readonly userId: string,
  ) {}
}

export class BlockDeletedEvent {
  constructor(
    public readonly blockId: string,
    public readonly pageId: string,
    public readonly userId: string,
  ) {}
}
