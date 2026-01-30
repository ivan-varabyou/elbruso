export class EmailSentEvent {
  constructor(
    public readonly to: string,
    public readonly subject: string,
    public readonly provider: string,
  ) {}
}

export class EmailFailedEvent {
  constructor(
    public readonly to: string,
    public readonly subject: string,
    public readonly error: Error,
  ) {}
}
