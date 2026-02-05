export interface WorkspaceCreatedEvent {
  workspaceId: string;
  userId: string;
  name: string;
  timestamp: Date;
}

export interface WorkspaceDeletedEvent {
  workspaceId: string;
  userId: string;
  timestamp: Date;
}

export interface MemberAddedEvent {
  workspaceId: string;
  memberId: string;
  role: string;
  addedBy: string;
  timestamp: Date;
}

export interface MemberRemovedEvent {
  workspaceId: string;
  memberId: string;
  removedBy: string;
  timestamp: Date;
}

export type WorkspaceEvent =
  | WorkspaceCreatedEvent
  | WorkspaceDeletedEvent
  | MemberAddedEvent
  | MemberRemovedEvent;
